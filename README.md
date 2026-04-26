<p align="center">
  <img src="your-logo-url.png" width="200" />
  <h2 align="center">Real-Time-Chat-Nextjs</h2>
  <p align="center">Following a Youtube Tutorial by Josh Tried Coding</p>
</p>

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![License](https://img.shields.io/badge/license-MIT-green)
![Build](https://img.shields.io/badge/build-passing-brightgreen)

> [!NOTE]
> Useful information that users should know.

> [!TIP]
> Helpful advice for doing things more easily.

> [!IMPORTANT]
> Key information users need to know to achieve their goal.

> [!WARNING]
> Urgent info that needs immediate user attention to avoid problems.

Press <kbd>Ctrl</kbd> + <kbd>C</kbd> to copy.

<span style="color:red">**CRITICAL:**</span> Connection lost to Redis.
<span style="color:green">**SUCCESS:**</span> Message pushed to channel.

| Mobile View | Desktop View |
| :---: | :---: |
| <img src="link1.png" width="200" /> | <img src="link2.png" width="400" /> |

# Notes to be elaborated (What I learnt)

installed elysia 

installed tanstack which is enhanced react hooks

installed nanoid for easy unique id generation

installed redis hosted in upstash so that it provides cloud hosting for realtime data for chat

stored items in localStorage of browser using
  localStorage.setItem(STORAGE_KEY, generated);

essential way to run function one time when the page loads, because it will wheck whether the const have value already or not

    const [queryClient] = useState(() => new QueryClient())


created unique cookie generation with nanoid and validate cookie id with middleware

used zod package to prevent abuse message limit and DDOS

# TanStack Query (enhanced react hooks)


useMutation (enhanced useState so that no need set loading states manually)

mutationFn + onError
isPending
isError

onSuccess + queryClient.invalidateQueries




# Tailwind notes
flex-1 fills the whole space either vertiaclly or hoizontally based on the flex-col or default flex

transition-all make sure animation smooth

animation-pulse make pulsation color

absolute make the object not affected by other components in the same div and make it float on top of all components

space-y-4 make it have 4 pixles gap for all child elements

autoFocus can be add to the input field html tag to auto focus

<details>
  <summary>🚀 Click to see technical setup</summary>

  ### Any Markdown here
  - Step 1
  - Step 2

  ```javascript
  console.log("This code is hidden until clicked!");
