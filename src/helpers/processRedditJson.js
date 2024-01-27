export const processRedditResponse = (json) => {
  const things = {};

  json.data.children.forEach((child) => {
    const { data } = child;
    const thing = {
      title: data.link_title,
      id: data.id,
      authorId: data.author_fullname,
      authorName: data.author,
      imageUrl: data.link_url,
      description: data.body,
      numLikes: data.ups,
      numComments: data.num_comments,
      commentIds: [],
    };

    const permalinkParts = data.permalink.split("/");
    const commentId = permalinkParts[permalinkParts.length - 1];

    thing.commentIds.push(commentId);

    things[thing.id] = thing;
  });

  return things;
};
