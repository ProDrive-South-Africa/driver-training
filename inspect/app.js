// Vehicle Inspection Management System Application Data
const vehicleInspectionData = {
  "fleetVehicles": [
    {"id": "VH001", "type": "Panel Van", "make": "Ford", "model": "Transit", "year": 2022, "mileage": 45230, "status": "Available"},
    {"id": "VH002", "type": "Box Truck", "make": "Mercedes", "model": "Sprinter", "year": 2021, "mileage": 67890, "status": "Available"},
    {"id": "VH003", "type": "Pickup Truck", "make": "Toyota", "model": "Hilux", "year": 2023, "mileage": 12450, "status": "In Service"},
    {"id": "VH004", "type": "Van", "make": "Volkswagen", "model": "Crafter", "year": 2020, "mileage": 89340, "status": "Maintenance Required"},
    {"id": "VH005", "type": "HGV", "make": "Volvo", "model": "FH16", "year": 2019, "mileage": 234567, "status": "Available"}
  ],
  "inspectionSections": {
    "preTrip": {
      "vehicleInfo": [
        {"name": "vehicleId", "type": "select", "label": "Vehicle ID", "required": true, "options": ["VH001", "VH002", "VH003", "VH004", "VH005"]},
        {"name": "odometerReading", "type": "number", "label": "Odometer Reading (km)", "required": true},
        {"name": "fuelLevel", "type": "select", "label": "Fuel Level", "required": true, "options": ["Full", "3/4", "1/2", "1/4", "Low"]},
        {"name": "inspectorName", "type": "text", "label": "Inspector Name", "required": true},
        {"name": "inspectionDate", "type": "datetime-local", "label": "Inspection Date & Time", "required": true}
      ],
      "exteriorWalkAround": [
        {"name": "bodyCondition", "type": "select", "label": "Body Condition", "required": true, "options": ["Excellent", "Good", "Fair", "Poor"]},
        {"name": "tireCondition", "type": "select", "label": "Tire Condition (All)", "required": true, "options": ["Excellent", "Good", "Fair", "Poor"]},
        {"name": "tirePressure", "type": "radio", "label": "Tire Pressure Adequate?", "required": true, "options": ["Yes", "No"]},
        {"name": "wheelFixings", "type": "radio", "label": "Wheel Fixings Secure?", "required": true, "options": ["Yes", "No"]},
        {"name": "lightsOperation", "type": "radio", "label": "All Lights Working?", "required": true, "options": ["Yes", "No"]},
        {"name": "mirrorCondition", "type": "select", "label": "Mirror Condition", "required": true, "options": ["Excellent", "Good", "Fair", "Poor"]},
        {"name": "windshieldCondition", "type": "select", "label": "Windshield Condition", "required": true, "options": ["Excellent", "Good", "Fair", "Poor"]},
        {"name": "fluidLeaks", "type": "radio", "label": "Any Fluid Leaks?", "required": true, "options": ["Yes", "No"]},
        {"name": "exteriorPhotos", "type": "file", "label": "Exterior Photos", "multiple": true}
      ],
      "engineCompartment": [
        {"name": "engineOil", "type": "select", "label": "Engine Oil Level", "required": true, "options": ["Good", "Low", "Empty"]},
        {"name": "coolantLevel", "type": "select", "label": "Coolant Level", "required": true, "options": ["Good", "Low", "Empty"]},
        {"name": "brakeFluid", "type": "select", "label": "Brake Fluid Level", "required": true, "options": ["Good", "Low", "Empty"]},
        {"name": "batteryCondition", "type": "select", "label": "Battery Condition", "required": true, "options": ["Good", "Fair", "Poor"]},
        {"name": "beltsHoses", "type": "select", "label": "Belts & Hoses Condition", "required": true, "options": ["Good", "Fair", "Poor"]},
        {"name": "engineLeaks", "type": "radio", "label": "Any Engine Leaks?", "required": true, "options": ["Yes", "No"]},
        {"name": "enginePhotos", "type": "file", "label": "Engine Bay Photos", "multiple": true}
      ],
      "interiorControls": [
        {"name": "seatCondition", "type": "select", "label": "Seat Condition", "required": true, "options": ["Good", "Fair", "Poor"]},
        {"name": "seatbeltOperation", "type": "radio", "label": "Seatbelt Working?", "required": true, "options": ["Yes", "No"]},
        {"name": "dashboardLights", "type": "radio", "label": "Dashboard Lights Normal?", "required": true, "options": ["Yes", "No"]},
        {"name": "hornOperation", "type": "radio", "label": "Horn Working?", "required": true, "options": ["Yes", "No"]},
        {"name": "wipersOperation", "type": "radio", "label": "Wipers Working?", "required": true, "options": ["Yes", "No"]},
        {"name": "steeringCondition", "type": "select", "label": "Steering Response", "required": true, "options": ["Good", "Fair", "Poor"]},
        {"name": "brakeResponse", "type": "select", "label": "Brake Pedal Response", "required": true, "options": ["Good", "Fair", "Poor"]}
      ],
      "safetyEquipment": [
        {"name": "fireExtinguisher", "type": "radio", "label": "Fire Extinguisher Present?", "required": true, "options": ["Yes", "No"]},
        {"name": "reflectiveTriangles", "type": "radio", "label": "3 Reflective Triangles Present?", "required": true, "options": ["Yes", "No"]},
        {"name": "firstAidKit", "type": "radio", "label": "First Aid Kit Present?", "required": true, "options": ["Yes", "No"]},
        {"name": "spareTire", "type": "radio", "label": "Spare Tire Good Condition?", "required": true, "options": ["Yes", "No", "N/A"]},
        {"name": "jackTools", "type": "radio", "label": "Jack & Tools Present?", "required": true, "options": ["Yes", "No", "N/A"]},
        {"name": "documentation", "type": "radio", "label": "All Documents Present?", "required": true, "options": ["Yes", "No"]}
      ]
    },
    "tripMonitoring": {
      "journeyInfo": [
        {"name": "startTime", "type": "datetime-local", "label": "Journey Start Time", "required": true},
        {"name": "startLocation", "type": "text", "label": "Start Location", "required": true},
        {"name": "destination", "type": "text", "label": "Destination", "required": true},
        {"name": "plannedRoute", "type": "text", "label": "Planned Route", "required": false},
        {"name": "estimatedArrival", "type": "time", "label": "Estimated Arrival Time", "required": true}
      ],
      "safetyMonitoring": [
        {"name": "speedingIncidents", "type": "number", "label": "Speeding Incidents", "required": false},
        {"name": "harshBraking", "type": "number", "label": "Harsh Braking Events", "required": false},
        {"name": "sharpTurns", "type": "number", "label": "Sharp Turning Events", "required": false},
        {"name": "rapidAcceleration", "type": "number", "label": "Rapid Acceleration Events", "required": false},
        {"name": "idleTime", "type": "number", "label": "Idle Time (minutes)", "required": false}
      ],
      "periodicChecks": [
        {"name": "checkTime", "type": "time", "label": "Check Time", "required": true},
        {"name": "driverCondition", "type": "select", "label": "Driver Condition", "required": true, "options": ["Alert", "Slightly Tired", "Tired", "Very Tired"]},
        {"name": "vehicleTemperature", "type": "select", "label": "Temperature Gauges", "required": true, "options": ["Normal", "High", "Overheating"]},
        {"name": "fuelRemaining", "type": "select", "label": "Fuel Level", "required": true, "options": ["Full", "3/4", "1/2", "1/4", "Low"]},
        {"name": "loadCondition", "type": "select", "label": "Load Security", "required": true, "options": ["Secure", "Shifted", "Damaged"]},
        {"name": "routeCompliance", "type": "radio", "label": "Following Planned Route?", "required": true, "options": ["Yes", "No"]}
      ]
    },
    "postTrip": {
      "journeySummary": [
        {"name": "endTime", "type": "datetime-local", "label": "Journey End Time", "required": true},
        {"name": "endLocation", "type": "text", "label": "End Location", "required": true},
        {"name": "totalDistance", "type": "number", "label": "Total Distance (km)", "required": true},
        {"name": "fuelConsumed", "type": "number", "label": "Fuel Consumed (L)", "required": false},
        {"name": "totalDrivingTime", "type": "number", "label": "Total Driving Time (hours)", "required": true}
      ],
      "vehicleCondition": [
        {"name": "exteriorDamage", "type": "radio", "label": "New Exterior Damage?", "required": true, "options": ["Yes", "No"]},
        {"name": "tireWear", "type": "select", "label": "Tire Wear Assessment", "required": true, "options": ["Good", "Fair", "Poor"]},
        {"name": "fluidLevels", "type": "select", "label": "Fluid Levels", "required": true, "options": ["Good", "Low", "Critical"]},
        {"name": "enginePerformance", "type": "select", "label": "Engine Performance", "required": true, "options": ["Excellent", "Good", "Fair", "Poor"]},
        {"name": "brakeCondition", "type": "select", "label": "Brake System", "required": true, "options": ["Good", "Fair", "Poor"]},
        {"name": "newDefects", "type": "textarea", "label": "New Defects/Issues", "required": false}
      ],
      "maintenanceRequirements": [
        {"name": "immediateRepairs", "type": "textarea", "label": "Immediate Repair Needs", "required": false},
        {"name": "scheduledMaintenance", "type": "radio", "label": "Scheduled Maintenance Due?", "required": true, "options": ["Yes", "No"]},
        {"name": "partsReplacement", "type": "textarea", "label": "Parts Replacement Needed", "required": false},
        {"name": "vehicleAvailable", "type": "radio", "label": "Vehicle Available for Next Use?", "required": true, "options": ["Yes", "No"]}
      ]
    }
  },
  "sampleInspections": [
    {
      "id": "INS-PT-001",
      "type": "Pre-Trip",
      "vehicleId": "VH001",
      "inspector": "John Smith",
      "date": "2025-08-21T06:30:00",
      "status": "completed",
      "issues": 0,
      "priority": "none"
    },
    {
      "id": "INS-TM-001", 
      "type": "Trip Monitoring",
      "vehicleId": "VH001",
      "inspector": "John Smith", 
      "date": "2025-08-21T09:15:00",
      "status": "active",
      "issues": 1,
      "priority": "low"
    },
    {
      "id": "INS-PT-002",
      "type": "Post-Trip",
      "vehicleId": "VH002",
      "inspector": "Sarah Johnson",
      "date": "2025-08-20T17:45:00", 
      "status": "completed",
      "issues": 2,
      "priority": "medium"
    },
    {
      "id": "INS-PT-003",
      "type": "Pre-Trip", 
      "vehicleId": "VH003",
      "inspector": "Mike Wilson",
      "date": "2025-08-21T05:00:00",
      "status": "completed", 
      "issues": 0,
      "priority": "none"
    }
  ]
};

