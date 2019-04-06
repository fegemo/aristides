import * as shake from "./shake.js";

function oraNoWry() {
  // play super mario audio from: http://themushroomkingdom.net/media/smw/wav
  const soundNames = ["dio", "jotaro", "joseph"],
    chosenSoundIndex = Math.floor(Math.random() * soundNames.length),
    chosenSoundName = `${soundNames[chosenSoundIndex]}.mp3`,
    chosenSoundPath = "audios/" + chosenSoundName,
    audio = new Audio(chosenSoundPath);

  audio.play();

  // falling stickers
  const windowWidth = window.innerWidth;
  const windowHeight = window.innerHeight;
  const stickerWidth = 200;
  const stickerDuration = 1300;
  const numberOfStickers = Math.round(Math.random() * 30) + 20;
  for (let i = numberOfStickers; i >= 0; i--) {
    const imgEl = document.createElement("img");
    imgEl.src = "imagens/" + soundNames[chosenSoundIndex] + ".png";
    imgEl.style.width = stickerWidth + "px";
    imgEl.style.position = "fixed";

    const startY = Math.random() * 600 - 600;
    imgEl.style.top = startY + "px";
    imgEl.style.left = Math.random() * (windowWidth - stickerWidth) + "px";
    imgEl.style.opacity = 1;
    imgEl.style.transition = `all ${stickerDuration *
      (Math.random() * 1.5)}ms ease-out`;
    document.body.appendChild(imgEl);

    setTimeout(() => {
      imgEl.style.top = startY + windowHeight + 600 + "px";
      imgEl.style.opacity = 0;
      imgEl.style.transform = `rotate(${Math.random() * 2 + 1}turn)`;

      setTimeout(() => {
        imgEl.remove();
      }, stickerDuration * 1.5);
    }, 0);
  }

  // shaking body
  document.body.classList.add("shaking");
  document.body.classList.add("no-overflow-x");
  document.documentElement.classList.add("no-overflow-x");
  setTimeout(() => {
    document.body.classList.remove("shaking");
    document.body.classList.remove("no-overflow-x");
    document.documentElement.classList.remove("no-overflow-x");
  }, stickerDuration);
}

export default function ohNooo() {
  let commandPanelEl = document.createElement("aside");

  commandPanelEl.id = "easter-egg-panel";
  document.body.appendChild(commandPanelEl);

  cheet("↑ ↑ ↓ ↓ ← → ← → b a", {
    next: function(str, key) {
      commandPanelEl.classList.add("active");
      commandPanelEl.innerHTML +=
        ' <span class="easter-egg-key">' + key + "</span> ";
      const lastAddedKeyEl = commandPanelEl.querySelectorAll(
        ".easter-egg-key:last-child"
      )[0];
      setTimeout(function() {
        lastAddedKeyEl.classList.add("active");
      }, 0);
    },
    fail: function() {
      commandPanelEl.classList.remove("active");
      commandPanelEl.innerHTML = "";
    },
    done: function() {
      oraNoWry();

      // commands bar
      commandPanelEl.classList.add("success");
      commandPanelEl.addEventListener("animationend", e => {
        commandPanelEl.classList.remove("success");
        commandPanelEl.classList.remove("active");
        commandPanelEl.innerHTML = "";
      });
    }
  });

  new Shake().start();
  window.addEventListener("shake", oraNoWry);
}
