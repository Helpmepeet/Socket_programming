const GroupChat = require("../models/GroupChat");

async function createMongoGroupChat(groupName, members) {
  await GroupChat.create({ name: groupName, members });
  return;
}

async function getMongoGroupChats() {
  const groupChats = await GroupChat.find({});
  return groupChats;
}

async function getMongoGroupByChatId(chatId) {
  const groupChat = await GroupChat.findById(chatId);
  return groupChat;
}

async function getMongoGroupByName(groupName) {
  const selectedGroup = await GroupChat.find({ name: groupName });
  return selectedGroup[0];
}

async function updateMongoGroupBackground({ groupName, backgroundUrl }) {
  await GroupChat.findOneAndUpdate(
    { name: groupName },
    { background_image: backgroundUrl }
  );
  return;
}

function existMongoGroupHavingGroupName(groupName) {
  return GroupChat.findOne({ name: groupName })
    .then((group) => {
      return group ? true : false;
    })
    .catch((error) => {
      console.error("Error checking group existence:", error);
      return false;
    });
}

async function existMongoGroupChatById(groupId) {
  const group = await GroupChat.findById(groupId);
  return !!group;
}

async function joinMongoGroupChat(groupId, userId) {
  const group = await GroupChat.findById(groupId);
  if (!group) throw new Error("Group not found");

  // ป้องกันการ join ซ้ำ
  if (!group.members.includes(userId)) {
    group.members.push(userId);
    await group.save();
  }

  return group;
}

module.exports = {
  createMongoGroupChat,
  getMongoGroupChats,
  getMongoGroupByChatId,
  getMongoGroupByName,
  updateMongoGroupBackground,
  existMongoGroupHavingGroupName,
  existMongoGroupChatById,
  joinMongoGroupChat,
};
