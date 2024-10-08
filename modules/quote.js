const Quote = require('../models/quote');
const DailyQuote = require('../models/daily');


class QuoteService {
  constructor(batch) {
    this.batch = batch;
  }

  // Fetch all quotes of a specific batch
  async getAllQuotes() {
    try {
      const quotes = await Quote.findOne({ batch: this.batch });
      return quotes;
    } catch (error) {
      console.error('Error retrieving quotes:', error);
      throw new Error('Could not retrieve quotes');
    }
  }

  // Fetch a random quote from a specific mood
  async getRandomQuote(mood) {
    try {
      const quotes = await this.getAllQuotes();
      if (quotes && quotes[mood] && quotes[mood].length > 0) {
        const randomIndex = Math.floor(Math.random() * quotes[mood].length);
        return quotes[mood][randomIndex];
      } else {
        throw new Error(`No quotes found for mood: ${mood}`);
      }
    } catch (error) {
      console.error('Error retrieving random quote:', error);
      throw new Error('Could not retrieve a random quote');
    }
  }
  async addQuoteToMood(mood, newQuote) {
    try {
      const updatedQuotes = await Quote.findOneAndUpdate(
        { batch: this.batch },
        { 
          $push: { [mood]: newQuote } 
      },
        { new: true, upsert: true } 
      );
      // if (!updatedQuotes[mood]) {
      //   updatedQuotes[mood] = [newQuote]; // If mood didn't exist, create it
      //   await updatedQuotes.save();
    // }
      return updatedQuotes;
    } catch (error) {
      console.error(`Error adding quote to ${mood}:`, error);
      throw new Error(`Could not add quote to ${mood}`);
    }
  }
  async getTodaysQuote() {
    try {
      const todaysQuote = await DailyQuote.findOne({ batch: this.batch });
      return todaysQuote.today;
    } catch (error) {
      // console.error(`Error getting todays Quote`, error);
      throw new Error(`Could not get todays quote`);
    }
  }
  async editTodaysQuote(todaysQuote){
    try {
      const updateDailyQuote = await DailyQuote.findOne({ batch: this.batch });
      updateDailyQuote.today = todaysQuote;
      await updateDailyQuote.save();
      return todaysQuote;
    } catch (error) {
      // console.error(`Error getting todays Quote`, error);
      throw new Error(`Could not edit todays quote`);
    }
  }
}

module.exports = QuoteService;
