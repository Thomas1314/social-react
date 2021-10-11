import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";
import { LIKE_POST } from "../graphql/mutations/likePost";
import { GET_POSTS } from "../graphql/queries/getPosts";

const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes?.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: id },
    // update(proxy, result) {
    //   const data = proxy.readQuery({
    //     query: GET_POSTS,
    //   });
    //   let newData = [...data.getPosts];
    //   newData = [result.data.likePost, ...data.getPosts];
    //   proxy.writeQuery({
    //     query: GET_POSTS,
    //     data: {
    //       ...data,
    //       getPosts: { newData },
    //     },
    //   });
    // },
    refetchQueries: [GET_POSTS]
  });

  const likeButton = user ? (
    liked ? (
      <Button color="teal">
        <Icon name="heart" />
      </Button>
    ) : (
      <Button color="teal" basic>
        <Icon name="heart" />
      </Button>
    )
  ) : (
    <Button as={Link} to="/login" color="teal" basic>
      <Icon name="heart" />
    </Button>
  );

  return (
    <Button as="div" labelPosition="right" onClick={likePost}>
      {likeButton}
      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
};

export default LikeButton;
