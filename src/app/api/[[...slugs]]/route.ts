import { Elysia, t } from "elysia"
import { nanoid } from "nanoid";
import {redis} from "@/lib/redis";
import { create } from "domain";


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

const app = new Elysia({ prefix: '/api' })
    .use(rooms)


export const GET = app.fetch 
export const POST = app.fetch 

export type App = typeof app;