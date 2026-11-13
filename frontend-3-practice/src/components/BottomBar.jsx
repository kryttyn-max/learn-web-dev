import { DAYS_OF_WEEK, MONTHS_GENITIVE } from '../data/dateUtils';

export default function BottomBar({ selectedDay, selectedTime, currentMonth, currentYear }) {
    if (selectedDay === null) return <div className="bottom-bar">Дата и время не выбраны</div>;
    const date = new Date(currentYear, currentMonth, selectedDay);
    let text = `${DAYS_OF_WEEK[date.getDay()]}, ${selectedDay} ${MONTHS_GENITIVE[currentMonth]} ${currentYear}`;
    if (selectedTime) text += ` • ${selectedTime}`;
    return <div className="bottom-bar">{text}</div>;
}