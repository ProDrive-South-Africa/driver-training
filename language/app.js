const { useState, useEffect, useRef, useMemo } = React;

// Initial Rea Vaya BRT data
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
  ],
  stations: [
    {
      id: 1,
      name: "Thokoza Park",
      phase: "Phase 1A",
      facilities: ["WiFi", "Wheelchair Access", "Digital Displays"],
      status: "Operational"
    },
    {
      id: 2,
      name: "Lakeview",
      phase: "Phase 1C",
      facilities: ["WiFi", "Wheelchair Access"],
      status: "Operational"
    },
    {
      id: 3,
      name: "Klipspruit Valley",
      phase: "Phase 1B",
      facilities: ["WiFi", "Wheelchair Access", "Ticket Office"],
      status: "Operational"
    },
    {
      id: 4,
      name: "Boomertown",
      phase: "Phase 1B",
      facilities: ["WiFi", "Wheelchair Access"],
      status: "Under Maintenance"
    }
  ]
};

// Language configuration
const languages = [
  { code: "en", name: "English" },
  { code: "af", name: "Afrikaans" },
  { code: "zu", name: "isiZulu" },
  { code: "xh", name: "isiXhosa" }
];

const translations = {
  en: {
    appTitle: "Rea Vaya Bus Rapid Transit",
    appSubtitle: "Fleet Management System",
    dashboard: "Dashboard",
    drivers: "Bus Drivers",
    licenses: "PrDP Licenses",
    buses: "Bus Fleet",
    routes: "Routes & Stations",
    activeDrivers: "Active Bus Drivers",
    validLicenses: "Valid PrDP Licenses",
    activeBuses: "Active Buses in Fleet",
    pendingInspections: "Pending Bus Inspections",
    recentInspections: "Recent Bus Inspections",
    complianceAlerts: "Route Compliance Alerts",
    searchDrivers: "Search drivers...",
    searchLicenses: "Search licenses...",
    searchBuses: "Search buses...",
    searchRoutes: "Search routes...",
    addDriver: "Add Driver",
    addLicense: "Add License",
    addBus: "Add Bus",
    addRoute: "Add Route",
    lightTheme: "Light",
    darkTheme: "Dark"
  },
  af: {
    appTitle: "Rea Vaya Bus Vinnige Vervoer",
    appSubtitle: "Vloot Bestuur Stelsel",
    dashboard: "Dashboard",
    drivers: "Bus Bestuurders",
    licenses: "PrDP Lisensies",
    buses: "Bus Vloot",
    routes: "Roetes & Stasies",
    activeDrivers: "Aktiewe Bus Bestuurders",
    validLicenses: "Geldige PrDP Lisensies",
    activeBuses: "Aktiewe Busse in Vloot",
    pendingInspections: "Hangende Bus Inspeksies",
    recentInspections: "Onlangse Bus Inspeksies",
    complianceAlerts: "Roete Nakoming Waarskuwings",
    searchDrivers: "Soek bestuurders...",
    searchLicenses: "Soek lisensies...",
    searchBuses: "Soek busse...",
    searchRoutes: "Soek roetes...",
    addDriver: "Voeg Bestuurder By",
    addLicense: "Voeg Lisensie By",
    addBus: "Voeg Bus By",
    addRoute: "Voeg Roete By",
    lightTheme: "Lig",
    darkTheme: "Donker"
  },
  zu: {
    appTitle: "Rea Vaya Ibhasi Lezokuthutha Ngokushesha",
    appSubtitle: "Uhlelo Lokuphatha Imoto",
    dashboard: "Dashboard",
    drivers: "Abashayeli Bebhasi",
    licenses: "Amalayisense e-PrDP",
    buses: "Imibhasi",
    routes: "Imizila Neziteshi",
    activeDrivers: "Abashayeli Bebhasi Abasebenzayo",
    validLicenses: "Amalayisense e-PrDP Asebenzayo",
    activeBuses: "Amabhasi Asebenzayo Emibhasini",
    pendingInspections: "Ukuhlolwa Kwamabhasi Okulindelayo",
    recentInspections: "Ukuhlolwa Kwamabhasi Kwakamuva",
    complianceAlerts: "Izexwayiso Zokuhambisana Nomzila",
    searchDrivers: "Sesha abashayeli...",
    searchLicenses: "Sesha amalayisense...",
    searchBuses: "Sesha amabhasi...",
    searchRoutes: "Sesha imizila...",
    addDriver: "Engeza Umshayeli",
    addLicense: "Engeza Ilayisense",
    addBus: "Engeza Ibhasi",
    addRoute: "Engeza Umzila",
    lightTheme: "Okukhanyayo",
    darkTheme: "Okumnyama"
  },
  xh: {
    appTitle: "Rea Vaya Ibhasi Yothutho Olukhawulezayo",
    appSubtitle: "Inkqubo Yolawulo Lwenqwelo",
    dashboard: "Dashboard",
    drivers: "Abaqhubi Bebhasi",
    licenses: "Iilayisensi ze-PrDP",
    buses: "Iibhasi",
    routes: "Iindlela Nezikhululo",
    activeDrivers: "Abaqhubi Bebhasi Abasebenzayo",
    validLicenses: "Iilayisensi ze-PrDP Ezisebenzayo",
    activeBuses: "Iibhasi Ezisebenzayo Kwinqwelo",
    pendingInspections: "Ukuhlolwa Kweebhasi Okulindwayo",
    recentInspections: "Ukuhlolwa Kweebhasi Kwamva Nje",
    complianceAlerts: "Izilumkiso Zokuthobela Indlela",
    searchDrivers: "Khangela abaqhubi...",
    searchLicenses: "Khangela iilayisensi...",
    searchBuses: "Khangela iibhasi...",
    searchRoutes: "Khangela iindlela...",
    addDriver: "Yongeza Umqhubi",
    addLicense: "Yongeza Ilayisensi",
    addBus: "Yongeza Ibhasi",
    addRoute: "Yongeza Indlela",
    lightTheme: "Ukukhanya",
    darkTheme: "Ubumnyama"
  }
};

