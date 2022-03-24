const { AuthenticationError } = require("apollo-server-express");
const { User } = require("../models");
const { signToken } = require("../utils/auth");

const resolvers = {
  // Get a user

  Query: {
    me: async (parent, args, context) => {
      if (context.user) {
        const userData = await User.findById(context.user._id);

        return userData;
      }

      throw new AuthenticationError("Need to be logged in first.");
    },
  },

  Mutation: {
    // add a user

    addUser: async (parent, args) => {
      const user = await User.create(args);
      const token = signToken(user);

      return { token, user };
    },

    // login

    login: async (parent, { email, password }) => {
      const user = await User.findOne({ email });

      if (!user) {
        throw new AuthenticationError("Incorrect Credentials");
      }

      const correctPw = await user.isCorrectPassword(password);

      if (!correctPw) {
        throw new AuthenticationError("Incorrect credentials");
      }

      const token = signToken(user);
      return { token, user };
    },

    // add book to your wishlist

    saveBook: async (parent, { input }, { user }) => {
      if (user) {
        const addedBook = User.findByIdAndUpdate(
          user._id,
          {
            $push: {
              savedBooks: { savedBooks: input },
            },
          },
          { new: true, runValidators: true }
        );

        return addedBook;
      }
      throw new AuthenticationError("You need to be logged in first");
    },

    // remove a book from wishlist

    removeBook: async (parent, { bookId }, { user }) => {
      if (user) {
        const updatedUser = User.findByIdAndUpdate(
          user._id,
          { $pull: { savedBooks: { bookId } } },
          { new: true, runValidators: true }
        );
        return updatedUser;
      }

      throw new AuthenticationError("You need to be logged in first");
    },
  },
};

module.exports = resolvers;
