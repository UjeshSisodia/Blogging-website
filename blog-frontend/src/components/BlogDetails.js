import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const BlogDetails = ({ token }) => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [country, setCountry] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      const blogRes = await axios.get(`http://localhost:5000/api/blogs/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setBlog(blogRes.data);

      const countryRes = await axios.get(`https://restcountries.com/v3.1/alpha/${blogRes.data.countryCode}`);
      setCountry(countryRes.data[0]);
    };
    fetchData();
  }, [id, token]);

  return (
    <div>
      {blog && (
        <>
          <h1>{blog.title}</h1>
          <p>{blog.content}</p>
          {country && (
            <div>
              <h2>{country.name.common}</h2>
              <p>Capital: {country.capital?.[0]}</p>
              <p>Population: {country.population}</p>
              <img src={country.flags.png} alt="Flag" />
            </div>
          )}
        </>
      )}
    </div>
  );
};
export default BlogDetails;