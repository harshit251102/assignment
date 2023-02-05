import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {Form, Button} from 'react-bootstrap';
import "./App.css";
import LoadingSpinner from './LoadingSpinner';
import TableApp from './TableApp'

const App = () => {
  const [file, setFile] = useState(null);
  const [percentages, setPercentages] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const handleFileUpload = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileSubmit = async () => {
    setIsLoading(true);
    const formData = new FormData();
    formData.append('file', file);

    await axios.post('http://localhost:5000/analyze', formData).then((response) => {
      setPercentages(response.data);
      setIsLoading(false)
    });
    
  };

  const getPercentage=()=>{
    return percentages;
  }

  return (
    <div className='main'>
      <div className='input mt-5' style={{width:"60%", margin : "auto"}}>
        <Form.Group className="mb-3" controlId="formBasicFile">
            <Form.Control type="file" placeholder="select file" onChange={handleFileUpload}  />
        </Form.Group>
        <Button variant="primary" onClick={handleFileSubmit} disabled={isLoading}>Submit</Button>
      </div>
      <div className='table'>
      {isLoading ? <LoadingSpinner /> : <TableApp getPercentage={getPercentage}/>}
      </div>
    </div>
  );
};

export default App;