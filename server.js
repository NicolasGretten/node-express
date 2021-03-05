const express = require('express');
const Musics = require('./data/musics');
const bodyParser = require('body-parser');

let app = express();

app.listen(3000, () => {
    console.log('listening on port 3000');
});

app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/pages', express.static('./client/pages'));
app.use('/script', express.static('./client/script'));
app.use('/style', express.static('./client/style'));
app.use('/images', express.static('./client/images'));

/**
 * Routes
 */

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/client/index.html');
});
/**
 * API
 */
app.get('/api/music', (req, res) => {
    try {
        res.send(Musics);
    }
    catch(error){
        res.send(500)
    }

});

app.post('/api/music', (req, res) => {
    try {
        console.log(req.body);
        Musics.push(req.body);
        return res.sendStatus(200);
    }
    catch(error){
        res.send(500)
    }
});

app.patch('/api/music/:id', (req, res) => {
    try {
        let musicToUpdate = Musics.find(element => element.id ===req.params.id);
        musicToUpdate.name = req.body.name;
        musicToUpdate.genre = req.body.genre;
        musicToUpdate.pays = req.body.pays;
        musicToUpdate.thumb = req.body.thumb;
        musicToUpdate.yt = req.body.yt;
        musicToUpdate.artist = req.body.artist;
        musicToUpdate.album = req.body.album;
        return res.sendStatus(200);
    }
    catch(error){
        res.send(500)
    }
});

app.get('/api/music/:id', (req, res) => {
    try{
        res.send(Musics.find(element => element.id ===req.params.id));
    }
    catch(error) {
        res.send(500)
    }
});

app.delete('/api/music/:id', (req, res) => {
    try{
        let music = Musics.findIndex(element => element.id ===req.params.id)
        Musics.splice(music, 1);
        return res.sendStatus(200);
    }
    catch(error){
        res.send(500)
    }
});