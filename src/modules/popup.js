import '../loader.css';
import '../popup.css';

import { fetchShowDetails, postComment } from './api.js';
import countComment from './countComment.js';

/**
 * Append circular loading indicator into the target element
 * @param {HTMLElement} popupEl - The popup element
 * @param {HTMLElement} [bodyEl=document.body] - The body element
 * @private
 * */
const openLoadingPopup = (popupEl, bodyEl = document.body) => {
  popupEl.remove();

  popupEl.className = 'popup';
  popupEl.innerHTML = '<div class="loader center"><span></span></div>';

  bodyEl.appendChild(popupEl);
};

/**
 * Renders the popup into the target element
 * @param {Object} detail - The item details to render
 * @param {HTMLElement} popupEl - The popup element
 * @param {HTMLElement} [bodyEl=document.body] - The body element
 * @param {Function} [onCommentFormSubmit] - The callback to call when the form is submitted,
 *  it will be passed the item id, username and comment
 * */
const openPopup = async (
  detail,
  popupEl,
  onCommentFormSubmit,
  bodyEl = document.body,
) => {
  bodyEl.style.overflow = 'hidden';

  const comments = detail.comments ?? [];

  // Remove the popup if it already exists
  // Assuming we will be using the same popup element for all popups
  popupEl.remove();

  popupEl.className = 'popup';
  popupEl.innerHTML = `
  <div class="popup-inner">
    <btn class="popup-close-btn">x</btn>
    <img class="popup-img" 
      src="${detail.image?.original}" 
      alt="${detail.name}"/>
    <h2 class="popup-name">${detail.name}</h2>
    <span>Rating: ${detail.rating?.average}</span>
    <span>Status: ${detail.status}</span>
    <span>Language: ${detail.language}</span>
    <span>Genre: ${detail.genres?.[0]}</span>
    <section class="popup-comment-section">
      <h3 class="popup-title">
        Comments (<span id="comment-count"></span>)
      </h3>
  ${comments
    .reverse()
    .map(
      (e) => `<p class="comment">
                ${e.creation_date} ${e.username} : ${e.comment}
              </p>`,
    )
    .join('')}
    </section>
    <h3 class="popup-title">Add a comment</h3>
    <form id="comment-form">
      <input type="text" name="username" placeholder="Your name" required/>
      <textarea name="comment" rows="4" placeholder="Your insights" required ></textarea>
      <button class="comment-submit-btn" type="submit">Comment</button>
    </form>
  </div>
  `;

  const formEl = popupEl.querySelector('#comment-form');

  const commentCountEl = popupEl.querySelector('#comment-count');
  commentCountEl.textContent = countComment(popupEl);

  // handle comment form submission
  formEl.addEventListener('submit', async (e) => {
    e.preventDefault();
    const [username, comment, button] = e.target.elements;

    if (!onCommentFormSubmit) return;

    button.disabled = true;
    button.innerHTML = 'Submitting...';

    const data = await onCommentFormSubmit(
      detail.id,
      username.value,
      comment.value,
    );

    const commentEl = document.createElement('p');
    commentEl.className = 'comment';
    commentEl.innerHTML = `${data.creation_date} ${data.username} : ${data.comment}`;

    // insert the comment after title to make latest comment showing on top
    popupEl
      .querySelector('.popup-comment-section .popup-title')
      .insertAdjacentElement('afterend', commentEl);

    commentCountEl.textContent = countComment(popupEl);

    button.disabled = false;
    button.innerHTML = 'Comment';
    e.target.reset();
  });

  bodyEl.appendChild(popupEl);

  popupEl.querySelector('.popup-close-btn').addEventListener('click', () => {
    bodyEl.style.overflow = 'auto';
    popupEl.remove();
  });
};

// Create a popup element to be used for all popups
const popupEl = document.createElement('div');

/**
 * Fetches item details and opens the popup
 * @param {number} id - The id of the item to fetch
 *
 * Don't test this function, it's just a wrapper for the other functions
 * this one has a lot of side effects and it's not easy to test
 * */
const createPopup = async (id) => {
  openLoadingPopup(popupEl);

  const details = await fetchShowDetails(id);

  openPopup(details, popupEl, postComment);
};

export { openPopup, createPopup };
