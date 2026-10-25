import React, { useState } from 'react';
import { SAMPLE_JOBS, JobItem } from '../data/projectData';
import { 
  Radio, 
  Search, 
  Clock, 
  CheckCircle2, 
  Layers, 
  Filter, 
  Sparkles, 
  ShieldCheck,
  ChevronRight,
  RefreshCw,
  Info
} from 'lucide-react';

export const TrackingSection: React.FC = () => {
  const [filterStage, setFilterStage] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedJob, setSelectedJob] = useState<JobItem | null>(SAMPLE_JOBS[0]);

  const stages = ['All', 'In Progress', 'Pending Review', 'Completed'];

  const filteredJobs = SAMPLE_JOBS.filter(job => {
    const matchesStage = filterStage === 'All' || job.status === filterStage;
    const matchesQuery = job.jobId.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.enclosureType.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.stage.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStage && matchesQuery;
  });

  return (
    <div className="space-y-6">
      {/* Top Banner Status Notice */}
      <div className="bg-slate-50 border-l-4 border-slate-400 p-4 rounded-r-lg flex items-start justify-between">
        <div className="flex items-start gap-3">
          <Info className="w-5 h-5 text-slate-500 mt-0.5 shrink-0" />
          <div>
            <h4 className="text-sm font-semibold text-slate-800">Job Tracking & Work Order Progress</h4>
            <p className="text-xs text-slate-600 mt-0.5">
              Production queue monitoring active enclosure work orders across the 14 manufacturing workstations. Station cycle times and progression stages reflect configured traveler routes.
            </p>
          </div>
        </div>
        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium bg-slate-100 text-slate-700 border border-slate-200">
          <span className="w-1.5 h-1.5 rounded-full bg-blue-500"></span>
          Work Order Queue
        </span>
      </div>

      {/* Production Metrics Overview */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Active Enclosures</span>
            <span className="p-1.5 bg-blue-50 text-blue-600 rounded">
              <Layers className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">5</span>
            <span className="text-xs text-emerald-600 font-medium">In Queue</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Across 14 discrete stations</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Metrology Inspection</span>
            <span className="p-1.5 bg-indigo-50 text-indigo-600 rounded">
              <Sparkles className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">1</span>
            <span className="text-xs text-indigo-600 font-medium">Gate 6 Review</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">Tolerance window ±0.5 mm</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">Edge Station Nodes</span>
            <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded">
              <Radio className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">14 / 14</span>
            <span className="text-xs text-emerald-600 font-medium">Nodes Ready</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">MQTT Broker topic subscription active</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-medium text-slate-500 uppercase tracking-wider">QA Verification Rate</span>
            <span className="p-1.5 bg-emerald-50 text-emerald-600 rounded">
              <ShieldCheck className="w-4 h-4" />
            </span>
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">100%</span>
            <span className="text-xs text-emerald-600 font-medium">Batch Yield</span>
          </div>
          <p className="text-xs text-slate-400 mt-1">0 fatal deviations reported</p>
        </div>
      </div>

      {/* Main Tracking Workstation */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Job Queue & Table */}
        <div className="lg:col-span-2 bg-white rounded-lg border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Shop-Floor Active Fabrication Queue</h3>
              <p className="text-xs text-slate-500">Track progress, work station stages, and operator assignments</p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter jobs..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-hidden focus:ring-1 focus:ring-blue-500 w-44"
                />
              </div>
              <button 
                onClick={() => { setSearchQuery(''); setFilterStage('All'); }}
                title="Reset filters" 
                className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md border border-slate-200"
              >
                <RefreshCw className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs">
            <Filter className="w-3.5 h-3.5 text-slate-400 mr-1" />
            {stages.map(stg => (
              <button
                key={stg}
                onClick={() => setFilterStage(stg)}
                className={`px-2.5 py-1 rounded-full font-medium transition-colors ${
                  filterStage === stg 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
                }`}
              >
                {stg}
              </button>
            ))}
          </div>

          {/* Jobs Table */}
          <div className="overflow-x-auto border border-slate-100 rounded-md">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-2.5 px-3">Job ID</th>
                  <th className="py-2.5 px-3">Enclosure Spec</th>
                  <th className="py-2.5 px-3">Current Process</th>
                  <th className="py-2.5 px-3">Progress</th>
                  <th className="py-2.5 px-3">Status</th>
                  <th className="py-2.5 px-3">Operator</th>
                  <th className="py-2.5 px-3 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredJobs.map((job) => {
                  const isSelected = selectedJob?.jobId === job.jobId;
                  return (
                    <tr 
                      key={job.jobId}
                      onClick={() => setSelectedJob(job)}
                      className={`cursor-pointer transition-colors ${
                        isSelected ? 'bg-blue-50/70' : 'hover:bg-slate-50'
                      }`}
                    >
                      <td className="py-3 px-3 font-mono font-medium text-blue-700">
                        {job.jobId}
                      </td>
                      <td className="py-3 px-3">
                        <div className="font-medium text-slate-800">{job.enclosureType}</div>
                        <div className="text-[11px] text-slate-400">{job.dimensions}</div>
                      </td>
                      <td className="py-3 px-3">
                        <span className="font-medium text-slate-700">{job.stage}</span>
                        <div className="text-[10px] text-slate-400">{job.workCenter}</div>
                      </td>
                      <td className="py-3 px-3 min-w-[120px]">
                        <div className="flex items-center justify-between text-[11px] mb-1">
                          <span className="text-slate-600 font-medium">{job.progressPercent}%</span>
                        </div>
                        <div className="w-full bg-slate-200 rounded-full h-1.5 overflow-hidden">
                          <div 
                            className={`h-full rounded-full ${
                              job.progressPercent === 100 ? 'bg-emerald-500' : 'bg-blue-600'
                            }`}
                            style={{ width: `${job.progressPercent}%` }}
                          />
                        </div>
                      </td>
                      <td className="py-3 px-3">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium ${
                          job.status === 'Completed' 
                            ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' 
                            : job.status === 'Pending Review'
                            ? 'bg-indigo-50 text-indigo-700 border border-indigo-200'
                            : 'bg-blue-50 text-blue-700 border border-blue-200'
                        }`}>
                          {job.status}
                        </span>
                      </td>
                      <td className="py-3 px-3 text-slate-600">
                        {job.operator}
                      </td>
                      <td className="py-3 px-3 text-right">
                        <span className="text-blue-600 inline-flex items-center text-[11px] font-medium hover:underline">
                          Inspect <ChevronRight className="w-3 h-3 ml-0.5" />
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Detailed Job Telemetry Card */}
        {selectedJob && (
          <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Station Inspector</span>
                  <h4 className="text-base font-bold text-slate-900">{selectedJob.jobId}</h4>
                  <p className="text-xs text-slate-500">{selectedJob.enclosureType}</p>
                </div>
                <span className="px-2 py-1 text-xs font-semibold rounded bg-blue-50 text-blue-700 border border-blue-100">
                  {selectedJob.status}
                </span>
              </div>

              {/* Progress Bar Detail */}
              <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-100">
                <div className="flex justify-between text-xs text-slate-600 font-medium mb-1">
                  <span>Manufacturing Completion</span>
                  <span>{selectedJob.progressPercent}%</span>
                </div>
                <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
                  <div 
                    className="bg-blue-600 h-2 rounded-full transition-all duration-300" 
                    style={{ width: `${selectedJob.progressPercent}%` }} 
                  />
                </div>
                <div className="mt-2 text-[11px] text-slate-500 flex items-center justify-between">
                  <span>Center: <strong>{selectedJob.workCenter}</strong></span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3 h-3 text-slate-400" />
                    Updated: {selectedJob.lastUpdated}
                  </span>
                </div>
              </div>

              {/* Station Parameters */}
              <div className="mt-4 space-y-3">
                <h5 className="text-xs font-semibold text-slate-800 uppercase tracking-wider">Station Telemetry Check</h5>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">Assigned Operator</span>
                    <span className="font-medium text-slate-800">{selectedJob.operator}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">Active Workstation</span>
                    <span className="font-medium text-slate-800">{selectedJob.stage}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">Enclosure Dimensions</span>
                    <span className="font-mono text-slate-800">{selectedJob.dimensions}</span>
                  </div>
                  <div className="p-2.5 bg-slate-50 rounded border border-slate-100">
                    <span className="text-slate-400 block text-[10px]">Sub-Assembly Status</span>
                    <span className="font-medium text-emerald-700 flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3 text-emerald-500" /> PASS
                    </span>
                  </div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 text-xs text-slate-700 space-y-1">
                  <div className="font-semibold flex items-center gap-1.5 text-slate-800">
                    <Radio className="w-3.5 h-3.5 text-blue-600" />
                    Station Event Route
                  </div>
                  <p className="text-[11px] text-slate-600">
                    MQTT topic contract: <code className="font-mono bg-white px-1 py-0.5 rounded border border-slate-200 text-blue-700">aiot/{selectedJob.workCenter.toLowerCase()}/telemetry</code>
                  </p>
                  <p className="text-[11px] text-slate-500">
                    Workstation traveler scan registered. Benchmark cycle time: 14.2 min.
                  </p>
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-400">
              <span>Workstation Interface</span>
              <span className="text-slate-600 font-mono font-medium">{selectedJob.workCenter}</span>
            </div>
          </div>
        )}
      </div>

      {/* 14-Process Shop-Floor Line Diagram */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Line Layout: 14 Sequential Physical & Digital Stations</h4>
            <p className="text-xs text-slate-500">Visual state of active enclosures across the entire 14-process smart fabrication pipeline</p>
          </div>
          <span className="text-xs text-slate-400">ISO 9001 / Engineering Standard</span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2 pt-2">
          {Array.from({ length: 14 }).map((_, idx) => {
            const processNum = idx + 1;
            const isP09 = processNum === 9;
            const isP07 = processNum === 7;
            const isP14 = processNum === 14;
            const isP04 = processNum === 4;

            const hasActiveJob = isP09 || isP07 || isP14 || isP04;
            const activeId = isP09 ? 'JOB-42' : isP07 ? 'JOB-43' : isP14 ? 'JOB-41' : isP04 ? 'JOB-44' : null;

            return (
              <div 
                key={processNum}
                className={`p-2.5 rounded-lg border text-center transition-all ${
                  hasActiveJob 
                    ? 'bg-blue-50 border-blue-300 ring-1 ring-blue-400 shadow-xs' 
                    : 'bg-slate-50 border-slate-200'
                }`}
              >
                <div className="flex items-center justify-between text-[10px] text-slate-400 font-mono mb-1">
                  <span>P{processNum < 10 ? `0${processNum}` : processNum}</span>
                  {hasActiveJob && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-ping"></span>
                  )}
                </div>
                <div className="text-xs font-semibold text-slate-800 truncate">
                  {processNum <= 5 ? 'Digital CAD' : processNum <= 11 ? 'Fabrication' : 'Metrology QA'}
                </div>
                <div className="text-[10px] text-slate-500 mt-1">
                  {hasActiveJob ? (
                    <span className="font-semibold text-blue-700">{activeId}</span>
                  ) : (
                    'Idle'
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
