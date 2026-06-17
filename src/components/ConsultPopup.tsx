import React, { useState, useEffect } from 'react';
import { X, CalendarClock, ShieldCheck, Asterisk } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ConsultPopupProps {
  onInquirySubmitSuccess: () => void;
}

export default function ConsultPopup({ onInquirySubmitSuccess }: ConsultPopupProps) {
  const [show, setShow] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    hospitalName: '',
    location: '' // City
  });
  const [neverShow, setNeverShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    // Check if never show is active
    const blockPopup = localStorage.getItem('block-consult-popup') === 'true';
    if (blockPopup) return;

    const timer = setTimeout(() => {
      setShow(true);
    }, 5000); // After 5 seconds

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => {
    if (neverShow) {
      localStorage.setItem('block-consult-popup', 'true');
    }
    setShow(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.phone) {
      alert("Please provide at least a contact name and working telephone number.");
      return;
    }

    setLoading(true);
    try {
      const payload = {
        name: formData.name,
        phone: formData.phone,
        email: formData.email,
        hospitalName: formData.hospitalName,
        location: formData.location,
        requirement: "Automatic Initial Consult Request via booking popup modal."
      };

      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          onInquirySubmitSuccess();
          handleClose();
        }, 2200);
      } else {
        throw new Error("Submit failed");
      }
    } catch (err) {
      alert("There was an issue submitting your inquiry. Please contact us directly at +91 9920046121.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <motion.div
            id="modal-consult-popup"
            className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-lg overflow-hidden shadow-2xl relative text-slate-100"
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 20 }}
            transition={{ type: 'spring', damping: 25 }}
          >
            {/* Close Button */}
            <button
              id="btn-close-consult-modal"
              onClick={handleClose}
              className="absolute right-4 top-4 h-8 w-8 rounded-full bg-slate-800 hover:bg-slate-750 flex items-center justify-center text-slate-400 hover:text-white transition-all cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>

            {success ? (
              <div className="p-8 text-center space-y-4">
                <div className="mx-auto h-16 w-16 rounded-full bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400">
                  <ShieldCheck className="h-8 w-8 animate-bounce" />
                </div>
                <h3 className="text-xl font-sans font-bold text-white">Consultation Provisionally Slated</h3>
                <p className="text-slate-400 text-sm leading-relaxed max-w-xs mx-auto">
                  Our hospital planning directory is generating your architectural feasibility. A senior partner will contact you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="p-8 space-y-6">
                <div className="flex gap-4 items-start">
                  <div className="h-12 w-12 rounded-2xl bg-emerald-950/50 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shrink-0">
                    <CalendarClock className="h-6 w-6 text-emerald-400" />
                  </div>
                  <div>
                    <h3 className="text-lg font-sans font-bold text-white tracking-tight">Book Healthcare Consultation</h3>
                    <p className="text-slate-400 text-xs mt-1">
                      Direct access to certified health architects, medical auditors, and MEP layout engineers.
                    </p>
                  </div>
                </div>

                <div className="space-y-3.5">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-0.5">
                        Your Name <Asterisk className="h-2 w-2 text-rose-500" />
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="Dr. Shaik Afshaan"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-sans text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1 flex items-center gap-0.5">
                        Phone <Asterisk className="h-2 w-2 text-rose-500" />
                      </label>
                      <input
                        type="tel"
                        required
                        placeholder="+91 9920046121"
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-sans text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Email (Optional)</label>
                    <input
                      type="email"
                      placeholder="planner@clinic.org"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-sans text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">Hospital Name</label>
                      <input
                        type="text"
                        placeholder="Lifecare Cardiac Ltd"
                        value={formData.hospitalName}
                        onChange={(e) => setFormData({ ...formData, hospitalName: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-sans text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-mono text-slate-400 uppercase tracking-wider mb-1">City / Location</label>
                      <input
                        type="text"
                        placeholder="Mumbai"
                        value={formData.location}
                        onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                        className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3.5 py-2.5 text-sm font-sans text-slate-100 focus:outline-none focus:ring-1 focus:ring-emerald-500"
                      />
                    </div>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-2 border-t border-slate-800/60">
                  <label className="flex items-center gap-2 text-xs text-slate-400 select-none cursor-pointer">
                    <input
                      type="checkbox"
                      checked={neverShow}
                      onChange={(e) => setNeverShow(e.target.checked)}
                      className="rounded border-slate-800 text-emerald-500 focus:ring-0 bg-slate-950"
                    />
                    Don't show this advisory again
                  </label>
                  <button
                    id="btn-submit-consult-popup"
                    type="submit"
                    disabled={loading}
                    className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-sans font-semibold uppercase tracking-wider px-5 py-3 rounded-xl transition-all disabled:opacity-55 cursor-pointer shadow-lg"
                  >
                    {loading ? "Slating Client..." : "Slated Consultation"}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
