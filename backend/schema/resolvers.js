const { redisClient } = require("../config/redisClient");
let books = [];

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
    addBook: async(_, { title, author, notes }) => {
      const newBook = {
        id: String(books.length + 1),
        title,
        author,
        notes,
      };

      books.push(newBook);

      await redisClient.del("books");
      return newBook;
    },
  },
};

module.exports = resolvers;
