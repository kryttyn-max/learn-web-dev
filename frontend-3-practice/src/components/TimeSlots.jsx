import { TIME_SLOTS } from '../data/dateUtils';

export default function TimeSlots({ selectedDay, selectedTime, onTimeClick }) {
    return (
        <div className="time-section">
            <h2 className="section-title">Время</h2>
            <p className="subtitle">Выберите удобное время</p>
            <div className="time-grid">
                {selectedDay === null ? (
                    <p style={{ color: '#888', gridColumn: '1 / -1' }}>Сначала выберите день</p>
                ) : (
                    TIME_SLOTS.map(time => (
                        <button key={time} className={`time-btn ${selectedTime === time ? 'active' : ''}`} onClick={() => onTimeClick(time)}>
                            {time}
                        </button>
                    ))
                )}
            </div>
            <button className="btn-submit">Записаться</button>
        </div>
    );
}