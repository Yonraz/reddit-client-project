export const getUrl = (
  subreddit: string,
  limit: number,
  lastFetched: { fullname: string; dist: number },
  filter: string = ""
) => {
  const { fullname, dist } = lastFetched;
  const fullnameExists = fullname !== null && fullname !== "";
  const postfix = fullnameExists ? "" : `&after=${fullname}&dist=${dist}`;
  filter = filter === "" ? "" : `/${filter}`;
  return `https://www.reddit.com/r/${subreddit}${filter}.json?limit=${
    limit - 1
  }`;
};
