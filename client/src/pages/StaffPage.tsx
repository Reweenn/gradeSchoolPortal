import React from 'react';
import Navigation from '../components/Navigation';

const StaffPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-sky-50 to-slate-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Staff Dashboard</h1>
        </header>

        {/* Main Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {/* Classes Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
              <span className="text-2xl mr-2">📚</span>
              My Classes
            </h2>
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="font-medium">Mathematics 101</p>
                <p className="text-sm text-slate-600">Room 204 - 25 Students</p>
                <div className="mt-2">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-teal-100 text-teal-800 rounded">
                    8:00 AM - 9:30 AM
                  </span>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="font-medium">Advanced Algebra</p>
                <p className="text-sm text-slate-600">Room 205 - 20 Students</p>
                <div className="mt-2">
                  <span className="inline-block px-2 py-1 text-xs font-medium bg-teal-100 text-teal-800 rounded">
                    10:00 AM - 11:30 AM
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Attendance Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
              <span className="text-2xl mr-2">📊</span>
              Attendance Overview
            </h2>
            <div className="space-y-3">
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="font-medium">Mathematics 101</p>
                <div className="mt-2 flex items-center">
                  <div className="flex-grow">
                    <div className="h-2 bg-slate-200 rounded-full">
                      <div className="h-2 bg-teal-500 rounded-full" style={{ width: '92%' }}></div>
                    </div>
                  </div>
                  <span className="ml-2 text-sm font-medium text-slate-600">92%</span>
                </div>
              </div>
              <div className="p-4 bg-slate-50 rounded-lg">
                <p className="font-medium">Advanced Algebra</p>
                <div className="mt-2 flex items-center">
                  <div className="flex-grow">
                    <div className="h-2 bg-slate-200 rounded-full">
                      <div className="h-2 bg-teal-500 rounded-full" style={{ width: '88%' }}></div>
                    </div>
                  </div>
                  <span className="ml-2 text-sm font-medium text-slate-600">88%</span>
                </div>
              </div>
            </div>
          </div>

          {/* Tasks Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
              <span className="text-2xl mr-2">✓</span>
              Tasks
            </h2>
            <div className="space-y-3">
              <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                <input type="checkbox" className="h-4 w-4 text-teal-600 rounded border-slate-300" />
                <span className="ml-3">Grade Math Quiz</span>
                <span className="ml-auto text-sm text-slate-500">Due Today</span>
              </div>
              <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                <input type="checkbox" className="h-4 w-4 text-teal-600 rounded border-slate-300" />
                <span className="ml-3">Submit Progress Reports</span>
                <span className="ml-auto text-sm text-slate-500">Tomorrow</span>
              </div>
              <div className="flex items-center p-3 bg-slate-50 rounded-lg">
                <input type="checkbox" className="h-4 w-4 text-teal-600 rounded border-slate-300" />
                <span className="ml-3">Prepare Lesson Plan</span>
                <span className="ml-auto text-sm text-slate-500">Oct 25</span>
              </div>
            </div>
          </div>

          {/* Calendar Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
              <span className="text-2xl mr-2">📅</span>
              Upcoming Events
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="font-medium">Parent-Teacher Conference</p>
                <p className="text-sm text-slate-600">October 25, 2025 - 2:00 PM</p>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <p className="font-medium">Department Meeting</p>
                <p className="text-sm text-slate-600">October 27, 2025 - 3:30 PM</p>
              </div>
            </div>
          </div>

          {/* Resources Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
              <span className="text-2xl mr-2">📂</span>
              Resources
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg flex items-center">
                <span className="text-xl mr-3">📄</span>
                <div>
                  <p className="font-medium">Curriculum Guide</p>
                  <p className="text-sm text-slate-600">PDF - 2.5MB</p>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg flex items-center">
                <span className="text-xl mr-3">📄</span>
                <div>
                  <p className="font-medium">Grading Rubric</p>
                  <p className="text-sm text-slate-600">PDF - 1.8MB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Messages Card */}
          <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow">
            <h2 className="text-xl font-semibold text-teal-600 mb-4 flex items-center">
              <span className="text-2xl mr-2">💬</span>
              Recent Messages
            </h2>
            <div className="space-y-3">
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center">
                    <span className="text-sm">AJ</span>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Alice Johnson</p>
                    <p className="text-sm text-slate-600">Re: Student Progress</p>
                  </div>
                  <span className="ml-auto text-xs text-slate-500">2h ago</span>
                </div>
              </div>
              <div className="p-3 bg-slate-50 rounded-lg">
                <div className="flex items-center">
                  <div className="h-8 w-8 rounded-full bg-teal-100 flex items-center justify-center">
                    <span className="text-sm">MS</span>
                  </div>
                  <div className="ml-3">
                    <p className="font-medium">Mark Smith</p>
                    <p className="text-sm text-slate-600">Lesson Plan Review</p>
                  </div>
                  <span className="ml-auto text-xs text-slate-500">5h ago</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffPage;