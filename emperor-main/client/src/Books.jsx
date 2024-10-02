import React, { useEffect, useState } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const Books = () => {
    const [books, setBooks] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:3030').then((res) => setBooks(res.data)).catch(console.log);
    }, []);

    const handleDelete = (id) => {
        axios.delete(`http://localhost:3030/delete/${id}`)
            .then(() => setBooks(books.filter((book) => book.id !== id)))
            .catch(console.log);
    };

    return (
        <div className="container mt-5">
            <Link to="/create" className="btn btn-success mb-3">Create Booking</Link>
            <div className="card">
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Service</th>
                            <th>Date</th>
                            <th>Time</th>
                            <th>Payment Method</th>
                            <th>Email</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {books.length > 0 ? (
                            books.map((book) => (
                                <tr key={book.id}>
                                    <td>{book.id}</td>
                                    <td>{book.name}</td>
                                    <td>{book.service}</td>
                                    <td>{new Date(book.date).toLocaleDateString()}</td>
                                    <td>{book.time}</td>
                                    <td>{book.paymentMethod}</td>
                                    <td>{book.email}</td>
                                    <td>
                                        <button className="btn btn-danger" onClick={() => handleDelete(book.id)}>Delete</button>
                                    </td>
                                </tr>
                            ))
                        ) : (
                            <tr><td colSpan="8">No Records</td></tr>
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Books;
