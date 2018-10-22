import User from '../models/user';
import { requireAuth } from '../services/auth';

export default {

  signup: async (_, { fullName, ...rest }) => {
    const [ firstName, ...lastName ] = fullName.split(" ");
    const user = await User.create({ firstName, lastName, ...rest });

    return {
      token: user.createToken(),
    }
  },

  login: async (_, { email, password }) => {

    const user =  await User.findOne({ email });

    if(!user) {
      throw new Error("User does not exist");
    }

    if(!user.authenticateUser(password)) {
      throw new Error("Password does not match");
    }

    return {
        token: user.createToken(),
    };
  },

  me: async (_, args, { user }) => {
    console.log(user);
    try {
      const me = await requireAuth(user);
      return me;

    } catch (error) {
      throw error;
    }
  },

}
