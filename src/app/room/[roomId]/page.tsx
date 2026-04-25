"use client"

import {useParams} from "next/navigation"
import { useState, useRef } from "react";


function formatTimeRemaining(seconds: number){
    const mins = Math.floor(seconds/60)
    const secs = seconds % 60

    return(`${mins}:${secs.toString().padStart(2, "0")} `)
}

export default function RoomPage() {
    const {roomId} = useParams();

    const [copyStatus, setCopyStatus] = useState("Copy")

    const[input, setInput] = useState("")

    const inputRef = useRef<HTMLInputElement>(null)

    const [timeRemaining, setTimeRemaining] = useState<number | null>(121)

    const copyLink = () => {
        const url = window.location.href;
        navigator.clipboard.writeText(url)
        setCopyStatus("copied!")
        setTimeout(() => setCopyStatus("copy"), 2000)
    }
    

    return(
<main className="flex flex-col h-screen max-h-screen overflow-hidden">
    <header className = "border-b border-zinc-800 p-4 flex items-center justify-between bg-zinc-900/30">
    <div className= "flex items-center gap-4">
        <div className="flex flex-col">
            <span className="text-xs text-zinc-500 uppercase">Room:</span>

            <div className="flex items-center gap-2">
                <span className="font-bold text-lime-300 text-shadow-md">{roomId}</span>
                <button  onClick= {copyLink} className = "text-[10px] bg bg-zinc-800 hover:bg-zinc-700 px-2 py-0.5 rounded text-zinc-400 hover:text-zinc-200 transition-colors">
                    {copyStatus}
                </button>
            </div>
        </div>

        <div className="h-8 w-px bg-zinc-800"/>

        <div className="flex flex-col">
            <span className="text-xs text-zinc-500 uppercase">Self Destruct</span>
            <span className={`text-sm font-bold flex items-center gap-2 text-shadow-2xs ${timeRemaining !== null && timeRemaining < 60 ? 
                "text-red-500" : "text-amber-500" }`}>{timeRemaining !== null ? formatTimeRemaining(timeRemaining) : "--:--"}</span>
        
        </div>
    </div>
                <button className="text-xs bg-zinc-800 hover:bg-red-600 px-3 py-1.5 rounded text-zinc-400 hover:text-white font-bold transition-all group flex items-center gap-2 disabled:opacity-50 ">
                    <span className="group-hover:animate-pulse">💣</span>
                        DESTROY NOW
                </button>
    </header>

    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">


    </div>

    <div className="p-4 border-t border-zinc-800 bg-zinc-900/30">
    <div className= " flex gap-4">
                <div className="flex-1 relative group">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 text-green-500 animate-pulse">{">"}</span>
                
                <input type="text" className="w-full bg-black border border-zinc-800 focus:border-lime-400 focus:outline-none transition-color text-zinc-100 placeholder:text-zinc-700 py-3 pl-8 pr-4 text-sm" 
                
                placeholder="Enter Message"
                
                autoFocus
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) =>{
                    if (e.key === "Enter" && input.trim()){
                       // send message to backend
                       inputRef.current?.focus() 
                    }
                }}
                />


                </div>
                <button className="bg-zinc-800 text-zinc-400 px-6 text-sm font-bold hover:text-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">SEND</button>
    </div>
    </div>
</main>    )


}