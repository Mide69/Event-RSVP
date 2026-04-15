import { useState, useEffect } from 'react';
import Head from 'next/head';
import Hero from '../components/Hero';
import RSVPForm from '../components/RSVPForm';
import AdminLogin from '../components/AdminLogin';
import AdminPanel from '../components/AdminPanel';

/**
 * Main RSVP Application Component
 * Features: Professional design, animations, admin panel, database storage
 */
export default function Home() {
  // State management
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [rsvps, setRsvps] = useState([]);
  const [showAdminForm, setShowAdminForm] = useState(false);
  const [message, setMessage] = useState('');
  const [messageType, setMessageType] = useState(''); // 'success' or 'error'
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  /**
   * Initialize admin state on component mount
   */
  useEffect(() => {
    const adminLoggedIn = localStorage.getItem('adminLoggedIn');
    if (adminLoggedIn === 'true') {
      setIsAdmin(true);
      fetchRSVPs();
    }
  }, []);

  /**
   * Fetch all RSVPs from the API
   */
  const fetchRSVPs = async () => {
    try {
      setError(null);
      const response = await fetch('/api/admin');
      const data = await response.json();
      if (data.rsvps) {
        setRsvps(data.rsvps);
      }
    } catch (error) {
      console.error('Error fetching RSVPs:', error);
      setError('Failed to fetch RSVPs. Please try again.');
    }
  };

  /**
   * Handle RSVP form submission
   */
  const handleRSVPSubmit = async (formData) => {
    setLoading(true);
    setMessage('');
    setError(null);

    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      
      if (response.ok) {
        setMessage(data.message || 'RSVP submitted successfully!');
        setMessageType('success');
        if (isAdmin) {
          fetchRSVPs(); // Refresh admin view
        }
      } else {
        setMessage(data.message || 'Failed to submit RSVP.');
        setMessageType('error');
      }
    } catch (error) {
      setMessage('Error submitting RSVP. Please try again.');
      setMessageType('error');
      console.error('Submission error:', error);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Handle admin login
   */
  const handleAdminLogin = async (password) => {
    setError(null);
    try {
      const response = await fetch('/api/admin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      });

      const data = await response.json();

      if (data.success) {
        setIsAdmin(true);
        setRsvps(data.rsvps);
        localStorage.setItem('adminLoggedIn', 'true');
        setShowAdminForm(false);
        setAdminPassword('');
        setMessage('Admin login successful!');
        setMessageType('success');
      } else {
        setError('Invalid password. Please try again.');
      }
    } catch (error) {
      setError('Error logging in. Please try again.');
      console.error('Login error:', error);
    }
  };

  /**
   * Handle admin logout
   */
  const handleLogout = () => {
    setIsAdmin(false);
    setRsvps([]);
    localStorage.removeItem('adminLoggedIn');
  };

  /**
   * Handle RSVP deletion
   */
  const handleDeleteRSVP = async (id) => {
    if (confirm('Are you sure you want to delete this RSVP?')) {
      try {
        setError(null);
        const response = await fetch(`/api/admin?id=${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          fetchRSVPs(); // Refresh the list
          setMessage('RSVP deleted successfully.');
          setMessageType('success');
        } else {
          setError('Error deleting RSVP. Please try again.');
        }
      } catch (error) {
        setError('Error deleting RSVP. Please try again.');
        console.error('Delete error:', error);
      }
    }
  };

  return (
    <>
      <Head>
        <title>Event RSVP - Happy Birthday Pastor!</title>
        <meta name="description" content="Professional RSVP system for Pastor's birthday celebration" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-slate-100">
        {/* Hero Section with Header */}
        <Hero isAdmin={isAdmin} />

        {/* Main Content */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          {/* Display Error Messages */}
          {error && (
            <div className="mb-8">
              <div className="p-4 rounded-lg border border-red-200 bg-red-50">
                <div className="flex items-start">
                  <svg className="h-5 w-5 text-red-400 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                  </svg>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-red-800">{error}</p>
                  </div>
                  <button
                    onClick={() => setError(null)}
                    className="ml-3 text-red-400 hover:text-red-600 transition-colors"
                  >
                    <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          )}
          {!isAdmin ? (
            <div className="space-y-12">
              {/* RSVP Form */}
              <RSVPForm
                onSubmit={handleRSVPSubmit}
                message={message}
                messageType={messageType}
                loading={loading}
              />

              {/* Admin Login */}
              <AdminLogin
                onLogin={handleAdminLogin}
                showForm={showAdminForm}
                onToggleForm={() => setShowAdminForm(!showAdminForm)}
              />
            </div>
          ) : (
            /* Admin Dashboard */
            <AdminPanel
              rsvps={rsvps}
              onDelete={handleDeleteRSVP}
              onLogout={handleLogout}
            />
          )}
        </div>

        {/* Footer */}
        <footer className="bg-white border-t border-gray-200 mt-16">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
            <div className="text-center">
              <p className="text-gray-500 text-sm">
                © 2024 Event RSVP System. Built with ❤️ for memorable celebrations.
              </p>
              <div className="mt-2 flex justify-center space-x-4 text-xs text-gray-400">
                <span>Professional Event Management</span>
                <span>•</span>
                <span>Secure & Reliable</span>
                <span>•</span>
                <span>Real-time Updates</span>
              </div>
              <p className="mt-4 text-xs text-gray-400">
                Designed by <span className="font-semibold text-gray-500">Tek Tribe</span>
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}