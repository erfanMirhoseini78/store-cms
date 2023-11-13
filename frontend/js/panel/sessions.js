import {
    getAndShowSessions,
    editSession,
    removeSession,
    createSession,
} from "./funcs/sessions.js";

window.editSession = editSession;
window.removeSession = removeSession;

window.addEventListener('load', () => {
    getAndShowSessions();
})