const URL = "https://sentim-api.herokuapp.com/api/v1/";
let text;

async function buttonHandler () {
    try {
        if (document.getElementById("image")) {
            document.getElementById("image").remove();
        }
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
            const image = document.createElement("img");
            setAttributes(image, {id:"image", src: `https://http.cat/${almostAns.status}`, alt: "statuscat", height: "300px", width: "300px"});
            document.body.append(image);
            document.getElementById("type").innerText = result.type;
            document.getElementById("polarity").innerText = result.polarity;
            document.getElementById("output").classList.add(result.type);
            document.getElementById("output").classList.add("answer");
    }
    catch (error){
        document.getElementById("type").innerText = "Something went wrong . . . " + error;
    }
}

function setAttributes (elm, attr) {
    for (let key in attr) {
        elm.setAttribute(key, attr[key]);
    }
}