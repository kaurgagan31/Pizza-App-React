const { gql } = require('apollo-server-express');
const User = require('../models/users');
const jwt = require('jsonwebtoken');
const { Types } = require('mongoose');

const typeDefs = gql`
   type User {
     id: ID!
     first_name: String!
     last_name: String!
     email: String!
     jobType: String!
     gender: String!
     hobbies: [String]
     role: Int
     is_deleted: Int
   }

   type AuthPayload {
    token: String
    user: User
   }
   type Query {
     getUsers: [User]
   }
   type Mutation {
     addUser(first_name: String!, last_name: String!, email: String!, jobType: String!, gender: String!, hobbies: [String], role: Int!, is_deleted: Int!): User
     updateUser(id: ID!, first_name: String!, last_name: String!, email: String!, jobType: String!, gender: String!, hobbies: [String], role: Int!, is_deleted: Int!): User
     deleteUser(id: ID!): String
     loginUser(email: String!): AuthPayload
   }
   `

const resolvers = {
        Query: {
                getUsers: (parent, args) => {
                        const user = User.find({});
                        return user;
                }
        },
        Mutation: {
                loginUser: async(parent, args) => {
                     const user=   User.findOne({email: args.email });
                     if (!user) {
                        throw new Error('No such user found');
                      }
                      const token = jwt.sign({userId : user.id}, process.env.supersecret);
                      return {
                        token,
                        user,
                      }
                },
                addUser: (parent, args) => {
                        let user = new User({
                                _id: new Types.ObjectId(),
                                first_name: args.first_name,
                                last_name: args.last_name,
                                email: args.email,
                                jobType: args.jobType,
                                gender: args.gender,
                                hobbies: args.hobbies
                        });
                        return user.save();
                },
                updateUser: (parent, args) => {
                        if (!args.id) return;
                        return User.findOneAndUpdate(
                                {
                                        _id: args.id
                                },
                                {
                                        $set: {
                                                first_name: args.first_name,
                                                last_name: args.last_name,
                                                email: args.email,
                                                jobType: args.jobType,
                                                gender: args.gender,
                                                hobbies: args.hobbies
                                        }
                                }, { new: true }, (err, User) => {
                                        if (err) {
                                                console.log('Something went wrong when updating the movie');
                                        } else {
                                        }
                                }
                        );
                },
                deleteUser: async (parent, args) => {
                        if (!args.id) return;
                        await User.findByIdAndRemove(args.id);
                        return "User deleted";
                },
        }
}

module.exports = { typeDefs, resolvers };