import config from 'config';
import Cookies from "universal-cookie";
import { authHeader } from '../_helpers';

export const userService = {
    login,
    logout,
    register,
    getAll,
    getAllTags,
    getAllViews,
    getAllVotes,
    getAllNotes,
    getById,
    update,
    editNote,
    addNote,
    getAllClasses,
    deleteNote,
    delete: _delete
};

function login(email, password) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    };

    return fetch(`${config.apiUrl}/auth/login`, requestOptions)
        .then(handleResponse)
        .then(user => {
            // login successful if there's a jwt token in the response
            if (user.token) {
                // store user details and jwt token in local storage to keep user logged in between page refreshes
                const cookies = new Cookies();
                cookies.set("user_token",user.token,{path:'http://localhost:8080/'});
                localStorage.setItem('user', JSON.stringify(user));
            }

            return user;
        });
}

function logout() {
    // remove user from local storage to log user out
    const cookies = new Cookies();
    cookies.remove("user_token",{path:'http://localhost:8080/'});
    localStorage.removeItem('user');
}

function getAll() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/logins`, requestOptions).then(handleResponse);
}
function getAllTags() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/tags`, requestOptions).then(handleResponse);
}
function getAllViews() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/views`, requestOptions).then(handleResponse);
}
function getAllVotes() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/votes`, requestOptions).then(handleResponse);
}
function getAllNotes() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/notes`, requestOptions).then(handleResponse);
}
function getAllClasses() {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/class`, requestOptions).then(handleResponse);
}
function getById(id) {
    const requestOptions = {
        method: 'GET',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function register(user) {
    const requestOptions = {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/auth/register`, requestOptions).then(handleResponse);
}

function update(user) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
    };

    return fetch(`${config.apiUrl}/users/${user.id}`, requestOptions).then(handleResponse);;
}
function addNote(note) {
    const requestOptions = {
        method: 'POST',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(note)
    };

    return fetch(`${config.apiUrl}/notes/`, requestOptions).then(handleResponse);;
}
function editNote(note) {
    const requestOptions = {
        method: 'PUT',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(note)
    };

    return fetch(`${config.apiUrl}/notes/${note.id}`, requestOptions).then(handleResponse);;
}
function deleteNote(note) {
    const requestOptions = {
        method: 'DELETE',
        headers: { ...authHeader(), 'Content-Type': 'application/json' },
        body: JSON.stringify(note)
    };

    return fetch(`${config.apiUrl}/notes/${note.id}`, requestOptions).then(handleResponse);;
}
// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
    const requestOptions = {
        method: 'DELETE',
        headers: authHeader()
    };

    return fetch(`${config.apiUrl}/users/${id}`, requestOptions).then(handleResponse);
}

function handleResponse(response) {
    return response.text().then(text => {
        if (text === "Unauthorized") {
            const data = {error: "UnAuthorized"};
            logout();
            return Promise.reject(data.error);
        }
        const data = text && JSON.parse(text);

        if (!response.ok) {
            const error = (data && data.error) || response.statusText;
            return Promise.reject(error);
        }
        return data;
    });
}
