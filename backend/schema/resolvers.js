const { redisClient } = require("../config/redisClient");
let books = [];
let nextBookId = 1;

const resolvers = {
  Query: {
    books: async () => {
      const cachedBooks = await redisClient.get("books");

      if(cachedBooks){
        console.log("Books served from Redis cache");
        return JSON.parse(cachedBooks);
      }

      console.log("Books served from memory");

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
      const newBook = {
        id: String(nextBookId++),
        title,
        author,
        notes,
      };

      books.push(newBook);

      await redisClient.del("books");
      return newBook;
    },

    deleteBook: async(_, {id}, context) =>{
      if(!context.user){
        throw new Error("You must be logged in to delete books");
      }
      const bookIndex = books.findIndex((book) => book.id === id);

      if(bookIndex === -1){
        throw new Error("Book not found");
      }
      const deletedBook = books[bookIndex];

      books = books.filter((book) => book.id !== id);

      await redisClient.del("books");

      return deletedBook;
    }
  },
};

module.exports = resolvers;
