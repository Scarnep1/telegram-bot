// Courses data
const coursesData = {
    1: {
        title: "Основы нейросетей и машинного обучения",
        description: "Полное понимание базовых концепций, математики и первых практических реализаций",
        modules: [
            {
                title: "Модуль 1: Введение в ИИ и нейросети",
                lessons: [
                    { id: 1, title: "История искусственного интеллекта", duration: "15 мин", completed: false },
                    { id: 2, title: "Что такое нейросети и как они работают", duration: "20 мин", completed: false },
                    { id: 3, title: "Типы машинного обучения", duration: "25 мин", completed: false },
                    { id: 4, title: "Области применения нейросетей", duration: "18 мин", completed: false }
                ]
            },
            {
                title: "Модуль 2: Математические основы",
                lessons: [
                    { id: 5, title: "Линейная алгебра для машинного обучения", duration: "30 мин", completed: false },
                    { id: 6, title: "Теория вероятностей и статистика", duration: "25 мин", completed: false },
                    { id: 7, title: "Градиентный спуск и оптимизация", duration: "35 мин", completed: false },
                    { id: 8, title: "Функции активации", duration: "20 мин", completed: false }
                ]
            },
            {
                title: "Модуль 3: Первые нейросети",
                lessons: [
                    { id: 9, title: "Перцептрон и его ограничения", duration: "22 мин", completed: false },
                    { id: 10, title: "Многослойные перцептроны (MLP)", duration: "28 мин", completed: false },
                    { id: 11, title: "Реализация нейросети на Python с нуля", duration: "40 мин", completed: false },
                    { id: 12, title: "Работа с библиотеками: NumPy, Pandas", duration: "35 мин", completed: false }
                ]
            },
            {
                title: "Модуль 4: Обучение моделей",
                lessons: [
                    { id: 13, title: "Подготовка данных: нормализация, разделение", duration: "30 мин", completed: false },
                    { id: 14, title: "Функции потерь и метрики качества", duration: "25 мин", completed: false },
                    { id: 15, title: "Переобучение и регуляризация", duration: "28 мин", completed: false },
                    { id: 16, title: "Кросс-валидация и настройка гиперпараметров", duration: "32 мин", completed: false }
                ]
            },
            {
                title: "Модуль 5: Практические проекты",
                lessons: [
                    { id: 17, title: "Классификация изображений", duration: "45 мин", completed: false },
                    { id: 18, title: "Предсказание временных рядов", duration: "40 мин", completed: false },
                    { id: 19, title: "Работа с текстовыми данными", duration: "38 мин", completed: false },
                    { id: 20, title: "Финальный проект: распознавание рукописных цифр", duration: "60 мин", completed: false }
                ]
            }
        ]
    },
    2: {
        title: "Глубокое обучение и современные архитектуры",
        description: "CNN, RNN, трансформеры, генеративные сети и передовые архитектуры",
        modules: [
            {
                title: "Модуль 1: Введение в глубокое обучение",
                lessons: [
                    { id: 21, title: "Проблема исчезающего градиента", duration: "25 мин", completed: false },
                    { id: 22, title: "Инициализация весов и нормализация", duration: "30 мин", completed: false },
                    { id: 23, title: "Современные оптимизаторы: Adam, RMSprop", duration: "28 мин", completed: false },
                    { id: 24, title: "Фреймворки: TensorFlow vs PyTorch", duration: "35 мин", completed: false }
                ]
            },
            {
                title: "Модуль 2: Сверточные нейросети (CNN)",
                lessons: [
                    { id: 25, title: "Архитектура CNN: свертки, пулинг, полносвязные слои", duration: "40 мин", completed: false },
                    { id: 26, title: "Известные архитектуры: LeNet, AlexNet, VGG, ResNet", duration: "45 мин", completed: false },
                    { id: 27, title: "Transfer Learning и тонкая настройка", duration: "35 мин", completed: false },
                    { id: 28, title: "Обнаружение объектов и сегментация", duration: "50 мин", completed: false }
                ]
            },
            {
                title: "Модуль 3: Рекуррентные нейросети (RNN)",
                lessons: [
                    { id: 29, title: "Обработка последовательностей", duration: "30 мин", completed: false },
                    { id: 30, title: "LSTM и GRU сети", duration: "40 мин", completed: false },
                    { id: 31, title: "Многослойные и двунаправленные RNN", duration: "35 мин", completed: false },
                    { id: 32, title: "Прогнозирование временных рядов", duration: "45 мин", completed: false }
                ]
            },
            {
                title: "Модуль 4: Трансформеры и NLP",
                lessons: [
                    { id: 33, title: "Архитектура трансформера: внимание, энкодер, декодер", duration: "50 мин", completed: false },
                    { id: 34, title: "BERT, GPT и современные языковые модели", duration: "55 мин", completed: false },
                    { id: 35, title: "Токенизация и embedding", duration: "30 мин", completed: false },
                    { id: 36, title: "Задачи NLP: классификация, генерация, перевод", duration: "45 мин", completed: false }
                ]
            },
            {
                title: "Модуль 5: Генеративные модели",
                lessons: [
                    { id: 37, title: "Автоэнкодеры и вариационные автоэнкодеры", duration: "40 мин", completed: false },
                    { id: 38, title: "Generative Adversarial Networks (GAN)", duration: "50 мин", completed: false },
                    { id: 39, title: "Генерация изображений, текста и музыки", duration: "55 мин", completed: false },
                    { id: 40, title: "Style Transfer и модификация контента", duration: "45 мин", completed: false }
                ]
            }
        ]
    },
    3: {
        title: "Продвинутые техники и промышленное применение",
        description: "Transfer Learning, MLOps, интерпретация моделей, развертывание в продакшн",
        modules: [
            {
                title: "Модуль 1: Продвинутые архитектуры",
                lessons: [
                    { id: 41, title: "Transformer-XL, Reformer и эффективные архитектуры", duration: "45 мин", completed: false },
                    { id: 42, title: "Graph Neural Networks", duration: "50 мин", completed: false },
                    { id: 43, title: "Attention механизмы в компьютерном зрении", duration: "40 мин", completed: false },
                    { id: 44, title: "Мультимодальные модели", duration: "55 мин", completed: false }
                ]
            },
            {
                title: "Модуль 2: Обучение с подкреплением",
                lessons: [
                    { id: 45, title: "Основы RL: среда, агент, политика, награда", duration: "35 мин", completed: false },
                    { id: 46, title: "Q-learning и Deep Q-Networks", duration: "45 мин", completed: false },
                    { id: 47, title: "Policy Gradient методы", duration: "50 мин", completed: false },
                    { id: 48, title: "Применение в играх и робототехнике", duration: "55 мин", completed: false }
                ]
            },
            {
                title: "Модуль 3: MLOps и продакшн",
                lessons: [
                    { id: 49, title: "Конвейеры машинного обучения", duration: "40 мин", completed: false },
                    { id: 50, title: "Версионирование данных и моделей", duration: "35 мин", completed: false },
                    { id: 51, title: "Мониторинг и логирование", duration: "30 мин", completed: false },
                    { id: 52, title: "Развертывание моделей: Docker, Kubernetes, облака", duration: "60 мин", completed: false }
                ]
            },
            {
                title: "Модуль 4: Интерпретация и объяснимость",
                lessons: [
                    { id: 53, title: "LIME, SHAP и методы интерпретации", duration: "45 мин", completed: false },
                    { id: 54, title: "Визуализация внутренних представлений", duration: "35 мин", completed: false },
                    { id: 55, title: "Анализ важности признаков", duration: "40 мин", completed: false },
                    { id: 56, title: "Этичные аспекты ИИ", duration: "30 мин", completed: false }
                ]
            },
            {
                title: "Модуль 5: Реальные проекты",
                lessons: [
                    { id: 57, title: "Разработка системы рекомендаций", duration: "70 мин", completed: false },
                    { id: 58, title: "Создание чат-бота с ИИ", duration: "65 мин", completed: false },
                    { id: 59, title: "Система компьютерного зрения для производства", duration: "75 мин", completed: false },
                    { id: 60, title: "Финальный проект: полный ML пайплайн", duration: "90 мин", completed: false }
                ]
            }
        ]
    }
};

