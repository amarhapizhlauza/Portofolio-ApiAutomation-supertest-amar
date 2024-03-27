require(`${process.cwd()}/tests_explorer/base`)
const api_user = require(process.cwd() + '/tests_explorer/server_api/api_user');
const api_contact = require(process.cwd() + '/tests_explorer/server_api/api_contact');
const api_address = require(process.cwd() + '/tests_explorer/server_api/api_address');
const db = require(`${process.cwd()}/tests_explorer/util/database`);

const dataUpdateContact = require(process.cwd() + '/tests_explorer/data/updateContact.json');
const dataUpdateAddress = require(process.cwd() + '/tests_explorer/data/updateAddress.json');

describe("Scenario Contact Address", async () => {
    before(async () => {
        // Check Account
        let query = `Select * from users where username = '${process.env.USER}'`;
        let result = await db.query("localhost", "restful_api", query);
        // console.log(result)

        if (result.length != 0) {
            let response = await api_user.login(process.env.USER, process.env.PASSWORD);
            global.token = response.body.data.token;
            expect(response.status).to.equal(200);
        } 
        else {
            let response = await api_user.createUser(process.env.USER, process.env.PASSWORD, process.env.NAME);
            // console.log(response.body)
            expect(response.status).to.equal(201);

            response = await api_user.login(process.env.USER, process.env.PASSWORD);
            global.token = response.body.data.token;
            expect(response.status).to.equal(200);
        }
    })

    it("Create Contact", async () => {
        let requestData = {
            "first_name": "Amar",
            "last_name": "Hapizh Lauza",
            "email": "amarhapizhlauza@gmail.com",
            "phone": "089665662337"
          }
        let response = await api_contact.createContact(requestData);
        // console.log(response.body)
        global.idContact = response.body.data.id;
        expect(response.status).to.equal(201);
    });

    it("Create Address", async () => {
        let requestData = {
            "street": "Kuningan",
            "city": "Jakarta",
            "province": "DKI Jakarta",
            "country": "Indonesia",
            "postal_code": "12940"
          }
        let response = await api_address.createAddress(global.idContact, requestData);
        // console.log(response.body)
        global.idAddress = response.body.data.id;
        expect(response.status).to.equal(201);
        // expect(response.body.data.username).to.equal(process.env.USER);
    });

    it("Get Contact", async () => {
        let response = await api_contact.getContact();
        // console.log(response.body)
        expect(response.status).to.equal(200);
    });

    it("Get Contact Id", async () => {
        let response = await api_contact.getContactId(global.idContact);
        // console.log(response.body)
        expect(response.status).to.equal(200);
    });

    it("Update Contact", async () => {
        let response = await api_contact.updateContact(global.idContact, dataUpdateContact);
        console.log(response.body)
        expect(response.status).to.equal(200);
    });

    it("Get Address", async () => {
        let response = await api_address.getAddress(global.idContact);
        // console.log(response.body)
        expect(response.status).to.equal(200);
    });

    it("Get Address Id", async () => {
        let response = await api_address.getAddressId(global.idContact, global.idAddress);
        // console.log(response.body)
        expect(response.status).to.equal(200);
    });

    it("Update Address", async () => {
        let response = await api_address.updateAddress(global.idContact, global.idAddress, dataUpdateAddress);
        console.log(response.body)
        expect(response.status).to.equal(200);
    });

    it("Delete Address", async () => {
        let response = await api_address.deleteAddress(global.idContact, global.idAddress);
        // console.log(response.body)
        expect(response.status).to.equal(200);
    });

    it("Delete Contact", async () => {
        let response = await api_contact.deleteContact(global.idContact);
        // console.log(response.body)
        expect(response.status).to.equal(200);
    });



});