// Application State
let currentState = {
  driver: {
    name: '',
    licenseNumber: '',
    employeeId: ''
  },
  selectedVehicle: null,
  currentInspection: {
    type: null,
    data: {},
    currentSection: 0,
    sections: [],
    issues: [],
    photos: {},
    startTime: null,
    completedSections: new Set()
  }
};

// Initialize Application
document.addEventListener('DOMContentLoaded', function() {
  console.log('Application starting...');
  updateDateTime();
  setInterval(updateDateTime, 1000);
  populateVehicleDropdown();
  renderRecentInspections();
  setupEventListeners();
  setDefaultDateTime();
  console.log('Application initialized successfully');
});

// Update Date and Time
function updateDateTime() {
  const now = new Date();
  const dateOptions = { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  };
  const timeOptions = { 
    hour: '2-digit', 
    minute: '2-digit',
    second: '2-digit',
    hour12: false
  };
  
  const currentDateEl = document.getElementById('currentDate');
  const currentTimeEl = document.getElementById('currentTime');
  
  if (currentDateEl) {
    currentDateEl.textContent = now.toLocaleDateString('en-GB', dateOptions);
  }
  if (currentTimeEl) {
    currentTimeEl.textContent = now.toLocaleTimeString('en-GB', timeOptions) + ' BST';
  }
}

// Set default datetime for forms
function setDefaultDateTime() {
  const now = new Date();
  const isoString = now.toISOString().slice(0, 16);
  window.defaultDateTime = isoString;
}

// Populate Vehicle Dropdown
function populateVehicleDropdown() {
  const vehicleSelect = document.getElementById('vehicleSelect');
  if (!vehicleSelect) return;
  
  vehicleSelect.innerHTML = '<option value="">Choose a vehicle</option>';
  
  vehicleInspectionData.fleetVehicles.forEach(vehicle => {
    const option = document.createElement('option');
    option.value = vehicle.id;
    option.textContent = `${vehicle.id} - ${vehicle.make} ${vehicle.model} (${vehicle.type})`;
    option.dataset.status = vehicle.status;
    vehicleSelect.appendChild(option);
  });
}

