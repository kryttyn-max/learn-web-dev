import { MONTHS_NOMINATIVE, DAYS_SHORT, buildCalendarGrid, isDateSelectable } from '../data/dateUtils';

export default function Calendar({ currentMonth, currentYear, selectedDay, today, onPrevMonth, onNextMonth, onDayClick }) {
    const grid = buildCalendarGrid(currentYear, currentMonth);

    return (
        <div className="calendar-section">
            <h2 className="section-title">Календарь</h2>
            <div className="calendar-header">
                <button onClick={onPrevMonth} className="nav-btn">&lt;</button>
                <span className="current-month">{MONTHS_NOMINATIVE[currentMonth]} {currentYear}</span>
                <button onClick={onNextMonth} className="nav-btn">&gt;</button>
            </div>
            <div className="calendar-grid">
                {DAYS_SHORT.map(day => <div key={day} className="day-name">{day}</div>)}
                {grid.map((day, index) => {
                    if (day === null) return <div key={`empty-${index}`} className="day empty"></div>;
                    const isSelectable = isDateSelectable(day, currentMonth, currentYear, today);
                    const isSelected = selectedDay === day;
                    let className = 'day';
                    if (!isSelectable) className += ' disabled';
                    if (isSelected) className += ' active';
                    return <div key={day} className={className} onClick={() => isSelectable && onDayClick(day)}>{day}</div>;
                })}
            </div>
        </div>
    );
}