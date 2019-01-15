import { users } from "./db";

// This file is going to be the way we provide
// instructions for turning a GraphQl operation into data

const resolvers = {
  Query: {
    user: (parents, { id }, context, info) => {
      return users.find(user => parseInt(user.id) === parseInt(id));
    }, 
    users: (parents, args, context, info) => {
      return users;
    } 
  }, 

  Mutation: {
    createUser: (parent, { id, name, email, age }, context, info) => {
      try {
        users.push({ id, name, email, age })
        return users[users.length - 1]
      } catch (err) {
        throw err
      }
    },
    updateUser: (parent, { id, name, email, age }, context, info) => {
      try {
        const foundUser = users.find(user => parseInt(user.id) === parseInt(id))

          foundUser.name = name
          foundUser.email = email, 
          foundUser.age = age

          return foundUser;
      } catch (err) {
        throw err
      }
    }, 
    deleteUser: (parent, { id }, context, info) => {
      try {
        const userIndex = users.findIndex(user => user.id === id);

        if (userIndex === -1) throw new Error("User not found.");
  
        const deletedUsers = users.splice(userIndex, 1);
  
        return deletedUsers[0];
      } catch (err) {
        throw err
      }
    }
  }
}

export default resolvers;