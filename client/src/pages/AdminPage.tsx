import React from 'react';
import Navigation from '../components/Navigation';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';

const data = [
  { name: 'Math', students: 120, avgGrade: 85 },
  { name: 'Science', students: 98, avgGrade: 82 },
  { name: 'English', students: 110, avgGrade: 88 },
  { name: 'History', students: 95, avgGrade: 79 },
  { name: 'Art', students: 75, avgGrade: 91 },
];

const AdminPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-100 via-sky-50 to-slate-100">
      <Navigation />
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <header className="mb-8">
          <h1 className="text-3xl font-bold text-slate-800">Admin Dashboard</h1>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-sm font-medium text-slate-600">Total Students</h3>
            <p className="text-2xl font-bold text-slate-800 mt-2">498</p>
            <div className="mt-2 text-sm text-teal-600">↑ 12% from last year</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-sm font-medium text-slate-600">Average GPA</h3>
            <p className="text-2xl font-bold text-slate-800 mt-2">3.45</p>
            <div className="mt-2 text-sm text-teal-600">↑ 0.2 from last semester</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-sm font-medium text-slate-600">Total Staff</h3>
            <p className="text-2xl font-bold text-slate-800 mt-2">42</p>
            <div className="mt-2 text-sm text-teal-600">↑ 4 new hires</div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h3 className="text-sm font-medium text-slate-600">Budget Status</h3>
            <p className="text-2xl font-bold text-slate-800 mt-2">$1.2M</p>
            <div className="mt-2 text-sm text-orange-600">75% utilized</div>
          </div>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Subject Performance</h2>
            <div className="h-[300px]">
              <BarChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="avgGrade" fill="#0d9488" name="Average Grade" />
              </BarChart>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-semibold text-slate-800 mb-4">Enrollment by Subject</h2>
            <div className="h-[300px]">
              <BarChart width={500} height={300} data={data}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="students" fill="#0369a1" name="Number of Students" />
              </BarChart>
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-slate-800 mb-4">Recent Activity</h2>
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium">New Student Registration</p>
                <p className="text-sm text-slate-600">Emily Johnson - Grade 6</p>
              </div>
              <span className="text-sm text-slate-600">2 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium">Staff Meeting Scheduled</p>
                <p className="text-sm text-slate-600">Curriculum Review</p>
              </div>
              <span className="text-sm text-slate-600">5 hours ago</span>
            </div>
            <div className="flex items-center justify-between p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="font-medium">Budget Update</p>
                <p className="text-sm text-slate-600">Q4 Planning</p>
              </div>
              <span className="text-sm text-slate-600">1 day ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;