// Render Recent Inspections
function renderRecentInspections() {
  const recentList = document.getElementById('recentInspectionsList');
  if (!recentList) return;
  
  recentList.innerHTML = vehicleInspectionData.sampleInspections.map(inspection => {
    const date = new Date(inspection.date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit'
    });
    
    const vehicle = vehicleInspectionData.fleetVehicles.find(v => v.id === inspection.vehicleId);
    const vehicleName = vehicle ? `${vehicle.make} ${vehicle.model}` : 'Unknown Vehicle';
    
    return `
      <div class="inspection-item">
        <div class="inspection-item__info">
          <div class="inspection-item__title">${inspection.type} - ${inspection.vehicleId}</div>
          <div class="inspection-item__meta">
            ${inspection.inspector} • ${date} • ${vehicleName} • ${inspection.issues} issues
          </div>
        </div>
        <div class="inspection-item__status">
          <span class="status status--${inspection.status === 'completed' ? 'success' : inspection.status === 'active' ? 'info' : 'warning'}">${inspection.status}</span>
        </div>
      </div>
    `;
  }).join('');
}

// Setup Event Listeners
function setupEventListeners() {
  console.log('Setting up event listeners...');
  
  // Driver and vehicle selection
  setupDriverInfoListeners();
  
  // Inspection buttons
  setupInspectionButtonListeners();
  
  // Form navigation
  setupFormNavigationListeners();
  
  // Issues summary navigation
  setupIssuesNavigationListeners();
  
  // Report navigation
  setupReportNavigationListeners();
  
  // Photo modal
  setupPhotoModalListeners();
  
  console.log('Event listeners setup complete');
}

function setupDriverInfoListeners() {
  const driverNameEl = document.getElementById('driverName');
  const licenseNumberEl = document.getElementById('licenseNumber');
  const employeeIdEl = document.getElementById('employeeId');
  const vehicleSelectEl = document.getElementById('vehicleSelect');
  
  if (driverNameEl) {
    driverNameEl.addEventListener('input', updateDriverInfo);
    console.log('Driver name listener added');
  }
  if (licenseNumberEl) {
    licenseNumberEl.addEventListener('input', updateDriverInfo);
    console.log('License number listener added');
  }
  if (employeeIdEl) {
    employeeIdEl.addEventListener('input', updateDriverInfo);
    console.log('Employee ID listener added');
  }
  if (vehicleSelectEl) {
    vehicleSelectEl.addEventListener('change', handleVehicleSelection);
    console.log('Vehicle select listener added');
  }
}

function setupInspectionButtonListeners() {
  const startPreTripBtn = document.getElementById('startPreTripBtn');
  const startTripMonitoringBtn = document.getElementById('startTripMonitoringBtn');
  const startPostTripBtn = document.getElementById('startPostTripBtn');
  
  if (startPreTripBtn) {
    startPreTripBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Pre-trip button clicked');
      startInspection('preTrip');
    });
    console.log('Pre-trip button listener added');
  }
  
  if (startTripMonitoringBtn) {
    startTripMonitoringBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Trip monitoring button clicked');
      startInspection('tripMonitoring');
    });
    console.log('Trip monitoring button listener added');
  }
  
  if (startPostTripBtn) {
    startPostTripBtn.addEventListener('click', function(e) {
      e.preventDefault();
      console.log('Post-trip button clicked');
      startInspection('postTrip');
    });
    console.log('Post-trip button listener added');
  }
}

function setupFormNavigationListeners() {
  const backBtn = document.getElementById('backBtn');
  const nextSectionBtn = document.getElementById('nextSectionBtn');
  const submitInspectionBtn = document.getElementById('submitInspectionBtn');
  const saveProgressBtn = document.getElementById('saveProgressBtn');
  
  if (backBtn) {
    backBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showDashboard();
    });
  }
  
  if (nextSectionBtn) {
    nextSectionBtn.addEventListener('click', function(e) {
      e.preventDefault();
      nextSection();
    });
  }
  
  if (submitInspectionBtn) {
    submitInspectionBtn.addEventListener('click', function(e) {
      e.preventDefault();
      submitInspection();
    });
  }
  
  if (saveProgressBtn) {
    saveProgressBtn.addEventListener('click', function(e) {
      e.preventDefault();
      saveProgress();
    });
  }
}

function setupIssuesNavigationListeners() {
  const backToFormBtn = document.getElementById('backToFormBtn');
  const generateReportBtn = document.getElementById('generateReportBtn');
  const flagVehicleBtn = document.getElementById('flagVehicleBtn');
  
  if (backToFormBtn) {
    backToFormBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showInspectionForm();
    });
  }
  
  if (generateReportBtn) {
    generateReportBtn.addEventListener('click', function(e) {
      e.preventDefault();
      generateDVIRReport();
    });
  }
  
  if (flagVehicleBtn) {
    flagVehicleBtn.addEventListener('click', function(e) {
      e.preventDefault();
      flagVehicleOutOfService();
    });
  }
}

function setupReportNavigationListeners() {
  const backToSummaryBtn = document.getElementById('backToSummaryBtn');
  const exportPdfBtn = document.getElementById('exportPdfBtn');
  const emailReportBtn = document.getElementById('emailReportBtn');
  const newInspectionBtn = document.getElementById('newInspectionBtn');
  
  if (backToSummaryBtn) {
    backToSummaryBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showIssuesSummary();
    });
  }
  
  if (exportPdfBtn) {
    exportPdfBtn.addEventListener('click', function(e) {
      e.preventDefault();
      exportPdf();
    });
  }
  
  if (emailReportBtn) {
    emailReportBtn.addEventListener('click', function(e) {
      e.preventDefault();
      emailReport();
    });
  }
  
  if (newInspectionBtn) {
    newInspectionBtn.addEventListener('click', function(e) {
      e.preventDefault();
      showDashboard();
    });
  }
}

function setupPhotoModalListeners() {
  const closePhotoModalBtn = document.getElementById('closePhotoModal');
  const cancelPhotoBtn = document.getElementById('cancelPhotoBtn');
  const addPhotosBtn = document.getElementById('addPhotosBtn');
  const photoInput = document.getElementById('photoInput');
  const photoUploadArea = document.getElementById('photoUploadArea');
  
  if (closePhotoModalBtn) {
    closePhotoModalBtn.addEventListener('click', function(e) {
      e.preventDefault();
      closePhotoModal();
    });
  }
  
  if (cancelPhotoBtn) {
    cancelPhotoBtn.addEventListener('click', function(e) {
      e.preventDefault();
      closePhotoModal();
    });
  }
  
  if (addPhotosBtn) {
    addPhotosBtn.addEventListener('click', function(e) {
      e.preventDefault();
      addPhotos();
    });
  }
  
  if (photoInput) {
    photoInput.addEventListener('change', handlePhotoSelection);
  }
  
  if (photoUploadArea) {
    photoUploadArea.addEventListener('click', function(e) {
      e.preventDefault();
      const input = document.getElementById('photoInput');
      if (input) input.click();
    });
  }
}

