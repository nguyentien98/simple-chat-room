import { Request, Response } from "express";
import MessageModel from "../models/MessageModel";
import ChatboxModel from "../models/ChatboxModel";
import * as helper from "../helpers";

class ChatController {
  public welcome(req: Request, res: Response) {
    res.render("welcome");
  }

  public display(req: Request, res: Response) {
    res.render("chat");
  }

  public async createBox(req: Request, res: Response) {
    try {
      let roomInfo = req.body;
      let hash = Math.random().toString(36).substr(2, 10);
      let checkHash = await ChatboxModel.filter({hash: hash});
      while ((checkHash as any).length > 0) {
        hash = Math.random().toString(36).substr(2, 10);
      }
      roomInfo.password = helper.generateHash(roomInfo.password);
      roomInfo.hash = hash;
      let chatroom = await ChatboxModel.create(roomInfo);
      res.send(chatroom);
    } catch(error) {
      console.log(error);
      res.send("Something went wrong!");
    }
  }

  public enterUsername(req: Request, res: Response) {
    res.render("enter_username");
  }

  public checkRoomAuth(req: Request, res: Response) {
    let hash = req.body.room;
    let password = req.body.password;
    ChatboxModel.filter({hash: hash})
      .then((data) => {
        if ((data as any).length <= 0) {
          return res.send({isValid: false})
        }
        if (!helper.compareHash(password, (data as any)[0].password)) {
          return res.send({isValid: false});
        }
        res.send({
          hash: (data as any)[0].hash,
          isValid: true
        });
      })
      .catch(error => console.log(error));
  }

  public getMessages(req: Request, res: Response) {
    let hash = req.body.room;
    let password = req.body.password;
    ChatboxModel.filter({hash: hash})
      .then((data) => {
        if ((data as any).length <= 0) {
          return res.send({isValid: false})
        }
        if (!helper.compareHash(password, (data as any)[0].password)) {
          return res.send({isValid: false});
        }
        MessageModel.filter({room: hash}).then(messages => {
          res.send({
            messages: messages,
            isValid: true
          });
        });
      })
      .catch(error => console.log(error));
  }
}

export default new ChatController();