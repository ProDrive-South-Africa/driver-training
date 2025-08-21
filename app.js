// Application Data
const appData = {
  courses: [
    {
      id: "pre-trip-001",
      title: "Pre-Trip Inspection Fundamentals",
      description: "Comprehensive training on pre-trip inspection procedures for Rea Vaya BRT buses",
      duration: "45 minutes",
      modules: 5,
      completion_rate: 78,
      status: "active"
    },
    {
      id: "safety-002", 
      title: "Emergency Procedures",
      description: "Emergency response and safety protocols for BRT operations",
      duration: "30 minutes",
      modules: 3,
      completion_rate: 65,
      status: "coming_soon"
    }
  ],
  students: [
    {
      id: "DRV001",
      name: "Sipho Mthembu",
      role: "BRT Driver",
      completed_courses: 1,
      certificates: 1,
      next_certification: "2026-08-15",
      progress: 85
    },
    {
      id: "DRV002",
      name: "Nomsa Dlamini", 
      role: "BRT Driver",
      completed_courses: 0,
      certificates: 0,
      next_certification: "2025-09-01",
      progress: 45
    }
  ],
  quiz_questions: [
    {
      question: "How often should tire pressure be checked during pre-trip inspection?",
      options: ["Every trip", "Weekly", "Monthly", "When they look low"],
      correct: 0,
      explanation: "Tire pressure should be checked before every trip to ensure passenger safety and vehicle reliability."
    },
    {
      question: "What is the first step in a pre-trip inspection?",
      options: ["Start the engine", "Check the exterior", "Review the route", "Test the brakes"],
      correct: 1,
      explanation: "Always begin with a thorough exterior inspection before entering the vehicle."
    }
  ]
};

// Application State
let currentView = 'landing';
let currentModule = 2;
let currentQuizQuestion = 0;
let quizAnswers = [];
let moduleProgress = { 1: true, 2: false, 3: false, 4: false, 5: false };

// Core navigation function
function showView(viewName) {
  console.log('Switching to view:', viewName);
  
  // Hide all views
  const views = document.querySelectorAll('.view');
  views.forEach(view => {
    view.classList.remove('active');
  });
  
  // Show target view
  const targetView = document.getElementById(viewName);
  if (targetView) {
    targetView.classList.add('active');
    currentView = viewName;
    
    // Initialize view-specific functionality
    if (viewName === 'manager') {
      setTimeout(() => initializeManagerDashboard(), 100);
    } else if (viewName === 'course') {
      setTimeout(() => updateCourseContent(), 100);
    } else if (viewName === 'quiz') {
      setTimeout(() => initializeQuiz(), 100);
    }
    
    window.scrollTo(0, 0);
    return true;
  }
  
  console.error('View not found:', viewName);
  return false;
}

// Initialize all navigation
function initializeApp() {
  console.log('Initializing Rea Vaya Training System...');
  
  // Navigation event handlers
  document.body.addEventListener('click', handleNavigation);
  
  // Initialize specific components
  initializeCourseNavigation();
  
  // Show welcome notification
  setTimeout(() => {
    showNotification('Welcome to the Rea Vaya Training System!', 'success');
  }, 1000);
  
  console.log('App initialized successfully');
}

// Handle all navigation clicks
function handleNavigation(e) {
  // Find data-view attribute
  let element = e.target;
  let viewName = null;
  
  // Check current element and parents for data-view
  while (element && element !== document.body) {
    if (element.getAttribute && element.hasAttribute('data-view')) {
      viewName = element.getAttribute('data-view');
      break;
    }
    element = element.parentElement;
  }
  
  if (viewName) {
    e.preventDefault();
    e.stopPropagation();
    
    console.log('Navigation click detected:', viewName);
    
    // Show loading state for buttons
    if (e.target.classList.contains('btn') || e.target.closest('.btn')) {
      const btn = e.target.classList.contains('btn') ? e.target : e.target.closest('.btn');
      const originalText = btn.textContent;
      
      btn.textContent = 'Loading...';
      btn.disabled = true;
      
      setTimeout(() => {
        btn.textContent = originalText;
        btn.disabled = false;
        showView(viewName);
      }, 300);
    } else {
      showView(viewName);
    }
    return;
  }
  
  // Handle other navigation elements
  if (e.target.matches('.course-card .btn--primary:not([disabled])')) {
    e.preventDefault();
    showView('course');
    return;
  }
  
  if (e.target.id === 'takeQuiz') {
    e.preventDefault();
    showView('quiz');
    return;
  }
  
  if (e.target.id === 'viewCertificate') {
    e.preventDefault();
    showView('certificate');
    return;
  }
  
  if (e.target.matches('.back-btn')) {
    e.preventDefault();
    const targetView = e.target.getAttribute('data-view') || 'student';
    showView(targetView);
    return;
  }
  
  // Certificate view buttons
  if (e.target.matches('[data-certificate] .btn')) {
    e.preventDefault();
    showView('certificate');
    return;
  }
  
  // Notification for download/print buttons
  if (e.target.textContent.includes('Download') || e.target.textContent.includes('Print')) {
    e.preventDefault();
    const action = e.target.textContent.includes('Download') ? 'download' : 'print';
    showNotification(`Certificate ${action} ${action === 'download' ? 'started' : 'dialog opening...'}`, 'info');
    return;
  }
}

