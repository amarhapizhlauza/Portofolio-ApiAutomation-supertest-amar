const httpCaller = require('supertest');
const serverAPI = httpCaller(process.env.BASE_URL);

// Create Contact
function createContact(bodyRequestData) {
    return serverAPI.post('/api/contacts')
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json')
        .set('authorization', 'Bearer ' + global.token)
        .send(bodyRequestData);
}

// Get Contact
function getContact({
    name = '',
    phone = '',
    email = '',
    size = '',
    page = ''
} = {} ) {
    return serverAPI.get(`/api/contacts?name=${name}&phone=${phone}&email=${email}&size=${size}&page=${page}`)
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json')
        .set('authorization', 'Bearer ' + global.token);
}

// Get Contact Id
function getContactId(idContact) {
    return serverAPI.get(`/api/contacts/${idContact}`)
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json')
        .set('authorization', 'Bearer ' + global.token);
}

// Update Contact
function updateContact(idContact, bodyRequestData) {
    return serverAPI.put(`/api/contacts/${idContact}`)
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json')
        .set('authorization', 'Bearer ' + global.token)
        .send(bodyRequestData);
}

// Delete Contact
function deleteContact(idContact) {
    return serverAPI.delete(`/api/contacts/${idContact}`)
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json')
        .set('authorization', 'Bearer ' + global.token)
}

module.exports = {
    createContact,
    getContact,
    getContactId,
    updateContact,
    deleteContact
};


