class Idea {
  constructor(title, body) {
    this.id = id;
    this.title = title;
    this.body = body;
    this.quality = 'swill';
  }
  saveToStorage(ideaObj) {
    // JSON.stringify the idea object and assign to variable
    // Set the stringified idea object in local storage using the idea object's id as the key
  }
  deleteFromStorage(id) {
    // localStorage.removeItem(id)
  }
  updateContent() {

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