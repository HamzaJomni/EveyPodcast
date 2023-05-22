
let chai=require("chai");
let chaiHttp=require("chai-http");
const { describe } = require("mocha");
const expect = chai.expect;
const Podcast  = require('../database/model/podcast').Podcast;
const request = require('supertest');
let server=require("../../api");
//Assertion Style
chai.should();
chai.use(chaiHttp);

describe('Test get podcast by id ',()=>{

    //testing the get podcast by id 
    it("it should get the podcast by id ",(done)=>{
        const podcastid=1;
        chai.request(server)
        .get("/podcast/podcast/"+podcastid)
        .end((err,response)=>{
            response.should.have.status(200);
            response.body.should.be.a('object');
            response.body.should.have.property("id").eq(1);
           done();
        });
    
    })
    it("should display an error message when an invalid ID is provided", (done) => {
      const podcastId = 999;
      chai.request(server)
        .get(`/podcast/podcast/${podcastId}`)
        .end((err, response) => {
          response.should.have.status(404);
          response.body.should.have.property('message').equal('Podcast not found');
          done();
        });
    });  
});


/*
    describe('GET /topics/:topic/podcasts', () => {
        it('devrait retourner les 6 derniers podcasts pour le topic spécifié', (done) => {
          const topic = 'Technologie'; // Spécifier le topic pour le test
      
          request(server)
            .get(`/podcast/podcasts/${topic}`)
            .end((err, res) => {
              expect(res.body).to.be.an('array'); // Vérifier que la réponse est un tableau
              expect(res.body.length).to.equal(6); // Vérifier que le tableau contient 6 éléments
              expect(res.body[0]).to.have.property('id'); // Vérifier que chaque élément a une propriété 'id'
              expect(res.body[0]).to.have.property('title'); // Vérifier que chaque élément a une propriété 'title'
              expect(res.body[0]).to.have.property('description'); // Vérifier que chaque élément a une propriété 'description'
              
              done(); // Signaler que le test est terminé
            });
        });
      });

         /******************** Testing counting view  
    describe('Podcast API - Count View', () => {
      let podcast;
    
      beforeEach(async () => {
        // create a test podcast
        podcast = await Podcast.create({
          title: 'Keke Palmer',
          description: 'Keke Palmer has questions for days, about everything under the sun. From the existential to the inconsequential. From pop culture to pop science. From the meaning of life to the meaning of W.A.P. From life in outer space to “Where the eff is Tom from MySpace?“ And everything in between. Because Baby, this is Keke Palmer, and she is here for All. Of. It.',
          author:"'Keke Palmer'",
          topic:"'News and Politics'",
          status:"active",
          imageUrl:"https://evey-podcasts.s3.eu-west-3.amazonaws.com/podcast_images/1678797343479-podcastImage.jpeg",
          views: 71
        });
      });
    
      afterEach(async () => {
        await podcast.destroy();
      });
      describe('POST /podcasts/:id/countview', () => {
        it('should increment the view count of the podcast', async () => {
          const res = await chai.request(server)
            .post(`/podcast/podcasts/${podcast.id}/view`);
    
          expect(res).to.have.status(200);
          expect(res.body).to.have.property('message').to.equal('View count incremented successfully');
          expect(podcast.views).to.equal(71);
        });
    
        it('should return an error if the podcast is not found', async () => {
          const res = await chai.request(server)
            .post('/podcast/podcasts/999/view');
          expect(res).to.have.status(404);
          expect(res.body).to.have.property('message').to.equal('Podcast not found');
        //  expect(podcast.views).to.equal(71);
        });
      });
    });

    describe('getMostViewdPodcaasts', () => {
      it('devrait renvoyer les 5 podcasts les plus vus', (done) => {
        chai.request(server)
          .get('/podcast/most-viewed-podcasts')
          .end((err, res) => {
            res.should.have.status(200);
            res.body.should.be.an('array').with.lengthOf(5);
            for (let i = 0; i < res.body.length; i++) {
              res.body[i].should.have.property('title');
              res.body[i].should.have.property('views');
            }
            done();
          });
      });
    }); 
      
  */  
    
/*
const chai = require('chai');
const chaiHttp = require('chai-http');
const sinon = require('sinon');
const app = require("../../api");
const Podcast = require('../database/model/podcast').Podcast;

chai.use(chaiHttp);
const expect = chai.expect;

describe('GET /podcast/podcasts', () => {
  afterEach(() => {
    sinon.restore();
  });

  it('should return all podcasts', async () => {

    const expectedPodcasts = [
    { id: 1, title: 'Baby, This is Keke Palmer', author: 'Keke Palmer' },
    { id: 7, title: 'News and Politics Podcast 1', author: 'Author 1' },
  ];

    // Stub the findAll method of the Podcast model to return the expected podcasts
    const stub = sinon.stub(Podcast, 'findAll').returns(Promise.resolve(expectedPodcasts));

    const res = await chai.request(app).get(`/podcast/podcasts`);
    expect(res).to.have.status(200);
    expect(res.body).to.deep.equal(expectedPodcasts);

    // Check that the method was called once
    expect(stub.calledOnce).to.be.true;
  });

  it('should return a server error if an error occurs', async () => {
    
    // Stub the findAll method of the Podcast model to throw an error
    const stub = sinon.stub(Podcast, 'findAll').throws(new Error('Database connection error'));

    const res = await chai.request(app).get(`/podcast/podcasts`);
    expect(res).to.have.status(500);
    expect(res.text).to.equal('Erreur serveur');

    // Check that the method was called once
    expect(stub.calledOnce).to.be.true;
  });
});
*/

