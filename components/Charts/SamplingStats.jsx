export default function SamplingStats({ data }) {
  const statusData = {
    approved: data.filter(item => item.status === 'approved').length,
    pending: data.filter(item => item.status === 'pending').length,
    rejected: data.filter(item => item.status === 'rejected').length,
    'in-testing': data.filter(item => item.status === 'in-testing').length,
  };

  const fabricTypes = [...new Set(data.map(item => item.fabricType))];
  const fabricTypeData = fabricTypes.map(type => ({
    type,
    count: data.filter(item => item.fabricType === type).length
  }));

  return (
    <div className="space-y-6">
      {/* Status Distribution */}
      <div className="bg-red-100 p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Status Distribution</h3>
        <div className="space-y-3">
          {Object.entries(statusData).map(([status, count]) => (
            <div key={status} className="flex items-center justify-between">
              <span className="capitalize text-sm text-gray-600">
                {status === 'in-testing' ? 'In Testing' : status}
              </span>
              <div className="flex items-center space-x-2">
                <div className="w-24 bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      status === 'approved' ? 'bg-green-500' :
                      status === 'pending' ? 'bg-yellow-500' :
                      status === 'rejected' ? 'bg-red-500' : 'bg-blue-500'
                    }`}
                    style={{ width: `${(count / data.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium w-8">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Fabric Type Distribution */}
      <div className="bg-red-100 p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Fabric Types</h3>
        <div className="space-y-3">
          {fabricTypeData.map(({ type, count }) => (
            <div key={type} className="flex items-center justify-between">
              <span className="text-sm text-gray-600">{type}</span>
              <div className="flex items-center space-x-2">
                <div className="w-20 bg-gray-200 rounded-full h-2">
                  <div 
                    className="h-2 rounded-full bg-purple-500"
                    style={{ width: `${(count / data.length) * 100}%` }}
                  ></div>
                </div>
                <span className="text-sm font-medium w-6">{count}</span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Quality Score Distribution */}
      <div className="bg-red-100 p-6 rounded-lg shadow-sm border">
        <h3 className="text-lg font-semibold mb-4">Quality Scores</h3>
        <div className="space-y-2">
          {[90, 80, 70, 60].map(threshold => {
            const count = data.filter(item => item.qualityScore >= threshold && item.qualityScore < threshold + 10).length;
            return (
              <div key={threshold} className="flex items-center justify-between text-sm">
                <span className="text-gray-600">{threshold}+</span>
                <div className="flex items-center space-x-2">
                  <div className="w-16 bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        threshold >= 90 ? 'bg-green-500' :
                        threshold >= 80 ? 'bg-blue-500' :
                        threshold >= 70 ? 'bg-yellow-500' : 'bg-red-500'
                      }`}
                      style={{ width: `${(count / data.length) * 100}%` }}
                    ></div>
                  </div>
                  <span className="font-medium w-6">{count}</span>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}