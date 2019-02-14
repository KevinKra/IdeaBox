var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-textarea');
const inputForm = document.querySelector('.input-form');
var cardContainer = document.querySelector('.output-content');

let ideas = JSON.parse(localStorage.getItem("ideas")) || [];



inputForm.addEventListener('submit', collectInputs);
cardContainer.addEventListener('click', clickHandler);
onLoad(ideas);

function onLoad(oldIdeas) {
  ideas = appendAllCards(oldIdeas)
}

function clickHandler(e) {
  if (e.target.id === "close-idea-card") {
    e.target.closest(".idea-card").remove();
    // ideas.splice()
  }
}

function collectInputs(e) {
  e.preventDefault();
  const title = (this.querySelector(`[name="idea-title"]`)).value;
  const paragraph = (this.querySelector(`[name="idea-content`)).value; 
  const newIdea = new Idea(title, paragraph, Date.now())
  ideas.push(newIdea);
  // localStorage.setItem("ideas", JSON.stringify(ideas));
  newIdea.saveToStorage(ideas);
  appendCard(newIdea);
  this.reset();
}

function appendAllCards(ideas) {
  let localIdeas = [];
  ideas.forEach(function(idea) {
    let newIdea = new Idea(idea.title, idea.body, idea.index);
    localIdeas.push(newIdea);
    appendCard(newIdea);
  })
  return localIdeas;
}

function appendCard(card) {
  cardContainer.innerHTML += 
     `<article class="idea-card" data-index=${card.index}>
  <h2 class="idea-card-title">${card.title}</h2>
  <p class="idea-card-paragraph">${card.body}</p>
  <section class="idea-card-footer">
    <section class="card-footer-status">
      <image class="btn btn-2" id="increase-quality" src="images/upvote.svg" alt="upvote card button" />
      <image class="btn btn-2" id="decrease-quality" src="images/downvote.svg" alt="downvote card button" />
      <p>Quality:</p>
      <p class="quality-current">&nbsp${card.quality}</p>
    </section>
    <img class="btn btn-2" id="close-idea-card" src="images/delete.svg" alt="delete card button"/>
  </section>
  </article>`
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