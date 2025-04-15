let prompt=document.querySelector("#prompt")
let container=document.querySelector(".container")
let btn=document.querySelector("#btn")
let chatContainer=document.querySelector(".chat-container")
let userMessage=null;
let Api_Url="https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=AIzaSyDanrAYO9GpQX0_x_4R0GrcVN3PV52oJJY" 
function creatChatBox(html,className){
    let div=document.createElement("div")
    div.classList.add(className)
    div.innerHTML=html
    return div
}
function showLoading(){
    let html=` <div class="img">
                <img src="chatbot.png" alt="" width="50">
            </div>
            <p class="text"></p>
            <img class="loading" src="loading.gif" alt="loading" height="50">`
            let aiChatBox=creatChatBox(html,"user-chat-box")
            chatContainer.appendChild(aiChatBox)
            getApiResponse(aiChatBox)
}
async function getApiResponse(aiChatBox){
    let textElement=aiChatBox.querySelector(".text")
    try{
       let response=await fetch(Api_Url,{
        method:"POST",
        headers:{"Content-Type": "application/json"},
        body:JSON.stringify({
            contents: [{
    "parts":[{text: userMessage}]
    }]
        })
       })
       let data=await response.json();
       
       let apiResponse=data?.candidates?.[0].content?.parts?.[0]?.text;
       textElement.innerText=apiResponse
    }
    catch(error){
        console.log(error)

    }
    finally{
        aiChatBox.querySelector(".loading").style.display="none"
    }

}
btn.addEventListener("click",()=>{
    userMessage=prompt.value
    if(userMessage==""){
        container.style.display="flex"
    }{
        container.style.display="none"
    }
    // console.log(userMessage)
    if(!userMessage) return;
    let html=`<div class="img">
                <img src="user.png" alt="" width="50">
            </div>
            <p class="text"></p>`;
    let userChatBox=creatChatBox(html,"user-chat-box")        
    userChatBox.querySelector(".text").innerText=userMessage   
    chatContainer.appendChild(userChatBox)
    prompt.value=""
    setTimeout(showLoading,500)

})
