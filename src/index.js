import './index.css';
import './popup.css';
import { fetchItemDetails, openPopup } from './modules/popup.js';

const btn = document.createElement('button');

btn.innerHTML = 'Click me and check the console!';

const popup = document.createElement('div');

btn.addEventListener('click', async () => {
  const details = await fetchItemDetails(1);
  openPopup(details, popup);
});

document.body.appendChild(btn);

const add = (a, b) => a + b;

export default add;
