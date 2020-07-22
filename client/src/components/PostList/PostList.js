import React from 'react';
import { useState, useEffect } from 'react';
import { ListItem } from '../ListItem/ListItem';
import { getRequest } from '../../api.service';
import './PostList.scss'

export const PostList = (props) => {
  const [postList, setPost] = useState([]);
  //const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      const { data } = await getRequest('/api/posts')
      console.log(data)

      setPost(data);
    })();
  }, []);

  return (
    <div className="post_list">
      <div className="post_list_header">Your feed</div>
      {postList.map((item) => <ListItem item={item} key={item._id} />)}
    </div>
  );
};
