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
  }
  deleteFromStorage() {
    var i = ideas.indexOf(this); 
    ideas.splice(i, 1);
    var stringifiedIdeas = JSON.stringify(ideas);
    localStorage.setItem("ideas", stringifiedIdeas);
  }
  updateContent() {
    var index = ideas.indexOf(this);
    ideas.splice(index, 1, this);
  }
  updateQuality(quality) {
    this.quality = quality;
    this.saveToStorage(ideas);
  }
}