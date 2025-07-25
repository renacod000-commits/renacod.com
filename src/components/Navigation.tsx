import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Services', path: '/services' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
      scrolled ? 'bg-background/95 backdrop-blur-lg border-b border-border shadow-card' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
            {/* SVG White Logo */}
            <svg height="48" viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg" className="h-14 w-auto">
              <g>
                <rect width="48" height="48" rx="12" fill="none"/>
                <path d="M12 24C12 17.3726 17.3726 12 24 12C30.6274 12 36 17.3726 36 24C36 30.6274 30.6274 36 24 36C17.3726 36 12 30.6274 12 24Z" stroke="white" strokeWidth="3"/>
                <path d="M18 24C18 20.6863 20.6863 18 24 18C27.3137 18 30 20.6863 30 24C30 27.3137 27.3137 30 24 30C20.6863 30 18 27.3137 18 24Z" fill="white"/>
                <text x="24" y="28" textAnchor="middle" fill="#222" fontSize="10" fontWeight="bold" fontFamily="Arial">AI</text>
              </g>
            </svg>
            <span className="ml-3 text-2xl font-poppins font-bold text-foreground tracking-tight">Renacod</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className={`relative font-inter font-medium transition-colors hover:text-primary group ${
                  location.pathname === link.path ? 'text-primary' : 'text-foreground'
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-gradient-primary transform transition-transform origin-left ${
                  location.pathname === link.path ? 'scale-x-100' : 'scale-x-0 group-hover:scale-x-100'
                }`} />
              </Link>
            ))}
            
            <Button className="ml-4 bg-gradient-primary hover:opacity-90 transition-opacity font-inter font-medium">
              Get Started
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsOpen(!isOpen)}
              className="text-foreground hover:text-primary"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isOpen && (
          <div className="md:hidden absolute top-full left-0 right-0 bg-surface border border-border rounded-b-lg shadow-elegant animate-fade-in">
            <div className="px-4 py-6 space-y-4">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className={`block font-inter font-medium text-lg transition-colors hover:text-primary ${
                    location.pathname === link.path ? 'text-primary' : 'text-foreground'
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <Button className="w-full mt-4 bg-gradient-primary hover:opacity-90 transition-opacity font-inter font-medium">
                Get Started
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;