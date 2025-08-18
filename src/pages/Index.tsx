import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ArrowRight, Code2, Zap, Users, Star, ChevronUp } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import heroImage from '@/assets/hero-bg.jpg';
import techIllustration from '@/assets/tech-illustration.jpg';

const Index = () => {
  const navigate = useNavigate();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 400);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const services = [
    {
      icon: <Code2 className="w-8 h-8" />,
      title: 'App Development',
      description: 'Native iOS & Android apps with cutting-edge technology'
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: 'Web Solutions',
      description: 'Scalable web applications built for performance'
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: 'AI Integration',
      description: 'Smart automation and machine learning solutions'
    }
  ];

  const technologies = ['React', 'Node.js', 'Python', 'Flutter', 'AWS', 'TensorFlow'];

  const testimonials = [
    {
      name: 'Sarah Chen',
      company: 'TechStart Inc.',
      role: 'CEO',
      content: 'Renacod transformed our vision into a stunning reality. Their expertise in modern tech stack is unmatched.',
      rating: 5
    },
    {
      name: 'Michael Rodriguez',
      company: 'InnovateX',
      role: 'CTO',
      content: 'The AI solutions they built for us increased our efficiency by 300%. Truly revolutionary work.',
      rating: 5
    },
    {
      name: 'Emily Watson',
      company: 'FutureApps',
      role: 'Product Manager',
      content: 'From concept to deployment, their process is seamless. The mobile app exceeded all expectations.',
      rating: 5
    }
  ];

  return (
    <div className="min-h-screen bg-background font-inter">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-background/90" />
        </div>
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-poppins font-bold mb-8 leading-tight animate-fade-up">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Reimagining
              </span>
              <br />
              <span className="text-foreground">Digital Solutions</span>
            </h1>
            
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-12 leading-relaxed animate-fade-up" style={{animationDelay: '0.2s'}}>
              We craft innovative applications and AI-powered solutions that transform businesses and create extraordinary user experiences.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center animate-fade-up" style={{animationDelay: '0.4s'}}>
              <Button 
                size="lg" 
                className="bg-gradient-primary hover:opacity-90 transition-opacity font-inter font-medium shadow-glow px-8 py-4 text-lg"
                onClick={() => navigate('/contact')}
              >
                Start Your Project
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="border-border hover:border-primary hover:bg-primary/10 transition-colors font-inter font-medium px-8 py-4 text-lg"
                onClick={() => navigate('/services')}
              >
                View Our Work
              </Button>
            </div>
          </div>
        </div>
        
        {/* Floating Elements */}
        <div className="absolute top-20 left-10 w-4 h-4 bg-primary rounded-full animate-float opacity-60" />
        <div className="absolute top-40 right-20 w-6 h-6 bg-accent rounded-full animate-float opacity-40" style={{animationDelay: '1s'}} />
        <div className="absolute bottom-40 left-20 w-3 h-3 bg-primary-light rounded-full animate-float opacity-50" style={{animationDelay: '2s'}} />
      </section>

      {/* Services Overview */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-6 animate-fade-up">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                What We Do Best
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto animate-fade-up" style={{animationDelay: '0.1s'}}>
              Comprehensive tech solutions designed to elevate your business to new heights
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={index}
                className="group bg-background border-border hover:border-primary/50 transition-all duration-500 hover:shadow-glow animate-fade-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 rounded-2xl bg-gradient-primary flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                    <div className="text-white">
                      {service.icon}
                    </div>
                  </div>
                  <h3 className="text-2xl font-poppins font-semibold mb-4 text-foreground">
                    {service.title}
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    {service.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Company Overview */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="animate-fade-up">
              <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-6">
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Innovation
                </span>
                <br />
                <span className="text-foreground">Meets Excellence</span>
              </h2>
              <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
                At Renacod, we believe technology should be an enabler, not a barrier. Our team of expert developers, designers, and AI specialists work together to create solutions that not only meet today's needs but anticipate tomorrow's challenges.
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Cutting-edge Technology Solutions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">Expert Development Team</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-2 h-2 bg-primary rounded-full" />
                  <span className="text-foreground">99% Client Satisfaction Rate</span>
                </div>
              </div>
            </div>
            
            <div className="relative animate-fade-up" style={{animationDelay: '0.2s'}}>
              <div className="bg-gradient-primary p-1 rounded-2xl shadow-glow">
                <img
                  src={techIllustration}
                  alt="Technology Innovation"
                  className="w-full h-auto rounded-xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Powered by Modern Tech
              </span>
            </h2>
            <p className="text-muted-foreground">
              We use cutting-edge technologies to build robust, scalable solutions
            </p>
          </div>

          <div className="flex flex-wrap justify-center gap-4">
            {technologies.map((tech, index) => (
              <div 
                key={tech}
                className="bg-background border border-border rounded-lg px-6 py-3 hover:border-primary/50 transition-colors hover:shadow-card animate-fade-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <span className="font-inter font-medium text-foreground">{tech}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                What Clients Say
              </span>
            </h2>
            <p className="text-xl text-muted-foreground">
              Don't just take our word for it
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <Card 
                key={index}
                className="bg-surface border-border hover:border-primary/50 transition-all duration-300 hover:shadow-card animate-fade-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardContent className="p-8">
                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-muted-foreground mb-6 leading-relaxed italic">
                    "{testimonial.content}"
                  </p>
                  <div>
                    <div className="font-poppins font-semibold text-foreground">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {testimonial.role} at {testimonial.company}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-4 sm:px-6 lg:px-8 bg-gradient-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-6 text-white">
            Ready to Transform Your Vision?
          </h2>
          <p className="text-xl text-white/90 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join the ranks of forward-thinking companies who chose Renacod to power their digital transformation. Let's build something extraordinary together.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg"
              className="bg-white text-primary hover:bg-white/90 font-inter font-medium shadow-elegant px-8 py-4 text-lg"
              onClick={() => navigate('/contact')}
            >
              Start Your Project
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
           
          </div>
        </div>
      </section>

      {/* Scroll to Top Button */}
      {showScrollTop && (
        <Button
          onClick={scrollToTop}
          size="sm"
          className="fixed bottom-8 right-8 z-50 bg-gradient-primary hover:opacity-90 transition-all duration-300 shadow-glow animate-fade-in"
        >
          <ChevronUp className="w-4 h-4" />
        </Button>
      )}

      <Footer />
    </div>
  );
};

export default Index;
