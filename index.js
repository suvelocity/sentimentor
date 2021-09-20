const button = document.getElementById("button"); //get button element
button.onclick = function () {
    const userText = document.querySelector(".inputbox").value; //get the text from the user
    const div = document.getElementById("result"); //get the result element
    div.innerHTML = "<b>the result is: </b>";
    let loadingDiv = document.getElementById("loading");
    loadingDiv.style.visibility = "visible";
    const divChild = document.createElement("p");

    const response = fetch("https://sentim-api.herokuapp.com/api/v1/", {
        //fetch gets url,methods,headers,body
        method: "POST", //
        headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: userText }), //JSON.stringify - turn the object into a string
    })

        .then((res) => {
            document.getElementById("img").setAttribute('src', `https://http.cat/${res.status}`)
            return res.json(); //translte for us to JavaScript
        })

        .then((data) => {
            const polarity = data.result.polarity
            const type = data.result.type
            if (polarity > 0)
                divChild.style.color = "green";
            if (polarity < 0)
                divChild.style.color = "red";

            loadingDiv.style.visibility = "hidden";
            divChild.innerHTML = `polarity:${polarity}  type:${type}`
            div.append(divChild);
        })
        .catch((error) => {
            loadingDiv.style.visibility = "hidden";
            divChild.style.color = "red";
            divChild.style.fontSize = "20px";
            div.append(divChild);
            console.log(error);
            divChild.append("An error occurred, details in the console...");
        });
};

