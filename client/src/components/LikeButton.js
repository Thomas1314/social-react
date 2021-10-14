import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { Link } from "react-router-dom";
import { Button, Icon, Label } from "semantic-ui-react";
import { LIKE_POST } from "../graphql/mutations/likePost";
import { GET_POSTS } from "../graphql/queries/getPosts";
import { GET_POST } from "../graphql/queries/getPost";
import CustomPopup from "../util/CustomPopup";

const LikeButton = ({ user, post: { id, likeCount, likes } }) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    if (user && likes?.find((like) => like.username === user.username)) {
      setLiked(true);
    } else setLiked(false);
  }, [user, likes]);

  const [likePost] = useMutation(LIKE_POST, {
    variables: { postId: id },
    refetchQueries: [GET_POSTS, GET_POST],
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

  return user ? (
    <Button as="div" labelPosition="right" onClick={likePost}>
      <CustomPopup content={liked ? "Unlike" : "Like"}>
        {likeButton}
      </CustomPopup>
      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  ) : (
    <Button labelPosition="right" as="a" href="/login">
      <CustomPopup content={liked ? "Unlike" : "Like"}>
        {likeButton}
      </CustomPopup>
      <Label basic color="teal" pointing="left">
        {likeCount}
      </Label>
    </Button>
  );
};

export default LikeButton;
