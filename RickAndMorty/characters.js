const baseUrl = 'https://rickandmortyapi.com/api/character';

const container = document.querySelector('.cardsBox');


function getCharacters(page, gender , status) {
   fetch(`${baseUrl}/?page=${page}&status=${status}&gender=${gender}`)
      .then(response => response.json())
      .then(data => {
         renderCards(data.results);
         renderPagination(data.info);
      });

}

getCharacters(1, '' , '' ,);

function renderCards(data) {
   container.innerHTML = '';
   data.forEach(cardData => {
      container.innerHTML += `
         <div class="card" style="width: 18rem;">
         <img src="${cardData.image}" class="card-img-top" alt="...">
         <div class="card-body">
            <h5 class="card-title">${cardData.name}</h5>
            <p class="card-text">${cardData.species}</p>
            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#exampleModal" data-bs-whatever=${cardData.id}>Detail</button>
         </div>
         </div>
      `;
   });
}
let currentPage = 1;
function renderPagination(info){
   
   const paginationBox = document.querySelector('.pagination');
   paginationBox.innerHTML = '';
   paginationBox.innerHTML += `
      <li class="page-item prevPage">
         <a class="page-link" href="#" aria-label="Previous">
         <span aria-hidden="true">&laquo;</span>
         </a>
      </li>
   `;
   paginationBox.innerHTML += `
      <li class="page-item"><a class="page-link" href="#">${currentPage}</a></li>
   `;

   paginationBox.innerHTML += `
      <li class="page-item nextPage">
         <a class="page-link" href="#" aria-label="Next">
         <span aria-hidden="true">&raquo;</span>
         </a>
      </li>
   `;
   const prevPage = document.querySelector('.prevPage');
   const nextPage = document.querySelector('.nextPage');

   nextPage.addEventListener('click', () => {
      currentPage++;

      console.log('next page');

      getCharacters(currentPage);
      
   })
   prevPage.addEventListener('click', () => {
      console.log('previous page');
      if(currentPage > 1){
         currentPage--;
         getCharacters(currentPage, '' , '');
      }
      

   })
}

const btnFilter = document.querySelector('.btnFilter');

btnFilter.addEventListener('click' , () => {
  const gender = document.querySelector('#selectGender').value;
  const status = document.querySelector('#selectStatus').value;
  currentPage = 1;
  console.log(gender , status);
  if(gender == ''){
    getCharacters(currentPage,'' , status);
  } else if  (status ==='') {
    getCharacters(currentPage , gender , '')
  } else {
    getCharacters(currentPage, gender , status);
  }
  
})
const exampleModal = document.getElementById('exampleModal')
if (exampleModal) {
   exampleModal.addEventListener('show.bs.modal', event => {
      const button = event.relatedTarget
      const modalTitle = exampleModal.querySelector('.modal-title')
      const id = button.getAttribute('data-bs-whatever')

      
      fetch(`${baseUrl}/${id}`)
         .then(response => response.json())
         .then(data => {
            console.log(data);
         })


      modalTitle.textContent = `Info about ${id}`

   })
}