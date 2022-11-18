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



// const dropIn = {
//   hidden: {
//     y: "-100vh",
//     opacity: 0
//   },
//   visible: {
//     y: "0",
//     opacity: 1,
//     transition: {
//       duration: 0.1,
//       type: "spring",
//       damping: 25,
//       stiffness: 500
//     }
//   },
//   exist: {
//     y: "100vh",
//     opacity: 0
//   }

// }

// const Backdrop = ({ childern, onClick }) => {
//   return (<motion.div
//     className='backdrop'
//     onClick={onClick}
//     initial={{ opacity: 0 }}
//     animate={{ opacity: 1 }}
//     exit={{ opacity: 0 }}
//   >
//     {childern}
//   </motion.div>)
// }

// const Model = ({ handleClick, text }) => {
//   return (
//     <Backdrop onClick={() => handleClick(null)} >
//       <motion.div
//         onClick={(e) => e.stopPropagation()}
//         className="modal organe-gradient"
//         variants={dropIn}
//         initial="hidden"
//         animate="visible"
//         exit="exist"
//       >
//         <h2>{text}</h2>
//       </motion.div>
//     </Backdrop>
//   )
// }