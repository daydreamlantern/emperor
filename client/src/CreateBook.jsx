import React, { useState } from 'react';

const CreateBook = () => {
  const [values, setValues] = useState({
    publisher: "",
    name: "",
    date: '',

  })
  const handleSubmit = (e) => {
    e.preventDefault
    axios.post( 'http://localhost:3030/create', values)
    .then (res => console. log(res))
    .catch (err => console. log(err))
  }
  return (
    <div className="container mt-3">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <form>
            <div className="mb-3 mt-3">
              <label htmlFor="publisher" className="form-label">Publisher:</label>
              <input type="text" className="form-control" id="publisher" placeholder="Enter Publisher Name" name="publisher" onChange={(e) => setValues({...values, publisher: e.target.value})} />
            </div>
            <div className="mb-3">
              <label htmlFor="bookName" className="form-label">Book Name:</label>
              <input type="text" className="form-control" placeholder="Enter Book Name" name="name" onChange={(e) => setValues({...values, publisher: e.target.value})} />
            </div>
            <div className="mb-3">
              <label htmlFor="publishDate" className="form-label">Publish Date:</label>
              <input type="date" className="form-control" name="date" onChange={(e) => setValues({...values, publisher: e.target.value})} />
            </div>
            <button type="submit" className="btn btn-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateBook;
