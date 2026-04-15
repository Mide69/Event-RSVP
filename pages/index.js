import { useState } from 'react';

export default function Home() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    attending: '',
    guests: '',
    allergies: [],
    additionalAllergies: '',
  });
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

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
    setLoading(true);
    try {
      const response = await fetch('/api/rsvp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      setMessage(data.message);
      if (response.ok) {
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
    } catch (error) {
      setMessage('Error submitting RSVP. Please try again.');
    }
    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-200 via-purple-200 to-blue-200 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Birthday decorations */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-6xl animate-bounce">🎈</div>
        <div className="absolute top-20 right-20 text-5xl animate-pulse">🎂</div>
        <div className="absolute bottom-20 left-20 text-4xl animate-bounce delay-1000">🎉</div>
        <div className="absolute bottom-10 right-10 text-6xl animate-pulse delay-500">🥳</div>
        <div className="absolute top-1/2 left-5 text-3xl animate-spin">⭐</div>
        <div className="absolute top-1/3 right-5 text-4xl animate-bounce delay-2000">🎁</div>
      </div>

      <div className="max-w-lg w-full bg-white rounded-2xl shadow-2xl p-8 relative z-10 border-4 border-yellow-300">
        <div className="text-center mb-8">
          <div className="text-6xl mb-4">🎂</div>
          <h1 className="text-4xl font-bold text-purple-800 mb-2">Happy Birthday Pastor!</h1>
          <p className="text-purple-600 text-lg">We'd love for you to join us for the celebration! Please RSVP below.</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">Full Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 bg-pink-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 bg-pink-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 bg-pink-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">Will you attend? 🎉</label>
            <select
              name="attending"
              value={formData.attending}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 bg-pink-50"
              required
            >
              <option value="">Please select</option>
              <option value="yes">Yes, I'll be there! 🎂</option>
              <option value="no">Sorry, I can't make it 😔</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">Number of Guests (including yourself)</label>
            <input
              type="number"
              name="guests"
              value={formData.guests}
              onChange={handleInputChange}
              min="1"
              className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 bg-pink-50"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-purple-700 mb-2">Allergies or Dietary Restrictions</label>
            <p className="text-sm text-purple-600 mb-2">Please check any that apply:</p>
            <div className="grid grid-cols-2 gap-3 mb-4">
              {commonAllergies.map(allergy => (
                <label key={allergy} className="flex items-center bg-pink-50 p-2 rounded-lg hover:bg-pink-100 transition-colors">
                  <input
                    type="checkbox"
                    checked={formData.allergies.includes(allergy)}
                    onChange={() => handleAllergyChange(allergy)}
                    className="mr-3 h-4 w-4 text-purple-600 focus:ring-purple-500 border-gray-300 rounded"
                  />
                  {allergy}
                </label>
              ))}
            </div>
            <textarea
              name="additionalAllergies"
              value={formData.additionalAllergies}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border-2 border-pink-200 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-300 bg-pink-50"
              rows="3"
              placeholder="Any other allergies or special dietary needs..."
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-purple-500 to-pink-500 text-white py-4 px-6 rounded-xl hover:from-purple-600 hover:to-pink-600 focus:outline-none focus:ring-4 focus:ring-purple-300 transition-all duration-200 text-lg font-semibold shadow-lg disabled:opacity-50 transform hover:scale-105"
          >
            {loading ? 'Sending RSVP... 🎈' : 'Submit RSVP 🎉'}
          </button>
        </form>
        {message && (
          <div className={`mt-6 p-4 border-2 rounded-xl text-center font-medium ${message.includes('Error') ? 'bg-red-100 border-red-300 text-red-700' : 'bg-green-100 border-green-300 text-green-700'}`}>
            {message}
          </div>
        )}
        <footer className="mt-8 text-center text-sm text-purple-600">
          <p>Thank you for your response! 🎂 We look forward to celebrating together.</p>
        </footer>
      </div>
    </div>
  );
}