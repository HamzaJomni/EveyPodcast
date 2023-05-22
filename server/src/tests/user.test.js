let chai=require("chai");
let chaiHttp=require("chai-http");
const { describe } = require("mocha");
const expect = chai.expect;
const User  = require('../src/database/model/user').User;
const bcrypt = require('bcrypt');
let server=require("../api");
const { blockUser } = require('../src/controllers/user.controller'); // Assurez-vous que le chemin est correct



//Assertion Style
chai.should();
chai.use(chaiHttp);
describe('Test user api ',()=>{
/*Test the Get Route */
describe("Get user profile from users/user/profile",()=>{

it("it should get the user profile ",(done)=>{
    chai.request(server)
    .get("/users/user/profile")
    .end((err,response)=>{
        response.should.have.status(200);
        
        done();
    })
})
})

});
//test du blocage d'un utlisateur 
describe('blockUser', () => {
    it('should block a user', async () => {
      const user = await User.create({ name: 'John Doe', status: 'active',email:"test@gmail.com",password:'123456' });
      const req = { params: { id: user.id } };
      const res = { send: () => {} };
  
      await blockUser(req, res);
  
      const updatedUser = await User.findByPk(user.id);
      expect(updatedUser.status).to.equal('blocked');
    });
  
    it('should return a 404 error if the user is not found', async () => {
      const req = { params: { id: 999 } };
      const res = {
        status: (statusCode) => {
          expect(statusCode).to.equal(404);
          return res;
        },
        send: (message) => {
          expect(message).to.equal('User not found');
        },
      };
      await blockUser(req, res);
    });
  
    it('should return a 500 error if an error occurs', async () => {
      const req = { params: { id: 'invalid' } };
      const res = {
        status: (statusCode) => {
          expect(statusCode).to.equal(500);
          return res;
        },
        send: (message) => {
          expect(message).to.equal('An error occurred while blocking the user');
        },
      };
  
      await blockUser(req, res);
    });
  });