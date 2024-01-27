export default interface Thing {
  title: string;
  id: string;
  authorId: string;
  authorName: string;
  imageUrl: string;
  description: string;
  numLikes: number;
  numComments: number;
  commentIds: string[];
}
