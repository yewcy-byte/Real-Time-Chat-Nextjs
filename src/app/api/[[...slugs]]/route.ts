import { Elysia, t } from "elysia"
import { nanoid } from "nanoid";
import {redis} from "@/lib/redis";
import { create } from "domain";
import { authMiddleware } from "./auth";
import { z } from "zod";
import { Message, realtime } from "@/lib/realtime";


const ROOM_TTL_SECONDS= 60 * 10


const rooms = new Elysia ({prefix: '/room'})
.post ("/create", async () =>{
const roomid = nanoid();

await redis.hset(`meta:${roomid}`, {
connected : [],
createdAt  : Date.now(),


}
);

 await redis.expire (`meta:${roomid}`, ROOM_TTL_SECONDS)
 return {roomid}
})

const messages = new Elysia ({prefix: "/message"})
.use(authMiddleware)
.post ("/", async({body, auth}) => 
    {
    const {sender, text} = body

    const roomExists = await redis.exists(`meta:${auth.roomId}`)

    if (!roomExists){
       throw new Error("Room does not exist")
    }


    const message: Message = {
        id: nanoid(),
        sender,
        text,
        timestamp: Date.now(),
        roomId: auth.roomId,
    }
    

    await redis.rpush(`messages:${auth.roomId}`, {...message, token:auth.token})
    await realtime.channel(auth.roomId).emit("chat.message", message)

    //housekeeping
    const remaining = await redis.ttl(`meta:${auth.roomId}`)


    await redis.expire(`messages:${auth.roomId}`, remaining)

    await redis.expire(auth.roomId, remaining)
}, {
    query: z.object({
        roomId : z.string(),
    }),
    body : z.object({
        sender : z.string().max(100),
        text : z.string().max(1000),
    }),
})

const app = new Elysia({ prefix: '/api' })
    .use(rooms).use(messages)


export const GET = app.fetch 
export const POST = app.fetch 

export type App = typeof app;