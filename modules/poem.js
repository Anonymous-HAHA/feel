const Poems= require('../models/poem');


class Poem {
  async getAllPoems() {
    try {
        const poems = await Poems.find({});
        if(!poems){
            throw new Error("Poems not found");
        }
        return poems;
    } catch (error) {
      console.error('Error retrieving poems', error);
      throw new Error('Could not retrieve poems');
    }
  }
  async addPoem(poem) {
    try {
        const newPoem = await Poems.create({poem:poem}); 
        return newPoem; 
   
    } catch (error) {
      console.error(`Error adding poem`, error);
      throw new Error(`Could not add poem`);
    }
  }

}

module.exports = Poem;
