const { useState, useEffect, useMemo } = React;

// Initial data from Rea Vaya BRT system
const initialData = {
  drivers: [
    {
      id: 1,
      firstName: "Thabo",
      lastName: "Mthembu",
      employeeId: "RV001",
      phone: "(011) 123-4567",
      email: "thabo.mthembu@reavaya.org.za",
      address: "Soweto, Johannesburg",
      hireDate: "2022-01-15",
      status: "Active",
      licenseStatus: "Valid PrDP",
      medicalStatus: "Valid",
      routeAssignment: "Phase 1B - Soweto to CBD",
      nextTrainingDue: "2024-12-15",
      universalAccessTrained: true,
      customerServiceTrained: true
    },
    {
      id: 2,
      firstName: "Sarah",
      lastName: "Van Der Merwe",
      employeeId: "RV002",
      phone: "(011) 234-5678",
      email: "sarah.vandermerwe@reavaya.org.za",
      address: "Auckland Park, Johannesburg",
      hireDate: "2021-06-10",
      status: "Active",
      licenseStatus: "PrDP Expiring Soon",
      medicalStatus: "Valid",
      routeAssignment: "Phase 1A - Thokoza Park Route",
      nextTrainingDue: "2024-11-20",
      universalAccessTrained: true,
      customerServiceTrained: false
    },
    {
      id: 3,
      firstName: "Nomsa",
      lastName: "Dlamini",
      employeeId: "RV003",
      phone: "(011) 345-6789",
      email: "nomsa.dlamini@reavaya.org.za",
      address: "Alexandra, Johannesburg",
      hireDate: "2023-03-22",
      status: "Active",
      licenseStatus: "Valid PrDP",
      medicalStatus: "Renewal Due",
      routeAssignment: "Phase 1C - Alexandra to Sandton",
      nextTrainingDue: "2024-10-05",
      universalAccessTrained: true,
      customerServiceTrained: true
    },
    {
      id: 4,
      firstName: "Pieter",
      lastName: "Botha",
      employeeId: "RV004",
      phone: "(011) 456-7890",
      email: "pieter.botha@reavaya.org.za",
      address: "Randburg, Johannesburg",
      hireDate: "2020-09-14",
      status: "On Leave",
      licenseStatus: "PrDP Expired",
      medicalStatus: "Expired",
      routeAssignment: "Unassigned",
      nextTrainingDue: "2024-09-30",
      universalAccessTrained: false,
      customerServiceTrained: false
    }
  ],
  licenses: [
    {
      id: 1,
      driverId: 1,
      driverName: "Thabo Mthembu",
      licenseType: "PrDP Code 14",
      licenseNumber: "PDP123456789",
      issueDate: "2022-01-20",
      expiryDate: "2026-01-20",
      status: "Valid"
    },
    {
      id: 2,
      driverId: 2,
      driverName: "Sarah Van Der Merwe",
      licenseType: "PrDP Code 14",
      licenseNumber: "PDP987654321",
      issueDate: "2021-06-15",
      expiryDate: "2024-12-15",
      status: "Expiring Soon"
    },
    {
      id: 3,
      driverId: 3,
      driverName: "Nomsa Dlamini",
      licenseType: "PrDP Code 14",
      licenseNumber: "PDP456789123",
      issueDate: "2023-03-25",
      expiryDate: "2027-03-25",
      status: "Valid"
    },
    {
      id: 4,
      driverId: 4,
      driverName: "Pieter Botha",
      licenseType: "PrDP Code 14",
      licenseNumber: "PDP789123456",
      issueDate: "2020-09-20",
      expiryDate: "2024-08-20",
      status: "Expired"
    }
  ],
  buses: [
    {
      id: 1,
      busNumber: "RV101",
      fleetNumber: "BRT-001",
      make: "Mercedes-Benz",
      model: "Citaro",
      year: 2022,
      registration: "GP123ABC",
      routeAssignment: "Phase 1B - Soweto to CBD",
      status: "In Service",
      lastInspection: "2024-08-15",
      nextInspection: "2024-11-15",
      wheelchairAccessible: true,
      wifiEnabled: true,
      currentStation: "Thokoza Park"
    },
    {
      id: 2,
      busNumber: "RV102",
      fleetNumber: "BRT-002",
      make: "Volvo",
      model: "7900 Electric",
      year: 2023,
      registration: "GP456DEF",
      routeAssignment: "Phase 1A - Thokoza Park Route",
      status: "In Workshop",
      lastInspection: "2024-07-20",
      nextInspection: "2024-10-20",
      wheelchairAccessible: true,
      wifiEnabled: false,
      currentStation: "Workshop"
    },
    {
      id: 3,
      busNumber: "RV103",
      fleetNumber: "BRT-003",
      make: "Scania",
      model: "Citywide",
      year: 2021,
      registration: "GP789GHI",
      routeAssignment: "Phase 1C - Alexandra to Sandton",
      status: "In Service",
      lastInspection: "2024-08-01",
      nextInspection: "2024-11-01",
      wheelchairAccessible: true,
      wifiEnabled: true,
      currentStation: "Lakeview"
    },
    {
      id: 4,
      busNumber: "RV104",
      fleetNumber: "BRT-004",
      make: "Mercedes-Benz",
      model: "Citaro",
      year: 2020,
      registration: "GP012JKL",
      routeAssignment: "Unassigned",
      status: "Out of Service",
      lastInspection: "2024-06-10",
      nextInspection: "2024-09-10",
      wheelchairAccessible: true,
      wifiEnabled: false,
      currentStation: "Depot"
    }
  ],
  routes: [
    {
      id: 1,
      routeName: "Phase 1A",
      routeDescription: "Thokoza Park via Pennyville",
      operatingHours: "05:00 - 23:00",
      frequency: "Every 10 minutes",
      stations: ["Thokoza Park", "Pennyville", "Orlando East", "Klipspruit Valley"],
      assignedBuses: ["RV102"],
      assignedDrivers: ["Sarah Van Der Merwe"]
    },
    {
      id: 2,
      routeName: "Phase 1B",
      routeDescription: "Soweto through Auckland Park to CBD",
      operatingHours: "04:30 - 24:00",
      frequency: "Every 8 minutes",
      stations: ["Soweto", "Klipspruit Valley", "Boomertown", "Auckland Park", "CBD"],
      assignedBuses: ["RV101"],
      assignedDrivers: ["Thabo Mthembu"]
    },
    {
      id: 3,
      routeName: "Phase 1C",
      routeDescription: "Parktown to Alexandra then to Sandton",
      operatingHours: "05:30 - 22:30",
      frequency: "Every 12 minutes",
      stations: ["Parktown", "Lakeview", "Alexandra", "Sandton"],
      assignedBuses: ["RV103"],
      assignedDrivers: ["Nomsa Dlamini"]
    }
  ],
  inspections: [
    {
      id: 1,
      busId: 1,
      busInfo: "RV101 - Mercedes-Benz Citaro",
      driverName: "Thabo Mthembu",
      inspectionDate: "2024-08-15",
      inspectionType: "Daily Safety Check",
      status: "Passed",
      route: "Phase 1B"
    },
    {
      id: 2,
      busId: 2,
      busInfo: "RV102 - Volvo 7900 Electric",
      driverName: "Sarah Van Der Merwe",
      inspectionDate: "2024-08-14",
      inspectionType: "Pre-Service Check",
      status: "Issues Found",
      route: "Phase 1A"
    },
    {
      id: 3,
      busId: 3,
      busInfo: "RV103 - Scania Citywide",
      driverName: "Nomsa Dlamini",
      inspectionDate: "2024-08-13",
      inspectionType: "Daily Safety Check",
      status: "Passed",
      route: "Phase 1C"
    }
  ],
  complianceAlerts: [
    {
      type: "license",
      message: "Sarah Van Der Merwe's PrDP license expires on 2024-12-15",
      priority: "warning"
    },
    {
      type: "license",
      message: "Pieter Botha's PrDP license has expired",
      priority: "critical"
    },
    {
      type: "medical",
      message: "Nomsa Dlamini's medical certificate renewal is due",
      priority: "warning"
    },
    {
      type: "vehicle",
      message: "Bus RV102 is currently in workshop for maintenance",
      priority: "info"
    },
    {
      type: "training",
      message: "Sarah Van Der Merwe needs customer service training",
      priority: "warning"
    },
    {
      type: "training",
      message: "Pieter Botha has overdue training (due: 2024-09-30)",
      priority: "critical"
    }
  ]
};

