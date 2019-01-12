const describe = require("mocha");

describe('homepage', ()=> {
    it('should respond to GET',  ()=> {
        superagent
            .get('https://ketabot.herokuapp.com/api/v1/users')
            .end((res) => {
                expect(res.status).to.equal(200);
            })
    })
})