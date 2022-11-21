import { useEffect, useState } from 'react';
import './App.css';
import Header from './components/Header';
import Home from './Pages/Home';
import List from './Pages/List'
import { Container } from 'react-bootstrap';

import { QueryClient, QueryClientProvider, useQuery } from 'react-query'
 

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
    document.body.style.background = 'hsl(204 100% 5%)'
  } else {
    document.body.style.background = '#FFF' 
  }

  return (
    <QueryClientProvider client={queryClient}>
    <div className="App" style={ darkMode ? {backgroundColor: "hsl(204 100% 5%)", color: "white"} : {} }>
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
    </div>
    </QueryClientProvider>
  );
}

export default App;