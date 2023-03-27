import { useEffect, useRef, useState } from "react"
import { io } from "socket.io-client"

import type { ChangeEvent } from "react"
import type { Socket } from "socket.io-client"
import { useRouter } from "next/router"

import { randomNumbers } from "../utils/bingo"

let socket: undefined | Socket

export default function Owner() {

    const {query, isReady} = useRouter()

    const [numbers, setNumbers] = useState<number[]>([])
    const [cartela, setCartela] = useState<number[]>([])
    const [connection, setConnection] = useState(false)
    const [index, setIndex] = useState(0)
    const [winner, setWinner] = useState('')

    const secret = useRef<HTMLInputElement>(null)

    const room = query.room
    
    useEffect(() => {
        if (!isReady) return;

        if(!connection){
            socketInit()
        }
        
        
    }, [isReady])

    const socketInit = async () => {
        fetch('/api/socket')

        socket = io()

        socket.on('connect', () => {
            console.log("Connected!");

            setConnection(true)
        })

        socket.on('announce-winner', (name) => {
            setWinner(name)
        })

        setNumbers(randomNumbers)
        
        console.log(room);
        
        socket.emit("join-room", room)

    }

    const sendSecretNumber = () => {
        
        let tempArray = numbers
        let newNumber = parseInt(secret.current?.value ?? "0")
        if( newNumber != undefined){
            tempArray[index] = newNumber
        }
        
        setNumbers(tempArray)

        drawNumber()
    }

    const drawNumber = () => {
        console.log("Draw number");
        console.log(numbers);
        
        
        if(index < 25){

            let tempArray = cartela;
            tempArray.push(numbers[index])

            setCartela(tempArray);
            console.log(cartela);
            if( socket !== undefined ){
                socket.emit("draw-number", {room: room, numbers: cartela})
            }

            setIndex( prev => {
                return prev + 1
            })
        }
        console.log(index);
        
        
        
        
    }


    return(
        
        <div className="container mx-auto px-4 py-8">
            <h1 className="mb-4">Owner</h1>

            {
                (cartela.length < 25)?
                <div className="mb-4">
                    <button className="rounded-full px-4 py-2 font-semibold text-sm bg-cyan-500 text-white" onClick={ drawNumber }>Click</button>
                </div>
                :
                <div className="mb-4">
                    <button className="rounded-full px-4 py-2 font-semibold text-sm bg-gray-500 text-white" disabled>Done</button>
                </div>
                
            }

            {
                (winner != '')?
                <div>Winner is {winner}!</div>
                :
                <div></div>
            }
            
            <div className="mb-4">
                <input type="text" ref={secret}/>
                <button className="rounded-full px-4 py-2 font-semibold text-sm bg-orange-500 text-white ml-4" onClick={ sendSecretNumber }>Send</button>
            </div>

            <div className="grid grid-cols-5 gap-4 justify-between mb-4">
                {cartela.map((c) => (
                <div
                    key={c}
                    className="rounded-full bg-green-300 w-12 h-12 p-2 flex justify-center items-center font-bold text-2xl "
                >
                    {c}
                </div>
                ))}
            </div>

            
            
        </div>
    )
}
