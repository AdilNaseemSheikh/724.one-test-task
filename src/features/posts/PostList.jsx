import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchPosts, deletePost } from "./postSlice";
import Button from "../../components/Button/Button";
import styles from "./PostsList.module.css";
import Loader from "../../components/Loader/Loader";

const PostsList = ({ onEdit }) => {
  const dispatch = useDispatch();
  const [total, setTotal] = useState(0);
  const [showHighPoints, setShowHighPoints] = useState(false);
  const [showFirstTen, setShowFirstTen] = useState(false); // State to toggle first 10 posts
  const posts = useSelector((state) => state.posts.posts);
  const postStatus = useSelector((state) => state.posts.status);
  const error = useSelector((state) => state.posts.error);

  useEffect(() => {
    if (postStatus === "idle") {
      dispatch(fetchPosts());
    }
  }, [postStatus, dispatch]);

  useEffect(() => {
    const points = posts.reduce((acc, cur) => acc + cur.points, 0);
    setTotal(points);

    return () => {
      setTotal(0);
    };
  }, [posts]);

  const filteredPosts = showHighPoints
    ? posts.filter((post) => post.points > 50)
    : posts;

  // Slice the array to show only the first 10 posts if the corresponding state is true
  const slicedPosts = showFirstTen ? filteredPosts.slice(0, 10) : filteredPosts;

  let content;

  if (postStatus === "loading") {
    content = <Loader />;
  } else if (postStatus === "succeeded") {
    content = (
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Points</th>
            <th>Content</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {slicedPosts.map((post) => (
            <tr key={post.id}>
              <td>{post.title}</td>
              <td>{post.points}</td>
              <td>{post.content}</td>
              <td className={styles.actions}>
                <Button type="outline" onClick={() => onEdit(post)}>
                  Edit
                </Button>
                <Button
                  type="delete"
                  onClick={() => dispatch(deletePost(post.id))}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    );
  } else if (postStatus === "failed") {
    content = <div>{error}</div>;
  }

  const togglePoints = () => {
    setShowHighPoints(!showHighPoints);
  };

  const toggleFirstTen = () => {
    setShowFirstTen(!showFirstTen);
  };

  return (
    <section className={styles.section}>
      <div className={styles.stats}>
        <h2>Posts</h2>
        <h3>Total points: {total}</h3>
        <div>
          <Button type="primary" onClick={togglePoints}>
            {showHighPoints ? "Show All Posts" : "Show Posts with Points > 50"}
          </Button>{"  "}
          <Button type="primary" onClick={toggleFirstTen}>
            {showFirstTen ? "Show All" : "Show first 10"}
          </Button>
        </div>
      </div>
      {content}
    </section>
  );
};

export default PostsList;