// Update Driver Info
function updateDriverInfo(e) {
  const field = e.target.id;
  const value = e.target.value;
  
  console.log('Updating driver info:', field, value);
  
  if (field === 'driverName') currentState.driver.name = value;
  if (field === 'licenseNumber') currentState.driver.licenseNumber = value;
  if (field === 'employeeId') currentState.driver.employeeId = value;
  
  updateInspectionButtonStates();
}

// Handle Vehicle Selection
function handleVehicleSelection(e) {
  const vehicleId = e.target.value;
  const vehicleInfo = document.getElementById('vehicleInfo');
  const vehicleMeta = document.getElementById('vehicleMeta');
  
  console.log('Vehicle selected:', vehicleId);
  
  if (!vehicleId) {
    if (vehicleInfo) vehicleInfo.style.display = 'none';
    currentState.selectedVehicle = null;
    updateInspectionButtonStates();
    return;
  }
  
  const vehicle = vehicleInspectionData.fleetVehicles.find(v => v.id === vehicleId);
  if (vehicle && vehicleInfo && vehicleMeta) {
    currentState.selectedVehicle = vehicle;
    vehicleMeta.innerHTML = `
      <span><strong>Vehicle ID:</strong> ${vehicle.id}</span>
      <span><strong>Type:</strong> ${vehicle.type}</span>
      <span><strong>Make/Model:</strong> ${vehicle.make} ${vehicle.model}</span>
      <span><strong>Year:</strong> ${vehicle.year}</span>
      <span><strong>Mileage:</strong> ${vehicle.mileage.toLocaleString()} km</span>
      <span><strong>Status:</strong> <span class="status status--${vehicle.status === 'Available' ? 'success' : vehicle.status === 'Maintenance Required' ? 'error' : 'info'}">${vehicle.status}</span></span>
    `;
    vehicleInfo.style.display = 'block';
  }
  
  updateInspectionButtonStates();
}

// Update Inspection Button States
function updateInspectionButtonStates() {
  const hasDriver = currentState.driver.name && currentState.driver.licenseNumber && currentState.driver.employeeId;
  const hasVehicle = currentState.selectedVehicle !== null;
  const canStartInspection = hasDriver && hasVehicle;
  
  console.log('Button state update:', { hasDriver, hasVehicle, canStartInspection });
  
  const startPreTripBtn = document.getElementById('startPreTripBtn');
  const startTripMonitoringBtn = document.getElementById('startTripMonitoringBtn');
  const startPostTripBtn = document.getElementById('startPostTripBtn');
  
  if (startPreTripBtn) startPreTripBtn.disabled = !canStartInspection;
  if (startTripMonitoringBtn) startTripMonitoringBtn.disabled = !canStartInspection;
  if (startPostTripBtn) startPostTripBtn.disabled = !canStartInspection;
  
  if (!canStartInspection) {
    const message = !hasDriver ? 'Please complete driver information' : 'Please select a vehicle';
    [startPreTripBtn, startTripMonitoringBtn, startPostTripBtn]
      .filter(btn => btn)
      .forEach(btn => btn.title = message);
  } else {
    [startPreTripBtn, startTripMonitoringBtn, startPostTripBtn]
      .filter(btn => btn)
      .forEach(btn => btn.title = '');
  }
}

// Start Inspection
function startInspection(inspectionType) {
  console.log('Starting inspection:', inspectionType);
  
  if (!currentState.driver.name || !currentState.selectedVehicle) {
    showToast('Please complete driver information and select a vehicle', 'error');
    return;
  }
  
  const sections = Object.keys(vehicleInspectionData.inspectionSections[inspectionType]);
  
  currentState.currentInspection = {
    type: inspectionType,
    data: {},
    currentSection: 0,
    sections: sections,
    issues: [],
    photos: {},
    startTime: new Date().toISOString(),
    completedSections: new Set()
  };
  
  // Pre-populate with selected vehicle and driver info
  if (inspectionType === 'preTrip') {
    currentState.currentInspection.data['vehicleInfo_vehicleId'] = currentState.selectedVehicle.id;
    currentState.currentInspection.data['vehicleInfo_inspectorName'] = currentState.driver.name;
    currentState.currentInspection.data['vehicleInfo_inspectionDate'] = window.defaultDateTime;
  }
  
  const titles = {
    preTrip: 'Pre-Trip Inspection',
    tripMonitoring: 'Trip Monitoring',
    postTrip: 'Post-Trip Inspection'
  };
  
  const formTitleEl = document.getElementById('formTitle');
  const currentVehicleIdEl = document.getElementById('currentVehicleId');
  const currentDriverNameEl = document.getElementById('currentDriverName');
  
  if (formTitleEl) formTitleEl.textContent = titles[inspectionType];
  if (currentVehicleIdEl) currentVehicleIdEl.textContent = currentState.selectedVehicle.id;
  if (currentDriverNameEl) currentDriverNameEl.textContent = currentState.driver.name;
  
  renderInspectionForm();
  showInspectionForm();
}

// Render Inspection Form
function renderInspectionForm() {
  const formSections = document.getElementById('formSections');
  if (!formSections) return;
  
  const inspectionType = currentState.currentInspection.type;
  const sections = vehicleInspectionData.inspectionSections[inspectionType];
  
  formSections.innerHTML = currentState.currentInspection.sections.map((sectionKey, index) => {
    const sectionFields = sections[sectionKey];
    const sectionTitle = formatSectionTitle(sectionKey);
    const isActive = index === currentState.currentInspection.currentSection;
    const isCompleted = currentState.currentInspection.completedSections.has(index);
    
    return `
      <div class="form-section ${isActive ? 'expanded active' : ''}" data-section="${index}">
        <div class="section-header" data-section="${index}">
          <h3 class="section-title">
            ${isCompleted ? '✅ ' : ''}${sectionTitle}
            ${isCompleted ? '<small style="color: var(--color-success); font-weight: normal;"> - Completed</small>' : ''}
          </h3>
          <span class="section-toggle">▼</span>
        </div>
        <div class="section-content">
          ${renderSectionFields(sectionFields, sectionKey)}
        </div>
      </div>
    `;
  }).join('');
  
  // Add event listeners to form sections
  const updatedFormSections = document.getElementById('formSections');
  if (updatedFormSections) {
    updatedFormSections.addEventListener('click', function(e) {
      if (e.target.closest('.section-header')) {
        handleSectionToggle(e);
      }
    });
    updatedFormSections.addEventListener('change', handleFieldChange);
    updatedFormSections.addEventListener('input', handleFieldChange);
  }
  
  updateProgress();
}