const languages = [
  { code: "en", name: "English" },
  { code: "af", name: "Afrikaans" },
  { code: "zu", name: "isiZulu" },
  { code: "xh", name: "isiXhosa" }
];

// Utility Components
const StatusBadge = ({ status, type = 'default' }) => {
  const getStatusClass = () => {
    switch (status?.toLowerCase()) {
      case 'active':
      case 'valid':
      case 'valid prdp':
      case 'passed':
      case 'in service':
        return 'status-badge--active';
      case 'inactive':
      case 'expired':
      case 'prdp expired':
      case 'failed':
      case 'out of service':
      case 'on leave':
        return 'status-badge--inactive';
      case 'expiring soon':
      case 'prdp expiring soon':
      case 'expiring':
      case 'in workshop':
      case 'maintenance':
      case 'issues found':
      case 'renewal due':
        return 'status-badge--warning';
      case 'unassigned':
        return 'status-badge--info';
      default:
        return 'status-badge--info';
    }
  };

  return (
    <span className={`status-badge ${getStatusClass()}`}>
      {status}
    </span>
  );
};

const Modal = ({ isOpen, onClose, title, children }) => {
  if (!isOpen) return null;
  
  return (
    <div className="modal">
      <div className="modal__content">
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button className="modal__close" onClick={onClose}>×</button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Theme Context
const ThemeToggle = ({ theme, onToggle }) => {
  return (
    <div className="theme-switcher">
      <span className="theme-label">☀️</span>
      <button 
        className="theme-toggle" 
        onClick={onToggle}
        aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} mode`}
      >
        <div className="theme-toggle__thumb"></div>
      </button>
      <span className="theme-label">🌙</span>
    </div>
  );
};

// Main App Component
const App = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);
  const [data, setData] = useState(initialData);
  const [searchTerms, setSearchTerms] = useState({
    drivers: '',
    licenses: '',
    buses: '',
    routes: ''
  });
  const [modals, setModals] = useState({
    driver: false,
    license: false,
    bus: false,
    route: false
  });
  const [editingItem, setEditingItem] = useState(null);

  // Theme management
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'light' ? 'dark' : 'light');
  };

  const openModal = (modalName, item = null) => {
    setEditingItem(item);
    setModals(prev => ({ ...prev, [modalName]: true }));
  };

  const closeModal = (modalName) => {
    setModals(prev => ({ ...prev, [modalName]: false }));
    setEditingItem(null);
  };

  const handleSearch = (section, term) => {
    setSearchTerms(prev => ({ ...prev, [section]: term }));
  };

  const addItem = (section, item) => {
    const newItem = { ...item, id: Date.now() };
    setData(prev => ({
      ...prev,
      [section]: [...prev[section], newItem]
    }));
  };

  const updateItem = (section, updatedItem) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].map(item => 
        item.id === updatedItem.id ? updatedItem : item
      )
    }));
  };

  const deleteItem = (section, id) => {
    if (window.confirm('Are you sure you want to delete this item?')) {
      setData(prev => ({
        ...prev,
        [section]: prev[section].filter(item => item.id !== id)
      }));
    }
  };

  // Dashboard calculations
  const dashboardStats = useMemo(() => {
    const activeDrivers = data.drivers.filter(d => d.status === 'Active').length;
    const validLicenses = data.licenses.filter(l => l.status === 'Valid').length;
    const activeBuses = data.buses.filter(b => b.status === 'In Service').length;
    const criticalAlerts = data.complianceAlerts.filter(a => a.priority === 'critical').length;

    return {
      activeDrivers,
      validLicenses,
      activeBuses,
      criticalAlerts
    };
  }, [data]);

  // Header Component
  const Header = () => {
    const navItems = [
      { key: 'dashboard', label: 'Dashboard' },
      { key: 'drivers', label: 'Drivers' },
      { key: 'licenses', label: 'Licenses' },
      { key: 'buses', label: 'Buses' },
      { key: 'routes', label: 'Routes' }
    ];

    return (
      <header className="header">
        <div className="header__left">
          <a 
            href="#" 
            className="header__logo"
            onClick={(e) => {
              e.preventDefault();
              setActiveSection('dashboard');
            }}
          >
            Rea Vaya Bus Rapid Transit
          </a>
          
          <nav className={`header__nav ${mobileNavOpen ? 'open' : ''}`}>
            {navItems.map(item => (
              <div key={item.key} className="header__nav-item">
                <a
                  href="#"
                  className={`header__nav-link ${activeSection === item.key ? 'header__nav-link--active' : ''}`}
                  onClick={(e) => {
                    e.preventDefault();
                    setActiveSection(item.key);
                    setMobileNavOpen(false);
                  }}
                >
                  {item.label}
                </a>
              </div>
            ))}
          </nav>
        </div>

        <div className="header__right">
          <ThemeToggle theme={theme} onToggle={toggleTheme} />
          
          <div className="language-selector">
            <select 
              value={language} 
              onChange={(e) => setLanguage(e.target.value)}
            >
              {languages.map(lang => (
                <option key={lang.code} value={lang.code}>
                  {lang.name}
                </option>
              ))}
            </select>
          </div>

          <button 
            className="mobile-nav-toggle"
            onClick={() => setMobileNavOpen(!mobileNavOpen)}
          >
            ☰
          </button>
        </div>
      </header>
    );
  };

  // Dashboard Component
  const Dashboard = () => (
    <div>
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
      </div>
      
      <div className="dashboard__grid">
        <div className="summary-card">
          <div className="summary-card__header">
            <span className="summary-card__title">Active Drivers</span>
            <span className="summary-card__icon">👥</span>
          </div>
          <div className="summary-card__value">{dashboardStats.activeDrivers}</div>
        </div>
        
        <div className="summary-card">
          <div className="summary-card__header">
            <span className="summary-card__title">Valid Licenses</span>
            <span className="summary-card__icon">📄</span>
          </div>
          <div className="summary-card__value">{dashboardStats.validLicenses}</div>
        </div>
        
        <div className="summary-card">
          <div className="summary-card__header">
            <span className="summary-card__title">Active Buses</span>
            <span className="summary-card__icon">🚌</span>
          </div>
          <div className="summary-card__value">{dashboardStats.activeBuses}</div>
        </div>
        
        <div className="summary-card">
          <div className="summary-card__header">
            <span className="summary-card__title">Critical Alerts</span>
            <span className="summary-card__icon">⚠️</span>
          </div>
          <div className="summary-card__value">{dashboardStats.criticalAlerts}</div>
        </div>
      </div>

      <div className="content-section">
        <div className="section-header">
          <h2 className="section-title">Recent Inspections</h2>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Bus</th>
              <th>Driver</th>
              <th>Date</th>
              <th>Type</th>
              <th>Status</th>
              <th>Route</th>
            </tr>
          </thead>
          <tbody>
            {data.inspections.slice(0, 5).map(inspection => (
              <tr key={inspection.id}>
                <td>{inspection.busInfo}</td>
                <td>{inspection.driverName}</td>
                <td>{inspection.inspectionDate}</td>
                <td>{inspection.inspectionType}</td>
                <td><StatusBadge status={inspection.status} /></td>
                <td>{inspection.route}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="content-section">
        <div className="section-header">
          <h2 className="section-title">Compliance Alerts</h2>
        </div>
        <div className="alert-list">
          {data.complianceAlerts.map((alert, index) => (
            <div key={index} className={`alert-item alert-item--${alert.priority}`}>
              <span className="alert-icon">
                {alert.priority === 'critical' ? '🚨' : 
                 alert.priority === 'warning' ? '⚡' : 'ℹ️'}
              </span>
              <p className="alert-message">{alert.message}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Driver Form Component
  const DriverForm = ({ driver, onSave, onCancel }) => {
    const [formData, setFormData] = useState(driver || {
      firstName: '',
      lastName: '',
      employeeId: '',
      phone: '',
      email: '',
      address: '',
      hireDate: '',
      status: 'Active',
      licenseStatus: 'Valid PrDP',
      medicalStatus: 'Valid',
      routeAssignment: '',
      nextTrainingDue: '',
      universalAccessTrained: false,
      customerServiceTrained: false
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
      onCancel();
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">First Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.firstName}
              onChange={(e) => setFormData({...formData, firstName: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Last Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.lastName}
              onChange={(e) => setFormData({...formData, lastName: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Employee ID</label>
            <input
              type="text"
              className="form-control"
              value={formData.employeeId}
              onChange={(e) => setFormData({...formData, employeeId: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              className="form-control"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-control"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="Active">Active</option>
              <option value="On Leave">On Leave</option>
              <option value="Inactive">Inactive</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">License Status</label>
            <select
              className="form-control"
              value={formData.licenseStatus}
              onChange={(e) => setFormData({...formData, licenseStatus: e.target.value})}
            >
              <option value="Valid PrDP">Valid PrDP</option>
              <option value="PrDP Expiring Soon">PrDP Expiring Soon</option>
              <option value="PrDP Expired">PrDP Expired</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Medical Status</label>
            <select
              className="form-control"
              value={formData.medicalStatus}
              onChange={(e) => setFormData({...formData, medicalStatus: e.target.value})}
            >
              <option value="Valid">Valid</option>
              <option value="Renewal Due">Renewal Due</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Route Assignment</label>
            <input
              type="text"
              className="form-control"
              value={formData.routeAssignment}
              onChange={(e) => setFormData({...formData, routeAssignment: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Hire Date</label>
            <input
              type="date"
              className="form-control"
              value={formData.hireDate}
              onChange={(e) => setFormData({...formData, hireDate: e.target.value})}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Next Training Due</label>
            <input
              type="date"
              className="form-control"
              value={formData.nextTrainingDue}
              onChange={(e) => setFormData({...formData, nextTrainingDue: e.target.value})}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Address</label>
          <textarea
            className="form-control"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            rows="3"
          />
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={formData.universalAccessTrained}
                onChange={(e) => setFormData({...formData, universalAccessTrained: e.target.checked})}
                style={{marginRight: '0.5rem'}}
              />
              Universal Access Trained
            </label>
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={formData.customerServiceTrained}
                onChange={(e) => setFormData({...formData, customerServiceTrained: e.target.checked})}
                style={{marginRight: '0.5rem'}}
              />
              Customer Service Trained
            </label>
          </div>
        </div>
        <div className="modal__footer">
          <button type="button" className="btn btn--secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary">
            Save Driver
          </button>
        </div>
      </form>
    );
  };

  // Drivers Section
  const DriversSection = () => {
    const searchTerm = searchTerms.drivers;
    const filteredDrivers = data.drivers.filter(driver =>
      `${driver.firstName} ${driver.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
      driver.employeeId.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Drivers</h1>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search drivers..."
              value={searchTerm}
              onChange={(e) => handleSearch('drivers', e.target.value)}
            />
            <button 
              className="btn btn--primary"
              onClick={() => openModal('driver')}
            >
              Add Driver
            </button>
          </div>
        </div>

        <div className="content-section">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Employee ID</th>
                <th>Contact</th>
                <th>Status</th>
                <th>License Status</th>
                <th>Medical Status</th>
                <th>Route Assignment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.map(driver => (
                <tr key={driver.id}>
                  <td>{`${driver.firstName} ${driver.lastName}`}</td>
                  <td>{driver.employeeId}</td>
                  <td>
                    <div>{driver.phone}</div>
                    <div style={{ fontSize: '12px', opacity: 0.7 }}>
                      {driver.email}
                    </div>
                  </td>
                  <td><StatusBadge status={driver.status} /></td>
                  <td><StatusBadge status={driver.licenseStatus} /></td>
                  <td><StatusBadge status={driver.medicalStatus} /></td>
                  <td>{driver.routeAssignment || 'Unassigned'}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon btn-icon--edit"
                        onClick={() => openModal('driver', driver)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn-icon btn-icon--delete"
                        onClick={() => deleteItem('drivers', driver.id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal 
          isOpen={modals.driver}
          onClose={() => closeModal('driver')}
          title={editingItem ? 'Edit Driver' : 'Add New Driver'}
        >
          <DriverForm
            driver={editingItem}
            onSave={editingItem ? 
              (data) => updateItem('drivers', { ...data, id: editingItem.id }) :
              (data) => addItem('drivers', data)
            }
            onCancel={() => closeModal('driver')}
          />
        </Modal>
      </div>
    );
  };

  // License Form Component
  const LicenseForm = ({ license, onSave, onCancel }) => {
    const [formData, setFormData] = useState(license || {
      driverName: '',
      licenseType: 'PrDP Code 14',
      licenseNumber: '',
      issueDate: '',
      expiryDate: '',
      status: 'Valid'
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
      onCancel();
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Driver Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.driverName}
              onChange={(e) => setFormData({...formData, driverName: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">License Type</label>
            <select
              className="form-control"
              value={formData.licenseType}
              onChange={(e) => setFormData({...formData, licenseType: e.target.value})}
            >
              <option value="PrDP Code 14">PrDP Code 14</option>
              <option value="PrDP Code 10">PrDP Code 10</option>
              <option value="Code 14">Code 14</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">License Number</label>
            <input
              type="text"
              className="form-control"
              value={formData.licenseNumber}
              onChange={(e) => setFormData({...formData, licenseNumber: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-control"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="Valid">Valid</option>
              <option value="Expiring Soon">Expiring Soon</option>
              <option value="Expired">Expired</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Issue Date</label>
            <input
              type="date"
              className="form-control"
              value={formData.issueDate}
              onChange={(e) => setFormData({...formData, issueDate: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Expiry Date</label>
            <input
              type="date"
              className="form-control"
              value={formData.expiryDate}
              onChange={(e) => setFormData({...formData, expiryDate: e.target.value})}
              required
            />
          </div>
        </div>
        <div className="modal__footer">
          <button type="button" className="btn btn--secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary">
            Save License
          </button>
        </div>
      </form>
    );
  };

  // Licenses Section
  const LicensesSection = () => {
    const searchTerm = searchTerms.licenses;
    const filteredLicenses = data.licenses.filter(license =>
      license.driverName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      license.licenseNumber.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Licenses</h1>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search licenses..."
              value={searchTerm}
              onChange={(e) => handleSearch('licenses', e.target.value)}
            />
            <button 
              className="btn btn--primary"
              onClick={() => openModal('license')}
            >
              Add License
            </button>
          </div>
        </div>

        <div className="content-section">
          <table className="data-table">
            <thead>
              <tr>
                <th>Driver Name</th>
                <th>License Type</th>
                <th>License Number</th>
                <th>Issue Date</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredLicenses.map(license => (
                <tr key={license.id}>
                  <td>{license.driverName}</td>
                  <td>{license.licenseType}</td>
                  <td>{license.licenseNumber}</td>
                  <td>{license.issueDate}</td>
                  <td>{license.expiryDate}</td>
                  <td><StatusBadge status={license.status} /></td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon btn-icon--edit"
                        onClick={() => openModal('license', license)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn-icon btn-icon--delete"
                        onClick={() => deleteItem('licenses', license.id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal 
          isOpen={modals.license}
          onClose={() => closeModal('license')}
          title={editingItem ? 'Edit License' : 'Add New License'}
        >
          <LicenseForm
            license={editingItem}
            onSave={editingItem ? 
              (data) => updateItem('licenses', { ...data, id: editingItem.id }) :
              (data) => addItem('licenses', data)
            }
            onCancel={() => closeModal('license')}
          />
        </Modal>
      </div>
    );
  };

  // Bus Form Component
  const BusForm = ({ bus, onSave, onCancel }) => {
    const [formData, setFormData] = useState(bus || {
      busNumber: '',
      fleetNumber: '',
      make: '',
      model: '',
      year: new Date().getFullYear(),
      registration: '',
      routeAssignment: '',
      status: 'In Service',
      wheelchairAccessible: true,
      wifiEnabled: true,
      currentStation: ''
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
      onCancel();
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Bus Number</label>
            <input
              type="text"
              className="form-control"
              value={formData.busNumber}
              onChange={(e) => setFormData({...formData, busNumber: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Fleet Number</label>
            <input
              type="text"
              className="form-control"
              value={formData.fleetNumber}
              onChange={(e) => setFormData({...formData, fleetNumber: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Make</label>
            <input
              type="text"
              className="form-control"
              value={formData.make}
              onChange={(e) => setFormData({...formData, make: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Model</label>
            <input
              type="text"
              className="form-control"
              value={formData.model}
              onChange={(e) => setFormData({...formData, model: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Year</label>
            <input
              type="number"
              className="form-control"
              value={formData.year}
              onChange={(e) => setFormData({...formData, year: parseInt(e.target.value)})}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Registration</label>
            <input
              type="text"
              className="form-control"
              value={formData.registration}
              onChange={(e) => setFormData({...formData, registration: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              className="form-control"
              value={formData.status}
              onChange={(e) => setFormData({...formData, status: e.target.value})}
            >
              <option value="In Service">In Service</option>
              <option value="In Workshop">In Workshop</option>
              <option value="Out of Service">Out of Service</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Current Station</label>
            <input
              type="text"
              className="form-control"
              value={formData.currentStation}
              onChange={(e) => setFormData({...formData, currentStation: e.target.value})}
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Route Assignment</label>
          <input
            type="text"
            className="form-control"
            value={formData.routeAssignment}
            onChange={(e) => setFormData({...formData, routeAssignment: e.target.value})}
          />
        </div>
        <div className="form-grid">
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={formData.wheelchairAccessible}
                onChange={(e) => setFormData({...formData, wheelchairAccessible: e.target.checked})}
                style={{marginRight: '0.5rem'}}
              />
              Wheelchair Accessible
            </label>
          </div>
          <div className="form-group">
            <label>
              <input
                type="checkbox"
                checked={formData.wifiEnabled}
                onChange={(e) => setFormData({...formData, wifiEnabled: e.target.checked})}
                style={{marginRight: '0.5rem'}}
              />
              WiFi Enabled
            </label>
          </div>
        </div>
        <div className="modal__footer">
          <button type="button" className="btn btn--secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary">
            Save Bus
          </button>
        </div>
      </form>
    );
  };

  // Buses Section
  const BusesSection = () => {
    const searchTerm = searchTerms.buses;
    const filteredBuses = data.buses.filter(bus =>
      bus.busNumber.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bus.registration.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Buses</h1>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search buses..."
              value={searchTerm}
              onChange={(e) => handleSearch('buses', e.target.value)}
            />
            <button 
              className="btn btn--primary"
              onClick={() => openModal('bus')}
            >
              Add Bus
            </button>
          </div>
        </div>

        <div className="content-section">
          <table className="data-table">
            <thead>
              <tr>
                <th>Bus Number</th>
                <th>Fleet Number</th>
                <th>Make & Model</th>
                <th>Registration</th>
                <th>Status</th>
                <th>Route Assignment</th>
                <th>Current Station</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredBuses.map(bus => (
                <tr key={bus.id}>
                  <td>{bus.busNumber}</td>
                  <td>{bus.fleetNumber}</td>
                  <td>{`${bus.make} ${bus.model}`} ({bus.year})</td>
                  <td>{bus.registration}</td>
                  <td><StatusBadge status={bus.status} /></td>
                  <td>{bus.routeAssignment || 'Unassigned'}</td>
                  <td>{bus.currentStation}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon btn-icon--edit"
                        onClick={() => openModal('bus', bus)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn-icon btn-icon--delete"
                        onClick={() => deleteItem('buses', bus.id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal 
          isOpen={modals.bus}
          onClose={() => closeModal('bus')}
          title={editingItem ? 'Edit Bus' : 'Add New Bus'}
        >
          <BusForm
            bus={editingItem}
            onSave={editingItem ? 
              (data) => updateItem('buses', { ...data, id: editingItem.id }) :
              (data) => addItem('buses', data)
            }
            onCancel={() => closeModal('bus')}
          />
        </Modal>
      </div>
    );
  };

  // Route Form Component
  const RouteForm = ({ route, onSave, onCancel }) => {
    const [formData, setFormData] = useState(route || {
      routeName: '',
      routeDescription: '',
      operatingHours: '',
      frequency: '',
      stations: [],
      assignedBuses: [],
      assignedDrivers: []
    });

    const handleSubmit = (e) => {
      e.preventDefault();
      onSave(formData);
      onCancel();
    };

    return (
      <form onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="form-group">
            <label className="form-label">Route Name</label>
            <input
              type="text"
              className="form-control"
              value={formData.routeName}
              onChange={(e) => setFormData({...formData, routeName: e.target.value})}
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Operating Hours</label>
            <input
              type="text"
              className="form-control"
              value={formData.operatingHours}
              onChange={(e) => setFormData({...formData, operatingHours: e.target.value})}
              placeholder="e.g., 05:00 - 23:00"
            />
          </div>
          <div className="form-group">
            <label className="form-label">Frequency</label>
            <input
              type="text"
              className="form-control"
              value={formData.frequency}
              onChange={(e) => setFormData({...formData, frequency: e.target.value})}
              placeholder="e.g., Every 10 minutes"
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label">Route Description</label>
          <textarea
            className="form-control"
            value={formData.routeDescription}
            onChange={(e) => setFormData({...formData, routeDescription: e.target.value})}
            rows="2"
          />
        </div>
        <div className="modal__footer">
          <button type="button" className="btn btn--secondary" onClick={onCancel}>
            Cancel
          </button>
          <button type="submit" className="btn btn--primary">
            Save Route
          </button>
        </div>
      </form>
    );
  };

  // Routes Section
  const RoutesSection = () => {
    const searchTerm = searchTerms.routes;
    const filteredRoutes = data.routes.filter(route =>
      route.routeName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      route.routeDescription.toLowerCase().includes(searchTerm.toLowerCase())
    );

    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">Routes</h1>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder="Search routes..."
              value={searchTerm}
              onChange={(e) => handleSearch('routes', e.target.value)}
            />
            <button 
              className="btn btn--primary"
              onClick={() => openModal('route')}
            >
              Add Route
            </button>
          </div>
        </div>

        <div className="content-section">
          <table className="data-table">
            <thead>
              <tr>
                <th>Route Name</th>
                <th>Description</th>
                <th>Operating Hours</th>
                <th>Frequency</th>
                <th>Assigned Buses</th>
                <th>Assigned Drivers</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredRoutes.map(route => (
                <tr key={route.id}>
                  <td>{route.routeName}</td>
                  <td>{route.routeDescription}</td>
                  <td>{route.operatingHours}</td>
                  <td>{route.frequency}</td>
                  <td>{route.assignedBuses.join(', ') || 'None'}</td>
                  <td>{route.assignedDrivers.join(', ') || 'None'}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon btn-icon--edit"
                        onClick={() => openModal('route', route)}
                        title="Edit"
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn-icon btn-icon--delete"
                        onClick={() => deleteItem('routes', route.id)}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <Modal 
          isOpen={modals.route}
          onClose={() => closeModal('route')}
          title={editingItem ? 'Edit Route' : 'Add New Route'}
        >
          <RouteForm
            route={editingItem}
            onSave={editingItem ? 
              (data) => updateItem('routes', { ...data, id: editingItem.id }) :
              (data) => addItem('routes', data)
            }
            onCancel={() => closeModal('route')}
          />
        </Modal>
      </div>
    );
  };

  // Main render function
  const renderContent = () => {
    switch (activeSection) {
      case 'dashboard':
        return <Dashboard />;
      case 'drivers':
        return <DriversSection />;
      case 'licenses':
        return <LicensesSection />;
      case 'buses':
        return <BusesSection />;
      case 'routes':
        return <RoutesSection />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <div className="app">
      <Header />
      <main className="main-content">
        {renderContent()}
      </main>
    </div>
  );
};

// Render the app
ReactDOM.render(<App />, document.getElementById('root'));