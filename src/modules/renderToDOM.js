const url = 'https://api.tvmaze.com/shows';

export const getShows = async () => {
  const response = await fetch(`${url}`);

  if (!response.ok) {
    throw new Error(`Error fetching item details: ${response.status}`);
  }

  let arr = await response.json();

  arr = arr.slice(0, 30);

  return arr;
};

export const renderShowsToDOM = async () => {
  const showList = document.querySelector('.maze__grid');
  showList.innerHTML = '';

  const shows = await getShows();

  shows.forEach((show) => {
    const card = document.createElement('ul');
    card.className = 'maze__card';
    card.id = show.id;

    card.innerHTML = `
      <img src="${show.image.original}" alt="Card image" class="card__image" />

      <div class="card__text padding flex">
        <h2 class="card__title">${show.name}</h2>

        <div class="card__counts">
          <span class="card__like-count"></span>
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
