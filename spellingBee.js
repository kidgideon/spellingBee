 
 let word = "";
 let wordsSpelt = 0;
 let coinBal = 0;
 let correctSpelling = 0;
 let wrongSpelling = 0;
 let rank = "";
 const winAudio = document.querySelector(".win");
 const failAudio = document.querySelector(".fail")
 const direction = document.querySelector(".direction");
 const userInput = document.querySelector(".user-inp");
 const wordsSpeltDisp = document.querySelector(".words-spelt");
 const coinBalDisp = document.querySelector(".coin-bal");
const wordsSpeltWrongDisp = document.querySelector(".wrong-spelling");
const wordsSpeltCorrectDisp = document.querySelector(".correct-spelling");
const RankDisp = document.querySelector(".grade");
const graderOrder = document.querySelector(".grader-input");
const btn = document.querySelector(".btn");

const conductRanking = (coinBal) => {
    if (coinBal <= 20) {
       rank = "poor at spelling for now"
    } else if (coinBal > 20 && coinBal <= 40 ) {
       rank = "getting better"
    } else if (coinBal > 40 && coinBal <= 60) {
       rank = "becoming brave"
    } else if (coinBal > 60 && coinBal <= 80) {
      rank = "going for the gold"
    } else if (coinBal > 80 && coinBal <= 100) {
      rank = "amazing at spelling"
    } else if (coinBal > 100 && coinBal <= 120) {
      rank = "making the gold mark"
    } else if (coinBal > 120 && coinBal <= 140) {
      rank = "taking the trophy home"
    } else if (coinBal > 140 && coinBal <= 160) {
      rank = "overcoming impossible odds"
    } else if (coinBal > 160 && coinBal <= 180) {
      rank = " The Best i Have seen all my days"
    } else if (coinBal > 180 && coinBal <= 200) {
      rank = "An excellent Vocabularist, congratulations on hitting the super mark !!!"
    }
 }


 const updateVariables = () => {
    coinBalDisp.innerHTML = `${coinBal}`;
   wordsSpeltDisp.innerHTML = wordsSpelt;
   wordsSpeltCorrectDisp.innerHTML = correctSpelling;
   wordsSpeltWrongDisp.innerHTML = wrongSpelling;
  conductRanking(coinBal);
  RankDisp.innerHTML = rank;
      }
  
updateVariables()

  const fetchRandomFourLetterWord = async () => {
    try {
        let randomWord = '';
          const response = await fetch('https://random-word-api.herokuapp.com/word?number=1');
           const data = await response.json();
          randomWord = data[0];
         word = randomWord;
         console.log(word)
         return word;
    } catch (error) {
        console.error('Error fetching random word:', error);
        throw error; // Re-throw the error to be handled by the caller
    }
}

window.speechSynthesis.onvoiceschanged = function() {
  var voices = window.speechSynthesis.getVoices();
  console.log(voices);
};


const repeatWordFemale = () => {
  const speech = new SpeechSynthesisUtterance();
  speech.text = `I said, ${word}`;
  speech.rate = 1.0;
  speech.pitch = 1.0;
  speech.lang = "en-CA";

  // Fetch the available voices
  const voices = window.speechSynthesis.getVoices();

  console.log(voices)
  // Find the first voice with the name including "Zara"
  const selectedVoice = voices.find(voice => voice.name.includes('Zira'));

  // If no voice found with "Zara" in its name, select the first voice available
  if (!selectedVoice) {
      speech.voice = voices[0];
  } else {
      speech.voice = selectedVoice;
  }
   // Speak the word
   window.speechSynthesis.speak(speech);

  };

  const repeatWorldMale = () => {
    const speech = new SpeechSynthesisUtterance();
    speech.text = `I said, ${word}`;
    speech.rate = 1.0;
    speech.pitch = 1.0;
    speech.lang = "en-CA";
    window.speechSynthesis.speak(speech);
  }

 



 let pronouncedOnce = "False";

  const malePronounciation = async () => {
    btn.disabled = false;
    if (pronouncedOnce === "False") {
     const words = await fetchRandomFourLetterWord()
       const speech = new SpeechSynthesisUtterance();
       speech.text = `spell the word, ${words}`;
      speech.rate = 1.0;
      speech.pitch = 1.0;
      speech.lang = "en-CA";
       // Speak the word
       window.speechSynthesis.speak(speech);
       direction.innerHTML = "click to repeat"
       pronouncedOnce = "True";
      }
        else {
           repeatWorldMale()
       }
  }

   const femalePronounciation = async () => {
    btn.disabled = false;
    if (pronouncedOnce === "False") {
     const words = await fetchRandomFourLetterWord()
       const speech = new SpeechSynthesisUtterance();
       speech.text = `spell the word, ${words}`;
      speech.rate = 1.0;
      speech.pitch = 1.0;
      speech.lang = "en-CA";
       // Fetch the available voices
  const voices = window.speechSynthesis.getVoices();

  console.log(voices)
  // Find the first voice with the name including "Zara"
  const selectedVoice = voices.find(voice => voice.name.includes('Zira'));

  // If no voice found with "Zara" in its name, select the first voice available
  if (!selectedVoice) {
      speech.voice = voices[0];
  } else {
      speech.voice = selectedVoice;
  }
   // Speak the word
       window.speechSynthesis.speak(speech);
       direction.innerHTML = "click to repeat"
       pronouncedOnce = "True";
      }
        else {
           repeatWordFemale()
       }
   }


              const compare = () => {
              if(userInput.value === "") {
                console.log("no value")
                return null;
              } else {
                 btn.disabled = true;
                wordsSpelt += 1
                pronouncedOnce = "False";
                direction.innerHTML = "click to listen";
            if (userInput.value  === word) {
            console.log("congratulations")
            correctSpelling += 1;

            if (coinBal <= 200) {
            coinBal += 10;
            }
            winAudio.play()

            graderOrder.style.color = "green";
            graderOrder.innerHTML = `congratulations you spelt ${word} correctly!!!`

            setTimeout(() => {
            graderOrder.style.color = "rgb(175, 173, 173)";
            graderOrder.innerHTML = `You will be graded here` 
            }, 3000)
            updateVariables()
            } else {
            console.log("you failed")
            wrongSpelling += 1;
            if (!coinBal <= 0) {
                coinBal -= 10;
            }
            failAudio.play()
            graderOrder.style.color = "red";
            graderOrder.innerHTML = `sorry you spelt ${word} wrongly!!!!`
            setTimeout(() => {
                graderOrder.style.color = "rgb(175, 173, 173)";
            graderOrder.innerHTML = `You will be graded here` 
            }, 3000)
            updateVariables()
            } 

            userInput.value = "";
            }

              }
  
  

 
//<button onclick="pronounceWord()">speak</button>
//<button onclick="repeatWord()"> repeat please </button>