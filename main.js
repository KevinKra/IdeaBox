var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-textarea');
var savBtn = document.querySelector('.btn-save-idea');
var cardContainer = document.querySelector('.output-content');

var stringifiedIdeas = localStorage.getItem('ideas') || '[]';
ideas = JSON.parse(stringifiedIdeas);
var ideaCounter = 0;
//ideaCounter = JSON.parse(ideaCounter);

savBtn.addEventListener('click', saveIdea);
cardContainer.addEventListener('click', buttonChecker);
onLoad();

function onLoad() {
  for (var i = 0; i < ideas.length; i++) {
    createIdeaCard(ideas[i]);
  }
}

function saveIdea() {
  var title = titleInput.value;
  var body = bodyInput.value;
  var idea = new Idea(title, body);
  createIdeaCard(idea);
  ideas.push(idea);
  idea.saveToStorage();
  clearInputValues(title, body); 
}

function clearInputValues(title, body) {
  title.value = "";
  body.value = "";
}

function createIdeaCard(ideaObj) {
  var card = document.createElement('article');
  card.className += "idea-card";
  card.dataset.id = ideaObj.id;
  incrementCounter();
  storeCounter();
  var html = `
  <h2 class="idea-card-title">${ideaObj.title}</h2>
  <p class="idea-card-paragraph">${ideaObj.body}</p>
  <section class="idea-card-footer">
    <section class="card-footer-status">
      <image class="btn btn-2" id="increase-quality" src="images/upvote.svg" alt="upvote card button" />
      <image class="btn btn-2" id="decrease-quality" src="images/downvote.svg" alt="downvote card button" />
      <p>Quality:</p>
      <p class="quality-current">&nbsp${ideaObj.quality}</p>
    </section>
    <img class="btn btn-2" id="close-idea-card" src="images/delete.svg" alt="delete card button"/>
  </section>`
  card.innerHTML = html;
  cardContainer.appendChild(card);
}

function incrementCounter() {
  ideaCounter++;
}

function storeCounter() {
  var stringifiedCounter = JSON.stringify(ideaCounter);
  localStorage.setItem('ideaCounter', stringifiedCounter);
}

function buttonChecker(e){
  e.preventDefault();
  if (e.target.id === 'close-idea-card') {
      e.target.parentElement.parentElement.remove();
  } 
  if (e.target.id === 'increase-quality') {
      console.log(e.target.parentElement.parentElement.parentElement.dataset.id);
      // updateQuality();
  }
  if (e.target.id === 'decrease-quality') {
      // updateQuality();
  }
}