import { useQuery } from "@apollo/client";
import moment from "moment";
import React, { useContext } from "react";
import { Button, Card, Grid, Icon, Image, Label } from "semantic-ui-react";
import DeleteButton from "../components/DeleteButton";
import LikeButton from "../components/LikeButton";
import { AuthContext } from "../context/context";
import { GET_POST } from "../graphql/queries/getPost";

const SinglePost = (props) => {
  const postId = props.match.params.postId;
  const { user } = useContext(AuthContext);
  //   console.log(postId);

  const { data = {} } = useQuery(GET_POST, {
    variables: { postId },
  });

  const { getPost } = data;

  const {
    id,
    body,
    createdAt,
    username,
    //   comments,
    likes,
    likeCount,
    commentCount,
  } = getPost || {};

  const deletePostCallback = () => {
    props.history.push("/");
  };

  //   let postMarkup;
  //   if (!getPost) {
  //     postMarkup = <p>Loading post..</p>;
  //   } else {
  //     const {
  //       id,
  //       body,
  //       createdAt,
  //       username,
  //       //   comments,
  //       likes,
  //       likeCount,
  //       commentCount,
  //     } = getPost;

  // postMarkup = (
  return (
    <Grid>
      <Grid.Row>
        <Grid.Column width={2}>
          <Image
            src="https://react.semantic-ui.com/images/avatar/large/steve.jpg"
            size="small"
          />
        </Grid.Column>
        <Grid.Column width={10}>
          <Card fluid>
            <Card.Content>
              <Card.Header>{username}</Card.Header>
              <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
              <Card.Description>{body}</Card.Description>
            </Card.Content>
            <hr />
            <Card.Content extra>
              <LikeButton user={user} post={{ id, likes, likeCount }} />
              <Button
                as="div"
                labelPosition="right"
                onClick={() => console.log("comment on post")}
              >
                <Button basic color="blue">
                  <Icon name="comments" />
                </Button>
                <Label basic color="blue" pointing="left">
                  {commentCount}
                </Label>
              </Button>
              {user && user.username === username && (
                <DeleteButton postId={id} callback={deletePostCallback} />
              )}
            </Card.Content>
          </Card>
        </Grid.Column>
      </Grid.Row>
    </Grid>
  );

  // return postMarkup;
};
export default SinglePost;
