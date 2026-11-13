import { useState } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Calendar from './components/Calendar';
import TimeSlots from './components/TimeSlots';
import BottomBar from './components/BottomBar';

export default function App() {
    const today = new Date(); 
    const [currentMonth, setCurrentMonth] = useState(today.getMonth());
    const [currentYear, setCurrentYear] = useState(today.getFullYear());
    const [selectedDay, setSelectedDay] = useState(today.getDate());
    const [selectedTime, setSelectedTime] = useState(null);

    const handlePrevMonth = () => {
        if (currentMonth === 0) { setCurrentMonth(11); setCurrentYear(currentYear - 1); } 
        else { setCurrentMonth(currentMonth - 1); }
        setSelectedDay(null); setSelectedTime(null);
    };

    const handleNextMonth = () => {
        if (currentMonth === 11) { setCurrentMonth(0); setCurrentYear(currentYear + 1); } 
        else { setCurrentMonth(currentMonth + 1); }
        setSelectedDay(null); setSelectedTime(null);
    };

    const handleDayClick = (day) => { setSelectedDay(day); setSelectedTime(null); };
    const handleTimeClick = (time) => { setSelectedTime(time); };

    return (
        <>
            <Header />
            <main className="main-content">
                <div className="page-header">
                    <p className="breadcrumbs">Главная / Мастера / Услуги / <span>Календарь</span></p>
                    <h1>Выберите дату и время</h1>
                </div>
                <div className="booking-container">
                    <Calendar currentMonth={currentMonth} currentYear={currentYear} selectedDay={selectedDay} today={today} onPrevMonth={handlePrevMonth} onNextMonth={handleNextMonth} onDayClick={handleDayClick} />
                    <TimeSlots selectedDay={selectedDay} selectedTime={selectedTime} onTimeClick={handleTimeClick} />
                </div>
                <BottomBar selectedDay={selectedDay} selectedTime={selectedTime} currentMonth={currentMonth} currentYear={currentYear} />
            </main>
            <Footer />
        </>
    );
}