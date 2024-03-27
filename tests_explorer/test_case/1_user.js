require(`${process.cwd()}/tests_explorer/base`)
const api_user = require(process.cwd() + '/tests_explorer/server_api/api_user');
const db = require(`${process.cwd()}/tests_explorer/util/database`);

describe("Scenario User", async () => {
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

    it("Get Current User", async () => {
        let response = await api_user.getCurrentUser();
        // console.log(response.body)
        expect(response.status).to.equal(200);
        expect(response.body.data.username).to.equal(process.env.USER);
    });

    it("Update User", async () => {
        let response = await api_user.updateUser("Amar HL2", process.env.PASSWORD);
        // console.log(response.body)
        expect(response.status).to.equal(200);
    });

});