import { Server } from 'socket.io';
import * as http from 'http';

export class SocketService {
  private _io: Server;

  constructor(server: http.Server) {
    this._io = new Server(server, {
      cors: {
        allowedHeaders: ['*'],
        origin: '*',
      },
    });
  }

  public init() {
    this._io.on('connect', (socket) => {
      console.log(`New Socket Connected`, socket.id);
    });
  }

  get io() {
    return this._io;
  }
}
