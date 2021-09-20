
// selecting dom element
const textInput = document.querySelector("#submit");
const textOutput = document.querySelector("#polarity");
const btn = document.querySelector("#button");

// selecting loading div
const loader = document.querySelector("#loading");

// showing loading
function displayLoading() {
    loader.classList.add("display");
}

// hiding loading 
function hideLoading() {
    loader.classList.remove("display");
}

async function hundleButtonClickEvent(event){
    displayLoading()

    const input = document.getElementById('submit');
    console.log(input);
    const val = input.value;
    console.log(val);

    const object = { text: `${val}` };
    let response = await fetch("https://sentim-api.herokuapp.com/api/v1/",
    {
        method: 'POST',
        body: JSON.stringify(object),
        headers: {
          'Content-Type': 'application/json',
          'Accept': "application/json"
        }
    });
    displayLoading();
    if (response.ok) { // if HTTP-status is 200-299
        // get the response body (the method explained below)
        hideLoading();
        let json = await response.json();
        console.log(json);
        jsonObj = json['result'];
        console.log(jsonObj['polarity']);
        let element = document.getElementById('polarity');
        element.textContent = jsonObj['type']+ ':' +jsonObj['polarity'];
        if(jsonObj['polarity'] > 0)
            element.classList = ['green'];
        else if(jsonObj['polarity'] < 0)
            element.classList = ['red'];
        else    
            element.classList = ['grey'];
      } else {
        alert("HTTP-Error: " + response.status);

      }
      document.getElementById('image').setAttribute('src',`https://http.cat/${response.status}.jpg`);
      document.getElementById('image').style.visibility = 'visible';
}

function structure(){
    let main = document.createElement('div');

    const children = [{
        content:'Enter Polarity',
        type:'h1',
        id:'polarity',
        class: 'card-title'
    },{
        content:'Text',
        type:'input',
        id:'submit',
        kind:'textarea',
        class:'input-group-text'
    },{
        id:'button',
        content:'convert',
        type:'button',
        class:'btn btn-primary'
    },{
        id:'image',
        content:'none',
        type:'img',
        class:'card-img-top'
    }];
    children.forEach(child => {
        r = document.createElement(child.type);
        if(child.type == 'h1'){
            r.id = child.id;
        }
        if(child.type == 'input'){
            r.id = child.id;
            r.setAttribute('type', child.kind);
            r.setAttribute('placeholder', child.content)
        }
        if(child.type == 'button'){
            r.addEventListener('click', hundleButtonClickEvent);
            r.textContent = child.content;
        }
        if(child.type == 'img'){
            r.id = child.id;
            r.style.visibility = "hidden";
        }
        r.classList = child.class;
        main.appendChild(r);
    });
    document.body.appendChild(main);

}
structure();