// Format Section Title
function formatSectionTitle(key) {
  const titleMap = {
    vehicleInfo: 'Vehicle Information',
    exteriorWalkAround: 'Exterior Walk-Around',
    engineCompartment: 'Engine Compartment',
    interiorControls: 'Interior & Controls',
    safetyEquipment: 'Safety Equipment',
    journeyInfo: 'Journey Information',
    safetyMonitoring: 'Safety Monitoring',
    periodicChecks: 'Periodic Safety Checks',
    journeySummary: 'Journey Summary',
    vehicleCondition: 'Vehicle Condition Assessment',
    maintenanceRequirements: 'Maintenance Requirements'
  };
  
  return titleMap[key] || key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
}

// Render Section Fields
function renderSectionFields(fields, sectionKey) {
  return fields.map(field => {
    const fieldId = `${sectionKey}_${field.name}`;
    const value = currentState.currentInspection.data[fieldId] || '';
    
    switch (field.type) {
      case 'text':
        return `
          <div class="form-group">
            <label class="form-label ${field.required ? 'required' : ''}" for="${fieldId}">${field.label}</label>
            <input type="text" id="${fieldId}" name="${fieldId}" class="form-control" value="${value}" ${field.required ? 'required' : ''}>
          </div>
        `;
      
      case 'number':
        return `
          <div class="form-group">
            <label class="form-label ${field.required ? 'required' : ''}" for="${fieldId}">${field.label}</label>
            <input type="number" id="${fieldId}" name="${fieldId}" class="form-control" value="${value}" ${field.required ? 'required' : ''}>
          </div>
        `;
      
      case 'textarea':
        return `
          <div class="form-group">
            <label class="form-label ${field.required ? 'required' : ''}" for="${fieldId}">${field.label}</label>
            <textarea id="${fieldId}" name="${fieldId}" class="form-control" rows="3" ${field.required ? 'required' : ''}>${value}</textarea>
          </div>
        `;
      
      case 'select':
        return `
          <div class="form-group">
            <label class="form-label ${field.required ? 'required' : ''}" for="${fieldId}">${field.label}</label>
            <select id="${fieldId}" name="${fieldId}" class="form-control" ${field.required ? 'required' : ''}>
              <option value="">Choose an option</option>
              ${field.options.map(option => `
                <option value="${option}" ${value === option ? 'selected' : ''}>${option}</option>
              `).join('')}
            </select>
          </div>
        `;
      
      case 'radio':
        return `
          <div class="form-group">
            <label class="form-label ${field.required ? 'required' : ''}">${field.label}</label>
            <div class="radio-group">
              ${field.options.map(option => `
                <div class="radio-option">
                  <input type="radio" id="${fieldId}_${option}" name="${fieldId}" value="${option}" ${value === option ? 'checked' : ''} ${field.required ? 'required' : ''}>
                  <label for="${fieldId}_${option}">${option}</label>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      
      case 'datetime-local':
        return `
          <div class="form-group">
            <label class="form-label ${field.required ? 'required' : ''}" for="${fieldId}">${field.label}</label>
            <input type="datetime-local" id="${fieldId}" name="${fieldId}" class="form-control" value="${value || window.defaultDateTime}" ${field.required ? 'required' : ''}>
          </div>
        `;
      
      case 'time':
        return `
          <div class="form-group">
            <label class="form-label ${field.required ? 'required' : ''}" for="${fieldId}">${field.label}</label>
            <input type="time" id="${fieldId}" name="${fieldId}" class="form-control" value="${value}" ${field.required ? 'required' : ''}>
          </div>
        `;
      
      case 'file':
        const photos = currentState.currentInspection.photos[fieldId] || [];
        return `
          <div class="form-group">
            <label class="form-label">${field.label}</label>
            <button type="button" class="photo-upload-btn" data-field="${fieldId}">
              📷 Add Photos (${photos.length})
            </button>
            <div class="photo-thumbnails" id="thumbnails_${fieldId}">
              ${photos.map((photo, index) => `
                <div class="photo-thumbnail">
                  <img src="${photo.url}" alt="Photo ${index + 1}">
                  <button type="button" class="photo-remove" data-field="${fieldId}" data-index="${index}">×</button>
                </div>
              `).join('')}
            </div>
          </div>
        `;
      
      default:
        return '';
    }
  }).join('');
}

// Handle Section Toggle
function handleSectionToggle(e) {
  const header = e.target.closest('.section-header');
  if (header) {
    const section = header.closest('.form-section');
    const sectionIndex = parseInt(header.dataset.section);
    
    // Close all sections
    document.querySelectorAll('.form-section').forEach(s => s.classList.remove('expanded', 'active'));
    
    // Open clicked section
    section.classList.add('expanded', 'active');
    currentState.currentInspection.currentSection = sectionIndex;
    updateProgress();
  }
}

// Handle Field Change
function handleFieldChange(e) {
  const field = e.target;
  const fieldId = field.name || field.id;
  
  if (fieldId) {
    if (field.type === 'radio') {
      if (field.checked) {
        currentState.currentInspection.data[fieldId] = field.value;
        checkForIssues(fieldId, field.value);
      }
    } else {
      currentState.currentInspection.data[fieldId] = field.value;
      checkForIssues(fieldId, field.value);
    }
    
    // Clear validation errors
    field.classList.remove('error');
    const formGroup = field.closest('.form-group');
    if (formGroup) {
      const errorMessage = formGroup.querySelector('.error-message');
      if (errorMessage) errorMessage.remove();
    }
    
    updateProgress();
  }
}

