import { API_URL, INVOLVEMENT_API_URL, appID } from '../config.js';

const COMMENT_API_URL = `${INVOLVEMENT_API_URL}apps/${appID}/comments`;

/**
 * Fetches item details from the API
 * @param {number} id - The id of the item to fetch
 * @returns {Promise<Object>} - The item details
 * @throws {Error} - If the response is not ok
 * */
const fetchItemDetails = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);

  if (!res.ok) throw new Error(`Error fetching item details: ${res.status}`);

  const data = await res.json();
  return data;
};

/**
 * Fetches item comments from the API
 * @param {number} id - The id of the item to fetch
 * */
const fetchItemComments = async (id) => {
  const res = await fetch(`${COMMENT_API_URL}?item_id=${id}`);

  if (!res.ok) return [];

  const data = await res.json();
  return data;
};

/**
 * Append circular loading indicator into the target element
 * @param {HTMLElement} popupEl - The popup element
 * @param {HTMLElement} [bodyEl=document.body] - The body element
 * */
const openLoadingPopup = (popupEl, bodyEl = document.body) => {
  popupEl.remove();

  popupEl.className = 'popup';
  popupEl.innerHTML = '<div class="loader-1 center"><span></span></div>';

  bodyEl.appendChild(popupEl);
};

/**
 * Renders the popup into the target element
 * @param {Object} detail - The item details to render
 * @param {HTMLElement} popupEl - The popup element
 * @param {HTMLElement} [bodyEl=document.body] - The body element
 * */
const openPopup = async (detail, popupEl, bodyEl = document.body) => {
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
      src="${detail.image.original}" 
      alt="${detail.name}"/>
    <h2 class="popup-name">${detail.name}</h2>
    <span>Rating: ${detail.rating.average}</span>
    <span>Status: ${detail.status}</span>
    <span>Language: ${detail.language}</span>
    <span>Genre: ${detail.genres[0]}</span>
    <section class="popup-comment-section">
    <h3 class="comment-title">Comments (${comments.length})</h3>
  ${comments
    .map((e) => `<p>${e.creation_date} ${e.username} : ${e.comment}</p>`)
    .join('')}
    </section>
  </div>
  `;

  bodyEl.appendChild(popupEl);

  popupEl.querySelector('.popup-close-btn').addEventListener('click', () => {
    bodyEl.style.overflow = 'auto';
    popupEl.remove();
  });
};

const popupEl = document.createElement('div');

/**
 * Fetches item details and opens the popup
 * @param {number} id - The id of the item to fetch
 * */
const createPopup = async (id) => {
  openLoadingPopup(popupEl);

  const comments = await fetchItemComments(id);
  const itemDetails = await fetchItemDetails(id);

  const details = Object.assign(itemDetails, { comments });

  openPopup(details, popupEl);
};

export { fetchItemDetails, openPopup, createPopup };
