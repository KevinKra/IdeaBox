var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-textarea');
const inputForm = document.querySelector('.input-form');


let ideas = JSON.parse(localStorage.getItem("ideas")) || [];

appendCard(ideas);
// console.log(ideas);
inputForm.addEventListener('submit', collectInputs);
// cardContainer.addEventListener('click', buttonChecker);
// onLoad(ideas);

// function onLoad(oldIdeas) {
//   ideas = [];
//   for(var i = 0; i < oldIdeas.length; i++) {
//     var newIdea = new Idea(oldIdeas[i].title, oldIdeas[i].body);
//     ideas.push(newIdea);
//     appendCard(ideas, cardContainer);
//   }
//   console.log(ideas);
// }

function collectInputs(e) {
  e.preventDefault();
  const title = (this.querySelector(`[name="idea-title"]`)).value;
  const paragraph = (this.querySelector(`[name="idea-content`)).value; 
  const inputObject = new Idea(title, paragraph)
  ideas.push(inputObject);
  // localStorage.setItem("ideas", JSON.stringify(ideas));
  Idea.saveToStorage(ideas);
  appendCard(ideas)
  this.reset();
}

function appendCard(cards) {
  var cardContainer = document.querySelector('.output-content');
  cardContainer.innerHTML = cards.map((card, i) => {
    return `<article class="idea-card">
  <h2 class="idea-card-title">${card.title}</h2>
  <p class="idea-card-paragraph">${card.body}</p>
  <section class="idea-card-footer data-index=${i} id="item${i}">
    <section class="card-footer-status">
      <image class="btn btn-2" id="increase-quality" src="images/upvote.svg" alt="upvote card button" />
      <image class="btn btn-2" id="decrease-quality" src="images/downvote.svg" alt="downvote card button" />
      <p>Quality:</p>
      <p class="quality-current">&nbsp${card.quality}</p>
    </section>
    <img class="btn btn-2" id="close-idea-card" src="images/delete.svg" alt="delete card button"/>
  </section>
  </article>`
  }).join('');
}



