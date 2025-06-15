'use client'; // This component will use client-side features like useState and event handlers

import React, { useState, useRef, useEffect } from 'react';


export default function ProfileDropdown({
  avatarSrc,
  userName = 'User', // Default user name for alt and initials
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

  


      
return (<div className={className} >
  {avatarSrc ? (
  <img
      src={avatarSrc}
      alt={`${userName} avatar`}
      className="w-full h-full rounded-full object-cover"
    />
) : (
  <div className="w-full h-full rounded-full bg-blue-600 flex items-center justify-center text-white font-semibold text-lg">
      {getInitials(userName)}
    </div>
)}
</div> )
}