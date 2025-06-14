import { useState } from "react";
import { createContext } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom"; 
import Login from "./Authentication Page/Login";
import RegisterPage from "./List Page/Register";
import Protectedroute from "./Protected Page/Protectedroute";
import "./App.css";
import NotFound from "./Authentication Page/NotFound";
import Users from "./List Page/Users";
import EditPage from "./List Page/EditPage";
export const globalContext = createContext();
function App() {
 
 
  const [update, setUpdate] = useState([]);
  const[users,setUsers]=useState([])
   const [view, setView] = useState("list");

  return (
    <>
      <globalContext.Provider value={{update, setUpdate ,users,setUsers,view, setView}}>
        <BrowserRouter>
          <Routes>
              <Route path="/" element={<Login />} />
            <Route path="/login" element={<Login />} />
            <Route path="/create-user" element={<RegisterPage />} />
            <Route
              path="/users"
              element={
                <Protectedroute>
                  <Users/>
                </Protectedroute>
              }
            />
          <Route path="/edit/:id" element={<EditPage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </globalContext.Provider>
    </>
  );
}

export default App;
