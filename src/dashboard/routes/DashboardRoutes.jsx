import { Navbar } from '../components/Navbar';
import { Route, Routes, Navigate } from 'react-router-dom';
import { ProductPage, ClientPage } from '../index';

export const DashboardRoutes = () => {
  return (
    <>
      <Navbar />
      <div className='container'>
        <Routes>
          <Route path='product' element={<ProductPage />} />
          <Route path='client' element={<ClientPage />} />
          <Route path='/*' element={<Navigate to='/product' />} />
        </Routes>
      </div>
    </>
  );
};
