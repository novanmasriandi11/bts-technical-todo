import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import LoginPage from "./pages/LoginPage";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout/Layout";
import RegisterPage from "./pages/RegisterPage";
import NotePage from "./pages/NotePage";

export default function App() {
   return (
      <ThemeProvider>
         <AuthProvider>
            <Router>
               <Layout>
                  <Routes>
                     <Route path="/" element={<LoginPage/> } />
                     <Route path="/login" element={<LoginPage />} />
                     <Route path="/register" element={<RegisterPage />} />
                     <Route path="/notes" element={<NotePage />} />
                  </Routes>
               </Layout>
            </Router>
         </AuthProvider>
      </ThemeProvider>
   )
}