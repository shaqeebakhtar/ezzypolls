import { Server } from 'socket.io';
import * as http from 'http';
import { EVENTS } from '../utils/events';

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
    this._io.on('connection', (socket) => {
      console.log(`New Socket Connected`, socket.id);

      // users joining a specific poll
      socket.on(EVENTS.JOIN, ({ pollId }) => {
        socket.join(pollId);
      });
    });
  }

  get io() {
    return this._io;
  }
}
