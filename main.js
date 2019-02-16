
const inputForm = document.querySelector('.input-form');
var cardContainer = document.querySelector('.output-content');
var searchBar = document.querySelector(".search-bar");
var searchButton = document.querySelector(".fa-lg");
let ideas = JSON.parse(localStorage.getItem("ideas")) || [];


searchButton.addEventListener("click", filterCards);
inputForm.addEventListener('submit', collectInputs);
cardContainer.addEventListener('click', clickHandler);
cardContainer.addEventListener('keyup', saveEditedCard);
onLoad(ideas);

function onLoad(oldIdeas) {
  ideas = [];
  oldIdeas.forEach(function(idea) {
    let newIdea = new Idea(idea.title, idea.body, idea.index);
    ideas.push(newIdea);
    appendCard(newIdea);
  });
}

function clickHandler(e) {
  if (e.target.id === "close-idea-card") {
    deleteIdea(e);
  }
};

function deleteIdea(e) {
  e.target.closest(".idea-card").remove();
  let dataIndex = parseInt(e.target.closest(".idea-card").getAttribute("data-index"));
  
  let returnedIdea = ideas.find( (idea) =>  {
     return idea.index === dataIndex;
  });
  returnedIdea.deleteFromStorage();
}

function collectInputs(e) {
  e.preventDefault();
  var title = document.querySelector('#title-input').value;
  var body = document.querySelector('#body-textarea').value;
  const newIdea = new Idea(title, body, Date.now());
  ideas.push(newIdea);
  // localStorage.setItem("ideas", JSON.stringify(ideas));
  newIdea.saveToStorage(ideas);
  appendCard(newIdea);
  this.reset();
}

function appendCard(card) {
    var displayCard = `<article class="idea-card" data-index=${card.index}>
  <h2 class="idea-card-title" contentEditable="true">${card.title}</h2>
  <p class="idea-card-paragraph" contentEditable="true">${card.body}</p>
  <section class="idea-card-footer">
    <section class="card-footer-status">
      <image class="btn btn-2" id="increase-quality" src="images/upvote.svg" alt="upvote card button" />
      <image class="btn btn-2" id="decrease-quality" src="images/downvote.svg" alt="downvote card button" />
      <p>Quality:</p>
      <p class="quality-current">&nbsp${card.quality}</p>
    </section>
    <img class="btn btn-2" id="close-idea-card" src="images/delete.svg" alt="delete card button"/>
  </section>
  </article>`;
  cardContainer.insertAdjacentHTML('afterbegin', displayCard);

}

function saveEditedCard(e) {
  var dataIndex = Number(e.target.closest(".idea-card").getAttribute("data-index"));
  var ideaWeWant = ideas.find(function(idea) {
  return idea.index === dataIndex;
  });
  var newValue = e.target.innerHTML;
  
  if(e.target.className === "idea-card-title") {
      ideaWeWant.title = newValue;
  } if (e.target.className === "idea-card-paragraph") {
      ideaWeWant.body = newValue;
  }
  
  ideaWeWant.updateContent();
  ideaWeWant.saveToStorage(ideas);
}

function filterCards(e){
  // console.log(e.previousSibling.value);
  var searchBarText = e.target.value;
  var ideaTitle = document.querySelector(".idea-card-title");
  if (searchBarText === ideaTitle.innerHTML) {
    // console.log('yar');
  }
}





// function appendCard(cards) {
//   cardContainer.innerHTML = cards.map((card, i) => {
//     return `<article class="idea-card">
//   <h2 class="idea-card-title">${card.title}</h2>
//   <p class="idea-card-paragraph">${card.body}</p>
//   <section class="idea-card-footer data-index=${i} id="item${i}">
//     <section class="card-footer-status">
//       <image class="btn btn-2" id="increase-quality" src="images/upvote.svg" alt="upvote card button" />
//       <image class="btn btn-2" id="decrease-quality" src="images/downvote.svg" alt="downvote card button" />
//       <p>Quality:</p>
//       <p class="quality-current">&nbsp${card.quality}</p>
//     </section>
//     <img class="btn btn-2" id="close-idea-card" src="images/delete.svg" alt="delete card button"/>
//   </section>
//   </article>`
//   }).join('');
// }