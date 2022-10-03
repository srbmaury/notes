let write_note = document.getElementById('write-note');
let add_note = document.getElementById('add-note');
let zero_notes = document.getElementById('zero-notes');
let searchButton = document.getElementById('searchButton');
let text = document.getElementById('text');

let container, i;

window.onload = () =>{
    let times = localStorage.getItem('times');
    times = JSON.parse(times);

    let tasks = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks);

    i = localStorage.getItem('i');
    if(i == null) i = 0;

    container = document.createElement('div');
    container.id = 'all-taks';
    container.className = 'container';

    document.body.appendChild(container);

    if(tasks !== null){
        zero_notes.style.display = "none";

        for (let index = 0; index < tasks.length; index++){
            appendTask(tasks[index], times[index]);
        }
    }
}

add_note.addEventListener('click', ()=>{
    // localStorage.clear();
    let currTime = String(new Date());
    let textValue = write_note.value;

    let times = localStorage.getItem('times');
    times = JSON.parse(times);

    let tasks = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks);

    if(textValue.length === 0) return;

    if(tasks === null){
        let newTime = [];
        newTime.push(currTime);
        localStorage.setItem('times',JSON.stringify(newTime));

        let newTask = [];
        newTask.push(textValue);
        localStorage.setItem('tasks',JSON.stringify(newTask));
    }
    else{
        times.push(currTime);
        localStorage.setItem('times',JSON.stringify(times));

        tasks.push(textValue);
        localStorage.setItem('tasks',JSON.stringify(tasks));
    }

    tasks = localStorage.getItem('tasks');
    tasks = JSON.parse(tasks);

    zero_notes.style.display = "none";
    write_note.value = '';

    appendTask(textValue, currTime);
})

function appendTask(textValue, currTime){
    let newdate = document.createElement('div');
    let newdiv = document.createElement('div');

    newdate.style.width = "100%";
    newdate.style.height = "40px";
    newdate.style.backgroundColor = "skyblue";
    newdate.style.borderRadius = "10px 10px 0 0";
    newdate.style.padding = "15px 5px 0px 10px";
    newdate.id = `id${i}`;

    newdiv.style.width = "100%";
    newdiv.style.minHeight = "30px";
    newdiv.style.marginBottom = "20px";
    newdiv.style.backgroundColor = "rgb(91 169 200)";
    newdiv.style.borderRadius = "0 0 10px 10px";
    newdiv.style.padding = "15px 5px 5px 10px";
    newdiv.id = `task${i}`;

    let newTime = document.createElement('span');
    newTime.innerHTML = currTime.substring(4,15);
    newTime.style.fontWeight = "600";
    newTime.style.fontSize = "25px";
    newTime.style.color = "#423ae9";
    newTime.id = `date${i}`;

    newdate.appendChild(newTime);

    newTime = document.createElement('span');
    newTime.innerHTML = currTime.substring(16,24);
    newTime.style.marginLeft = "10px";
    newTime.style.fontSize = "15px";
    newTime.id = `time${i}`;

    newdate.appendChild(newTime);

    newdiv.innerHTML = `${textValue}`;
    
    container.appendChild(newdate);
    container.appendChild(newdiv);
    i++;
}

searchButton.addEventListener('click', ()=>{
    let heading = document.getElementsByTagName('h1')[1];
    text.value = text.value.toLowerCase();
    heading.innerHTML = `Notes Containg "${text.value}":`;
    for (let index = 0; index < i; index++) {
        let textCheck = document.getElementById(`task${index}`).innerText.toLowerCase();
        let timeCheck = document.getElementById(`time${index}`).innerText.toLowerCase();
        let dateCheck = document.getElementById(`date${index}`).innerText.toLowerCase();

        if(textCheck.includes(text.value) || timeCheck.includes(text.value) || dateCheck.includes(text.value)){
            document.getElementById(`id${index}`).style.display = "visible";
            document.getElementById(`task${index}`).style.display = "visible";
        }else{
            document.getElementById(`id${index}`).style.display = "none";
            document.getElementById(`task${index}`).style.display = "none";
        }
    }
    text.value = "";
})

document.getElementById('clear-notes').addEventListener('click', ()=>{
    localStorage.clear();
    window.location.reload();
    zero_notes.style.display = "visible";
})