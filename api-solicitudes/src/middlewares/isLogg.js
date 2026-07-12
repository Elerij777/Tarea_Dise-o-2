
export const log = (req, res, next) => {
    const fecha = new Date().toISOString();
    console.log(`[${fecha}] ${req.method} - ${req.url} - Body: ${JSON.stringify(req.body)}`);
    next();
};