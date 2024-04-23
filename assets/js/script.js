const targetContainer = document.querySelector('.target-container');
const titleContainer = document.querySelector('.anim-slide-fade-in');
const hitContainer = document.querySelector('.hit-container');
const hitDisplay = document.querySelector('.hit');
const resultContainer = document.querySelector('.result-container');
const scoreDisplay = document.querySelector('.score');

let tarCnt = 30;
let hitTimes = [];
let isFirstHit = true;

let targetContainerRect = 0, targetContainerWidth = 0, targetContainerHeight = 0;

let updateContainerMetrics = () => {
  targetContainerRect = targetContainer.getBoundingClientRect();
  targetContainerWidth = targetContainerRect.width - 300;  // 스피커 아이콘하고 겹쳐질 것을 우려해서 상하좌우 여백 + 타겟의 크기를 고려하여 컨테이너 너비보다 안쪽으로만 움직이도록 함
  targetContainerHeight = targetContainerRect.height - 200;
}

updateContainerMetrics();

function show(elem) {
  elem.style.display = 'block';
}

function showFlex(elem) {
  elem.style.display = 'flex';
}

function hide(elem) {
  elem.style.display = 'none';
}

const toggleAudio = () => {
  document.querySelector('.audio-container').addEventListener('click', function() {
    let container = this;
    if (container.querySelector('svg').getAttribute('data-icon') === "volume-up") {
      container.innerHTML = `<svg data-prefix="fas" data-icon="volume-mute" class="svg-inline--fa fa-volume-mute fa-w-16 fa-2x" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">Toggle sound effects on and off</title><path fill="currentColor" d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zM461.64 256l45.64-45.64c6.3-6.3 6.3-16.52 0-22.82l-22.82-22.82c-6.3-6.3-16.52-6.3-22.82 0L416 210.36l-45.64-45.64c-6.3-6.3-16.52-6.3-22.82 0l-22.82 22.82c-6.3 6.3-6.3 16.52 0 22.82L370.36 256l-45.63 45.63c-6.3 6.3-6.3 16.52 0 22.82l22.82 22.82c6.3 6.3 16.52 6.3 22.82 0L416 301.64l45.64 45.64c6.3 6.3 16.52 6.3 22.82 0l22.82-22.82c6.3-6.3 6.3-16.52 0-22.82L461.64 256z"></path></svg>`;
    } else {
      container.innerHTML = `<svg data-prefix="fas" data-icon="volume-up" class="svg-inline--fa fa-volume-up fa-w-18 fa-2x" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512"><title>Toggle sound effects on and off</title><path fill="currentColor" d="M215.03 71.05L126.06 160H24c-13.26 0-24 10.74-24 24v144c0 13.25 10.74 24 24 24h102.06l88.97 88.95c15.03 15.03 40.97 4.47 40.97-16.97V88.02c0-21.46-25.96-31.98-40.97-16.97zm233.32-51.08c-11.17-7.33-26.18-4.24-33.51 6.95-7.34 11.17-4.22 26.18 6.95 33.51 66.27 43.49 105.82 116.6 105.82 195.58 0 78.98-39.55 152.09-105.82 195.58-11.17 7.32-14.29 22.34-6.95 33.5 7.04 10.71 21.93 14.56 33.51 6.95C528.27 439.58 576 351.33 576 256S528.27 72.43 448.35 19.97zM480 256c0-63.53-32.06-121.94-85.77-156.24-11.19-7.14-26.03-3.82-33.12 7.46s-3.78 26.21 7.41 33.36C408.27 165.97 432 209.11 432 256s-23.73 90.03-63.48 115.42c-11.19 7.14-14.5 22.07-7.41 33.36 6.51 10.36 21.12 15.14 33.12 7.46C447.94 377.94 480 319.54 480 256zm-141.77-76.87c-11.58-6.33-26.19-2.16-32.61 9.45-6.39 11.61-2.16 26.2 9.45 32.61C327.98 228.28 336 241.63 336 256c0 14.38-8.02 27.72-20.92 34.81-11.61 6.41-15.84 21-9.45 32.61 6.43 11.66 21.05 15.8 32.61 9.45 28.23-15.55 45.77-45 45.77-76.88s-17.54-61.32-45.78-76.86z"></path></svg>`;
    }
  });
}

toggleAudio();

const createTarget = () => {
  targetContainer.innerHTML = `
    <div class="target" onClick="hitTarget()">
      <div class="bg"></div>
      <div class="circle circle1"></div>
      <div class="circle circle2"></div>
      <div class="circle circle3"></div>
      <div class="line vertical-line"></div>
      <div class="line horizontal-line"></div>
    </div>
  `;

  calcRanPos();
}

const calcRanPos = () => {
  const target = document.querySelector('.target');
  const x = Math.random() * targetContainerWidth + 150;
  const y = Math.random() * targetContainerHeight + 50;
  console.log("New position:", x, y);

  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
}

//초기화 함수
const initialize = () => {
  hide(resultContainer);
  showFlex(titleContainer);
  show(targetContainer);

  hitTimes = [];
  isFirstHit = true;
  hitDisplay.textContent = tarCnt;
  scoreDisplay.textContent = 0;

  document.querySelector('.target').style.left = '50%';
  document.querySelector('.target').style.top = '50%';
}

const hitTarget = () => {
  targetContainer.innerHTML = '';
  createTarget();

  if(isFirstHit) {
    show(hitContainer);
    hide(titleContainer);
    isFirstHit = false;
  } else {
    hitTimes.push(new Date().getTime());
    console.log(hitTimes[hitTimes.length - 1])
    hitDisplay.textContent = tarCnt - hitTimes.length;
  
    if(hitTimes.length >= tarCnt) {
      let totalTime = 0;
      for(let i = 1; i < hitTimes.length; i++) {
        totalTime += (hitTimes[i] - hitTimes[i - 1]);
      }
      // const totalTime = (hitTimes[hitTimes.length - 1] - hitTimes[0]);
      const avgTime = Math.floor(totalTime / tarCnt);
      scoreDisplay.textContent = avgTime;
      hide(hitContainer);
      hide(targetContainer);
      showFlex(resultContainer);
    }
  }
};

document.querySelector('.btn-home').addEventListener('click', initialize);

window.addEventListener('resize', updateContainerMetrics);