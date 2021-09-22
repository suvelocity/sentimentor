const url = `https://sentim-api.herokuapp.com/api/v1/`;
let text;

async function buttonOptions() {
  try {
    document.getElementById("output").classList = "";
    document.getElementById("type").innerText = "loading...";
    document.getElementById("polarity").innerText = "loading...";
    text = document.getElementById("opinion").value;
    const response = await fetch(url, {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text
      }),
    });
    const answer = await response.json();
    const result = answer.result;
    if (!response.ok) {
      document.getElementById("type").innerText = "something went wrong!";
      return;
    }
    document.getElementById("type").innerText = result.type;
    document.getElementById("polarity").innerText = result.polarity;
    document.getElementById("output").classList.add(result.type);
  } catch (error) {
    document.getElementById("type").innerText =
      "Something went wrong . . . " + error;
  }
}
