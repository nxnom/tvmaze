import './index.css';
import './popup.css';
import './loader.css';
import { renderShowsToDOM, sendLikeToAPI } from './modules/renderToDOM.js';
import { createPopup } from './modules/popup.js';

const showsContainer = document.querySelector('.maze__grid');

showsContainer.addEventListener('click', (e) => {
  const commentBtn = e.target.closest('.comment__btn');
  const likeBtn = e.target.closest('.like__btn');

  if (commentBtn) {
    const { id } = commentBtn.closest('.maze__card');
    createPopup(id);
  }

  if (likeBtn) {
    const { id } = likeBtn.closest('.maze__card');
    sendLikeToAPI(id);
  }
});

renderShowsToDOM();
