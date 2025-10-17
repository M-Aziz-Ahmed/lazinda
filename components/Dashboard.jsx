'use client';

import { useState } from 'react';
import { sampleData, getSamplingStats, sampleTypes, priorities, statuses, inquiryStatuses, styles } from '../lib/data';
import DetailedReportView from './DetailedReportView';
import StatusOverview from './Charts/StatusOverview';
import PriorityDistribution from './Charts/PriorityDistribution';
import TimelineTracker from './Charts/TimelineTracker';
import SampleCard from './SampleCard';

export default function Dashboard() {
  const [samples, setSamples] = useState(sampleData);
  const [selectedSample, setSelectedSample] = useState(null);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [priorityFilter, setPriorityFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [sampleTypeFilter, setSampleTypeFilter] = useState('all');
  const [inquiryStatusFilter, setInquiryStatusFilter] = useState('all');

  const stats = getSamplingStats(samples);

  const filteredSamples = samples.filter(sample => {
    const matchesFilter = filter === 'all' || sample.id.includes(filter);
    const matchesSearch = 
      sample.inquiry.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.srde.toLowerCase().includes(searchTerm.toLowerCase()) ||
      sample.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPriority = priorityFilter === 'all' || sample.priority === priorityFilter;
    const matchesStatus = statusFilter === 'all' || sample.status === statusFilter;
    const matchesSampleType = sampleTypeFilter === 'all' || sample.sampleType === sampleTypeFilter;
    const matchesInquiryStatus = inquiryStatusFilter === 'all' || sample.inquiryStatus === inquiryStatusFilter;

    return matchesFilter && matchesSearch && matchesPriority && matchesStatus && matchesSampleType && matchesInquiryStatus;
  });

  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      {/* Header */}
      <div className="bg-black rounded-xl shadow-sm border p-6">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-3xl font-bold text-white">Garment Sampling </h1>
            <p className="text-gray-300 mt-2">Sample Request & Development Tracking System</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-300">Active Samples</p>
            <p className="text-2xl font-bold text-blue-600">{stats.totalSamples}</p>
          </div>
        </div>
      </div>

      {/* KPI Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        <div className="bg-black p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-300">Total Samples</h3>
          <p className="text-2xl font-bold text-white mt-1">{stats.totalSamples}</p>
        </div>
        <div className="bg-black p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-300">High Priority</h3>
          <p className="text-2xl font-bold text-red-600 mt-1">{stats.highPriority}</p>
        </div>
        <div className="bg-black p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-300">Delayed</h3>
          <p className="text-2xl font-bold text-yellow-600 mt-1">{stats.delayedSamples}</p>
        </div>
        <div className="bg-black p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-300">Total QTY</h3>
          <p className="text-2xl font-bold text-green-600 mt-1">{stats.totalQty}</p>
        </div>
        <div className="bg-black p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-300">On Time</h3>
          <p className="text-2xl font-bold text-purple-600 mt-1">{stats.onTimePercentage}%</p>
        </div>
        <div className="bg-black p-4 rounded-lg shadow-sm border">
          <h3 className="text-sm font-medium text-gray-300">Approved</h3>
          <p className="text-2xl font-bold text-white mt-1">{stats.inquiryStatusCounts.approved}</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-4 gap-6">
        {/* Left Sidebar - Filters & Charts */}
        <div className="xl:col-span-1 space-y-6">
          {/* Quick Filters */}
          <div className="bg-black rounded-xl shadow-sm border p-6">
            <h3 className="text-lg font-semibold mb-4 text-white">Quick Filters</h3>
            
            {/* Priority Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Priority</label>
              <select 
                value={priorityFilter}
                onChange={(e) => setPriorityFilter(e.target.value)}
                className="w-full bg-white p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Priorities</option>
                {priorities.map(priority => (
                  <option key={priority} value={priority}>{priority}</option>
                ))}
              </select>
            </div>

            {/* Status Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Production Status</label>
              <select 
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="w-full bg-white p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Status</option>
                {statuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            {/* Sample Type Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Sample Type</label>
              <select 
                value={sampleTypeFilter}
                onChange={(e) => setSampleTypeFilter(e.target.value)}
                className="w-full bg-white p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="all">All Sample Types</option>
                {sampleTypes.map(type => (
                  <option key={type} value={type}>{type}</option>
                ))}
              </select>
            </div>

            {/* Inquiry Status Filter */}
            <div className="mb-4">
              <label className="block text-sm font-medium text-gray-300 mb-2">Inquiry Status</label>
              <select 
                value={inquiryStatusFilter}
                onChange={(e) => setInquiryStatusFilter(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white"
              >
                <option value="all">All Inquiry Status</option>
                {inquiryStatuses.map(status => (
                  <option key={status} value={status}>{status}</option>
                ))}
              </select>
            </div>

            <button 
              onClick={() => {
                setPriorityFilter('all');
                setStatusFilter('all');
                setSampleTypeFilter('all');
                setInquiryStatusFilter('all');
                setSearchTerm('');
              }}
              className="bg-white w-full px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-400 transition-colors text-sm font-medium"
            >
              Clear All Filters
            </button>
          </div>

          {/* Charts */}
          <StatusOverview data={samples} />
          <PriorityDistribution data={samples} />
        </div>

        {/* Main Content Area */}
        <div className="xl:col-span-3 space-y-6">
          {/* Search and Actions */}
          <div className="bg-black rounded-xl shadow-sm border p-6">
            <div className="flex flex-col lg:flex-row gap-4">
              <div className="flex-1">
                <input
                  type="text"
                  placeholder="Search by Inquiry, Brand, SRDE, Description..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              <div className="flex gap-3">
                <button className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium">
                  New Sample Request
                </button>
                <button className="px-6 bg-white py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                  Export Report
                </button>
              </div>
            </div>
          </div>

          {/* Timeline Tracker */}
          <TimelineTracker data={samples} />

          {/* Samples Grid */}
          <div className="bg-black rounded-xl shadow-sm border">
            <div className="p-6 border-b">
              <div className="flex justify-between items-center">
                <div>
                  <h3 className="text-xl font-semibold text-white">Sample Requests</h3>
                  <p className="text-gray-300 mt-1">
                    Showing {filteredSamples.length} of {samples.length} samples
                  </p>
                </div>
                <div className="flex gap-2">
                  <span className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm font-medium">
                    Approved: {stats.inquiryStatusCounts.approved}
                  </span>
                  <span className="px-3 py-1 bg-red-100 text-red-800 rounded-full text-sm font-medium">
                    Rejected: {stats.inquiryStatusCounts.rejected}
                  </span>
                </div>
              </div>
            </div>
            <div className="p-6 space-y-4">
              {filteredSamples.map(sample => (
                <div key={sample.id}>
                  <SampleCard
                    sample={sample}
                    isSelected={selectedSample?.id === sample.id}
                    onSelect={() => setSelectedSample(selectedSample?.id === sample.id ? null : sample)}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Sample Modal */}
      {selectedSample && (
        <DetailedSampleView 
          sample={selectedSample}
          onClose={() => setSelectedSample(null)}
        />
      )}
    </div>
  );
}