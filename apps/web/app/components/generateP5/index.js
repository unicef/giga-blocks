"use client"
import axios from "axios";
import { useState, useEffect } from "react";

const GenerateP5 = ({scriptContent}) => {
    const [result, setResult] = useState()
    useEffect(async () => {
    try {
        const res = await axios.post('http://localhost:3333/api/v1/contribute/generateImage', {script: scriptContent})
        setResult(res.data)
    } catch (error) {
        console.log(error)  
    }
    }, [scriptContent])
    
    return (
        <>
        {result ? <img src={`data:image/png;base64,${result}`} alt="Generated p5 Image" /> : 'Loading image...'}
        </>
    )
}

export default GenerateP5;