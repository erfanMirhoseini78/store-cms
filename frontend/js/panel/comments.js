import {
    getAndShowComments,
    removeComment,
} from "./funcs/comments.js"

window.removeComment = removeComment;

window.addEventListener('load', () => {
    getAndShowComments();
})