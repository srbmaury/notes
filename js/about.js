let write_note = document.getElementById('write-note');
let add_note = document.getElementById('add-note');
let zero_notes = document.getElementById('zero-notes');
let intro = document.getElementById('intro');

document.getElementById('hamburger').addEventListener('click',()=>{
    let nav = document.getElementsByTagName('nav')[0];
    let search = document.getElementById('searchButton');
    let bars = document.getElementsByClassName('bars');
    if(nav.style.height === '20vh'){
        bars[0].style.transform = "rotate(0deg)";
        bars[1].style.transform = "rotate(0deg)";
        bars[0].style.marginTop = "5px";
        bars[1].style.marginTop = "5px";
        bars[2].style.visibility = "visible";
        bars[0].style.position = "relative";
        bars[1].style.position = "relative";
        bars[2].style.position = "relative";
        nav.style.height = '45px';
    }else{
        bars[0].style.transform = "rotate(45deg)";
        bars[1].style.transform = "rotate(-45deg)";
        bars[0].style.marginTop = "12px";
        bars[1].style.marginTop = "12px";
        bars[2].style.visibility = "hidden";
        bars[0].style.position = "absolute";
        bars[1].style.position = "absolute";
        nav.style.height = '20vh';
    }
});

intro.innerHTML = `
<h1>Saurabh Maurya</h1>
<br>
<h3 style="display:inline">High School:</h3> BPS Public School Naubatpur, Chandauli <br>
<h3 style="display:inline">Intermediate:</h3> BPS Public School Naubatpur, Chandauli

<br>
<h3 style="display:inline">Graduation:</h3> IIT Varanasi (BHU), Electronics Enginerring
<br>
<br>

<h4 style="display:inline">Programming Languages:</h4> C, C++, Python
<br>
<br>

<h4 style="display:inline">Technical Skills:</h4> Web Development, Machine Learning, Competitive Programming
<br>
<br>

<a href="https://srbmaury.github.io/Portfolio_Website/" target="_new">Portfolio Website</a>
`;
