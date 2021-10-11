import React, { useState } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";
import { GET_POSTS } from "../graphql/queries/getPosts";
import { useMutation } from "@apollo/client";
import { DELETE_COMMENT } from "../graphql/mutations/deleteComment";
import { DELETE_POST } from "../graphql/mutations/deletePost";
import MyPopup from "../util/MyPopup";

const DeleteButton = ({ postId, commentId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const mutation = commentId ? DELETE_COMMENT : DELETE_POST;

  const [deletePostMutation] = useMutation(mutation, {
    update(proxy) {
      setConfirmOpen(false);
      if (!commentId) {
        const data = proxy.readQuery({
          query: GET_POSTS,
        });
        let newData = data.getPosts.filter((post) => post.id !== postId);
        proxy.writeQuery({
          query: GET_POSTS,
          data: {
            ...data,
            getPosts: { newData },
          },
        });
      }
      if (callback) callback();
    },
    variables: { postId, commentId },
  });

  return (
    <>
      <MyPopup content={commentId ? "Delete comment" : "Delete post"}>
        <Button
          as="div"
          color="red"
          floated="right"
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name="trash" style={{ margin: 0 }} />
        </Button>
      </MyPopup>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePostMutation}
      />
    </>
  );
};

export default DeleteButton;
