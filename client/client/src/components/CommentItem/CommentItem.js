import React, {useState} from 'react';
import './CommentItem.scss'
import { ReactComponent as DeleteSvg } from '../../assets/images/delete.svg';
import { deleteRequest } from '../../api.service'


export const CommentItem = ({ item } = {}) => {

  const [isDeleted, setIsDeleted] = useState(false)


  const onClick = async (e) => {

    await deleteRequest(`/api/comments/${item._id}`)
    setIsDeleted(true)
  }
  if (isDeleted) {
    return (<div className="comment-item">Comment deleted</div>)
  }

  return (
    <div className="comment-item">
      <button onClick={onClick} className="comment-item_button_delete"><DeleteSvg /></button>
      <div className="comment-item_author">
        <div className="comment-item_avatar"><img src={item.user.avatarUrl}></img></div>
        <strong><i>{item.user.name} {item.user.surname}:</i></strong>
      
      </div>
 
      <div className="comment-item_text"> {item.text}</div>
    </div>
  );
};
