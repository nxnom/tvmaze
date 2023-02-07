import './index.css';
import './popup.css';
import { renderShowsToDOM, renderLikesToDOM } from './modules/renderToDOM.js';

const showsContainer = document.querySelector('.maze__grid');

showsContainer.addEventListener('click', (e) => {
  if (e.target.closest('.comment__btn')) {
    const { id } = e.target.closest('.comment__btn').closest('.maze__card');
  }
});

renderShowsToDOM();
renderLikesToDOM();
