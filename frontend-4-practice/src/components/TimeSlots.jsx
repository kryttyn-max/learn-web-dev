export default function TimeSlots({ loading, error, slots, selectedTime, onTimeClick }) {
    return (
        <div className="time-section">
            <h2 className="section-title">Время</h2>
            <p className="subtitle">Выберите удобное время</p>
            
            <div className="time-grid">
                {loading && <p style={{ color: '#f0c05a', gridColumn: '1 / -1' }}>Загрузка слотов...</p>}
                
                {error && <p style={{ color: 'red', gridColumn: '1 / -1' }}>Ошибка: {error}</p>}
                
                {!loading && !error && slots.length === 0 && (
                    <p style={{ color: '#888', gridColumn: '1 / -1' }}>Нет доступного времени</p>
                )}

                {!loading && !error && slots.map(slot => (
                    <button 
                        key={slot.time} 
                        className={`time-btn ${selectedTime === slot.time ? 'active' : ''}`} 
                        onClick={() => onTimeClick(slot.time)}
                    >
                        {slot.time}
                    </button>
                ))}
            </div>
            <button className="btn-submit">Записаться</button>
        </div>
    );
}