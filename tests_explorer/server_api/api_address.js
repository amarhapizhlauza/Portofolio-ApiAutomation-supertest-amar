const httpCaller = require('supertest');
const serverAPI = httpCaller(process.env.BASE_URL);

// Create Address
function createAddress(idContact, bodyRequestData) {
    return serverAPI.post(`/api/contacts/${idContact}/addresses`)
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json')
        .set('authorization', 'Bearer ' + global.token)
        .send(bodyRequestData);
}

// Get Address
function getAddress(idContact) {
    return serverAPI.get(`/api/contacts/${idContact}/addresses`)
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json')
        .set('authorization', 'Bearer ' + global.token);
}

// Get Address Id
function getAddressId(idContact, idAddress) {
    return serverAPI.get(`/api/contacts/${idContact}/addresses/${idAddress}`)
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json')
        .set('authorization', 'Bearer ' + global.token);
}

// Update Address
function updateAddress(idContact, idAddress, bodyRequestData) {
    return serverAPI.put(`/api/contacts/${idContact}/addresses/${idAddress}`)
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json')
        .set('authorization', 'Bearer ' + global.token)
        .send(bodyRequestData);
}

// Delete Address
function deleteAddress(idContact, idAddress) {
    return serverAPI.delete(`/api/contacts/${idContact}/addresses/${idAddress}`)
        .set('Connection', 'keep-alive')
        .set('Content-type', 'application/json')
        .set('authorization', 'Bearer ' + global.token)
}

module.exports = {
    createAddress,
    getAddress,
    getAddressId,
    updateAddress,
    deleteAddress
};


