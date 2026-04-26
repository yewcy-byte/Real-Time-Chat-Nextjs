import { useEffect, useState } from "react";
import { nanoid } from "nanoid"

export const useUsername = () => {
    const [username, setUsername] = useState("");

    const ANIMALS = ["Lion", "Tiger", "Bear", "Wolf", "Fox", "Eagle", "Shark", "Dolphin"]
    const STORAGE_KEY = "chat_username"
    
    
    const generateUsername = () => {
     const word = ANIMALS[Math.floor(Math.random()* ANIMALS.length)]
     return `anonymous-${word}-${nanoid(5)}`;
    }

     useEffect(() => {
      const main =() =>{
        const stored = localStorage.getItem(STORAGE_KEY);
        if(stored){
          setUsername(stored);
          return;
        }else{
          const generated = generateUsername();
          localStorage.setItem(STORAGE_KEY, generated);
          setUsername(generated);
        }
      }

      main();
    },[])

    return {username};
}