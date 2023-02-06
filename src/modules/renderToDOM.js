const url = 'https://api.tvmaze.com/shows';

export const getShows = async () => {
  const response = await fetch(`${url}`);

  if (!response.ok) throw new Error(`Error fetching item details: ${response.status}`);

  const arr = await response.json();

  return arr;
};
