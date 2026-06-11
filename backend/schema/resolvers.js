const { redisClient } = require("../config/redisClient");
const Book = require("../models/Book");

const resolvers = {
  Query: {
    books: async () => {
      const cachedBooks = await redisClient.get("books");

      if(cachedBooks){
        console.log("Books served from Redis cache");
        return JSON.parse(cachedBooks);
      }

      console.log("Books served from memory");

      const books = await Book.find().sort({createdAt: -1})

      await redisClient.set("books", JSON.stringify(books), {
        EX: 60,
      });

      return books;
    },
  },

  Mutation: {
    addBook: async(_, { title, author, notes }, context) => {

      if(!context.user){
        throw new Error("You must be logged in to add books")
      }
      const newBook = await Book.create({
        title,
        author,
        notes,
      });

      await redisClient.del("books");
      return newBook;
    },

    deleteBook: async(_, {id}, context) =>{
      if(!context.user){
        throw new Error("You must be logged in to delete books");
      }
      const deletedBook = await Book.findByIdAndDelete(id);

      if(!deletedBook){
        throw new Error("Book not found")
      }

      await redisClient.del("books");

      return deletedBook;
    },

    updateBook: async(_, {id, title, author, notes}, context) => {
      if(!context.user) {
        throw new Error("You must be logges in to update books");
      }

      const updatedBook = await Book.findByIdAndUpdate(
        id,
        {
          title,
          author,
          notes,
        },
        {
          new: true,
          runValidators: true
        }
      );

      if(!updatedBook){
        throw new Error("Book nto found");
      }

      await redisClient.del("books");

      return updatedBook;
    }
  },
};

module.exports = resolvers;
