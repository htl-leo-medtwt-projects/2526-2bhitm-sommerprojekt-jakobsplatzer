let startSection = document.getElementById('start-section');
let videoSection = document.getElementById('video-section');
let conWithChick = document.getElementById('con-with-chick');

videoSection.style.display = 'none';
conWithChick.style.display = 'none';



function startToVid(){
    startSection.style.display = 'none';
    videoSection.style.display = '';
}

function vidToCon(){
    startSection.style.display = 'none';
    videoSection.style.display = 'none';
    conWithChick.style.display = '';
}
