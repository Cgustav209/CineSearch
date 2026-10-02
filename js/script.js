const busca = document.querySelector("#search-input");
const btBuscar = document.querySelector("#btnBuscar");

// Função para buscar filmes na API do OMDB
async function buscarFilme() {
  const pesquisa = busca.value;

  // Evita fazer busca vazia
  if (!pesquisa) return;

  console.log("Buscando por:", pesquisa);
  const url = `https://www.omdbapi.com/?s=${pesquisa}&apikey=491135e0`;

  // Faz a requisição para a API
  const resposta = await fetch(url);
  const Dados = await resposta.json();

  console.log(Dados);

  const lista = document.getElementById("movies-list");
  const quantidade = document.getElementById("quantidade-filmes");

  // Limpa a tela antes de adicionar os novos resultados
  lista.innerHTML = "";

  // PROTEÇÃO: Verifica se a API encontrou resultados (Response: "True")
  if (Dados.Response === "True") {
    quantidade.textContent = Dados.totalResults;

    // Percorre o array e cria os cards
    Dados.Search.forEach((filme) => {
      const IdFilme = filme.imdbID;

      // Validação rápida: se o filme não tiver pôster, coloca uma imagem genérica ou não quebra o layout
      const imagemPoster =
        filme.Poster !== "N/A" ? filme.Poster : "./src/img/sem-poster.png";

      const card = `
        <a href="./Filmes.html?id=${IdFilme}" class="filme">
            <img src="${imagemPoster}" alt="Poster de ${filme.Title}">
            <h3>${filme.Title}</h3>
            <div>
                <p>${filme.Year}</p>
            </div>
        </a>
      `;
      lista.innerHTML += card;
    });
  } else {
    // Caso a API responda que não encontrou o filme (Response: "False")
    quantidade.textContent = "0";
    lista.innerHTML = `<p style="text-align: center; width: 100%;">Nenhum filme encontrado para "${pesquisa}".</p>`;
  }
}

// Evento de clique no botão "Buscar"
btBuscar.addEventListener("click", buscarFilme);

// Evento para aceitar a tecla "Enter" no input
busca.addEventListener("keypress", function (event) {
  if (event.key === "Enter") {
    event.preventDefault(); // Impede a página de recarregar
    buscarFilme(); // Chama a função de busca
  }
});
