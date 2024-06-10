import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addPost, updatePost } from './postSlice';
import styles from './AddPostForm.module.css';

const AddPostForm = ({ closePopup, postToEdit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    if (postToEdit) {
      setTitle(postToEdit.title);
      setContent(postToEdit.content);
    } else {
      setTitle('');
      setContent('');
    }
  }, [postToEdit]);

  const onTitleChanged = (e) => setTitle(e.target.value);
  const onContentChanged = (e) => setContent(e.target.value);

  const onSavePostClicked = () => {
    if (title && content) {
      if (postToEdit) {
        dispatch(updatePost({ id: postToEdit.id, title, content, points: postToEdit.points }));
      } else {
        dispatch(addPost({ title, content, points:50 }));
      }
      setTitle('');
      setContent('');
      closePopup();
    }
  };

  return (
    <div className={styles.popup}>
      <div className={styles.popupInner}>
        <h2>{postToEdit ? 'Edit Post' : 'Add a New Post'}</h2>
        <form>
          <label htmlFor="postTitle">Post Title:</label>
          <input
            type="text"
            id="postTitle"
            name="postTitle"
            value={title}
            onChange={onTitleChanged}
          />
          <label htmlFor="postContent">Content:</label>
          <textarea
            id="postContent"
            name="postContent"
            value={content}
            onChange={onContentChanged}
          />
          <div className={styles.buttons}>
            <button type="button" onClick={onSavePostClicked}>
              {postToEdit ? 'Save Changes' : 'Save Post'}
            </button>
            <button type="button" onClick={closePopup}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPostForm;
