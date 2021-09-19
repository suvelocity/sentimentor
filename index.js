const URL = "https://sentim-api.herokuapp.com/api/v1/";
let text;

async function buttonHandler () {
    text = document.getElementById("dream").value;
    const almostAns = await fetch(URL, {
            headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
            text
            }),
        });
    const ans = await almostAns.json();
    const result = ans.result;
    document.getElementById("type").innerText = result.type;
    document.getElementById("polarity").innerText = result.polarity;
}