// Check for Issues
function checkForIssues(fieldId, value) {
  // Critical safety issues that require immediate attention
  const criticalIssues = [
    { condition: value === 'No' && fieldId.includes('tirePressure'), severity: 'critical', description: 'Tire pressure inadequate - Critical Safety Issue' },
    { condition: value === 'No' && fieldId.includes('wheelFixings'), severity: 'critical', description: 'Wheel fixings not secure - Critical Safety Issue' },
    { condition: value === 'No' && fieldId.includes('lightsOperation'), severity: 'critical', description: 'Lights not working - Critical Safety Issue' },
    { condition: value === 'No' && fieldId.includes('seatbeltOperation'), severity: 'critical', description: 'Seatbelt not working - Critical Safety Issue' },
    { condition: value === 'No' && fieldId.includes('dashboardLights'), severity: 'critical', description: 'Dashboard warning lights - Critical Safety Issue' },
    { condition: value === 'Poor' && fieldId.includes('brakeResponse'), severity: 'critical', description: 'Poor brake response - Critical Safety Issue' },
    { condition: value === 'Empty' && fieldId.includes('brakeFluid'), severity: 'critical', description: 'Brake fluid empty - Critical Safety Issue' },
    { condition: value === 'Poor' && fieldId.includes('tireCondition'), severity: 'critical', description: 'Poor tire condition - Critical Safety Issue' },
    { condition: value === 'No' && fieldId.includes('fireExtinguisher'), severity: 'high', description: 'Fire extinguisher missing' },
    { condition: value === 'No' && fieldId.includes('reflectiveTriangles'), severity: 'high', description: 'Reflective triangles missing' },
    { condition: value === 'No' && fieldId.includes('documentation'), severity: 'high', description: 'Required documents missing' }
  ];
  
  const mediumIssues = [
    { condition: value === 'Poor' && (fieldId.includes('bodyCondition') || fieldId.includes('mirrorCondition')), severity: 'medium', description: 'Poor physical condition' },
    { condition: value === 'Fair' && fieldId.includes('tireCondition'), severity: 'medium', description: 'Tire condition requires attention' },
    { condition: value === 'Low' && (fieldId.includes('engineOil') || fieldId.includes('coolantLevel')), severity: 'medium', description: 'Fluid levels low - Schedule maintenance' },
    { condition: value === 'Yes' && fieldId.includes('fluidLeaks'), severity: 'medium', description: 'Fluid leak detected' },
    { condition: value === 'Fair' && fieldId.includes('batteryCondition'), severity: 'medium', description: 'Battery condition deteriorating' }
  ];
  
  const lowIssues = [
    { condition: value === 'Fair' && fieldId.includes('seatCondition'), severity: 'low', description: 'Seat condition could be improved' }
  ];
  
  // Remove existing issue for this field
  currentState.currentInspection.issues = currentState.currentInspection.issues.filter(issue => issue.fieldId !== fieldId);
  
  // Check for issues
  const allIssues = [...criticalIssues, ...mediumIssues, ...lowIssues];
  const matchingIssue = allIssues.find(issue => issue.condition);
  
  if (matchingIssue) {
    const fieldElement = document.getElementById(fieldId) || document.querySelector(`[name="${fieldId}"]`);
    const label = fieldElement ? fieldElement.closest('.form-group').querySelector('.form-label').textContent : fieldId;
    
    currentState.currentInspection.issues.push({
      id: Date.now() + Math.random(),
      fieldId: fieldId,
      section: getCurrentSectionName(),
      field: label,
      value: value,
      severity: matchingIssue.severity,
      description: matchingIssue.description,
      timestamp: new Date().toISOString()
    });
  }
}

// Get Current Section Name
function getCurrentSectionName() {
  const sectionKey = currentState.currentInspection.sections[currentState.currentInspection.currentSection];
  return formatSectionTitle(sectionKey);
}

// Update Progress
function updateProgress() {
  const totalSections = currentState.currentInspection.sections.length;
  const completedSections = currentState.currentInspection.completedSections.size;
  const currentSectionProgress = isSectionComplete(currentState.currentInspection.currentSection) ? 1 : 0;
  const progress = totalSections > 0 ? Math.round(((completedSections + currentSectionProgress) / totalSections) * 100) : 0;
  
  const progressFillEl = document.getElementById('progressFill');
  const progressTextEl = document.getElementById('progressText');
  
  if (progressFillEl) progressFillEl.style.width = `${progress}%`;
  if (progressTextEl) progressTextEl.textContent = `${progress}% Complete`;
  
  // Update navigation buttons
  const isLastSection = currentState.currentInspection.currentSection === currentState.currentInspection.sections.length - 1;
  const sectionComplete = isSectionComplete(currentState.currentInspection.currentSection);
  const formComplete = isFormComplete();
  
  const nextSectionBtn = document.getElementById('nextSectionBtn');
  const submitInspectionBtn = document.getElementById('submitInspectionBtn');
  
  if (nextSectionBtn) {
    nextSectionBtn.classList.toggle('hidden', isLastSection);
    nextSectionBtn.disabled = !sectionComplete;
  }
  
  if (submitInspectionBtn) {
    submitInspectionBtn.classList.toggle('hidden', !isLastSection);
    submitInspectionBtn.disabled = !formComplete;
  }
}

// Check if Section is Complete
function isSectionComplete(sectionIndex) {
  const sectionKey = currentState.currentInspection.sections[sectionIndex];
  const inspectionType = currentState.currentInspection.type;
  const sectionFields = vehicleInspectionData.inspectionSections[inspectionType][sectionKey];
  
  if (!sectionFields) return true;
  
  for (const field of sectionFields) {
    if (field.required) {
      const fieldId = `${sectionKey}_${field.name}`;
      const value = currentState.currentInspection.data[fieldId];
      if (!value || value.toString().trim() === '') {
        return false;
      }
    }
  }
  
  return true;
}

// Check if Form is Complete
function isFormComplete() {
  return currentState.currentInspection.sections.every((_, index) => isSectionComplete(index));
}

// Next Section
function nextSection() {
  const currentSectionIndex = currentState.currentInspection.currentSection;
  
  if (!isSectionComplete(currentSectionIndex)) {
    showValidationErrors();
    return;
  }
  
  // Mark current section as completed
  currentState.currentInspection.completedSections.add(currentSectionIndex);
  
  if (currentSectionIndex < currentState.currentInspection.sections.length - 1) {
    currentState.currentInspection.currentSection++;
    
    // Update UI
    document.querySelectorAll('.form-section').forEach((section, index) => {
      section.classList.remove('expanded', 'active');
      if (index === currentState.currentInspection.currentSection) {
        section.classList.add('expanded', 'active');
      }
    });
    
    updateProgress();
    renderInspectionForm(); // Re-render to show completion status
  }
}

// Show Validation Errors
function showValidationErrors() {
  const sectionKey = currentState.currentInspection.sections[currentState.currentInspection.currentSection];
  const inspectionType = currentState.currentInspection.type;
  const sectionFields = vehicleInspectionData.inspectionSections[inspectionType][sectionKey];
  
  if (!sectionFields) return;
  
  let hasErrors = false;
  
  for (const field of sectionFields) {
    if (field.required) {
      const fieldId = `${sectionKey}_${field.name}`;
      const fieldElement = document.getElementById(fieldId) || document.querySelector(`[name="${fieldId}"]`);
      const value = currentState.currentInspection.data[fieldId];
      
      if (fieldElement && (!value || value.toString().trim() === '')) {
        fieldElement.classList.add('error');
        hasErrors = true;
        
        // Add error message
        const formGroup = fieldElement.closest('.form-group');
        if (formGroup && !formGroup.querySelector('.error-message')) {
          const errorDiv = document.createElement('div');
          errorDiv.className = 'error-message';
          errorDiv.textContent = 'This field is required';
          formGroup.appendChild(errorDiv);
        }
      }
    }
  }
  
  if (hasErrors) {
    showToast('Please complete all required fields', 'error');
  }
}

