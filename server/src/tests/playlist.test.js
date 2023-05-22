const assert = require('assert');
const sinon = require('sinon');
const { getAllPlaylist } = require('../controllers/playlist.controller');
const Playlist = require('../database/model/playlist').Playlist; // Importer le modèle Playlist

describe('getAllPlaylist', function() {
  it('should return all playlists', async function() {
    const playlists = [{ id: 1, name: 'Musique pour la route' }, { id: 2, name: 'Podcasts à écouter' }];
    // Créer un stub pour la méthode Playlist.findAll()
    const findAllStub = sinon.stub(Playlist, 'findAll').resolves(playlists);
    // Créer des objets fictifs pour les requêtes et les réponses
    const req = {};
    const res = { json: sinon.spy() };
    // Appeler la fonction getAllPlaylist avec les objets fictifs
    await getAllPlaylist(req, res);
    // Vérifier si la méthode Playlist.findAll() a été appelée une fois
    assert(findAllStub.calledOnce);
    // Vérifier si la méthode res.json() a été appelée avec les playlists retournées
    assert(res.json.calledOnceWith(playlists));
    // Restaurer le stub pour Playlist.findAll()
    findAllStub.restore();
  });

  it('should return an error if the server encounters an error', async function() {
    const errorMessage = 'Erreur serveur';
    // Créer un stub pour la méthode Playlist.findAll() qui renvoie une erreur
    const findAllStub = sinon.stub(Playlist, 'findAll').throws(errorMessage);
    // Créer des objets fictifs pour les requêtes et les réponses
    const req = {};
    const res = { status: sinon.stub().returnsThis(), send: sinon.spy() };
    // Appeler la fonction getAllPlaylist avec les objets fictifs
    await getAllPlaylist(req, res);
    // Vérifier si la méthode Playlist.findAll() a été appelée une fois
    assert(findAllStub.calledOnce);
    // Vérifier si la méthode res.status() et res.send() ont été appelées avec le message d'erreur
    assert(res.status.calledOnceWith(500));
    assert(res.send.calledOnceWith(errorMessage));
    // Restaurer le stub pour Playlist.findAll()
    findAllStub.restore();
  });
});
