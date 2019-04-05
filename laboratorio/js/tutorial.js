const videoEl = document.querySelector('.instrucoes-videos video');
const assistirVideos = document.querySelectorAll('.assistir-video');
const progressoEl = document.querySelector('.instrucoes-videos .progresso');
const playEl = document.querySelector('.instrucoes-videos .controles-video .icon-Play');
const fullScreenEl = document.querySelector('.instrucoes-videos .controles-video .icon-FullScreen');
let videoDimensions = null;

export default function tutorial() {

  const fullScreen = el => {
    if (el.requestFullscreen) {
      el.requestFullscreen();
    } else if (el.mozRequestFullScreen) {
      el.mozRequestFullScreen();
    } else if (el.webkitRequestFullscreen) {
      el.webkitRequestFullscreen();
    } else if (el.msRequestFullscreen) {
      el.msRequestFullscreen();
    }
  };

  const resetProgress = () => {
    progressoEl.style.transitionProperty = 'none';
    setTimeout(() => {
      progressoEl.style.width = 0;
      setTimeout(() => {
        delete progressoEl.style.transitionProperty;
      }, 0);
    }, 0);
  };

  // coloca eventos de click nos botões .assistir-video
  assistirVideos.forEach(el => el.addEventListener('click', e => {
    const passoEl = e.currentTarget.closest('li');

    document.querySelectorAll('.passos-doacao li').forEach(el => el.classList.remove('ativo'));
    passoEl.classList.add('ativo');

    const videoName = e.currentTarget.dataset.video;
    videoEl.src = `videos/${videoName}.mp4`;
    videoEl.play();
    resetProgress();
    playEl.classList.add('icon-Pause');

    // se a largura for menor que 960px, rolar para mostrar o vídeo
    if (window.innerWidth <= 960) {
      window.smoothScroll(videoEl);
    }
  }));

  // define a largura e altura do elemento de vídeo pra evitar FoUC
  videoEl.oncanplaythrough = e => {
    const styles = getComputedStyle(videoEl);
    videoDimensions = {
      width: styles.width,
      height: styles.height
    };

    videoEl.style.width = videoDimensions.width;
    videoEl.style.height = videoDimensions.height;
  }

  videoEl.ondblclick = e => {
    fullScreen(videoEl);
  }

  videoEl.ontimeupdate = e => {
    const valor = Math.round(100 * e.currentTarget.currentTime / e.currentTarget.duration);
    progressoEl.style.width = `${valor}%`;

    if (valor >= 100) {
      playEl.classList.remove('icon-Pause');
    }
  };

  playEl.onclick = e => {
    const colocou = playEl.classList.toggle('icon-Pause');
    if (!colocou) {
      videoEl.pause();
    } else {
      videoEl.play();
      resetProgress();
    }
  };

  fullScreenEl.onclick = e => {
    fullScreen(videoEl);
  };
}
