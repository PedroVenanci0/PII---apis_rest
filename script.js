// ================================================================================
// DOCUMENTAÇÃO DAS APIS
// ================================================================================

/*
1. PokéAPI
----------------------
- Descrição: Fornece dados sobre Pokémon, como habilidades, tipos e espécies.
- Chave de API: Não é necessária.
- Exemplo cURL:
  curl "https://pokeapi.co/api/v2/pokemon/pikachu"
*/

/*
2. The Movie Database (TMDb) API
----------------------
- Descrição: Permite consultar uma vasta base de dados sobre filmes, séries e celebridades.
- Chave de API: Sim, obrigatória. Obtenha em https://www.themoviedb.org/signup
- Exemplo cURL (a chave é passada como um parâmetro de consulta 'api_key'):
  curl "https://api.themoviedb.org/3/movie/popular?api_key=SUA_CHAVE_API"
*/

/*
3. CoinGecko API
----------------------
- Descrição: Retorna dados sobre o mercado de criptomoedas, como preço, capitalização, etc.
- Chave de API: Não é necessária para o endpoint público.
- Exemplo cURL:
  curl -X 'GET' 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl'
*/

/*
4. Universities List API
----------------------
- Descrição: API pública que lista universidades de todo o mundo.
- Chave de API: Não é necessária.
- Exemplo cURL:
  curl "http://universities.hipolabs.com/search?country=Brazil"
*/


// ================================================================================
// CÓDIGO
// ================================================================================

// Importa o node-fetch de forma assíncrona
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));


// --- CONFIGURAÇÃO DE CHAVES ---
const API_KEYS = {
    tmdb: 'SUA_CHAVE_DO_TMDB_AQUI', // Chave necessária para a The Movie Database API
};

// --- Função 1: Chamar a PokéAPI ---
async function fetchPokemonData() {
  console.log("\n--- 1. Testando PokéAPI ---");
  const pokemon = "ditto";
  const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

  try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(`Dados do Pokémon ${data.name}:`);
    console.log(`- Altura: ${data.height}`);
    console.log(`- Peso: ${data.weight}`);
  } catch (error) {
    console.error("Falha na requisição da PokéAPI:", error);
  }
}

// --- Função 2: Chamar a The Movie Database (TMDb) API ---
async function fetchPopularMovies() {
  console.log("\n--- 2. Testando The Movie Database (TMDb) API ---");
  if (API_KEYS.tmdb === 'SUA_CHAVE_DO_TMDB_AQUI') {
    console.log("PULANDO: Chave da TMDb API não foi configurada.");
    return;
  }
  const url = `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEYS.tmdb}&language=pt-BR&page=1`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (response.ok) {
        console.log("Filme mais popular no momento:", data.results[0].title);
    } else {
        console.error(`Erro da API TMDb: ${data.status_message}`);
    }
  } catch (error) {
    console.error("Falha na requisição da TMDb:", error);
  }
}

// --- Função 3: Chamar a CoinGecko API ---
async function fetchBitcoinPrice() {
  console.log("\n--- 3. Testando CoinGecko API ---");
  const url = 'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=brl';
  try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(`Preço atual do Bitcoin: R$ ${data.bitcoin.brl}`);
  } catch (error) {
    console.error("Falha na requisição da CoinGecko:", error);
  }
}

// --- Função 4: Chamar a Universities List API ---
async function fetchBrazilianUniversities() {
  console.log("\n--- 4. Testando Universities List API ---");
  const url = 'http://universities.hipolabs.com/search?country=Brazil';
  try {
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    console.log(`Exemplo de universidade no Brasil: ${data[0].name}`);
  } catch (error) {
    console.error("Falha na requisição da Universities List API:", error);
  }
}

// --- Função Principal ---
async function runAllApiTests() {
  console.log("========================================");
  console.log("INICIANDO TESTES DE API (VERSÃO MODIFICADA)");
  console.log("========================================");

  await fetchPokemonData();
  await fetchPopularMovies();
  await fetchBitcoinPrice();
  await fetchBrazilianUniversities();

  console.log("\n========================================");
  console.log("TESTES FINALIZADOS");
  console.log("========================================");
}

// Executa todos os testes
runAllApiTests();