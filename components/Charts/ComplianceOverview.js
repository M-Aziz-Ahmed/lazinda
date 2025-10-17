export default function ComplianceOverview({ data }) {
  const complianceStats = {
    oekoTex: data.filter(item => item.compliance.meetsOekoTex).length,
    reach: data.filter(item => item.compliance.meetsReach).length,
    certified: data.filter(item => item.compliance.certification !== 'None').length,
    compliant: data.filter(item => item.compliance.regulatoryStatus === 'Compliant').length
  };

  const total = data.length;

  return (
    <div className="bg-red-100 rounded-xl shadow-sm border p-6">
      <h3 className="text-lg font-semibold mb-4">Compliance & Certifications</h3>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="text-center p-4 bg-green-50 rounded-lg border border-green-200">
          <p className="text-2xl font-bold text-green-600">{complianceStats.oekoTex}</p>
          <p className="text-sm text-green-800">Oeko-Tex Certified</p>
          <p className="text-xs text-green-600 mt-1">
            {((complianceStats.oekoTex / total) * 100).toFixed(0)}%
          </p>
        </div>
        <div className="text-center p-4 bg-blue-50 rounded-lg border border-blue-200">
          <p className="text-2xl font-bold text-blue-600">{complianceStats.reach}</p>
          <p className="text-sm text-blue-800">REACH Compliant</p>
          <p className="text-xs text-blue-600 mt-1">
            {((complianceStats.reach / total) * 100).toFixed(0)}%
          </p>
        </div>
        <div className="text-center p-4 bg-purple-50 rounded-lg border border-purple-200">
          <p className="text-2xl font-bold text-purple-600">{complianceStats.certified}</p>
          <p className="text-sm text-purple-800">Quality Certified</p>
          <p className="text-xs text-purple-600 mt-1">
            {((complianceStats.certified / total) * 100).toFixed(0)}%
          </p>
        </div>
        <div className="text-center p-4 bg-indigo-50 rounded-lg border border-indigo-200">
          <p className="text-2xl font-bold text-indigo-600">{complianceStats.compliant}</p>
          <p className="text-sm text-indigo-800">Fully Compliant</p>
          <p className="text-xs text-indigo-600 mt-1">
            {((complianceStats.compliant / total) * 100).toFixed(0)}%
          </p>
        </div>
      </div>
    </div>
  );
}