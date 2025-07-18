import { useLocation, Link } from "react-router-dom";
import { useEffect } from "react";
import Navigation from '@/components/Navigation';
import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen bg-background font-inter">
      <Navigation />
      <div className="min-h-screen flex items-center justify-center px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-8xl md:text-9xl font-poppins font-bold mb-4">
            <span className="bg-gradient-primary bg-clip-text text-transparent">404</span>
          </h1>
          <h2 className="text-3xl md:text-4xl font-poppins font-semibold mb-4 text-foreground">
            Page Not Found
          </h2>
          <p className="text-xl text-muted-foreground mb-8 max-w-md mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button asChild className="bg-gradient-primary hover:opacity-90 transition-opacity">
              <Link to="/">
                <Home className="w-4 h-4 mr-2" />
                Return Home
              </Link>
            </Button>
            <Button variant="outline" onClick={() => window.history.back()} className="border-border hover:border-primary hover:bg-primary/10">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Go Back
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
