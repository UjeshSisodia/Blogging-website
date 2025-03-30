import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './BlogList.css';

const BlogList = ({ token }) => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const res = await axios.get('http://localhost:5000/api/blogs', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlogs(res.data);
    };
    fetchBlogs();
  }, [token]);

  return (
    <div className="blog-list-container">
      <h1 className="blog-list-header">Latest Blog Posts</h1>
      <div className="blog-grid">
        {blogs.map(blog => (
          <div key={blog.id} className="blog-card">
            <Link to={`/blogs/${blog.id}`} className="blog-link">
              <h3>{blog.title}</h3>
              <p className="blog-excerpt">{blog.content.substring(0, 100)}...</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default BlogList;