// Course Content Management
function updateCourseContent() {
  const moduleTitle = document.getElementById('moduleTitle');
  const progressFill = document.querySelector('.course-content .progress-fill');
  const progressText = document.querySelector('.course-content .progress-text');
  
  const moduleTitles = [
    'Introduction to Pre-Trip Inspections',
    'Exterior Inspection Procedures', 
    'Interior Safety Checks',
    'Mechanical Systems',
    'Final Assessment'
  ];
  
  if (moduleTitle) {
    moduleTitle.textContent = moduleTitles[currentModule - 1];
  }
  
  // Update progress bar
  const progress = (currentModule - 1) / 5 * 100;
  if (progressFill) {
    progressFill.style.width = progress + '%';
  }
  if (progressText) {
    progressText.textContent = `Module ${currentModule} of 5`;
  }
  
  // Update module list
  document.querySelectorAll('.module-item').forEach((item, index) => {
    item.classList.remove('active');
    const moduleNum = index + 1;
    const statusSpan = item.querySelector('.module-status');
    
    if (moduleNum < currentModule || moduleProgress[moduleNum]) {
      statusSpan.textContent = '✓';
    } else if (moduleNum === currentModule) {
      item.classList.add('active');
      statusSpan.textContent = '▶';
    } else {
      statusSpan.textContent = '○';
    }
  });
  
  // Show/hide assessment button
  const nextBtn = document.getElementById('nextModule');
  const quizBtn = document.getElementById('takeQuiz');
  
  if (currentModule >= 5) {
    if (nextBtn) nextBtn.style.display = 'none';
    if (quizBtn) quizBtn.style.display = 'inline-block';
  } else {
    if (nextBtn) nextBtn.style.display = 'inline-block';
    if (quizBtn) quizBtn.style.display = 'none';
  }
}

function initializeCourseNavigation() {
  // Module navigation
  const prevBtn = document.getElementById('prevModule');
  const nextBtn = document.getElementById('nextModule');
  
  if (prevBtn) {
    prevBtn.onclick = function(e) {
      e.preventDefault();
      if (currentModule > 1) {
        currentModule--;
        updateCourseContent();
      }
    };
  }
  
  if (nextBtn) {
    nextBtn.onclick = function(e) {
      e.preventDefault();
      if (currentModule < 5) {
        moduleProgress[currentModule] = true;
        currentModule++;
        updateCourseContent();
      }
    };
  }
  
  // Module item clicks
  document.querySelectorAll('[data-module]').forEach(item => {
    item.onclick = function(e) {
      e.preventDefault();
      const moduleNum = parseInt(item.getAttribute('data-module'));
      if (moduleNum <= currentModule || moduleProgress[moduleNum]) {
        currentModule = moduleNum;
        updateCourseContent();
      }
    };
  });
  
  // Interactive checkboxes
  document.querySelectorAll('.inspection-item').forEach(checkbox => {
    checkbox.onchange = function(e) {
      if (e.target.checked) {
        const item = e.target.closest('.checkbox-item');
        item.style.backgroundColor = 'var(--color-bg-3)';
        setTimeout(() => {
          item.style.backgroundColor = '';
        }, 1000);
      }
    };
  });
}

// Quiz Management
function initializeQuiz() {
  console.log('Starting quiz...');
  currentQuizQuestion = 0;
  quizAnswers = [];
  
  const quizContent = document.querySelector('.quiz-content');
  const quizResults = document.getElementById('quizResults');
  
  if (quizContent) quizContent.style.display = 'block';
  if (quizResults) quizResults.style.display = 'none';
  
  displayQuestion();
  updateQuizNavigation();
  setupQuizButtons();
}

function displayQuestion() {
  const question = appData.quiz_questions[currentQuizQuestion];
  if (!question) return;
  
  const questionText = document.getElementById('questionText');
  const questionOptions = document.getElementById('questionOptions');
  const currentQ = document.getElementById('currentQuestion');
  const totalQ = document.getElementById('totalQuestions');
  
  if (questionText) questionText.textContent = question.question;
  if (currentQ) currentQ.textContent = currentQuizQuestion + 1;
  if (totalQ) totalQ.textContent = appData.quiz_questions.length;
  
  if (questionOptions) {
    questionOptions.innerHTML = '';
    question.options.forEach((option, index) => {
      const label = document.createElement('label');
      label.className = 'option';
      
      const input = document.createElement('input');
      input.type = 'radio';
      input.name = 'question';
      input.value = index;
      
      if (quizAnswers[currentQuizQuestion] === index) {
        input.checked = true;
      }
      
      const span = document.createElement('span');
      span.className = 'option-text';
      span.textContent = option;
      
      label.appendChild(input);
      label.appendChild(span);
      questionOptions.appendChild(label);
    });
  }
}

