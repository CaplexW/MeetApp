import sendAuthError from "../utils/sendAuthError.js";
import tokenService from "../services/tokenService.js";

export function checkAuth(req, res, next) {
    if (req.method === 'OPTIONS') return next();
    try {
        const token = req.headers.authorization.split(' ')[1];
        if (!token) return sendAuthError(res);

        const data = tokenService.validateAccess(token);
        if (data) req.user = data;

        next();
    } catch (e) {
        return sendAuthError(res);
    }
}