// import picone from "./../assets/library_images/lib-pic-3.jpg";
import React, { useEffect, useState } from "react";
import API from "../api/axios";
import picone from "./../assets/new_images/eliza-ari-RLgRAhTD4ww-unsplash.jpg";
import { StatsSkeleton } from "../components/Skeleton";

import { 
  PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#8884d8', '#82ca9d'];

export default function Dashboard() {
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    API
      .get("/books/stats/all")
      .then((res) => {
        setStats(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Error fetching stats:", err);
        setLoading(false);
      });
  }, []);

  const StatCard = ({ title, value, color }) => (
    <div className={`bg-white/10 backdrop-blur-md p-6 rounded-xl border border-white/20 shadow-xl transition-all hover:scale-105`}>
      <h3 className="text-gray-300 text-sm font-medium uppercase tracking-wider">{title}</h3>
      <p className={`text-4xl font-bold mt-2 ${color}`}>{value}</p>
    </div>
  );

  return (
    <div
      className="min-h-screen pt-20 pb-10 px-4 flex flex-col items-center bg-cover bg-center bg-fixed"
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${picone})`,
      }}
    >
      <div className="text-center mb-12">
        <h2 className="text-6xl font-extrabold text-white mb-2 tracking-tight">
          Library <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-yellow-200">Insights</span>
        </h2>
        <p className="text-xl text-gray-300">Welcome back, Administrator</p>
      </div>

      {loading ? (
        <StatsSkeleton />
      ) : stats ? (
        <div className="w-full max-w-6xl mx-auto space-y-10">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6">
            <StatCard title="Total Books" value={stats.totalBooks} color="text-blue-400" />
            <StatCard title="Students" value={stats.totalStudents} color="text-green-400" />
            <StatCard title="Issued" value={stats.activeIssues} color="text-yellow-400" />
            <StatCard title="Overdue" value={stats.overdueIssues} color="text-red-400" />
            <StatCard title="Fines" value={`$${stats.totalFines}`} color="text-orange-400" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-stretch">
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl min-h-[500px] flex flex-col">
              <h3 className="text-white text-xl font-semibold mb-6">Book Categories</h3>
              <div className="flex-1 w-full" style={{ minHeight: '350px' }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={stats.categories}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis type="number" hide />
                    <YAxis 
                      dataKey="category" 
                      type="category" 
                      stroke="#9ca3af" 
                      fontSize={12}
                      width={100}
                    />
                    <Tooltip 
                      cursor={{fill: 'rgba(255,255,255,0.05)'}}
                      contentStyle={{ 
                        backgroundColor: '#1f2937', 
                        border: 'none', 
                        borderRadius: '12px', 
                        color: '#fff',
                        boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.3)' 
                      }}
                      itemStyle={{ color: '#60a5fa' }}
                    />
                    <Bar 
                      dataKey="count" 
                      fill="#3b82f6" 
                      radius={[0, 4, 4, 0]}
                      label={{ position: 'right', fill: '#fff', fontSize: 12 }}
                    >
                      {stats.categories.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* Quick Actions / Activity Feed Placeholder */}
            <div className="bg-white/10 backdrop-blur-md p-8 rounded-2xl border border-white/20 shadow-2xl flex flex-col justify-center items-center text-center">
              <div className="w-20 h-20 bg-blue-500/20 rounded-full flex items-center justify-center mb-4">
                <svg className="w-10 h-10 text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="text-white text-xl font-semibold mb-2">System Status</h3>
              <p className="text-gray-400 mb-6">All library services are operational. Automated backups completed at 04:00 AM.</p>
              <button 
                onClick={() => window.location.href='/fines'}
                className="px-6 py-2 bg-white text-blue-900 font-bold rounded-lg hover:bg-gray-200 transition-colors"
              >
                Manage Fines
              </button>
            </div>
          </div>
        </div>
      ) : (
        <p className="text-white text-xl">Failed to load statistics.</p>
      )}
    </div>
  );
}

// https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3V0bjM0Z3plbTR5a3hoeXhvZThxbnhxNDNvbHQ5NDYyZGRvYjBkeiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/6sUV2zvNzjqbS/giphy.gif
//https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExb3V0bjM0Z3plbTR5a3hoeXhvZThxbnhxNDNvbHQ5NDYyZGRvYjBkeiZlcD12MV9naWZzX3NlYXJjaCZjdD1n/6sUV2zvNzjqbS/giphy.gif')`

