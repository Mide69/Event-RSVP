const Hero = ({ isAdmin }) => (
  <div className="relative overflow-hidden bg-gradient-to-br from-slate-50 via-white to-slate-100">
    {/* Background Pattern */}
    <div className="absolute inset-0 opacity-5">
      <div className="absolute inset-0" style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%239C92AC' fill-opacity='0.1'%3E%3Ccircle cx='30' cy='30' r='2'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
      }} />
    </div>

    {/* Floating Elements */}
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div className="absolute top-20 left-10 animate-float-slow">
        <div className="w-16 h-16 bg-gradient-to-r from-blue-400 to-indigo-500 rounded-full opacity-20 blur-sm"></div>
      </div>
      <div className="absolute top-40 right-20 animate-float-medium">
        <div className="w-12 h-12 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full opacity-15 blur-sm"></div>
      </div>
      <div className="absolute bottom-32 left-20 animate-float-fast">
        <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-10 blur-sm"></div>
      </div>
    </div>

    {/* Header */}
    <div className="relative bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-6">
          <div className="flex items-center space-x-3 animate-slide-in-left">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">🎂</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900">Event RSVP</h1>
              <p className="text-sm text-gray-500">Professional Event Management</p>
            </div>
          </div>
          {isAdmin && (
            <div className="flex items-center space-x-4 animate-slide-in-right">
              <span className="text-sm text-gray-600">Admin Panel</span>
              <button
                onClick={() => window.location.reload()}
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 transition-all duration-200 transform hover:scale-105"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  </div>
);

export default Hero;