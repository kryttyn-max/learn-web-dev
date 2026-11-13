// ==========================================
// 1. ДАННЫЕ И КОНСТАНТЫ
// ==========================================
const MONTHS_NOMINATIVE = ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь', 'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'];
const MONTHS_GENITIVE = ['января', 'февраля', 'марта', 'апреля', 'мая', 'июня', 'июля', 'августа', 'сентября', 'октября', 'ноября', 'декабря'];
const DAYS_OF_WEEK = ['Воскресенье', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота'];

// Захардкоженные слоты времени (можно менять)
const TIME_SLOTS = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '12:00', '12:30', '13:00', '14:00', '15:00', '16:00'];

// ==========================================
// 2. СОСТОЯНИЕ ПРИЛОЖЕНИЯ
// ==========================================
const state = {
    currentMonth: new Date().getMonth(), // 0-11
    currentYear: new Date().getFullYear(),
    selectedDay: null,
    selectedTime: null,
    today: new Date() // Текущая дата для блокировки прошлых дней
};

// ==========================================
// 3. ЧИСТЫЕ ФУНКЦИИ (Помощники)
// ==========================================

// Сравнение двух дат (возвращает true, если date1 строго меньше date2)
function compareDates(date1, date2) {
    const d1 = new Date(date1.getFullYear(), date1.getMonth(), date1.getDate());
    const d2 = new Date(date2.getFullYear(), date2.getMonth(), date2.getDate());
    return d1 < d2;
}

// Проверка, можно ли выбрать день
function isDateSelectable(day, month, year, today) {
    const dateToCheck = new Date(year, month, day);
    return !compareDates(dateToCheck, today); // Нельзя выбирать дни раньше сегодня
}

// Построение сетки календаря (возвращает массив дней с пустыми ячейками в начале)
function buildCalendarGrid(year, month) {
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    let firstDayOfWeek = new Date(year, month, 1).getDay(); // 0 - Вс, 1 - Пн
    if (firstDayOfWeek === 0) firstDayOfWeek = 7; // Делаем Пн первым днем
    
    const grid = [];
    // Добавляем пустые ячейки для выравнивания
    for (let i = 1; i < firstDayOfWeek; i++) {
        grid.push(null);
    }
    // Добавляем дни месяца
    for (let i = 1; i <= daysInMonth; i++) {
        grid.push(i);
    }
    return grid;
}

// ==========================================
// 4. РЕНДЕР (Отрисовка элементов на странице)
// ==========================================

function renderCalendar() {
    const calendarContainer = document.getElementById('calendar-days');
    const monthYearLabel = document.getElementById('current-month-year');
    
    // Обновляем заголовок (Месяц Год)
    monthYearLabel.textContent = `${MONTHS_NOMINATIVE[state.currentMonth]} ${state.currentYear}`;
    
    // Очищаем контейнер
    calendarContainer.innerHTML = '';
    
    // Добавляем названия дней недели
    const daysOfWeekShort = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
    daysOfWeekShort.forEach(day => {
        const dayNameEl = document.createElement('div');
        dayNameEl.className = 'day-name';
        dayNameEl.textContent = day;
        calendarContainer.appendChild(dayNameEl);
    });

    // Получаем сетку дней
    const grid = buildCalendarGrid(state.currentYear, state.currentMonth);

    // Отрисовываем дни
    grid.forEach(day => {
        const dayEl = document.createElement('div');
        
        if (day === null) {
            // Пустая ячейка для выравнивания
            dayEl.className = 'day empty';
            calendarContainer.appendChild(dayEl);
            return;
        }

        const isSelectable = isDateSelectable(day, state.currentMonth, state.currentYear, state.today);
        const isSelected = state.selectedDay === day;

        dayEl.className = 'day';
        if (!isSelectable) dayEl.classList.add('disabled');
        if (isSelected) dayEl.classList.add('active');
        
        dayEl.textContent = day;

        // Вешаем обработчик, только если день доступен
        if (isSelectable) {
            dayEl.addEventListener('click', () => onDayClick(day));
        }

        calendarContainer.appendChild(dayEl);
    });
}

function renderTimeSlots() {
    const slotsContainer = document.getElementById('time-slots');
    slotsContainer.innerHTML = '';

    // Если день не выбран, слоты не показываем
    if (state.selectedDay === null) {
        slotsContainer.innerHTML = '<p style="color: #888;">Сначала выберите день</p>';
        return;
    }

    // Отрисовываем слоты
    TIME_SLOTS.forEach(time => {
        const slotEl = document.createElement('button');
        slotEl.className = 'time-btn';
        if (state.selectedTime === time) slotEl.classList.add('active');
        slotEl.textContent = time;

        slotEl.addEventListener('click', () => onTimeSlotClick(time));
        slotsContainer.appendChild(slotEl);
    });
}

function updateBottomBar() {
    const bottomBar = document.getElementById('bottom-bar');
    
    if (state.selectedDay === null) {
        bottomBar.textContent = 'Дата и время не выбраны';
        return;
    }

    const date = new Date(state.currentYear, state.currentMonth, state.selectedDay);
    const dayOfWeek = DAYS_OF_WEEK[date.getDay()];
    const monthName = MONTHS_GENITIVE[state.currentMonth];
    
    let text = `${dayOfWeek}, ${state.selectedDay} ${monthName} ${state.currentYear}`;
    
    if (state.selectedTime) {
        text += ` • ${state.selectedTime}`;
    }

    bottomBar.textContent = text;
}

// ==========================================
// 5. ОБРАБОТЧИКИ СОБЫТИЙ
// ==========================================

function onDayClick(day) {
    state.selectedDay = day;
    state.selectedTime = null; // СБРОС ВРЕМЕНИ ПРИ СМЕНЕ ДНЯ (важно!)
    
    renderCalendar();    // Перерисовываем календарь, чтобы выделить новый день
    renderTimeSlots();   // Обновляем слоты для нового дня
    updateBottomBar();   // Обновляем нижнюю панель
}

function onTimeSlotClick(time) {
    state.selectedTime = time;
    renderTimeSlots();   // Перерисовываем слоты, чтобы выделить выбранный
    updateBottomBar();   // Обновляем нижнюю панель
}

function setupMonthNavigation() {
    document.getElementById('prev-month').addEventListener('click', () => {
        state.currentMonth--;
        if (state.currentMonth < 0) {
            state.currentMonth = 11;
            state.currentYear--;
        }
        // При смене месяца сбрасываем выбранный день, чтобы избежать багов
        state.selectedDay = null;
        state.selectedTime = null;
        
        renderCalendar();
        renderTimeSlots();
        updateBottomBar();
    });

    document.getElementById('next-month').addEventListener('click', () => {
        state.currentMonth++;
        if (state.currentMonth > 11) {
            state.currentMonth = 0;
            state.currentYear++;
        }
        state.selectedDay = null;
        state.selectedTime = null;
        
        renderCalendar();
        renderTimeSlots();
        updateBottomBar();
    });
}

// ==========================================
// 6. ИНИЦИАЛИЗАЦИЯ
// ==========================================

function init() {
    // Выбираем сегодняшний день по умолчанию при загрузке
    const today = new Date();
    // Проверяем, чтобы "сегодня" не было раньше текущего отображаемого месяца
    // (хотя по логике мы начинаем с текущего месяца)
    state.selectedDay = today.getDate(); 
    
    // Первый рендер
    renderCalendar();
    renderTimeSlots();
    updateBottomBar();
    
    // Навешиваем обработчики на стрелки
    setupMonthNavigation();
}

// Запуск после загрузки DOM
document.addEventListener('DOMContentLoaded', init);