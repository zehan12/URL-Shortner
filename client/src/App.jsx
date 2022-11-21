import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './Pages/Home';
import List from './Pages/List'
import { Container } from 'react-bootstrap';

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
import Footer from './components//Footer/index';
 

function App() {
 
 const queryClient = new QueryClient()

  const [darkMode, setDarkMode] = useState(false)

  const [page, setPage] = useState("HOME");

  const handlePage = () => {
    return page === "HOME" ? setPage("LIST") : setPage("HOME");
  }

  const handleMode = () => {
    return setDarkMode(!darkMode)
  }

  if ( darkMode  ) {
    document.body.style.backgroundColor = '#1B2B54'
  } else {
    document.body.style.background = '#FFF' 
  }

  return (
    <QueryClientProvider client={queryClient}>
    <div className="App" style={ darkMode ? {backgroundColor: "#1B2B54", color: "white"} : {} }>
      <Header
        handlePage={handlePage}
        handleMode={handleMode}
        mode={darkMode}
      />

      {
        page === "HOME" ?
          <Home mode={darkMode} />
          : <List mode={darkMode} />
      }
      <Footer />
    </div>
    </QueryClientProvider>
  );
}

export default App;