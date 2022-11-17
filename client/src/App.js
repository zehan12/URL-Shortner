import { useState } from 'react';
import './App.css';
import { Button, InputGroup, Form, Container, Spinner } from 'react-bootstrap';
import Header from './components/Header';


function App() {

  const [url, setUrl] = useState("");
  const [isloading,setIsLoading] = useState(false)
  const handleSubmit = async(e) => {
    e.preventDefault();
    console.log(url, typeof url, url.length);
    setIsLoading(true)
    const res = await fetch("http://localhost:5000/api/url/show");
    const data = await res.json();
    setIsLoading(false)
    console.log(data);
    setUrl("")
  }

  return (
    <div className="App">
      <Header />
      <h1>Home Page</h1>
      <h2>Url Shortner</h2>
      <Container>
        <Form.Label htmlFor="basic-url">Enter Your URL</Form.Label>
        <InputGroup className="mb-3">
          <InputGroup.Text id="basic-addon3">
            https://example.com/users/
          </InputGroup.Text>
          <Form.Control id="basic-url" aria-describedby="basic-addon3" type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </InputGroup>
        {
          isloading ? <Button variant="primary" disabled>
            <Spinner
              as="span"
              animation="border"
              size="sm"
              role="status"
              aria-hidden="true"
            />
            Loading...
          </Button> :
            <Button variant="primary" type='submit' onClick={(e) => handleSubmit(e)}>Submit </Button>

        }
      </Container>
    </div>

  );
}

export default App;
