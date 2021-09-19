document.getElementById("button").addEventListener("click",sentimental);

async function sentimental(text){
    document.getElementById("loader").style.visibility = 'visible';
    const response = await fetch("https://sentim-api.herokuapp.com/api/v1/",{
        method:"POST",
        headers: { Accept: "application/json",
         "Content-Type": "application/json"},
           body: JSON.stringify({text: document.getElementById("text").value})
    })
    const data = await response.json()
    try{ console.log(data);
        document.getElementById("loader").style.visibility = 'hidden';
        document.getElementById("answer").textContent = `Result: ${data.result.type} , ${data.result.polarity}`;
        if(data.result.type === "positive"){
          document.getElementById("answer").style.color="green";
        }
        if(data.result.type === "negative"){
          document.getElementById("answer").style.color = "red";
        }
        if(data.result.type === "neutral"){
          document.getElementById("answer").style.color = "gray";
        }
        data.result.type === "positive"?
         document.getElementById("answer").classList = "positive"
         :data.result.type === "negative" ?
          document.getElementById("answer").classList = "negative":
          document.getElementById("answer").classList = "neutral ";
        }

          catch(throw_error) {
            document.getElementById('answer').innerHTML=throw_error.message;
            setTimeout(
                function() {
                    document.getElementById('answer').innerHTML='';
                }, 2000);
        }
    }
