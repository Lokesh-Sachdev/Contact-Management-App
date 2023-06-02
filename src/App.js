import React from 'react';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import {
  AddContact,
  ChartsAndMaps,
  Dashboard,
  Sidebar,
  UpdateContact,
} from './components';
import { QueryClient, QueryClientProvider } from 'react-query';
import './styles/style.css';

// Create a client
const queryClient = new QueryClient();

const App = () => {
  return (
    <div className="App flex h-screen">
      <ToastContainer />
      <Sidebar />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route exact path="/" element={<Dashboard />} />
          <Route exact path="/add" element={<AddContact />} />
          <Route exact path="/edit/:id" element={<UpdateContact />} />
          <Route exact path="/charts&maps" element={<ChartsAndMaps />} />
        </Routes>
      </QueryClientProvider>
    </div>
  );
};
export default App;
