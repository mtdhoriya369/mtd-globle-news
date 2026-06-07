/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, HelpCircle, Shield, FileCheck, CheckCircle2 } from 'lucide-react';
import { SiteSettings } from '../types';

interface ContactSectionProps {
  settings: SiteSettings;
  updateSettings: (settings: Partial<SiteSettings>) => void;
}

export default function ContactSection({ settings, updateSettings }: ContactSectionProps) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  // Editable direct field toggles
  const [editingField, setEditingField] = useState<'email' | 'phone' | 'address' | null>(null);
  const [tempValue, setTempValue] = useState('');

  const handleStartEdit = (field: 'email' | 'phone' | 'address', currentVal: string) => {
    setEditingField(field);
    setTempValue(currentVal);
  };

  const handleSaveField = () => {
    if (!tempValue.trim()) {
      setEditingField(null);
      return;
    }
    
    if (editingField === 'email') {
      updateSettings({ contactEmail: tempValue.trim() });
    } else if (editingField === 'phone') {
      updateSettings({ contactPhone: tempValue.trim() });
    } else if (editingField === 'address') {
      updateSettings({ contactAddress: tempValue.trim() });
    }
    setEditingField(null);
  };

  const handleSubmitFeedback = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Simulate sending dispatch to editors
    setSubmitted(true);
    setTimeout(() => {
      setSubmitted(false);
      setFormData({ name: '', email: '', subject: '', message: '' });
    }, 5000);
  };

  return (
    <div className="max-w-4xl mx-auto py-8 px-4 md:px-6 font-sans text-left" id="contact-portal-block">
      
      {/* Editorial Title banner */}
      <div className="text-center mb-10">
        <h2 className="text-3xl font-black text-custom-primary uppercase tracking-tight font-custom">
          Secure Intelligence Desk
        </h2>
        <p className="text-sm text-slate-500 mt-2 max-w-lg mx-auto">
          Reach our investigative press room and international analysts. Double-click contact channels below to edit directly.
        </p>
        <div className="w-16 h-1.5 bg-custom-secondary mx-auto mt-4 rounded-full"></div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-start">
        
        {/* Info detail channels */}
        <div className="md:col-span-5 space-y-6">
          <div className="bg-custom-card border border-custom-card p-6 rounded-2xl shadow-sm space-y-6">
            <h3 className="text-xs font-bold font-mono text-slate-400 uppercase tracking-widest flex items-center gap-1.5">
              <Shield size={13} className="text-custom-secondary" />
              Verified Communications
            </h3>

            {/* Email item */}
            <div className="flex gap-4 items-start select-none">
              <div className="p-2.5 bg-custom-secondary/10 text-custom-secondary rounded-lg">
                <Mail size={16} />
              </div>
              <div className="flex-grow min-w-0">
                <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 block">Direct Wire Email</span>
                {editingField === 'email' ? (
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="email"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      onBlur={handleSaveField}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveField()}
                      className="text-xs bg-slate-150 border border-blue-500 rounded p-1 w-full text-slate-900 dark:text-slate-100 focus:outline-none"
                      autoFocus
                    />
                  </div>
                ) : (
                  <span
                    onDoubleClick={() => handleStartEdit('email', settings.contactEmail)}
                    className="text-xs md:text-sm text-custom-primary font-bold break-all cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded px-1 -mx-1"
                    title="Double-click to edit contact email"
                  >
                    {settings.contactEmail}
                  </span>
                )}
              </div>
            </div>

            {/* Phone item */}
            <div className="flex gap-4 items-start select-none">
              <div className="p-2.5 bg-custom-secondary/10 text-custom-secondary rounded-lg">
                <Phone size={16} />
              </div>
              <div className="flex-grow min-w-0">
                <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 block">Secure Hotline</span>
                {editingField === 'phone' ? (
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      onBlur={handleSaveField}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveField()}
                      className="text-xs bg-slate-150 border border-blue-500 rounded p-1 w-full text-slate-900 dark:text-slate-100 focus:outline-none"
                      autoFocus
                    />
                  </div>
                ) : (
                  <span
                    onDoubleClick={() => handleStartEdit('phone', settings.contactPhone)}
                    className="text-xs md:text-sm text-custom-primary font-bold block cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded px-1 -mx-1"
                    title="Double-click to edit contact phone number"
                  >
                    {settings.contactPhone}
                  </span>
                )}
              </div>
            </div>

            {/* Address item */}
            <div className="flex gap-4 items-start select-none">
              <div className="p-2.5 bg-custom-secondary/10 text-custom-secondary rounded-lg">
                <MapPin size={16} />
              </div>
              <div className="flex-grow min-w-0">
                <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 block">Press Office Headquarters</span>
                {editingField === 'address' ? (
                  <div className="flex items-center gap-2 mt-1">
                    <input
                      type="text"
                      value={tempValue}
                      onChange={(e) => setTempValue(e.target.value)}
                      onBlur={handleSaveField}
                      onKeyDown={(e) => e.key === 'Enter' && handleSaveField()}
                      className="text-xs bg-slate-150 border border-blue-500 rounded p-1 w-full text-slate-900 dark:text-slate-100 focus:outline-none"
                      autoFocus
                    />
                  </div>
                ) : (
                  <span
                    onDoubleClick={() => handleStartEdit('address', settings.contactAddress)}
                    className="text-xs text-slate-600 dark:text-slate-300 block cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded px-1 -mx-1 font-semibold"
                    title="Double-click to edit contact address"
                  >
                    {settings.contactAddress}
                  </span>
                )}
              </div>
            </div>

          </div>

          <div className="bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 text-slate-400 p-6 rounded-2xl text-xs space-y-3 font-mono">
            <span className="text-white font-bold block uppercase tracking-wider text-[11px] flex items-center gap-1">
              <FileCheck size={13} className="text-emerald-500" />
              Ethics Registry Compliance
            </span>
            <p className="leading-relaxed">
              mtd global news operates with complete transparency in compliance with journalism guidelines. Anonymous submissions are reviewed safely under encrypted channels. Double click any text channel here to tweak.
            </p>
          </div>
        </div>

        {/* Contact Form */}
        <div className="md:col-span-7 bg-custom-card border border-custom-card rounded-2xl shadow-sm p-6">
          <h3 className="text-sm font-bold uppercase tracking-wider text-custom-primary mb-4 block font-custom">
            Encrypted Press Dispatch Form
          </h3>

          {submitted ? (
            <div className="text-center py-12 px-4 space-y-4 bg-emerald-500/10 border border-emerald-500/20 text-emerald-700 dark:text-emerald-400 rounded-xl animate-scale-up" id="submit-success-card">
              <div className="inline-block p-3 bg-emerald-500 text-white rounded-full">
                <CheckCircle2 size={32} />
              </div>
              <h4 className="text-lg font-bold uppercase font-mono">Feedback Transmitted</h4>
              <p className="text-xs max-w-sm mx-auto leading-relaxed">
                Your dispatch inquiry has been successfully queued inside our local terminal pipeline, cataloged, and encrypted. An editor will reply if verified.
              </p>
              <span className="text-[10px] text-slate-500 font-mono block animate-pulse">This confirmation dialog resets in 5 seconds...</span>
            </div>
          ) : (
            <form onSubmit={handleSubmitFeedback} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1.5 font-mono">Your Identity</label>
                  <input
                    type="text"
                    required
                    placeholder="E.g. Dr. Jane Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-3 rounded-lg border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-custom-secondary"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1.5 font-mono">Return Email</label>
                  <input
                    type="email"
                    required
                    placeholder="E.g. user@verified.org"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-3 rounded-lg border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-custom-secondary"
                  />
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1.5 font-mono">Inquiry Domain / Subject</label>
                <input
                  type="text"
                  required
                  placeholder="E.g. Strait of Hormuz Supply query"
                  value={formData.subject}
                  onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                  className="w-full text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-3 rounded-lg border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-custom-secondary"
                />
              </div>

              <div>
                <label className="block text-[11px] font-bold uppercase text-slate-400 mb-1.5 font-mono">Investigative Message Dispatch</label>
                <textarea
                  required
                  rows={4}
                  placeholder="Record full message body, anonymous sources info, or general system feedback..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-3 rounded-lg border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-custom-secondary resize-none"
                />
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-custom-primary hover:bg-slate-900 text-white text-xs font-bold uppercase tracking-wider rounded-lg transition-all flex items-center justify-center gap-2 cursor-pointer border border-white/10"
                id="contact-submit-btn"
              >
                <Send size={12} />
                Transmit Encrypted Wire
              </button>
            </form>
          )}

        </div>

      </div>

    </div>
  );
}
