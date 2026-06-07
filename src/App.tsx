/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import {
  getNewsPosts,
  saveNewsPosts,
  getSiteSettings,
  saveSiteSettings,
  applyThemeVariables,
} from './data';
import { NewsPost, SiteSettings, Comment } from './types';
import Header from './components/Header';
import ArticleCard from './components/ArticleCard';
import ArticleModal from './components/ArticleModal';
import AdminDashboard from './components/AdminDashboard';
import ContactSection from './components/ContactSection';
import {
  TrendingUp,
  Award,
  Globe,
  Radio,
  Share2,
  ThumbsUp,
  Eye,
  MessageSquare,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  ChevronRight,
  ShieldAlert,
  Rss
} from 'lucide-react';

export default function App() {
  const [posts, setPosts] = useState<NewsPost[]>([]);
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [activeTab, setActiveTab] = useState<string>('home');
  const [adminOpen, setAdminOpen] = useState<boolean>(false);
  const [readingPost, setReadingPost] = useState<NewsPost | null>(null);

  // States for double click inline edit variables (for header/footer info on homepage)
  const [isEditingFooter, setIsEditingFooter] = useState(false);
  const [tempFooter, setTempFooter] = useState('');

  // Initial mount retrieval
  useEffect(() => {
    const loadedPosts = getNewsPosts();
    const loadedSettings = getSiteSettings();
    setPosts(loadedPosts);
    setSettings(loadedSettings);
    setTempFooter(loadedSettings.footerText);
    applyThemeVariables(loadedSettings);
  }, []);

  // Update theme whenever settings dark mode or colors edit
  useEffect(() => {
    if (settings) {
      applyThemeVariables(settings);
    }
  }, [settings]);

  if (!settings) {
    return (
      <div className="min-h-screen bg-slate-900 text-slate-400 flex items-center justify-center font-mono">
        <div className="text-center space-y-4">
          <div className="w-12 h-12 rounded-full border-4 border-slate-700 border-t-rose-500 animate-spin mx-auto"></div>
          <p className="text-xs tracking-widest uppercase animate-pulse">Synchronizing agency news nodes...</p>
        </div>
      </div>
    );
  }

  // Wrapper to update and save settings state
  const handleUpdateSettings = (newSettingsFields: Partial<SiteSettings>) => {
    setSettings((prev) => {
      if (!prev) return null;
      const updated = { ...prev, ...newSettingsFields };
      saveSiteSettings(updated);
      return updated;
    });
  };

  // Wrapper to update and save posts state
  const handleSavePosts = (updatedPosts: NewsPost[]) => {
    setPosts(updatedPosts);
    saveNewsPosts(updatedPosts);
  };

  // Like increment handler
  const handleLikePost = (postId: string) => {
    const freshPosts = posts.map((p) => {
      if (p.id === postId) {
        return { ...p, likes: p.likes + 1 };
      }
      return p;
    });
    handleSavePosts(freshPosts);
    
    // Sync current modal display if reading
    if (readingPost && readingPost.id === postId) {
      setReadingPost((prev) => prev ? { ...prev, likes: prev.likes + 1 } : null);
    }
  };

  // Read increment helper
  const handleReadPost = (post: NewsPost) => {
    const freshPosts = posts.map((p) => {
      if (p.id === post.id) {
        return { ...p, views: p.views + 1 };
      }
      return p;
    });
    handleSavePosts(freshPosts);
    setReadingPost({ ...post, views: post.views + 1 });
  };

  // Add Comment annotation
  const handleAddComment = (postId: string, commentArgs: Omit<Comment, 'id' | 'date'>) => {
    const freshComment: Comment = {
      id: `c_${Date.now()}`,
      author: commentArgs.author,
      text: commentArgs.text,
      date: new Date().toISOString().split('T')[0],
    };

    const freshPosts = posts.map((p) => {
      if (p.id === postId) {
        return {
          ...p,
          comments: [...p.comments, freshComment],
        };
      }
      return p;
    });

    handleSavePosts(freshPosts);

    // Sync modal reading display
    if (readingPost && readingPost.id === postId) {
      setReadingPost((prev) =>
        prev ? { ...prev, comments: [...prev.comments, freshComment] } : null
      );
    }
  };

  // Double click footer save
  const handleFooterSave = () => {
    setIsEditingFooter(false);
    if (tempFooter.trim()) {
      handleUpdateSettings({ footerText: tempFooter.trim() });
    }
  };

  // Filter posts based on current categories
  const getFilteredPosts = () => {
    if (activeTab === 'home') {
      return posts;
    }
    if (activeTab === 'world') {
      return posts.filter((p) => p.category === 'world');
    }
    if (activeTab === 'business') {
      return posts.filter((p) => p.category === 'business');
    }
    if (activeTab === 'tech') {
      return posts.filter((p) => p.category === 'tech');
    }
    if (activeTab === 'energy') {
      return posts.filter((p) => p.category === 'energy-economy');
    }
    if (activeTab === 'opinions') {
      return posts.filter((p) => p.category === 'opinion');
    }
    return [];
  };

  const currentDisplayPosts = getFilteredPosts();

  // Find featured post (post marked as featured or with highest likes/views)
  const featuredPost = posts.find((p) => p.isFeatured) || posts[0];
  const sideChronologyPosts = posts.filter((p) => p.id !== (featuredPost?.id || ''));

  // Get metadata for categories
  const getCategoryTheme = (cat: string) => {
    switch (cat) {
      case 'world': return 'text-blue-500 bg-blue-500/10 border-blue-500/20';
      case 'business': return 'text-amber-500 bg-amber-500/10 border-amber-500/20';
      case 'tech': return 'text-purple-500 bg-purple-500/10 border-purple-500/20';
      case 'energy-economy': return 'text-emerald-500 bg-emerald-500/10 border-emerald-500/20';
      case 'opinion': return 'text-rose-500 bg-rose-500/10 border-rose-500/20';
      default: return 'text-slate-500 bg-slate-500/10 border-slate-500/20';
    }
  };

  return (
    <div className={`min-h-screen flex flex-col ${settings.darkMode ? 'dark bg-slate-900 text-white' : 'bg-slate-50 text-slate-900'} transition-colors duration-200`}>
      
      {/* Brand Header & Breaking Ticker */}
      <Header
        settings={settings}
        updateSettings={handleUpdateSettings}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        openAdmin={() => setAdminOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-grow max-w-7xl mx-auto px-4 md:px-6 py-8 w-full">
        
        {/* VIEW 1: HOME PAGE GRID WITH HERO HERO BANNER AND SIDEBARS */}
        {activeTab === 'home' && (
          <div className="space-y-10">
            
            {/* Top row hero split: Top Feature Article on Left, chronological feed on right */}
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
              
              {/* Featured Hero Story (Left Column, spanned wide on desktop) */}
              {featuredPost && (
                <div
                  className="lg:col-span-8 bg-custom-card border border-custom-card rounded-2xl overflow-hidden hover:shadow-2xl transition-all duration-300 flex flex-col text-left group cursor-pointer"
                  onClick={() => handleReadPost(featuredPost)}
                  id="home-featured-hero"
                >
                  <div className="h-80 md:h-110 overflow-hidden relative">
                    <img
                      src={featuredPost.imageUrl}
                      alt={featuredPost.title}
                      className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-700"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
                    
                    <div className="absolute top-4 left-4 flex gap-2">
                      <span className="text-[10px] font-extrabold text-white px-3 py-1 bg-red-600 rounded-full shadow tracking-wider uppercase">
                        LEAD INVESTIGATION
                      </span>
                      <span className={`text-[10px] font-bold text-white px-3 py-1 rounded-full shadow uppercase border border-white/20 bg-slate-950/80`}>
                        {featuredPost.category.replace('-', ' & ')}
                      </span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 space-y-2">
                      <span className="text-[10px] text-slate-300 font-mono flex items-center gap-1.5 uppercase tracking-wide">
                        <Radio size={12} className="text-red-500 animate-pulse" />
                        Dispatched Live • {new Date(featuredPost.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}
                      </span>
                      <h2 className="text-xl md:text-3xl font-extrabold text-white tracking-tight leading-tight group-hover:text-amber-400 transition-colors">
                        {featuredPost.title}
                      </h2>
                    </div>
                  </div>

                  <div className="p-6 space-y-4 flex-grow flex flex-col justify-between">
                    <p className="text-sm md:text-base text-slate-550 dark:text-slate-300 leading-relaxed font-sans">
                      {featuredPost.summary}
                    </p>

                    <div className="pt-4 border-t border-dashed border-slate-100 dark:border-slate-800 flex justify-between items-center text-xs font-mono text-slate-400">
                      <div className="flex space-x-4">
                        <span className="flex items-center gap-1"><Eye size={13} /> {featuredPost.views} Strategic reads</span>
                        <span className="flex items-center gap-1"><ThumbsUp size={12} /> {featuredPost.likes} support indices</span>
                        <span className="flex items-center gap-1"><MessageSquare size={12} /> {featuredPost.comments.length} annotations</span>
                      </div>
                      <span className="text-custom-secondary font-bold group-hover:underline flex items-center gap-1">
                        Read full wire <ChevronRight size={14} />
                      </span>
                    </div>
                  </div>
                </div>
              )}

              {/* Sidebar Chronology Feed (Right Column) */}
              <div className="lg:col-span-4 flex flex-col space-y-4">
                <div className="border border-custom-card bg-custom-card p-4 rounded-2xl flex-shrink-0 text-left">
                  <h3 className="text-xs font-black uppercase text-slate-400 tracking-widest mb-3 font-mono flex items-center gap-1.5">
                    <TrendingUp size={14} className="text-custom-secondary" />
                    Latest Agency Dispatches
                  </h3>
                  
                  <div className="space-y-4 max-h-[460px] overflow-y-auto pr-1">
                    {sideChronologyPosts.slice(0, 5).map((post) => (
                      <div
                        key={post.id}
                        onClick={() => handleReadPost(post)}
                        className="py-2.5 border-b border-slate-100 dark:border-slate-800 last:border-b-0 group cursor-pointer flex gap-3 text-left"
                      >
                        <div className="w-16 h-16 rounded overflow-hidden flex-shrink-0 bg-slate-100 hidden sm:block">
                          <img src={post.imageUrl} alt="" className="w-full h-full object-cover" />
                        </div>
                        <div className="min-w-0">
                          <span className={`text-[8px] font-bold px-1.5 py-0.2 rounded inline-block uppercase mb-1 tracking-wide border ${getCategoryTheme(post.category)}`}>
                            {post.category}
                          </span>
                          <h4 className="text-xs font-bold text-slate-900 dark:text-white leading-snug line-clamp-2 group-hover:text-custom-secondary transition-colors">
                            {post.title}
                          </h4>
                          <span className="text-[10px] text-slate-400 block font-mono mt-0.5">{post.date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Extra simulated indices badge for high-fidelity news identity */}
                <div className="bg-gradient-to-br from-slate-950 to-slate-900 text-white rounded-2xl p-4 text-left border border-slate-800 space-y-2 font-mono text-[11px]">
                  <h4 className="font-extrabold uppercase text-slate-400 flex items-center gap-1">
                    <Award size={13} className="text-amber-500" />
                    MTD Analytical Coverage
                  </h4>
                  <ul className="space-y-1.5 list-inside list-disc text-slate-300">
                    <li>Middle East shipping hazard index: <span className="text-red-400 font-bold">HIGH</span></li>
                    <li>Noida International DXN cargo test: <span className="text-emerald-400 font-bold">100% SUCCESS</span></li>
                    <li>Andaman offshore drill volume forecast: <span className="text-amber-400 font-bold">120M Barrels</span></li>
                  </ul>
                </div>
              </div>

            </div>

            {/* Middle Section Row: Primary news grid of all posts */}
            <div className="space-y-6">
              <div className="flex justify-between items-center border-b border-slate-200 dark:border-slate-800 pb-3 flex-wrap gap-3">
                <h3 className="text-xl font-black uppercase text-custom-primary tracking-tight font-custom">
                  Comprehensive Intelligence Index
                </h3>
                
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleUpdateSettings({ layout: 'grid' })}
                    className={`p-1.5 rounded cursor-pointer ${settings.layout === 'grid' ? 'bg-custom-secondary text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-850'}`}
                    title="Grid Card View"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M4 4h4v4H4V4zm6 0h4v4h-4V4zm6 0h4v4h-4V4zM4 10h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4zM4 16h4v4H4v-4zm6 0h4v4h-4v-4zm6 0h4v4h-4v-4z"/></svg>
                  </button>
                  <button
                    onClick={() => handleUpdateSettings({ layout: 'list' })}
                    className={`p-1.5 rounded cursor-pointer ${settings.layout === 'list' ? 'bg-custom-secondary text-white' : 'hover:bg-slate-200 dark:hover:bg-slate-850'}`}
                    title="List Item View"
                  >
                    <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24"><path d="M4 6h16v2H4V6zm0 5h16v2H4v-2zm0 5h16v2H4v-2z"/></svg>
                  </button>
                </div>
              </div>

              {/* Layout choice */}
              <div
                className={
                  settings.layout === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'flex flex-col space-y-4'
                }
                id="news-feed-container"
              >
                {posts.map((post) => (
                  <ArticleCard
                    key={post.id}
                    post={post}
                    layout={settings.layout}
                    onClick={() => handleReadPost(post)}
                    onEdit={() => {
                      setAdminOpen(true);
                    }}
                    onLike={(e) => {
                      e.stopPropagation();
                      handleLikePost(post.id);
                    }}
                  />
                ))}
              </div>
            </div>

          </div>
        )}

        {/* VIEW 2: CATEGORY SPECIFIC FLOW VIEWS */}
        {activeTab !== 'home' && activeTab !== 'contact' && (
          <div className="space-y-6">
            <div className="text-left py-4 border-b border-custom-card">
              <span className="text-xs font-black font-mono uppercase tracking-widest text-slate-400">
                In-Depth Wire Category Archive
              </span>
              <h2 className="text-3xl font-black text-custom-primary uppercase tracking-tight font-custom mt-1">
                {activeTab === 'energy' ? 'Energy & Economy' : activeTab === 'world' ? 'World News' : activeTab === 'opinions' ? 'Editorial Opinions' : activeTab.toUpperCase()}
              </h2>
            </div>

            {currentDisplayPosts.length === 0 ? (
              <div className="py-20 text-center space-y-4 bg-custom-card border border-custom-card rounded-2xl p-6">
                <ShieldAlert className="mx-auto text-slate-400" size={40} />
                <h3 className="text-base font-bold font-mono text-slate-600 uppercase">No news records archived on this wire</h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto">
                  Use the administrative console Control Desk to seed or publish new dispatches to the {activeTab} category feed!
                </p>
                <button
                  onClick={() => setAdminOpen(true)}
                  className="px-4 py-2 bg-custom-primary text-white hover:bg-slate-900 text-xs font-mono font-bold uppercase rounded cursor-pointer transition-all border border-white/5"
                >
                  🚀 Launch Control Desk
                </button>
              </div>
            ) : (
              <div
                className={
                  settings.layout === 'grid'
                    ? 'grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6'
                    : 'flex flex-col space-y-4'
                }
                id="filtered-category-feed"
              >
                {currentDisplayPosts.map((post) => (
                  <ArticleCard
                    key={post.id}
                    post={post}
                    layout={settings.layout}
                    onClick={() => handleReadPost(post)}
                    onEdit={() => setAdminOpen(true)}
                    onLike={(e) => {
                      e.stopPropagation();
                      handleLikePost(post.id);
                    }}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* VIEW 3: SECURE CONTACT COMPONENT */}
        {activeTab === 'contact' && (
          <ContactSection settings={settings} updateSettings={handleUpdateSettings} />
        )}

      </main>

      {/* Professional Footer block */}
      <footer className="w-full bg-slate-950 text-slate-400 border-t border-slate-900 py-10 px-4 md:px-6 mt-12 text-left">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Col 1: Bio */}
          <div className="space-y-4">
            <div className="flex items-center gap-2.5">
              <Globe className="w-6 h-6 text-custom-secondary animate-pulse" />
              <span className="text-white text-base font-black tracking-wider uppercase font-mono">
                {settings.siteName}
              </span>
            </div>
            
            <p className="text-xs leading-relaxed text-slate-500 font-sans">
              MTD Global News (M.T.D. G.N.) is an international sovereign investigative intelligence news agency. Our reports deliver unfiltered ground reality analysis covering bilateral trades, strategic energy caves, and infrastructure transits.
            </p>

            <div className="flex space-x-3">
              <button onClick={() => alert('[mtd global news] Copied official social address.')} className="p-2 bg-slate-900 hover:bg-slate-800 hover:text-white rounded transition-colors cursor-pointer text-slate-500"><Facebook size={14} /></button>
              <button onClick={() => alert('[mtd global news] Copied official social address.')} className="p-2 bg-slate-900 hover:bg-slate-800 hover:text-white rounded transition-colors cursor-pointer text-slate-500"><Twitter size={14} /></button>
              <button onClick={() => alert('[mtd global news] Copied official social address.')} className="p-2 bg-slate-900 hover:bg-slate-800 hover:text-white rounded transition-colors cursor-pointer text-slate-500"><Linkedin size={14} /></button>
              <button onClick={() => alert('[mtd global news] Copied official social address.')} className="p-2 bg-slate-900 hover:bg-slate-800 hover:text-white rounded transition-colors cursor-pointer text-slate-500"><Instagram size={14} /></button>
              <button onClick={() => alert('[mtd global news] RSS feed linked successfully.')} className="p-2 bg-slate-900 hover:bg-slate-800 hover:text-white rounded transition-colors cursor-pointer text-slate-500" title="RSS Agency feed"><Rss size={14} /></button>
            </div>
          </div>

          {/* Col 2: Recent headlines links */}
          <div className="space-y-4 font-mono">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest border-b border-slate-800 pb-2">
              Wire Priority Headlines
            </h4>
            
            <ul className="space-y-2.5 text-xs text-slate-500">
              {posts.slice(0, 3).map((post) => (
                <li
                  key={post.id}
                  onClick={() => handleReadPost(post)}
                  className="hover:text-custom-secondary transition-colors cursor-pointer flex items-center gap-1 min-w-0"
                >
                  <ChevronRight size={12} className="flex-shrink-0 text-red-500" />
                  <span className="truncate">{post.title}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Quick info details */}
          <div className="space-y-4 text-xs font-mono">
            <h4 className="text-white text-xs font-bold uppercase tracking-widest border-b border-slate-800 pb-2">
              Agency Information desk
            </h4>
            
            <div className="space-y-2 text-slate-500 select-none">
              <p>Email: <span className="text-slate-400 font-bold">{settings.contactEmail}</span></p>
              <p>Hotline: <span className="text-slate-400 font-bold">{settings.contactPhone}</span></p>
              <p className="line-clamp-2">HQ: <span className="text-slate-400 font-bold">{settings.contactAddress}</span></p>
            </div>
          </div>

        </div>

        {/* Footer bottom bar with double click trigger and license */}
        <div className="max-w-7xl mx-auto border-t border-slate-900 mt-8 pt-6 flex flex-col sm:flex-row justify-between items-center text-[10px] text-slate-500 font-mono gap-4">
          <div className="flex items-center gap-1 relative select-none">
            {isEditingFooter ? (
              <input
                type="text"
                value={tempFooter}
                onChange={(e) => setTempFooter(e.target.value)}
                onBlur={handleFooterSave}
                onKeyDown={(e) => e.key === 'Enter' && handleFooterSave()}
                className="bg-slate-900 border border-slate-700 rounded p-1 text-[10px] w-80 text-white focus:outline-none"
                autoFocus
              />
            ) : (
              <span
                onDoubleClick={() => setIsEditingFooter(true)}
                className="hover:text-slate-350 cursor-pointer hover:bg-slate-900 rounded p-1"
                title="Double-click this footer disclaimer text to edit it"
                id="footer-disclaimer-label"
              >
                {settings.footerText}
              </span>
            )}
          </div>

          <div className="flex items-center gap-4">
            <span className="text-slate-700">|</span>
            <button
              onClick={() => setAdminOpen(true)}
              className="text-[11px] text-custom-secondary font-black uppercase flex items-center gap-1 hover:text-white transition-all tracking-wider cursor-pointer font-bold animate-pulse"
              id="footer-admin-trigger-btn"
            >
              🔧 Admin Desk
            </button>
          </div>
        </div>
      </footer>

      {/* ARTICLE READER MODAL OVERLAY */}
      {readingPost && (
        <ArticleModal
          post={readingPost}
          onClose={() => setReadingPost(null)}
          onLike={() => handleLikePost(readingPost.id)}
          onAddComment={(commentArgs) => handleAddComment(readingPost.id, commentArgs)}
        />
      )}

      {/* ADMINISTRATIVE OVERLAY CONTROL PANEL */}
      {adminOpen && (
        <AdminDashboard
          settings={settings}
          updateSettings={handleUpdateSettings}
          posts={posts}
          savePosts={handleSavePosts}
          onClose={() => setAdminOpen(false)}
        />
      )}

    </div>
  );
}
