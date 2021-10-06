import { useMutation } from "@apollo/client";
import React, { useState } from "react";
import { Button, Confirm, Icon } from "semantic-ui-react";
import { DELETE_POST } from "../graphql/mutations/deletePost";
import { GET_POSTS } from "../graphql/queries/getPosts";

const DeleteButton = ({ postId, callback }) => {
  const [confirmOpen, setConfirmOpen] = useState(false);

  const [deletePost] = useMutation(DELETE_POST, {
    update(proxy) {
      setConfirmOpen(false);
      const data = proxy.readQuery({
        query: GET_POSTS,
      });
      let newData = data.getPosts.filter((post) => post.id !== postId);
      proxy.writeQuery({
        query: GET_POSTS,
        data: {
            ...data,
            getPosts: { newData }
        },
      });
      if (callback) callback();
    },
    variables: { postId },
  });

  return (
    <>
      <Button
        as="div"
        color="red"
        floated="right"
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name="trash" style={{ margin: 0 }} />
      </Button>
      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </>
  );
};

export default DeleteButton;
