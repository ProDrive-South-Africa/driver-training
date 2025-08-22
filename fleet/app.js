// Fleet Management System - Main Application
class FleetManagementApp {
    constructor() {
        // Initialize data from provided JSON
        this.data = {
            drivers: [
                {
                    id: 1,
                    name: "John Smith",
                    email: "john.smith@company.com",
                    phone: "+44 7700 900123",
                    licenseIds: [1, 2],
                    courseIds: [1, 2],
                    complianceStatus: "compliant"
                },
                {
                    id: 2,
                    name: "Sarah Johnson",
                    email: "sarah.johnson@company.com",
                    phone: "+44 7700 900124",
                    licenseIds: [3],
                    courseIds: [1],
                    complianceStatus: "non-compliant"
                },
                {
                    id: 3,
                    name: "Mike Brown",
                    email: "mike.brown@company.com",
                    phone: "+44 7700 900125",
                    licenseIds: [4],
                    courseIds: [1, 2, 3],
                    complianceStatus: "compliant"
                }
            ],
            licenses: [
                {
                    id: 1,
                    type: "Class C",
                    number: "DL123456789",
                    driverId: 1,
                    issueDate: "2020-01-15",
                    expiryDate: "2026-01-15",
                    status: "active"
                },
                {
                    id: 2,
                    type: "Commercial",
                    number: "CDL987654321",
                    driverId: 1,
                    issueDate: "2021-06-10",
                    expiryDate: "2025-12-31",
                    status: "expiring_soon"
                },
                {
                    id: 3,
                    type: "Class C",
                    number: "DL555666777",
                    driverId: 2,
                    issueDate: "2019-03-20",
                    expiryDate: "2024-03-20",
                    status: "expired"
                },
                {
                    id: 4,
                    type: "Motorcycle",
                    number: "MC111222333",
                    driverId: 3,
                    issueDate: "2022-05-15",
                    expiryDate: "2027-05-15",
                    status: "active"
                }
            ],
            vehicles: [
                {
                    id: 1,
                    make: "Ford",
                    model: "Transit",
                    year: 2022,
                    plateNumber: "AB22 XYZ",
                    lastInspection: "2025-08-15",
                    status: "compliant"
                },
                {
                    id: 2,
                    make: "Mercedes",
                    model: "Sprinter",
                    year: 2021,
                    plateNumber: "CD21 ABC",
                    lastInspection: "2025-07-01",
                    status: "inspection_due"
                },
                {
                    id: 3,
                    make: "Volkswagen",
                    model: "Crafter",
                    year: 2023,
                    plateNumber: "EF23 DEF",
                    lastInspection: "2025-08-20",
                    status: "compliant"
                }
            ],
            courses: [
                {
                    id: 1,
                    name: "Defensive Driving",
                    description: "Learn safe driving techniques and hazard awareness",
                    duration: 8,
                    required: true,
                    enrolledCount: 3
                },
                {
                    id: 2,
                    name: "Vehicle Safety Check",
                    description: "Pre-trip vehicle inspection procedures",
                    duration: 4,
                    required: true,
                    enrolledCount: 2
                },
                {
                    id: 3,
                    name: "First Aid Training",
                    description: "Basic first aid and emergency response",
                    duration: 6,
                    required: false,
                    enrolledCount: 1
                },
                {
                    id: 4,
                    name: "Cargo Handling",
                    description: "Proper loading and securing of cargo",
                    duration: 3,
                    required: false,
                    enrolledCount: 0
                }
            ]
        };

        this.currentSection = 'dashboard';
        this.currentEditItem = null;
        this.currentEditType = null;
        this.pendingDelete = null;

        // Wait for DOM to be ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.init());
        } else {
            this.init();
        }
    }

    init() {
        console.log('Initializing Fleet Management App');
        this.setupEventListeners();
        this.updateDashboard();
        this.renderAllSections();
    }

    setupEventListeners() {
        console.log('Setting up event listeners');
        
        // Navigation tabs - use event delegation
        document.addEventListener('click', (e) => {
            // Navigation tabs
            if (e.target.classList.contains('nav__tab')) {
                e.preventDefault();
                e.stopPropagation();
                const section = e.target.getAttribute('data-section');
                console.log('Navigation tab clicked:', section);
                this.switchSection(section);
                return;
            }

            // Dashboard cards navigation
            if (e.target.closest('.dashboard-card')) {
                e.preventDefault();
                e.stopPropagation();
                const card = e.target.closest('.dashboard-card');
                const section = card.getAttribute('data-navigate');
                console.log('Dashboard card clicked:', section);
                this.switchSection(section);
                return;
            }

            // Add buttons
            if (e.target.id === 'add-driver-btn') {
                e.preventDefault();
                console.log('Add driver button clicked');
                this.openForm('driver');
                return;
            }
            if (e.target.id === 'add-license-btn') {
                e.preventDefault();
                console.log('Add license button clicked');
                this.openForm('license');
                return;
            }
            if (e.target.id === 'add-vehicle-btn') {
                e.preventDefault();
                console.log('Add vehicle button clicked');
                this.openForm('vehicle');
                return;
            }
            if (e.target.id === 'add-course-btn') {
                e.preventDefault();
                console.log('Add course button clicked');
                this.openForm('course');
                return;
            }

            // Edit and delete buttons
            if (e.target.hasAttribute('data-action')) {
                e.preventDefault();
                e.stopPropagation();
                const action = e.target.getAttribute('data-action');
                const type = e.target.getAttribute('data-type');
                const id = parseInt(e.target.getAttribute('data-id'));
                
                console.log(`${action} button clicked for ${type} ${id}`);
                
                if (action === 'edit') {
                    this.editItem(type, id);
                } else if (action === 'delete') {
                    this.deleteItem(type, id);
                }
                return;
            }

            // Modal close buttons
            if (e.target.id === 'modal-close' || e.target.id === 'cancel-btn') {
                e.preventDefault();
                this.closeModal();
                return;
            }
            if (e.target.id === 'modal-backdrop') {
                e.preventDefault();
                this.closeModal();
                return;
            }

            // Confirmation modal buttons
            if (e.target.id === 'confirm-cancel') {
                e.preventDefault();
                this.closeConfirmModal();
                return;
            }
            if (e.target.id === 'confirm-delete') {
                e.preventDefault();
                this.confirmDelete();
                return;
            }

            // Notification close
            if (e.target.id === 'notification-close') {
                e.preventDefault();
                this.hideNotification();
                return;
            }
        });

        // Form submission
        document.addEventListener('submit', (e) => {
            if (e.target.id === 'item-form') {
                e.preventDefault();
                this.handleFormSubmit(e);
            }
        });

        // Search inputs
        document.addEventListener('input', (e) => {
            if (e.target.id === 'drivers-search') {
                this.filterTable('drivers', e.target.value);
            } else if (e.target.id === 'licenses-search') {
                this.filterTable('licenses', e.target.value);
            } else if (e.target.id === 'vehicles-search') {
                this.filterTable('vehicles', e.target.value);
            } else if (e.target.id === 'courses-search') {
                this.filterTable('courses', e.target.value);
            }
        });
    }

    switchSection(section) {
        console.log('Switching to section:', section);

        // Update navigation tabs
        document.querySelectorAll('.nav__tab').forEach(tab => {
            if (tab.getAttribute('data-section') === section) {
                tab.classList.add('active');
            } else {
                tab.classList.remove('active');
            }
        });

        // Update sections
        document.querySelectorAll('.section').forEach(sec => {
            if (sec.id === section) {
                sec.classList.add('active');
            } else {
                sec.classList.remove('active');
            }
        });

        this.currentSection = section;

        if (section === 'dashboard') {
            this.updateDashboard();
        }
    }

    updateDashboard() {
        // Total drivers
        const totalDriversEl = document.getElementById('total-drivers');
        if (totalDriversEl) totalDriversEl.textContent = this.data.drivers.length;
        
        // Compliance percentage
        const compliantDrivers = this.data.drivers.filter(d => d.complianceStatus === 'compliant').length;
        const compliancePercentage = this.data.drivers.length > 0 ? Math.round((compliantDrivers / this.data.drivers.length) * 100) : 0;
        const compliantDriversEl = document.getElementById('compliant-drivers');
        if (compliantDriversEl) compliantDriversEl.textContent = `${compliancePercentage}% Compliant`;

        // Active licenses
        const activeLicenses = this.data.licenses.filter(l => l.status === 'active').length;
        const totalLicensesEl = document.getElementById('total-licenses');
        if (totalLicensesEl) totalLicensesEl.textContent = activeLicenses;

        // Expiring licenses
        const expiringLicenses = this.data.licenses.filter(l => l.status === 'expiring_soon').length;
        const expiringLicensesEl = document.getElementById('expiring-licenses');
        if (expiringLicensesEl) expiringLicensesEl.textContent = `${expiringLicenses} Expiring Soon`;

        // Total vehicles
        const totalVehiclesEl = document.getElementById('total-vehicles');
        if (totalVehiclesEl) totalVehiclesEl.textContent = this.data.vehicles.length;

        // Inspection status
        const inspectionDue = this.data.vehicles.filter(v => v.status === 'inspection_due').length;
        const statusText = inspectionDue > 0 ? `${inspectionDue} Need Inspection` : 'All Inspected';
        const inspectionStatusEl = document.getElementById('inspection-status');
        if (inspectionStatusEl) inspectionStatusEl.textContent = statusText;

        // Total courses
        const totalCoursesEl = document.getElementById('total-courses');
        if (totalCoursesEl) totalCoursesEl.textContent = this.data.courses.length;

        // Required courses
        const requiredCourses = this.data.courses.filter(c => c.required).length;
        const requiredCoursesEl = document.getElementById('required-courses');
        if (requiredCoursesEl) requiredCoursesEl.textContent = `${requiredCourses} Required`;
    }

    renderAllSections() {
        this.renderDriversTable();
        this.renderLicensesTable();
        this.renderVehiclesTable();
        this.renderCoursesTable();
    }

    renderDriversTable() {
        const tbody = document.getElementById('drivers-table-body');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        this.data.drivers.forEach(driver => {
            const licenses = this.data.licenses
                .filter(l => driver.licenseIds.includes(l.id))
                .map(l => l.type)
                .join(', ');

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${driver.name}</td>
                <td>${driver.email}</td>
                <td>${driver.phone}</td>
                <td>${licenses || 'None'}</td>
                <td><span class="status status--${driver.complianceStatus}">${driver.complianceStatus === 'compliant' ? 'Compliant' : 'Non-Compliant'}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn--sm btn--edit btn--icon" data-action="edit" data-type="driver" data-id="${driver.id}">✏️</button>
                        <button class="btn btn--sm btn--delete btn--icon" data-action="delete" data-type="driver" data-id="${driver.id}">🗑️</button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    renderLicensesTable() {
        const tbody = document.getElementById('licenses-table-body');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        this.data.licenses.forEach(license => {
            const driver = this.data.drivers.find(d => d.id === license.driverId);
            const statusClass = license.status === 'active' ? 'active' : 
                               license.status === 'expired' ? 'expired' : 'expiring-soon';

            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${license.type}</td>
                <td>${license.number}</td>
                <td>${driver ? driver.name : 'Unassigned'}</td>
                <td>${this.formatDate(license.issueDate)}</td>
                <td>${this.formatDate(license.expiryDate)}</td>
                <td><span class="status status--${statusClass}">${this.formatStatus(license.status)}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn--sm btn--edit btn--icon" data-action="edit" data-type="license" data-id="${license.id}">✏️</button>
                        <button class="btn btn--sm btn--delete btn--icon" data-action="delete" data-type="license" data-id="${license.id}">🗑️</button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    renderVehiclesTable() {
        const tbody = document.getElementById('vehicles-table-body');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        this.data.vehicles.forEach(vehicle => {
            const statusClass = vehicle.status === 'compliant' ? 'compliant' : 'inspection-due';
            
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${vehicle.make} ${vehicle.model}</td>
                <td>${vehicle.year}</td>
                <td>${vehicle.plateNumber}</td>
                <td>${this.formatDate(vehicle.lastInspection)}</td>
                <td><span class="status status--${statusClass}">${this.formatStatus(vehicle.status)}</span></td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn--sm btn--edit btn--icon" data-action="edit" data-type="vehicle" data-id="${vehicle.id}">✏️</button>
                        <button class="btn btn--sm btn--delete btn--icon" data-action="delete" data-type="vehicle" data-id="${vehicle.id}">🗑️</button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    renderCoursesTable() {
        const tbody = document.getElementById('courses-table-body');
        if (!tbody) return;
        
        tbody.innerHTML = '';

        this.data.courses.forEach(course => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${course.name}</td>
                <td>${course.description}</td>
                <td>${course.duration}</td>
                <td><span class="status status--${course.required ? 'error' : 'info'}">${course.required ? 'Required' : 'Optional'}</span></td>
                <td>${course.enrolledCount}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn--sm btn--edit btn--icon" data-action="edit" data-type="course" data-id="${course.id}">✏️</button>
                        <button class="btn btn--sm btn--delete btn--icon" data-action="delete" data-type="course" data-id="${course.id}">🗑️</button>
                    </div>
                </td>
            `;
            tbody.appendChild(row);
        });
    }

    openForm(type, item = null) {
        console.log('Opening form for:', type, item);
        this.currentEditType = type;
        this.currentEditItem = item;

        const modal = document.getElementById('form-modal');
        const title = document.getElementById('modal-title');
        const formFields = document.getElementById('form-fields');

        if (!modal || !title || !formFields) {
            console.error('Modal elements not found');
            return;
        }

        title.textContent = item ? `Edit ${this.capitalize(type)}` : `Add ${this.capitalize(type)}`;

        let fieldsHTML = '';

        switch (type) {
            case 'driver':
                fieldsHTML = `
                    <div class="form-group">
                        <label class="form-label">Name *</label>
                        <input type="text" class="form-control" name="name" required value="${item ? item.name : ''}" />
                    </div>
                    <div class="form-group">
                        <label class="form-label">Email *</label>
                        <input type="email" class="form-control" name="email" required value="${item ? item.email : ''}" />
                    </div>
                    <div class="form-group">
                        <label class="form-label">Phone *</label>
                        <input type="tel" class="form-control" name="phone" required value="${item ? item.phone : ''}" />
                    </div>
                    <div class="form-group">
                        <label class="form-label">Licenses</label>
                        <div class="multi-select" id="license-select">
                            ${this.data.licenses.map(license => `
                                <div class="multi-select-option">
                                    <input type="checkbox" id="license-${license.id}" value="${license.id}" 
                                           ${item && item.licenseIds.includes(license.id) ? 'checked' : ''} />
                                    <label for="license-${license.id}">${license.type} (${license.number})</label>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Courses</label>
                        <div class="multi-select" id="course-select">
                            ${this.data.courses.map(course => `
                                <div class="multi-select-option">
                                    <input type="checkbox" id="course-${course.id}" value="${course.id}" 
                                           ${item && item.courseIds.includes(course.id) ? 'checked' : ''} />
                                    <label for="course-${course.id}">${course.name}</label>
                                </div>
                            `).join('')}
                        </div>
                    </div>
                `;
                break;

            case 'license':
                fieldsHTML = `
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Type *</label>
                            <select class="form-control" name="type" required>
                                <option value="">Select Type</option>
                                <option value="Class C" ${item && item.type === 'Class C' ? 'selected' : ''}>Class C</option>
                                <option value="Commercial" ${item && item.type === 'Commercial' ? 'selected' : ''}>Commercial</option>
                                <option value="Motorcycle" ${item && item.type === 'Motorcycle' ? 'selected' : ''}>Motorcycle</option>
                            </select>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Number *</label>
                            <input type="text" class="form-control" name="number" required value="${item ? item.number : ''}" />
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="form-label">Driver *</label>
                        <select class="form-control" name="driverId" required>
                            <option value="">Select Driver</option>
                            ${this.data.drivers.map(driver => `
                                <option value="${driver.id}" ${item && item.driverId === driver.id ? 'selected' : ''}>${driver.name}</option>
                            `).join('')}
                        </select>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Issue Date *</label>
                            <input type="date" class="form-control" name="issueDate" required value="${item ? item.issueDate : ''}" />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Expiry Date *</label>
                            <input type="date" class="form-control" name="expiryDate" required value="${item ? item.expiryDate : ''}" />
                        </div>
                    </div>
                `;
                break;

            case 'vehicle':
                fieldsHTML = `
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Make *</label>
                            <input type="text" class="form-control" name="make" required value="${item ? item.make : ''}" />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Model *</label>
                            <input type="text" class="form-control" name="model" required value="${item ? item.model : ''}" />
                        </div>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Year *</label>
                            <input type="number" class="form-control" name="year" required min="1990" max="2030" value="${item ? item.year : ''}" />
                        </div>
                        <div class="form-group">
                            <label class="form-label">Plate Number *</label>
                            <input type="text" class="form-control" name="plateNumber" required value="${item ? item.plateNumber : ''}" />
                        </div>
                    </div>
                `;
                break;

            case 'course':
                fieldsHTML = `
                    <div class="form-group">
                        <label class="form-label">Name *</label>
                        <input type="text" class="form-control" name="name" required value="${item ? item.name : ''}" />
                    </div>
                    <div class="form-group">
                        <label class="form-label">Description *</label>
                        <textarea class="form-control" name="description" required rows="3">${item ? item.description : ''}</textarea>
                    </div>
                    <div class="form-row">
                        <div class="form-group">
                            <label class="form-label">Duration (hours) *</label>
                            <input type="number" class="form-control" name="duration" required min="1" value="${item ? item.duration : ''}" />
                        </div>
                        <div class="form-group">
                            <div class="checkbox-group">
                                <input type="checkbox" id="required" name="required" ${item && item.required ? 'checked' : ''} />
                                <label for="required">Required Course</label>
                            </div>
                        </div>
                    </div>
                `;
                break;
        }

        formFields.innerHTML = fieldsHTML;
        modal.classList.remove('hidden');
    }

    handleFormSubmit(e) {
        e.preventDefault();
        console.log('Form submitted');
        const formData = new FormData(e.target);
        const data = Object.fromEntries(formData.entries());

        if (this.currentEditItem) {
            this.updateItem(this.currentEditType, this.currentEditItem.id, data);
        } else {
            this.addItem(this.currentEditType, data);
        }
    }

    addItem(type, data) {
        console.log('Adding item:', type, data);
        const newId = Math.max(...this.data[type + 's'].map(item => item.id)) + 1;
        let newItem = { id: newId, ...data };

        switch (type) {
            case 'driver':
                newItem.licenseIds = Array.from(document.querySelectorAll('#license-select input[type="checkbox"]:checked')).map(cb => parseInt(cb.value));
                newItem.courseIds = Array.from(document.querySelectorAll('#course-select input[type="checkbox"]:checked')).map(cb => parseInt(cb.value));
                newItem.complianceStatus = newItem.licenseIds.length > 0 ? 'compliant' : 'non-compliant';
                break;
            case 'license':
                newItem.driverId = parseInt(newItem.driverId);
                newItem.status = this.calculateLicenseStatus(newItem.expiryDate);
                break;
            case 'vehicle':
                newItem.year = parseInt(newItem.year);
                newItem.lastInspection = new Date().toISOString().split('T')[0];
                newItem.status = 'compliant';
                break;
            case 'course':
                newItem.duration = parseInt(newItem.duration);
                newItem.required = data.required === 'on';
                newItem.enrolledCount = 0;
                break;
        }

        this.data[type + 's'].push(newItem);
        this.refreshView();
        this.closeModal();
        this.showNotification(`${this.capitalize(type)} added successfully!`, 'success');
    }

    updateItem(type, id, data) {
        console.log('Updating item:', type, id, data);
        const items = this.data[type + 's'];
        const index = items.findIndex(item => item.id === id);
        
        if (index !== -1) {
            let updatedItem = { ...items[index], ...data };

            switch (type) {
                case 'driver':
                    updatedItem.licenseIds = Array.from(document.querySelectorAll('#license-select input[type="checkbox"]:checked')).map(cb => parseInt(cb.value));
                    updatedItem.courseIds = Array.from(document.querySelectorAll('#course-select input[type="checkbox"]:checked')).map(cb => parseInt(cb.value));
                    updatedItem.complianceStatus = updatedItem.licenseIds.length > 0 ? 'compliant' : 'non-compliant';
                    break;
                case 'license':
                    updatedItem.driverId = parseInt(updatedItem.driverId);
                    updatedItem.status = this.calculateLicenseStatus(updatedItem.expiryDate);
                    break;
                case 'vehicle':
                    updatedItem.year = parseInt(updatedItem.year);
                    break;
                case 'course':
                    updatedItem.duration = parseInt(updatedItem.duration);
                    updatedItem.required = data.required === 'on';
                    break;
            }

            items[index] = updatedItem;
            this.refreshView();
            this.closeModal();
            this.showNotification(`${this.capitalize(type)} updated successfully!`, 'success');
        }
    }

    editItem(type, id) {
        console.log('Edit item:', type, id);
        const item = this.data[type + 's'].find(item => item.id === id);
        if (item) {
            this.openForm(type, item);
        }
    }

    deleteItem(type, id) {
        console.log('Delete item:', type, id);
        this.pendingDelete = { type, id };
        const confirmModal = document.getElementById('confirm-modal');
        const confirmMessage = document.getElementById('confirm-message');
        if (confirmMessage) confirmMessage.textContent = `Are you sure you want to delete this ${type}?`;
        if (confirmModal) confirmModal.classList.remove('hidden');
    }

    confirmDelete() {
        if (this.pendingDelete) {
            const { type, id } = this.pendingDelete;
            const items = this.data[type + 's'];
            const index = items.findIndex(item => item.id === id);
            
            if (index !== -1) {
                items.splice(index, 1);
                this.refreshView();
                this.showNotification(`${this.capitalize(type)} deleted successfully!`, 'success');
            }
            
            this.pendingDelete = null;
        }
        this.closeConfirmModal();
    }

    filterTable(type, searchTerm) {
        const tbody = document.getElementById(type + '-table-body');
        if (!tbody) return;
        
        const rows = tbody.getElementsByTagName('tr');

        for (let row of rows) {
            const text = row.textContent.toLowerCase();
            const matches = text.includes(searchTerm.toLowerCase());
            row.style.display = matches ? '' : 'none';
        }
    }

    closeModal() {
        const modal = document.getElementById('form-modal');
        if (modal) modal.classList.add('hidden');
        this.currentEditItem = null;
        this.currentEditType = null;
    }

    closeConfirmModal() {
        const confirmModal = document.getElementById('confirm-modal');
        if (confirmModal) confirmModal.classList.add('hidden');
        this.pendingDelete = null;
    }

    showNotification(message, type = 'success') {
        const notification = document.getElementById('notification');
        const messageEl = document.getElementById('notification-message');

        if (messageEl) messageEl.textContent = message;
        if (notification) {
            notification.className = `notification notification--${type}`;
            notification.classList.remove('hidden');
            
            setTimeout(() => {
                notification.classList.add('hidden');
            }, 3000);
        }
    }

    hideNotification() {
        const notification = document.getElementById('notification');
        if (notification) notification.classList.add('hidden');
    }

    refreshView() {
        this.renderAllSections();
        this.updateDashboard();
    }

    calculateLicenseStatus(expiryDate) {
        const today = new Date();
        const expiry = new Date(expiryDate);
        const daysUntilExpiry = Math.ceil((expiry - today) / (1000 * 60 * 60 * 24));

        if (daysUntilExpiry < 0) return 'expired';
        if (daysUntilExpiry <= 30) return 'expiring_soon';
        return 'active';
    }

    formatDate(dateString) {
        return new Date(dateString).toLocaleDateString('en-GB', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    formatStatus(status) {
        return status.split('_').map(word => 
            word.charAt(0).toUpperCase() + word.slice(1)
        ).join(' ');
    }

    capitalize(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }
}

// Initialize the application when DOM is ready
let app;
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
        app = new FleetManagementApp();
    });
} else {
    app = new FleetManagementApp();
}