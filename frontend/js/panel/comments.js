import {
    getAndShowComments,
    removeComment,
    showComment,
    acceptComment,
    rejectionComment,
} from "./funcs/comments.js"

window.removeComment = removeComment;
window.showComment = showComment;
window.acceptComment = acceptComment;
window.rejectionComment = rejectionComment;

window.addEventListener('load', () => {
    getAndShowComments();
})