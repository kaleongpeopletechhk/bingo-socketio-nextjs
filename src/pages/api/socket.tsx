import type { NextApiRequest, NextApiResponse } from 'next'
import { Server as IOServer } from "socket.io";
import type { Socket as NetSocket } from 'net';
import type { Server as HTTPServer } from 'http';

interface SocketServer extends HTTPServer{
    io?: IOServer | undefined
}

interface SocketWithIO extends NetSocket{
    server: SocketServer
}

interface NextApiResponseWithSocket extends NextApiResponse{
    socket: SocketWithIO
}

export default function SocketHandler(_ : NextApiRequest, res: NextApiResponseWithSocket) {

    if(res.socket.server.io){
        console.log("socket running....");
        res.end()

        return
    }
    else{
        console.log("socket setup....");
        
        const io = new IOServer(res.socket.server)
        res.socket.server.io = io

        io.on("connection", (socket) => {
            console.log("----socket on connection----");

            socket.on("join-room", (room) => {
                console.log("Room Joined: " + room);
                
                socket.join(room);
            });

            socket.on("send-winner", (room, name) => {
                console.log("Winner: " + name + " Room: " + room);

                socket.to(room).emit('announce-winner', name);
            })
            
            //receive emitted messages
            socket.on("draw-number", (obj) => {
                console.log(obj);
                
                //owner send number and broadcast to EE
                socket.to(obj.room).emit('update-numbers', obj.numbers)
            })
        })

    }
    
    res.end()

}