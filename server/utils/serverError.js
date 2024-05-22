export default function(response) {
    response.status(500).json({ message: 'На сервере произошла ошибка. Попробуйте позже.' });
}