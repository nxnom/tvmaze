const API_URL = 'https://api.tvmaze.com/shows';

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
 * Renders the popup into the target element
 * @param {Object} itemDetail - The item details to render
 * @param {HTMLElement} popupEl - The popup element
 * @param {HTMLElement} [bodyEl=document.body] - The body element
 *
 * @example
 * const popupEl = document.createElement('div');
 *
 * btn.addEventListener('click', async () => {
 *  const itemDetails = await fetchItemDetails(replaceWithYourId);
 *  openPopup(itemDetails, popupEl);
 * });
 * */
const openPopup = async (itemDetail, popupEl, bodyEl = document.body) => {
  bodyEl.style.overflow = 'hidden';

  // Remove the popup if it already exists
  // Assuming we will be using the same popup element for all popups
  popupEl.remove();

  popupEl.className = 'popup';
  popupEl.innerHTML = `
  <div class="popup-inner">
    <btn class="popup-close-btn">x</btn>
    <img class="popup-img" src="${itemDetail.image.original}" alt="${itemDetail.name}" />
    <h2 class="popup-name">${itemDetail.name}</h2>
    <span>Rating: ${itemDetail.rating.average}</span>
    <span>Status: ${itemDetail.status}</span>
    <span>Language: ${itemDetail.language}</span>
    <span>Genre: ${itemDetail.genres[0]}</span>
  </div>
  `;

  bodyEl.appendChild(popupEl);

  popupEl.querySelector('.popup-close-btn').addEventListener('click', () => {
    bodyEl.style.overflow = 'auto';
    popupEl.remove();
  });
};

export { fetchItemDetails, openPopup };
