// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import AdminLogin from "./components/AdminLogin.tsx";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AdminDashboard from './components/AdminDashboard';

// import './App.css'

// function App() {

//   return (
//     <>
//       <ToastContainer
//       position="top-right"
//       autoClose={3000}
//       hideProgressBar={false}
//       newestOnTop={false}
//       closeOnClick
//       pauseOnFocusLoss
//       draggable
//       pauseOnHover
//     />
//     <Router>
//       <Routes>
//         <Route path="/" element={<AdminLogin />} />
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//       </Routes>
//     </Router>
//     </>
//   )
// }

// export default App






// import { Routes, Route } from 'react-router-dom';
// import AdminLogin from "./components/AdminLogin.tsx";
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import AdminDashboard from './components/AdminDashboard';

// // import './App.css';

// function App() {
//   return (
//     <>
//       <ToastContainer
//         position="top-right"
//         autoClose={3000}
//         hideProgressBar={false}
//         newestOnTop={false}
//         closeOnClick
//         pauseOnFocusLoss
//         draggable
//         pauseOnHover
//       />
//       <Routes>
//         <Route path="/" element={<AdminLogin />} />
//         <Route path="/admin/dashboard" element={<AdminDashboard />} />
//       </Routes>
//     </>
//   );
// }

// export default App;



// src/App.tsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import ProtectedRoute from './components/ProtectedRoute';
import LoginPage from './components/AdminLogin';
import DashboardPage from './components/AdminDashboard';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Placeholder components for content area
const DashboardHome = () => <h1 className="text-3xl font-bold">Welcome to the Admin Dashboard!</h1>;
const CreateDepartment = () => <h1 className="text-2xl font-semibold">Create Department Form</h1>;
const ListDepartments = () => <h1 className="text-2xl font-semibold">Department List</h1>;
// ... create other placeholder components as needed

const App: React.FC = () => {
  return (
      <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
      <Routes>
        <Route path="/" element={<LoginPage />} />
        {/* <ProtectedRoute> */}
        {/* <Route path="/admin/dashboard" element={<DashboardPage />}> */}
        <Route
          path="/admin/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        >
          {/* Nested routes for the dashboard content */}
          <Route index element={<DashboardHome />} />
          <Route path="departments/create" element={<CreateDepartment />} />
          <Route path="departments/list" element={<ListDepartments />} />
          {/* Add other routes for news, hero images etc. here */}
        </Route>
        {/* </ProtectedRoute> */}
        {/* Redirect any unknown paths to the login page */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
      </>
  );
};

export default App;






// src/App.tsx
// import React from 'react';
// // REMOVE BrowserRouter from here
// import { Routes, Route, Navigate } from 'react-router-dom'; 
// import LoginPage from './pages/LoginPage';
// import DashboardPage from './pages/DashboardPage';

// // Placeholder components for content area
// const DashboardHome = () => <h1 className="text-3xl font-bold">Welcome to the Admin Dashboard!</h1>;
// const CreateDepartment = () => <h1 className="text-2xl font-semibold">Create Department Form</h1>;
// const ListDepartments = () => <h1 className="text-2xl font-semibold">Department List</h1>;

// const App: React.FC = () => {
//   return (
//     // REMOVE the <Router> wrapper from here
//     <Routes>
//       <Route path="/" element={<LoginPage />} />
//       <Route path="/dashboard" element={<DashboardPage />}>
//         <Route index element={<DashboardHome />} />
//         <Route path="departments/create" element={<CreateDepartment />} />
//         <Route path="departments/list" element={<ListDepartments />} />
//         {/* Add other routes here */}
//       </Route>
//       <Route path="*" element={<Navigate to="/" />} />
//     </Routes>
//     // REMOVE the </Router> wrapper from here
//   );
// };

// export default App;