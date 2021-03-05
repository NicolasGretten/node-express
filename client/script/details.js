class Details{

    getDetails(){
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

        let detail = $('#detail');
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
                detail.append(
                    `<div class="card text-center m-3">
                <div class="card-header h1">
                    ${response.artist}
                </div>
                <div class="card-body">
                    <h5 class="card-title">${response.name}</h5>
                    <img class="image-thumb" src="${response.thumb}" alt=""/>
                    <p class="card-text mt-2">Album : ${response.album}</p>
                    <a href="${response.yt}" class="btn btn-primary">YouTube !</a>
                </div>
                <div class="card-footer text-muted">
                    <button class="float-left btn" id="suppr_${response.id}"><i class="bi bi-trash text-warning"></i></button>
                    <a href="../pages/modify.html?id=${response.id}" class="float-right"><i class="bi bi-pencil text-danger"></i></a>
                </div>
            </div>`
                );
                let btnSupr = document.querySelector('#suppr_' + response.id);
                btnSupr.addEventListener('click', () => {
                    this.suppr(response.id);
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

let details = new Details();
details.getDetails();

