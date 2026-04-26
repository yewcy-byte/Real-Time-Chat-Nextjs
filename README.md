# Real-Time-Chat-Nextjs
Following a Youtube Tutorial by Josh Tried Coding


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
