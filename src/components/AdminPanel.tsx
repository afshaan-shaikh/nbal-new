import React, { useState, useEffect } from 'react';
import { 
  Lock, LayoutDashboard, FileText, ChevronRight, Download, Eye, CheckCircle2, 
  Trash2, Edit, AlertCircle, RefreshCw, Save, X, PlusCircle, Building2, 
  Settings, Phone, MapPin, Mail, MessageSquare, Bot, Sparkles, LogOut, Check,
  Image
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Service as sType, Project as pType, Inquiry, AppContent, GalleryItem } from '../types';

interface AdminPanelProps {
  appContent: AppContent;
  onUpdateAppContent: (content: AppContent) => void;
  isDark: boolean;
}

export default function AdminPanel({ appContent, onUpdateAppContent, isDark }: AdminPanelProps) {
  const [token, setToken] = useState<string | null>(null);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  
  const [activeTab, setActiveTab] = useState<'dashboard' | 'inquiries' | 'services' | 'projects' | 'gallery' | 'general'>('dashboard');
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);
  const [loadingInquiries, setLoadingInquiries] = useState(false);
  const [savingContent, setSavingContent] = useState(false);
  const [statusMsg, setStatusMsg] = useState("");

  // Editing structures
  const [editingServiceId, setEditingServiceId] = useState<string | null>(null);
  const [editingService, setEditingService] = useState<sType | null>(null);

  const [editingProjectId, setEditingProjectId] = useState<string | null>(null);
  const [editingProject, setEditingProject] = useState<pType | null>(null);
  const [isAddingProject, setIsAddingProject] = useState(false);

  // Gallery edits
  const [editingGalleryId, setEditingGalleryId] = useState<string | null>(null);
  const [editingGalleryItem, setEditingGalleryItem] = useState<GalleryItem | null>(null);
  const [isAddingGalleryItem, setIsAddingGalleryItem] = useState(false);

  // General configs local state
  const [heroForm, setHeroForm] = useState({ ...appContent.hero });
  const [contactForm, setContactForm] = useState({ ...appContent.contactInfo });

  useEffect(() => {
    // Check if token cached in session
    const cached = sessionStorage.getItem('admin-nb-token');
    if (cached) {
      setToken(cached);
    }
  }, []);

  useEffect(() => {
    if (token) {
      fetchInquiries();
    }
  }, [token]);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoginError("");
    try {
      const res = await fetch('/api/admin/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });
      const data = await res.json();
      if (res.ok && data.token) {
        setToken(data.token);
        sessionStorage.setItem('admin-nb-token', data.token);
      } else {
        setLoginError(data.error || "Incorrect credentials");
      }
    } catch (err) {
      setLoginError("Failed to authenticate on core server.");
    }
  };

  const handleLogout = () => {
    setToken(null);
    sessionStorage.removeItem('admin-nb-token');
  };

  const fetchInquiries = async () => {
    if (!token) return;
    setLoadingInquiries(true);
    try {
      const res = await fetch('/api/admin/inquiries', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        const data = await res.json();
        setInquiries(data);
      }
    } catch (err) {
      console.error("Failed loading inquiries board:", err);
    } finally {
      setLoadingInquiries(false);
    }
  };

  const saveContentToServer = async (newContent: AppContent) => {
    if (!token) return;
    setSavingContent(true);
    setStatusMsg("");
    try {
      const res = await fetch('/api/content', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(newContent)
      });
      if (res.ok) {
        onUpdateAppContent(newContent);
        setStatusMsg("All changes securely synchronized!");
        setTimeout(() => setStatusMsg(""), 3000);
      } else {
        throw new Error("Update failed");
      }
    } catch (err) {
      alert("Error synchronizing content to server database.");
    } finally {
      setSavingContent(false);
    }
  };

  const changeInquiryStatus = async (inqId: string, status: 'new' | 'contacted' | 'resolved') => {
    if (!token) return;
    try {
      const res = await fetch('/api/admin/change-status', {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ id: inqId, status })
      });
      if (res.ok) {
        setInquiries(prev => prev.map(i => i.id === inqId ? { ...i, status } : i));
      }
    } catch (err) {
      console.error(err);
    }
  };

  const deleteInquiry = async (inqId: string) => {
    if (!token || !confirm("Are you sure you want to delete this client record?")) return;
    try {
      const res = await fetch(`/api/admin/inquiry/${inqId}`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (res.ok) {
        setInquiries(prev => prev.filter(i => i.id !== inqId));
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Edit Service triggers
  const startEditService = (service: sType) => {
    setEditingServiceId(service.id);
    setEditingService({ ...service });
  };

  const handleSaveService = () => {
    if (!editingService) return;
    const updatedServices = appContent.services.map(s => s.id === editingService.id ? editingService : s);
    const updatedContent = { ...appContent, services: updatedServices };
    saveContentToServer(updatedContent);
    setEditingServiceId(null);
    setEditingService(null);
  };

  // Edit Project triggers
  const startEditProject = (proj: pType) => {
    setEditingProjectId(proj.id);
    setEditingProject({ ...proj });
    setIsAddingProject(false);
  };

  const handleSaveProject = () => {
    if (!editingProject) return;
    const updatedProjects = appContent.projects.map(p => p.id === editingProject.id ? editingProject : p);
    const updatedContent = { ...appContent, projects: updatedProjects };
    saveContentToServer(updatedContent);
    setEditingProjectId(null);
    setEditingProject(null);
  };

  const startAddProject = () => {
    setIsAddingProject(true);
    setEditingProjectId(null);
    setEditingProject({
      id: "proj_" + Date.now(),
      name: "",
      location: "",
      beds: "",
      description: "",
      spaceOptimization: "",
      equipmentConfig: "",
      category: "general",
      status: "Ongoing"
    });
  };

  const handleAddProjectSave = () => {
    if (!editingProject) return;
    const updatedContent = { ...appContent, projects: [editingProject, ...appContent.projects] };
    saveContentToServer(updatedContent);
    setIsAddingProject(false);
    setEditingProject(null);
  };

  const deleteProjectFromDB = (projId: string) => {
    if (!confirm("Are you sure you want to delete this project credential?")) return;
    const filtered = appContent.projects.filter(p => p.id !== projId);
    const updatedContent = { ...appContent, projects: filtered };
    saveContentToServer(updatedContent);
  };

  // Gallery items handlers
  const startEditGalleryItem = (item: GalleryItem) => {
    setEditingGalleryId(item.id);
    setEditingGalleryItem({ ...item });
    setIsAddingGalleryItem(false);
  };

  const handleSaveGalleryItem = () => {
    if (!editingGalleryItem) return;
    const updatedGallery = appContent.gallery.map(g => g.id === editingGalleryItem.id ? editingGalleryItem : g);
    const updatedContent = { ...appContent, gallery: updatedGallery };
    saveContentToServer(updatedContent);
    setEditingGalleryId(null);
    setEditingGalleryItem(null);
  };

  const startAddGalleryItem = () => {
    setIsAddingGalleryItem(true);
    setEditingGalleryId(null);
    setEditingGalleryItem({
      id: "gal_" + Date.now(),
      title: "",
      category: "",
      image: "",
      description: ""
    });
  };

  const handleAddGalleryItemSave = () => {
    if (!editingGalleryItem) return;
    const updatedContent = { ...appContent, gallery: [editingGalleryItem, ...appContent.gallery] };
    saveContentToServer(updatedContent);
    setIsAddingGalleryItem(false);
    setEditingGalleryItem(null);
  };

  const deleteGalleryItemFromDB = (itemId: string) => {
    if (!confirm("Are you sure you want to delete this gallery environment image?")) return;
    const filtered = appContent.gallery.filter(g => g.id !== itemId);
    const updatedContent = { ...appContent, gallery: filtered };
    saveContentToServer(updatedContent);
  };

  const handleSaveGeneralConfig = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedContent = {
      ...appContent,
      hero: heroForm,
      contactInfo: contactForm
    };
    saveContentToServer(updatedContent);
  };

  if (!token) {
    return (
      <div className={`min-h-screen pt-40 pb-20 flex items-center justify-center ${isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-slate-800'}`}>
        <motion.div 
          className={`w-full max-w-md p-8 border rounded-3xl relative overflow-hidden shadow-2xl ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200'}`}
          initial={{ opacity: 0, y: 15 }}
          animate={{ opacity: 1, y: 0 }}
        >
          {/* Subtle decoration */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-sky-550/10 rounded-full blur-3xl" />
          
          <div className="flex flex-col items-center mb-6">
            <div className="h-14 w-14 rounded-2xl bg-sky-600/10 border border-sky-500/20 flex items-center justify-center text-sky-500 mb-3">
              <Lock className="h-6 w-6" />
            </div>
            <h2 className="text-xl font-sans font-extrabold tracking-tight">Admin Authentication Panel</h2>
            <p className="text-xs text-slate-400 mt-1 uppercase tracking-widest font-mono">Secure Back-office Access</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            {loginError && (
              <div className="p-3.5 bg-rose-950/20 border border-rose-500/30 text-rose-400 text-xs rounded-xl flex items-center gap-2">
                <AlertCircle className="h-4 w-4 shrink-0" />
                <span>{loginError}</span>
              </div>
            )}

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-1.5 font-semibold">Username</label>
              <input
                type="text"
                required
                placeholder="admin"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-1.5 font-semibold">Access Key Code</label>
              <input
                type="password"
                required
                placeholder="••••••••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-slate-950/70 border border-slate-800 rounded-xl px-4 py-3 text-sm focus:ring-1 focus:ring-sky-500 focus:outline-none"
              />
            </div>

            <button
              id="admin-login-submit"
              type="submit"
              className="w-full py-3.5 rounded-xl bg-sky-600 hover:bg-sky-550 text-white font-sans font-bold uppercase tracking-wider text-sm transition-all focus:ring-2 focus:ring-sky-500 select-none cursor-pointer mt-2"
            >
              Sign In to Dashboard
            </button>
          </form>

          <p className="text-[10px] text-center text-slate-500 mt-6 font-mono">
            Demo Details — User: <span className="text-sky-400">admin</span> / Pass: <span className="text-sky-450">nbconsultancy2026</span>
          </p>
        </motion.div>
      </div>
    );
  }

  // Loaded Dashboard UI
  return (
    <div className={`min-h-screen pt-28 pb-20 px-4 sm:px-6 lg:px-8 ${isDark ? 'bg-slate-950 text-white' : 'bg-gray-50 text-slate-800'}`}>
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-8">
        
        {/* Left Toolbar Drawer */}
        <div className="lg:col-span-1 space-y-6">
          <div className={`p-6 rounded-2xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-255 shadow-lg'}`}>
            <div className="flex items-center gap-3 mb-6 pb-4 border-b border-slate-800/60">
              <div className="h-10 w-10 rounded-xl bg-sky-600/10 border border-sky-500/20 flex items-center justify-center text-sky-500 font-bold shrink-0">
                NB
              </div>
              <div>
                <h3 className="font-sans font-bold text-sm leading-tight text-white">Administrator</h3>
                <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-semibold flex items-center gap-1 mt-0.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" /> Synchronized
                </span>
              </div>
            </div>

            <nav className="space-y-1.5">
              <button
                onClick={() => setActiveTab('dashboard')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'dashboard' 
                    ? 'bg-sky-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <LayoutDashboard className="h-4.5 w-4.5" />
                Dashboard Overview
              </button>
              
              <button
                onClick={() => setActiveTab('inquiries')}
                className={`w-full flex items-center justify-between px-3.5 py-3 rounded-xl text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'inquiries' 
                    ? 'bg-sky-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <span className="flex items-center gap-2.5">
                  <FileText className="h-4.5 w-4.5" />
                  Inquiry Board
                </span>
                {inquiries.filter(i => i.status === 'new').length > 0 && (
                  <span className="bg-rose-500 text-white px-2 py-0.5 rounded-full text-[10px] font-bold">
                    {inquiries.filter(i => i.status === 'new').length}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveTab('services')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'services' 
                    ? 'bg-sky-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Building2 className="h-4.5 w-4.5" />
                Manage Services
              </button>

              <button
                onClick={() => setActiveTab('projects')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'projects' 
                    ? 'bg-sky-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Building2 className="h-4.5 w-4.5" />
                Manage Projects
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'gallery' 
                    ? 'bg-sky-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Image className="h-4.5 w-4.5" />
                Manage Gallery
              </button>

              <button
                onClick={() => setActiveTab('general')}
                className={`w-full flex items-center gap-2.5 px-3.5 py-3 rounded-xl text-xs font-sans font-semibold uppercase tracking-wider transition-all cursor-pointer ${
                  activeTab === 'general' 
                    ? 'bg-sky-600 text-white shadow-md' 
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Settings className="h-4.5 w-4.5" />
                General Configs
              </button>
            </nav>

            {statusMsg && (
              <div className="mt-6 p-3 bg-emerald-950/20 border border-emerald-500/30 text-emerald-400 text-xs rounded-xl flex items-center gap-2">
                <Check className="h-4 w-4 shrink-0" />
                <span>{statusMsg}</span>
              </div>
            )}

            <button
              id="admin-logout-btn"
              onClick={handleLogout}
              className="mt-6 w-full flex items-center justify-center gap-2 py-3 border border-slate-800 hover:bg-rose-950/20 hover:border-rose-500/30 text-rose-400 hover:text-rose-400 font-sans font-semibold text-xs uppercase tracking-wider rounded-xl transition-all cursor-pointer"
            >
              <LogOut className="h-4 w-4" />
              Sign Out Securely
            </button>
          </div>
        </div>

        {/* Right Tab Content */}
        <div className="lg:col-span-3 space-y-6">
          
          {/* Dashboard tab */}
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Header card info */}
              <div className={`p-8 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-gray-200 shadow-md'}`}>
                <h2 className="text-2xl font-sans font-extrabold tracking-tight text-white mb-2">Hospital Planner Registry Home</h2>
                <p className="text-slate-400 text-sm leading-relaxed max-w-2xl">
                  Synchronized console to monitor prospective hospital queries and update live company credentials in real-time.
                </p>
                
                {/* Stats row */}
                <div className="grid grid-cols-2 lg:grid-cols-5 gap-4 mt-8">
                  <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-2xl">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Total Inquiries</span>
                    <span className="text-2xl font-bold font-sans mt-1 block">{inquiries.length}</span>
                  </div>
                  <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-2xl">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Unread Tasks</span>
                    <span className="text-2xl font-bold font-sans mt-1 text-sky-400 block">
                      {inquiries.filter(i => i.status === 'new').length}
                    </span>
                  </div>
                  <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-2xl">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Services</span>
                    <span className="text-2xl font-bold font-sans mt-1 block">{appContent.services.length}</span>
                  </div>
                  <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-2xl">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Deployments</span>
                    <span className="text-2xl font-bold font-sans mt-1 block">{appContent.projects.length}</span>
                  </div>
                  <div className="p-4 bg-slate-950/50 border border-slate-800 rounded-2xl">
                    <span className="text-xs font-mono text-slate-400 uppercase tracking-wider block">Gallery Images</span>
                    <span className="text-2xl font-bold font-sans mt-1 block text-teal-400">{appContent.gallery.length}</span>
                  </div>
                </div>
              </div>

              {/* Inquiry quick overview */}
              <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200 shadow-md'}`}>
                <div className="flex items-center justify-between mb-4">
                  <h3 className="font-sans font-bold text-base text-white">Recent Proposals Queue</h3>
                  <button onClick={() => setActiveTab('inquiries')} className="text-sky-400 hover:text-sky-350 text-xs font-semibold flex items-center gap-1">
                    Manage Full Pipeline <ChevronRight className="h-4 w-4" />
                  </button>
                </div>

                <div className="space-y-3">
                  {inquiries.slice(0, 3).map((inq) => (
                    <div key={inq.id} className="p-4 bg-slate-950/40 border border-slate-800/70 rounded-xl flex flex-col md:flex-row justify-between gap-4">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="text-sm font-bold text-white">{inq.name}</span>
                          <span className={`text-[10px] uppercase tracking-widest font-mono font-medium px-2 py-0.5 rounded-full ${
                            inq.status === 'new' ? 'bg-rose-950/30 text-rose-400 border border-rose-500/20' : 'bg-slate-800 text-slate-400'
                          }`}>
                            {inq.status}
                          </span>
                        </div>
                        <p className="text-xs text-slate-400 mt-1">{inq.hospitalName} &bull; {inq.location}</p>
                        <p className="text-xs text-slate-350 italic mt-2 line-clamp-1">"{inq.requirement}"</p>
                      </div>

                      {inq.aiClassification && (
                        <div className="flex items-center gap-2 bg-emerald-950/20 border border-emerald-500/20 rounded-xl p-2.5 shrink-0">
                          <Bot className="h-4 w-4 text-emerald-400" />
                          <div className="text-left">
                            <span className="block text-[9px] font-mono uppercase text-emerald-400 font-bold">AI Priority: {inq.aiClassification.urgency}</span>
                            <span className="block text-[10px] text-slate-300 max-w-[180px] truncate">{inq.aiClassification.advisorySummary}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  ))}

                  {inquiries.length === 0 && (
                    <p className="text-xs text-slate-500 py-6 text-center">No inquiry proposals populated yet in this session.</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Inquiries tab */}
          {activeTab === 'inquiries' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-sans font-extrabold text-white">Inquiry Pipeline</h2>
                  <p className="text-xs text-slate-400 mt-1">Review proposals, update workflow statuses, and fetch records.</p>
                </div>

                <div className="flex items-center gap-3">
                  <a
                    id="admin-download-csv-link"
                    href={`/api/admin/inquiries/download?token=${token}`}
                    target="_blank"
                    className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-550 text-white px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all cursor-pointer shadow-md"
                  >
                    <Download className="h-4 w-4" /> Download CSV
                  </a>
                  <button onClick={fetchInquiries} className="p-2.5 rounded-xl bg-slate-900 border border-slate-800 hover:bg-slate-850">
                    <RefreshCw className="h-4 w-4 text-slate-350" />
                  </button>
                </div>
              </div>

              <div className="space-y-4">
                {inquiries.map((inq) => (
                  <div 
                    key={inq.id} 
                    className={`p-6 border rounded-2xl space-y-4 transition-all ${
                      inq.status === 'new' 
                        ? isDark ? 'bg-slate-900/60 border-slate-700/60' : 'bg-sky-50/20 border-sky-100'
                        : isDark ? 'bg-slate-950/80 border-slate-900' : 'bg-white border-gray-100'
                    }`}
                  >
                    <div className="flex flex-col md:flex-row justify-between gap-4">
                      {/* Left: Metadata */}
                      <div className="space-y-1.5">
                        <div className="flex items-center gap-2">
                          <span className="font-sans font-bold text-base text-white">{inq.name}</span>
                          <span className="text-[10px] text-slate-500 font-mono">
                            {new Date(inq.datetime).toLocaleDateString()}
                          </span>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-1 text-xs text-slate-400">
                          <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5 text-slate-500" /> {inq.phone}</span>
                          {inq.email && <span className="flex items-center gap-1"><Mail className="h-3.5 w-3.5 text-slate-500" /> {inq.email}</span>}
                          {inq.hospitalName && <span className="flex items-center gap-1"><Building2 className="h-3.5 w-3.5 text-slate-500" /> {inq.hospitalName}</span>}
                          {inq.location && <span className="flex items-center gap-1"><MapPin className="h-3.5 w-3.5 text-slate-500" /> {inq.location}</span>}
                        </div>
                      </div>

                      {/* Right: Actions */}
                      <div className="flex items-center gap-1.5 shrink-0 self-start md:self-auto">
                        <select
                          value={inq.status}
                          onChange={(e) => changeInquiryStatus(inq.id, e.target.value as any)}
                          className="bg-slate-950 border border-slate-800 rounded-xl px-2.5 py-1.5 text-xs text-slate-350 focus:outline-none"
                        >
                          <option value="new">Mark New</option>
                          <option value="contacted">Mark Contacted</option>
                          <option value="resolved">Mark Resolved</option>
                        </select>

                        <button 
                          onClick={() => deleteInquiry(inq.id)}
                          className="p-2 bg-rose-950/30 hover:bg-rose-950/60 border border-rose-500/20 text-rose-450 hover:text-rose-400 rounded-xl h-8.5 w-8.5 flex items-center justify-center shrink-0"
                          title="Delete prospect"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </div>
                    </div>

                    <div className="p-3.5 bg-slate-950/80 rounded-xl text-xs text-slate-300 leading-relaxed">
                      <span className="block font-mono text-[9px] text-slate-500 uppercase tracking-widest font-bold mb-1">Requirement Wording</span>
                      "{inq.requirement}"
                    </div>

                    {/* AI Advisor Panel segment */}
                    {inq.aiClassification && (
                      <div className="p-4 bg-emerald-950/10 border border-emerald-500/20 rounded-xl grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div>
                          <span className="block text-[9px] font-mono uppercase text-emerald-400 font-bold tracking-widest flex items-center gap-1">
                            <Bot className="h-3 w-3" /> AI Urgency Level
                          </span>
                          <span className={`inline-block px-2.5 py-0.5 rounded-lg text-xs font-bold font-sans mt-1.5 ${
                            inq.aiClassification.urgency === 'high' ? 'bg-rose-500/10 text-rose-400' : 'bg-amber-500/10 text-amber-400'
                          }`}>
                            {inq.aiClassification.urgency.toUpperCase()}
                          </span>
                        </div>

                        <div className="md:col-span-2">
                          <span className="block text-[9px] font-mono uppercase text-emerald-450 font-bold tracking-widest">Advisory Planning Note (Gemini generated)</span>
                          <p className="text-xs text-slate-300 italic mt-1.5 font-sans leading-relaxed">
                            "{inq.aiClassification.advisorySummary}"
                          </p>
                        </div>
                      </div>
                    )}
                  </div>
                ))}

                {inquiries.length === 0 && (
                  <p className="p-12 text-center text-xs text-slate-500">No active inquiry submissions found.</p>
                )}
              </div>
            </div>
          )}

          {/* Services tab */}
          {activeTab === 'services' && (
            <div className="space-y-6">
              <h2 className="text-xl font-sans font-extrabold text-white">Live Clinical Services Alignment</h2>
              <p className="text-xs text-slate-400">Tweak core service packages, descriptions, and functional checklists.</p>

              <div className="space-y-4">
                {appContent.services.map((srv) => (
                  <div key={srv.id} className="p-6 bg-slate-900 border border-slate-800 rounded-2xl relative overflow-hidden">
                    {editingServiceId === srv.id && editingService ? (
                      <div className="space-y-4">
                        <div className="flex justify-between items-center pb-2 border-b border-slate-800">
                          <h4 className="font-bold text-sm text-teal-400">Editing Servicing Module</h4>
                          <button onClick={() => setEditingServiceId(null)} className="p-1 text-slate-400 hover:text-white">
                            <X className="h-4.5 w-4.5" />
                          </button>
                        </div>

                        <div className="space-y-3">
                          <div>
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">Service Title</label>
                            <input
                              type="text"
                              value={editingService.title}
                              onChange={(e) => setEditingService({ ...editingService, title: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">Simple Description</label>
                            <input
                              type="text"
                              value={editingService.description}
                              onChange={(e) => setEditingService({ ...editingService, description: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white"
                            />
                          </div>

                          <div>
                            <label className="block text-[10px] font-mono uppercase tracking-wider text-slate-500 mb-1">Deep / Complete Description</label>
                            <textarea
                              rows={3}
                              value={editingService.longDescription}
                              onChange={(e) => setEditingService({ ...editingService, longDescription: e.target.value })}
                              className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-sm text-white focus:outline-none"
                            />
                          </div>
                        </div>

                        <button
                          onClick={handleSaveService}
                          disabled={savingContent}
                          className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-500 text-white px-4 py-2 rounded-xl text-xs font-semibold"
                        >
                          <Save className="h-4 w-4" /> Save Service Settings
                        </button>
                      </div>
                    ) : (
                      <div>
                        <div className="flex justify-between items-start">
                          <div>
                            <h3 className="font-sans font-bold text-lg text-white">{srv.title}</h3>
                            <p className="text-xs text-slate-400 mt-1">{srv.description}</p>
                          </div>
                          
                          <button
                            onClick={() => startEditService(srv)}
                            className="bg-slate-950 hover:bg-slate-800 p-2 border border-slate-800 rounded-lg text-slate-400 hover:text-white"
                          >
                            <Edit className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="mt-4 flex flex-wrap gap-2">
                          {srv.specs.map((sp, sIdx) => (
                            <span key={sIdx} className="text-[10px] font-mono bg-slate-950 border border-slate-800 text-slate-400 rounded-lg px-2 py-0.5">
                              {sp}
                            </span>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Projects tab */}
          {activeTab === 'projects' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-sans font-extrabold text-white">Completed Deployments & Credentials</h2>
                  <p className="text-xs text-slate-400 mt-1">Review live catalog, add new project entries, or clear properties.</p>
                </div>

                <button
                  onClick={startAddProject}
                  className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-550 text-white px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer"
                >
                  <PlusCircle className="h-4 w-4" /> Add Credentials
                </button>
              </div>

              {/* Editing Project or Adding Project layout */}
              {(editingProject && (editingProjectId === editingProject.id || isAddingProject)) && (
                <div className={`p-6 border border-slate-700/60 rounded-3xl space-y-4 shadow-xl ${isDark ? 'bg-slate-900' : 'bg-sky-50/20'}`}>
                  <h3 className="font-bold text-sm text-teal-400 flex items-center gap-2">
                    {isAddingProject ? "Instantiating New Hospital Credentials Node" : `Modifying ${editingProject.name}`}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Company / Organization name</label>
                      <input
                        type="text"
                        required
                        value={editingProject.name}
                        onChange={(e) => setEditingProject({ ...editingProject, name: e.target.value })}
                        placeholder="SRK Lifecare"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Location City</label>
                      <input
                        type="text"
                        value={editingProject.location}
                        onChange={(e) => setEditingProject({ ...editingProject, location: e.target.value })}
                        placeholder="Andheri, Mumbai"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Bed Scale Count</label>
                      <input
                        type="text"
                        value={editingProject.beds}
                        onChange={(e) => setEditingProject({ ...editingProject, beds: e.target.value })}
                        placeholder="75 bedded"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Project Category</label>
                      <select
                        value={editingProject.category}
                        onChange={(e) => setEditingProject({ ...editingProject, category: e.target.value as any })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                      >
                        <option value="cardiac">Cardiac Setup</option>
                        <option value="maternity">Maternity & Child Care</option>
                        <option value="ot_icu">Operation Theatre / ICU complex</option>
                        <option value="general">General Hospital Planning</option>
                        <option value="biomedical">Biomedical Engineering</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Project Scope Statement</label>
                    <textarea
                      rows={2}
                      value={editingProject.description}
                      onChange={(e) => setEditingProject({ ...editingProject, description: e.target.value })}
                      placeholder="..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Space Planning Parameters</label>
                      <textarea
                        rows={2}
                        value={editingProject.spaceOptimization}
                        onChange={(e) => setEditingProject({ ...editingProject, spaceOptimization: e.target.value })}
                        placeholder="..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Equipment Procurement Config</label>
                      <textarea
                        rows={2}
                        value={editingProject.equipmentConfig}
                        onChange={(e) => setEditingProject({ ...editingProject, equipmentConfig: e.target.value })}
                        placeholder="..."
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex gap-2 justify-end pt-2">
                    <button
                      onClick={() => {
                        setEditingProjectId(null);
                        setEditingProject(null);
                        setIsAddingProject(false);
                      }}
                      className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-sans text-slate-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={isAddingProject ? handleAddProjectSave : handleSaveProject}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-sans font-bold"
                    >
                      Commit Node to Registry
                    </button>
                  </div>
                </div>
              )}

              {/* Scrollable credentials grid */}
              <div className="space-y-3">
                {appContent.projects.map((proj) => (
                  <div key={proj.id} className="p-5 bg-slate-950/60 border border-slate-900 rounded-xl flex items-center justify-between gap-4">
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-sm text-slate-100">{proj.name}</span>
                        <span className="text-xs text-slate-400 font-mono">({proj.location})</span>
                        <span className="text-[10px] bg-slate-900 border border-slate-800 text-indigo-400 px-2.5 py-0.5 rounded-full font-sans">
                          {proj.status}
                        </span>
                      </div>
                      <p className="text-xs text-slate-450 mt-1 max-w-xl line-clamp-1">{proj.description}</p>
                    </div>

                    <div className="flex items-center gap-1.5 shrink-0">
                      <button
                        onClick={() => startEditProject(proj)}
                        className="p-1.5 bg-slate-900 border border-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteProjectFromDB(proj.id)}
                        className="p-1.5 bg-rose-950/30 hover:bg-rose-950/60 border border-rose-500/20 text-rose-450 hover:text-rose-400 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Gallery tab */}
          {activeTab === 'gallery' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <div>
                  <h2 className="text-xl font-sans font-extrabold text-white">Clinical Architecture Gallery</h2>
                  <p className="text-xs text-slate-400 mt-1">Review live galleries, upload or add new high-resolution environment nodes.</p>
                </div>

                <button
                  onClick={startAddGalleryItem}
                  className="flex items-center gap-1.5 bg-sky-600 hover:bg-sky-550 text-white px-4 py-2.5 rounded-xl text-xs font-semibold uppercase tracking-wider cursor-pointer font-sans"
                >
                  <PlusCircle className="h-4 w-4" /> Add Gallery Image
                </button>
              </div>

              {/* Editing/Adding Gallery Item Form */}
              {editingGalleryItem && (editingGalleryId === editingGalleryItem.id || isAddingGalleryItem) && (
                <div className={`p-6 border border-slate-700/60 rounded-3xl space-y-4 shadow-xl ${isDark ? 'bg-slate-900' : 'bg-sky-50/20'}`}>
                  <h3 className="font-bold text-sm text-teal-400 flex items-center gap-2">
                    {isAddingGalleryItem ? "Adding New Gallery Environment Node" : `Modifying "${editingGalleryItem.title}"`}
                  </h3>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Image Title</label>
                      <input
                        type="text"
                        required
                        value={editingGalleryItem.title}
                        onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, title: e.target.value })}
                        placeholder="e.g. Modern Pediatric Clinic Layout"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 mb-1">Category & Tags</label>
                      <input
                        type="text"
                        required
                        value={editingGalleryItem.category}
                        onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, category: e.target.value })}
                        placeholder="e.g. Architecture, ICU Setup, Ward Layout"
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Unsplash / Image URL</label>
                    <input
                      type="text"
                      required
                      value={editingGalleryItem.image}
                      onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, image: e.target.value })}
                      placeholder="https://images.unsplash.com/photo-..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1">Brief Description</label>
                    <textarea
                      rows={2}
                      required
                      value={editingGalleryItem.description}
                      onChange={(e) => setEditingGalleryItem({ ...editingGalleryItem, description: e.target.value })}
                      placeholder="e.g. Custom room zoning planned to maximize patient recovery times..."
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white focus:outline-none"
                    />
                  </div>

                  <div className="flex gap-2 justify-end pt-2">
                    <button
                      onClick={() => {
                        setEditingGalleryId(null);
                        setEditingGalleryItem(null);
                        setIsAddingGalleryItem(false);
                      }}
                      className="px-4 py-2 bg-slate-950 border border-slate-800 rounded-xl text-xs font-sans text-slate-400"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={isAddingGalleryItem ? handleAddGalleryItemSave : handleSaveGalleryItem}
                      className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl text-xs font-sans font-bold"
                    >
                      Commit to Gallery
                    </button>
                  </div>
                </div>
              )}

              {/* Scrollable Gallery grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {appContent.gallery.map((item) => (
                  <div key={item.id} className="p-4 bg-slate-950/60 border border-slate-900 rounded-2xl flex gap-4 items-center">
                    <img 
                      src={item.image} 
                      alt={item.title} 
                      className="h-20 w-20 object-cover rounded-xl shrink-0 border border-slate-800" 
                      referrerPolicy="no-referrer"
                    />
                    
                    <div className="min-w-0 flex-1 space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-[10px] font-mono bg-slate-900 border border-slate-800 text-teal-400 px-2 py-0.5 rounded uppercase">
                          {item.category}
                        </span>
                      </div>
                      <h4 className="font-sans font-bold text-sm text-slate-100 truncate">{item.title}</h4>
                      <p className="text-xs text-slate-450 line-clamp-1">{item.description}</p>
                    </div>

                    <div className="flex flex-col gap-1.5 shrink-0">
                      <button
                        onClick={() => startEditGalleryItem(item)}
                        className="p-2 bg-slate-900 border border-slate-850 hover:bg-slate-800 text-slate-400 hover:text-white rounded-lg"
                        title="Edit image node"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => deleteGalleryItemFromDB(item.id)}
                        className="p-2 bg-rose-950/30 hover:bg-rose-950/60 border border-rose-500/20 text-rose-450 hover:text-rose-400 rounded-lg"
                        title="Delete image node"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* General Configs */}
          {activeTab === 'general' && (
            <form onSubmit={handleSaveGeneralConfig} className="space-y-6">
              <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-808' : 'bg-white shadow'}`}>
                <h3 className="font-sans font-bold text-base text-white mb-4 flex items-center gap-2">
                  <Sparkles className="h-4 w-4" /> Change Landing Hero Content
                </h3>

                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-1.5">Primary Hero Headline</label>
                    <input
                      type="text"
                      value={heroForm.headline}
                      onChange={(e) => setHeroForm({ ...heroForm, headline: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-1.5">Hero Supporting Wording</label>
                    <textarea
                      rows={3}
                      value={heroForm.subheadline}
                      onChange={(e) => setHeroForm({ ...heroForm, subheadline: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm font-sans"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-widest mb-1.5">CTA Action Call Wording</label>
                    <input
                      type="text"
                      value={heroForm.ctaText}
                      onChange={(e) => setHeroForm({ ...heroForm, ctaText: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className={`p-6 rounded-3xl border ${isDark ? 'bg-slate-900 border-slate-808' : 'bg-white shadow'}`}>
                <h3 className="font-sans font-bold text-base text-white mb-4 flex items-center gap-2">
                  <Phone className="h-4 w-4" /> Manage Corporate Contact Info
                </h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Office Postal Address</label>
                    <input
                      type="text"
                      value={contactForm.address}
                      onChange={(e) => setContactForm({ ...contactForm, address: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Telephone Hotline</label>
                    <input
                      type="text"
                      value={contactForm.phone}
                      onChange={(e) => setContactForm({ ...contactForm, phone: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">Corporate Sales Email</label>
                    <input
                      type="email"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-mono text-slate-400 mb-1.5">WhatsApp Integration Number</label>
                    <input
                      type="text"
                      value={contactForm.whatsapp}
                      onChange={(e) => setContactForm({ ...contactForm, whatsapp: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-sm"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={savingContent}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white font-sans font-bold uppercase tracking-wider text-xs px-6 py-3.5 rounded-xl shadow-lg cursor-pointer"
                >
                  {savingContent ? "Syncing..." : "Synchronize System Content"}
                </button>
              </div>
            </form>
          )}

        </div>
      </div>
    </div>
  );
}
