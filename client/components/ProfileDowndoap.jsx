'use client'; // This component will use client-side features like useState and event handlers

import React, { useState, useRef, useEffect } from 'react';

/**
 * A profile avatar component that reveals a dropdown menu with options on hover.
 *
 * @param {object} props
 * @param {string} [props.avatarSrc] - URL for the user's avatar image. If not provided, initials will be used.
 * @param {string} [props.userName] - Full name of the user, used for alt text and generating initials.
 * @param {Array<Object>} [props.options] - An array of menu options. Each option should be { label: string, onClick: function }.
 * @param {'bottom-right' | 'bottom-left' | 'top-right' | 'top-left'} [props.position] - Position of the dropdown relative to the avatar.
 * @param {string} [props.className] - Additional Tailwind CSS classes for the main container div.
 */
export default function ProfileDropdown({
  avatarSrc,
  userName = 'User', // Default user name for alt and initials
  options = [], // Default to an empty array if no options are passed
  position = 'bottom-right', // Default position
  className = '', // Additional classes for the main container
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null); // Ref for the dropdown container

  // Function to generate initials if no avatarSrc is provided
  const getInitials = (name) => {
    if (!name) return '??';
    const parts = name.split(' ');
    if (parts.length > 1) {
      return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase(); // First and last initial
    }
    return name[0].toUpperCase(); // Just the first letter if single word
  };

  // Content for the avatar (image or initials)
  const avatarContent = avatarSrc ? (
    <img
      src={avatarSrc}
      alt={`${userName} avatar`}
      className="w-full h-full rounded-full object-cover"
    />
  ) : (
    <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-lg">
      {getInitials(userName)}
    </div>
  );

  // Determine dropdown positioning classes based on 'position' prop
  let dangleClasses = 'absolute bg-zinc-800 rounded-md shadow-lg py-1 z-10 transition-opacity duration-200';

  if (position.includes('bottom')) {
    dangleClasses += ' top-full mt-2'; // Position below avatar
  } else {
    dangleClasses += ' bottom-full mb-2'; // Position above avatar
  }

  if (position.includes('right')) {
    dangleClasses += ' right-0'; // Align to the right of avatar
  } else {
    dangleClasses += ' left-0'; // Align to the left of avatar
  }

  // Effect to close dropdown if clicking outside (optional, but good UX)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [dropdownRef]);


  return (
    <div
      ref={dropdownRef} // Attach ref to the main container
      className={`relative inline-block ${className}`}
      onMouseEnter={() => setIsOpen(true)} // Open on hover
      onMouseLeave={() => setIsOpen(false)} // Close on mouse leave
    >
      {/* Avatar Button - this is the clickable/hoverable part */}
      <button
        className="block w-10 h-10 rounded-full focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
        aria-haspopup="true" // Indicates it triggers a popup
        aria-expanded={isOpen ? 'true' : 'false'} // Indicates whether the popup is currently expanded
        title={`Profile options for ${userName}`} // Tooltip for accessibility
      >
        {avatarContent}
      </button>

      {/* The "Dangle" / Dropdown Menu */}
      {isOpen && (
        <div
          className={dangleClasses}
          role="menu" // Semantic role for a menu
          aria-orientation="vertical" // Indicates vertical menu orientation
        >
          <ul className="min-w-[160px] list-none p-0 m-0"> {/* Remove default list styles */}
            {options.map((option, index) => (
              <li key={index}>
                <button
                  onClick={() => {
                    option.onClick(); // Execute the provided onClick function
                    setIsOpen(false); // Close dropdown after clicking an option
                  }}
                  className="block w-full px-4 py-2 text-left text-sm text-zinc-200 hover:bg-zinc-700 hover:text-white transition-colors duration-150 whitespace-nowrap"
                  role="menuitem" // Semantic role for a menu item
                >
                  {option.label}
                </button>
              </li>
            ))}
            {options.length === 0 && ( // Display message if no options
              <li>
                <span className="block px-4 py-2 text-sm text-zinc-400">No options available</span>
              </li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}