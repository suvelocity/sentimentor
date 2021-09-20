//Add event when clicking button
const submitButton = document.querySelector("button[button-id='1']");
submitButton.addEventListener("click", handleSumbit);
const checkAgainButton = document.querySelector("button[button-id='2']");
checkAgainButton.addEventListener("click", handleCheckAgain);
//Add secret checkbox
const checkBoxElement = document.querySelector(".betterload-checkbox");
checkBoxElement.addEventListener("click", handleSecretCheckboxClick);


async function handleSumbit(event){
    //Get text and elements
    const loadingElement = document.querySelector(".loading-area");
    const userInputElement = document.querySelector('.user-input');
    const resultAreaElement = document.querySelector('.results-area');
    const textArea = document.querySelector("textarea");
    const text = textArea.value;
    const sentimentElement = document.querySelector(".sentiment");
    const polarityElement = document.querySelector(".polarity");
    
    //Add loading effect and Clear prev Results
    textArea.value = "";
    sentimentElement.className = sentimentElement.classList[0];
    polarityElement.className = polarityElement.classList[0];
    sentimentElement.textContent = "";
    polarityElement.textContent = "";
    
    //Hide input Element and show loading-area
    userInputElement.classList.add("hide");
    loadingElement.classList.remove("hide");
    page.insertBefore(loadingElement, userInputElement);

    //get sentiment and wait for response
    const {sentiment, polarity} = await getSentiment(text)

    //display result and hide loading screen
    loadingElement.classList.add('hide');
    page.insertBefore(resultAreaElement, loadingElement);
    resultAreaElement.classList.remove('hide') //Show results
    
    sentimentElement.textContent = " " + sentiment;
    sentimentElement.classList.add(sentiment);
    polarityElement.textContent = " " + polarity;
    const polarityClass = (polarity > 0) ? "positive" : (polarity === 0) ? "neutral" : (polarity < 0) ? "negative" : "error"    
    polarityElement.classList.add(polarityClass)
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
        console.log("Error " + error)
    });
    return response; // parses JSON response into native JavaScript objects
}

function handleCheckAgain(){
    const loadingElement = document.querySelector(".loading-area");
    const userInputElement = document.querySelector('.user-input');
    const resultAreaElement = document.querySelector('.results-area');

    resultAreaElement.classList.add('hide');
    userInputElement.classList.remove('hide');
    page.insertBefore(userInputElement, resultAreaElement);
}

function handleSecretCheckboxClick(event){
    const loadingIMG = document.querySelector(".loading");
    if(event.target.checked){
        loadingIMG.src = "images\\loading2.gif"
    }else{
        loadingIMG.src = "images\\loading.gif"
    }
}
