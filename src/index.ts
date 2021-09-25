import express, { Application, Response, Request } from 'express';
import http from 'http';
import socketIo, { Socket, Server as IOServer } from 'socket.io';

const app: Application = express();
const server: http.Server = http.createServer(app);
const io: IOServer = socketIo(server);

app.get('/', (req: Request, res: Response) => {
    res.send('Hola usuairo, estas entrando a la matrix');
});

io.on('connection', (socket: Socket) => {
    console.log('👍usuario conectado:::', socket.id);

    /*     socket.on('on-location', (data: any) => {
            console.log('🚩localizacion del usuario', data);
        }); */

    socket.on('on-location', (data: any) => {
        console.log('🚩localizacion del usuario', data);
        io.emit('on-location', data);
    });

    socket.on('disconnect', () => {
        console.log('💀usuario desconectado::', socket.id);
    });
});

server.listen(5000, () => {
    console.log('running😎');
});