import { API_URL, INVOLVEMENT_API_URL, appID } from '../config.js';

const COMMENT_API_URL = `${INVOLVEMENT_API_URL}apps/${appID}/comments`;

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

export { fetchShowDetails, postComment };
