const candlesContainer = document.querySelector(".candles");
const mainContainer = document.querySelector(".main-container");
// const candlesToBlow = document.querySelectorAll(".candle");
const birthdayTextContainer = document.querySelector(".self-typing-text");

// candleHTML.className = "candle";
const birthdayMessage = `
<div class="typewriter">
<h1>Glory be to GOD ! Happy birthday to you Herbert</h1>
</div>
`;
const age = 26;
const candles = [];

const populateCandlesArray = () => {
  for (var i = 0; i <= age; i++) {
    //   console.log(i);
    candles.push(i);
  }
  //   console.log(candles);
  const candlesHTML = candles
    .map((candle) => {
      return `<div class="candle"></div>`;
    })
    .join("");
  //   console.log(candlesHTML);
  candlesContainer.innerHTML = candlesHTML;
  //   console.log(candlesContainer);
  mainContainer.addEventListener("click", blowCandles);
};
populateCandlesArray();

// function blowCandles() {
//   console.log(candlesToBlow);
//   candlesToBlow.forEach((candle) => {
//     // console.log(candle);
//     candle.classList.add("candle-to-blow");
//   });
// }

function blowCandles() {
  const candlesToBlow = document.querySelectorAll(".candle");
  //   console.log(candlesToBlow);
  candlesToBlow.forEach((candle) => candle.classList.remove("candle-to-blow"));
  navigator.mediaDevices
    .getUserMedia({
      audio: true,
      // video: true,
    })
    .then(function (stream) {
      const audioContext = new AudioContext();
      const analyser = audioContext.createAnalyser();
      const microphone = audioContext.createMediaStreamSource(stream);
      const scriptProcessor = audioContext.createScriptProcessor(2048, 1, 1);

      analyser.smoothingTimeConstant = 0.8;
      analyser.fftSize = 1024;

      microphone.connect(analyser);
      analyser.connect(scriptProcessor);
      scriptProcessor.connect(audioContext.destination);
      scriptProcessor.onaudioprocess = function () {
        const array = new Uint8Array(analyser.frequencyBinCount);
        analyser.getByteFrequencyData(array);
        const arraySum = array.reduce((a, value) => a + value, 0);
        const average = arraySum / array.length;
        console.log(Math.round(average));
        // colorPids(average);
        if (Math.round(average) >= 100) {
          //   candlesToBlow[20].classList.add("candle-to-blow");
          candlesToBlow.forEach((candle) => {
            candle.classList.add("candle-to-blow");
            setTimeout(() => {
              birthdayTextContainer.innerHTML = birthdayMessage;
            }, 1500);
          });
        }
      };
    })
    .catch(function (err) {
      /* handle the error */
      console.error(err);
    });
}
