import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import AuthProvider from "./context/AuthProvider";
import LoginPage from "./pages/LoginPage";
import { ThemeProvider } from "./context/ThemeContext";
import Layout from "./components/Layout/Layout";

export default function App() {
   return (
      <ThemeProvider>
         <AuthProvider>
            <Router>
               <Layout>
                  <Routes>
                     <Route path="/login" element={<LoginPage />} />
                  </Routes>
               </Layout>
            </Router>
         </AuthProvider>
      </ThemeProvider>
   )
}