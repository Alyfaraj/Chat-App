
let currentMessageId = 1;


const CreateMessage = (user, messageText) => {
  return {
    _id: currentMessageId++,
    text: messageText,
    createdAt: new Date(),
    user: {
      _id: user.userId,
      name: user.username,
      avatar: user.avatar
    }

  }
}
const handelMessage = (socket, users) => {
  socket.on("message", messageText => {
    const user = users[socket.id];
    const message = CreateMessage(user, messageText);
    console.log(message)
    socket.broadcast.emit("message", message);
  });
}
module.exports = { handelMessage }