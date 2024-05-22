export default function sendAuthError(responseObject) {
    return responseObject.status(401).json({ message: "Unauthorized" });
}