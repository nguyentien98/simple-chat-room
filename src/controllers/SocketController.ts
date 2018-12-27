import * as socketIo from "socket.io";
import * as http from "http";
import ChatboxModel from "../models/ChatboxModel";
import MessageModel from "../models/MessageModel";

export function socket(server: http.Server) {
  const io = socketIo(server);
  io.on("connection", function(socket){
    socket.on("chat", function(data){
      let message = {
        username: data.name,
        message: data.message,
      }
      try {
        ChatboxModel.model().find({hash: data.room}).then(chatbox => {
          if (chatbox.length > 0) {
            let room = (chatbox as any)[0].hash;
            (message as any).room = room
            MessageModel.create(message).then(saved => {
              io.emit("message_" + room, saved);
            });
          } else {
            console.log("Permission denied!!!");
          }
        });
      } catch (error) {
        console.log(error);
      }
    });
  });
}