const url = 'https://api.tvmaze.com/shows';

export const getShows = async () => {
  const response = await fetch(`${url}`);

  if (!response.ok) throw new Error(`Error fetching item details: ${response.status}`);

  const arr = await response.json();

  return arr;
};

export const renderShowsToDOM = async () => {
  const showList = document.querySelector('.maze__grid');
  showList.innerHTML = '';

  let shows = await getShows();

  shows = shows.slice(0, 50);

  shows.forEach((show) => {
    const card = document.createElement('ul');
    card.className = 'maze__card';
    card.id = show.id;

    card.innerHTML = `
      <img src="${show.image.original}" alt="Card image" class="card__image" />

      <div class="card__text">
        <h2 class="card__title">${show.name}</h2>

        <div class="card__counts">
          <span class="card__like-count"></span>
          <span class="card__comment-count"></span>
        </div>

        <div class="card__btns">
          <button class="like__btn">Like</button>
          <button class="comment__btn">Comment</button>
        </div>
      </div>
    `;

    showList.appendChild(card);
  });
};
