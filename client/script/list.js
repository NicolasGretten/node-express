class List  {
    generate(){
        let myHeaders = new Headers();
        let url = '/api/music';
        let options ={
            method: 'GET',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };

        let list = $('#list');
        fetch(url, options)
            .then((res) =>{
                if(res.ok) {
                    return res.json();
                }
            })
            .catch((err)=> {
                console.log(err)
            })
            .then((response) =>{
                response.forEach( e =>{
                    list.append(`<div class="card text-center m-3">
                             <div class="card-header h1">
                                    ${e.artist}
                               </div>
                                <div class="card-body">
                                    <a href="../pages/details.html?id=${e.id}" style="text-decoration:none"><h5 class="card-title">${e.name}</h5></a>
                                    <img class="image-thumb" src="${e.thumb}" alt=""/>
                                    <p class="card-text mt-2">Album : ${e.album}</p>
                                    <a href="${e.yt}" class="btn btn-primary">YouTube !</a>
                                </div>
                                <div class="card-footer text-muted">
                                    <a href="../pages/details.html?id=${e.id}" class="ml-2 float-right"><i class="bi bi-list text-primary"></i></a>
                                    <a href="../pages/modify.html?id=${e.id}" class="float-right"><i class="bi bi-pencil text-warning"></i></a>
                                    <button class="float-left btn" id="suppr_${e.id}"><i class="bi bi-trash text-danger"></i></button>
                                </div>
                            </div>`);

                    let btnSupr = document.querySelector('#suppr_' + e.id);
                    btnSupr.addEventListener('click', () => {
                        this.suppr(e.id);
                    });
                });
            })
    }

    suppr(id){
        let myHeaders = new Headers();
        let options ={
            method: 'DELETE',
            headers: myHeaders,
            mode: 'cors',
            cache: 'default'
        };

        fetch(`/api/music/${id}`, options)
            .then(() => {
                window.location.href = '../pages/list.html';
            })
            .catch((err) => {
                console.log('Error ' + err);
            })
    }
}

const list = new List();
list.generate();

