import React from 'react';
import './CommentList.scss';
import { useState, useEffect } from 'react';
import { CommentItem } from '../CommentItem/CommentItem';
import { getRequest, postRequest } from '../../api.service';



export const CommentList = ({ postId, user, addComment }) => {
  const [commentList, setCommentList] = useState([]);

  //const [loading, setLoading] = useState(true);

  const [input, setInput] = useState('')

  const onSubmit = async (e) => {
    e.preventDefault()

    addComment()
    await postRequest(`/api/comments/`, {text: input, postId, userId: user._id})
    setInput('')
    const { data } = await getRequest(`/api/comments/${postId}`)
    console.log(data)

    setCommentList(data);
  }

  

  useEffect(() => {
    (async () => {
      const { data } = await getRequest(`/api/comments/${postId}`)
      console.log(data)

      setCommentList(data);
    })();
  }, []);

  return (
    <div className="comment_list">
      <div className="comment_list_header">Comments:</div>
      {commentList.map((item) => <CommentItem item={item} key={item._id} />)}
      <form onSubmit={onSubmit}>
        <div className="comment_list_form">
          <div className='comment_list_input'>
            <img src={user.avatarUrl}></img>
          </div>
          <input value={input} onChange= {e => setInput(e.target.value)} placeholder="Type your comment..." type="text"></input>
        </div>
        <div className="comment_list_button">
          <button type="submit">Send</button>
        </div>
      </form>
    </div>
  );
};
