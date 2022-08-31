// import { IObject } from '../../../common/interfaces/IObject';

class TextbookView {
  // static draw(data: IObject<string>)
  static draw() {
    return `<style>
    .main-container {
      height: 100%;
      justify-content: space-between;
      flex-direction: column;
      align-items: center;
      gap: 50px;
    }
    
    
    /* Difficulty panel */
    
    .difficulty-container {
      display: flex;
      gap: 15px;
    }
    
    .difficulty-btn {
      user-select: none;
      display: flex;
      align-items: center;
      justify-content: center;
      font-family: var(--font-primary);
      font-size: 1.8rem;
      width: 50px;
      height: 50px;
      border-radius: 25px;
      border: 2px solid var(--color);
      opacity: 70%;
      transition: 0.2s;
    }
    
    .level1 {
      background: #f06969;
    }
    
    .level2 {
      background: #ec7d3d;
    }
    
    .level3 {
      background: #e4e713;
    }
    
    .level4 {
      background: #50a150;
    }
    
    .level5 {
      background: #69d0f0;
    }
    
    .level6 {
      background: #4183c0;
    }
    
    .level7 {
      background: #906bb3;
    }
    
    .difficulty-btn:hover {
      cursor: pointer;
      opacity: 100%;
      box-shadow: 0 0 5px var(--color);
    }
    
    .difficulty-btn:active {
      transform: scale(0.95);
    }
    
    .difficulty-btn.active {
      transform: scale(1.15);
      opacity: 100%;
      box-shadow: 0 0 10px var(--color);
    }
    
    
    .words-container {
      display: flex;
      justify-content: center;
      gap: 50px;
      flex-wrap: wrap;
      flex-grow: 1;
    }
    
    /* Word card */
    
    .word-container {
      display: flex;
      flex-direction: column;
      width: 350px;
      border: 2px solid var(--color);
      box-shadow: 0 0 10px #f06969;
      border-radius: 20px;
      color: var(--color);
      opacity: 90%;
      overflow: hidden;
    }
    
    .word-img {
      height: fit-content;
      opacity: 80%;
    }
    
    .word-description {
      position: relative;
      display: flex;
      flex-direction: column;
      gap: 20px;
      padding: 20px;
    }
    
    .word-properties {
      width: 306px;
      z-index: 1;
      position: absolute;
      top: -60px;
      display: flex;
      justify-content: space-between;
      align-items: center;
    }
    
    .word-properties img,
    .word-properties img.active {
      transition: 0.1s;
    }
    
    .word-properties img:hover {
      cursor: pointer;
      transform: scale(1.05);
      filter: drop-shadow(1px 1px 3px #f06969);
    }
    
    .word-properties img:active {
      transform: scale(0.95);
    }
    
    .word-container h2 {
      margin-bottom: 5px;
    }
    
    .word {
      position: relative;
    }
    
    .audio-icon {
      cursor: pointer;
      position: absolute;
      top: 0;
      right: -20px;
      filter: var(--filter);
      transition: 0.1s;
    }
    
    .word .audio-icon {
      top: 5px;
      right: 5px;
    }
    
    .audio-icon:hover {
      filter: var(--filter) drop-shadow(1px 1px 3px #f06969);
      transform: scale(1.05);
    }
    
    .audio-icon:active {
      transform: scale(0.95);
    }
    
    .word-transcription {
      font-size: 1.2rem;
    }
    
    .word-translation {
      margin-top: 5px;
    }
    
    .word-meaning,
    .word-example {
      padding-top: 10px;
      border-top: 2px solid var(--color);
      font-size: 0.9rem;
    }
    
    .word-meaning p,
    .word-example p {
      position: relative;
      width: 91%;
      margin: 10px 0;
      padding-right: 20px;
    }
    
    
    
    /* Pagination */
    
    .pagination-container {
      font-family: var(--font-primary);
      font-size: 2rem;
      display: flex;
      gap: 15px;
    }
    
    .pagination-container p {
      user-select: none;
      transition: 0.1s;
    }
    
    .pagination-container p:hover {
      cursor: pointer;
      transform: scale(1.05);
      text-shadow: 0 0 3px #f06969;
    }
    
    .pagination-container p:active {
      transform: scale(0.95);
    }
    
    .pagination-container p.disabled {
      color: #8a8b8b;
    }
    
    .pagination-container p.disabled {
      cursor: auto;
      color: #8a8b8b;
      text-shadow: none;
      transform: scale(1);
    }
    
    
    </style>
    <div class="main-container">
    <h1>Учебник</h1>

    <div class="difficulty-container">
      <div class="difficulty-btn level1 active">1</div>
      <div class="difficulty-btn level2">2</div>
      <div class="difficulty-btn level3">3</div>
      <div class="difficulty-btn level4">4</div>
      <div class="difficulty-btn level5">5</div>
      <div class="difficulty-btn level6">6</div>
      <div class="difficulty-btn level7">7</div>
    </div>

    <div class="words-container"></div>

    <div class="pagination-container">
      <p class="pagination-first disabled"><<</p>
      <p class="pagination-prev disabled"><</p>
      <div class="pagination-current"><span id="page-number">1</span> / 30</div>
      <p class="pagination-next">></p>
      <p class="pagination-last">>></p>
    </div>

  </div>`;
  }
}

export default TextbookView;
