import './index.css';
import './popup.css';
import './loader.css';
import { renderShowsToDOM } from './modules/renderToDOM.js';
import { sendLikeToAPI } from './modules/likes.js';
import { createPopup } from './modules/popup.js';

const showsContainer = document.querySelector('.maze__grid');

showsContainer.addEventListener('click', async (e) => {
  const commentBtn = e.target.closest('.comment__btn');
  const likeBtn = e.target.closest('.like__btn');

  if (commentBtn) {
    const { id } = commentBtn.closest('.maze__card');
    createPopup(id);
  }

  if (likeBtn) {
    const { id } = likeBtn.closest('.maze__card');
    const likeState = await sendLikeToAPI(id);

    if (likeState) {
    }
  }
});

renderShowsToDOM();
