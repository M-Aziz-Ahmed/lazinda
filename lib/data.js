export const sampleData = [
  {
    id: 'SR-2024-001',
    inquiry: 'Spring Summer 2024 Collection',
    priority: 'High',
    sampleRequestDate: '2024-01-15',
    srde: 'SS24-CAS-001',
    brand: 'Urban Classic',
    style: 'Shirt',
    description: 'Casual Linen Blend Shirt with Button Down Collar',
    size: 'M',
    qty: 3,
    fabric: '55% Linen, 45% Cotton',
    colorWash: 'Natural Ecru',
    sampleType: 'Development',
    inquiryStatus: 'In Progress',
    shipmentDelay: 'No Delay',
    etd: '2024-02-20',
    picture: '/samples/ss24-shirt-001.jpg',
    status: 'Cutting',
    reasonOfRejection: '',
    remarks: 'Initial sample for fit and fabric handfeel evaluation',
    
    // Additional tracking fields
    assignedTo: 'Sarah Chen',
    department: 'Sampling',
    targetCompletion: '2024-02-15',
    actualCompletion: '',
    revisions: 0,
    customer: 'Fashion Retail Co.',
    season: 'SS24',
    category: 'Casual Wear'
  },
  {
    id: 'SR-2024-002',
    inquiry: 'Premium Denim Line',
    priority: 'High',
    sampleRequestDate: '2024-01-10',
    srde: 'SS24-DEN-001',
    brand: 'Denim Masters',
    style: 'Jeans',
    description: 'Slim Fit Stretch Denim with Raw Hem',
    size: '32W x 34L',
    qty: 2,
    fabric: '98% Cotton, 2% Elastane',
    colorWash: 'Dark Indigo',
    sampleType: 'Gold Seal',
    inquiryStatus: 'Approved',
    shipmentDelay: '2 days',
    etd: '2024-02-05',
    picture: '/samples/ss24-jeans-001.jpg',
    status: 'Finishing',
    reasonOfRejection: '',
    remarks: 'Gold seal sample for final approval before production',
    
    assignedTo: 'Mike Rodriguez',
    department: 'Sampling',
    targetCompletion: '2024-02-01',
    actualCompletion: '',
    revisions: 1,
    customer: 'Premium Brands Inc.',
    season: 'SS24',
    category: 'Denim'
  },
  {
    id: 'SR-2024-003',
    inquiry: 'Beachwear Collection',
    priority: 'Medium',
    sampleRequestDate: '2024-01-18',
    srde: 'SS24-SHT-001',
    brand: 'Coastal Living',
    style: 'Shorts',
    description: 'Swim Trunks with Quick Dry Technology',
    size: 'L',
    qty: 4,
    fabric: '100% Recycled Polyester',
    colorWash: 'Navy Blue with Print',
    sampleType: 'Fit Sample',
    inquiryStatus: 'Pending',
    shipmentDelay: 'No Delay',
    etd: '2024-03-01',
    picture: '/samples/ss24-shorts-001.jpg',
    status: 'Sewing',
    reasonOfRejection: '',
    remarks: 'Fit sample for size validation and comfort testing',
    
    assignedTo: 'Lisa Wang',
    department: 'Sampling',
    targetCompletion: '2024-02-25',
    actualCompletion: '',
    revisions: 0,
    customer: 'Resort Wear Ltd.',
    season: 'SS24',
    category: 'Swimwear'
  },
  {
    id: 'SR-2024-004',
    inquiry: 'Office Formal Wear',
    priority: 'Medium',
    sampleRequestDate: '2024-01-12',
    srde: 'SS24-SHR-002',
    brand: 'Executive Style',
    style: 'Shirt',
    description: 'Non-Iron Formal Dress Shirt with French Cuffs',
    size: '16.5" 34/35',
    qty: 3,
    fabric: '100% Cotton Poplin',
    colorWash: 'White',
    sampleType: 'Development',
    inquiryStatus: 'Rejected',
    shipmentDelay: '1 week',
    etd: '2024-02-28',
    picture: '/samples/ss24-shirt-002.jpg',
    status: 'Washing',
    reasonOfRejection: 'Collar construction not meeting quality standards',
    remarks: 'Revise collar pattern and resubmit for approval',
    
    assignedTo: 'David Kim',
    department: 'Sampling',
    targetCompletion: '2024-02-10',
    actualCompletion: '',
    revisions: 2,
    customer: 'Corporate Apparel',
    season: 'SS24',
    category: 'Formal Wear'
  },
  {
    id: 'SR-2024-005',
    inquiry: 'Vintage Collection',
    priority: 'Low',
    sampleRequestDate: '2024-01-20',
    srde: 'SS24-JEA-002',
    brand: 'Retro Denim',
    style: 'Jeans',
    description: 'Vintage Wash Bootcut Jeans with Classic Details',
    size: '30W x 32L',
    qty: 2,
    fabric: '100% Cotton Denim',
    colorWash: 'Light Stone Wash',
    sampleType: 'Development',
    inquiryStatus: 'In Progress',
    shipmentDelay: 'No Delay',
    etd: '2024-03-10',
    picture: '/samples/ss24-jeans-002.jpg',
    status: 'Shipped',
    reasonOfRejection: '',
    remarks: 'Development sample for wash approval and fit testing',
    
    assignedTo: 'Anna Lopez',
    department: 'Sampling',
    targetCompletion: '2024-03-05',
    actualCompletion: '2024-03-08',
    revisions: 0,
    customer: 'Vintage Stores Co.',
    season: 'SS24',
    category: 'Denim'
  }
];

export const getSamplingStats = (data) => {
  const totalSamples = data.length;
  const highPriority = data.filter(item => item.priority === 'High').length;
  const mediumPriority = data.filter(item => item.priority === 'Medium').length;
  const lowPriority = data.filter(item => item.priority === 'Low').length;
  
  const statusCounts = {
    shipped: data.filter(item => item.status === 'Shipped').length,
    washing: data.filter(item => item.status === 'Washing').length,
    cutting: data.filter(item => item.status === 'Cutting').length,
    finishing: data.filter(item => item.status === 'Finishing').length,
    sewing: data.filter(item => item.status === 'Sewing').length
  };

  const inquiryStatusCounts = {
    approved: data.filter(item => item.inquiryStatus === 'Approved').length,
    rejected: data.filter(item => item.inquiryStatus === 'Rejected').length,
    pending: data.filter(item => item.inquiryStatus === 'Pending').length,
    inProgress: data.filter(item => item.inquiryStatus === 'In Progress').length
  };

  const delayedSamples = data.filter(item => item.shipmentDelay !== 'No Delay').length;
  const totalQty = data.reduce((acc, item) => acc + item.qty, 0);

  return {
    totalSamples,
    highPriority,
    mediumPriority,
    lowPriority,
    statusCounts,
    inquiryStatusCounts,
    delayedSamples,
    totalQty,
    onTimePercentage: ((totalSamples - delayedSamples) / totalSamples * 100).toFixed(1)
  };
};

export const sampleTypes = ['Development', 'Gold Seal', 'Fit Sample'];
export const priorities = ['High', 'Medium', 'Low'];
export const statuses = ['Cutting','Sewing','Washing','Finishing','Shipped' ];
export const inquiryStatuses = ['Approved', 'Rejected', 'Pending', 'In Progress'];
export const styles = ['Shirt', 'Jeans', 'Shorts'];