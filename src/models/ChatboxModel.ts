import {BaseModel, schema} from "./BaseModel";

class ChatboxModel extends BaseModel {
  protected modelName = "Chatbox";
  protected TableSchema = new schema(
    {
      name: {
        type: String,
        required: "Missing name"
      },
      hash: {
        type: String,
        required: "Missing hash"
      },
      creator: {
        type: String,
        required: "Missing creator"
      },
      password: {
        type: String,
        required: "Missing Password"
      }
    },
    {
      versionKey: false
    }
  );
}

export default new ChatboxModel();
