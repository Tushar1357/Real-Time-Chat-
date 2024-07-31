
const socket = io()
let cookies = document.cookie.split(';')
let cookie = cookies[0].split('=')[1]
let myusername = cookies[1].split('=')[1]



socket.on("other_message",(name,message)=>{
    renderMessage("left",name,message)
})




let chats = document.querySelector('#chatbox').children
let chatlen = chats.length
const sendbtn = document.getElementById('sendbtn')
sendbtn.addEventListener('click',()=>{
    let message = document.getElementById('inpvalue').value
    let split_message = message.split(" ")
    if (message!="" && split_message.length<=300){
    renderMessage('right',"You",message)
    document.getElementById('inpvalue').value = ""
    socket.emit("new_message",myusername,message);}
})

let popsound = document.getElementById('popsound')

function renderMessage(position,username,message){
    chatlen+=1
    let newelement = document.createElement('div')
    newelement.setAttribute('id',chatlen)
    
    if (position == "right"){
    newelement.setAttribute('class','right')
    newelement.innerHTML = `
    <div id="info">
        <span class="name">You</span>
        <pre>${message}</pre>
        <span id="clipboard"><img src="/images/clipboard.svg" width="15px" alt="" /></span>
    </div>
    `
    }
    else{
    newelement.setAttribute('class','left')
    newelement.innerHTML = `
    <div id="info">
        <span class="name">${username}</span>
        <pre>${message}</pre>
        <span id="clipboard"><img src="/images/clipboard.svg" width="15px" alt="" /></span>
    </div>
    `
    }
    
    document.getElementById('chatbox').appendChild(newelement)
    newelement.scrollIntoView()
    popsound.load()
    popsound.play()
}

const fetchevents = async ()=>{
    try {
        const response = await fetch(`${window.location.origin}/getchats`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            },
            credentials: 'include' // Include cookies with the request
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = JSON.parse(await (response.text()));
        
        data.forEach(element => {
            if(element.username == myusername){
                renderMessage("right","You",element.message)
            }
            else{
                renderMessage("left",element.username,element.message)

            }
        });

        document.querySelectorAll('#clipboard').addEventListener('click',()=>{
            console.log('hello')
        })
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

document.addEventListener('DOMContentLoaded',fetchevents)



