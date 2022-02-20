import React from 'react';
import './App.scss';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import CompanyListing from './CompanyManager/CompanyListing';
import AddCompany from './CompanyManager/AddCompany';
import EditCompany from './CompanyManager/EditCompany';

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<CompanyListing />} />
          <Route path="/add-company" element={<AddCompany />} />
          <Route path="/company/:id/edit" element={<EditCompany />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
