import { userConstants } from '../_constants';
import { userService } from '../_services';
import { alertActions } from './';
import { history } from '../_helpers';

export const userActions = {
    login,
    logout,
    register,
    getAll,
    getAllTags,
    getAllViews,
    getAllVotes,
    getAllNotes,
    getClasses,
    editNote,
    addNote,
    deleteNote,
    delete: _delete
};

function login(username, password) {
    return dispatch => {
        dispatch(request({ username }));

        userService.login(username, password)
            .then(
                user => { 
                    dispatch(success(user));
                    history.push('/');
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.LOGIN_REQUEST, user } }
    function success(user) { return { type: userConstants.LOGIN_SUCCESS, user } }
    function failure(error) { return { type: userConstants.LOGIN_FAILURE, error } }
}

function logout() {
    userService.logout();
    return { type: userConstants.LOGOUT };
}

function register(user) {
    return dispatch => {
        dispatch(request(user));

        userService.register(user)
            .then(
                user => { 
                    dispatch(success());
                    history.push('/login');
                    dispatch(alertActions.success('Registration successful'));
                },
                error => {
                    dispatch(failure(error.toString()));
                    dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.REGISTER_REQUEST, user } }
    function success(user) { return { type: userConstants.REGISTER_SUCCESS, user } }
    function failure(error) { return { type: userConstants.REGISTER_FAILURE, error } }
}
function addNote(note) {
    note.className = note.selected_class;
    return dispatch => {
        dispatch(request(note));
        userService.addNote(note)
            .then(
                user => { 
                    dispatch(success());
                    window.location.reload();
                },
                error => {
                    dispatch(failure(error.toString()));
                    //dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.NOTE_REQUEST, user } }
    function success(user) { return { type: userConstants.NOTE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.NOTE_FAILURE, error } }
}
function editNote(note) {
    return dispatch => {
        dispatch(request(note));
        userService.editNote(note)
            .then(
                user => { 
                    dispatch(success());
                    window.location.reload();
                },
                error => {
                    dispatch(failure(error.toString()));
                    //dispatch(alertActions.error(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.NOTE_REQUEST, user } }
    function success(user) { return { type: userConstants.NOTE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.NOTE_FAILURE, error } }
}
function deleteNote(note) {
    return dispatch => {
        dispatch(request(note));
        userService.deleteNote(note)
            .then(
                user => { 
                    dispatch(success());
                    window.location.reload();
                },
                error => {
                    dispatch(failure(error.toString()));
                }
            );
    };

    function request(user) { return { type: userConstants.NOTE_REQUEST, user } }
    function success(user) { return { type: userConstants.NOTE_SUCCESS, user } }
    function failure(error) { return { type: userConstants.NOTE_FAILURE, error } }
}


function getAll() {
    return dispatch => {
        dispatch(request());

        userService.getAll()
            .then(
                users => dispatch(success(users)),
                error => dispatch(failure(error.toString()))
            );
    };

    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(users) { return { type: userConstants.GETALL_SUCCESS, users } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}
function getAllTags() {
    return dispatch => {
        dispatch(request());

        userService.getAllTags()
            .then(
                tags => dispatch(success(tags)),
                error => dispatch(failure(error.toString()))
            );
    };
    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(tags) { return { type: userConstants.GETALL_SUCCESS, tags } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}

function getAllViews() {
    return dispatch => {
        dispatch(request());

        userService.getAllViews()
            .then(
                views => dispatch(success(views)),
                error => dispatch(failure(error.toString()))
            );
    };
    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(views) { return { type: userConstants.GETALL_SUCCESS, views } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}
function getAllVotes() {
    return dispatch => {
        dispatch(request());

        userService.getAllVotes()
            .then(
                votes => dispatch(success(votes)),
                error => dispatch(failure(error.toString()))
            );
    };
    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(votes) { return { type: userConstants.GETALL_SUCCESS, votes } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}
function getAllNotes() {
    return dispatch => {
        dispatch(request());

        userService.getAllNotes()
            .then(
                notes => dispatch(success(notes)),
                error => dispatch(failure(error.toString()))
            );
    };
    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(notes) { return { type: userConstants.GETALL_SUCCESS, notes } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}
function getClasses() {
    return dispatch => {
        dispatch(request());

        userService.getAllClasses()
            .then(
                classes => dispatch(success(classes)),
                error => dispatch(failure(error.toString()))
            );
    };
    function request() { return { type: userConstants.GETALL_REQUEST } }
    function success(classes) { return { type: userConstants.GETALL_SUCCESS, classes } }
    function failure(error) { return { type: userConstants.GETALL_FAILURE, error } }
}
// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    return dispatch => {
        dispatch(request(id));

        userService.delete(id)
            .then(
                user => dispatch(success(id)),
                error => dispatch(failure(id, error.toString()))
            );
    };

    function request(id) { return { type: userConstants.DELETE_REQUEST, id } }
    function success(id) { return { type: userConstants.DELETE_SUCCESS, id } }
    function failure(id, error) { return { type: userConstants.DELETE_FAILURE, id, error } }
}