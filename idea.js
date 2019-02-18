class Idea {
  constructor(title, body, index, quality) {
    this.title = title;
    this.body = body;
    this.index = index;
    this.quality = quality || 'swill';
  }
  saveToStorage(ideas) {
    var stringifiedIdeas = JSON.stringify(ideas);
    localStorage.setItem("ideas", stringifiedIdeas);
    //console.log(JSON.stringify(arry));
    // JSON.stringify the idea object and assign to variable
    // Set the stringified idea object in local storage using the idea object's id as the key
  }
  deleteFromStorage() {
   var i = ideas.indexOf(this); 
   ideas.splice(i, 1);
   var stringifiedIdeas = JSON.stringify(ideas);
   localStorage.setItem("ideas", stringifiedIdeas);
  }
  updateContent() {
    var index = ideas.indexOf(this); //this refers to targetIdea ~or associated context object
    ideas.splice(index, 1, this);
  }
  updateQuality(quality) {
    this.quality = quality;
    this.saveToStorage(ideas);
  }
}