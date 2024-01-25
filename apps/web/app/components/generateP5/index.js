"use client"
import axios from "axios";
import { useState, useEffect } from "react";

const GenerateP5 = ({scriptContent}) => {
    const [result, setResult] = useState()
    useEffect(() => {
    axios.post('http://localhost:3333/api/v1/contribute/generateImage', {script: scriptContent})
        .then((res) => {
            setResult(res.data)
        })            
        .catch((err) => {
            console.log(err)
        })
    }, [scriptContent])
    
    return (
        <>
        {result ? <img src={`data:image/png;base64,${result}`} alt="Generated p5 Image" /> : 'Loading image...'}
        </>
    )
}

export default GenerateP5;