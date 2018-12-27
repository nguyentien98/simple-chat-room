import * as express from "express";
import ChatController from "./controllers/ChatController";

export default function routes(app: express.Application) {
  app.get('/', ChatController.welcome);
  app.post('/create-box', ChatController.createBox);
  app.post('/join-room', ChatController.checkRoomAuth);
  app.post('/get-message', ChatController.getMessages);
  app.get('/chat/:hash', ChatController.display);
  app.get('/enter-info/:hash', ChatController.enterUsername);
}