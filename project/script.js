let startSection = document.getElementById('start-section');
let videoSection = document.getElementById('video-section');
let conWithChick1 = document.getElementById('con-with-chick1');
let conWithChick2 = document.getElementById('con-with-chick2');
let conWithChick3 = document.getElementById('con-with-chick3');
let conWithChick4 = document.getElementById('con-with-chick4');


videoSection.style.display = 'none';
conWithChick1.style.display = 'none';
conWithChick2.style.display = 'none';
conWithChick3.style.display = 'none';
conWithChick4.style.display = 'none';



function startToVid(){
    startSection.style.display = 'none';
    videoSection.style.display = '';
}

function vidToCon(){
    videoSection.style.display = 'none';
    conWithChick1.style.display = '';
}

function Con1ToCon2(){
    conWithChick1.style.display = 'none';
    conWithChick2.style.display = '';
}
function Con2ToCon3(){
    conWithChick2.style.display = 'none';
    conWithChick3.style.display = '';
}
function Con3ToCon4(){
    conWithChick3.style.display = 'none';
    conWithChick4.style.display = '';
}


