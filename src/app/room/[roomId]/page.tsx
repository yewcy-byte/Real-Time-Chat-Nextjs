"use client"

import {useParams, useRouter} from "next/navigation"
import { useState, useRef, use, useEffect,  } from "react";
import { useMutation, useQuery } from "@tanstack/react-query";
import { client } from "@/lib/client";
import { useUsername } from "@/hooks/use-username";
import type { Message } from "@/lib/realtime";
import { format } from "date-fns";
import { useRealtime } from "@/lib/realtime-client";


function formatTimeRemaining(seconds: number){
    const mins = Math.floor(seconds/60)
    const secs = seconds % 60

    return(`${mins}:${secs.toString().padStart(2, "0")} `)
}

export default function RoomPage() {

    const router = useRouter();

    const {username} = useUsername();
    
    const roomId = useParams().roomId as string;

    const [copyStatus, setCopyStatus] = useState("Copy")

    const[input, setInput] = useState("")

    const inputRef = useRef<HTMLInputElement>(null)

    const [timeRemaining, setTimeRemaining] = useState<number | null>(null)


    const {data: ttlData} = useQuery({
        queryKey: ["ttl", roomId],
        queryFn: async () => {
            const res = await client.room.ttl.get({query:{roomId}})

            return res.data
        }})

        useEffect(() => {
            if (ttlData?.ttl !== undefined){
                setTimeRemaining(ttlData.ttl)
            }
        }, [ttlData])

        useEffect(() => {
            if (timeRemaining === null || timeRemaining <= 0) return
            if (timeRemaining == 0){
                router.push("/?destroyed=true")
                return
            }

            const interval = setInterval(() =>{
                setTimeRemaining((prev) => {
                    if (prev === null || prev <= 1){
                        clearInterval(interval)
                        return 0
                    }
                    return prev - 1
                })
            }, 1000 )

            return () => clearInterval(interval)
        },[timeRemaining, router])



    const {data: messagesData, refetch} = useQuery<{ messages: Message[] }>({
        queryKey: ["messages", roomId],
        queryFn: async () => {
            const res = await client.message.get({
                query: {roomId}
            })

            return res.data ?? { messages: [] }
        },
    })


    const {mutate: sendMessage, isPending} = useMutation({
        mutationFn: async ({text}: {text:string}) => {
            // send message to backend
            await client.message.post({sender: username, text}, {query:{roomId}})

            setInput("")
        }
    })


useRealtime({
channels: [roomId],
events: ["chat.message", "chat.destroy"],
onData: ({event}) => {
if (event === "chat.message"){

  refetch();
}

if (event === "chat.destroy"){
  router.push("/?destroyed=true")
}
}
})

const {mutate:destroyRoom} = useMutation(
    {
        mutationFn: async () => {
            await client.room.delete(null, {query:{roomId}})
        }
    }
)

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
                "text-red-500" : "text-amber-600" }`}>{timeRemaining !== null ? formatTimeRemaining(timeRemaining) : "--:--"}</span>
        
        </div>
    </div>
                <button onClick= {() => destroyRoom()}className="text-xs bg-zinc-800 hover:bg-red-600 px-3 py-1.5 rounded text-zinc-400 hover:text-white font-bold transition-all group flex items-center gap-2 disabled:opacity-50 ">
                    <span className="group-hover:animate-pulse">💣</span>
                        DESTROY NOW
                </button>
    </header>

    <div className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-thin">
{messagesData?.messages.length === 0 && (
    <div className="flex items-center justify-center h-full">
        <p className="text-zinc-600 text-sm font-mono">No messages yet</p>
    </div>
)}

{messagesData?.messages.map((msg: Message) => (
 <div key={msg.id} className ="flex flex-col items-start">
    <div className="max-w-[80%] group">
<div className = "flex items-baseline gap-3 mb-1">
<span className = {`text-xs font-bold ${msg.sender === username? "text-green-500" : "text-blue-500"}`}>
    {msg.sender === username ? "You" : msg.sender}
</span>
<span className="text-[10px] text-zinc-600">{format( msg.timestamp, "HH:mm")}</span>
</div>

<p className="text-sm text-zinc-700 leading-relaxed break-all">{msg.text}</p>
    </div>
 </div>
))}
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
                    sendMessage({text: input})
                       inputRef.current?.focus() 
                    }
                }}
                />


                </div>
                <button onClick={() =>{sendMessage({text: input}); inputRef.current?.focus()}} disabled={!input.trim() || isPending} className="bg-zinc-800 text-zinc-400 px-6 text-sm font-bold hover:text-zinc-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed cursor-pointer">SEND</button>
    </div>
    </div>
</main>    )


}