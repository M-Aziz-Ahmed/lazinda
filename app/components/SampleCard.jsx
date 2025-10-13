import SampleProgressBar from './SampleProgressBar';
export default function SampleCard({ sample, isSelected, onSelect }) {
  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'High': return 'bg-red-100 text-red-800 border-red-300';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'Low': return 'bg-green-100 text-green-800 border-green-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Shipped': return 'bg-green-100 text-green-800';
      case 'Washing': return 'bg-blue-100 text-blue-800';
      case 'Cutting': return 'bg-purple-100 text-purple-800';
      case 'Finishing': return 'bg-indigo-100 text-indigo-800';
      case 'Sewing': return 'bg-pink-100 text-pink-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getInquiryStatusColor = (status) => {
    switch (status) {
      case 'Approved': return 'bg-green-100 text-green-800 border-green-300';
      case 'Rejected': return 'bg-red-100 text-red-800 border-red-300';
      case 'Pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'In Progress': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const isDelayed = sample.shipmentDelay !== 'No Delay';

  return (
    <div
      className={`bg-white p-6 rounded-xl border-2 cursor-pointer transition-all ${isSelected ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
        } ${isDelayed ? 'border-l-4 border-l-red-500' : ''}`}
      onClick={onSelect}
    >
      <SampleProgressBar status={sample.status} />

      {/* Header */}
      <div className="flex justify-between items-start my-6">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-gray-900">{sample.id}</h3>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(sample.priority)}`}>
              {sample.priority}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(sample.status)}`}>
              {sample.status}
            </span>
            <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getInquiryStatusColor(sample.inquiryStatus)}`}>
              {sample.inquiryStatus}
            </span>
          </div>
          <p className="text-lg font-semibold text-gray-800">{sample.inquiry}</p>
          <p className="text-gray-600">{sample.brand} • {sample.srde}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Request Date</p>
          <p className="font-semibold">{new Date(sample.sampleRequestDate).toLocaleDateString()}</p>
        </div>
      </div>

      {/* Sample Details */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div>
          <p className="text-sm text-gray-500">Style</p>
          <p className="font-semibold">{sample.style}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Size / QTY</p>
          <p className="font-semibold">{sample.size} • {sample.qty} pcs</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">Sample Type</p>
          <p className="font-semibold">{sample.sampleType}</p>
        </div>
        <div>
          <p className="text-sm text-gray-500">ETD</p>
          <p className={`font-semibold ${isDelayed ? 'text-red-600' : 'text-gray-900'}`}>
            {new Date(sample.etd).toLocaleDateString()}
            {isDelayed && ` (${sample.shipmentDelay})`}
          </p>
        </div>
      </div>

      {/* Additional Information */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Fabric</p>
          <p className="font-medium truncate">{sample.fabric}</p>
        </div>
        <div>
          <p className="text-gray-500">Color/Wash</p>
          <p className="font-medium">{sample.colorWash}</p>
        </div>
        <div>
          <p className="text-gray-500">Assigned To</p>
          <p className="font-medium">{sample.assignedTo}</p>
        </div>
      </div>

      {/* Remarks & Rejection Reason */}
      <div className="mt-4 space-y-2">
        {sample.remarks && (
          <div className="p-3 bg-blue-50 rounded-lg border border-blue-200">
            <p className="text-sm text-blue-800">{sample.remarks}</p>
          </div>
        )}
        {sample.reasonOfRejection && (
          <div className="p-3 bg-red-50 rounded-lg border border-red-200">
            <p className="text-sm text-red-800">
              <span className="font-semibold">Rejection Reason:</span> {sample.reasonOfRejection}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}