'use client'

import { useState, useEffect } from 'react';

export default function Notify() {
  const [message, setMessage] = useState('');
  const [id, setId] = useState('');
  const [users, setUsers] = useState([]);
  const [sendCount, setSendCount] = useState(1);
  const [title, setTitle] = useState(''); // New state for title
  const [icon, setIcon] = useState('');   // New state for icon URL
  const [notificationStatus, setNotificationStatus] = useState(''); // 'idle', 'sending', 'success', 'error'
  const [notificationMessage, setNotificationMessage] = useState('');

  // Fetch users on component mount
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch('https://jarvis-rose-zeta.vercel.app/subscribe');
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setUsers(data.users);
        // Set the default selected IP to the first user's IP if available
        if (data.users.length > 0) {
          setId(data.users[0].id);
        }
      } catch (error) {
        console.error("Failed to fetch users:", error);
        setNotificationStatus('error');
        setNotificationMessage('Failed to load user list.');
      }
    };

    fetchUsers();
  }, []);

  // Function to send the notification
  const sendNotification = async () => {
    // Validate inputs
    if (!message.trim() || !id) {
      setNotificationStatus('error');
      setNotificationMessage('Please enter a message and select an IP.');
      return;
    }
    if (sendCount <= 0) {
      setNotificationStatus('error');
      setNotificationMessage('Send count must be at least 1.');
      return;
    }

    setNotificationStatus('sending');
    setNotificationMessage(`Sending ${sendCount} notification(s)...`);

    let successCount = 0;
    let errorOccurred = false;

    for (let i = 0; i < sendCount; i++) {
      try {
        const response = await fetch('https://jarvis-rose-zeta.vercel.app/notify', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          // Include title and icon in the request body
          body: JSON.stringify({ message, id, title, icon }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || `HTTP error! status: ${response.status}`);
        }

        successCount++;
        setNotificationMessage(`Sent ${successCount}/${sendCount} notification(s)...`);

      } catch (error) {
        console.error(`Failed to send notification (attempt ${i + 1}):`, error);
        errorOccurred = true;
        setNotificationStatus('error');
        setNotificationMessage(`Error sending notification (attempt ${i + 1}): ${error.message}`);
      }
    }

    // Final status update after all sends are attempted
    if (errorOccurred) {
      setNotificationStatus('error');
      setNotificationMessage(`Completed with errors. Sent ${successCount}/${sendCount} successfully.`);
    } else {
      setNotificationStatus('success');
      setNotificationMessage(`All ${sendCount} notification(s) sent successfully!`);
      setMessage(''); // Clear message after successful send
      setTitle('');   // Clear title after successful send
      setIcon('');    // Clear icon after successful send
    }

    // Clear status message after a few seconds
    setTimeout(() => {
      setNotificationStatus('idle');
      setNotificationMessage('');
    }, 5000);
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-900 rounded-lg shadow-lg text-white font-sans">
      <h2 className="text-2xl font-bold mb-6 text-center text-blue-400">Send Notification</h2>

      {/* Message Input */}
      <div className="mb-4">
        <label htmlFor="message" className="block text-sm font-medium text-gray-300 mb-2">Your Message</label>
        <input
          type="text"
          id="message"
          className="shadow-sm p-3 w-full text-base border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
      </div>

      {/* Title Input */}
      <div className="mb-4">
        <label htmlFor="title" className="block text-sm font-medium text-gray-300 mb-2">Notification Title (Optional)</label>
        <input
          type="text"
          id="title"
          className="shadow-sm p-3 w-full text-base border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          placeholder="e.g., Important Alert!"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
      </div>

      {/* Icon URL Input */}
      <div className="mb-4">
        <label htmlFor="icon" className="block text-sm font-medium text-gray-300 mb-2">Icon URL (Optional)</label>
        <input
          type="url" // Use type="url" for icon URLs
          id="icon"
          className="shadow-sm p-3 w-full text-base border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          placeholder="e.g., https://example.com/icon.png"
          value={icon}
          onChange={(e) => setIcon(e.target.value)}
        />
      </div>

      {/* IP Select Dropdown */}
      <div className="mb-4">
        <label htmlFor="ip-select" className="block text-sm font-medium text-gray-300 mb-2">Select Recipient IP</label>
        <select
          id="ip-select"
          value={id}
          onChange={(e) => setId(e.target.value)}
          className="shadow-sm p-3 w-full text-base border border-gray-700 rounded-md bg-gray-800 text-white focus:ring-blue-500 focus:border-blue-500 transition duration-200 cursor-pointer"
        >
          {users.length > 0 ? (
            users.map((v) => (
              <option key={v.id} value={v.id}>
                {v.ip}
              </option>
            ))
          ) : (
            <option value="">No users found</option>
          )}
        </select>
      </div>

      {/* Send Count Input */}
      <div className="mb-6">
        <label htmlFor="send-count" className="block text-sm font-medium text-gray-300 mb-2">Number of times to send</label>
        <input
          type="number"
          id="send-count"
          min="1"
          className="shadow-sm p-3 w-full text-base border border-gray-700 rounded-md bg-gray-800 text-white placeholder-gray-500 focus:ring-blue-500 focus:border-blue-500 transition duration-200"
          value={sendCount}
          onChange={(e) => setSendCount(Math.max(1, parseInt(e.target.value) || 1))}
        />
      </div>

      {/* Send Button */}
      <button
        onClick={sendNotification}
        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-md shadow-md transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-75 disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={notificationStatus === 'sending'}
      >
        {notificationStatus === 'sending' ? 'Sending...' : 'Send Notification'}
      </button>

      {/* Notification Status Message */}
      {notificationMessage && (
        <div
          className={`mt-4 p-3 rounded-md text-center ${
            notificationStatus === 'success' ? 'bg-green-500 text-white' :
            notificationStatus === 'error' ? 'bg-red-500 text-white' :
            'bg-blue-500 text-white'
          }`}
        >
          {notificationMessage}
        </div>
      )}
    </div>
  );
}
