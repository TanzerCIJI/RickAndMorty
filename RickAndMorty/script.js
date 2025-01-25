const apiUrl = "https://rickandmortyapi.com/api/episode";

let allEpisodes = [];
let currentPage = 1; 
let totalPages = 1;

async function fetchAllEpisodes() {
  try {
    let page = 1;
    let hasNextPage = true;

    while (hasNextPage) {
      const response = await fetch(`${apiUrl}?page=${page}`);
      const data = await response.json();

      allEpisodes = [...allEpisodes, ...data.results]; 
      hasNextPage = data.info.next !== null; 
      page++;
    }

    totalPages = Math.ceil(allEpisodes.length / 20); 
    renderEpisodes(getEpisodesByPage(currentPage));
    renderPagination();
  } catch (error) {
    console.error("Error fetching episodes:", error);
  }
}

function renderEpisodes(episodes) {
  const episodesContainer = document.getElementById("episodes");
  episodesContainer.innerHTML = ""; 

  if (episodes.length === 0) {
    episodesContainer.innerHTML = `<p class="text-center">No episodes found.</p>`;
    return;
  }

  episodes.forEach((episode) => {
    const episodeCard = `
      <div class="col-12 col-sm-6 col-md-4 col-lg-3">
        <div class="card">
          <div class="card-body text-center">
            <h5 class="card-title">${episode.name}</h5>
            <p class="card-text">${episode.episode}</p>
            <p class="text-muted">${episode.air_date}</p>
            <button class="btn details-btn">Details</button>
          </div>
        </div>
      </div>
    `;
    episodesContainer.innerHTML += episodeCard;
  });
}

function renderPagination() {
  const paginationContainer = document.querySelector(".pagination");
  paginationContainer.innerHTML = ""; 


  paginationContainer.innerHTML += `
    <li class="page-item ${currentPage === 1 ? "disabled" : ""}">
      <a class="page-link" href="#" onclick="changePage(${currentPage - 1})" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
  `;

  
  for (let i = 1; i <= totalPages; i++) {
    paginationContainer.innerHTML += `
      <li class="page-item ${currentPage === i ? "active" : ""}">
        <a class="page-link" href="#" onclick="changePage(${i})">${i}</a>
      </li>
    `;
  }


  paginationContainer.innerHTML += `
    <li class="page-item ${currentPage === totalPages ? "disabled" : ""}">
      <a class="page-link" href="#" onclick="changePage(${currentPage + 1})" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  `;
}

function changePage(page) {
  if (page < 1 || page > totalPages) return; 
  currentPage = page;
  renderEpisodes(getEpisodesByPage(page)); 
}

function getEpisodesByPage(page) {
  const startIndex = (page - 1) * 20;
  const endIndex = startIndex + 20;
  return allEpisodes.slice(startIndex, endIndex);
}

function filterEpisodes() {
  const searchInput = document.getElementById("search").value.toLowerCase();
  const filteredEpisodes = allEpisodes.filter((episode) =>
    episode.name.toLowerCase().includes(searchInput)
  );

  renderEpisodes(filteredEpisodes);
  renderPagination();
}

document.getElementById("search").addEventListener("input", filterEpisodes);

fetchAllEpisodes();