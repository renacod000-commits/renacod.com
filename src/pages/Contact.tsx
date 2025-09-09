import React, { useState } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { MapPin, Phone, Mail, Send, Clock, Linkedin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';

const Contact = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    toast({
      title: "Message sent successfully!",
      description: "We'll get back to you within 24 hours.",
    });

    setFormData({ name: '', email: '', message: '' });
    setIsSubmitting(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  const contactInfo = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: 'Location',
      details: ['Coimbatore']
    },
    {
      icon: <Phone className="w-6 h-6" />,
      title: 'Phone',
      details: ['7810085629']
    },
    {
      icon: <Mail className="w-6 h-6" />,
      title: 'Email',
      details: ['info@renacod.com']
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: 'Business Hours',
      details: ['Mon - Fri: 9:00 AM - 6:00 PM', 'Sat: 10:00 AM - 4:00 PM', 'Sun: Closed']
    }
  ];

  const socialLinks = [
    { icon: <Linkedin className="w-5 h-5" />, name: 'LinkedIn', url: 'https://www.linkedin.com/in/renacod-renacod-6ba448379/' }
  ];

  return (
    <div className="min-h-screen bg-background font-inter">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-poppins font-bold mb-6 animate-fade-up">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Get in Touch
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-up" style={{animationDelay: '0.1s'}}>
            Ready to transform your ideas into reality? Let's start a conversation about your next project.
          </p>
        </div>
      </section>

      {/* Contact Content */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            
            {/* Contact Form */}
            <div className="animate-fade-up">
              <Card className="bg-surface border-border shadow-card">
                <CardContent className="p-8 text-center">
                  <h2 className="text-3xl font-poppins font-bold mb-6 text-foreground">
                    Contact Us
                  </h2>
                  <p className="mb-6 text-muted-foreground">For inquiries, please use our Google Form below:</p>
                  <a href="https://docs.google.com/forms/d/e/1FAIpQLScuGXtE3tBB0qxpySVlvZjlcabpxxoYvfJcd-f7twEr6KNH7w/viewform?usp=dialog" target="_blank" rel="noopener noreferrer">
                    <Button className="bg-gradient-primary hover:opacity-90 transition-opacity font-medium" size="lg">
                      Open Google Form
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>

            {/* Contact Information */}
            <div className="animate-fade-up" style={{animationDelay: '0.1s'}}>
              <div className="space-y-8">
                <div>
                  <h2 className="text-3xl font-poppins font-bold mb-6 text-foreground">
                    Contact Information
                  </h2>
                  <p className="text-muted-foreground mb-8">
                    We're here to help and answer any questions you might have. 
                    We look forward to hearing from you.
                  </p>
                </div>

                <div className="grid gap-6">
                  {contactInfo.map((info, index) => (
                    <Card key={index} className="bg-surface border-border hover:border-primary/50 transition-colors">
                      <CardContent className="p-6">
                        <div className="flex items-start gap-4">
                          <div className="w-12 h-12 rounded-lg bg-gradient-primary flex items-center justify-center flex-shrink-0">
                            <div className="text-white">
                              {info.icon}
                            </div>
                          </div>
                          <div>
                            <h3 className="font-poppins font-semibold text-foreground mb-2">
                              {info.title}
                            </h3>
                            {info.details.map((detail, idx) => (
                              <p key={idx} className="text-muted-foreground text-sm">
                                {detail}
                              </p>
                            ))}
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {/* Social Links */}
                <div>
                  <h3 className="font-poppins font-semibold text-foreground mb-4">
                    Follow Us
                  </h3>
                  <div className="flex gap-4">
                    {socialLinks.map((social, index) => (
                      <Button
                        key={index}
                        variant="outline"
                        size="sm"
                        className="border-border hover:border-primary hover:bg-primary/10 transition-colors"
                        asChild
                      >
                        <a href={social.url} target="_blank" rel="noopener noreferrer">
                          {social.icon}
                          <span className="ml-2">{social.name}</span>
                        </a>
                      </Button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Visit Our Office
              </span>
            </h2>
            <p className="text-muted-foreground">
              Located in Coimbatore
            </p>
          </div>
          
          <div className="bg-gradient-primary rounded-2xl p-1 shadow-glow">
            <div className="bg-background rounded-xl overflow-hidden">
              <iframe
                title="Coimbatore Location"
                src="https://www.google.com/maps?q=Coimbatore&hl=en&output=embed"
                className="w-full h-96 border-0"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <div className="bg-gradient-primary rounded-2xl p-12">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6 text-white">
              Ready to Start Your Journey?
            </h2>
            <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
              Join hundreds of satisfied clients who trusted us with their digital transformation.
            </p>
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-inter font-medium shadow-elegant"
            >
              Schedule a Consultation
              <Send className="w-4 h-4 ml-2" />
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;