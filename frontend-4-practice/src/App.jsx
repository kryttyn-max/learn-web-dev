import { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import Calendar from './components/Calendar';
import TimeSlots from './components/TimeSlots';
import BottomBar from './components/BottomBar';
import { fetchToday, fetchSlots } from './api';

export default function App() {
    const [today, setToday] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
    const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
    
    const [selectedDay, setSelectedDay] = useState(null);
    const [selectedTime, setSelectedTime] = useState(null);
    const [slots, setSlots] = useState([]);

    const [loadingToday, setLoadingToday] = useState(true);
    const [errorToday, setErrorToday] = useState(null);

    const [loadingSlots, setLoadingSlots] = useState(false);
    const [errorSlots, setErrorSlots] = useState(null);

    // 1. Загружаем "сегодня"
    useEffect(() => {
        async function loadToday() {
            try {
                setLoadingToday(true);
                const data = await fetchToday();
                setToday(data);
                setCurrentMonth(data.month);
                setCurrentYear(data.year);
                setSelectedDay(data.day);
            } catch (err) {
                setErrorToday(err.message);
            } finally {
                setLoadingToday(false);
            }
        }
        loadToday();
    }, []);

    // 2. Загружаем слоты при смене дня
    useEffect(() => {
        if (selectedDay === null || !today) return;

        let isMounted = true; // Защита от гонок

        async function loadSlots() {
            try {
                setLoadingSlots(true);
                setErrorSlots(null);
                setSlots([]); 
                
                const data = await fetchSlots(selectedDay, currentMonth, currentYear);
                
                if (isMounted) {
                    const availableSlots = data.slots.filter(slot => slot.available);
                    setSlots(availableSlots);
                }
            } catch (err) {
                if (isMounted) setErrorSlots(err.message);
            } finally {
                if (isMounted) setLoadingSlots(false);
            }
        }
        loadSlots();

        return () => { isMounted = false; };
    }, [selectedDay, currentMonth, currentYear, today]);

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

    if (loadingToday) return <div className="loading-screen">Загрузка...</div>;
    if (errorToday) return <div className="error-screen">Ошибка: {errorToday}</div>;

    return (
        <>
            <Header />
            <main className="main-content">
                <div className="page-header">
                    <p className="breadcrumbs">Главная / Мастера / Услуги / <span>Календарь</span></p>
                    <h1>Выберите дату и время</h1>
                </div>
                <div className="booking-container">
                    <Calendar 
                        currentMonth={currentMonth} currentYear={currentYear} 
                        selectedDay={selectedDay} today={new Date(today.year, today.month, today.day)} 
                        onPrevMonth={handlePrevMonth} onNextMonth={handleNextMonth} onDayClick={handleDayClick} 
                    />
                    <TimeSlots 
                        loading={loadingSlots} error={errorSlots} 
                        slots={slots} selectedTime={selectedTime} onTimeClick={handleTimeClick} 
                    />
                </div>
                <BottomBar selectedDay={selectedDay} selectedTime={selectedTime} currentMonth={currentMonth} currentYear={currentYear} />
            </main>
            <Footer />
        </>
    );
}