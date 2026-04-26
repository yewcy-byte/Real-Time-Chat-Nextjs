# Real-Time-Chat-Nextjs

A private, self-destructing real-time chat app built with Next.js, Elysia, Upstash Redis, and TanStack Query.

![Version](https://img.shields.io/badge/version-1.0.0-blue)


## Overview

This project was built while following a tutorial by Josh Tried Coding and then adapted into a room-based chat app with:

- room creation and sharing
- ephemeral message storage
- real-time messaging
- cookie-based room access validation
- a lightweight, terminal-inspired UI

## Features

- Create a unique chat room in one click.
- Share the room URL with other users.
- Keep message history in Redis with room TTL cleanup.
- Validate room access with middleware and cookies.
- Send and fetch messages using TanStack Query.
- Generate simple, readable anonymous usernames in the browser.

## Tech Stack

- Next.js 16
- React
- TypeScript
- Elysia
- Upstash Redis
- Upstash Realtime
- TanStack Query
- Zod
- nanoid
- Tailwind CSS

## Getting Started

### Prerequisites

- Node.js installed
- Redis and Realtime environment variables configured for Upstash

### Installation

```bash
npm install
```

### Development

```bash
npm run dev
```

Then open:

```bash
http://localhost:3000
```

## How It Works

1. A user opens the home page and receives a locally stored anonymous username.
2. Clicking **Create Secure Room** creates a new room id on the server.
3. The app redirects to `/room/[roomId]`.
4. Middleware validates access and attaches a room token cookie.
5. Messages are stored in Redis and broadcast through Realtime.
6. Room metadata expires automatically after the configured TTL.

## Project Notes

- `useState(() => ...)` is used for one-time client-only initialization.
- `useMutation` handles sending messages without manual loading state management.
- `useQuery` keeps the message list synced with the server.
- Zod is used to validate room and message payloads.
- Redis TTL is used to keep rooms temporary and self-destructing.

## Folder Structure

```text
src/
  app/
    api/
      [[...slugs]]/
        route.ts
    components/
      providers.tsx
    room/
      [roomId]/
        page.tsx
    globals.css
    layout.tsx
    page.tsx
  hooks/
    use-username.ts
  lib/
    client.ts
    realtime.ts
    realtime-client.ts
    redis.ts
  proxy.ts
```

## Tutorial Credit

This project was inspired by the following tutorial:

<p align="center">
  <a href="https://youtu.be/D8CLV-MRH0k">
    <img src="https://img.youtube.com/vi/D8CLV-MRH0k/0.jpg" alt="Josh Tried Coding tutorial" width="600" />
  </a>
</p>

## Optional Markdown Examples

These are kept here as examples of formatting you can reuse later if you want a more visual README.

> [!NOTE]
> Useful information that users should know.

> [!TIP]
> Helpful advice for doing things more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.

<span style="color:red"><strong>CRITICAL:</strong></span> Connection lost to Redis.
<span style="color:green"><strong>SUCCESS:</strong></span> Message pushed to channel.

| Mobile View | Desktop View |
| :---: | :---: |
| <img src="link1.png" width="200" alt="Mobile view" /> | <img src="link2.png" width="400" alt="Desktop view" /> |

<details>
  <summary>Technical Setup</summary>

  - Step 1
  - Step 2

  ```javascript
  console.log("This code is hidden until clicked!");
  ```
</details>

## License

MIT
