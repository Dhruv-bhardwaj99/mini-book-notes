let books = [];

const resolvers = {
  Query: {
    books: () => books,
  },

  Mutation: {
    addBook: (_, { title, author, notes }) => {
      const newBook = {
        id: String(books.length + 1),
        title,
        author,
        notes,
      };

      books.push(newBook);
      return newBook;
    },
  },
};

module.exports = resolvers;
