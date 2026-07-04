'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';

export default function ProfileDropdown({
  avatarSrc,
  userName = 'User',
  className = '',
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const getInitials = (name) => {
    if (!name) return 'U';
    const parts = name.split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name[0].toUpperCase();
  };

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`focus:outline-none rounded-full overflow-hidden border border-zinc-800 hover:border-zinc-700 bg-zinc-900 transition flex items-center justify-center cursor-pointer ${className}`}
        aria-label="User menu"
      >
        {avatarSrc ? (
          <img
            src={avatarSrc}
            alt={`${userName} avatar`}
            className="w-full h-full object-cover"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-zinc-300 font-semibold text-xs">
            {getInitials(userName)}
          </div>
        )}
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 mt-2 w-48 rounded-xl glass-panel shadow-2xl py-1.5 z-50 animate-fade-in border border-zinc-800/80">
          <div className="px-4 py-2 border-b border-zinc-900">
            <p className="text-xs font-semibold text-white truncate">{userName}</p>
            <p className="text-[10px] text-zinc-550 truncate font-mono">System Operator</p>
          </div>
          
          <Link
            href="/chat"
            className="block px-4 py-2 text-xs text-zinc-400 hover:text-white hover:bg-zinc-900/50 transition font-mono"
            onClick={() => setIsOpen(false)}
          >
            Dashboard
          </Link>
          
          <Link
            href="/auth/logout"
            className="block px-4 py-2 text-xs text-red-400 hover:text-red-300 hover:bg-red-950/10 border-t border-zinc-900 transition font-mono"
            onClick={() => setIsOpen(false)}
          >
            Log Out
          </Link>
        </div>
      )}
    </div>
  );
}