let startSection = document.getElementById('start-section');
let videoSection = document.getElementById('video-section');
let conWithChick1 = document.getElementById('con-with-chick1');

videoSection.style.display = 'none';
conWithChick1.style.display = 'none';



function startToVid(){
    startSection.style.display = 'none';
    videoSection.style.display = '';
}

function vidToCon(){
    videoSection.style.display = 'none';
    conWithChick1.style.display = '';
}
