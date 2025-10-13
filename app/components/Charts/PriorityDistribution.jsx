export default function PriorityDistribution({ data }) {
  const priorityCounts = {
    High: data.filter(item => item.priority === 'High').length,
    Medium: data.filter(item => item.priority === 'Medium').length,
    Low: data.filter(item => item.priority === 'Low').length
  };

  const total = data.length;

  return (
    <div className="bg-red-100 rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4">Priority Distribution</h3>
      <div className="space-y-3">
        {Object.entries(priorityCounts).map(([priority, count]) => (
          <div key={priority} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
            <div className="flex items-center">
              <div className={`w-3 h-3 rounded-full mr-2 ${
                priority === 'High' ? 'bg-red-500' :
                priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
              }`}></div>
              <span className="text-sm text-gray-600">{priority}</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    priority === 'High' ? 'bg-red-500' :
                    priority === 'Medium' ? 'bg-yellow-500' : 'bg-green-500'
                  }`}
                  style={{ width: `${(count / total) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium w-6">{count}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}