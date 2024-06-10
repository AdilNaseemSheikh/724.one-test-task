import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const BASE_URL = "http://localhost:3000";

const initialState = {
  posts: [],
  status: "idle",
  error: null,
};

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async () => {
  const response = await axios.get(`${BASE_URL}/posts`);
  return response.data;
});

export const addPost = createAsyncThunk("posts/addPost", async (newPost) => {
  const response = await axios.post(`${BASE_URL}/posts`, newPost);
  return response.data;
});

export const updatePost = createAsyncThunk(
  "posts/updatePost",
  async (updatedPost) => {
    const { id, title, content, points } = updatedPost;
    const response = await axios.put(`${BASE_URL}/posts/${id}`, {
      title,
      content,
      points,
    });
    return response.data;
  }
);

export const deletePost = createAsyncThunk(
  "posts/deletePost",
  async (postId) => {
    await axios.delete(`${BASE_URL}/posts/${postId}`);
    return postId;
  }
);

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchPosts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.posts = action.payload;
        toast.success("Posts fetched successfully!");
      })
      .addCase(fetchPosts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
        toast.error(`Failed to fetch posts: ${action.error.message}`);
      })
      .addCase(addPost.fulfilled, (state, action) => {
        state.posts.push(action.payload);
        toast.success("Post added successfully!");
      })
      .addCase(addPost.rejected, (state, action) => {
        toast.error(`Failed to add post: ${action.error.message}`);
      })
      .addCase(updatePost.fulfilled, (state, action) => {
        const { id, title, content } = action.payload;
        const existingPost = state.posts.find((post) => post.id === id);
        if (existingPost) {
          existingPost.title = title;
          existingPost.content = content;
          toast.success("Post updated successfully!");
        }
      })
      .addCase(updatePost.rejected, (state, action) => {
        toast.error(`Failed to update post: ${action.error.message}`);
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.posts = state.posts.filter((post) => post.id !== action.payload);
        toast.success("Post deleted successfully!");
      })
      .addCase(deletePost.rejected, (state, action) => {
        toast.error(`Failed to delete post: ${action.error.message}`);
      });
  },
});

export default postsSlice.reducer;
