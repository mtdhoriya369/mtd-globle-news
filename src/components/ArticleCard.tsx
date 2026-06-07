/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Eye, Heart, MessageSquare, Edit3, Share2, Calendar, ArrowRight } from 'lucide-react';
import { NewsPost } from '../types';

interface ArticleCardProps {
  post: NewsPost;
  layout: 'grid' | 'list';
  onClick: () => void;
  onEdit: () => void;
  onLike: (e: React.MouseEvent) => void;
  key?: string | number;
}

export default function ArticleCard({
  post,
  layout,
  onClick,
  onEdit,
  onLike,
}: ArticleCardProps) {
  const [hovered, setHovered] = useState(false);

  // Map category to readable titles
  const getCategoryMeta = (cat: string) => {
    switch (cat) {
      case 'world':
        return { label: 'WORLD NEWS', bg: 'bg-blue-600 dark:bg-blue-700', text: 'text-blue-600' };
      case 'business':
        return { label: 'BUSINESS', bg: 'bg-amber-600 dark:bg-amber-700', text: 'text-amber-600' };
      case 'tech':
        return { label: 'TECHNOLOGY', bg: 'bg-purple-600 dark:bg-purple-700', text: 'text-purple-600' };
      case 'energy-economy':
        return { label: 'ENERGY & ECONOMY', bg: 'bg-emerald-600 dark:bg-emerald-700', text: 'text-emerald-600' };
      case 'opinion':
        return { label: 'OPINION', bg: 'bg-rose-600 dark:bg-rose-700', text: 'text-rose-600' };
      default:
        return { label: cat.toUpperCase(), bg: 'bg-slate-600 dark:bg-slate-700', text: 'text-slate-600' };
    }
  };

  const catMeta = getCategoryMeta(post.category);
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
    year: 'numeric'
  });

  const handleShareClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    alert(`[mtd global news] Shared article link generated: https://mtdglobalnews.blogspot.com/post/${post.id}\n(Simulated destination copied to clipboard!)`);
  };

  if (layout === 'list') {
    return (
      <div
        onClick={onClick}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        className="bg-custom-card border border-custom-card rounded-xl overflow-hidden hover:shadow-lg hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-200 cursor-pointer flex flex-col md:flex-row gap-4 p-4 text-left relative group md:items-center"
        id={`post-list-card-${post.id}`}
      >
        {/* Article Image thumbnail */}
        <div className="w-full md:w-56 h-36 flex-shrink-0 overflow-hidden rounded-lg bg-slate-100 relative">
          <img
            src={post.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=400&q=80'}
            alt={post.title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            referrerPolicy="no-referrer"
          />
          <span className={`absolute top-2 left-2 text-[9px] font-bold text-white px-2 py-0.5 rounded shadow ${catMeta.bg}`}>
            {catMeta.label}
          </span>
        </div>

        {/* Article text details */}
        <div className="flex-grow flex flex-col justify-between py-1 h-full">
          <div>
            <div className="flex items-center gap-1.5 text-[11px] text-slate-400 dark:text-slate-500 font-mono mb-1">
              <Calendar size={11} />
              <span>{formattedDate}</span>
              {post.isFeatured && (
                <span className="text-[10px] text-custom-secondary font-bold uppercase tracking-widest ml-1 bg-red-100 dark:bg-red-950/40 px-1.5 py-0.2 rounded border border-red-200 dark:border-red-900/40">
                  Top Priority
                </span>
              )}
            </div>
            
            <h3
              className="text-base md:text-lg font-bold text-slate-900 dark:text-white leading-tight group-hover:text-custom-secondary transition-colors"
              onDoubleClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              title="Double-click item title to open control desk editor"
            >
              {post.title}
            </h3>
            
            <p className="text-xs md:text-sm text-slate-500 dark:text-slate-400 line-clamp-2 mt-1.5 leading-relaxed font-sans">
              {post.summary}
            </p>
          </div>

          <div className="flex justify-between items-center mt-4 pt-3 border-t border-dashed border-slate-100 dark:border-slate-800 flex-wrap gap-2">
            <div className="flex items-center space-x-4 text-[11px] font-mono text-slate-400 dark:text-slate-500">
              <span className="flex items-center gap-1" title={`${post.views} Views`}>
                <Eye size={12} />
                <span>{post.views}</span>
              </span>
              <button
                onClick={onLike}
                className="flex items-center gap-1 hover:text-red-500 transition-colors cursor-pointer"
                title={`${post.likes} Likes`}
              >
                <Heart size={12} className={post.likes > 75 ? "fill-rose-500 text-rose-500" : ""} />
                <span>{post.likes}</span>
              </button>
              <span className="flex items-center gap-1" title={`${post.comments.length} Comments`}>
                <MessageSquare size={12} />
                <span>{post.comments.length}</span>
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={handleShareClick}
                className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-blue-500 transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 rounded font-bold cursor-pointer"
                title="Generate simulated sharing url"
              >
                <Share2 size={13} />
              </button>
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onEdit();
                }}
                className="p-1.5 text-slate-400 dark:text-slate-500 hover:text-custom-secondary transition-colors hover:bg-slate-50 dark:hover:bg-slate-800 rounded font-bold cursor-pointer"
                title="Edit this post inside control desk"
              >
                <Edit3 size={13} />
              </button>
              <span className="text-custom-secondary text-xs font-bold flex items-center gap-0.5 opacity-0 group-hover:opacity-100 transition-opacity ml-1">
                Read Intelligence <ArrowRight size={12} />
              </span>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Grid Layout
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      className="bg-custom-card border border-custom-card rounded-xl overflow-hidden hover:shadow-xl hover:border-slate-300 dark:hover:border-slate-700 transition-all duration-300 cursor-pointer flex flex-col text-left group"
      id={`post-grid-card-${post.id}`}
    >
      {/* Article Image thumbnail */}
      <div className="h-48 overflow-hidden bg-slate-100 relative">
        <img
          src={post.imageUrl || 'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=400&q=80'}
          alt={post.title}
          className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500"
          referrerPolicy="no-referrer"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 to-transparent"></div>
        <span className={`absolute top-3 left-3 text-[9px] font-extrabold text-white px-2 py-0.5 rounded shadow tracking-wide ${catMeta.bg}`}>
          {catMeta.label}
        </span>
      </div>

      {/* Title & summary info */}
      <div className="p-4 flex-grow flex flex-col justify-between">
        <div>
          <div className="flex items-center gap-1.5 text-[10px] text-slate-400 dark:text-slate-500 font-mono mb-2">
            <Calendar size={10} />
            <span>{formattedDate}</span>
            {post.isFeatured && (
              <span className="text-[8px] text-red-600 dark:text-red-400 font-extrabold uppercase tracking-wider ml-1.5 bg-red-50 dark:bg-red-950/30 px-1 py-0.2 rounded border border-red-200/40">
                TOP SELECTION
              </span>
            )}
          </div>
          
          <h3
            className="text-base font-bold text-slate-900 dark:text-white leading-snug group-hover:text-custom-secondary transition-colors"
            onDoubleClick={(e) => {
              e.stopPropagation();
              onEdit();
            }}
            title="Double-click header text to instantly trigger control desk editor"
          >
            {post.title}
          </h3>
          
          <p className="text-xs text-slate-500 dark:text-slate-400 line-clamp-3 mt-2 leading-relaxed">
            {post.summary}
          </p>
        </div>

        {/* Actions bar */}
        <div className="mt-4 pt-3 border-t border-dashed border-slate-100 dark:border-slate-800 flex justify-between items-center flex-wrap gap-2">
          {/* Metrics */}
          <div className="flex items-center space-x-3 text-[10px] font-mono text-slate-400 dark:text-slate-500">
            <span className="flex items-center gap-0.5">
              <Eye size={11} />
              <span>{post.views}</span>
            </span>
            <button
              onClick={onLike}
              className="flex items-center gap-0.5 hover:text-red-500 transition-colors cursor-pointer"
            >
              <Heart size={11} className={post.likes > 75 ? "fill-rose-500 text-rose-500" : ""} />
              <span>{post.likes}</span>
            </button>
            <span className="flex items-center gap-0.5">
              <MessageSquare size={11} />
              <span>{post.comments.length}</span>
            </span>
          </div>

          {/* Quick interactive utility icons */}
          <div className="flex items-center gap-1.5">
            <button
              onClick={handleShareClick}
              className="p-1 text-slate-400 dark:text-slate-500 hover:text-blue-500 hover:bg-slate-50 dark:hover:bg-slate-800 rounded transition-all cursor-pointer font-bold"
              title="Share this article"
            >
              <Share2 size={12} />
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onEdit();
              }}
              className="p-1 text-slate-400 dark:text-slate-500 hover:text-custom-secondary hover:bg-slate-50 dark:hover:bg-slate-800 rounded transition-all cursor-pointer font-bold"
              title="Edit article inside panel"
            >
              <Edit3 size={12} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
