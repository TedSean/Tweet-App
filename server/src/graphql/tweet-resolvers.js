import Tweet from '../models/Tweet';
import { requireAuth } from '../services/auth';
import mongoose from 'mongoose';
import mongo from 'mongodb';


export default {
  getTweet: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      return Tweet.findById(_id);
    } catch (e) {
      throw e;
    }
  },

  getTweets: async (_, args, { user }) => {
    try {
      await requireAuth(user);
      return Tweet.find({}).sort({ createdAt: -1});
    } catch (e) {
      throw e;
    }
  },


  createTweet: async (_, args, { user }) => {
    await requireAuth(user);
    return Tweet.create({ ...args, user: user._id });
  },

  getUserTweets: async (_, args, { user }) => {
    try {
      console.log(user._id);
      await requireAuth(user);
      return Tweet.find({user: user._id}).sort({ createdAt: -1});
    } catch (e) {
      throw e;
    }
  },


  updateTweet: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user)
      const tweet = await Tweet.findOne({ _id, user: user._id });
      console.log(tweet);

      if(!tweet) {
        throw new Error('Not Found!');
      }

      Object.entries(rest).forEach(([key, value]) => {
        tweet[key] = value;
      })

      return tweet.save();

    } catch (e) {
      throw e;
    }
  },


  deleteTweet: async (_, { _id }, { user }) => {
    try {
      await requireAuth(user);
      const tweet = await Tweet.findOne({ _id, user: user._id });

      if(!tweet) {
        throw new Error('Not Found !')
      }

      await tweet.remove();
      return {
        message: "Deleted Tweet Successfully"
      }
    }catch(error) {
      throw error;
    }
  }
}
