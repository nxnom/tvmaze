import { API_URL, INVOLVEMENT_API_URL, appID } from '../config.js';

const COMMENT_API_URL = `${INVOLVEMENT_API_URL}apps/${appID}/comments`;

const getShows = async () => {
  const response = await fetch(`${API_URL}`);

  if (!response.ok) throw new Error(`Error fetching item data: ${response.status}`);

  let arr = await response.json();
  arr = arr.slice(0, 30);

  return arr;
};

const getLikes = async () => {
  try {
    const response = await fetch(`${INVOLVEMENT_API_URL}apps/${appID}/likes/`);

    const data = await response.json();

    return data;
  } catch {
    return [];
  }
};

/**
 * Fetches item comments from the API
 * @param {number} id - The id of the item to fetch
 * @private - This function is not exported
 * */
const fetchShowComments = async (id) => {
  const res = await fetch(`${COMMENT_API_URL}?item_id=${id}`);

  if (!res.ok) return [];

  const data = await res.json();
  return data;
};

/**
 * Fetches item details from the API
 * @param {number} id - The id of the item to fetch
 * */
const fetchShowDetails = async (id) => {
  const res = await fetch(`${API_URL}/${id}`);

  if (!res.ok) throw new Error(`Error fetching item details: ${res.status}`);

  const data = await res.json();

  const comments = await fetchShowComments(id);

  Object.assign(data, { comments });
  return data;
};

/**
 * Posts a comment to the API
 * @param {number} id - The id of the item to post the comment to
 * @param {string} username - The username of the user posting the comment
 * @param {string} comment - The comment to post
 * */
const postComment = async (id, username, comment) => {
  const res = await fetch(COMMENT_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      item_id: id,
      username,
      comment,
    }),
  });

  if (!res.ok) throw new Error(`Error submitting comment: ${res.status}`);

  return {
    username,
    comment,
    creation_date: new Date().toISOString().split('T')[0],
  };
};

const sendLikeToAPI = async (showId) => {
  try {
    const response = await fetch(`${INVOLVEMENT_API_URL}apps/${appID}/likes/`, {
      method: 'POST',
      headers: {
        'Content-type': 'application/json',
      },
      body: JSON.stringify({ item_id: Number(showId) }),
    });

    return response.ok;
  } catch (err) {
    throw new Error(`Error, sending like: ${err}`);
  }
};

export {
  fetchShowDetails, postComment, getLikes, sendLikeToAPI, getShows,
};
