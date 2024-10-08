const Users = require('../models/user');


class User {
  constructor(username) {
    this.username = username;
  }


  async getRandomName() {
    try {
        const user = await Users.findOne({username : this.username});
        if(!user){
            throw new Error("User not found");
        }
        const names = user.name;
      if (names && names.length > 0) {
        const randomIndex = Math.floor(Math.random() * names.length);
        return names[randomIndex];
      } else {
        throw new Error(`No names found`);
      }
    } catch (error) {
      console.error('Error retrieving random name:', error);
      throw new Error('Could not retrieve a random name');
    }
  }
  async addName(n) {
    try {
      const updatedNames = await Users.findOne(
        { username: this.username });
        updatedNames.name.push(n);
        await updatedNames.save();
   
      return updatedNames;
    } catch (error) {
      console.error(`Error adding name`, error);
      throw new Error(`Could not add name`);
    }
  }

}

module.exports = User;
