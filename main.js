function createpage(){
    let main = document.createElement("div");
    main.id = "main";
    const children = [{
        content:'IMGE',
        type:'img',
        id:'catPhoto'
    },{
        content:'check if a text expresses positive or negative emotions',
        type:'h1',
    },{
        content:"loading",
        type:"div",
        class:"spinner-border",
        visibility:"hidden",
        id:'load'
    },{
        content:'text',
        type:'textarea',
        id:"answer" 
    },{
        content: "check",
        type:"button",
        class:"btn btn-primary btn-lg"
    },{
        content:'The Result',
        type:'h2',
        id:'title'
   
    }]
    children.forEach(child => {                                 
        t = document.createElement(child.type);
        if  (child.type=="div"){
            t.setAttribute("class", child.class);
            t.setAttribute("role", "status");
            t.style.visibility= child.visibility;
            t.id=child.id;
            main.appendChild(t);}

        if  (child.type=='img'){
            t.id=child.id;
            main.appendChild(t);}

        if( child.type=="h1"){
            t.textContent=child.content;
            t.style.color='white';
            main.appendChild(t);}

        if  (child.type=="h2"){
            t.textContent=child.content;
            t.id=child.id;
            t.style.color='white';
            main.appendChild(t);}

        if  (child.type=="textarea"){
            t.style.width = "828px";
            t.style.height = "260px";
            t.id=child.id;
            main.appendChild(t);}


        if  (child.type=="button"){
            t.textContent=child.content;
            t.setAttribute("class", child.class);
            t.addEventListener('click',hundleButtonClickEvent);
            main.appendChild(t);
        }});
    document.body.appendChild(main);
}

createpage();
function hundleButtonClickEvent(event){
    text = document.getElementById('answer').value;
    checkPositiveNegetive(text);
}
async function checkPositiveNegetive(text) {
    
 document.getElementById ("load").style.visibility = 'visible';
  
    let response = await fetch('https://sentim-api.herokuapp.com/api/v1/',
    {
        method: 'POST',
        body: JSON.stringify({ text : text }),
        headers: {
             'Accept' : "application/json" ,
            'Content-Type': "application/json"
        }
    });
    if(response.ok){
        document.getElementById ("load").style.visibility = 'hidden';
        let json = await response.json();
        let result = json['result'];
        let type = result['type'];
        let polarity = result['polarity'];
        document.getElementById('title').textContent= "polarity : " + polarity +" "+ 'type : '+ type;
        console.log(json);
        
        if(type=="negative"){   
            document.getElementById('title').style.color = "red";
        }
         if(type=="positive"){
            document.getElementById('title').style.color = "green";
         }
          if (type=="neutral"){
            document.getElementById('title').style.color = "gray";
          }
    }
        else{
            document.getElementById('catPhoto').setAttribute('src' ,  `https://http.cat/${response.status}.jpg`);
            document.getElementById ("load").style.visibility = 'hidden';
            alert('error');
        }

}

