import { database } from './database.js';

const DELAY_MS = 800; // Задержка 800мс, чтобы мы увидели "Загрузку..."

export default function myApiPlugin() {
    return {
        name: 'my-api-plugin',
        configureServer(server) {
            server.middlewares.use(async (req, res, next) => {
                if (!req.url.startsWith('/api/')) return next();

                await new Promise(resolve => setTimeout(resolve, DELAY_MS));

                const url = new URL(req.url, `http://${req.headers.host}`);
                
                if (url.pathname === '/api/booking/today') {
                    res.setHeader('Content-Type', 'application/json');
                    return res.end(JSON.stringify(database.today));
                }

                if (url.pathname === '/api/slots') {
                    const day = url.searchParams.get('day');
                    const month = url.searchParams.get('month');
                    const year = url.searchParams.get('year');
                    
                    const dateKey = `${year}-${String(Number(month) + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
                    
                    res.setHeader('Content-Type', 'application/json');
                    return res.end(JSON.stringify({
                        date: dateKey,
                        slots: database.slots[dateKey] || [] 
                    }));
                }

                res.statusCode = 404;
                res.end(JSON.stringify({ error: 'Not found' }));
            });
        }
    };
}