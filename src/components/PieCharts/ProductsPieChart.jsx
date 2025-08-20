import { Pie, PieChart, ResponsiveContainer, Cell, Tooltip } from 'recharts';
import { useState } from 'react';

const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const data = payload[0];
    return (
      <div className="bg-white dark:bg-gray-800 p-2 rounded shadow-lg border border-gray-200 dark:border-gray-600 text-sm">
        <p className="font-medium text-gray-900 dark:text-white">{data.name}: {data.value}</p>
        <p className="text-gray-600 dark:text-gray-300">{data.payload.percent}%</p>
      </div>
    );
  }
  return null;
};

const CompactPieChart = ({ userCounts, counts }) => {
  const [activeUsers, setActiveUsers] = useState(null);
  const [activeProducts, setActiveProducts] = useState(null);
  const [activeMemberships, setActiveMemberships] = useState(null);

  // Data
  const usersData = [
    { name: 'Moderator', value: userCounts?.roles?.moderator || 0, color: '#3b82f6' },
    { name: 'Admin', value: userCounts?.roles?.admin || 0, color: '#10b981' },
    { name: 'Guest', value: userCounts?.roles?.guest || 0, color: '#f59e0b' },
  ];

  const productsData = [
    { name: 'Pending Product', value: counts?.pending || 0, color: '#ef4444' },
    { name: 'Approved Product', value: counts?.approved || 0, color: '#22c55e' },
    { name: 'Featured Product', value: counts?.featured || 0, color: '#8b5cf6' },
    { name: 'Rejected Product', value: counts?.rejected || 0, color: '#f97316' },
  ];

  const membershipsData = [
    { name: 'Free Users', value: userCounts?.memberships?.free || 0, color: '#06b6d4' },
    { name: 'Premium Users', value: userCounts?.memberships?.premium || 0, color: '#8b5cf6' },
  ];

  const addPercentages = (data) => {
    const total = data.reduce((sum, item) => sum + item.value, 0);
    return data.map(item => ({ 
      ...item, 
      percent: ((item.value / total) * 100).toFixed(1) 
    }));
  };

  const usersWithPercent = addPercentages(usersData);
  const productsWithPercent = addPercentages(productsData);
  const membershipsWithPercent = addPercentages(membershipsData);

  return (
    <div className="w-full h-[100vh] mx-auto p-4 bg-white dark:bg-gray-900 rounded-lg shadow-lg dark:shadow-gray-800/50 transition-colors flex flex-col">
      <h2 className="text-xl font-bold text-center mb-4 text-gray-900 dark:text-white">Analytics Dashboard</h2>
      
      {/* Charts grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 flex-grow">
        
        {/* Users Chart */}
        <div>
          <h3 className="text-lg font-medium mb-2 text-center text-gray-800 dark:text-gray-200">User Roles</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={usersWithPercent}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={70}
                  dataKey="value"
                  onMouseEnter={(_, index) => setActiveUsers(index)}
                  onMouseLeave={() => setActiveUsers(null)}
                >
                  {usersWithPercent.map((entry, index) => (
                    <Cell 
                      key={index} 
                      fill={entry.color}
                      stroke={activeUsers === index ? '#fff' : 'none'}
                      strokeWidth={activeUsers === index ? 2 : 0}
                      style={{
                        filter: activeUsers === index ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none',
                        transform: activeUsers === index ? 'scale(1.05)' : 'scale(1)',
                        transformOrigin: 'center',
                        transition: 'all 0.2s ease'
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {usersWithPercent.map((item, index) => (
              <div key={index} className="flex items-center text-xs text-gray-700 dark:text-gray-300">
                <div className="w-3 h-3 rounded mr-1" style={{ backgroundColor: item.color }} />
                <span>{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Products Chart */}
        <div>
          <h3 className="text-lg font-medium mb-2 text-center text-gray-800 dark:text-gray-200">Product Status</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={productsWithPercent}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={70}
                  dataKey="value"
                  onMouseEnter={(_, index) => setActiveProducts(index)}
                  onMouseLeave={() => setActiveProducts(null)}
                >
                  {productsWithPercent.map((entry, index) => (
                    <Cell 
                      key={index} 
                      fill={entry.color}
                      stroke={activeProducts === index ? '#fff' : 'none'}
                      strokeWidth={activeProducts === index ? 2 : 0}
                      style={{
                        filter: activeProducts === index ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none',
                        transform: activeProducts === index ? 'scale(1.05)' : 'scale(1)',
                        transformOrigin: 'center',
                        transition: 'all 0.2s ease'
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {productsWithPercent.map((item, index) => (
              <div key={index} className="flex items-center text-xs text-gray-700 dark:text-gray-300">
                <div className="w-3 h-3 rounded mr-1" style={{ backgroundColor: item.color }} />
                <span>{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Memberships Chart */}
        <div>
          <h3 className="text-lg font-medium mb-2 text-center text-gray-800 dark:text-gray-200">Membership Types</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={membershipsWithPercent}
                  cx="50%"
                  cy="50%"
                  innerRadius={30}
                  outerRadius={70}
                  dataKey="value"
                  onMouseEnter={(_, index) => setActiveMemberships(index)}
                  onMouseLeave={() => setActiveMemberships(null)}
                >
                  {membershipsWithPercent.map((entry, index) => (
                    <Cell 
                      key={index} 
                      fill={entry.color}
                      stroke={activeMemberships === index ? '#fff' : 'none'}
                      strokeWidth={activeMemberships === index ? 2 : 0}
                      style={{
                        filter: activeMemberships === index ? 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))' : 'none',
                        transform: activeMemberships === index ? 'scale(1.05)' : 'scale(1)',
                        transformOrigin: 'center',
                        transition: 'all 0.2s ease'
                      }}
                    />
                  ))}
                </Pie>
                <Tooltip content={<CustomTooltip />} />
              </PieChart>
            </ResponsiveContainer>
          </div>
          <div className="flex flex-wrap justify-center gap-3 mt-2">
            {membershipsWithPercent.map((item, index) => (
              <div key={index} className="flex items-center text-xs text-gray-700 dark:text-gray-300">
                <div className="w-3 h-3 rounded mr-1" style={{ backgroundColor: item.color }} />
                <span>{item.name}: {item.value}</span>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* Quick stats pinned to bottom */}
      <div className="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 flex justify-center gap-10 text-center">
        <div>
          <p className="text-lg font-bold text-blue-600 dark:text-blue-400">
            {usersWithPercent.reduce((s, i) => s + i.value, 0)}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Total Users</p>
        </div>
        <div>
          <p className="text-lg font-bold text-green-600 dark:text-green-400">
            {productsWithPercent.reduce((s, i) => s + i.value, 0)}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Total Products</p>
        </div>
        <div>
          <p className="text-lg font-bold text-purple-600 dark:text-purple-400">
            {userCounts?.memberships?.premium || 0}
          </p>
          <p className="text-xs text-gray-600 dark:text-gray-400">Premium Users</p>
        </div>
      </div>
    </div>
  );
};

export default CompactPieChart;
