import React, { Suspense, lazy } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Loader from "./component/loader";


// Lazy loading for all the pages
const RegisterPage = lazy(() => import("./auth/register/register"));
const LoginPage = lazy(() => import("./auth/login/login"));
const ProfilePage = lazy(() => import("./auth/profile/profile"));


function App() {
  return (
    <Router>
      <Suspense fallback={<Loader />}>
        <Routes>
          {/* page routes  */}
          <Route path="/" element={<RegisterPage />} />
          <Route path="/auth/login" element={<LoginPage />} />
          <Route path="/auth/profile" element={<ProfilePage />} />


          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
