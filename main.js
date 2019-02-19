
const inputForm = document.querySelector('.input-form');
var cardsContainer = document.querySelector('.output-content');
const card = document.querySelector('.idea-card')
var searchBar = document.querySelector('.search-bar');
let ideas = JSON.parse(localStorage.getItem("ideas")) || [];
var filterSwill = document.querySelector(".filter1");
var filterPlausible = document.querySelector('.filter2');
var filterGenius = document.querySelector('.filter3');

filterSwill.addEventListener('click', filterCardsBySwill);
filterPlausible.addEventListener('click', filterCardsByPlausible);
filterGenius.addEventListener('click', filterCardsByGenius);

searchBar.addEventListener('keyup', searchCards);
inputForm.addEventListener('submit', collectInputs);
cardsContainer.addEventListener('click', clickHandler);
cardsContainer.addEventListener('keyup', editExistingCard);
restoreObject(ideas);

function restoreObject(parsedIdeas) {
  ideas = [];
  parsedIdeas.forEach(function(idea) {
    let restoredIdea = new Idea(idea.title, idea.body, idea.index, idea.quality);
    ideas.push(restoredIdea);
    appendCard(restoredIdea);
  });
};

function clickHandler(e) {
  if (e.target.id === "close-idea-card") {
    deleteIdea(e);
  }
  if (e.target.id === "increase-quality") {
    upVote(e);
  }
  if (e.target.id === "decrease-quality") {
    downVote(e);
  }
};

function deleteIdea(e) {
  e.target.closest(".idea-card").remove();
  var ideaToRemove = findIdea(e);
  ideaToRemove.deleteFromStorage();
};

function upVote(e) {
  var ideaToUpvote = findIdea(e);
  var qualityText = e.target.nextElementSibling.nextElementSibling.nextElementSibling;
  if (ideaToUpvote.quality === "swill") {
    qualityText.innerHTML = "&nbspplausible";
    ideaToUpvote.updateQuality("plausible");
  } else if(ideaToUpvote.quality === "plausible") {
    qualityText.innerHTML = "&nbspgenius";
    ideaToUpvote.updateQuality("genius");
  }
};

/* POTENTIAL SOLUTION TO "nextElementSibling" CHAIN ISSUE */
// function upVote(e) {
//   var ideaToUpvote = findIdea(e);
//   if (!e.target.id === "increase-quality") return;
//   //var qualityText = cardsContainer.querySelector('.current-quality');
//   console.log(qualityText);
//   if (ideaToUpvote.quality === "swill") {
//     qualityText.innerHTML = "&nbspplausible";
//     ideaToUpvote.updateQuality("plausible");
//   } else if(ideaToUpvote.quality === "plausible") {
//     qualityText.innerHTML = "&nbspgenius";
//     ideaToUpvote.updateQuality("genius");
//   }
// }

function downVote(e) {
  var ideaToDownvote = findIdea(e);
  var qualityText = e.target.nextElementSibling.nextElementSibling;
  if (ideaToDownvote.quality === "genius") {
    qualityText.innerHTML = "&nbspplausible";
    ideaToDownvote.updateQuality("plausible");
  } else if(ideaToDownvote.quality === "plausible") {
    qualityText.innerHTML = "&nbspswill";
    ideaToDownvote.updateQuality("swill");
  }
};

function findIdea(e) {
 let dataIndex = parseInt(e.target.closest(".idea-card").getAttribute("data-index"));
  return ideas.find( (idea) =>  {
     return idea.index === dataIndex;
  });
};

function collectInputs(e) {
  e.preventDefault();
  var title = document.querySelector('#title-input').value;
  var body = document.querySelector('#body-textarea').value;
  const newIdea = new Idea(title, body, Date.now());
  ideas.push(newIdea);
  newIdea.saveToStorage(ideas);
  appendCard(newIdea);
  this.reset();
};

function appendCard(card) {
    var displayCard = `<article class="idea-card" data-index=${card.index}>
  <h2 class="idea-card-title" contentEditable="true">${card.title}</h2>
  <p class="idea-card-paragraph" contentEditable="true">${card.body}</p>
  <section class="idea-card-footer">
    <section class="card-footer-status">
      <image class="btn btn-2" id="increase-quality" src="images/upvote.svg" alt="upvote card button" />
      <image class="btn btn-2" id="decrease-quality" src="images/downvote.svg" alt="downvote card button" />
      <p>Quality:</p>
      <p class="current-quality">&nbsp${card.quality}</p>
    </section>
    <img class="btn btn-2" id="close-idea-card" src="images/delete.svg" alt="delete card button"/>
  </section>
  </article>`;
  cardsContainer.insertAdjacentHTML('afterbegin', displayCard);
};

function editExistingCard(e) {
  var targetIdea = findIdea(e);
  var newValue = e.target.innerHTML;
  if(e.target.className === "idea-card-title") {
      targetIdea.title = newValue;
  } if (e.target.className === "idea-card-paragraph") {
      targetIdea.body = newValue;
  }
  targetIdea.updateContent();
  targetIdea.saveToStorage(ideas);
};

function searchCards(e){
  var searchBarText = e.target.value;
  var regex = new RegExp(searchBarText, "i");
  var matchingIdeas = [];
  clearCards();
  for (var i = 0; i < ideas.length; i++) {
    if(regex.test(ideas[i].title) || regex.test(ideas[i].body)) {
      matchingIdeas.push(ideas[i]);
      appendCard(ideas[i]);
    }
  }
};

function clearCards() {
  while (cardsContainer.hasChildNodes()) {
    cardsContainer.removeChild(cardsContainer.lastChild);
  }
}

function filterCardsBySwill(e) {
  var ideaBySpecificQuality = [];
  clearCards();
  for (var i = 0; i < ideas.length; i++) {
    if(ideas[i].quality === "swill") {
      ideaBySpecificQuality.push(ideas[i]);
      appendCard(ideas[i]);
    } 
  }
}

function filterCardsByPlausible(e) {
  var ideaBySpecificQuality = [];
  clearCards();
  for (var i = 0; i < ideas.length; i++) {
    if(ideas[i].quality === "plausible") {
      ideaBySpecificQuality.push(ideas[i]);
      appendCard(ideas[i]);
    } 
  }
}

function filterCardsByGenius(e) {
  var ideaBySpecificQuality = [];
  clearCards();
  for (var i = 0; i < ideas.length; i++) {
    if(ideas[i].quality === "genius") {
      ideaBySpecificQuality.push(ideas[i]);
      appendCard(ideas[i]);
    } 
  }
}







