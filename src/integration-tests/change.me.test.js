const chai = require('chai');
const sinon = require('sinon');
const chaiHttp = require('chai-http');

const server = require('../api/app');

const { MongoClient } = require('mongodb');
const { MongoMemoryServer } = require('mongodb-memory-server');

chai.use(chaiHttp);

const { expect } = chai;

describe('POST /users', () => {
  describe('quando é criado com sucesso', () => {

    let response = {};
      const DBServer = new MongoMemoryServer();
  
      before(async () => {
        const URLMock = await DBServer.getUri();
        const connectionMock = await MongoClient.connect(URLMock,
          { useNewUrlParser: true, useUnifiedTopology: true }
        );
  
        sinon.stub(MongoClient, 'connect')
          .resolves(connectionMock);
        
        response = await chai.request(server)
          .post('/users')
          .send({
            'name': 'Erick Jacquin',
            'email': 'erickjaquin@gmail.com',
            'password': '12345678'
          });
      });
  
      after(async () => {
          MongoClient.connect.restore();
          await DBServer.stop();
      })
  
      it('retorna o código de status 201', () => {
          expect(response).to.have.status(201);
      });
      it('retorna um objeto', () => {
        expect(response.body).to.be.a('object');
      });
  
      it('o objeto possui a propriedade message', () => {
          expect(response.body)
            .to.have.property('user');
      });
  
      it('a propriedade message possui o texto Novo usuário criado com sucesso', 
        () => {
          expect(response.body.user.name).to.be.equal('Erick Jacquin');
          expect(response.body.user.email).to.be.equal('erickjaquin@gmail.com');
          expect(response.body.user.password).to.be.equal('12345678');
        }
      );
  });
});
