const targetContainer = document.querySelector('.target-container');
const targetContainerInner = targetContainer.querySelector('.inner');
const titleContainer = document.querySelector('.anim-slide-fade-in');
const hitContainer = document.querySelector('.hit-container');
const hitDisplay = document.querySelector('.hit');
const resultContainer = document.querySelector('.result-container');
const scoreDisplay = document.querySelector('.score');
const inputContainer = document.querySelector('.input-container');
const nameInput = document.querySelector('#user-name');
const rankContainer = document.querySelector('.rank-container');
const btnRank = document.querySelector('.btn-rank');
const btnConfirm = document.querySelector('.btn-confirm');
const btnSave = document.querySelector('.btn-save');
const btnLink = document.querySelector('.btn-share.link');
const btnKakao = document.querySelector('.btn-share.kakao');
const btnNaver = document.querySelector('.btn-share.naver');
const btnFacebook = document.querySelector('.btn-share.facebook');
const btnX = document.querySelector('.btn-share.x');

let tarCnt = 30;
let hitTimes = [];
let isFirstHit = true;

let targetContainerRect = 0, targetContainerWidth = 0, targetContainerHeight = 0;

let prevX = 0, prevY = 0;

$(".modal-scrollArea").mCustomScrollbar({ theme: "dark-2" });

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

const updateContainerMetrics = () => {
  targetContainerRect = targetContainer.getBoundingClientRect();
  
  // 스피커 아이콘하고 겹쳐질 것을 우려해서 상하좌우 여백 + 타겟의 크기를 고려하여 컨테이너 너비보다 안쪽으로만 움직이도록 함
  if(window.innerWidth <= 768) {
    targetContainerWidth = targetContainerRect.width - 100;
    targetContainerHeight = targetContainerRect.height - 150;
  } else {
    targetContainerWidth = targetContainerRect.width - 120;
    targetContainerHeight = targetContainerRect.height - 180;
  }
}

updateContainerMetrics();

const createTarget = () => {
  targetContainerInner.innerHTML = `
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

  const target = document.querySelector('.target');

  prevX = parseFloat(target.style.left.replace('px', ''));
  prevY = parseFloat(target.style.top.replace('px', ''));
}

const calcRanPos = () => {
  const target = document.querySelector('.target');
  console.log(target)
  const targetSize = target.querySelector('.bg').offsetWidth;

  let newX, newY;

  // 타겟이 너무 조금씩 이동하지 않도록 타겟 사이즈 이상 이동하게 좌표 설정
  do {
    newX = Math.random() * targetContainerWidth + targetSize / 2 + 10;
    newY = Math.random() * targetContainerHeight + targetSize / 2 + 10;
  } while (Math.sqrt(Math.pow(prevX - newX, 2) + Math.pow(prevY - newY, 2)) < targetSize);

  target.style.left = `${newX}px`;
  target.style.top = `${newY}px`;
}

//초기화 함수
const initialize = () => {
  hide(resultContainer);
  showFlex(titleContainer);
  show(targetContainer);
  show(btnRank);

  hitTimes = [];
  isFirstHit = true;
  hitDisplay.textContent = tarCnt;
  scoreDisplay.textContent = 0;

  document.querySelector('.target').style.left = '50%';
  document.querySelector('.target').style.top = '50%';
}

const hitTarget = () => {
  targetContainerInner.innerHTML = '';
  createTarget();

  if(isFirstHit) {
    show(hitContainer);
    hide(titleContainer);
    hide(btnRank);
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



/* share */
const copyToClipBoard = async () => {
  const link = window.location.href;

  try {
    await navigator.clipboard.writeText(link) // https나 localhost에서만 작동함
    .then(() => {
      alert('링크가 복사되었습니다.');
    })
  } catch (err) {
    console.log(err);
  }
}

Kakao.init('8c95de0cfa76751e9c40c9be9ed41cb2');

const shareKakao = () => {
  console.log('shareKakao 실행');

  const url = window.location.href;
  
  Kakao.Link.sendDefault({
    objectType: 'feed',
    content: {
      title: '나의 에임 점수는?',
      description: '나의 에임점수를 확인하고 훈련하자!',
      imageUrl: "https://github.com/Yejin-Han/aim_trainer/blob/main/assets/img/thumbnail.jpg?raw=true",
      link: {
        webUrl: url,
        mobileWebUrl: url,
      },
    },
    buttons: [ // 버튼 링크는 행사 페이지로?
      {
        title: '공유하기',
        link: {
          webUrl: url,
          mobileWebUrl: url,
        }
      }
    ]
  })
}

const shareNaver = () => {
  const title = encodeURIComponent("나의 에임 점수는?");
  const url = encodeURIComponent(window.location.href);
  window.open(`https://share.naver.com/web/shareView?url=${url}&title=${title}`);
}

const shareFacebook = () => {
  const url = encodeURIComponent(window.location.href);
  window.open(`http://www.facebook.com/sharer/sharer.php?u=${url}`);
}

const shareX = () => {
  const text = encodeURIComponent("나의 에임 점수는? 👉 ");
  const url = encodeURIComponent(window.location.href);
  window.open(`https://twitter.com/intent/tweet?text=${text}&url=${url}`);
}

btnLink.addEventListener('click', copyToClipBoard);
btnKakao.addEventListener('click', shareKakao);
btnNaver.addEventListener('click', shareNaver);
btnFacebook.addEventListener('click', shareFacebook);
btnX.addEventListener('click', shareX);



/* rank */
btnSave.addEventListener('click', () => {
  const name = nameInput.value;
  const time = scoreDisplay.textContent;

  fetch('http://127.0.0.1:3000/score', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, time })
  })
  .then(response => response.json())
  .then(data => {
    console.log('Score saved: ', data);
    alert('Score saved successfully!');
    updateRankList();
  })
  .catch(err => console.error('Error saving score: ', err));

});

btnRank.addEventListener('click', () => {
  show(rankContainer);
});

document.querySelector('.rank-container .dim').addEventListener('click', () => {
  hide(rankContainer);
});

btnConfirm.addEventListener('click', () => {
  if(nameInput.value.trim() !== "") {
    hide(inputContainer);
  } else {
    alert("이름을 입력해주세요.");
  }
});

const updateRankList = () => {
  fetch('http://127.0.0.1:3000/scores')
  .then(res => res.json())
  .then(scores => {
    const rankList = document.querySelector('.rank-list');
    rankList.innerHTML = '';

    if(scores) {
      scores.forEach((score, idx) => {
        const li = document.createElement('li');
        li.innerHTML = `
          <div class="rank-box">
            <div class="rank-num">${idx + 1}</div>
            <div class="rank-usr">${score.name}</div>
            <div class="rank-score">${score.time}</div>
          </div>
        `;
  
        rankList.appendChild(li);
      });
    }
  })
  .catch(err => console.error('Error loading scores: ', err));
}

window.onload = updateRankList;