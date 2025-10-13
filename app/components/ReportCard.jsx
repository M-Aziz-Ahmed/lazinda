import StatusBadge from './StatusBadge';

export default function ReportCard({ report, isSelected, onSelect }) {
  const getRiskColor = (risk) => {
    switch(risk) {
      case 'High': return 'bg-red-100 text-red-800 border-red-200';
      case 'Medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'Low': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'High': return 'text-red-600 bg-red-50';
      case 'Medium': return 'text-yellow-600 bg-yellow-50';
      case 'Low': return 'text-green-600 bg-green-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  return (
    <div 
      className={`bg-red-100 p-6 rounded-xl border-2 cursor-pointer transition-all ${
        isSelected ? 'border-blue-500 ring-2 ring-blue-100' : 'border-gray-200 hover:border-gray-300 hover:shadow-md'
      }`}
      onClick={onSelect}
    >
      {/* Header */}
      <div className="flex justify-between items-start mb-4">
        <div className="flex-1">
          <div className="flex items-center gap-3 mb-2">
            <h3 className="text-xl font-bold text-gray-900">{report.id}</h3>
            <StatusBadge status={report.status} />
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getRiskColor(report.riskAssessment)}`}>
              {report.riskAssessment} Risk
            </span>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(report.priority)}`}>
              {report.priority} Priority
            </span>
          </div>
          <p className="text-lg font-semibold text-gray-800">{report.fabricType}</p>
          <p className="text-gray-600">{report.supplier} • {report.batchNumber}</p>
        </div>
        <div className="text-right">
          <p className="text-sm text-gray-500">Order Quantity</p>
          <p className="font-semibold">{report.orderQuantity.toLocaleString()}m</p>
        </div>
      </div>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Quality Score</p>
          <p className={`text-2xl font-bold ${
            report.qualityMetrics.overallScore >= 90 ? 'text-green-600' :
            report.qualityMetrics.overallScore >= 80 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {report.qualityMetrics.overallScore}%
          </p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Tensile Strength</p>
          <p className="text-2xl font-bold text-blue-600">
            {report.mechanicalProperties.tensileStrengthWarp}N
          </p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Defects/100m</p>
          <p className={`text-2xl font-bold ${
            report.qualityMetrics.defectsPer100m <= 2 ? 'text-green-600' :
            report.qualityMetrics.defectsPer100m <= 4 ? 'text-yellow-600' : 'text-red-600'
          }`}>
            {report.qualityMetrics.defectsPer100m}
          </p>
        </div>
        <div className="text-center p-3 bg-gray-50 rounded-lg">
          <p className="text-sm text-gray-500">Weight</p>
          <p className="text-2xl font-bold text-purple-600">
            {report.physicalProperties.weight}g/m²
          </p>
        </div>
      </div>

      {/* Additional Details */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm">
        <div>
          <p className="text-gray-500">Inspector</p>
          <p className="font-medium">{report.inspector}</p>
        </div>
        <div>
          <p className="text-gray-500">Sampling Date</p>
          <p className="font-medium">{new Date(report.samplingDate).toLocaleDateString()}</p>
        </div>
        <div>
          <p className="text-gray-500">Compliance</p>
          <p className={`font-medium ${
            report.compliance.regulatoryStatus === 'Compliant' ? 'text-green-600' : 'text-red-600'
          }`}>
            {report.compliance.regulatoryStatus}
          </p>
        </div>
      </div>

      {/* Notes Preview */}
      {report.notes && (
        <div className="mt-4 p-3 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-sm text-blue-800">{report.notes}</p>
        </div>
      )}
    </div>
  );
}