import { useState } from 'react'
import './App.css'

function App() {
  const [input, setInput] = useState("")
  const [result, setResult] = useState("")
  const [history, setHistory] = useState([])
  const calculateResult = ()=>{
    try {
      setResult(eval(input))
    } catch (error) {
      setResult("Error")
    }
  }
  const undo = () => {
    // Remove the last input from history and update input
    setHistory((prevHistory) => {
      const newHistory = [...prevHistory];
      if (newHistory.length > 0) {
        const lastInput = newHistory.pop(); // Get the last input
        setInput(lastInput); // Set it as the current input
        calculateResult(); // Update result based on the last input
      }
      return newHistory;
    });
  };
  const handleClick = (value) => {
    if (value === "=") {
      calculateResult()
    } else if (value === "C") {
      clearInput()
    }else if(value==="Undo"){
      undo()
    }else {
      setHistory((prevHistory) => [...prevHistory, input])
      setInput(prevInput => {
        const newInput = prevInput + value
        try {
          setResult(eval(newInput))  // Update result in real-time
        } catch {
          setResult("Error")
        }
        return newInput
      })
    }
  }
  const handleChange = (e)=>{
    setResult(e.target.value)
  }

  const clearInput = ()=>{
    setInput("")
    setResult("")
    setHistory([]);
  }
  return (
    <>
      <div className="container bg-stone-700 pt-5 pb-16 w-1/4 justify-center mx-auto rounded-xl">
        <h2><span className='text-white hover:font-bold bg-black p-2 rounded-3xl'>Calculator</span></h2>
        <div className="inputs">
          <input className="rounded-md mt-4 mb-3 w-5/6" onChange={handleChange} type="text" value={input} readOnly/>
          {/* <p><span className='text-black bg-teal-50 p-2 rounded-lg pt-0 pb-0 '>{result}</span></p> */}
          {<div className={result?"text-black bg-teal-50 p-2 rounded-lg pt-0 pb-0 w-3/4 mx-auto":""}>{result}</div>}
        </div>
        <div className="buttons gap-4 flex flex-wrap list-none justify-center pt-7 ">
            {['1','2','3','4','5','6','7','8','9','0','+','-','*','/','C','=','Undo'].map(value=>(
              <button key={value} onClick={()=>handleClick(value)} className="bg-gray-300 text-black p-4 pt-1 pb-1 rounded-md hover:font-extrabold">{value}</button>
            ))}
        </div>
      </div>
    </>
  )
}

export default App