// Initialize progress from localStorage
let userProgress = JSON.parse(localStorage.getItem('neuroProgress')) || {
    courses: {
        1: { completed: 0, total: 20, lessons: {} },
        2: { completed: 0, total: 20, lessons: {} },
        3: { completed: 0, total: 20, lessons: {} }
    }
};

// DOM Elements
const navToggle = document.querySelector('.nav__toggle');
const navMenu = document.querySelector('.nav__menu');
const loginBtn = document.getElementById('loginBtn');
const loginModal = document.getElementById('loginModal');
const courseModal = document.getElementById('courseModal');
const closeButtons = document.querySelectorAll('.close');
const tabBtns = document.querySelectorAll('.tab-btn');
const tabPanes = document.querySelectorAll('.tab-pane');
const progressBars = document.querySelectorAll('.progress');
const overallProgressCircle = document.getElementById('overall-progress-circle');
const overallProgressText = document.getElementById('overall-progress');

// Mobile Navigation
navToggle.addEventListener('click', () => {
    navMenu.classList.toggle('active');
    navToggle.classList.toggle('active');
});

// Login Modal
loginBtn.addEventListener('click', (e) => {
    e.preventDefault();
    loginModal.style.display = 'block';
});

// Close Modals
closeButtons.forEach(btn => {
    btn.addEventListener('click', () => {
        loginModal.style.display = 'none';
        courseModal.style.display = 'none';
    });
});

// Close modal when clicking outside
window.addEventListener('click', (e) => {
    if (e.target === loginModal) {
        loginModal.style.display = 'none';
    }
    if (e.target === courseModal) {
        courseModal.style.display = 'none';
    }
});

