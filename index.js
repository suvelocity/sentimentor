
async function submitString(text) {
    let responseCode; //Saving the response code, to display the right cat in case of an error
    try {
        showLoading();
        const response = await fetch("https://sentim-api.herokuapp.com/api/v1/", {
            method: "post",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ text }),
        });
        responseCode = response.status;
        const result = await response.json();
        stopLoading();
        return result;
    }
    catch (error) {
        stopLoading();
        const errorPar = document.getElementById("errorMsg");
        errorPar.textContent = `An error has occourd! Make sure you entered text! \nError: ` + error

        const catPhoto = document.getElementById("cat")
        catPhoto.src = `https://http.cat/${responseCode}`
    }
}

const submit = document.getElementById("submit");
submit.addEventListener("click", checkSentiment);

function showLoading() //Shows the loading div
{
    const loading = document.getElementById("loader");
    loading.style.display="block";
}
function stopLoading() //Stops Showing the loading div
{
    const loading = document.getElementById("loader");
    loading.style.display="none";
}

//Clicked the submit button, in case of succsess, Shows the polarity and type of the input.
async function checkSentiment() {
    const typePar = document.getElementById("type");
    const polPar = document.getElementById("polarity");
    const displayDiv = document.getElementById("output");
    const catPhoto = document.getElementById("cat");
    const errorMsg = document.getElementById("errorMsg");

    //Resets contents
    typePar.textContent = "";
    polPar.textContent = "";
    catPhoto.src = "";
    errorMsg.textContent = "";

    const result = await submitString(document.getElementById("input-area").value);
    let polarity, type;
    if (result) {
        polarity = result.result.polarity;
        type = result.result.type;
    }
    displayDiv.style.display = "block";
    if (polarity > 0) {
        displayDiv.style.color = "green";
    }
    if (polarity < 0) {
        displayDiv.style.color = "red";
    }
    if (polarity === 0) {
        displayDiv.style.color = "grey";
    }

    typePar.textContent = "Type: " + type;
    polPar.textContent = "Polarity: " + polarity;
}