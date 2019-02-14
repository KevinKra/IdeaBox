var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-textarea');
var saveBtn = document.querySelector('.btn-save-idea');
var cardContainer = document.querySelector('.output-content');
const inputForm = document.querySelector('.input-form');

var stringifiedIdeas = localStorage.getItem('ideas') || '[]';


const ideas = JSON.parse(localStorage.getItem("ideas")) || [];

appendCard(ideas, cardContainer);

inputForm.addEventListener('submit', collectInputs);
// cardContainer.addEventListener('click', buttonChecker);
// onLoad();



// function saveIdea(title, body) {
//   title = titleInput.value;
//   body = bodyInput.value;
//   // const idea = new Idea(title, body);
//   createIdeaCard(idea);
// }

function collectInputs(e) {
  e.preventDefault();
  const title = (this.querySelector(`[name="idea-title"]`)).value;
  const paragraph = (this.querySelector(`[name="idea-content`)).value; 
  const inputObject = {
    title : title,
    paragraph : paragraph,
    status : 'swill'
  };
  // ^^^^ perhaps a snazzy way to inject the object
  // const idea = new Idea(title, paragraph)
  ideas.push(inputObject);
  localStorage.setItem("ideas", JSON.stringify(ideas));
  appendCard(ideas, cardContainer)
  this.reset();
}

function appendCard(cards, outputLocation) {
  outputLocation.innerHTML = cards.map((card, i) => {
    return `<article class="idea-card">
  <h2 class="idea-card-title">${card.title}</h2>
  <p class="idea-card-paragraph">${card.paragraph}</p>
  <section class="idea-card-footer data-index=${i} id="item${i}">
    <section class="card-footer-status">
      <image class="btn btn-2" id="increase-quality" src="images/upvote.svg" alt="upvote card button" />
      <image class="btn btn-2" id="decrease-quality" src="images/downvote.svg" alt="downvote card button" />
      <p>Quality:</p>
      <p class="quality-current">&nbsp${card.status}</p>
    </section>
    <img class="btn btn-2" id="close-idea-card" src="images/delete.svg" alt="delete card button"/>
  </section>
  </article>`
  }).join('');
}













//-------------------
// function onLoad() {
//   for (let i = 0; i < ideas.length; i++) {
//     createIdeaCard(ideas[i]);
//   }
// }

// function saveIdea() {
//   var title = titleInput.value;
//   var body = bodyInput.value;
//   var idea = new Idea(title, body);
//   createIdeaCard(idea);
//   ideas.push(idea);
//   idea.saveToStorage();
//   clearInputValues(title, body); 
// }

// function clearInputValues(title, body) {
//   title.value = "";
//   body.value = "";
// }

// function createIdeaCard(ideaObj) {
//   var card = document.createElement('article');
//   card.className += "idea-card";
//   card.dataset.id = ideaObj.id;
//   incrementCounter();
//   storeCounter();
//   var html = `
//   <h2 class="idea-card-title">${ideaObj.title}</h2>
//   <p class="idea-card-paragraph">${ideaObj.body}</p>
//   <section class="idea-card-footer">
//     <section class="card-footer-status">
//       <image class="btn btn-2" id="increase-quality" src="images/upvote.svg" alt="upvote card button" />
//       <image class="btn btn-2" id="decrease-quality" src="images/downvote.svg" alt="downvote card button" />
//       <p>Quality:</p>
//       <p class="quality-current">&nbsp${ideaObj.quality}</p>
//     </section>
//     <img class="btn btn-2" id="close-idea-card" src="images/delete.svg" alt="delete card button"/>
//   </section>`
//   card.innerHTML = html;
//   cardContainer.appendChild(card);
// }

// function incrementCounter() {
//   ideaCounter++;
// }

// function storeCounter() {
//   var stringifiedCounter = JSON.stringify(ideaCounter);
//   localStorage.setItem('ideaCounter', stringifiedCounter);
// }

// function buttonChecker(e){
//   e.preventDefault();
//   if (e.target.id === 'close-idea-card') {
//       e.target.parentElement.parentElement.remove();
//   } 
//   if (e.target.id === 'increase-quality') {
//       console.log(e.target.parentElement.parentElement.parentElement.dataset.id);
//       // updateQuality();
//   }
//   if (e.target.id === 'decrease-quality') {
//       // updateQuality();
//   }
// }