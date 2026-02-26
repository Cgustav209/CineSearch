async function carregarFilme() {

  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  // 🔹 Se NÃO tiver ID → carrega filme fictício
  if (!id) {
    carregarFilmeFicticio();
    return;
  }

  try {
    const resposta = await fetch(`https://www.omdbapi.com/?i=${id}&plot=full&apikey=491135e0`);
    const dados = await resposta.json();

    if (dados.Response === "False") {
      carregarFilmeFicticio();
      return;
    }

    preencherTela(dados);

  } catch (erro) {
    console.error("Erro:", erro);
    carregarFilmeFicticio();
  }
}

/* 🎬 FILME FAKE PRA TESTE */
function carregarFilmeFicticio() {

  const filmeFake = {
    Title: "Eclipse de Aço",
    Plot: "Em um futuro dominado por megacorporações, um ex-soldado descobre um segredo capaz de derrubar o sistema global. Entre conspirações, tecnologia proibida e dilemas morais, ele precisa escolher entre sobreviver ou mudar o mundo.",
    Genre: "Ficção Científica, Ação",
    Runtime: "2h 11min",
    Year: "2026",
    imdbRating: "9.1",
    Country: "Brasil",
    Actors: "Rafael Monteiro, Luna Vasquez, Daniel Kato",
    Poster: "https://www.sonypictures.com.br/sites/brazil/files/2023-08/SN_HomemAranha_1400x2100%20%281%29.jpg"
  };

  preencherTela(filmeFake);
}

/* 🔹 Preenche os dados na tela */
function preencherTela(dados) {
  document.getElementById("titulo").innerText = dados.Title;
  document.getElementById("sinopseTexto").innerText = dados.Plot;
  document.getElementById("genero").innerText = "Gênero: " + dados.Genre;
  document.getElementById("duracao").innerText = "Duração: " + dados.Runtime;
  document.getElementById("ano").innerText = "Ano: " + dados.Year;
  document.getElementById("nota").innerText = "IMDb: " + dados.imdbRating;
  document.getElementById("pais").innerText = "País: " + dados.Country;
  document.getElementById("elenco").innerText = "Elenco: " + dados.Actors;
  document.getElementById("poster").src = dados.Poster;
  
  // 🔥 ativa animação
  document.getElementById("movieView").classList.add("active");
}

function voltar() {
  window.history.back();
}

window.onload = carregarFilme;