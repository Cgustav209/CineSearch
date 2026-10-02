// Função principal que carrega o filme assim que a página abre
async function carregarFilme() {

  // Pega os parâmetros da URL (tipo ?id=tt123456)
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id"); // extrai o ID do filme

  // Se NÃO tiver ID na URL, a gente não chora
  // Só carrega o filme fake e segue a vida
  if (!id) {
    carregarFilmeFicticio();
    return; // sai da função antes de dar ruim
  }

  try {
    // Faz requisição pra API OMDb
    // Aqui é onde a mágica acontece (ou quebra)
    const resposta = await fetch(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=491135e0`);
    const dados = await resposta.json();

    // Se a API responder "False", significa que não achou nada
    if (dados.Response === "False") {
      carregarFilmeFicticio();
      return;
    }

    // Se chegou até aqui, deu bom
    preencherTela(dados);

  } catch (erro) {
    // Se explodir qualquer coisa (internet, API, azar)
    console.error("Erro:", erro);
    carregarFilmeFicticio();
  }
}


/* 🎬 FILME FAKE PRA TESTE
   Porque depender 100% de API é pedir pra sofrer */
function carregarFilmeFicticio() {

  // Objeto montado manualmente na brutalidade
  const filmeFake = {
    Title: "🕷️🕸️ Homem-Aranha: Através do Aranhaverso",
    Plot: "Depois de se firmar como o Homem-Aranha do Brooklyn, Miles Morales reencontra Gwen Stacy e é lançado através do multiverso, onde descobre a existência de uma sociedade de Homens-Aranha liderada por Miguel O'Hara. Lá, ele descobre que certos “eventos canônicos” — momentos de perda e dor — são considerados essenciais para manter a estabilidade das realidades.",
    Genre: "Animação, Ação, Aventura, Super-herói, Ficção científica e Drama.",
    Runtime: "2h20min (140 minutos).",
    Year: "2 de junho de 2023",
    imdbRating: "9.1",
    Country: "EUA",
    Awards: "nnie Awards (Melhor Filme de Animação), Critics’ Choice Movie Awards (Melhor Filme de Animação), BAFTA (indicado a Melhor Filme de Animação) e Oscar (indicado a Melhor Filme de Animação). 🕷️",
    Actors: "Shameik Moore, Hailee Steinfeld, Oscar Isaac, Jason Schwartzman, Brian Tyree Henry, Luna Lauren Velez e Daniel Kaluuya.",
    Director: "Joaquim Dos Santos, Kemp Powers e Justin K. Thompson.",
    Writer: "Phil Lord e Christopher Miller.",

    // Avaliações simuladas
    Ratings: [
      { Source: "Internet Movie Database", Value: "9.1/10" },
      { Source: "Rotten Tomatoes", Value: "94%" },
      { Source: "Metacritic", Value: "88/100" }
    ],

    // Poster do melhor miranha só pra não ficar vazio 
    Poster: "https://www.sonypictures.com.br/sites/brazil/files/2023-08/SN_HomemAranha_1400x2100%20%281%29.jpg"
  };

  preencherTela(filmeFake);
}


// Função que joga os dados dentro do HTML
function preencherTela(dados) {

  // Preenchendo cada campo com o que veio da API
  document.getElementById("titulo").innerText = dados.Title;
  document.getElementById("sinopseTexto").innerText = dados.Plot;
  document.getElementById("genero").innerText = "Gênero: " + dados.Genre;
  document.getElementById("duracao").innerText = "Duração: " + dados.Runtime;
  document.getElementById("ano").innerText = "Ano: " + dados.Year;

  // Aqui usei innerHTML porque tem <strong>
  document.getElementById("nota").innerHTML = "<strong>IMDb:</strong> " + dados.imdbRating;

  document.getElementById("pais").innerText = "País: " + dados.Country;

  // Se não tiver prêmio, não inventa história
  document.getElementById("premios").innerText =
    "Prêmios: " + (dados.Awards || "Nenhum registro");

  document.getElementById("elenco").innerText = "Elenco: " + dados.Actors;

  // Atualiza o poster
 document.getElementById("poster").src =
  dados.Poster !== "N/A" ? dados.Poster : "img/poster-padrao.jpg";

  // Diretor e roteiro no mesmo bloco
  document.getElementById("direcao").innerHTML =
    "<strong>Diretor:</strong> " + (dados.Director || "Não informado") +
    "<br><strong>Roteiro:</strong> " + (dados.Writer || "Não informado");


  // Parte das avaliações com barrinha estilosa
  const container = document.getElementById("ratingsContainer");
  container.innerHTML = ""; // limpa antes pra não duplicar coisa

  if (dados.Ratings && dados.Ratings.length > 0) {

    // Percorre cada avaliação
    dados.Ratings.forEach(rating => {

      let valorNumerico = 0;

      // Converte qualquer formato pra porcentagem
      if (rating.Value.includes("%")) {
        valorNumerico = parseInt(rating.Value);
      } 
      else if (rating.Value.includes("/10")) {
        valorNumerico = parseFloat(rating.Value) * 10;
      } 
      else if (rating.Value.includes("/100")) {
        valorNumerico = parseInt(rating.Value);
      }

      let logo = "";

      // Define logo baseada na fonte
      if (rating.Source.includes("Internet Movie Database")) {
        logo = "https://upload.wikimedia.org/wikipedia/commons/6/69/IMDB_Logo_2016.svg";
      } 
      else if (rating.Source.includes("Rotten Tomatoes")) {
        logo = "https://upload.wikimedia.org/wikipedia/commons/5/5b/Rotten_Tomatoes.svg";
      } 
      else if (rating.Source.includes("Metacritic")) {
        logo = "https://upload.wikimedia.org/wikipedia/commons/2/20/Metacritic.svg";
      }

      // Cria div da avaliação
      const div = document.createElement("div");
      div.classList.add("rating-item");

      // Monta a estrutura da barra
      div.innerHTML = `
        <div class="rating-header">
          <img src="${logo}" alt="${rating.Source}">
          <span>${rating.Value}</span>
        </div>
        <div class="rating-bar">
          <div class="rating-fill" style="width: ${valorNumerico}%"></div>
        </div>
      `;

      container.appendChild(div);
    });

  } else {
    // Se não tiver avaliação nenhuma
    container.innerHTML = "<p>Sem avaliações disponíveis.</p>";
  }

  // Ativa animações adicionando classe
  document.getElementById("movieView").classList.add("active");
}


// Botão voltar simples e direto
function voltar() {
  window.history.back();
}


// Quando a página carregar, executa automaticamente
window.onload = carregarFilme;