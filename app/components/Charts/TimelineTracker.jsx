export default function TimelineTracker({ data }) {
  const upcomingSamples = data
    .filter(sample => sample.status !== 'Shipped')
    .sort((a, b) => new Date(a.etd) - new Date(b.etd))
    .slice(0, 5);

  return (
    <div className="bg-black rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4 text-white">Upcoming Deliveries</h3>
      <div className="space-y-4">
        {upcomingSamples.map(sample => {
          const isDelayed = sample.shipmentDelay !== 'No Delay';
          const daysUntilETD = Math.ceil((new Date(sample.etd) - new Date()) / (1000 * 60 * 60 * 24));
          
          return (
            <div key={sample.id} className="flex items-center justify-between p-3 border border-gray-200 bg-white rounded-lg">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="font-medium text-sm">{sample.id}</span>
                  <span className={`px-2 py-1 rounded-full text-xs ${
                    sample.priority === 'High' ? 'bg-red-100 text-red-800' :
                    sample.priority === 'Medium' ? 'bg-yellow-100 text-yellow-800' : 'bg-green-100 text-green-800'
                  }`}>
                    {sample.priority}
                  </span>
                </div>
                <p className="text-sm text-gray-600">{sample.brand} - {sample.style}</p>
              </div>
              <div className="text-right">
                <p className={`text-sm font-medium ${isDelayed ? 'text-red-600' : 'text-gray-900'}`}>
                  ETD: {new Date(sample.etd).toLocaleDateString()}
                </p>
                <p className="text-xs text-gray-500">
                  {daysUntilETD > 0 ? `${daysUntilETD} days left` : 'Overdue'}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}