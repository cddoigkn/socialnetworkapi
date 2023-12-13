const { Thoughts } = require('../models');
const Model = Thoughts;

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

async function redundantReaction(id, data) {
  try {
    const thoughtToChange = await Model.findById(id);
    const currentReaction = thoughtToChange.reactions;
    return await Model.findByIdAndUpdate(
      { _id: id }, { reactions: [...currentReaction, data] }, { new: true }
    )
  } catch (err) {
    throw new Error(err)
  }
}

async function begoneReaction(thoughtId, reactId) {
  try {
    // received assistance from Zack Schreier //
    const currentThought = await Model.findById(thoughtId)
    const currentReactions = currentThought.reactions
    const removal = []
    for (x = 0; x < currentReactions.length; x++) {
      if (currentReactions[x].reactionId == reactId) {
        removal.push(currentReactions[x])
      }
    }
    return await Model.findOneAndUpdate(
      { _id: thoughtId },
      { $pull: { reactions: removal[0] } },
      { new: true }
    )
  } catch (err) {
    throw new Error(err)
  }
}

module.exports = {
  getAllThoughts: getAllItems,
  getThoughtById: getItemById,
  createThought: createItem,
  updateThoughtById: updateItemById,
  deleteThoughtById: deleteItemById,
  redundantReaction,
  begoneReaction
}