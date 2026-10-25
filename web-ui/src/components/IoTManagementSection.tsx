import React, { useState } from 'react';
import { 
  Cpu, 
  Radio, 
  Search, 
  Filter, 
  RefreshCw, 
  CheckCircle2, 
  AlertTriangle, 
  XCircle, 
  HelpCircle, 
  Server, 
  Network, 
  Sliders, 
  Layers, 
  ChevronRight, 
  Info,
  Clock,
  ArrowRight
} from 'lucide-react';
import { IoTDevice, INITIAL_IOT_DEVICES, DeviceCategory, ConnectionStatus, OperationalStatus } from '../data/iotDeviceData';

export const IoTManagementSection: React.FC = () => {
  const [devices, setDevices] = useState<IoTDevice[]>(INITIAL_IOT_DEVICES);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [categoryFilter, setCategoryFilter] = useState<string>('All');
  const [connectionFilter, setConnectionFilter] = useState<string>('All');
  const [operationalFilter, setOperationalFilter] = useState<string>('All');
  const [selectedDevice, setSelectedDevice] = useState<IoTDevice | null>(INITIAL_IOT_DEVICES[0]);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);

  // Derived counts from the shared data model
  const totalCount = devices.length;
  const connectedCount = devices.filter(d => d.connectionStatus === 'Connected').length;
  const disconnectedCount = devices.filter(d => d.connectionStatus === 'Disconnected').length;
  const unknownCount = devices.filter(d => d.connectionStatus === 'Status Unknown').length;
  const attentionCount = devices.filter(d => d.operationalStatus === 'Warning' || d.operationalStatus === 'Fault').length;

  const categories = ['All', 'Machine', 'Edge Gateway', 'Optical Metrology', 'Sensor', 'Barcode / RFID', 'Communication Service', 'Analytics Service'];
  const connectionStatuses = ['All', 'Connected', 'Disconnected', 'Status Unknown'];
  const operationalStatuses = ['All', 'Awaiting Configuration', 'Running', 'Idle', 'Warning', 'Fault', 'Status Unavailable'];

  const filteredDevices = devices.filter(dev => {
    const matchesSearch = dev.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dev.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dev.workstation.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          dev.protocol.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = categoryFilter === 'All' || dev.category === categoryFilter;
    const matchesConnection = connectionFilter === 'All' || dev.connectionStatus === connectionFilter;
    const matchesOperational = operationalFilter === 'All' || dev.operationalStatus === operationalFilter;

    return matchesSearch && matchesCategory && matchesConnection && matchesOperational;
  });

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
    }, 600);
  };

  const handleClearFilters = () => {
    setSearchQuery('');
    setCategoryFilter('All');
    setConnectionFilter('All');
    setOperationalFilter('All');
  };

  return (
    <div className="space-y-6">
      {/* Top Banner & Status Transparency Notice */}
      <div className="bg-white p-5 rounded-lg border border-slate-200 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 mb-1">
            <Cpu className="w-4 h-4" />
            <span>Industrial Equipment & IoT Management</span>
          </div>
          <h2 className="text-xl font-bold text-slate-900">Edge Gateway, Machine & Sensor Registry</h2>
          <p className="text-xs text-slate-500 max-w-2xl mt-0.5">
            Operational registry tracking physical machinery, optical metrology cameras, barcode nodes, 
            and MQTT communication brokers across the 14 manufacturing workstations.
          </p>
        </div>

        <div className="flex items-center gap-2 self-start md:self-auto">
          <button
            onClick={handleRefresh}
            className="px-3 py-1.5 bg-slate-100 hover:bg-slate-200 text-slate-700 rounded-md text-xs font-semibold flex items-center gap-1.5 transition-colors border border-slate-200"
          >
            <RefreshCw size={13} className={isRefreshing ? 'animate-spin text-blue-600' : ''} />
            <span>Refresh Device States</span>
          </button>
        </div>
      </div>

      {/* Honest Integration Notice */}
      <div className="bg-slate-50 border-l-4 border-slate-400 p-4 rounded-r-lg flex items-start gap-3 text-xs text-slate-600">
        <Info size={18} className="text-slate-500 mt-0.5 shrink-0" />
        <div>
          <span className="font-bold text-slate-800">Integration Boundary Status:</span> Registered devices reflect the configured equipment and planned edge architecture. Physical shop-floor hardware is currently <strong>Not Connected</strong> to this interface, with all operational states accurately set to <em>Awaiting Configuration</em> or <em>Status Unknown</em>.
        </div>
      </div>

      {/* 4 Metric Cards derived from shared device model */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium uppercase tracking-wider">
            <span>Total Registered</span>
            <Server size={16} className="text-blue-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{totalCount}</span>
            <span className="text-xs text-slate-500 font-medium">Configured Units</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Across 14 discrete stations</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium uppercase tracking-wider">
            <span>Connected Devices</span>
            <CheckCircle2 size={16} className="text-emerald-600" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{connectedCount}</span>
            <span className="text-xs text-slate-400 font-medium">Active Links</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Requires edge broker handshake</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium uppercase tracking-wider">
            <span>Status Unknown / Disconnected</span>
            <HelpCircle size={16} className="text-slate-400" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-700">{unknownCount + disconnectedCount}</span>
            <span className="text-xs text-slate-500 font-medium">Awaiting Link</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">No physical telemetry feed</p>
        </div>

        <div className="bg-white p-4 rounded-lg border border-slate-200 shadow-xs">
          <div className="flex items-center justify-between text-xs text-slate-500 font-medium uppercase tracking-wider">
            <span>Attention Required</span>
            <AlertTriangle size={16} className="text-amber-500" />
          </div>
          <div className="mt-2 flex items-baseline gap-2">
            <span className="text-2xl font-bold text-slate-900">{attentionCount}</span>
            <span className="text-xs text-emerald-600 font-medium">0 Fatal Faults</span>
          </div>
          <p className="text-[11px] text-slate-400 mt-1">Ready for commissioning</p>
        </div>
      </div>

      {/* Main Workspace: Table on Left (8 Cols), Detail Panel on Right (4 Cols) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Device Directory Table */}
        <div className="lg:col-span-8 bg-white rounded-lg border border-slate-200 shadow-xs p-5 space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-3 border-b border-slate-100">
            <div>
              <h3 className="text-base font-semibold text-slate-900">Equipment & IoT Component Status Table</h3>
              <p className="text-xs text-slate-500">Search and filter registered machines, edge microcontrollers, and metrology cameras</p>
            </div>
            
            <div className="flex items-center gap-2">
              <div className="relative">
                <Search size={14} className="text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
                <input
                  type="text"
                  placeholder="Filter by ID, name, protocol..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-8 pr-3 py-1.5 text-xs bg-slate-50 border border-slate-200 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500 w-52"
                />
              </div>
              <button 
                onClick={handleClearFilters}
                title="Clear all filters" 
                className="p-1.5 text-slate-500 hover:text-slate-800 hover:bg-slate-100 rounded-md border border-slate-200 text-xs"
              >
                Clear
              </button>
            </div>
          </div>

          {/* Filter Bar */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 text-xs">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Category</label>
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
                className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700"
              >
                {categories.map(cat => <option key={cat} value={cat}>{cat}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Connection State</label>
              <select
                value={connectionFilter}
                onChange={(e) => setConnectionFilter(e.target.value)}
                className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700"
              >
                {connectionStatuses.map(st => <option key={st} value={st}>{st}</option>)}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-wider mb-1">Operational State</label>
              <select
                value={operationalFilter}
                onChange={(e) => setOperationalFilter(e.target.value)}
                className="w-full px-2 py-1.5 bg-slate-50 border border-slate-200 rounded-md text-xs text-slate-700"
              >
                {operationalStatuses.map(op => <option key={op} value={op}>{op}</option>)}
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto border border-slate-100 rounded-md">
            <table className="w-full text-left text-xs">
              <thead className="bg-slate-50 text-slate-500 font-semibold border-b border-slate-100">
                <tr>
                  <th className="py-2.5 px-3">Device ID</th>
                  <th className="py-2.5 px-3">Equipment / Component</th>
                  <th className="py-2.5 px-3">Category</th>
                  <th className="py-2.5 px-3">Connection</th>
                  <th className="py-2.5 px-3">Operational State</th>
                  <th className="py-2.5 px-3">Station</th>
                  <th className="py-2.5 px-3 text-right">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 font-mono">
                {filteredDevices.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="py-6 text-center text-slate-400 font-sans">
                      No registered devices match the selected filters.
                    </td>
                  </tr>
                ) : (
                  filteredDevices.map((dev) => {
                    const isSelected = selectedDevice?.id === dev.id;
                    return (
                      <tr
                        key={dev.id}
                        onClick={() => setSelectedDevice(dev)}
                        className={`cursor-pointer transition-colors font-sans ${
                          isSelected ? 'bg-blue-50/70' : 'hover:bg-slate-50'
                        }`}
                      >
                        <td className="py-2.5 px-3 font-mono font-medium text-blue-700">{dev.id}</td>
                        <td className="py-2.5 px-3">
                          <div className="font-semibold text-slate-900">{dev.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">{dev.protocol}</div>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="text-[11px] text-slate-600 bg-slate-100 px-2 py-0.5 rounded">
                            {dev.category}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="inline-flex items-center gap-1.5 text-[11px] text-slate-600">
                            <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                            {dev.connectionStatus}
                          </span>
                        </td>
                        <td className="py-2.5 px-3">
                          <span className="inline-flex px-2 py-0.5 rounded text-[10px] font-semibold bg-slate-100 text-slate-700 border border-slate-200">
                            {dev.operationalStatus}
                          </span>
                        </td>
                        <td className="py-2.5 px-3 text-[11px] font-mono text-slate-500">
                          {dev.workstation}
                        </td>
                        <td className="py-2.5 px-3 text-right">
                          <span className="text-blue-600 font-medium inline-flex items-center text-[11px] hover:underline">
                            Inspect <ChevronRight size={12} />
                          </span>
                        </td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </div>

        {/* Right Column: Device Detail Panel */}
        {selectedDevice && (
          <div className="lg:col-span-4 bg-white rounded-lg border border-slate-200 shadow-xs p-5 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-start justify-between border-b border-slate-100 pb-3">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400">Device Specification</span>
                  <h4 className="text-base font-bold text-slate-900 mt-0.5">{selectedDevice.name}</h4>
                  <div className="text-xs font-mono text-blue-700">{selectedDevice.id}</div>
                </div>
                <span className="px-2 py-0.5 text-[10px] font-semibold rounded bg-slate-100 text-slate-700 border border-slate-200">
                  {selectedDevice.source}
                </span>
              </div>

              {/* Status Box */}
              <div className="mt-4 p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-slate-500">Connection State:</span>
                  <span className="font-semibold text-slate-700 flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-slate-400"></span>
                    {selectedDevice.connectionStatus}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Operational Mode:</span>
                  <span className="font-semibold text-slate-800">{selectedDevice.operationalStatus}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Interface Protocol:</span>
                  <span className="font-mono text-slate-800">{selectedDevice.protocol}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">Related Process:</span>
                  <span className="font-semibold text-blue-700">{selectedDevice.relatedProcess}</span>
                </div>
              </div>

              {/* Description */}
              <div className="mt-3 text-xs text-slate-600 bg-white p-3 rounded border border-slate-100 leading-relaxed">
                {selectedDevice.description}
              </div>

              {/* Configured Telemetry Fields */}
              <div className="mt-4 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Configured Telemetry Fields
                </span>
                <div className="space-y-1.5">
                  {selectedDevice.telemetryFields.map((field, idx) => (
                    <div key={idx} className="flex items-center justify-between p-2 bg-slate-50 rounded border border-slate-100 text-xs">
                      <span className="text-slate-700">{field.name} ({field.unit})</span>
                      <span className="font-mono text-slate-400 text-[11px]">{field.currentReading}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Events & Configuration History */}
              <div className="mt-4 space-y-2">
                <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                  Configuration Log
                </span>
                <div className="space-y-1.5">
                  {selectedDevice.recentEvents.map((evt, idx) => (
                    <div key={idx} className="p-2 bg-slate-50 rounded border border-slate-100 text-[11px] space-y-0.5">
                      <div className="flex items-center justify-between text-slate-400 font-mono text-[10px]">
                        <span>Timestamp: {evt.timestamp}</span>
                        <span className="text-blue-700 font-semibold">{evt.level}</span>
                      </div>
                      <div className="text-slate-700">{evt.message}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-[11px] text-slate-400 font-mono">
              <span>Workstation: {selectedDevice.workstation}</span>
              <span>Boundary: Frontend Ready</span>
            </div>
          </div>
        )}
      </div>

      {/* IoT Architecture & Data Flow Reference Panel */}
      <div className="bg-white rounded-lg border border-slate-200 shadow-xs p-5 space-y-3">
        <div className="flex items-center justify-between border-b border-slate-100 pb-2">
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Proposed Industrial IoT Architecture & Data Flow</h4>
            <p className="text-xs text-slate-500">Documented communication boundary for shop-floor machinery and metrology services</p>
          </div>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-slate-100 text-slate-600">
            ISA-95 Architecture Reference
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-5 gap-3 pt-2 text-center text-xs">
          <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
            <span className="text-[10px] font-mono text-blue-600 font-bold block">LEVEL 1</span>
            <span className="font-bold text-slate-800 block">Equipment & Sensors</span>
            <p className="text-[10px] text-slate-500">Laser CNC, Press Brake, 5.1MP Sony Camera, DFT gauge</p>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
            <span className="text-[10px] font-mono text-blue-600 font-bold block">LEVEL 2</span>
            <span className="font-bold text-slate-800 block">Edge Gateways</span>
            <p className="text-[10px] text-slate-500">ESP32 scan nodes & Industrial Box PC Serial/Modbus bridges</p>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
            <span className="text-[10px] font-mono text-blue-600 font-bold block">LEVEL 3</span>
            <span className="font-bold text-slate-800 block">MQTT Broker</span>
            <p className="text-[10px] text-slate-500">Eclipse Mosquitto TLS 1.3 message pub/sub topic hierarchy</p>
          </div>

          <div className="p-3 bg-slate-50 rounded border border-slate-200 space-y-1">
            <span className="text-[10px] font-mono text-blue-600 font-bold block">LEVEL 4</span>
            <span className="font-bold text-slate-800 block">Application Services</span>
            <p className="text-[10px] text-slate-500">FastAPI backend & OpenCV ICP CAD alignment microservice</p>
          </div>

          <div className="p-3 bg-blue-50/70 rounded border border-blue-200 space-y-1">
            <span className="text-[10px] font-mono text-blue-700 font-bold block">LEVEL 5</span>
            <span className="font-bold text-blue-900 block">SheetFab AIoT UI</span>
            <p className="text-[10px] text-blue-800">Operator monitoring, job tracking, and quality release dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
};
