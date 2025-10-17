export default function QualityMetrics({ data }) {
  const metrics = data.map(report => ({
    id: report.id,
    quality: report.qualityMetrics.overallScore,
    tensile: report.mechanicalProperties.tensileStrengthWarp,
    defects: report.qualityMetrics.defectsPer100m,
    colorFastness: report.colorFastness.washing,
    fabricType: report.fabricType
  }));

  return (
    <div className="bg-red-100 rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4">Quality Metrics Overview</h3>
      <div className="space-y-4">
        {metrics.map(metric => (
          <div key={metric.id} className="flex items-center justify-between">
            <div className="flex-1">
              <div className="flex justify-between text-sm mb-1">
                <span className="font-medium">{metric.id}</span>
                <span className="text-gray-500">{metric.fabricType}</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className="h-3 rounded-full bg-gradient-to-r from-green-400 to-blue-500"
                  style={{ width: `${metric.quality}%` }}
                ></div>
              </div>
            </div>
            <div className="ml-4 text-right text-sm">
              <div className="font-semibold">{metric.quality}%</div>
              <div className="text-gray-500">{metric.tensile}N</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}