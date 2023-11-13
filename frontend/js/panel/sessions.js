import {
    getAndShowSessions,
    editSession,
    removeSession,
} from "./funcs/sessions.js";

window.editSession = editSession;
window.removeSession = removeSession;

window.addEventListener('load', () => {
    getAndShowSessions();
})