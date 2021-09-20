// document.getElementById("button").addEventListener("click", sentimental);

async function sentimental(text) {
  try {
    document.getElementById('error-box').innerHTML = '';
    document.getElementById("loader").style.visibility = 'visible';
    const response = await fetch("https://sentim-api.herokuapp.com/api/v1/", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        text: document.getElementById("text").value
      })
    });

    console.log(response);

    let data;
    if (response.status === 200) {
      data = await response.json();
    }

    document.getElementById("loader").style.visibility = 'hidden';
    document.getElementById('cat-img').src = `https://http.cat/${response.status}`

    if (!data) {
      document.getElementById("error-box").innerHTML = response.statusText;
    } else {
      console.log(response.status)
      document.getElementById("answer").textContent = `Result: ${data.result.type} , ${data.result.polarity}`;
      if (data.result.type === "positive") {
        document.getElementById("answer").style.color = "green";
      }
      if (data.result.type === "negative") {
        document.getElementById("answer").style.color = "red";
      }
      if (data.result.type === "neutral") {
        document.getElementById("answer").style.color = "gray";
      }
      data.result.type === "positive" ?
        document.getElementById("answer").classList = "positive" :
        data.result.type === "negative" ?
        document.getElementById("answer").classList = "negative" :
        document.getElementById("answer").classList = "neutral ";
    }
  } catch (error) {
    console.log(error);
    document.getElementById("loader").style.visibility = 'hidden';
    document.getElementById("error-box").innerHTML = error;
    setTimeout(
      function () {
        document.getElementById('error-box').innerHTML = '';
      }, 5000);
  }
}