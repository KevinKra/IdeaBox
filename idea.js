class Idea {
  constructor(title, body, index) {
    this.title = title;
    this.body = body;
    this.quality = 'swill';
    this.index = index;
  }
  saveToStorage(ideas) {
    var stringifiedIdeas = JSON.stringify(ideas);
    localStorage.setItem("ideas", stringifiedIdeas);
    //console.log(JSON.stringify(arry));
    // JSON.stringify the idea object and assign to variable
    // Set the stringified idea object in local storage using the idea object's id as the key
  }
  deleteFromStorage() {
    
  }
  updateContent() {
    var index = ideas.indexOf(this); //this refers to ideaWeWant
    ideas.splice(index, 1, this)
    console.log(ideas);


  }
  updateQuality() {
    // If the Up vote is pressed
      // If this.quality is equal to 'swill'
      // Then assign 'plausible' to this.quality

      // If this.quality is equal to 'plausible'
      // Then assign 'genius' to this.quality
    
    // If the Down vote is pressed
      // If this.quality is equal to 'genius'
      // Then assign 'plausible' to this.quality

      // If this.quality is equal to 'plausible'
      // Then assign 'swill' to this.quality
  }
}