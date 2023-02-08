import countShows from '../countShows.js';

describe('the number of shows', () => {
  const mazeGrid = `<ul class="maze__grid flex flex-jc-c flex-wrap"><li class="maze__card" id="1">
      <img src="https://static.tvmaze.com/uploads/images/original_untouched/81/202627.jpg" alt="Card image" class="card__image">

      <div class="card__text padding flex">
        <h2 class="card__title">Under the Dome</h2>

        <div class="card__counts">
          <span class="card__like-count">1 like</span>
        </div>

        <div class="card__btns flex flex-ai-c">
          <button class="like__btn card__btn flex flex-ai-c">
            <span class="material-symbols-outlined"> favorite </span>
            <span>Like</span>
          </button>
          <button class="comment__btn card__btn flex flex-ai-c">
            <span class="material-symbols-outlined"> comment </span>
            <span>Comment</span>
          </button>
        </div>
      </div>
    </li><li class="maze__card" id="2">
      <img src="https://static.tvmaze.com/uploads/images/original_untouched/163/407679.jpg" alt="Card image" class="card__image">

      <div class="card__text padding flex">
        <h2 class="card__title">Person of Interest</h2>

        <div class="card__counts">
          <span class="card__like-count">2 likes</span>
        </div>

        <div class="card__btns flex flex-ai-c">
          <button class="like__btn card__btn flex flex-ai-c">
            <span class="material-symbols-outlined"> favorite </span>
            <span>Like</span>
          </button>
          <button class="comment__btn card__btn flex flex-ai-c">
            <span class="material-symbols-outlined"> comment </span>
            <span>Comment</span>
          </button>
        </div>
      </div>
    </li><li class="maze__card" id="3">
      <img src="https://static.tvmaze.com/uploads/images/original_untouched/0/15.jpg" alt="Card image" class="card__image">

      <div class="card__text padding flex">
        <h2 class="card__title">Bitten</h2>

        <div class="card__counts">
          <span class="card__like-count">1 like</span>
        </div>

        <div class="card__btns flex flex-ai-c">
          <button class="like__btn card__btn flex flex-ai-c">
            <span class="material-symbols-outlined"> favorite </span>
            <span>Like</span>
          </button>
          <button class="comment__btn card__btn flex flex-ai-c">
            <span class="material-symbols-outlined"> comment </span>
            <span>Comment</span>
          </button>
        </div>
      </div>
    </li>
  </ul>`;

  it('should count the comment count', () => {
    const element = document.createElement('div');
    element.innerHTML = mazeGrid;

    const numberOfShows = countShows(element);

    expect(numberOfShows).toBe(3);
  });
});
