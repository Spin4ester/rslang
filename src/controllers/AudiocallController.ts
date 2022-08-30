import { IWord, IWords } from '../common/interfaces/IWord';
import config from '../config';
import Word from '../models/Word';
import AudiocallView from '../views/pages/audiocall';

type IData = {
  currentDifficulty: number;
  data2: string;
  wordsArr: IWord[];
  currentWord: IWord | null;
  currentAnswers: string[];
  answerMap: Map<IWord, string>;
};

class AudiocallController {
  static actionIndex() {
    const data: IData = {
      currentDifficulty: 0,
      data2: 'audiocall',
      wordsArr: [],
      currentWord: null,
      currentAnswers: [],
      answerMap: new Map(),
    };

    const mainContainer = <HTMLElement>document.querySelector('main');

    mainContainer.innerHTML = AudiocallView.renderDifficulty();

    const startBtn = <HTMLButtonElement>document.querySelector('.start-btn');

    // const gameContainer = document.querySelector('.game-container');
    // gameContainer?.classList.add('hidden');

    const difficultyContainer = document.querySelector('.difficulty-container');

    function activateProp(el: HTMLElement, selector: string) {
      if (el) {
        const elements = document.querySelectorAll(selector);
        elements?.forEach((element) => element.classList.remove('active'));
        el.classList.add('active');
        startBtn.disabled = false;
        data.currentDifficulty = Number(el.innerText) - 1;
      }
    }

    difficultyContainer?.addEventListener('click', (e) => {
      activateProp(e.target as HTMLElement, '.difficulty-btn');
    });

    function buttonPress() {
      document.addEventListener('keypress', (event: KeyboardEvent) => {
        if (event.key === 'Enter') {
          (<HTMLButtonElement>document.getElementById(`btn-next`)).click();
        } else {
          (<HTMLButtonElement>(
            document.querySelector(`.answer${event.key}`)
          )).click();
        }
      });
    }

    //!GENERATING ARRAY WITH CURRENT GROUP WORDS
    async function generateWords() {
      const temporaryResult: IWord[] = [];

      for (let i = 0; i < 30; i += 1) {
        const midRes = await Word.getWords(i, data.currentDifficulty)
          .then((words) => {
            return words;
          })
          .catch((e) => console.log(e));
        temporaryResult.push(midRes.flat());
      }
      data.wordsArr = temporaryResult.flat();
    }

    function playAudio(btn: HTMLElement) {
      if (btn) {
        const id = btn.id.split('-').reverse()[0];
        (<HTMLAudioElement>document.getElementById(`audio-word-${id}`)).play();
      }
    }

    //!GENERATING RANDOM ARRAY AND INSERTING 1 CORRECT ANSWER
    function wordsRandomizer() {
      data.currentWord = data.wordsArr[Math.floor(Math.random() * 601)];
      const randomWord = function () {
        return data.wordsArr[Math.floor(Math.random() * 601)];
      };
      const randomArray: () => string[] = function () {
        let arr = [];
        for (let i = 0; i < 5; i++) {
          arr.push(randomWord().wordTranslate);
        }
        return arr;
      };

      data.currentAnswers = randomArray();
      data.currentAnswers.splice(
        Math.floor(Math.random() * 5),
        1,
        data.currentWord.wordTranslate
      );
    }

    //! START BUTTON
    startBtn.onclick = async () => {
      await generateWords();
      console.log(data.wordsArr);
      wordsRandomizer();

      mainContainer.innerHTML = AudiocallView.renderQuestion(
        data.currentAnswers,
        data.currentWord
      );

      (<HTMLAudioElement>(
        document.getElementById(`audio-word-${(<IWord>data.currentWord).word}`)
      )).play();
      checkAnswer();
      nextQuestion();
      buttonPress();
      (<HTMLImageElement>(
        document.querySelector('.audio-btn-img')
      )).addEventListener('click', (e) =>
        playAudio(e.target as HTMLImageElement)
      );
    };

    //! TRACKING ANSWER
    function checkAnswer() {
      (<HTMLDivElement>document.querySelector('.btns-container')).onclick = (
        e: Event
      ) => {
        nextQuestion();
        buttonPress();
        if ((<HTMLElement>e.target).classList.contains('answer-item')) {
          //! CHANGING THE IMAGE OF THE ANSWER
          const answerImage = document.querySelector('.sound-icon');
          (<HTMLImageElement>answerImage).src = `${config.api.url}${
            (<IWord>data.currentWord).image
          }`;
          //! CHANGING DEFAULT WORD TO ANSWER
          (<HTMLParagraphElement>(
            document.querySelector('.current-word-answer')
          )).innerHTML = (<IWord>data.currentWord).word;
          //! CHECKING IF ANSWER IS CORRECT AND ADDING CORRECT ICON
          if (
            (<HTMLElement>e.target).innerText.slice(3) ===
            (<IWord>data.currentWord).wordTranslate
          ) {
            //!DISABLING ALL ANSWER BUTTONS
            const answerItems = [
              ...document.getElementsByClassName('answer-item'),
            ];

            (<HTMLButtonElement[]>answerItems).forEach(
              (el) => (el.disabled = true)
            );
            (<HTMLElement>e.target).insertAdjacentHTML(
              'beforebegin',
              AudiocallView.rightIcon()
            );
            //!ACTIVATING NEXT BUTTON
            (<HTMLButtonElement>document.getElementById('btn-next')).disabled =
              false;
            data.answerMap.set(<IWord>data.currentWord, 'correct');
          }
          //! CONDITIONS WHEN WRONG BUTTON IS CLICKED
          else {
            const answerItems = [
              ...document.getElementsByClassName('answer-item'),
            ];
            (<HTMLButtonElement[]>answerItems).forEach(
              (el) => (el.disabled = true)
            );
            (<HTMLButtonElement[]>answerItems).forEach((el) => {
              if (
                el.innerHTML.slice(3) ===
                (<IWord>data.currentWord).wordTranslate
              ) {
                el.insertAdjacentHTML('beforebegin', AudiocallView.rightIcon());
              }
            });
            (<HTMLElement>e.target).insertAdjacentHTML(
              'beforebegin',
              AudiocallView.wrongIcon()
            );
            (<HTMLButtonElement>document.getElementById('btn-next')).disabled =
              false;
            data.answerMap.set(<IWord>data.currentWord, 'incorrect');
          }
        }
      };
    }

    //! NEXT BUTTON
    function nextQuestion() {
      (<HTMLButtonElement>document.getElementById('btn-next')).onclick = () => {
        if (data.answerMap.size < 4) {
          wordsRandomizer();
          mainContainer.innerHTML = AudiocallView.renderQuestion(
            data.currentAnswers,
            data.currentWord
          );
          // TODO - FIX AUDIO CALLING

          (<HTMLAudioElement>(
            document.getElementById(`audio-word-${data.currentWord?.word}`)
          )).play();
          (<HTMLImageElement>(
            document.querySelector('.audio-btn-img')
          )).addEventListener('click', (e) =>
            playAudio(e.target as HTMLImageElement)
          );
          checkAnswer();
          buttonPress();
        } else {
          //! CLEARING GAME CONTAINER AND SORTING MAPS
          mainContainer.innerHTML = '';
          const mapSort = new Map([...data.answerMap.entries()].sort());
          const mapCorrect = new Map(
            [...mapSort].filter(([_, v]) => v === 'correct')
          );
          const mapIncorrect = new Map(
            [...mapSort].filter(([_, v]) => v === 'incorrect')
          );
          //! GENERATING CORRECT RESULTS
          mainContainer.insertAdjacentHTML(
            'afterbegin',
            AudiocallView.renderResults()
          );
          mapCorrect.forEach((_, k) => {
            (<HTMLDivElement>(
              document.querySelector('.correct-results')
            )).insertAdjacentHTML(
              'beforeend',
              AudiocallView.renderCorrectResults(k)
            );
          });
          // //! GENERATING INCORRECT RESULTS
          mapIncorrect.forEach((_, k) => {
            (<HTMLDivElement>(
              document.querySelector('.incorrect-results')
            )).insertAdjacentHTML(
              'beforeend',
              AudiocallView.renderIncorrectResults(k)
            );
          });
          document.querySelectorAll('.audio-icon').forEach((icon) => {
            icon.addEventListener('click', (e) =>
              playAudio(e.target as HTMLElement)
            );
          });
        }
      };
    }
  }
}

export default AudiocallController;
