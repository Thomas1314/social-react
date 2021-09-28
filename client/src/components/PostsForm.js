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
    update(_, result) {
      console.log(result);
      values.body = "";
    },
    // refetchQueries: [GET_POSTS],
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <Form onSubmit={onSubmit}>
      <h2>Create post:</h2>
      <Form.Field>
        <Form.Input
          placeholder="What do you want to talk about"
          name="body"
          onChange={onChange}
          values={values.body}
        />
        <Button type="submit" color="teal">
          Submit
        </Button>
      </Form.Field>
    </Form>
  );
};

export default PostForm;
