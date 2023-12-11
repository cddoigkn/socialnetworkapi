const { User } = require('../models');
const Model = User; 

async function getAllItems() {
  try {
    return await Model.find();
  } catch (err) {
    throw new Error(err)
  }
}

async function getItemById(id) {
  try {
    return await Model.findById(id);
  } catch (err) {
    throw new Error(err)
  }
}

async function createItem(data) {
  try {
    return await Model.create(data);
  } catch (err) {
    throw new Error(err)
  }
}

async function updateItemById(id, data) {
  try {
    return await Model.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );
  } catch (err) {
    throw new Error(err)
  }
}

async function deleteItemById(id) {
  try {
    return await Model.findByIdAndDelete(id);
  } catch (err) {
    throw new Error(err)
  }
}

async function giveUserAFriend(userid, friendid) {
  try {
    const userToChange = await Model.findById(userid);
    const currentFriends = userToChange.friends;
    return await Model.findOneAndUpdate(
      { _id: userid }, { friends: [...currentFriends, friendid] }, { new: true }
    )
  } catch (err) {
    throw new Error(err)
  }
}

async function getRidOfAFriend(userid, friendid) {
  try {
    return await Model.findOneAndUpdate(
      // $pull looks within a property and removes the specified value (found on mongoose website) //
      { _id: userid }, { $pull: { friends: friendid } }, { new: true }
    )
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  getAllUsers: getAllItems,
  getUserById: getItemById,
  createUser: createItem,
  updateUserById: updateItemById,
  deleteUserById: deleteItemById,
  giveUserAFriend,
  getRidOfAFriend
}