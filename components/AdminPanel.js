import { AnimatedCard } from './UI';

const AdminPanel = ({ rsvps, onDelete, onLogout }) => {
  const attendingCount = rsvps.filter(r => r.attending === 'yes').length;
  const notAttendingCount = rsvps.filter(r => r.attending === 'no').length;
  const totalGuests = rsvps.reduce((sum, r) => sum + (parseInt(r.guests) || 0), 0);

  return (
    <div className="space-y-8">
      {/* Navigation Header */}
      <AnimatedCard delay={0}>
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Manage event responses and view guest details</p>
          </div>
          <button
            onClick={onLogout}
            className="flex items-center space-x-2 px-4 py-2 bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-white font-medium rounded-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
            </svg>
            <span>Back to Home</span>
          </button>
        </div>
      </AnimatedCard>

      {/* RSVP Management Dashboard */}
      <AnimatedCard delay={100}>
        <div className="bg-white rounded-xl shadow-xl border border-gray-200 overflow-hidden">
          <div className="bg-gradient-to-r from-gray-800 to-gray-900 px-8 py-6 relative overflow-hidden">
            <div className="absolute inset-0 bg-black opacity-10"></div>
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
            <h2 className="text-2xl font-bold text-white mb-2 relative z-10">RSVP Management Dashboard</h2>
            <p className="text-gray-300 relative z-10">Manage event responses and guest information</p>
          </div>

          <div className="p-8">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">All RSVPs</h3>
                <p className="text-sm text-gray-600 mt-1">{rsvps.length} total responses • {totalGuests} total guests</p>
              </div>
              <div className="flex space-x-3">
                <div className="bg-green-100 text-green-800 px-4 py-2 rounded-full text-sm font-medium animate-pulse">
                  ✓ Attending: {attendingCount}
                </div>
                <div className="bg-red-100 text-red-800 px-4 py-2 rounded-full text-sm font-medium">
                  ✗ Not Attending: {notAttendingCount}
                </div>
              </div>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Guest</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Contact</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Status</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Guests</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Restrictions</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {rsvps.map((rsvp, index) => (
                    <tr
                      key={rsvp.id}
                      className="hover:bg-gray-50 transition-all duration-300 transform hover:scale-102 animate-slide-up"
                      style={{ animationDelay: `${index * 50}ms` }}
                    >
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm font-medium text-gray-900">{rsvp.name}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <div className="text-sm text-gray-900">{rsvp.email}</div>
                        <div className="text-sm text-gray-500">{rsvp.phone}</div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-3 py-1 text-xs font-semibold rounded-full animate-fade-in ${
                          rsvp.attending === 'yes'
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {rsvp.attending === 'yes' ? 'Attending 🎉' : 'Not Attending'}
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 font-medium">
                        {rsvp.guests}
                      </td>
                      <td className="px-6 py-4 text-sm text-gray-900 max-w-xs">
                        <div className="truncate">
                          {rsvp.allergies.length > 0 && (
                            <div className="mb-1">
                              <span className="font-medium text-blue-600">Allergies:</span> {rsvp.allergies.join(', ')}
                            </div>
                          )}
                          {rsvp.additionalAllergies && (
                            <div>
                              <span className="font-medium text-purple-600">Notes:</span> {rsvp.additionalAllergies}
                            </div>
                          )}
                          {!rsvp.allergies.length && !rsvp.additionalAllergies && (
                            <span className="text-gray-400 italic">None specified</span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                        {new Date(rsvp.createdAt).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => onDelete(rsvp.id)}
                          className="text-red-600 hover:text-red-900 transition-all duration-200 p-2 rounded-lg hover:bg-red-50 transform hover:scale-110"
                          title="Delete RSVP"
                        >
                          <svg className="w-5 h-5 animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                          </svg>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {rsvps.length === 0 && (
              <div className="text-center py-12 animate-fade-in">
                <div className="mx-auto w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mb-4">
                  <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No RSVPs yet</h3>
                <p className="text-gray-500 max-w-sm mx-auto">
                  RSVP responses will appear here once guests submit their forms. Check back later!
                </p>
              </div>
            )}
          </div>
        </div>
      </AnimatedCard>
    </div>
  );
};

export default AdminPanel;