// Tab System
tabBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const tabId = btn.getAttribute('data-tab');
        
        // Remove active class from all buttons and panes
        tabBtns.forEach(b => b.classList.remove('active'));
        tabPanes.forEach(p => p.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        btn.classList.add('active');
        document.getElementById(tabId).classList.add('active');
    });
});

// Open Course Modal
function openCourse(courseId) {
    const course = coursesData[courseId];
    const progress = userProgress.courses[courseId];
    
    let modalContent = `
        <h2>${course.title}</h2>
        <p>${course.description}</p>
        <div class="course-progress-summary">
            <div class="progress-bar">
                <div class="progress" data-progress="${(progress.completed / progress.total) * 100}" style="width: ${(progress.completed / progress.total) * 100}%"></div>
            </div>
            <span>${progress.completed}/${progress.total} уроков завершено</span>
        </div>
        <div class="lesson-list">
    `;
    
    course.modules.forEach(module => {
        modalContent += `<h3>${module.title}</h3>`;
        
        module.lessons.forEach(lesson => {
            const isCompleted = userProgress.courses[courseId].lessons[lesson.id] || false;
            modalContent += `
                <div class="lesson-item ${isCompleted ? 'completed' : ''}" data-course="${courseId}" data-lesson="${lesson.id}">
                    <div class="lesson-checkbox">${isCompleted ? '✓' : ''}</div>
                    <div class="lesson-content">
                        <div class="lesson-title">${lesson.title}</div>
                        <div class="lesson-duration">${lesson.duration}</div>
                    </div>
                </div>
            `;
        });
    });
    
    modalContent += `</div>`;
    
    document.getElementById('courseModalContent').innerHTML = modalContent;
    courseModal.style.display = 'block';
    
    // Add event listeners to lesson items
    document.querySelectorAll('.lesson-item').forEach(item => {
        item.addEventListener('click', function() {
            const courseId = this.getAttribute('data-course');
            const lessonId = this.getAttribute('data-lesson');
            toggleLessonCompletion(courseId, lessonId, this);
        });
    });
}

// Toggle Lesson Completion
function toggleLessonCompletion(courseId, lessonId, element) {
    const isCompleted = !userProgress.courses[courseId].lessons[lessonId];
    userProgress.courses[courseId].lessons[lessonId] = isCompleted;
    
    if (isCompleted) {
        userProgress.courses[courseId].completed++;
        element.classList.add('completed');
        element.querySelector('.lesson-checkbox').textContent = '✓';
    } else {
        userProgress.courses[courseId].completed--;
        element.classList.remove('completed');
        element.querySelector('.lesson-checkbox').textContent = '';
    }
    
    // Save to localStorage
    localStorage.setItem('neuroProgress', JSON.stringify(userProgress));
    
    // Update progress displays
    updateProgressDisplays();
}

// Update Progress Displays
function updateProgressDisplays() {
    // Update course progress bars
    Object.keys(userProgress.courses).forEach(courseId => {
        const course = userProgress.courses[courseId];
        const progressPercent = (course.completed / course.total) * 100;
        
        // Update course card progress
        const courseCard = document.querySelector(`.course-card[data-course="${courseId}"]`);
        if (courseCard) {
            const progressBar = courseCard.querySelector('.progress');
            const progressText = courseCard.querySelector('.progress-text');
            
            progressBar.style.width = `${progressPercent}%`;
            progressBar.setAttribute('data-progress', progressPercent);
            progressText.textContent = `${Math.round(progressPercent)}% завершено`;
        }
        
        // Update course progress in progress section
        const courseProgressBar = document.getElementById(`course${courseId}-progress`);
        if (courseProgressBar) {
            courseProgressBar.style.width = `${progressPercent}%`;
            courseProgressBar.setAttribute('data-progress', progressPercent);
            courseProgressBar.parentElement.nextElementSibling.textContent = `${Math.round(progressPercent)}%`;
        }
    });
    
    // Update overall progress
    const totalLessons = Object.values(userProgress.courses).reduce((sum, course) => sum + course.total, 0);
    const completedLessons = Object.values(userProgress.courses).reduce((sum, course) => sum + course.completed, 0);
    const overallProgress = (completedLessons / totalLessons) * 100;
    
    overallProgressText.textContent = Math.round(overallProgress);
    
    // Update circular progress
    const circumference = 2 * Math.PI * 54;
    const offset = circumference - (overallProgress / 100) * circumference;
    overallProgressCircle.style.strokeDashoffset = offset;
}

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    updateProgressDisplays();
    
    // Add smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
                // Close mobile menu if open
                navMenu.classList.remove('active');
            }
        });
    });
    
    // Add animation on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = 1;
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // Observe elements for animation
    document.querySelectorAll('.course-card, .resource-card, .module').forEach(el => {
        el.style.opacity = 0;
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity 0.6s, transform 0.6s';
        observer.observe(el);
    });
});

// Login form handling
document.querySelector('.login-form').addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Функция входа будет реализована в полной версии!');
    loginModal.style.display = 'none';
});
