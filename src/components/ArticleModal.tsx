/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { X, Calendar, Eye, Heart, MessageSquare, Share2, Facebook, Twitter, Linkedin, Send, Smile } from 'lucide-react';
import { NewsPost, Comment } from '../types';

interface ArticleModalProps {
  post: NewsPost;
  onClose: () => void;
  onLike: () => void;
  onAddComment: (comment: Omit<Comment, 'id' | 'date'>) => void;
}

export default function ArticleModal({
  post,
  onClose,
  onLike,
  onAddComment,
}: ArticleModalProps) {
  const [commentName, setCommentName] = useState('');
  const [commentText, setCommentText] = useState('');
  const [hasLiked, setHasLiked] = useState(false);
  const [likesCount, setLikesCount] = useState(post.likes);
  const [viewsCount, setViewsCount] = useState(post.views + 1); // increment on read

  // Handle local liking toggle
  const handleLikeToggle = () => {
    if (!hasLiked) {
      setHasLiked(true);
      setLikesCount(likesCount + 1);
      onLike();
    } else {
      setHasLiked(false);
      setLikesCount(likesCount - 1);
    }
  };

  const handlesubmitComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!commentName.trim() || !commentText.trim()) return;

    onAddComment({
      author: commentName.trim(),
      text: commentText.trim(),
    });

    setCommentText('');
    alert('[mtd global news] Comment submitted and stored in local cache successfully!');
  };

  const handleShareOnSocial = (platform: string) => {
    alert(`[mtd global news] Simulating share to ${platform}!\nTarget URL: https://mtdglobalnews.blogspot.com/post/${post.id}`);
  };

  const getCategoryMeta = (cat: string) => {
    switch (cat) {
      case 'world':
        return { label: 'WORLD NEWS', color: 'text-blue-500 bg-blue-500/10' };
      case 'business':
        return { label: 'BUSINESS TRANSIT', color: 'text-amber-500 bg-amber-500/10' };
      case 'tech':
        return { label: 'TECHNOLOGY', color: 'text-purple-500 bg-purple-500/10' };
      case 'energy-economy':
        return { label: 'ENERGY & INFRASTRUCTURE', color: 'text-emerald-500 bg-emerald-500/10' };
      case 'opinion':
        return { label: 'OPINION', color: 'text-rose-500 bg-rose-500/10' };
      default:
        return { label: cat.toUpperCase(), color: 'text-slate-500 bg-slate-500/10' };
    }
  };

  const catMeta = getCategoryMeta(post.category);
  const formattedDate = new Date(post.date).toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });

  return (
    <div className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm flex justify-center items-center z-50 p-4 overflow-y-auto animate-fade-in" id="article-reader-modal">
      <div className="bg-custom-card border border-custom-card rounded-2xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto flex flex-col relative text-left animate-scale-up" id="reader-pane-container">
        
        {/* Floating Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 bg-slate-900/40 text-white rounded-full hover:bg-slate-900/80 transition-all z-10 cursor-pointer shadow-lg hover:rotate-90 duration-200"
          title="Back to news flow"
          id="close-reader-btn"
        >
          <X size={20} />
        </button>

        {/* Hero Banner Image */}
        <div className="w-full h-64 md:h-96 relative flex-shrink-0 bg-slate-250">
          <img
            src={post.imageUrl || 'https://images.unsplash.com/photo-1504711434969-e33886168f5c?auto=format&fit=crop&w=1200&q=80'}
            alt={post.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent"></div>
          
          <div className="absolute bottom-6 left-6 right-6">
            <span className={`inline-block text-xs font-bold px-3 py-1 rounded-full border border-current mb-3 uppercase tracking-widest ${catMeta.color}`}>
              {catMeta.label}
            </span>
            <h1 className="text-xl md:text-3xl font-extrabold text-white tracking-tight leading-tight">
              {post.title}
            </h1>
          </div>
        </div>

        {/* Info Ribbon Details */}
        <div className="bg-slate-50 dark:bg-slate-900/60 border-b border-custom-card px-6 py-4 flex flex-wrap justify-between items-center gap-4 text-xs font-mono text-slate-500">
          <div className="flex items-center space-x-2">
            <Calendar size={13} className="text-custom-secondary" />
            <span>{formattedDate}</span>
          </div>

          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-1.5" title={`${viewsCount} Strategic reads`}>
              <Eye size={14} className="text-slate-400" />
              <span>{viewsCount} Read Index</span>
            </span>

            <button
              onClick={handleLikeToggle}
              className={`flex items-center gap-1.5 transition-colors cursor-pointer ${
                hasLiked ? 'text-rose-600 font-bold' : 'hover:text-rose-500'
              }`}
              title="Add support index"
            >
              <Heart size={14} className={hasLiked ? 'fill-rose-600' : ''} />
              <span>{likesCount} likes</span>
            </button>

            <span className="flex items-center gap-1.5">
              <MessageSquare size={13} />
              <span>{post.comments.length} annotations</span>
            </span>
          </div>
        </div>

        {/* Content Body Layout */}
        <div className="p-6 md:p-8 flex flex-col md:flex-row gap-8">
          
          {/* Main article text columns */}
          <div className="flex-grow space-y-6 md:w-2/3">
            {/* Editor's summary layout */}
            <div className="bg-slate-50 dark:bg-slate-900 border-l-4 border-custom-secondary p-4 rounded-r-lg font-sans text-sm md:text-base leading-relaxed text-slate-600 dark:text-slate-300 italic select-all shadow-inner">
              <span className="font-bold uppercase tracking-wider text-xs block mb-1 text-custom-secondary font-mono">
                Executive Agency Intelligence Summary
              </span>
              "{post.summary}"
            </div>

            {/* Main Long Form Paragraphs */}
            <div className="font-custom text-slate-800 dark:text-slate-200 text-sm md:text-base leading-relaxed space-y-4 whitespace-pre-wrap select-all">
              {post.content.split('\n\n').map((paragraph, idx) => (
                <p key={idx} className="indent-4 md:indent-8">
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Social sharing and print helper block */}
            <div className="bg-slate-5 p-4 rounded-xl border border-dashed border-slate-200 dark:border-slate-800 flex items-center justify-between flex-wrap gap-4 mt-8">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-slate-400">SHARE WIRE DETAILS:</span>
                <button
                  onClick={() => handleShareOnSocial('Facebook')}
                  className="p-1 text-slate-400 hover:text-blue-600 transition-colors cursor-pointer"
                  title="Share to Facebook"
                >
                  <Facebook size={16} />
                </button>
                <button
                  onClick={() => handleShareOnSocial('Twitter')}
                  className="p-1 text-slate-400 hover:text-sky-500 transition-colors cursor-pointer"
                  title="Share to Twitter"
                >
                  <Twitter size={16} />
                </button>
                <button
                  onClick={() => handleShareOnSocial('LinkedIn')}
                  className="p-1 text-slate-400 hover:text-blue-700 transition-colors cursor-pointer"
                  title="Share to LinkedIn"
                >
                  <Linkedin size={16} />
                </button>
              </div>

              <button
                onClick={() => {
                  alert('[mtd global news] Preparing document. Triggering print guidelines interface.');
                  window.print();
                }}
                className="text-[10px] uppercase font-mono tracking-wider font-extrabold text-custom-primary hover:text-custom-secondary border border-slate-300 dark:border-slate-700 px-3 py-1 rounded hover:bg-slate-100 dark:hover:bg-slate-800 transition-all cursor-pointer"
              >
                ⚓ Copy Ledger / Print
              </button>
            </div>
          </div>

          {/* Right Sidebar Widget area - Comment thread */}
          <div className="md:w-1/3 border-t md:border-t-0 md:border-l border-slate-200 dark:border-slate-800 pt-8 md:pt-0 md:pl-8 space-y-6 flex-shrink-0">
            <div>
              <h4 className="text-xs font-black uppercase tracking-widest text-slate-400 mb-4 font-mono flex items-center gap-1">
                <MessageSquare size={12} />
                Agency Intelligence Annotations
              </h4>

              {/* Dynamic Comments list */}
              <div className="space-y-3.5 max-h-[280px] overflow-y-auto pr-2" id="comments-thread-box">
                {post.comments.length === 0 ? (
                  <p className="text-xs text-slate-400 italic py-4">No comments recorded on this dispatch yet. Be the first to annotate.</p>
                ) : (
                  post.comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800/40 p-3 rounded-lg text-xs"
                    >
                      <div className="flex justify-between items-center mb-1 text-[10px] text-slate-400 font-mono">
                        <span className="font-bold text-slate-800 dark:text-slate-300">{comment.author}</span>
                        <span>{comment.date}</span>
                      </div>
                      <p className="text-slate-600 dark:text-slate-350 leading-relaxed font-sans">{comment.text}</p>
                    </div>
                  ))
                )}
              </div>
            </div>

            {/* Comment Form */}
            <form onSubmit={handlesubmitComment} className="space-y-3 pt-3 border-t border-slate-250 dark:border-slate-800">
              <span className="text-[11px] font-black uppercase tracking-widest text-slate-400 font-mono block">Add Annotation</span>
              
              <div className="relative">
                <input
                  type="text"
                  placeholder="Your Name"
                  required
                  value={commentName}
                  onChange={(e) => setCommentName(e.target.value)}
                  className="w-full text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-custom-secondary"
                  id="comment-author-field"
                />
              </div>

              <div className="relative">
                <textarea
                  placeholder="Record your verified response or feedback query..."
                  required
                  rows={3}
                  value={commentText}
                  onChange={(e) => setCommentText(e.target.value)}
                  className="w-full text-xs bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-white p-2 rounded border border-slate-200 dark:border-slate-800 focus:outline-none focus:border-custom-secondary resize-none"
                  id="comment-text-field"
                />
              </div>

              <button
                type="submit"
                className="w-full py-2 bg-custom-primary text-white text-xs hover:bg-slate-900 select-none font-bold uppercase tracking-wider rounded transition-all cursor-pointer flex items-center justify-center gap-1.5 border border-white/5"
                id="comment-submit-btn"
              >
                <Send size={11} />
                Submit Annotation
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
}
