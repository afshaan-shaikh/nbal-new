import express from 'express';
import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

// Ensure data directory exists
const DATA_DIR = path.join(process.cwd(), 'data');
if (!fs.existsSync(DATA_DIR)) {
  fs.mkdirSync(DATA_DIR, { recursive: true });
}

const DB_PATH = path.join(DATA_DIR, 'db.json');
const INQUIRIES_PATH = path.join(DATA_DIR, 'inquiries.json');

// Get fallback data
import { defaultContent } from './src/data.js';

function readDB() {
  try {
    if (fs.existsSync(DB_PATH)) {
      const raw = fs.readFileSync(DB_PATH, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (error) {
    console.error("Failed to read Content DB, using fallback:", error);
  }
  return defaultContent;
}

function writeDB(data: any) {
  try {
    fs.writeFileSync(DB_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error("Failed to write to Content DB:", error);
  }
}

function readInquiries() {
  try {
    if (fs.existsSync(INQUIRIES_PATH)) {
      const raw = fs.readFileSync(INQUIRIES_PATH, 'utf-8');
      return JSON.parse(raw);
    }
  } catch (error) {
    console.error("Failed to read Inquiries DB:", error);
  }
  return [];
}

function writeInquiries(data: any[]) {
  try {
    fs.writeFileSync(INQUIRIES_PATH, JSON.stringify(data, null, 2), 'utf-8');
  } catch (error) {
    console.error("Failed to write to Inquiries DB:", error);
  }
}

// Lazy load Gemini
let geminiClient: GoogleGenAI | null = null;
function getGemini(): GoogleGenAI | null {
  if (!geminiClient) {
    const key = process.env.GEMINI_API_KEY;
    if (key && key !== 'MY_GEMINI_API_KEY') {
      geminiClient = new GoogleGenAI({
        apiKey: key,
        httpOptions: {
          headers: {
            'User-Agent': 'aistudio-build'
          }
        }
      });
    }
  }
  return geminiClient;
}

const app = express();
app.use(express.json());

const PORT = 3000;
const ADMIN_TOKEN = "nb-consultancy-super-secure-token-2026";

// API endpoints
app.get('/api/content', (req, res) => {
  const content = readDB();
  res.json(content);
});

// Admin login
app.post('/api/admin/login', (req, res) => {
  const { username, password } = req.body;
  if (username === 'admin' && password === 'nbconsultancy2026') {
    res.json({ token: ADMIN_TOKEN, success: true });
  } else {
    res.status(401).json({ error: "Invalid credentials", success: false });
  }
});

// Update content
app.post('/api/content', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || auth !== `Bearer ${ADMIN_TOKEN}`) {
    return res.status(403).json({ error: "Access denied" });
  }
  
  const newContent = req.body;
  writeDB(newContent);
  res.json({ success: true, message: "Content updated successfully" });
});

// Submit Inquiry
app.post('/api/inquiries', async (req, res) => {
  const { name, phone, email, hospitalName, location, requirement } = req.body;
  
  if (!name || !phone || !requirement) {
    return res.status(400).json({ error: "Missing required fields (Name, Phone, Requirement)" });
  }
  
  const inquiries = readInquiries();
  const id = "inq_" + Date.now();
  
  const newInquiry: any = {
    id,
    name,
    phone,
    email: email || '',
    hospitalName: hospitalName || '',
    location: location || '',
    requirement,
    status: 'new',
    datetime: new Date().toISOString()
  };
  
  // AI assist analyzing inquiry
  const ai = getGemini();
  if (ai) {
    try {
      const prompt = `You are the lead hospital planner/consulting director for NB Healthcare Consultancy.
Anchor your analysis in the specific requirements:
Contact Name: ${name}
Phone: ${phone}
Email: ${email}
Hospital: ${hospitalName}
Location: ${location}
Requirement Detail: ${requirement}

Analyze the prospect requirements and classify them in a JSON object matching this schema:
{
  "urgency": "high" | "medium" | "low",
  "categories": string[], // Choose fields like: NABH, Architecture, Equipment, Civil, OT & ICU, General
  "advisorySummary": string // A professional clinical consultant summary or recommendation of 2 sentences.
}`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              urgency: {
                type: Type.STRING,
                description: "The urgency score ('high', 'medium', 'low')"
              },
              categories: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List of custom tags appropriate for this project"
              },
              advisorySummary: {
                type: Type.STRING,
                description: "Corporate strategic advisor note"
              }
            },
            required: ["urgency", "categories", "advisorySummary"]
          }
        }
      });
      
      const text = response.text?.trim() || "";
      if (text) {
        newInquiry.aiClassification = JSON.parse(text);
      }
    } catch (err) {
      console.error("AI Inquiry evaluation failed:", err);
    }
  }
  
  inquiries.unshift(newInquiry);
  writeInquiries(inquiries);
  
  res.json({ success: true, inquiry: newInquiry });
});

// Read inquiries
app.get('/api/admin/inquiries', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || auth !== `Bearer ${ADMIN_TOKEN}`) {
    return res.status(430).json({ error: "Access denied" });
  }
  res.json(readInquiries());
});

