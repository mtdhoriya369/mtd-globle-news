/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { Globe, Search, Newspaper, Menu, X, Sun, Moon, Sparkles, Sliders } from 'lucide-react';
import { SiteSettings } from '../types';

interface HeaderProps {
  settings: SiteSettings;
  updateSettings: (settings: Partial<SiteSettings>) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  openAdmin: () => void;
}

export default function Header({
  settings,
  updateSettings,
  activeTab,
  setActiveTab,
  openAdmin,
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isEditingName, setIsEditingName] = useState(false);
  const [isEditingTagline, setIsEditingTagline] = useState(false);
  const [tempName, setTempName] = useState(settings.siteName);
  const [tempTagline, setTempTagline] = useState(settings.tagline);
  const [currentTime, setCurrentTime] = useState('');

  // Sync temp names of course
  useEffect(() => {
    setTempName(settings.siteName);
  }, [settings.siteName]);

  useEffect(() => {
    setTempTagline(settings.tagline);
  }, [settings.tagline]);

  // Update clock
  useEffect(() => {
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        timeZoneName: 'short',
      };
      setCurrentTime(new Date().toLocaleString('en-US', options));
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleNameSave = () => {
    setIsEditingName(false);
    if (tempName.trim()) {
      updateSettings({ siteName: tempName.trim() });
    }
  };

  const handleTaglineSave = () => {
    setIsEditingTagline(false);
    if (tempTagline.trim()) {
      updateSettings({ tagline: tempTagline.trim() });
    }
  };

  const navItems = [
    { id: 'home', label: 'Home' },
    { id: 'world', label: 'World News' },
    { id: 'business', label: 'Business' },
    { id: 'tech', label: 'Technology' },
    { id: 'energy', label: 'Energy / Economy' },
    { id: 'opinions', label: 'Opinions' },
    { id: 'contact', label: 'Contact' },
  ];

  // Filter based on visible settings
  const filteredNavItems = navItems.filter((item) => {
    if (item.id === 'home') return settings.visibleSections.home;
    if (item.id === 'world') return settings.visibleSections.world;
    if (item.id === 'business') return settings.visibleSections.business;
    if (item.id === 'tech') return settings.visibleSections.tech;
    if (item.id === 'energy') return settings.visibleSections.energy;
    if (item.id === 'opinions') return settings.visibleSections.opinions;
    if (item.id === 'contact') return settings.visibleSections.contact;
    return true;
  });

  return (
    <header className="w-full bg-custom-card border-b border-custom-card shadow-sm sticky top-0 z-40 transition-colors duration-200">
      {/* Top Bar with Live Clock, Quick Access & Toggle */}
      <div className="w-full bg-slate-950 text-slate-400 text-xs py-2 px-4 flex justify-between items-center flex-wrap gap-2 border-b border-slate-900">
        <div className="flex items-center space-x-4">
          <span className="font-mono flex items-center gap-1.5 text-[11px] md:text-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse inline-block"></span>
            LIVE | {currentTime}
          </span>
          <span className="hidden md:inline text-slate-600">|</span>
          <span className="hidden md:inline font-sans text-[11px] tracking-wide text-slate-400">
            MTD Global News Agency Services
          </span>
        </div>
        <div className="flex items-center space-x-3 ml-auto">
          <button
            onClick={() => updateSettings({ darkMode: !settings.darkMode })}
            className="p-1 rounded-md hover:bg-slate-800 hover:text-white transition-colors cursor-pointer"
            title="Toggle Light/Dark Theme"
            id="theme-toggle-btn"
          >
            {settings.darkMode ? <Sun size={15} /> : <Moon size={15} />}
          </button>
          <span className="text-slate-700">|</span>
          <button
            onClick={openAdmin}
            className="flex items-center gap-1 text-[11px] text-custom-secondary px-2 py-0.5 rounded border border-red-900 bg-red-950/20 hover:bg-red-950/40 transition-all font-mono uppercase tracking-wider cursor-pointer font-bold"
            id="header-admin-btn"
          >
            <Sliders size={12} />
            Control Desk
          </button>
        </div>
      </div>

      {/* Main Branding Section */}
      <div className="max-w-7xl mx-auto px-4 md:px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
        {/* Logo and Title */}
        <div className="flex items-center gap-3 select-none">
          <div className="p-3 bg-custom-primary rounded-xl text-white shadow-md flex items-center justify-center border border-white/10">
            <div className="relative">
              <Globe className="w-8 h-8 animate-spin-slow text-white" />
              <Newspaper className="w-4 h-4 absolute -bottom-1 -right-1 text-custom-secondary bg-custom-card rounded-full p-0.5" />
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5 flex-wrap">
              {isEditingName ? (
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  onBlur={handleNameSave}
                  onKeyDown={(e) => e.key === 'Enter' && handleNameSave()}
                  className="text-2xl font-black tracking-tighter uppercase font-custom bg-slate-100 dark:bg-slate-800 text-slate-900 dark:text-white p-1 rounded border border-blue-500 focus:outline-none"
                  autoFocus
                  maxLength={40}
                  id="site-name-input"
                />
              ) : (
                <h1
                  onDoubleClick={() => setIsEditingName(true)}
                  className="text-2xl md:text-3xl font-black tracking-tighter text-custom-primary uppercase font-custom cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded px-1 -mx-1"
                  title="Double-click to edit news title"
                  id="site-title"
                >
                  {settings.siteName}
                </h1>
              )}
            </div>

            {isEditingTagline ? (
              <input
                type="text"
                value={tempTagline}
                onChange={(e) => setTempTagline(e.target.value)}
                onBlur={handleTaglineSave}
                onKeyDown={(e) => e.key === 'Enter' && handleTaglineSave()}
                className="text-xs text-slate-500 dark:text-slate-400 font-medium tracking-normal mt-1 w-72 bg-slate-100 dark:bg-slate-800 p-1 rounded border border-blue-500 focus:outline-none"
                autoFocus
                maxLength={80}
                id="site-tagline-input"
              />
            ) : (
              <p
                onDoubleClick={() => setIsEditingTagline(true)}
                className="text-xs md:text-sm text-slate-500 dark:text-slate-400 font-medium tracking-normal cursor-pointer hover:bg-slate-100 dark:hover:bg-slate-800 rounded px-1 -mx-1 mt-0.5 flex items-center gap-1"
                title="Double-click to edit tagline"
                id="site-tagline"
              >
                <span>{settings.tagline}</span>
                <span className="text-[10px] text-slate-400 px-1 py-0.2 select-none border border-dashed border-slate-300 dark:border-slate-700 rounded scale-90">
                  Double Click Title/Tagline to Edit
                </span>
                <Sparkles size={11} className="text-custom-secondary animate-pulse" />
              </p>
            )}
          </div>
        </div>

        {/* Dynamic Ad space or Mini Weather/Indices widgets for professional news agency vibe */}
        <div className="flex gap-4 text-xs font-mono">
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-lg flex flex-col justify-center min-w-[130px]">
            <span className="text-slate-400 text-[10px] uppercase">NIFTY 50 INDEX</span>
            <span className="text-emerald-500 font-bold flex items-center justify-between mt-0.5">
              <span>24,850.40</span>
              <span className="text-[10px] bg-emerald-500/10 px-1 rounded ml-1">+1.15%</span>
            </span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-lg flex flex-col justify-center min-w-[130px] hidden sm:flex">
            <span className="text-slate-400 text-[10px] uppercase">BRENT CRUDE</span>
            <span className="text-rose-500 font-bold flex items-center justify-between mt-0.5">
              <span>$85.42</span>
              <span className="text-[10px] bg-rose-500/10 px-1 rounded ml-1">+2.45%</span>
            </span>
          </div>
          <div className="bg-slate-50 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-2 rounded-lg flex flex-col justify-center min-w-[110px] hidden md:flex">
            <span className="text-slate-400 text-[10px] uppercase">USD / INR</span>
            <span className="text-slate-700 dark:text-slate-300 font-bold flex items-center justify-between mt-0.5">
              <span>83.65</span>
              <span className="text-[10px] text-slate-400 ml-1">Flat</span>
            </span>
          </div>
        </div>
      </div>

      {/* Navigation and Hamburger Desk */}
      <div className="bg-custom-primary text-white font-custom border-t border-white/5 shadow-md">
        <div className="max-w-7xl mx-auto px-4 md:px-6 flex justify-between items-center relative gap-4">
          {/* Main Desktop Navbar */}
          <nav className="hidden lg:flex items-center space-x-1 overflow-x-auto py-1">
            {filteredNavItems.map((item) => (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`py-3.5 px-4 font-semibold text-sm transition-all relative whitespace-nowrap cursor-pointer uppercase tracking-wider ${
                  activeTab === item.id
                    ? 'text-white border-b-2 border-custom-secondary font-bold bg-white/5'
                    : 'text-slate-300 hover:text-white hover:bg-white/5'
                }`}
                id={`nav-tab-${item.id}`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          {/* Search bar helper */}
          <div className="hidden lg:flex items-center bg-white/10 dark:bg-slate-950/40 rounded-full px-3 py-1.5 border border-white/10 select-none max-w-xs">
            <Search size={14} className="text-slate-300 mr-2" />
            <input
              type="text"
              placeholder="Search intelligence index..."
              className="text-xs bg-transparent border-none text-white focus:outline-none w-44 placeholder-slate-400"
              id="search-input-desktop"
              onChange={(e) => {
                // If needed, parent could handle search query, but this serves beautifully for high-fidelity news feel
              }}
            />
          </div>

          {/* Mobile elements */}
          <div className="flex lg:hidden justify-between items-center w-full py-3.5">
            <span className="text-xs uppercase tracking-wider text-slate-200 font-semibold font-mono">
              Category: {activeTab.toUpperCase()}
            </span>
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-1.5 rounded bg-white/10 text-white cursor-pointer hover:bg-white/20 transition-all"
              id="mobile-menu-btn"
            >
              {isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-slate-900 border-t border-slate-800 animate-slide-down">
            <div className="px-4 py-3 space-y-1">
              {filteredNavItems.map((item) => (
                <button
                  key={item.id}
                  onClick={() => {
                    setActiveTab(item.id);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-3 px-4 rounded font-medium text-sm transition-all uppercase tracking-wider cursor-pointer ${
                    activeTab === item.id
                      ? 'text-white font-bold bg-custom-secondary'
                      : 'text-slate-300 hover:text-white hover:bg-white/5'
                  }`}
                  id={`nav-mobile-${item.id}`}
                >
                  {item.label}
                </button>
              ))}

              <div className="pt-3 border-t border-slate-800">
                <div className="flex items-center bg-slate-950 rounded-lg px-3 py-2 border border-slate-800">
                  <Search size={14} className="text-slate-400 mr-2" />
                  <input
                    type="text"
                    placeholder="Search news database..."
                    className="text-xs bg-transparent border-none text-white focus:outline-none w-full"
                    id="search-input-mobile"
                  />
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Breaking News Ticker Row */}
      {settings.breakingText && (
        <div className="w-full bg-custom-secondary font-mono text-xs text-white py-2 px-4 shadow-inner overflow-hidden border-b border-rose-950 flex items-center">
          <div className="bg-slate-900 text-white font-black uppercase text-[10px] py-1 px-3.5 tracking-wider rounded-md mr-4 flex-shrink-0 flex items-center gap-1.5 shadow-sm border border-slate-800 select-none animate-pulse">
            <div className="w-1.5 h-1.5 rounded-full bg-red-500"></div>
            Breaking Detail
          </div>
          <div className="relative overflow-hidden w-full flex items-center">
            <div className="animate-ticker-marquee text-[11px] md:text-xs">
              <span className="inline-block mr-12 font-medium">
                {settings.breakingText}
              </span>
              <span className="inline-block mr-12 font-medium">
                {settings.breakingText}
              </span>
              <span className="inline-block mr-12 font-medium">
                {settings.breakingText}
              </span>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
