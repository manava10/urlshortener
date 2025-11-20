
const input = document.getElementById("input-box");
const button = document.getElementById("submit-button");


button.addEventListener("click",async ()=>{
    try{
        const userInput = input.value.trim();
        if(!userInput){
            alert("Please enter a valid url dude , this is not a valid URL");
            return;
        }
        
        // Update port to match your backend (4000 or from env)
        const response = await fetch("http://localhost:4000/api/create",{
            method:"POST",
            headers:{
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                url:userInput
            })
        })
        
        // Check if response is ok before parsing
        if(!response.ok){
            const errorData = await response.json();
            alert(`Error: ${errorData.message || errorData.error || 'Failed to create short URL'}`);
            return;
        }
        
        const data = await response.json();
        const shortUrl = data.data.redirectUrl;
        document.getElementById("output").innerHTML = `
            <p>Your Short URL:</p>
            <a href="${shortUrl}" target="_blank">${shortUrl}</a>
        `;

    }catch(error){
        console.log("Error occurred: " + error);
        alert("Network error: Could not connect to server. Make sure the backend is running.");
    }
})