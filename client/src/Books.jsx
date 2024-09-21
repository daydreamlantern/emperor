import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Books = () => {
  const [books, setBooks] = useState([]);
  const [formData, setFormData] = useState({
    publisher: '',
    name: '',
    date: ''
  });

  // Fetch books data from the backend
  useEffect(() => {
    axios
      .get('http://localhost:3030')
      .then((res) => {
        console.log('Books data:', res.data);
        setBooks(Array.isArray(res.data) ? res.data : []); // Ensure data is an array
      })
      .catch((err) => {
        console.log('Error fetching books:', err);
      });
  }, []);

  // Handle form input change
  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post('http://localhost:3030/create', formData)
      .then((res) => {
        console.log('Data inserted successfully:', res.data);
        // Optionally reload books data after successful submission
        axios
          .get('http://localhost:3030')
          .then((res) => setBooks(res.data))
          .catch((err) => console.log('Error fetching books after submission:', err));
      })
      .catch((err) => {
        console.log('Error inserting data:', err);
      });
  };

  return (
    <div>
      <div className='container mt-5'>
        <Link to="/create" className="btn btn-success">Create Book</Link>

        {/* Book creation form */}
        <form onSubmit={handleSubmit} className="mt-3">
          <div className="form-group">
            <label htmlFor="publisher">Publisher</label>
            <input
              type="text"
              className="form-control"
              id="publisher"
              name="publisher"
              value={formData.publisher}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="name">Book Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="date">Date</label>
            <input
              type="date"
              className="form-control"
              id="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary mt-3">Submit</button>
        </form>

        {/* Book list table */}
        {Array.isArray(books) && books.length !== 0 ? (
          <table className="table mt-5">
            <thead>
              <tr>
                <th scope="col">#</th>
                <th scope="col">Publisher</th>
                <th scope="col">Book Name</th>
                <th scope="col">Date</th>
              </tr>
            </thead>
            <tbody>
              {books.map((book) => (
                <tr key={book.id}>
                  <td>{book.id}</td>
                  <td>{book.publisher}</td>
                  <td>{book.name}</td>
                  <td>{book.date}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <h2 className="mt-3">No Records</h2>
        )}
      </div>
    </div>
  );
};

export default Books;
