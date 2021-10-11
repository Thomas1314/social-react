import gql from "graphql-tag";

export const DELETE_COMMENT = gql`
  mutation deleteComment($postId: String!, $commentId: ID!) {
    deleteComment(postId: $postId, commentId: $commentId) {
      id
      comments {
        id
        username
        body
      }
      commentCount
    }
  }
`;