// Submit Inspection
function submitInspection() {
  if (!isFormComplete()) {
    showValidationErrors();
    return;
  }
  
  // Mark final section as completed
  currentState.currentInspection.completedSections.add(currentState.currentInspection.currentSection);
  currentState.currentInspection.endTime = new Date().toISOString();
  
  showIssuesSummary();
}

// Save Progress
function saveProgress() {
  showToast('Progress saved successfully', 'success');
}

// Show Views
function showDashboard() {
  hideAllViews();
  const dashboard = document.getElementById('dashboard');
  if (dashboard) dashboard.classList.remove('hidden');
  
  // Reset inspection state
  currentState.currentInspection = {
    type: null,
    data: {},
    currentSection: 0,
    sections: [],
    issues: [],
    photos: {},
    startTime: null,
    completedSections: new Set()
  };
}

function showInspectionForm() {
  hideAllViews();
  const inspectionForm = document.getElementById('inspectionForm');
  if (inspectionForm) inspectionForm.classList.remove('hidden');
}

function showIssuesSummary() {
  hideAllViews();
  const issuesSummary = document.getElementById('issuesSummary');
  if (issuesSummary) issuesSummary.classList.remove('hidden');
  renderIssuesSummary();
}

function showReportView() {
  hideAllViews();
  const reportView = document.getElementById('reportView');
  if (reportView) reportView.classList.remove('hidden');
}

function hideAllViews() {
  const views = ['dashboard', 'inspectionForm', 'issuesSummary', 'reportView'];
  views.forEach(viewId => {
    const view = document.getElementById(viewId);
    if (view) view.classList.add('hidden');
  });
}

// Render Issues Summary
function renderIssuesSummary() {
  const inspectionStatus = document.getElementById('inspectionStatus');
  const issuesList = document.getElementById('issuesList');
  
  if (!inspectionStatus || !issuesList) return;
  
  const criticalIssues = currentState.currentInspection.issues.filter(i => i.severity === 'critical').length;
  const highIssues = currentState.currentInspection.issues.filter(i => i.severity === 'high').length;
  const totalIssues = currentState.currentInspection.issues.length;
  
  // Determine overall status
  let overallStatus = 'pass';
  let statusText = 'PASS - Vehicle Ready for Operation';
  let statusIcon = '✅';
  
  if (criticalIssues > 0) {
    overallStatus = 'fail';
    statusText = 'FAIL - Vehicle Not Safe for Operation';
    statusIcon = '❌';
  } else if (highIssues > 0) {
    overallStatus = 'warning';
    statusText = 'CONDITIONAL PASS - Address Issues Before Next Use';
    statusIcon = '⚠️';
  }
  
  inspectionStatus.innerHTML = `
    <div class="status-summary">
      <div class="status-indicator ${overallStatus}">
        <span>${statusIcon}</span>
        <span>${statusText}</span>
      </div>
      <div class="issue-count">
        <strong>${totalIssues}</strong> Total Issues Found
      </div>
    </div>
    <div class="status-breakdown">
      <p><strong>Critical:</strong> ${criticalIssues} • <strong>High:</strong> ${highIssues} • <strong>Medium:</strong> ${currentState.currentInspection.issues.filter(i => i.severity === 'medium').length} • <strong>Low:</strong> ${currentState.currentInspection.issues.filter(i => i.severity === 'low').length}</p>
    </div>
  `;
  
  if (totalIssues === 0) {
    issuesList.innerHTML = `
      <div class="card">
        <div class="card__body" style="text-align: center; color: var(--color-success);">
          <h3>✅ No Issues Found</h3>
          <p>This inspection completed successfully with no defects identified. Vehicle is ready for operation.</p>
        </div>
      </div>
    `;
  } else {
    issuesList.innerHTML = currentState.currentInspection.issues.map(issue => `
      <div class="issue-item ${issue.severity}">
        <div class="issue-header">
          <h4 class="issue-title">${issue.field}</h4>
          <span class="issue-priority ${issue.severity}">${issue.severity.toUpperCase()}</span>
        </div>
        <div class="issue-description">${issue.description}</div>
        <div class="issue-meta">
          <small>Section: ${issue.section} | Current Value: ${issue.value}</small>
        </div>
      </div>
    `).join('');
  }
}

// Flag Vehicle Out of Service
function flagVehicleOutOfService() {
  const criticalIssues = currentState.currentInspection.issues.filter(i => i.severity === 'critical' || i.severity === 'high').length;
  
  if (criticalIssues === 0) {
    showToast('No critical issues found. Vehicle does not need to be flagged.', 'info');
    return;
  }
  
  showToast(`Vehicle ${currentState.selectedVehicle.id} flagged as OUT OF SERVICE due to ${criticalIssues} critical issue(s)`, 'error');
  
  // Update vehicle status (in real app, this would update the backend)
  if (currentState.selectedVehicle) {
    currentState.selectedVehicle.status = 'Out of Service';
  }
}

