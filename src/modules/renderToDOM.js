import { API_URL, appID, INVOLVEMENT_API_URL } from '../config.js';

export const getShows = async () => {
  const response = await fetch(`${API_URL}`);

  if (!response.ok) throw new Error(`Error fetching item data: ${response.status}`);

  let arr = await response.json();
  arr = arr.slice(0, 30);

  return arr;
};

export const renderLikesToDOM = async () => {
  try {
    const response = await fetch(`${INVOLVEMENT_API_URL}apps/${appID}/likes/`);

    const data = await response.json();

    return data;
  } catch {
    return [];
  }
};

export const renderShowsToDOM = async () => {
  const showList = document.querySelector('.maze__grid');
  showList.innerHTML = '';

  const shows = await getShows();
  const likesArr = await renderLikesToDOM();

  shows.forEach((show) => {
    let likeText = 'likes';
    let likeCount = `0 ${likeText}`;

    likesArr.forEach((obj) => {
      if (obj.likes.toString() === '1') {
        likeText = 'like';
      }

      if (obj.item_id === show.id) {
        likeCount = `${obj.likes} ${likeText}`;
      }
    });

    const card = document.createElement('ul');
    card.className = 'maze__card';
    card.id = show.id;

    card.innerHTML = `
      <img src="${show.image.original}" alt="Card image" class="card__image" />

      <div class="card__text padding flex">
        <h2 class="card__title">${show.name}</h2>

        <div class="card__counts">
          <span class="card__like-count">${likeCount}</span>
          <span class="card__comment-count"></span>
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
