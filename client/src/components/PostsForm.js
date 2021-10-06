import { useMutation } from "@apollo/client";
import React from "react";
import { Button, Form } from "semantic-ui-react";
import { CREATE_POST } from "../graphql/mutations/createPost";
import { GET_POSTS } from "../graphql/queries/getPosts";
import { useForm } from "../util/hooks";

const PostForm = () => {
  const { values, onChange, onSubmit } = useForm(createPostCallback, {
    body: "",
  });
  const [createPost, { error }] = useMutation(CREATE_POST, {
    variables: values,
    update(proxy, result) {
      const data = proxy.readQuery({
        query: GET_POSTS,
      });
      let newData = [...data.getPosts];
      newData = [result.data.createPost, ...data.getPosts];
      proxy.writeQuery({
        query: GET_POSTS,
        data: {
          ...data,
          getPosts: { newData },
        },
      });
      values.body = "";
    },
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <>
      <Form onSubmit={onSubmit}>
        <h2>Create post:</h2>
        <Form.Field>
          <Form.Input
            placeholder="What do you want to talk about"
            name="body"
            onChange={onChange}
            value={values.body}
            error={error ? true : false}
          />
          <Button type="submit" color="teal">
            Submit
          </Button>
        </Form.Field>
      </Form>
      {error && (
        <div className="ui error message" style={{ marginBottom: 20 }}>
          <ul className="list">
            <li>{error.graphQLErrors[0].message}</li>
          </ul>
        </div>
      )}
    </>
  );
};

export default PostForm;
