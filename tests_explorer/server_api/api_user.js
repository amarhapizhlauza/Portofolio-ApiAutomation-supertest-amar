const httpCaller = require('supertest');
const serverAPI = httpCaller(process.env.BASE_URL);

// Login
function login(username, password) {
    return serverAPI.post('/api/users/login')
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json')
        .send({                                                                         // Sesuaikan parameter nya
            "username": username,
            "password": password
        })
}

// Logout
function logout() {
    return serverAPI.delete(`/api/users/logout`)
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json')
        .set('authorization', 'Bearer ' + global.token)
}

// Create User
function createUser(username, password, name) {
    return serverAPI.post('/api/users')
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json')
        .set('authorization', 'Bearer ' + global.token)
        .send({                                                                         // Sesuaikan parameter nya
            "username": username,
            "password": password,
            "name": name
        })
}

// Get Current User
function getCurrentUser(inputNama) {
    return serverAPI.get(`/api/users/current`)
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json')
        .set('authorization', 'Bearer ' + global.token);
}

// Update User
function updateUser(name, password) {
    return serverAPI.patch(`/api/users/current`)
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json')
        .set('authorization', 'Bearer ' + global.token)
        .send({                                                                         // Sesuaikan parameter nya
            "name": name,
            "password": password
        })
}

module.exports = {
    login,
    logout,
    createUser,
    getCurrentUser,
    updateUser
};


