import app from "./app";
import * as http from "http";
import {socket} from "./controllers/SocketController";

const PORT = 4321;

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on port: ${PORT}`);
});

socket(server);