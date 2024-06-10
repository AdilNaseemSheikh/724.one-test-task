import { useState } from "react";
import PostsList from "./features/posts/PostList";
import AddPostForm from "./features/posts/addPostForm";
import Button from "./components/Button/Button";
function App() {
  const [showPopup, setShowPopup] = useState(false);
  const [postToEdit, setPostToEdit] = useState(null);

  const togglePopup = () => {
    setShowPopup(!showPopup);
    setPostToEdit(null);
  };

  const handleEdit = (post) => {
    setPostToEdit(post);
    setShowPopup(true);
  };

  return (
    <div style={{ padding: "20px" }}>
      <Button type="primary" onClick={togglePopup}>Add New Post</Button>
      {showPopup && (
        <AddPostForm
          closePopup={togglePopup}
          postToEdit={postToEdit}
        />
      )}
      <PostsList onEdit={handleEdit} />
    </div>
  );
}

export default App;