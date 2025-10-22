import React from 'react';
import Navigation from '../components/Navigation';

const ClientPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-sky-50 to-slate-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Parent/Guardian Dashboard</h1>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Schedule Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
              <span className="text-2xl mr-2">📅</span>
              Schedule
            </h2>
            <div className="space-y-2">
              {/* Sample schedule items */}
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="font-medium">Math Class</p>
                <p className="text-sm text-slate-600">8:00 AM - 9:30 AM</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="font-medium">Science Lab</p>
                <p className="text-sm text-slate-600">10:00 AM - 11:30 AM</p>
              </div>
            </div>
          </div>

          {/* Grades Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
              <span className="text-2xl mr-2">📊</span>
              Grades
            </h2>
            <div className="space-y-2">
              <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                <span>Mathematics</span>
                <span className="font-semibold text-teal-600">A</span>
              </div>
              <div className="flex justify-between p-3 bg-slate-50 rounded-lg">
                <span>Science</span>
                <span className="font-semibold text-teal-600">A-</span>
              </div>
            </div>
          </div>

          {/* Status Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
              <span className="text-2xl mr-2">📋</span>
              Status
            </h2>
            <div className="p-3 bg-slate-50 rounded-lg">
              <p className="font-medium">Current Standing</p>
              <p className="text-sm text-slate-600">Active Student</p>
              <div className="mt-2 w-full bg-slate-200 rounded-full h-2">
                <div className="bg-teal-500 h-2 rounded-full w-[95%]"></div>
              </div>
            </div>
          </div>

          {/* Profile Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
              <span className="text-2xl mr-2">👤</span>
              Profile
            </h2>
            <div className="space-y-3">
              <div className="flex items-center space-x-4">
                <div className="h-16 w-16 rounded-full bg-slate-200 flex items-center justify-center">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <p className="font-medium">John Doe</p>
                  <p className="text-sm text-slate-600">Grade 5</p>
                </div>
              </div>
            </div>
          </div>

          {/* Account Balance Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
              <span className="text-2xl mr-2">💰</span>
              Account Balance
            </h2>
            <div className="p-4 bg-slate-50 rounded-lg">
              <p className="text-3xl font-bold text-slate-800">$1,250.00</p>
              <p className="text-sm text-slate-600 mt-1">Due by: Nov 1, 2025</p>
            </div>
          </div>

          {/* Announcements Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
              <span className="text-2xl mr-2">📢</span>
              Announcements
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="font-medium">Parent-Teacher Meeting</p>
                <p className="text-sm text-slate-600">October 25, 2025</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="font-medium">Fall Break</p>
                <p className="text-sm text-slate-600">November 1-5, 2025</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ClientPage;