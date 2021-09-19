//Add event when clicking button
const button = document.querySelector("button")
button.addEventListener("click", handleSumbit);


async function handleSumbit(event){
    //Get text and elements
    const textArea = document.querySelector("textarea");
    const text = textArea.value;
    const sentimentElement = document.querySelector(".sentiment")
    const polarityElement = document.querySelector(".polarity")
    
    //Add loading effect and Clear prev Results
    sentimentElement.parentElement.className = "";
    polarityElement.parentElement.className = "";
    sentimentElement.textContent = "";
    polarityElement.textContent = "";

    sentimentElement.parentElement.querySelector(".loading").hidden = false;
    polarityElement.parentElement.querySelector(".loading").hidden = false;
    document.querySelector(".httpcode").src = "https://bit.ly/2XwQxrz"

    //get sentiment and wait for response
    const {sentiment, polarity} = await getSentiment(text)

    //display result
    sentimentElement.textContent = sentiment;
    sentimentElement.parentElement.classList.add(sentiment);
    polarityElement.textContent = polarity;
    const polarityClass = (polarity > 0) ? "positive" : (polarity === 0) ? "neutral" : (polarity < 0) ? "negative" : "error"    
    polarityElement.parentElement.classList.add(polarityClass)

    //hidden loading gif
    sentimentElement.parentElement.querySelector(".loading").hidden = true;
    polarityElement.parentElement.querySelector(".loading").hidden = true;

    
}

async function getSentiment(text){
    const response = await getSentimentResponse(text);
    document.querySelector(".httpcode").src = `https://http.cat/${response.status}`
    let sentiment;
    let polarity;
    if(response.status >= 400){
        sentiment = "error";
        polarity = "error";
    }else{
        const responseJSON = await response.json();
        sentiment = responseJSON.result.type;
        polarity = responseJSON.result.polarity;
    }

    return {sentiment, polarity}
}

//Uses api to get sentiment of text
async function getSentimentResponse(text){
    const url = "https://sentim-api.herokuapp.com/api/v1/" //Api URL
    const headers = {Accept: "application/json", "Content-Type": "application/json"} //Api headers as defined by api creator
    const body = {"text":`"${text}"`} //text is the data i want to get sentiment from

    const response = await fetch(url, {
        method: 'POST', //Post because i am posting data
        headers: headers,
        body: JSON.stringify(body) //Stringify obj 
    }).catch(function(error){
        console.log(error)
    });
    return response; // parses JSON response into native JavaScript objects
}