function updateQuizNavigation() {
  const prevBtn = document.getElementById('prevQuestion');
  const nextBtn = document.getElementById('nextQuestion');
  const submitBtn = document.getElementById('submitQuiz');
  
  if (prevBtn) prevBtn.disabled = (currentQuizQuestion === 0);
  
  const isLast = currentQuizQuestion === appData.quiz_questions.length - 1;
  if (nextBtn) nextBtn.style.display = isLast ? 'none' : 'inline-block';
  if (submitBtn) submitBtn.style.display = isLast ? 'inline-block' : 'none';
}

function setupQuizButtons() {
  const prevBtn = document.getElementById('prevQuestion');
  const nextBtn = document.getElementById('nextQuestion');
  const submitBtn = document.getElementById('submitQuiz');
  
  if (prevBtn) {
    prevBtn.onclick = function(e) {
      e.preventDefault();
      if (currentQuizQuestion > 0) {
        saveAnswer();
        currentQuizQuestion--;
        displayQuestion();
        updateQuizNavigation();
      }
    };
  }
  
  if (nextBtn) {
    nextBtn.onclick = function(e) {
      e.preventDefault();
      if (currentQuizQuestion < appData.quiz_questions.length - 1) {
        saveAnswer();
        currentQuizQuestion++;
        displayQuestion();
        updateQuizNavigation();
      }
    };
  }
  
  if (submitBtn) {
    submitBtn.onclick = function(e) {
      e.preventDefault();
      saveAnswer();
      showQuizResults();
    };
  }
}

function saveAnswer() {
  const selected = document.querySelector('input[name="question"]:checked');
  if (selected) {
    quizAnswers[currentQuizQuestion] = parseInt(selected.value);
  }
}

function showQuizResults() {
  let correct = 0;
  quizAnswers.forEach((answer, index) => {
    if (answer === appData.quiz_questions[index].correct) {
      correct++;
    }
  });
  
  const score = Math.round((correct / appData.quiz_questions.length) * 100);
  
  const quizContent = document.querySelector('.quiz-content');
  const quizResults = document.getElementById('quizResults');
  const scoreElement = document.getElementById('finalScore');
  const feedbackElement = document.getElementById('resultFeedback');
  
  if (quizContent) quizContent.style.display = 'none';
  if (quizResults) quizResults.style.display = 'block';
  if (scoreElement) scoreElement.textContent = score + '%';
  
  if (feedbackElement) {
    let feedback = 'You need more practice. Please review the course material.';
    if (score >= 90) {
      feedback = 'Excellent work! You have demonstrated mastery of pre-trip inspection procedures.';
    } else if (score >= 70) {
      feedback = 'Good job! You have a solid understanding. Review any missed questions.';
    }
    feedbackElement.innerHTML = `<p>${feedback}</p>`;
  }
}

// Manager Dashboard
function initializeManagerDashboard() {
  setTimeout(() => createChart(), 200);
}

function createChart() {
  const canvas = document.getElementById('progressChart');
  if (!canvas) return;
  
  if (window.managerChart) {
    window.managerChart.destroy();
  }
  
  try {
    window.managerChart = new Chart(canvas, {
      type: 'doughnut',
      data: {
        labels: ['Completed', 'In Progress', 'Not Started', 'Overdue'],
        datasets: [{
          data: [191, 42, 54, 12],
          backgroundColor: ['#10b981', '#3b82f6', '#f59e0b', '#ef4444'],
          borderWidth: 2,
          borderColor: '#ffffff'
        }]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: {
            position: 'bottom',
            labels: { padding: 20, usePointStyle: true }
          },
          tooltip: {
            callbacks: {
              label: function(context) {
                const label = context.label || '';
                const value = context.parsed;
                const total = context.dataset.data.reduce((a, b) => a + b, 0);
                const percentage = Math.round((value / total) * 100);
                return `${label}: ${value} drivers (${percentage}%)`;
              }
            }
          }
        }
      }
    });
  } catch (error) {
    console.error('Chart error:', error);
  }
}

// Notification system
function showNotification(message, type = 'info') {
  const notification = document.createElement('div');
  notification.innerHTML = `<div class="notification-content"><p>${message}</p></div>`;
  notification.style.cssText = `
    position: fixed;
    top: 80px;
    right: 20px;
    background: var(--color-surface);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-base);
    padding: var(--space-16);
    box-shadow: var(--shadow-lg);
    z-index: 1000;
    max-width: 300px;
    opacity: 0;
    transform: translateX(100%);
    transition: all 0.3s ease;
  `;
  
  document.body.appendChild(notification);
  
  setTimeout(() => {
    notification.style.opacity = '1';
    notification.style.transform = 'translateX(0)';
  }, 100);
  
  setTimeout(() => {
    notification.style.opacity = '0';
    notification.style.transform = 'translateX(100%)';
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification);
      }
    }, 300);
  }, 3000);
}

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', initializeApp);

// Handle window resize
window.addEventListener('resize', () => {
  if (window.managerChart) {
    window.managerChart.resize();
  }
});