const { redisClient } = require("../config/redisClient");
const Book = require("../models/Book");

const resolvers = {
  Query: {
    books: async (_, __, context) => {
      
      if(!context.user){
        return [];
      }

      const cacheKey = `books:${context.user.uid}`;

      const cachedBooks = await redisClient.get(cacheKey);

      if(cachedBooks){
        console.log("Books served from Redis cache");
        return JSON.parse(cachedBooks);
      }

      console.log("User books served from MongoDB");

      const books = await Book.find({userId: context.user.uid}).sort({createdAt: -1})

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
        userId: context.user.uid,
      });

      await redisClient.del(`books:${context.user.uid}`);
      return newBook;
    },

    deleteBook: async(_, {id}, context) =>{
      if(!context.user){
        throw new Error("You must be logged in to delete books");
      }
      const deletedBook = await Book.findByIdAndDelete({_id: id, userId: context.user.uid});

      if(!deletedBook){
        throw new Error("Book not found or you are not allowed to delete it")
      }

      await redisClient.del(`books:${context.user.uid}`);

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
        throw new Error("Book not found or you are not allowed to update it");
      }

      await redisClient.del(`books:${context.user.uid}`);

      return updatedBook;
    }
  },
};

module.exports = resolvers;
