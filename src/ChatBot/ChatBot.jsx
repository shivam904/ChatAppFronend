import { CodeSharp, FlashAuto, Gif, Send } from '@mui/icons-material';
import axios from 'axios';
import {toast} from "react-hot-toast";
import gify from  "../assets/Untitled.mp4" ;
import React, { useState ,useRef,useEffect} from 'react'
import { api } from '../constants/config';
const ChatBot = () => {
    const [question,setQuestion]=useState("");
    const [answer,setAnswer]=useState("");
    const [isResponse,setIsResponse]=useState(false);
    const [messages,setMessages]=useState([]);
    const changeHandler=(e)=>{
        setQuestion(e.target.value);
    }
    const submitHandler=()=>{
        if(question){
            setIsResponse(true);
            generateAnswer();
            setQuestion("");
            console.log(answer);

        }else{
            toast.error("Please enter a question");
            
        }
    }
    
    async function generateAnswer(){
       
        const res= await axios({
             url:`https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=AIzaSyAjoUwttps0HH7TLLCuSC75683UlhAaCr0`,
             method:'POST',
             data:{
                 "contents": [
                     {
                         "parts": [
                             {
                                 "text": question
                             }
                         ]
                     }
                 ]
             }
         })
         setAnswer(res.data.candidates[0].content.parts[0].text);
         const allMessages=[...messages,{
            type:"flex-end",message:question
         },{
            type:"flex-start",message:res.data.candidates[0].content.parts[0].text
         }];
        
         setMessages(allMessages);
     }

     const chatContainerRef = useRef(null);

     useEffect(() => {
       // Scroll to the bottom when new messages are added
       chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
     }, [messages,question]); 

  return (
    <>
    <div  ref={chatContainerRef} style={{borderRadius:"15px",position:"relative", width:screen, minHeight:screen,height:"100%", overflowX:"hidden", backgroundColor:"#0E0E0E", color:'white' }}>

        {
            isResponse ?(<div style={{height:"80%", overflowX:"hidden",overflowY:"scroll"}}>
                <div   className='messages' style={{display:"flex",flexDirection:"column",  paddingTop:"30px",gap:"1rem"} }>
                {
                    messages?.map((msg,index)=>{
                        return  <div style={{clear:"both", backgroundColor:"#181818",padding:"15px",borderRadius:"30px", maxWidth:"85%",minWidth:"20%",alignSelf:(msg.type),wordWrap:"break-word",overflowWrap:"break-word"}} className='userMessage'>{msg.message}</div>
                    })
                }

                    {/* <div style={{clear:"both", backgroundColor:"#181818",padding:"15px",borderRadius:"30px", maxWidth:"85%",minWidth:"20%",alignSelf:"flex-end",wordWrap:"break-word",overflowWrap:"break-word"}} className='userMessage'>{question}</div>
                    <div style={{clear:"both", backgroundColor:"#181818",padding:"15px",borderRadius:"30px", maxWidth:"85%",minWidth:"20%",alignSelf:"flex-start",wordWrap:"break-word",overflowWrap:"break-word" }} >{answer}</div> */}
                    </div>
            </div>):(
                <div style={{alignItems:'center', justifyContent:"center", display:"flex", flexDirection:"column"}}>
            <h1 style={{fontSize:"2rem"}}>AssistMe</h1>
           
    </div>
            )
        }
        
    <div style={{height:"70px",position:"absolute",bottom:"0", margin:"5%",width:"90%",display:'flex',gap:"1rem"}}>
        <textarea style={{borderRadius:"25px",padding:"1rem",width:"100%", height:"100%",display:"flex", alignItems:"center",backgroundColor:"#181818", color:"white", outline:"none",border:"none", resize:"none"}} placeholder='Type your question here...'  value={question} onChange={(e)=>changeHandler(e)}/>
        <i style={{margin:"auto",cursor:"pointer"}} onClick={submitHandler}><Send/></i>
    </div>
    </div>
    </>
    
  )
}

export default ChatBot
