import { API_URL } from '../config.js';
import { getLikes, sendLikeToAPI } from './likes.js';

export const getShows = async () => {
  const response = await fetch(`${API_URL}`);

  if (!response.ok) throw new Error(`Error fetching item data: ${response.status}`);

  let arr = await response.json();
  arr = arr.slice(0, 30);

  return arr;
};

export const renderLikesToDOM = (likesObj, showId) => {
  let likeText = 'likes';
  let likeCount = `0 ${likeText}`;

  if (likesObj) {
    if (likesObj.likes === 1) {
      likeText = 'like';
    }

    if (likesObj.item_id === showId) {
      likeCount = `${likesObj.likes} ${likeText}`;
    }
  }

  return likeCount;
};

export const renderShowsToDOM = async () => {
  const showList = document.querySelector('.maze__grid');
  showList.innerHTML = '';

  const shows = await getShows();
  const likesArr = await getLikes();

  shows.forEach((show) => {
    const likesObj = likesArr.find((like) => like.item_id === show.id);

    const card = document.createElement('ul');
    card.className = 'maze__card';
    card.id = show.id;

    card.innerHTML = `
      <img src="${show.image.original}" alt="Card image" class="card__image" />

      <div class="card__text padding flex">
        <h2 class="card__title">${show.name}</h2>

        <div class="card__counts">
          <span class="card__like-count">${renderLikesToDOM(likesObj, show.id)}</span>
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
    `;

    showList.appendChild(card);
  });
};