// Utility Components
const StatusBadge = ({ status }) => {
  const getStatusClass = () => {
    const statusLower = status?.toLowerCase();
    switch (statusLower) {
      case 'active':
      case 'valid':
      case 'valid prdp':
      case 'passed':
      case 'operational':
      case 'in service':
        return 'status-badge--active';
      case 'inactive':
      case 'expired':
      case 'prdp expired':
      case 'failed':
      case 'out of service':
        return 'status-badge--inactive';
      case 'expiring soon':
      case 'prdp expiring soon':
      case 'renewal due':
      case 'in workshop':
      case 'issues found':
      case 'under maintenance':
        return 'status-badge--warning';
      case 'on leave':
        return 'status-badge--leave';
      case 'unassigned':
        return 'status-badge--unassigned';
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

// Language Selector Component
const LanguageSelector = ({ currentLanguage, onLanguageChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const currentLang = languages.find(lang => lang.code === currentLanguage) || languages[0];

  // Handle click outside to close dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const toggleDropdown = (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsOpen(prev => !prev);
  };

  const handleLanguageSelect = (e, langCode) => {
    e.preventDefault();
    e.stopPropagation();
    onLanguageChange(langCode);
    setIsOpen(false);
  };

  return (
    <div className="language-selector" ref={dropdownRef}>
      <button 
        className={`language-selector__button ${isOpen ? 'language-selector__button--open' : ''}`}
        onClick={toggleDropdown}
        type="button"
      >
        <span>{currentLang.name}</span>
        <span className={`language-selector__arrow ${isOpen ? 'language-selector__arrow--open' : ''}`}>
          ▼
        </span>
      </button>
      
      <div className={`language-selector__dropdown ${isOpen ? 'language-selector__dropdown--open' : ''}`}>
        {languages.map(lang => (
          <div
            key={lang.code}
            className={`language-selector__option ${
              lang.code === currentLanguage ? 'language-selector__option--active' : ''
            }`}
            onClick={(e) => handleLanguageSelect(e, lang.code)}
          >
            {lang.name}
          </div>
        ))}
      </div>
    </div>
  );
};

// Theme Switcher Component
const ThemeSwitcher = ({ theme, onThemeChange, t }) => {
  const toggleTheme = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const newTheme = theme === 'light' ? 'dark' : 'light';
    onThemeChange(newTheme);
  };

  return (
    <button className="theme-switcher" onClick={toggleTheme} type="button">
      <span className="theme-switcher__icon">
        {theme === 'light' ? '🌙' : '☀️'}
      </span>
      <span>{theme === 'light' ? t.darkTheme : t.lightTheme}</span>
    </button>
  );
};

// Modal Component
const Modal = ({ isOpen, onClose, title, children }) => {
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    
    if (isOpen) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className={`modal`} onClick={(e) => e.target === e.currentTarget && onClose()}>
      <div className="modal__content" onClick={(e) => e.stopPropagation()}>
        <div className="modal__header">
          <h2 className="modal__title">{title}</h2>
          <button className="modal__close" onClick={onClose} type="button">×</button>
        </div>
        {children}
      </div>
    </div>
  );
};

// Main App Component
const App = () => {
  const [activeSection, setActiveSection] = useState('dashboard');
  const [language, setLanguage] = useState('en');
  const [theme, setTheme] = useState('light');
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

  const t = translations[language] || translations.en;

  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
  }, [theme]);

  const handleThemeChange = (newTheme) => {
    setTheme(newTheme);
  };

  const handleLanguageChange = (langCode) => {
    setLanguage(langCode);
  };

  const handleNavigation = (section) => {
    setActiveSection(section);
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
    const activeBuses = data.buses.filter(v => v.status === 'In Service').length;
    const pendingInspections = data.buses.filter(v => 
      new Date(v.nextInspection) <= new Date(Date.now() + 30 * 24 * 60 * 60 * 1000)
    ).length;

    return {
      activeDrivers,
      validLicenses,
      activeBuses,
      pendingInspections
    };
  }, [data]);

  // Header Component
  const Header = () => {
    const navItems = [
      { key: 'dashboard', label: t.dashboard },
      { key: 'drivers', label: t.drivers },
      { key: 'licenses', label: t.licenses },
      { key: 'buses', label: t.buses },
      { key: 'routes', label: t.routes }
    ];

    return (
      <header className="header">
        <div className="header__container">
          <div 
            className="header__brand" 
            onClick={() => handleNavigation('dashboard')}
          >
            <h1 className="header__logo">{t.appTitle}</h1>
            <p className="header__tagline">{t.appSubtitle}</p>
          </div>
          
          <nav className="nav">
            <ul className="nav__list">
              {navItems.map(item => (
                <li key={item.key} className="nav__item">
                  <a
                    href="#"
                    className={`nav__link ${activeSection === item.key ? 'nav__link--active' : ''}`}
                    onClick={(e) => {
                      e.preventDefault();
                      e.stopPropagation();
                      handleNavigation(item.key);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <div className="header__controls">
            <ThemeSwitcher 
              theme={theme} 
              onThemeChange={handleThemeChange} 
              t={t}
            />
            <LanguageSelector 
              currentLanguage={language}
              onLanguageChange={handleLanguageChange}
            />
          </div>
        </div>
      </header>
    );
  };

  // Dashboard Component
  const Dashboard = () => (
    <div>
      <div className="page-header">
        <h1 className="page-title">{t.dashboard}</h1>
      </div>
      
      <div className="dashboard__grid">
        <div className="summary-card">
          <div className="summary-card__header">
            <span className="summary-card__title">{t.activeDrivers}</span>
            <span className="summary-card__icon">👥</span>
          </div>
          <div className="summary-card__value">{dashboardStats.activeDrivers}</div>
          <div className="summary-card__subtitle">Professional drivers with valid PrDP</div>
        </div>
        
        <div className="summary-card">
          <div className="summary-card__header">
            <span className="summary-card__title">{t.validLicenses}</span>
            <span className="summary-card__icon">📄</span>
          </div>
          <div className="summary-card__value">{dashboardStats.validLicenses}</div>
          <div className="summary-card__subtitle">Current valid professional permits</div>
        </div>
        
        <div className="summary-card">
          <div className="summary-card__header">
            <span className="summary-card__title">{t.activeBuses}</span>
            <span className="summary-card__icon">🚌</span>
          </div>
          <div className="summary-card__value">{dashboardStats.activeBuses}</div>
          <div className="summary-card__subtitle">Buses currently in service</div>
        </div>
        
        <div className="summary-card">
          <div className="summary-card__header">
            <span className="summary-card__title">{t.pendingInspections}</span>
            <span className="summary-card__icon">🔧</span>
          </div>
          <div className="summary-card__value">{dashboardStats.pendingInspections}</div>
          <div className="summary-card__subtitle">Due within next 30 days</div>
        </div>
      </div>

      <div className="content-section">
        <div className="section-header">
          <h2 className="section-title">{t.recentInspections}</h2>
        </div>
        <table className="data-table">
          <thead>
            <tr>
              <th>Bus</th>
              <th>Driver</th>
              <th>Date</th>
              <th>Type</th>
              <th>Route</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.inspections.slice(0, 5).map(inspection => (
              <tr key={inspection.id}>
                <td>{inspection.busInfo}</td>
                <td>{inspection.driverName}</td>
                <td>{inspection.inspectionDate}</td>
                <td>{inspection.inspectionType}</td>
                <td>{inspection.route}</td>
                <td><StatusBadge status={inspection.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="content-section">
        <div className="section-header">
          <h2 className="section-title">{t.complianceAlerts}</h2>
        </div>
        <div className="alert-list">
          {data.complianceAlerts.map((alert, index) => (
            <div key={index} className={`alert-item alert-item--${alert.priority}`}>
              <span className="alert-icon">
                {alert.priority === 'critical' ? '🚨' : 
                 alert.priority === 'warning' ? '⚠️' : 'ℹ️'}
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
            <label className="form-label">Route Assignment</label>
            <select
              className="form-control"
              value={formData.routeAssignment}
              onChange={(e) => setFormData({...formData, routeAssignment: e.target.value})}
            >
              <option value="">Unassigned</option>
              <option value="Phase 1A - Thokoza Park Route">Phase 1A - Thokoza Park Route</option>
              <option value="Phase 1B - Soweto to CBD">Phase 1B - Soweto to CBD</option>
              <option value="Phase 1C - Alexandra to Sandton">Phase 1C - Alexandra to Sandton</option>
            </select>
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
    const searchTerm = searchTerms.drivers.toLowerCase();
    const filteredDrivers = data.drivers.filter(driver =>
      `${driver.firstName} ${driver.lastName}`.toLowerCase().includes(searchTerm) ||
      driver.employeeId.toLowerCase().includes(searchTerm)
    );

    return (
      <div>
        <div className="page-header">
          <h1 className="page-title">{t.drivers}</h1>
          <div className="search-container">
            <input
              type="text"
              className="search-input"
              placeholder={t.searchDrivers}
              value={searchTerms.drivers}
              onChange={(e) => handleSearch('drivers', e.target.value)}
            />
            <button 
              className="btn btn--primary"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                openModal('driver');
              }}
              type="button"
            >
              {t.addDriver}
            </button>
          </div>
        </div>

        <div className="content-section">
          <table className="data-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Employee ID</th>
                <th>Status</th>
                <th>Route Assignment</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredDrivers.map(driver => (
                <tr key={driver.id}>
                  <td>
                    <div className="contact-info">
                      <div className="contact-primary">{`${driver.firstName} ${driver.lastName}`}</div>
                      <div className="contact-secondary">{driver.email}</div>
                    </div>
                  </td>
                  <td>{driver.employeeId}</td>
                  <td><StatusBadge status={driver.status} /></td>
                  <td>{driver.routeAssignment || 'Unassigned'}</td>
                  <td>
                    <div className="action-buttons">
                      <button 
                        className="btn-icon btn-icon--edit"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          openModal('driver', driver);
                        }}
                        title="Edit"
                        type="button"
                      >
                        ✏️
                      </button>
                      <button 
                        className="btn-icon btn-icon--delete"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          deleteItem('drivers', driver.id);
                        }}
                        title="Delete"
                        type="button"
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

  // Licenses Section
  const LicensesSection = () => (
    <div>
      <div className="page-header">
        <h1 className="page-title">{t.licenses}</h1>
      </div>
      <div className="content-section">
        <table className="data-table">
          <thead>
            <tr>
              <th>Driver Name</th>
              <th>License Number</th>
              <th>Expiry Date</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {data.licenses.map(license => (
              <tr key={license.id}>
                <td>{license.driverName}</td>
                <td>{license.licenseNumber}</td>
                <td>{license.expiryDate}</td>
                <td><StatusBadge status={license.status} /></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const BusesSection = () => (
    <div>
      <div className="page-header">
        <h1 className="page-title">{t.buses}</h1>
      </div>
      <div className="content-section">
        <table className="data-table">
          <thead>
            <tr>
              <th>Bus Number</th>
              <th>Make & Model</th>
              <th>Status</th>
              <th>Route</th>
            </tr>
          </thead>
          <tbody>
            {data.buses.map(bus => (
              <tr key={bus.id}>
                <td>{bus.busNumber}</td>
                <td>{`${bus.make} ${bus.model}`}</td>
                <td><StatusBadge status={bus.status} /></td>
                <td>{bus.routeAssignment || 'Unassigned'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

  const RoutesSection = () => (
    <div>
      <div className="page-header">
        <h1 className="page-title">{t.routes}</h1>
      </div>
      <div className="content-section">
        <table className="data-table">
          <thead>
            <tr>
              <th>Route</th>
              <th>Description</th>
              <th>Operating Hours</th>
              <th>Frequency</th>
            </tr>
          </thead>
          <tbody>
            {data.routes.map(route => (
              <tr key={route.id}>
                <td>{route.routeName}</td>
                <td>{route.routeDescription}</td>
                <td>{route.operatingHours}</td>
                <td>{route.frequency}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );

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