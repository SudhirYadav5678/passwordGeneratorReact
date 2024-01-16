import { useCallback, useState, useEffect,useRef } from 'react'
import './App.css'

function App() {
  const [length, setLength] = useState(8);
  const [number, setNumber] = useState(false);
  const [character, setCharacter] = useState(false);
  const [password,setPassword ]=useState()

  //useRef hoolk
  const passwordref=useRef(null)

  const passwordGenerator= useCallback(()=>{
    let pass=""
    let str="ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
    if(number) str+="1234567890"
    if(character) str+="!@#$%^&*"
    for (let index = 1; index <=length; index++) {
      let char= Math.floor(Math.random()*str.length+1);
      pass+=str.charAt(char);
    }
    setPassword(pass)
  }, [length, number, character,setPassword])
   

  const copyPasswordToClipboard= useCallback(()=>{
    passwordref.current?.select()
    window.navigator.clipboard.writeText(password)
  }, [password])

  //useEffect
  useEffect(()=>{passwordGenerator()}, [length, character,number,setPassword])


  return (
    <>
      <h1>Password Generator</h1> 
      <div><input type="text" value={password}
      placeholder='Password by Sudhir'
      readOnly
      ref={passwordref}/>
      <button onClick={copyPasswordToClipboard}>Copy</button>
      </div>
        <div>
          <div>
            <input type="range" min={8} max={20}value={length} className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}/>
            <label>Length :{length}</label>
          </div>
          <div>
            <input type="checkbox" defaultChecked={number}
            onChange={()=>{
              setNumber((prev)=>!prev);
            }}/>Number
          </div>
          <div>
            <input type="checkbox" defaultChecked={character}
            id="numberInput"
            onChange={()=>{
              setCharacter((prev)=>!prev);
            }}/>Special Character
          </div>
        </div>
    </>
  )
}
export default App