const User = require('../../models/user')
import { UserInputError } from 'apollo-server'

module.exports = {
    Query: {
        getAllUsers: async () => {
            try {
                const users = await User.find()
                return users
            } catch (err) {
                throw new Error(err)
            }
        },
        getUserById: async (_parent: any, { id }: any, _context: any, _info: any) => {
            try {
                return await User.findById(id);
            } catch (err) {
                throw new Error(err)
            }
        }
    },

    Mutation: {
        createUser: async (parent: any, args: any, context: any, info: any) => {
            const { username, email, password, location } = args.user;

            //verify that username doesn't exist
            const user = await User.findOne({ username })
            if (user) {
                throw new UserInputError('Username is Taken', {
                    error: {
                        username: "ce nom d'utiisateur est deja utiise"
                    }
                });
            }

            const newUser = new User({
                username,
                email,
                password,
                location,
                createdAt: new Date().toISOString()
            })
            await newUser.save();
            return newUser
        },

        updateUser: async (parent: any, args: any, context: any, info: any) => {
            const { id } = args;
            const { username, email, password, location } = args.user;

            const user = await User.findOne({ username })
            if (user) {
                throw new UserInputError('Username is Taken', {
                    error: {
                        username: "ce nom d'utiisateur est deja utiise"
                    }
                });
            }

            const newArticle = await User.findOneAndUpdate(
                id,
                {
                    username,
                    email,
                    password,
                    location
                },
                { new: true }
            )
            return newArticle;
        },

        deleteUser: async (parent: any, args: any, context: any, info: any) => {
            const { id } = args;
            await User.findByIdAndDelete(id);
            return 'User, Delete';

        }
    }
}