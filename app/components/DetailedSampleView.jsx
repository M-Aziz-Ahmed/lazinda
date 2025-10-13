export default function DetailedSampleView({ sample, onClose }) {
  const getStatusColor = (status) => {
    switch(status) {
      case 'Shipped': return 'bg-green-100 text-green-800 border-green-300';
      case 'Washing': return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'Cutting': return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'Finishing': return 'bg-indigo-100 text-indigo-800 border-indigo-300';
      case 'Sewing': return 'bg-pink-100 text-pink-800 border-pink-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const isDelayed = sample.shipmentDelay !== 'No Delay';

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-red-100 rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-red-100 border-b p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{sample.id} - Detailed View</h2>
              <p className="text-gray-600">{sample.inquiry} • {sample.brand}</p>
            </div>
            <button 
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
        </div>

        <div className="p-6 space-y-6">
          {/* Basic Information Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">Sample Information</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">SRDE:</span>
                    <span className="font-medium">{sample.srde}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Style:</span>
                    <span className="font-medium">{sample.style}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Size:</span>
                    <span className="font-medium">{sample.size}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Quantity:</span>
                    <span className="font-medium">{sample.qty} pieces</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sample Type:</span>
                    <span className="font-medium">{sample.sampleType}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-3">Timeline & Status</h3>
                <div className="space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Request Date:</span>
                    <span className="font-medium">{new Date(sample.sampleRequestDate).toLocaleDateString()}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">ETD:</span>
                    <span className={`font-medium ${isDelayed ? 'text-red-600' : 'text-gray-900'}`}>
                      {new Date(sample.etd).toLocaleDateString()}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Shipment Delay:</span>
                    <span className={`font-medium ${isDelayed ? 'text-red-600' : 'text-green-600'}`}>
                      {sample.shipmentDelay}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Production Status:</span>
                    <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(sample.status)}`}>
                      {sample.status}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Inquiry Status:</span>
                    <span className="font-medium">{sample.inquiryStatus}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Fabric & Color Details */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-700 mb-4">Material Details</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 mb-1">Fabric Composition</p>
                <p className="font-medium bg-red-100 p-3 rounded-lg border">{sample.fabric}</p>
              </div>
              <div>
                <p className="text-gray-500 mb-1">Color / Wash</p>
                <p className="font-medium bg-red-100 p-3 rounded-lg border">{sample.colorWash}</p>
              </div>
            </div>
          </div>

          {/* Description */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-700 mb-3">Description</h3>
            <p className="text-sm text-gray-800 bg-red-100 p-4 rounded-lg border">{sample.description}</p>
          </div>

          {/* Assignment & Tracking */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-700 mb-3">Assignment</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Assigned To:</span>
                  <span className="font-medium">{sample.assignedTo}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Department:</span>
                  <span className="font-medium">{sample.department}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Revisions:</span>
                  <span className="font-medium">{sample.revisions}</span>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="font-semibold text-gray-700 mb-3">Additional Info</h3>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-500">Customer:</span>
                  <span className="font-medium">{sample.customer}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Season:</span>
                  <span className="font-medium">{sample.season}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-500">Category:</span>
                  <span className="font-medium">{sample.category}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Remarks & Rejection */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {sample.remarks && (
              <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
                <h4 className="font-semibold text-blue-800 mb-2">Remarks</h4>
                <p className="text-blue-700 text-sm">{sample.remarks}</p>
              </div>
            )}
            {sample.reasonOfRejection && (
              <div className="bg-red-50 rounded-lg p-4 border border-red-200">
                <h4 className="font-semibold text-red-800 mb-2">Reason of Rejection</h4>
                <p className="text-red-700 text-sm">{sample.reasonOfRejection}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}