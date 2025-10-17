export default function StatusBadge({ status }) {
  const statusConfig = {
    approved: {
      color: 'bg-green-100 text-green-800 border-green-200',
      text: 'Approved'
    },
    pending: {
      color: 'bg-yellow-100 text-yellow-800 border-yellow-200',
      text: 'Pending'
    },
    rejected: {
      color: 'bg-red-100 text-red-800 border-red-200',
      text: 'Rejected'
    },
    'in-testing': {
      color: 'bg-blue-100 text-blue-800 border-blue-200',
      text: 'In Testing'
    },
    all: {
      color: 'bg-gray-100 text-gray-800 border-gray-200',
      text: 'All'
    }
  };

  const config = statusConfig[status] || statusConfig.pending;

  return (
    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${config.color}`}>
      {config.text}
    </span>
  );
}