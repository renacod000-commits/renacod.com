import React from 'react';
import { Linkedin, Instagram, Twitter, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
const Footer = () => {
  return (
    <footer className="bg-background border-t border-border">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <Link to="/" className="flex items-center hover:opacity-90 transition-opacity">
                          <img src="/image.png" alt="Renacod Logo" className="h-14 w-auto drop-shadow-xl rounded-3xl  mr-2"  />
                          <p className='font-inter font-semibold text-2xl text-foreground hover:text-primary '>Renacod</p>
                        </Link>

            </div>
            <p className="text-muted-foreground leading-relaxed">
              Reimagining digital solutions with cutting-edge technology and innovative approaches.
            </p>
            <div className="flex space-x-4">
              <a
                 href="https://www.linkedin.com/company/108417170/admin/dashboard/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-lg bg-surface hover:bg-primary/10 border border-border hover:border-primary/50 transition-colors flex items-center justify-center group"
              >
                <Linkedin className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://www.instagram.com/rena_cod?igsh=cDU3MjJmbnljcGdr"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="w-10 h-10 rounded-lg bg-surface hover:bg-primary/10 border border-border hover:border-primary/50 transition-colors flex items-center justify-center group"
              >
                <Instagram className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
              <a
                href="https://x.com/Renacod000?t=IcLxREzpLNr13IaKTVt5Yw&s=09"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Twitter/X"
                className="w-10 h-10 rounded-lg bg-surface hover:bg-primary/10 border border-border hover:border-primary/50 transition-colors flex items-center justify-center group"
              >
                <Twitter className="w-5 h-5 text-muted-foreground group-hover:text-primary transition-colors" />
              </a>
            </div>
          </div>

          {/* Services */}
          <div className="space-y-4">
            <h4 className="text-lg font-poppins font-semibold text-foreground">Services</h4>
            <ul className="space-y-2">
              <li>
                <a href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  App Development
                </a>
              </li>
              <li>
                <a href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Web Solutions
                </a>
              </li>
              <li>
                <a href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  AI Integration
                </a>
              </li>
            </ul>
          </div>

          {/* Quick Links */}
          <div className="space-y-4">
            <h4 className="text-lg font-poppins font-semibold text-foreground">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <a href="/" className="text-muted-foreground hover:text-primary transition-colors">
                  Home
                </a>
              </li>
              <li>
                <a href="/services" className="text-muted-foreground hover:text-primary transition-colors">
                  Services
                </a>
              </li>
              <li>
                <a href="/contact" className="text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div className="space-y-4">
            <h4 className="text-lg font-poppins font-semibold text-foreground">Contact</h4>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <Mail className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">renacod000@gmail.com</span>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">7810085629</span>
              </li>
              <li className="flex items-center gap-3">
                <MapPin className="w-4 h-4 text-primary" />
                <span className="text-muted-foreground">Coimbatore</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-border mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-muted-foreground text-sm">
            © 2024 Renacod. All rights reserved.
          </p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Privacy Policy
            </a>
            <a href="#" className="text-muted-foreground hover:text-primary text-sm transition-colors">
              Terms of Service
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;