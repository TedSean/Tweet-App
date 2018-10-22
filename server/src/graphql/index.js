import TweetResolvers from './tweet-resolvers';
import UserResolvers from './user-resolvers';
import GraphQLDate from 'graphql-date';
import User from '../models/user';

export default {
  Date: GraphQLDate,
  Tweet: {
   user: ({ user }) => User.findById(user),
 },

  Query: {
    getTweet: TweetResolvers.getTweet,
    getTweets: TweetResolvers.getTweets,
    getUserTweets: TweetResolvers.getUserTweets,
    me: UserResolvers.me
  },
  Mutation: {
    createTweet: TweetResolvers.createTweet,
    updateTweet: TweetResolvers.updateTweet,
    deleteTweet: TweetResolvers.deleteTweet,
    signup: UserResolvers.signup,
    login: UserResolvers.login
  }
}
