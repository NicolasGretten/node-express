let myHeaders = new Headers();

let url = window.location.search;
const urlParams = new URLSearchParams(url);

let musicId = urlParams.get('id');

let options = {
    method: 'GET',
    headers: myHeaders,
    mode: 'cors',
    cache: 'default'
};

let modify = $('#modify');
fetch(`/api/music/${musicId}`, options)
    .then((res) => {
        if (res.ok) {
            return res.json();
        }
    })
    .catch((err) => {
        console.log(err)
    })
    .then((response) => {
        modify.append(
            `<form class="needs-validation" novalidate>
        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="name">Titre</label>
                <input type="text" class="form-control" id="name" value="${response.name}"  required>
            </div>
            <div class="form-group col-md-3">
                <label for="genre">Genre</label>
                <input type="text" class="form-control" id="genre" value="${response.genre}"  required>
            </div>
            <div class="form-group col-md-3">
                <label for="album">Album</label>
                <input type="text" class="form-control" id="album" value="${response.album}"  required>
            </div>
            <div class="form-group col-md-6">
                <label for="pays">Pays</label>
                <input type="text" class="form-control" id="pays" value="${response.pays}"  required>
            </div>
            <div class="form-group col-md-6">
                <label for="youtubeUrl">Youtube Url</label>
                <input type="url" class="form-control" id="youtubeUrl" value="${response.yt}"  required>
            </div>
        </div>

        <div class="form-row">
            <div class="form-group col-md-6">
                <label for="artist">Artiste</label>
                <input type="text" class="form-control" id="artist" value="${response.artist}"  required>
            </div>
            <div class="form-group col-md-6">
                <label for="thumb">Thumbnail Url</label>
                <input type="url" class="form-control" id="thumb"  value="${response.thumb}" required>
            </div>
        </div>
    </form>
<button class="btn btn-primary" id="update">Modifier</button>
`
        );

        let btnUpdate = document.querySelector('#update');

        btnUpdate.addEventListener('click', ()=>{
            update();
        });
    })

function update(){

    let name = document.querySelector('#name');
    let genre = document.querySelector('#genre');
    let album = document.querySelector('#album');
    let pays = document.querySelector('#pays');
    let yt = document.querySelector('#youtubeUrl');
    let artist = document.querySelector('#artist');
    let thumb = document.querySelector('#thumb');

    let data = {
        id: musicId,
        name: name.value,
        genre: genre.value,
        pays: pays.value,
        thumb: thumb.value,
        yt: yt.value,
        artist: artist.value,
        album: album.value,
    };

    let options = {
        method: 'PATCH',
        body: JSON.stringify(data),
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    }

    fetch(`/api/music/${musicId}`, options)
        .then((res) => {
            window.location.reload();
            return res.json();
        })
        .catch((error) => {
            console.log(error);
        })
}

