import React, { useContext } from "react";
import { useQuery } from "@apollo/client";
import { Grid, Transition } from "semantic-ui-react";
import PostCard from "../components/PostCard";
import { AuthContext } from "../context/context";
import { GET_POSTS } from "../graphql/queries/getPosts";
import PostForm from "../components/PostsForm";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, data = {}, error } = useQuery(GET_POSTS);

  if (error) {
    return <div>{error.message}</div>;
  }

  if (!data || !data.getPosts || !data.getPosts.length) {
    return <div>No Data</div>;
  }

  const { getPosts: posts } = data;
  return (
    <Grid columns={3} divided>
      <Grid.Row className="page-title">
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {user && (
          <Grid.Column>
            <PostForm />
          </Grid.Column>
        )}
        {loading ? (
          <div>Loading posts...</div>
        ) : (
          <Transition.Group>
            {posts?.map((post) => (
              <Grid.Column
                key={post.id}
                style={{ marginBottom: 20, boxShadow: "none" }}
              >
                <PostCard post={post} />
              </Grid.Column>
            ))}
          </Transition.Group>
        )}
      </Grid.Row>
    </Grid>
  );
};

export default Home;
