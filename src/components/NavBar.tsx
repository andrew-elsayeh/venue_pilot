
import React from 'react';
import Logo from './Logo';
import { Button } from '@/components/ui/button';

const NavBar: React.FC = () => {
  return (
    <nav className="absolute top-0 left-0 right-0 py-4 px-6 flex justify-between items-center">
      <Logo />
      <Button className="bg-venuepilot hover:bg-venuepilot-dark text-white">My Bookings</Button>
    </nav>
  );
};

export default NavBar;
