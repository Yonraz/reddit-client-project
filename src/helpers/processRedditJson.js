export const processRedditResponse = (json) => {
  const things = [];

  json.data.children.forEach((child) => {
    const { data } = child;
    const thing = {
      id: data.id,
      title: data.title,
      name: data.name,
      authorId: data.author_fullname,
      authorName: data.author,
      thumbnailUrl: data.thumbnail,
      imageUrl: data.url_overridden_by_dest,
      description: data.selftext,
      numLikes: data.ups,
      numComments: data.num_comments,
      commentIds: [],
      subreddit: data.subreddit_name_prefixed,
    };
    things.push(thing);
  });

  return things;
};
