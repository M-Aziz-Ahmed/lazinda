import StatusBadge from './StatusBadge';

export default function DetailedReportView({ report, onClose }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <div className="bg-red-100 rounded-xl shadow-2xl max-w-6xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-red-100 border-b p-6">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-2xl font-bold text-gray-900">{report.id} - Detailed Report</h2>
              <p className="text-gray-600">{report.fabricType} • {report.supplier}</p>
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
          {/* Basic Information */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Sample Information</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Batch Number:</span>
                    <span className="font-medium">{report.batchNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Lot Number:</span>
                    <span className="font-medium">{report.lotNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Sampling Date:</span>
                    <span className="font-medium">{new Date(report.samplingDate).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Order Details</h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Customer:</span>
                    <span className="font-medium">{report.customer}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">PO Number:</span>
                    <span className="font-medium">{report.poNumber}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Order Quantity:</span>
                    <span className="font-medium">{report.orderQuantity.toLocaleString()} meters</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-700 mb-2">Status & Priority</h3>
                <div className="space-y-3">
                  <StatusBadge status={report.status} />
                  <div className="flex justify-between">
                    <span className="text-gray-500">Risk Assessment:</span>
                    <span className={`font-medium ${
                      report.riskAssessment === 'High' ? 'text-red-600' :
                      report.riskAssessment === 'Medium' ? 'text-yellow-600' : 'text-green-600'
                    }`}>
                      {report.riskAssessment}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Priority:</span>
                    <span className="font-medium">{report.priority}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Physical Properties */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-700 mb-4">Physical Properties</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center p-3 bg-red-100 rounded-lg">
                <p className="text-gray-500">Weight</p>
                <p className="font-semibold text-lg">{report.physicalProperties.weight} g/m²</p>
              </div>
              <div className="text-center p-3 bg-red-100 rounded-lg">
                <p className="text-gray-500">Thickness</p>
                <p className="font-semibold text-lg">{report.physicalProperties.thickness} mm</p>
              </div>
              <div className="text-center p-3 bg-red-100 rounded-lg">
                <p className="text-gray-500">Width</p>
                <p className="font-semibold text-lg">{report.physicalProperties.width} cm</p>
              </div>
              <div className="text-center p-3 bg-red-100 rounded-lg">
                <p className="text-gray-500">Density</p>
                <p className="font-semibold text-lg">{report.physicalProperties.density} TPI</p>
              </div>
            </div>
          </div>

          {/* Mechanical Properties */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-700 mb-4">Mechanical Properties</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
              <div className="text-center p-3 bg-red-100 rounded-lg">
                <p className="text-gray-500">Tensile (Warp)</p>
                <p className="font-semibold text-lg">{report.mechanicalProperties.tensileStrengthWarp} N</p>
              </div>
              <div className="text-center p-3 bg-red-100 rounded-lg">
                <p className="text-gray-500">Tensile (Weft)</p>
                <p className="font-semibold text-lg">{report.mechanicalProperties.tensileStrengthWeft} N</p>
              </div>
              <div className="text-center p-3 bg-red-100 rounded-lg">
                <p className="text-gray-500">Tear Strength</p>
                <p className="font-semibold text-lg">{report.mechanicalProperties.tearStrengthWarp} N</p>
              </div>
              <div className="text-center p-3 bg-red-100 rounded-lg">
                <p className="text-gray-500">Bursting Strength</p>
                <p className="font-semibold text-lg">{report.mechanicalProperties.burstingStrength} kPa</p>
              </div>
            </div>
          </div>

          {/* Quality Assessment */}
          <div className="bg-gray-50 rounded-lg p-6">
            <h3 className="font-semibold text-gray-700 mb-4">Quality Assessment</h3>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-red-100 rounded-lg">
                <p className="text-gray-500 text-sm">Overall Quality Score</p>
                <p className={`text-3xl font-bold ${
                  report.qualityMetrics.overallScore >= 90 ? 'text-green-600' :
                  report.qualityMetrics.overallScore >= 80 ? 'text-yellow-600' : 'text-red-600'
                }`}>
                  {report.qualityMetrics.overallScore}%
                </p>
              </div>
              <div className="text-center p-4 bg-red-100 rounded-lg">
                <p className="text-gray-500 text-sm">Defects per 100m</p>
                <p className="text-3xl font-bold">{report.qualityMetrics.defectsPer100m}</p>
              </div>
              <div className="text-center p-4 bg-red-100 rounded-lg">
                <p className="text-gray-500 text-sm">Inspection Grade</p>
                <p className="text-3xl font-bold text-blue-600">{report.qualityMetrics.inspectionGrade}</p>
              </div>
            </div>
          </div>

          {/* Notes & Recommendations */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
              <h4 className="font-semibold text-yellow-800 mb-2">Inspector Notes</h4>
              <p className="text-yellow-700 text-sm">{report.notes}</p>
            </div>
            <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-2">Recommendations</h4>
              <p className="text-blue-700 text-sm">{report.recommendations}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}