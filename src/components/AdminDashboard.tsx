/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Sliders, Settings, Layout, Edit, Plus, Trash2, Save, Undo, Eye, CheckSquare, Square, Globe, FileText, Check } from 'lucide-react';
import { NewsPost, SiteSettings } from '../types';

interface AdminDashboardProps {
  settings: SiteSettings;
  updateSettings: (settings: Partial<SiteSettings>) => void;
  posts: NewsPost[];
  savePosts: (posts: NewsPost[]) => void;
  onClose: () => void;
}

export default function AdminDashboard({
  settings,
  updateSettings,
  posts,
  savePosts,
  onClose,
}: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState<'posts' | 'design' | 'general'>('posts');
  
  // States for CRUD Post Editor
  const [editingPostId, setEditingPostId] = useState<string | null>(null);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [formData, setFormData] = useState<Omit<NewsPost, 'id' | 'views' | 'likes' | 'comments'>>({
    title: '',
    summary: '',
    content: '',
    category: 'world',
    imageUrl: '',
    date: new Date().toISOString().split('T')[0],
  });

  // Preset professional themes
  const colorPresets = [
    { name: 'MTD Classic (Default)', primary: '#0a1e3c', secondary: '#c0392b', bg: '#f4f4f4' },
    { name: 'Chamber Green (Forest)', primary: '#1e3a1e', secondary: '#e67e22', bg: '#fbfbfb' },
    { name: 'Corporate Teal & Gold', primary: '#005f73', secondary: '#ca6702', bg: '#f8f9fa' },
    { name: 'Cosmic Steel', primary: '#1e293b', secondary: '#ec4899', bg: '#f1f5f9' },
    { name: 'Editorial Obsidian', primary: '#111827', secondary: '#8b5cf6', bg: '#fafafa' },
  ];

  const handleApplyPreset = (preset: typeof colorPresets[0]) => {
    updateSettings({
      primaryColor: preset.primary,
      secondaryColor: preset.secondary,
      backgroundColor: preset.bg,
    });
    alert(`[mtd global news] Applied theme preset: "${preset.name}".`);
  };

  const handleResetSettings = () => {
    if (confirm('Are you sure you want to revert all configurations back to system defaults?')) {
      localStorage.removeItem('mtd_site_settings_v1');
      window.location.reload();
    }
  };

  // CRUD Actions
  const handleEditPostClick = (post: NewsPost) => {
    setEditingPostId(post.id);
    setIsCreatingPost(false);
    setFormData({
      title: post.title,
      summary: post.summary,
      content: post.content,
      category: post.category,
      imageUrl: post.imageUrl,
      date: post.date,
    });
  };

  const handleCreatePostClick = () => {
    setIsCreatingPost(true);
    setEditingPostId(null);
    setFormData({
      title: '',
      summary: '',
      content: '',
      category: 'world',
      imageUrl: 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=800&q=80',
      date: new Date().toISOString().split('T')[0],
    });
  };

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSavePost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.title.trim()) return;

    if (isCreatingPost) {
      const newPost: NewsPost = {
        id: Date.now().toString(),
        title: formData.title,
        summary: formData.summary,
        content: formData.content,
        category: formData.category,
        imageUrl: formData.imageUrl,
        date: formData.date,
        views: Math.floor(Math.random() * 150) + 1,
        likes: Math.floor(Math.random() * 20) + 1,
        comments: [],
      };
      savePosts([newPost, ...posts]);
      setIsCreatingPost(false);
      alert('[mtd global news] Dispatch post created and published to local database.');
    } else if (editingPostId) {
      const updated = posts.map((p) => {
        if (p.id === editingPostId) {
          return {
            ...p,
            title: formData.title,
            summary: formData.summary,
            content: formData.content,
            category: formData.category,
            imageUrl: formData.imageUrl,
            date: formData.date,
          };
        }
        return p;
      });
      savePosts(updated);
      setEditingPostId(null);
      alert('[mtd global news] Dispatch elements modified and redistributed.');
    }
  };

  const handleDeletePost = (id: string) => {
    if (confirm('Are you absolute sure you want to permanently delete this news dispatch? This will wipe all comments.')) {
      const filtered = posts.filter((p) => p.id !== id);
      savePosts(filtered);
      alert('[mtd global news] Post purged from localStorage registry.');
    }
  };

  const handleToggleSection = (section: keyof SiteSettings['visibleSections']) => {
    const freshVisible = {
      ...settings.visibleSections,
      [section]: !settings.visibleSections[section]
    };
    updateSettings({ visibleSections: freshVisible });
  };

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-xs flex justify-end items-stretch z-50 animate-fade-in" id="admin-desk-modal">
      <div className="bg-slate-900 border-l border-slate-800 text-slate-100 max-w-xl w-full flex flex-col shadow-2xl relative select-none animate-slide-left" id="admin-panel">
        
        {/* Panel Header */}
        <div className="p-5 border-b border-slate-800 bg-slate-950 flex justify-between items-center">
          <div className="flex items-center space-x-2.5">
            <Sliders className="text-custom-secondary animate-pulse" size={20} />
            <div>
              <h2 className="text-base font-black uppercase tracking-wider font-mono">Control Desk Agency</h2>
              <p className="text-[10px] text-slate-400 font-mono">Real-time customization & CRUD desk</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 hover:bg-slate-800 rounded-md text-slate-400 hover:text-white transition-all cursor-pointer"
            id="close-admin-panel"
          >
            <X size={18} />
          </button>
        </div>

        {/* Console Nav Tabs */}
        <div className="flex bg-slate-950 px-2 border-b border-slate-800 text-xs font-mono text-center">
          <button
            onClick={() => { setActiveTab('posts'); setEditingPostId(null); setIsCreatingPost(false); }}
            className={`flex-1 py-3 border-b-2 font-bold uppercase cursor-pointer ${
              activeTab === 'posts' ? 'border-custom-secondary text-white bg-slate-900' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
            id="admin-tab-posts"
          >
            Dispatches
          </button>
          <button
            onClick={() => setActiveTab('design')}
            className={`flex-1 py-3 border-b-2 font-bold uppercase cursor-pointer ${
              activeTab === 'design' ? 'border-custom-secondary text-white bg-slate-900' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
            id="admin-tab-design"
          >
            Visual Layout
          </button>
          <button
            onClick={() => setActiveTab('general')}
            className={`flex-1 py-3 border-b-2 font-bold uppercase cursor-pointer ${
              activeTab === 'general' ? 'border-custom-secondary text-white bg-slate-900' : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
            id="admin-tab-general"
          >
            Agency Details
          </button>
        </div>

        {/* Panel Scrollable Content */}
        <div className="flex-grow overflow-y-auto p-5 space-y-6 text-sm" id="admin-panel-scrollbox">
          
          {/* TAB 1: DISPATCHES CRUD */}
          {activeTab === 'posts' && (
            <div className="space-y-4 font-mono">
              {!editingPostId && !isCreatingPost ? (
                <>
                  <div className="flex justify-between items-center flex-wrap gap-2">
                    <span className="text-xs font-black uppercase text-slate-400">Published Intelligence Dispatches ({posts.length})</span>
                    <button
                      onClick={handleCreatePostClick}
                      className="px-3 py-1.5 bg-custom-secondary text-white hover:bg-red-700 text-xs rounded font-bold uppercase flex items-center gap-1 cursor-pointer transition-all border border-red-900/10"
                      id="create-dispatch-btn"
                    >
                      <Plus size={12} /> Add News Dispatch
                    </button>
                  </div>

                  {/* List of articles */}
                  <div className="space-y-2 max-h-[50vh] overflow-y-auto pr-1 border border-slate-800 p-2 rounded-lg bg-slate-950/60" id="admin-crud-list">
                    {posts.length === 0 ? (
                      <p className="text-xs text-slate-400 italic py-4 text-center">No posts loaded. Press reset to rebuild defaults.</p>
                    ) : (
                      posts.map((post) => (
                        <div
                          key={post.id}
                          className="flex justify-between items-center p-2.5 bg-slate-900 border border-slate-800 hover:border-slate-700 rounded-md gap-3"
                        >
                          <div className="overflow-hidden min-w-0 flex-1">
                            <span className="text-[9px] bg-slate-800 text-slate-400 px-1.5 py-0.2 rounded uppercase block w-max max-w-full truncate mb-1">
                              {post.category}
                            </span>
                            <h4 className="text-xs font-bold text-white truncate max-w-xs">{post.title}</h4>
                            <span className="text-[10px] text-slate-500 block mt-0.5">{post.date}</span>
                          </div>

                          <div className="flex items-center space-x-1 flex-shrink-0">
                            <button
                              onClick={() => handleEditPostClick(post)}
                              className="p-1.5 bg-slate-800 hover:bg-slate-700 rounded text-slate-300 hover:text-white transition-all cursor-pointer"
                              title="Edit post info"
                            >
                              <Edit size={12} />
                            </button>
                            <button
                              onClick={() => handleDeletePost(post.id)}
                              className="p-1.5 bg-slate-800 hover:bg-red-950 rounded text-slate-300 hover:text-red-400 transition-all cursor-pointer"
                              title="Purge post"
                            >
                              <Trash2 size={12} />
                            </button>
                          </div>
                        </div>
                      ))
                    )}
                  </div>
                </>
              ) : (
                /* CREATE / EDIT FORM VIEW */
                <form onSubmit={handleSavePost} className="space-y-4 bg-slate-950/50 p-4 rounded-lg border border-slate-800">
                  <div className="flex justify-between items-center mb-2">
                    <span className="text-xs font-black uppercase text-custom-secondary">
                      {isCreatingPost ? '⚡ Add Draft Dispatch' : `🛠️ Edit News ID: ${editingPostId}`}
                    </span>
                    <button
                      type="button"
                      onClick={() => { setEditingPostId(null); setIsCreatingPost(false); }}
                      className="text-xs text-slate-400 hover:text-white underline cursor-pointer"
                    >
                      Abrogate
                    </button>
                  </div>

                  <div className="space-y-3 text-xs">
                    <div>
                      <label className="block text-slate-400 mb-1 font-bold">TITLE HEADLINE</label>
                      <input
                        type="text"
                        name="title"
                        required
                        value={formData.title}
                        onChange={handleFormChange}
                        className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-custom-secondary"
                        placeholder="Rubio's visit: High tension talks..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-slate-400 mb-1 font-bold">CATEGORY WIRE</label>
                        <select
                          name="category"
                          value={formData.category}
                          onChange={handleFormChange}
                          className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-custom-secondary"
                        >
                          <option value="world">World News</option>
                          <option value="business">Business</option>
                          <option value="tech">Technology</option>
                          <option value="energy-economy">Energy/Economy</option>
                          <option value="opinion">Opinion</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-slate-400 mb-1 font-bold">PUBLISHED DATE</label>
                        <input
                          type="date"
                          name="date"
                          required
                          value={formData.date}
                          onChange={handleFormChange}
                          className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-custom-secondary"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-bold">DISPATCH IMAGE THUMBNAIL URL</label>
                      <input
                        type="url"
                        name="imageUrl"
                        value={formData.imageUrl}
                        onChange={handleFormChange}
                        className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-custom-secondary"
                        placeholder="https://images.unsplash.com/photo-..."
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-bold">EXECUTIVE INTELLIGENCE SUMMARY</label>
                      <textarea
                        name="summary"
                        required
                        rows={2}
                        value={formData.summary}
                        onChange={handleFormChange}
                        className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-custom-secondary resize-none"
                        placeholder="A rapid scannable metadata overview sentence..."
                      />
                    </div>

                    <div>
                      <label className="block text-slate-400 mb-1 font-bold">LONG FORMAT DISPATCH BODY</label>
                      <textarea
                        name="content"
                        required
                        rows={7}
                        value={formData.content}
                        onChange={handleFormChange}
                        className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-custom-secondary"
                        placeholder="Full body article write-up paragraph modules..."
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-2.5 bg-custom-secondary hover:bg-rose-700 text-white font-bold uppercase rounded cursor-pointer transition-all flex items-center justify-center gap-1"
                    >
                      <Save size={13} />
                      {isCreatingPost ? 'Transmit Wire Draft' : 'Commit Dispatch Edit'}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}

          {/* TAB 2: VISUAL LAYOUT & PALETTE */}
          {activeTab === 'design' && (
            <div className="space-y-5 font-mono text-xs">
              
              {/* Palette Preset Grid */}
              <div className="space-y-2">
                <span className="text-slate-400 font-bold uppercase block">Agency Color Presets</span>
                <div className="grid grid-cols-2 gap-2" id="design-presets-grid">
                  {colorPresets.map((preset, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => handleApplyPreset(preset)}
                      className="p-2.5 bg-slate-950 hover:bg-slate-800 rounded-lg text-left border border-slate-800 flex flex-col gap-1.5 cursor-pointer text-[11px]"
                    >
                      <span className="font-bold text-white max-w-full truncate">{preset.name}</span>
                      <div className="flex items-center gap-1 mt-1">
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.primary }}></div>
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.secondary }}></div>
                        <div className="w-4 h-4 rounded-full" style={{ backgroundColor: preset.bg }}></div>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Individual Custom Colors */}
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
                <span className="text-slate-400 font-bold uppercase block mb-1">Interactive Palette Picker</span>
                
                <div className="grid grid-cols-3 gap-3">
                  <div>
                    <label className="block text-slate-500 mb-1 max-w-full truncate text-[10px]">PRIMARY HEAD</label>
                    <div className="flex items-center space-x-1.5">
                      <input
                        type="color"
                        value={settings.primaryColor}
                        onChange={(e) => updateSettings({ primaryColor: e.target.value })}
                        className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
                      />
                      <span className="text-[10px] text-white">{settings.primaryColor}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1 max-w-full truncate text-[10px]">SECONDARY ACCENT</label>
                    <div className="flex items-center space-x-1.5">
                      <input
                        type="color"
                        value={settings.secondaryColor}
                        onChange={(e) => updateSettings({ secondaryColor: e.target.value })}
                        className="w-8 h-8 rounded border-none cursor-pointer bg-transparent"
                      />
                      <span className="text-[10px] text-white">{settings.secondaryColor}</span>
                    </div>
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1 max-w-full truncate text-[10px]">MAIN BACKGROUND</label>
                    <div className="flex items-center space-x-1.5">
                      <input
                        type="color"
                        value={settings.backgroundColor}
                        disabled={settings.darkMode}
                        onChange={(e) => updateSettings({ backgroundColor: e.target.value })}
                        className="w-8 h-8 rounded border-none cursor-pointer bg-transparent disabled:opacity-30"
                      />
                      <span className="text-[10px] text-white disabled:opacity-30">{settings.darkMode ? 'Dark OS' : settings.backgroundColor}</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Typography Font pairing Selector */}
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
                <span className="text-slate-400 font-bold uppercase block">Official Editorial Typeface</span>
                <div className="grid grid-cols-3 gap-2">
                  {(['Poppins', 'Roboto', 'Merriweather'] as const).map((fontOption) => (
                    <button
                      key={fontOption}
                      type="button"
                      onClick={() => updateSettings({ font: fontOption })}
                      className={`p-2 rounded text-center cursor-pointer font-bold ${
                        settings.font === fontOption
                          ? 'bg-custom-secondary text-white'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      <span className={fontOption === 'Merriweather' ? 'font-serif' : 'font-sans'}>
                        {fontOption}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Fluid Layout grid vs list display toggle */}
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
                <span className="text-slate-400 font-bold uppercase block">Default Card Layout Type</span>
                <div className="grid grid-cols-2 gap-2">
                  {(['grid', 'list'] as const).map((layOption) => (
                    <button
                      key={layOption}
                      type="button"
                      onClick={() => updateSettings({ layout: layOption })}
                      className={`p-2 rounded text-center uppercase cursor-pointer font-extrabold ${
                        settings.layout === layOption
                          ? 'bg-custom-secondary text-white'
                          : 'bg-slate-900 text-slate-400 hover:text-slate-200'
                      }`}
                    >
                      {layOption} Layout
                    </button>
                  ))}
                </div>
              </div>

              {/* Feed toggles */}
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
                <span className="text-slate-400 font-bold uppercase block">Toggle Active Sections</span>
                <p className="text-[10px] text-slate-500 leading-normal">Configure which navigation tabs and core grids appear accessible on the front-facing index portal.</p>
                
                <div className="grid grid-cols-2 gap-2 mt-2" id="toggles-sections-grid">
                  {Object.keys(settings.visibleSections).map((secKey) => {
                    const typedKey = secKey as keyof SiteSettings['visibleSections'];
                    const isVisible = settings.visibleSections[typedKey];
                    return (
                      <button
                        key={secKey}
                        type="button"
                        onClick={() => handleToggleSection(typedKey)}
                        className={`p-2 rounded text-left flex items-center justify-between cursor-pointer transition-colors ${
                          isVisible ? 'bg-slate-900 border border-slate-700 font-semibold' : 'bg-slate-950 opacity-40 hover:opacity-60 border border-transparent'
                        }`}
                      >
                        <span className="uppercase text-[10px]">{secKey}</span>
                        {isVisible ? <Check size={12} className="text-emerald-500" /> : <div className="w-2.5 h-2.5 rounded-full bg-slate-900 border border-slate-800"></div>}
                      </button>
                    );
                  })}
                </div>
              </div>

            </div>
          )}

          {/* TAB 3: GENERAL INFO & METADATA */}
          {activeTab === 'general' && (
            <div className="space-y-4 font-mono text-xs">
              
              <div className="space-y-3 bg-slate-950 p-4 rounded-lg border border-slate-800">
                <span className="text-slate-400 font-bold uppercase block mb-1">Agency Wire Meta</span>
                
                <div className="space-y-2">
                  <div>
                    <label className="block text-slate-500 mb-1">AGENCY BRANDED HEADLINE</label>
                    <input
                      type="text"
                      value={settings.siteName}
                      onChange={(e) => updateSettings({ siteName: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-custom-secondary"
                    />
                  </div>

                  <div>
                    <label className="block text-slate-500 mb-1">AGENCY SUB-TAGLINE</label>
                    <input
                      type="text"
                      value={settings.tagline}
                      onChange={(e) => updateSettings({ tagline: e.target.value })}
                      className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-custom-secondary"
                    />
                  </div>
                </div>
              </div>

              {/* Dynamic Breaking News Marquee */}
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-2">
                <span className="text-slate-400 font-bold uppercase block mb-1">Breaking News Marquee Stream</span>
                <p className="text-[10px] text-slate-500 leading-normal">Enter text items to stream on the ticker ribbon. Separate items with bullets or commas for high-fidelity news feel.</p>
                <textarea
                  value={settings.breakingText}
                  onChange={(e) => {
                    updateSettings({ breakingText: e.target.value });
                  }}
                  rows={3}
                  className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white text-xs focus:outline-none focus:border-custom-secondary resize-none"
                  placeholder="Stream parameters..."
                />
              </div>

              {/* Simulated Search optimization details */}
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
                <span className="text-slate-400 font-bold uppercase block flex items-center justify-between">
                  <span>Simulated SEO Configuration</span>
                  <span className="text-[9px] text-emerald-500 bg-emerald-500/10 px-1 py-0.2 rounded font-mono">Index Live</span>
                </span>
                
                <div>
                  <label className="block text-slate-500 mb-1">ROBOT TITLE HEADER tag</label>
                  <input
                    type="text"
                    value={settings.seoTitle}
                    onChange={(e) => {
                      updateSettings({ seoTitle: e.target.value });
                      document.title = e.target.value;
                    }}
                    className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white focus:outline-none focus:border-custom-secondary"
                    placeholder="title..."
                  />
                </div>

                <div>
                  <label className="block text-slate-500 mb-1">ROBOT META DESCRIPTION tag</label>
                  <textarea
                    value={settings.seoDescription}
                    onChange={(e) => updateSettings({ seoDescription: e.target.value })}
                    rows={2}
                    className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white text-xs focus:outline-none focus:border-custom-secondary resize-none"
                    placeholder="description tag details..."
                  />
                </div>
              </div>

              {/* Interactive Contact Credentials settings */}
              <div className="bg-slate-950 p-4 rounded-lg border border-slate-800 space-y-3">
                <span className="text-slate-400 font-bold uppercase block">Agency Contact Channels</span>
                
                <div>
                  <label className="block text-slate-500 mb-1">AGENCY PHONE</label>
                  <input
                    type="text"
                    value={settings.contactPhone}
                    onChange={(e) => updateSettings({ contactPhone: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 mb-1">SECURE DIRECT EMAIL</label>
                  <input
                    type="email"
                    value={settings.contactEmail}
                    onChange={(e) => updateSettings({ contactEmail: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 mb-1">PHYSICAL STATION ADRESS</label>
                  <input
                    type="text"
                    value={settings.contactAddress}
                    onChange={(e) => updateSettings({ contactAddress: e.target.value })}
                    className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white focus:outline-none"
                  />
                </div>

                <div>
                  <label className="block text-slate-500 mb-1">FOOTER CREDENTIAL DISCLAIMER</label>
                  <textarea
                    value={settings.footerText}
                    onChange={(e) => updateSettings({ footerText: e.target.value })}
                    rows={2}
                    className="w-full bg-slate-900 border border-slate-800 rounded p-2 text-white text-xs focus:outline-none resize-none"
                  />
                </div>
              </div>

              {/* System Reset operations */}
              <div className="bg-red-950/20 p-4 rounded-lg border border-red-900/40 flex justify-between items-center gap-3 mt-4">
                <div>
                  <span className="font-extrabold text-red-400 block text-[11px] uppercase tracking-wider">System Reset Desk</span>
                  <span className="text-[9px] text-slate-400 leading-normal block">Revert the news engine, settings block, and CRUD list to original presets.</span>
                </div>
                <button
                  onClick={handleResetSettings}
                  className="px-3 py-1.5 bg-red-900/60 hover:bg-red-800 text-red-200 hover:text-white rounded text-[10px] font-extrabold uppercase transition-all flex items-center gap-1 cursor-pointer"
                  type="button"
                >
                  <Undo size={11} /> Revert Registry
                </button>
              </div>

            </div>
          )}

        </div>

        {/* Panel Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 flex justify-between items-center text-[11px] font-mono text-slate-500">
          <span>MTD Local Engine Live</span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-850 hover:bg-slate-800 rounded text-slate-205 py-1.5 text-xs font-bold uppercase transition-all cursor-pointer flex items-center justify-center gap-1 hover:text-white"
            id="admin-save-footer-btn"
          >
            <Check size={12} />
            Keep and Close
          </button>
        </div>

      </div>
    </div>
  );
}
