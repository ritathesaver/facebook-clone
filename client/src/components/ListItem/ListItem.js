import React, { useState } from 'react';
import './ListItem.scss'
import { ReactComponent as LikeSvg } from '../../assets/images/2.svg';
import { ReactComponent as CommentSvg } from '../../assets/images/comment.svg';
import { CommentList } from '../CommentList/CommentList'
import { postRequest } from '../../api.service';




export const ListItem = ({ item } = {}) => {
  const [commentsCount, setCommentsCount] = useState(item.commentsCount)
  const [likesCount, setLikesCount] = useState(item.likesCount)

  const onLike = async (e) => {
    setLikesCount(likesCount+1)
    await postRequest(`/api/likes/`, { postId: item._id, userId: item.user._id })
  }

  return (
    <div className="post_item">
      <div className="post_item_header">
      <div className="post_item_avatar"><img src={item.user.avatarUrl} /></div>
        <div className="post_item_author"><strong><i> {item.user?.name}{item.user.surname}</i></strong> · yesterday at 2AM</div>
    </div>
      <div className="post_item_body">
        <div className="post_item_text">
          {item.text}
        </div>
        <div className="post_item_img">
          <img src={item?.imageUrl}></img>
        </div>
        <div className="post_item_buttons">
          <div className="button">
            <LikeSvg onClick={onLike} className='button_like'></LikeSvg>
            {likesCount}
          </div>
          <div className="button">
            <CommentSvg className="button_comm"></CommentSvg>
            {commentsCount}
          </div>
        </div>
        <hr className="post_item_line"></hr>
        
        <div className="post_item_comments">
          <CommentList
            addComment={() => setCommentsCount(commentsCount + 1)}
            postId={item._id}
            user={item.user}
          />
          
        </div>
        
      </div>
    
    </div>
  );
};
