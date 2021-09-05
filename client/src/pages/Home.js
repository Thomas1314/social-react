import React from "react";
import { useQuery } from "@apollo/client";
import gql from "graphql-tag";
import { Grid } from "semantic-ui-react";
import PostCard from "../components/PostCard";

const Home = () => {
  const { loading, data = {}, error } = useQuery(GET_POSTS);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error.message}</div>
  }

  if (!data || !data.getPosts || !data.getPosts.length) {
    return <div>No Data</div>;
  }

  const { getPosts: posts } = data;
  return (
    <Grid columns={3} divided>
      <Grid.Row className='page-title'>
        <h1>Recent Posts</h1>
      </Grid.Row>
      <Grid.Row>
        {posts?.map((post) => (
          <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
            <PostCard post={post} />
          </Grid.Column>
        ))}
      </Grid.Row>
    </Grid>
  );
};

const GET_POSTS = gql`
  {
    getPosts {
      username
      id
      body
      createdAt
      likeCount
      likes {
        username
      }
      commentCount
      comments {
        username
        id
        body
      }
    }
  }
`;

export default Home;