// Generate DVIR Report
function generateDVIRReport() {
  const reportContent = document.getElementById('reportContent');
  if (!reportContent) return;
  
  const inspectionType = currentState.currentInspection.type;
  const now = new Date();
  
  const titles = {
    preTrip: 'Pre-Trip Inspection Report',
    tripMonitoring: 'Trip Monitoring Report',
    postTrip: 'Post-Trip Inspection Report (DVIR)'
  };
  
  reportContent.innerHTML = `
    <div class="report-section">
      <h2>${titles[inspectionType]}</h2>
      <div class="report-meta">
        <p><strong>Vehicle ID:</strong> ${currentState.selectedVehicle.id}</p>
        <p><strong>Vehicle:</strong> ${currentState.selectedVehicle.make} ${currentState.selectedVehicle.model} (${currentState.selectedVehicle.year})</p>
        <p><strong>Driver:</strong> ${currentState.driver.name}</p>
        <p><strong>License:</strong> ${currentState.driver.licenseNumber}</p>
        <p><strong>Employee ID:</strong> ${currentState.driver.employeeId}</p>
        <p><strong>Inspection Date:</strong> ${now.toLocaleDateString('en-GB', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}</p>
        <p><strong>Report Generated:</strong> ${now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' })} BST</p>
        <p><strong>Report ID:</strong> DVIR-${Date.now()}</p>
      </div>
    </div>
    
    <div class="report-section">
      <h3>Inspection Summary</h3>
      <p><strong>Total Issues Found:</strong> ${currentState.currentInspection.issues.length}</p>
      <p><strong>Vehicle Status:</strong> 
        <span class="status status--${currentState.currentInspection.issues.filter(i => i.severity === 'critical').length > 0 ? 'error' : 
          currentState.currentInspection.issues.filter(i => i.severity === 'high').length > 0 ? 'warning' : 'success'}">
          ${currentState.currentInspection.issues.filter(i => i.severity === 'critical').length > 0 ? 'OUT OF SERVICE' : 
            currentState.currentInspection.issues.filter(i => i.severity === 'high').length > 0 ? 'CONDITIONAL PASS' : 'SAFE FOR OPERATION'}
        </span>
      </p>
    </div>
    
    ${currentState.currentInspection.issues.length > 0 ? `
      <div class="report-section">
        <h3>Defects Requiring Attention</h3>
        ${currentState.currentInspection.issues.map(issue => `
          <div class="issue-item ${issue.severity}">
            <div class="issue-header">
              <h4 class="issue-title">${issue.field}</h4>
              <span class="issue-priority ${issue.severity}">${issue.severity.toUpperCase()}</span>
            </div>
            <div class="issue-description">${issue.description}</div>
            <div class="issue-meta">
              <small>Section: ${issue.section} | Current Condition: ${issue.value}</small>
            </div>
          </div>
        `).join('')}
      </div>
    ` : ''}
    
    <div class="report-section">
      <h3>Driver Certification</h3>
      <div style="margin-top: 2rem; padding: 1rem; border: 1px solid var(--color-border); border-radius: var(--radius-base);">
        <p><strong>Digital Signature:</strong> ${currentState.driver.name}</p>
        <p><strong>License Number:</strong> ${currentState.driver.licenseNumber}</p>
        <p><strong>Employee ID:</strong> ${currentState.driver.employeeId}</p>
        <p><strong>Date & Time:</strong> ${now.toLocaleDateString('en-GB')} ${now.toLocaleTimeString('en-GB')}</p>
        <p style="margin-top: 1rem; font-style: italic;">
          "I certify that the above vehicle inspection has been completed to the best of my ability and that all defects of which I are aware have been noted above."
        </p>
      </div>
    </div>
  `;
  
  showReportView();
}

// Photo Management Functions
function openPhotoModal(fieldId) {
  const photoModal = document.getElementById('photoModal');
  if (photoModal) {
    photoModal.classList.remove('hidden');
    photoModal.dataset.fieldId = fieldId;
    
    const photoPreview = document.getElementById('photoPreview');
    const photoInput = document.getElementById('photoInput');
    
    if (photoPreview) photoPreview.innerHTML = '';
    if (photoInput) photoInput.value = '';
  }
}

function closePhotoModal() {
  const photoModal = document.getElementById('photoModal');
  if (photoModal) {
    photoModal.classList.add('hidden');
    delete photoModal.dataset.fieldId;
  }
}

function handlePhotoSelection(e) {
  const files = Array.from(e.target.files);
  const previewContainer = document.getElementById('photoPreview');
  
  if (previewContainer) {
    previewContainer.innerHTML = files.map((file, index) => {
      const url = URL.createObjectURL(file);
      return `
        <div class="photo-thumbnail" data-index="${index}">
          <img src="${url}" alt="Preview ${index + 1}">
          <button type="button" class="photo-remove" onclick="removePreviewPhoto(${index})">×</button>
        </div>
      `;
    }).join('');
  }
}

function removePreviewPhoto(index) {
  const input = document.getElementById('photoInput');
  if (!input) return;
  
  const dt = new DataTransfer();
  const files = Array.from(input.files);
  
  files.forEach((file, i) => {
    if (i !== index) dt.items.add(file);
  });
  
  input.files = dt.files;
  handlePhotoSelection({ target: input });
}

function addPhotos() {
  const photoModal = document.getElementById('photoModal');
  if (!photoModal) return;
  
  const fieldId = photoModal.dataset.fieldId;
  const photoInput = document.getElementById('photoInput');
  
  if (!photoInput) return;
  
  const files = Array.from(photoInput.files);
  
  if (!currentState.currentInspection.photos[fieldId]) {
    currentState.currentInspection.photos[fieldId] = [];
  }
  
  files.forEach(file => {
    currentState.currentInspection.photos[fieldId].push({
      name: file.name,
      url: URL.createObjectURL(file),
      size: file.size,
      type: file.type,
      timestamp: new Date().toISOString()
    });
  });
  
  // Update button and thumbnails
  const button = document.querySelector(`[data-field="${fieldId}"]`);
  if (button) {
    button.textContent = `📷 Add Photos (${currentState.currentInspection.photos[fieldId].length})`;
  }
  
  closePhotoModal();
  showToast(`${files.length} photo(s) added successfully`, 'success');
}

// Event Delegation for Dynamic Elements
document.addEventListener('click', function(e) {
  // Photo upload buttons
  if (e.target.classList.contains('photo-upload-btn')) {
    e.preventDefault();
    const fieldId = e.target.dataset.field;
    openPhotoModal(fieldId);
  }
  
  // Photo remove buttons
  if (e.target.classList.contains('photo-remove')) {
    e.preventDefault();
    const fieldId = e.target.dataset.field;
    const index = parseInt(e.target.dataset.index);
    
    if (currentState.currentInspection.photos[fieldId]) {
      currentState.currentInspection.photos[fieldId].splice(index, 1);
      
      // Update UI
      const button = document.querySelector(`[data-field="${fieldId}"]`);
      if (button) {
        button.textContent = `📷 Add Photos (${currentState.currentInspection.photos[fieldId].length})`;
      }
    }
  }
});

// Export Functions
function exportPdf() {
  showToast('PDF export functionality would integrate with a PDF library in production', 'info');
}

function emailReport() {
  showToast('Email report functionality would integrate with email service in production', 'info');
}

// Toast Notifications
function showToast(message, type = 'info') {
  const toastEl = document.getElementById('toast');
  const toastMessage = document.getElementById('toastMessage');
  
  if (toastEl && toastMessage) {
    toastMessage.textContent = message;
    toastEl.className = `toast ${type}`;
    toastEl.classList.add('show');
    
    setTimeout(() => {
      toastEl.classList.remove('show');
    }, 4000);
  }
}