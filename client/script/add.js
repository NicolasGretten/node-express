// récupération de toutes les musiques pour l'id de la nouvelle
let arrayLength = 0;
let myHeaders = new Headers();
let url = '/api/music';
let options ={
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};

fetch(url, options)
    .then((res) =>{
        if(res.ok) {
            return res.json();
        }
    })
    .catch((err)=> {
        console.log(err)
    })
    .then((response) => {
        arrayLength = response.length;
    })


function addMusic() {
    let name = document.querySelector('#name');
    let genre = document.querySelector('#genre');
    let album = document.querySelector('#album');
    let pays = document.querySelector('#pays');
    let yt = document.querySelector('#youtubeUrl');
    let artist = document.querySelector('#artist');
    let thumb = document.querySelector('#thumb');

    let data = {
        id: `music_${arrayLength+1}`,
        name: name.value,
        genre: genre.value,
        pays: pays.value,
        thumb: thumb.value,
        yt: yt.value,
        artist: artist.value,
        album: album.value,
    };

    let options = {
        method: 'POST',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }
    fetch('/api/music', options)
        .then((res) => {
            name.value = '';
            genre.value = '';
            pays.value = '';
            yt.value = '';
            album.value = '';
            artist.value = '';
            thumb.value = '';
            return res.json();
        })
        .catch((error) => {
            console.log(error);
        })
}

let add = document.querySelector('#addMusic');

add.addEventListener('click', ()=>{
    addMusic();
})