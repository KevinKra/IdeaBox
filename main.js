var titleInput = document.querySelector('#title-input');
var bodyInput = document.querySelector('#body-textarea');
var savBtn = document.querySelector('.btn-save-idea');
var cardContainer = document.querySelector('.output-content');

// Query select the idea title input box and assign it to var titleInput
// Query select the idea body input box and assign it to var bodyInput
// Query select the save button and assign it to var saveBtn
// Query select the card container section and assign it to var cardContainer

var ideas =  [];
savBtn.addEventListener('click', saveIdea);
cardContainer.addEventListener('click', buttonChecker);
onLoad();
// Add a click event listener to saveBtn with a function called saveIdea
// Add a click event listener to the cardContainer with a function called buttonChecker

// Create an empty ideas array to hold all the new idea instances


function onLoad() {
  var stringifiedIdeas = localStorage.getItem('ideas');
  var parsedIdeas = JSON.parse(stringifiedIdeas);
  for (var i = 0; i < parsedIdeas.length; i++) {
    createIdeaCard(parsedIdeas[i]);
  }
}
// onLoad function
  // Retrieve JSON ideas array from local storage
  // Parse the ideas array and assign it to the global ideas array variable
  // For every idea in ideas array loop
    // create an idea card for each idea

function saveIdea() {
  var title = titleInput.value;
  var body = bodyInput.value;
  var idea = new Idea(title, body);
  idea.saveToStorage(ideas);
  createIdeaCard(idea);
  clearInputValues(title, body); 
}


// saveIdea function
  // Take the value of the titleInput and assign it to var title
  // Take the value of the bodyInput and assign it to var body
  // Create a new idea instance using the title and body and assign to var idea
  // Save the idea to storage with Idea.saveToStorage(idea)
  // Call clearInputValue function with title as argument
  // Call clearInputValue function with body as argument


function clearInputValues(title, body) {
  title.value = "";
  body.value = "";
}
// clearInputValue(value) function
  // Set given value to empty string


function createIdeaCard(ideaObj) {
  cardContainer.innerHTML += `<article class="idea-card" data-id="0">
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
      </section>
    </article>`
    console.log()
}
// createIdeaCard(ideaObj) function
  // Targeting cardContainer use add Inner HTML to add a card using a template literal
  // Interpolate ideaObj.title and ideaObj.body into appropriate places in template literal


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
// buttonChecker(e) function
  // If the event target's id is equal to the up button's id then...
    // updateQuality()
  // If the event target's id is equal to the down button's id then...
    // updateQuality()
  // If the event target's id is equal to the delete button's id then...
    // Delete card from local storage using deleteFromStorage(id)
    // Use parent element (maybe multiple times) on the event target to target the card and remove it