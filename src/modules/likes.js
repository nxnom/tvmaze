import { appID, INVOLVEMENT_API_URL } from '../config.js';

export const getLikes = async () => {
  try {
    const response = await fetch(`${INVOLVEMENT_API_URL}apps/${appID}/likes/`);

    const data = await response.json();

    return data;
  } catch {
    return [];
  }
};

export const sendLikeToAPI = async (showId) => {
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
