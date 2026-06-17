import React, { useState, useRef, useEffect } from 'react';
import { MessageSquare, Send, Sparkles, X, ChevronUp, Bot, CornerDownLeft, Hospital } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}

const SUGGESTED_QUERIES = [
  "How long does typical NABH space planning take?",
  "Tell me about your 150-bed Shri Bhagwan Mahavir project in Rajasthan",
  "What is your unbiased contractor and vendor selection process?",
  "How do you design a modular OT complex for a cardiac unit?"
];

export default function AIConsultant() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      role: 'model',
      text: "Greetings. I am your Executive AI Director at NB Healthcare Consultancy. Let us draft your hospital layout, discuss NABH standards, analyze procurement bids, or consult clinical project credentials."
    }
  ]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  const handleSend = async (textToSend: string) => {
    if (!textToSend.trim() || isLoading) return;
    
    const userMsg: ChatMessage = { role: 'user', text: textToSend };
    setMessages(prev => [...prev, userMsg]);
    setInput("");
    setIsLoading(true);

    try {
      // Map format
      const apiMessages = [...messages, userMsg].map(m => ({
        role: m.role,
        text: m.text
      }));

      const res = await fetch('/api/ai/consultation', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: apiMessages })
      });

      const data = await res.json();
      
      if (res.ok && data.text) {
        setMessages(prev => [...prev, { role: 'model', text: data.text }]);
      } else if (data.offline) {
        setMessages(prev => [...prev, { 
          role: 'model', 
          text: "I am currently running in Offline Portfolio advisory mode. To book a precise personal session with our senior engineers, please complete the 'Book Consultation' form on the screen!" 
        }]);
      } else {
        throw new Error(data.error || "Failed loading advisory");
      }
    } catch (err: any) {
      setMessages(prev => [...prev, { 
        role: 'model', 
        text: "I am having a connection issue with our neural servers. You can reach our consultancy team directly at +91 9920046121 or submit our inquiry form." 
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Button */}
      <motion.button
        id="btn-ai-chat-toggle"
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-24 z-50 flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white px-5 py-3.5 rounded-full shadow-2xl transition-all font-sans font-medium text-sm border border-emerald-400/20 group cursor-pointer"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        layoutId="ai-chat-launcher"
      >
        <div className="relative">
          <Sparkles className="h-5 w-5 animate-pulse text-yellow-200" />
          <span className="absolute -top-1 -right-1 flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-300 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-yellow-400"></span>
          </span>
        </div>
        <span className="max-w-0 overflow-hidden group-hover:max-w-xs transition-all duration-300 ease-out whitespace-nowrap">
          AI Healthcare Advisor
        </span>
        <span className="group-hover:hidden transition-all">AI Consultant</span>
      </motion.button>

      {/* Panel Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            id="panel-ai-chat-drawer"
            className="fixed inset-y-0 right-0 w-full md:w-[480px] bg-[#0c1322] border-l border-slate-800 text-slate-100 z-50 flex flex-col shadow-3xl"
            initial={{ x: 480 }}
            animate={{ x: 0 }}
            exit={{ x: 480 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {/* Header */}
            <div className="p-6 border-b border-slate-800 flex items-center justify-between bg-gradient-to-r from-emerald-950/40 via-[#0c1322] to-[#0c1322] relative overflow-hidden">
              <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-emerald-500/20 to-transparent" />
              <div className="flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <Bot className="h-5 w-5" />
                </div>
                <div>
                  <h3 className="font-sans font-semibold text-base flex items-center gap-1.5 text-white">
                    Clinical AI Companion
                    <span className="text-[10px] bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 px-2 py-0.5 rounded-full font-mono uppercase tracking-widest font-normal">
                      Alpha
                    </span>
                  </h3>
                  <p className="text-xs text-slate-400 font-sans mt-0.5">NB Consulting Advisory Engine</p>
                </div>
              </div>
              <button
                id="btn-close-ai-chat"
                onClick={() => setIsOpen(false)}
                className="h-8 w-8 rounded-lg hover:bg-slate-800 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Conversation Messages */}
            <div className="flex-1 overflow-y-auto p-6 space-y-4 scrollbar-thin scrollbar-thumb-slate-800 scrollbar-track-transparent">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex gap-3 ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  {m.role === 'model' && (
                    <div className="h-8 w-8 rounded-lg bg-emerald-950 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0 self-start mt-0.5">
                      <Bot className="h-4 w-4" />
                    </div>
                  )}
                  <div
                    className={`max-w-[78%] rounded-2xl px-4 py-3 text-sm font-sans leading-relaxed transition-all shadow-md ${
                      m.role === 'user'
                        ? 'bg-emerald-600 text-white rounded-tr-none'
                        : 'bg-slate-900 border border-slate-800 text-slate-200 rounded-tl-none'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
              
              {isLoading && (
                <div className="flex gap-3 justify-start">
                  <div className="h-8 w-8 rounded-lg bg-emerald-905 border border-emerald-500/20 flex items-center justify-center text-emerald-405 shrink-0 self-start mt-0.5 animate-spin">
                    <bot className="h-4 w-4" />
                  </div>
                  <div className="bg-slate-900 border border-slate-800 text-slate-400 rounded-2xl rounded-tl-none px-4 py-3 text-sm font-sans flex items-center gap-1.5">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce"></span>
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:0.2s]"></span>
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-slate-500 animate-bounce [animation-delay:0.4s]"></span>
                    <span className="text-xs ml-1">Analyzing blueprints...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Suggested Tags */}
            <div className="p-4 bg-slate-950/60 border-t border-slate-900">
              <p className="text-[10px] text-slate-500 font-mono uppercase tracking-wider mb-2">Suggested consultative topics:</p>
              <div className="flex flex-wrap gap-1.5">
                {SUGGESTED_QUERIES.map((q, idx) => (
                  <button
                    key={idx}
                    onClick={() => handleSend(q)}
                    className="text-xs bg-slate-900 hover:bg-slate-800 hover:text-emerald-300 text-slate-300 border border-slate-800 rounded-lg px-2.5 py-1 text-left transition-all cursor-pointer break-all"
                  >
                    {q}
                  </button>
                ))}
              </div>
            </div>

            {/* Input Bar */}
            <div className="p-4 border-t border-slate-800 bg-[#0c1322]">
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(input);
                }}
                className="flex gap-2"
              >
                <div className="relative flex-1">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Inquire layout rules, project specs..."
                    className="w-full bg-slate-900 border border-slate-800 rounded-xl pl-4 pr-10 py-3 text-sm focus:outline-none focus:ring-1 focus:ring-emerald-500 focus:border-transparent text-slate-100 placeholder-slate-500 font-sans"
                    disabled={isLoading}
                  />
                  <div className="absolute right-3.5 top-3.5 flex items-center text-slate-600 gap-1 hidden md:flex">
                    <span className="text-[10px] font-mono select-none">Enter</span>
                    <CornerDownLeft className="h-3.5 w-3.5" />
                  </div>
                </div>
                <button
                  id="btn-ai-message-send"
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="bg-emerald-600 hover:bg-emerald-500 text-white rounded-xl px-4 py-3 flex items-center justify-center transition-all disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer shadow-lg"
                >
                  <Send className="h-4 w-4" />
                </button>
              </form>
              <p className="text-[10px] text-center text-slate-600 mt-2 font-sans">
                Trained on our complete corporate hospital advisory registry.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
