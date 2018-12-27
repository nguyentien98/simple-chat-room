import {BaseModel, schema} from './BaseModel';

class MessageModel extends BaseModel {
  protected modelName = "Message";
  protected TableSchema = new schema(
    {
      message: {
        type: String,
        required: "Missing message"
      },
      username: {
        type: String,
        required: "Missing username"
      },
      room: {
        type: String,
        required: "Missing room"
      }
    },
    {
      versionKey: false,
      timestamps: true,
    }
  );

  public getMessageByRoom(room) {
    return this.model().find({room: room}).sort({"createdAt": 1});
  }
}

export default new MessageModel();
