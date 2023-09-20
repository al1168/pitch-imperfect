'use client'
import { useEffect, useRef, useState } from "react";
// type 
export default function RecorderPage() {    

    const record = document.querySelector(".record");
    const stop = document.querySelector(".stop");
    const soundClips = document.querySelector(".sound-clips");
    const [stream,setStream] = useState<MediaStream | undefined>(undefined)
    const [mediaRecorder,setMedoaRecorder] = useState<MediaRecorder | undefined>()
    const [audioUrl, setAudioUrl] = useState("");
    const recordFunction = ()=>{
        if (!mediaRecorder){
            return 
        }
        mediaRecorder.start();
        console.log(mediaRecorder.state);
        console.log("recorder started");
        
        mediaRecorder.ondataavailable = (event) => {
            const audioBlob = new Blob([event.data], { type: "audio/webm" });
            const audioUrl = URL.createObjectURL(audioBlob);
            setAudioUrl(audioUrl);
          };
        
    }

    const stopRecording = ()=>{
        if (!mediaRecorder){
            return 
        }
    }

    useEffect(()=>{
        if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
            console.log("getUserMedia supported.");
            navigator.mediaDevices
              .getUserMedia(
                // constraints - only audio needed for this app
                {
                  audio: true,
                },
              )
          
              // Success callback
              .then((stream) => {
                setMedoaRecorder(new MediaRecorder(stream))
                let chunks = [];
    
              })
          
              // Error callback
              .catch((err) => {
                console.error(`The following getUserMedia error occurred: ${err}`);
              });
          } else {
            console.log("getUserMedia not supported on your browser!");
          }
    
    
    },[])
    

// mediaRecorder.ondataavailable = (e) => {
//   chunks.push(e.data);
// };
// mediaRecorder.onstop = (e) => {
//     console.log("recorder stopped");
  
//     const clipName = prompt("Enter a name for your sound clip");
  
//     const clipContainer = document.createElement("article");
//     const clipLabel = document.createElement("p");
//     const audio = document.createElement("audio");
//     const deleteButton = document.createElement("button");
  
//     clipContainer.classList.add("clip");
//     audio.setAttribute("controls", "");
//     deleteButton.innerHTML = "Delete";
//     clipLabel.innerHTML = clipName;
  
//     clipContainer.appendChild(audio);
//     clipContainer.appendChild(clipLabel);
//     clipContainer.appendChild(deleteButton);
//     soundClips.appendChild(clipContainer);
  
//     const blob = new Blob(chunks, { type: "audio/ogg; codecs=opus" });
//     chunks = [];
//     const audioURL = window.URL.createObjectURL(blob);
//     audio.src = audioURL;
  
//     deleteButton.onclick = (e) => {
//       let evtTgt = e.target;
//       evtTgt.parentNode.parentNode.removeChild(evtTgt.parentNode);
//     };
//   };
  
  return(
    <div className="flex justify-center p-9">
    <article className="clip flex flex-col justify-center" >
  <audio src={audioUrl} controls />
  <p>your clip name</p>
  <button>Delete</button>
  <button className="record " onClick={recordFunction}>record</button>
  <button className="stop" onClick={recordFunction}>stop</button>
</article>

</div>
  )

}


