const busca = document.querySelector('#search-input');
const btBuscar = document.querySelector('#btnBuscar')
async function buscarFilme() {

    const pesquisa = busca.value;
   console.log(pesquisa)
    const url = `https://www.omdbapi.com/?s=${pesquisa}&apikey=491135e0`

    const resposta = await fetch(url);
    const Dados = await resposta.json();

    console.log(Dados);

    const lista = document.getElementById("movies-list");
    lista.innerHTML = ""; // limpa antes de adicionar

   
    Dados.Search.forEach(filme =>{
        const IdFilme = filme.imdbID
        const card = `
            <a href="../Filmes/Filmes.html?id=${IdFilme}" class="filme">
                <img src="${filme.Poster}" alt="Poster">
                <h3>${filme.Title}</h3>
                <div>
                    <p>${filme.Year}</p>
                </div>
            </a>
        `;

        lista.innerHTML += card;
    });
    
}
btBuscar.addEventListener('click', buscarFilme);

// ========= FUNCAO MODAL ABANDONADA ===========
// function abrirModal(idFilme) {

//     const modal = document.getElementById("modalFilme");

//     modal.style.display = flex;

    


// }
