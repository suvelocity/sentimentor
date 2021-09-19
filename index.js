const URL = "https://sentim-api.herokuapp.com/api/v1/";
let text;

async function buttonHandler () {
    try {
        document.getElementById("output").classList = "";
        document.getElementById("type").innerText = "loading...";
            document.getElementById("polarity").innerText = "loading...";
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
            if (!almostAns.ok) {
                document.getElementById("type").innerText = "Something went wrong... ";
                return;
            }

            document.getElementById("type").innerText = result.type;
            document.getElementById("polarity").innerText = result.polarity;
            document.getElementById("output").classList.add(result.type);
    }
    catch (error){
        document.getElementById("type").innerText = "Something went wrong . . . " + error;
    }
}
