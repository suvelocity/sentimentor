//Getting the html elements
const INPUT = document.getElementById("textarea");
const SUBMIT = document.getElementById("submit");
const RESULT_DIV = document.getElementById("result");
const POLARITY = document.getElementById("polarity")
const TYPE = document.getElementById("type");
const LOAD = document.getElementById("loading");
//Event listener for submit button
SUBMIT.addEventListener("click", handleSubmitClickEvent);

//Take input and returns an object
function inputConvertor(text){
  return {"text": text}  
}

//Handler
async function handleSubmitClickEvent(e){
    try{
        //Display loading
        LOAD.style.display = "block";
        //Input-Output handling
        let input = INPUT.value;
        input = inputConvertor(input);
        let output = await getPolarity(input);
        let polar = document.createTextNode(output.polarity);
        let type = document.createTextNode(output.type);
        POLARITY.appendChild(polar);
        TYPE.appendChild(type);
        //Check type and replace color
        typeCheckNColor(output.type); 
        //Replace loading
        loading(polar);
    } catch(error){
        throw new Error("Invalid text");
    }
}

//Type check&&color
function typeCheckNColor(type){
    if(type == "negative"){
        TYPE.style.backgroundColor = "red";
        POLARITY.style.backgroundColor = "red";
    }else if(type == "positive"){
        TYPE.style.backgroundColor = "green";
        POLARITY.style.backgroundColor = "green";
    }else{
    TYPE.style.backgroundColor = "gray";
    POLARITY.style.backgroundColor = "gray";
    }
}
//Loading
function loading(polar){
    if(polar != undefined){
        LOAD.style.display = "none";
        RESULT_DIV.style.display = "block";
    }
}

//Creating API variables 
const URL = "https://sentim-api.herokuapp.com/api/v1/";

//Polarity check by API
async function getPolarity(input){
    const RESPONSE = await fetch(URL, {
        method: "POST",
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json",  
        },
        body: JSON.stringify(input)
    });
    const RESULT = await RESPONSE.json();
    return RESULT.result;
}



