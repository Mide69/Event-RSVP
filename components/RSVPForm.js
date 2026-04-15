import { useState } from 'react';
import { LoadingSpinner, StatusMessage, AnimatedCard } from './UI';

const RSVPForm = ({ onSubmit, message, messageType, loading }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attending: '',
    guests: '',
    allergies: [],
    additionalAllergies: '',
  });

  const commonAllergies = ['Peanuts', 'Tree Nuts', 'Dairy', 'Eggs', 'Wheat', 'Soy', 'Shellfish', 'Fish'];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleAllergyChange = (allergy) => {
    setFormData(prev => ({
      ...prev,
      allergies: prev.allergies.includes(allergy)
        ? prev.allergies.filter(a => a !== allergy)
        : [...prev.allergies, allergy]
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await onSubmit(formData);
    if (!message.includes('Error')) {
      setFormData({
        name: '',
        email: '',
        phone: '',
        attending: '',
        guests: '',
        allergies: [],
        additionalAllergies: '',
      });
    }
  };

  return (
    <AnimatedCard delay={200}>
      <div className="max-w-2xl mx-auto">
        {/* Hero Section */}
        <div className="text-center mb-12">
          <div className="relative inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full mb-8 shadow-2xl animate-pulse-glow">
            <span className="text-4xl animate-bounce">🎂</span>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-indigo-600 rounded-full blur-lg opacity-30 animate-pulse"></div>
          </div>
          <h1 className="text-5xl font-bold text-gray-900 mb-4 animate-slide-up">
            Happy Birthday Pastor!
          </h1>
          <p className="text-xl text-gray-600 max-w-lg mx-auto animate-slide-up" style={{ animationDelay: '200ms' }}>
            We're delighted to invite you to celebrate this special occasion. Please RSVP below to confirm your attendance.
          </p>
        </div>

        {/* RSVP Form */}
        <div className="bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden transform hover:scale-105 transition-transform duration-300">
          <div className="bg-gradient-to-r from-blue-600 to-indigo-600 px-8 py-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="absolute bottom-0 left-0 w-24 h-24 bg-white opacity-5 rounded-full translate-y-12 -translate-x-12"></div>
            <h2 className="text-2xl font-bold text-white mb-2 relative z-10">RSVP Form</h2>
            <p className="text-blue-100 relative z-10">Please fill out all required fields</p>
          </div>

          <form onSubmit={handleSubmit} className="p-8 space-y-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white transform focus:scale-105"
                  placeholder="Enter your full name"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address <span className="text-red-500">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white transform focus:scale-105"
                  placeholder="your@email.com"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white transform focus:scale-105"
                  placeholder="(555) 123-4567"
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Will you attend? <span className="text-red-500">*</span>
                </label>
                <select
                  name="attending"
                  value={formData.attending}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white transform focus:scale-105"
                  required
                >
                  <option value="">Please select</option>
                  <option value="yes">Yes, I'll be there! 🎉</option>
                  <option value="no">Sorry, I can't make it 😔</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Number of Guests <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="guests"
                  value={formData.guests}
                  onChange={handleInputChange}
                  min="1"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white transform focus:scale-105"
                  placeholder="Including yourself"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-4">
                Dietary Restrictions & Allergies
              </label>
              <p className="text-sm text-gray-600 mb-4">Please check any that apply:</p>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                {commonAllergies.map((allergy, index) => (
                  <label
                    key={allergy}
                    className="relative animate-slide-up"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    <input
                      type="checkbox"
                      checked={formData.allergies.includes(allergy)}
                      onChange={() => handleAllergyChange(allergy)}
                      className="sr-only peer"
                    />
                    <div className="p-3 border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-500 peer-checked:bg-blue-50 hover:border-gray-300 transition-all duration-300 transform hover:scale-105 peer-checked:scale-105">
                      <span className="text-sm font-medium text-gray-700">{allergy}</span>
                    </div>
                  </label>
                ))}
              </div>
              <textarea
                name="additionalAllergies"
                value={formData.additionalAllergies}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 bg-gray-50 focus:bg-white resize-none transform focus:scale-105"
                rows="3"
                placeholder="Any other allergies or special dietary needs..."
              />
            </div>

            <div className="pt-6 border-t border-gray-200">
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-4 px-6 rounded-lg hover:from-blue-700 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 hover:-translate-y-1"
              >
                {loading ? (
                  <div className="flex items-center justify-center space-x-2">
                    <LoadingSpinner />
                    <span>Submitting RSVP...</span>
                  </div>
                ) : (
                  'Submit RSVP 🎉'
                )}
              </button>
            </div>
          </form>
        </div>

        {/* Status Message */}
        {message && (
          <div className="mt-6 animate-slide-up">
            <StatusMessage
              message={message}
              type={messageType || (message.includes('Error') ? 'error' : 'success')}
            />
          </div>
        )}
      </div>
    </AnimatedCard>
  );
};

export default RSVPForm;