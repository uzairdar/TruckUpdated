import io from "socket.io-client";

const localSocketUrl = "http://192.168.18.93:5000";

const socket = io.connect(localSocketUrl);

export const storeClientInfo = (user) => {
  socket.emit("storeClientInfo", { user });
};
export const setLocationData = (data) => {
  console.log("data", data);
  socket.emit("setLocationData", data);
};

// export const sendFollowNotification = (userId, followingId) => {
//   socket.emit('follow-user-notification', { userId, followingId })
// }
export const acceptRequest = (data) => {
  socket.emit("acceptRequest", data);
};
export const currentLocation = (data) => {
  socket.emit("currentLocation", data);
};
export const startRide = (cb) => {
  socket.on("startRide", (data) => cb(data));
};
export const locationRequest = (cb) => {
  socket.on("locationRequest", (data) => cb(data));
};
export const someOneFollowed = (cb) => {
  socket.on("someone-followed-you", (data) => cb(data));
};

export const sendNewMessageNotification = (
  senderId,
  recieverId,
  room,
  seen
) => {
  socket.emit("message-notification", { senderId, recieverId, room, seen });
};

export const recievedNewMessage = (cb) => {
  socket.on("someone-sent-a-message", (data) => cb(data));
};
