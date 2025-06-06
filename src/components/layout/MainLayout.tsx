import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

interface MainLayoutProps {
  children: React.ReactNode;
}

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  return (
    <div className="relative min-h-screen flex flex-col bg-nextips-dark">
      <Navbar />
      <main className="flex-grow relative z-10">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default MainLayout; 