import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './Homepage.css';
import Books from './Books';
import Homepage from './Homepage';
import CreateBook from './CreateBook';
import UpdateBook from './UpdateBook';
import Layout from './Layout'; // Import the Layout component

const App = () => {
    return (
        <Router>
            <Routes>
                {/* Homepage without header */}
                <Route path="/" element={<Homepage />} />
                
                {/* Routes wrapped with Layout */}
                <Route path="/book" element={<Layout><Books /></Layout>} />
                <Route path="/create" element={<Layout><CreateBook /></Layout>} />
                <Route path="/update/" element={<Layout><UpdateBook /></Layout>} />
            </Routes>
        </Router>
    );
};

export default App;
