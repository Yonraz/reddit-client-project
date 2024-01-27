import Thing from '../types/thingType'

export interface RedditResponse {
  kind: string;
  data: {
    children: {
      kind: string;
      data: {
        id: string;
        link_title: string;
        author: string;
        author_fullname: string;
        link_url: string;
        body: string;
        ups: number;
        num_comments: number;
        name: string;
        permalink: string;
      };
    }[];
  };
}

// Function to process Reddit API response and transform it into an array of Thing objects
export const processRedditResponse = (json: RedditResponse): Record<string, Thing> => {
  const things: Record<string, Thing> = {};

  json.data.children.forEach((child) => {
    const { data } = child;
    const thing: Thing = {
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

    const permalinkParts = data.permalink.split('/');
    const commentId = permalinkParts[permalinkParts.length - 1];

    thing.commentIds.push(commentId);

    things[thing.id] = thing;
  });

  return things;
};
