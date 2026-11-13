export const database = {
    today: { day: 12, month: 10, year: 2026 }, // 10 = Ноябрь
    slots: {
        '2026-11-12': [
            { time: '09:00', available: true }, { time: '09:30', available: true },
            { time: '10:00', available: false }, { time: '10:30', available: true },
            { time: '11:00', available: true }, { time: '11:30', available: false },
            { time: '12:00', available: true }, { time: '12:30', available: true }
        ],
        '2026-11-13': [
            { time: '09:00', available: false }, { time: '09:30', available: true },
            { time: '10:00', available: true }, { time: '10:30', available: true },
            { time: '11:00', available: false }, { time: '11:30', available: true },
            { time: '12:00', available: true }, { time: '12:30', available: false }
        ]
    }
};