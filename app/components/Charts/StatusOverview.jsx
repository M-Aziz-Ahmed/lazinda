export default function StatusOverview({ data }) {
  const statusCounts = {
    Shipped: data.filter(item => item.status === 'Shipped').length,
    Washing: data.filter(item => item.status === 'Washing').length,
    Cutting: data.filter(item => item.status === 'Cutting').length,
    Finishing: data.filter(item => item.status === 'Finishing').length,
    Sewing: data.filter(item => item.status === 'Sewing').length
  };

  const total = data.length;

  return (
    <div className="bg-red-100 rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4">Production Status</h3>
      <div className="space-y-3">
        {Object.entries(statusCounts).map(([status, count]) => (
          <div key={status} className="flex items-center justify-between bg-white p-3 rounded-lg border border-gray-200">
            <span className="text-sm text-gray-600">{status}</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${
                    status === 'Shipped' ? 'bg-green-500' :
                    status === 'Washing' ? 'bg-blue-500' :
                    status === 'Cutting' ? 'bg-purple-500' :
                    status === 'Finishing' ? 'bg-indigo-500' : 'bg-pink-500'
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