import {Comment} from '../hooks/useFetchComments'
export type ResponseData = {
  data: {children: any}
}
type ProcessCommentJson = (responseData: ResponseData[]) => Comment[]

export const processCommentsJson : ProcessCommentJson = (responseData: ResponseData[]) => {
    if (
      responseData &&
      responseData[1] &&
      responseData[1].data &&
      responseData[1].data.children
    ) {
      const commentsData = responseData[1].data.children;

      let arr: Comment[] = [];
      for (const comment of commentsData) {
        if (comment.kind === "t1") {
          const pasredComment: Comment = {
            body: comment.data.body,
            author: comment.data.author,
            score: comment.data.score,
            id: comment.data.id,
          };
          arr.push(pasredComment);
        }
      }
      return arr;
    } else throw Error('some error occured with parsing comment data')
} 