// Download Inquiries CSV
app.get('/api/admin/inquiries/download', (req, res) => {
  const token = req.query.token;
  if (!token || token !== ADMIN_TOKEN) {
    return res.status(403).send("Access denied");
  }
  
  const inquiries = readInquiries();
  
  let csv = "ID,Date,Name,Phone,Email,Hospital,Location,Requirement,Status,AI Urgency,AI Summary\n";
  inquiries.forEach((inq) => {
    const escapedName = `"${(inq.name || '').replace(/"/g, '""')}"`;
    const escapedPhone = `"${(inq.phone || '').replace(/"/g, '""')}"`;
    const escapedEmail = `"${(inq.email || '').replace(/"/g, '""')}"`;
    const escapedHospital = `"${(inq.hospitalName || '').replace(/"/g, '""')}"`;
    const escapedLoc = `"${(inq.location || '').replace(/"/g, '""')}"`;
    const escapedReq = `"${(inq.requirement || '').replace(/"/g, '""')}"`;
    const urgency = inq.aiClassification?.urgency || 'N/A';
    const escapedSummary = `"${(inq.aiClassification?.advisorySummary || '').replace(/"/g, '""')}"`;
    
    csv += `${inq.id},${inq.datetime},${escapedName},${escapedPhone},${escapedEmail},${escapedHospital},${escapedLoc},${escapedReq},${inq.status},${urgency},${escapedSummary}\n`;
  });
  
  res.setHeader('Content-Type', 'text/csv');
  res.setHeader('Content-Disposition', 'attachment; filename=nb_consultancy_inquiries.csv');
  res.status(200).send(csv);
});

// Update inquiry status
app.post('/api/admin/change-status', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || auth !== `Bearer ${ADMIN_TOKEN}`) {
    return res.status(403).json({ error: "Access denied" });
  }
  
  const { id, status } = req.body;
  const inquiries = readInquiries();
  const index = inquiries.findIndex(i => i.id === id);
  if (index !== -1) {
    inquiries[index].status = status;
    writeInquiries(inquiries);
    return res.json({ success: true, inquiry: inquiries[index] });
  }
  res.status(404).json({ error: "Inquiry not found" });
});

// Delete inquiry
app.delete('/api/admin/inquiry/:id', (req, res) => {
  const auth = req.headers.authorization;
  if (!auth || auth !== `Bearer ${ADMIN_TOKEN}`) {
    return res.status(403).json({ error: "Access denied" });
  }
  
  const id = req.params.id;
  const inquiries = readInquiries();
  const filtered = inquiries.filter(i => i.id !== id);
  writeInquiries(filtered);
  res.json({ success: true });
});

// AI Consult advisor chat
app.post('/api/ai/consultation', async (req, res) => {
  const { messages } = req.body;
  if (!messages || !Array.isArray(messages)) {
    return res.status(400).json({ error: "Invalid messages format" });
  }
  
  const ai = getGemini();
  if (!ai) {
    return res.status(503).json({ 
      error: "AI Advisor is currently in local offline mode. Please configure GEMINI_API_KEY in secrets to activate real-time advisory capability.",
      offline: true 
    });
  }
  
  try {
    const context = fs.readFileSync(path.join(process.cwd(), 'src/data.ts'), 'utf-8');
    
    // Create system instructions modeling the lead consultant
    const systemInstruction = `You are the lead hospital planning partner and corporate AI consultant at NB Healthcare & Hospital Consultancy (NB Consultancy).
You have an elite, deep, and authoritative tone of a world-class healthcare planning expert (styled like McKinsey, Apple, and Vercel healthcare partners).
Speak with supreme professional clarity, integrity, and depth. Provide highly technical and factual answers.

Here is your firm's background and project credentials:
${context}

Additional details from our company's corporate credentials:
- Reg. Add: 301, Padmalaya Tower, Opp. Holy Cross School, Rambaug lane - 4, Kalyan (W) - 421 301.
- Phone: +91 9920046121
- Email: nbconsultancy1979@gmail.com
- Main Website: www.nbconsultancy.in
- Our multidisciplinary team comprises architects, interior designers, biomedical engineers, project managers, finance experts, and IT professionals.
- Our benefit points include impartial selection of Contractors (civil and MEP) and Equipment Vendors, single point of contact streamlining communication, gathering strict technical details from manufacturers.
- Our core services: New Hospital Projects (planning, design, architectures, NABH guidelines, procurement, HIS setup), Expansion & Upgrades (workflow optimization audits, process streamlining, business development), and Contract Biomedical Engineering.

Answer the client's questions about hospital setting, NABH compliance, OT design parameters, or equipment configurations, by referencing the above facts and representing our actual list of 25+ major completed projects (like QHT Dehradun's 21 advanced modular theaters, SRK Lifecare's 75 beds cardiac ICCU, Shri Bhagwan Mahavir's 150 beds pediatric, and Bhartiya Arogya Nidhi's 125 beds cardiac centre).
Actively lead the prospect toward booking a consultation through our website form. Keep response sizes professional/well-structured.`;

    // Map conversation array to genai SDK contents
    const contents: any[] = [];
    messages.forEach((m: any) => {
      contents.push({
        role: m.role,
        parts: [{ text: m.text }]
      });
    });

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: contents,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      }
    });

    res.json({ text: response.text });
  } catch (error: any) {
    console.error("AI Advisory error:", error);
    res.status(500).json({ error: "Advisory loop error: " + error.message });
  }
});

// Vite middleware setup
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    // Development mode
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    // Production mode
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`[Server] Corporate Platform live on http://localhost:${PORT}`);
  });
}

startServer();