/*
const assert = require('assert');
const sinon = require('sinon');
const { deletePodcast } = require('../controllers/podcast.controller');

describe('deletePodcast', function() {
  it('should delete a podcast and associated tracks', async function() {
    // Créer un podcast fictif avec un ID et une URL d'image pour les tests
    const podcast = { id: 1000, imageUrl: 'https://test-image-url.com/image.jpg' };

    // Stub pour la fonction de recherche du podcast par ID
    const findByPkStub = sinon.stub().resolves(podcast);

    // Stub pour la fonction de suppression de tous les tracks associés au podcast
    const destroyStub = sinon.stub().resolves(1);
    const trackDestroyStub = sinon.stub().returns({ destroy: destroyStub });
    const Track = { destroy: trackDestroyStub };

    // Stub pour la fonction de suppression du podcast
    const podcastDestroyStub = sinon.stub().resolves(1);
    const Podcast = { destroy: podcastDestroyStub };

    // Stub pour la fonction de copie de l'image dans AWS S3
    const copyObjectStub = sinon.stub().resolves({ promise: () => Promise.resolve() });
    const s3Stub = { copyObject: copyObjectStub };

    // Créer une requête fictive avec l'ID du podcast à supprimer
    const req = { params: { podcast_id: 1000 } };

    // Créer une réponse fictive avec une fonction spy
    const res = { json: sinon.spy(), status: sinon.stub().returnsThis() };

    // Appeler la fonction deletePodcast avec les stubs et les requêtes fictives
    await deletePodcast(req, res, () => {}, s3Stub, Podcast, Track);

    // Vérifier si la fonction de recherche du podcast a été appelée avec le bon ID
    assert(findByPkStub.calledOnceWith(1000));

    // Vérifier si la fonction de suppression de tous les tracks associés au podcast a été appelée avec le bon ID
    assert(trackDestroyStub.calledOnceWith({ where: { podcastId: 1000 } }));

    // Vérifier si la fonction de suppression du podcast a été appelée avec le bon ID
    assert(podcastDestroyStub.calledOnceWith({ where: { id: 1000 } }));

    // Vérifier si la fonction de copie de l'image a été appelée avec les bons paramètres
    assert(copyObjectStub.calledOnceWith({
      Bucket: 'evey-podcasts',
      CopySource: '/evey-podcasts/podcast_images/image.jpg',
      Key: 'podcast_deleted/image.jpg',
    }));

    // Vérifier si la réponse a été envoyée avec le message de succès
    assert(res.status.calledWith(200));
    assert(res.json.calledOnceWith({ message: 'Podcast and associated tracks deleted successfully' }));
  });
})




const assert = require('assert');
const sinon = require('sinon');
const { postPodcast } = require('../controllers/podcast.controller'); // importer la fonction postPodcast depuis son fichier

describe('postPodcast', function() {
  it('should create a new podcast', async function() {
    // Créer des stubs pour les fonctions externes utilisées dans la fonction postPodcast
    const s3UploadStub = sinon.stub().returns({ promise: () => Promise.resolve({ Location: 'test-location' }) });
    const s3Stub = { upload: s3UploadStub };
    const PodcastCreateStub = sinon.stub().resolves({ id: 1 });

    // Créer des objets de requête et de réponse fictifs pour passer à la fonction postPodcast
    const req = {
      file: { path: '/', originalname: 'image.jpg' },
      body: { title: 'test-title', description: 'test-description', author: 'Luck Skywolker', topic: 'other', userId: 1 },
    };
    const res = { json: sinon.spy() };
    const next = sinon.spy();

    // Appeler la fonction postPodcast avec les arguments fictifs et les stubs
    await postPodcast(req, res, next, s3Stub, PodcastCreateStub);

    // Vérifier si les fonctions stub ont été appelées avec les arguments attendus
    assert(s3UploadStub.calledOnce);
    assert(PodcastCreateStub.calledOnceWith(req.body));

    // Vérifier si la réponse a été envoyée avec le nouveau podcast créé
    assert(res.json.calledOnceWith({ id: 1 }));
  });
});
*/


/*
const assert = require('assert');
const sinon = require('sinon');

const { postPodcast } = require('../controllers/podcast.controller');

describe('postPodcast', () => {
  it('should create a new podcast and return it in the response', async () => {
    const req = {
      file: {
        path: 'image.jpg',
        originalname: 'image.jpg',
      },
      body: {
        title: 'Test Podcast',
        description: 'This is a test podcast',
        author: 'Luck Skywolker',
        topic: 'other',
        userId: '3',
      },
    };
    const res = {
      json: sinon.spy(),
    };
    const next = sinon.spy();
    const s3 = {
      upload: sinon.stub().returns({
        promise: sinon.stub().resolves({
          Location: `https://evey-podcasts.s3.eu-west-3.amazonaws.com/podcast_images/${Date.now()}-image.jpg`,
        }),
      }),
    };

    await postPodcast(req, res, next, s3);

    sinon.assert.calledOnce(res.json);
    sinon.assert.calledWith(res.json, sinon.match.has('title', 'Test Podcast'));
    sinon.assert.calledWith(res.json, sinon.match.has('description', 'This is a test podcast'));
    sinon.assert.calledWith(res.json, sinon.match.has('author', 'Luck Skywolker'));
    sinon.assert.calledWith(res.json, sinon.match.has('topic', 'other'));
    sinon.assert.calledWith(res.json, sinon.match.has('userId', '3'));
    sinon.assert.calledWith(res.json, sinon.match.has('imageUrl'));
    sinon.assert.notCalled(next);

    sinon.assert.calledOnce(s3.upload);
    sinon.assert.calledWith(s3.upload, sinon.match({
      Key: sinon.match.string,
      Body: sinon.match.instanceOf(Buffer),
    }));
  });
});
*/

