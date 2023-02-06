import './index.css';
import './popup.css';
import { getShows, renderShowsToDOM } from './modules/renderToDOM.js';

renderShowsToDOM(getShows);
