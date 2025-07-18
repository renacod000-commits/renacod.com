import React from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Smartphone, Globe, Brain, ArrowRight, Code, Zap, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Services = () => {
  const services = [
    {
      id: 'app-development',
      icon: <Smartphone className="w-8 h-8" />,
      title: 'App Development',
      subtitle: 'iOS • Android • Flutter',
      description: 'Cross-platform mobile applications with native performance and stunning user experiences. From concept to deployment.',
      features: ['Native iOS & Android', 'Flutter Development', 'Cross-platform Solutions', 'App Store Optimization'],
      gradient: 'from-primary to-primary-light'
    },
    {
      id: 'web-development',
      icon: <Globe className="w-8 h-8" />,
      title: 'Web Development',
      subtitle: 'Full-stack • Scalable • Modern',
      description: 'Cutting-edge web applications built with modern frameworks, optimized for performance and scalability.',
      features: ['React & Next.js', 'Node.js Backend', 'Cloud Architecture', 'Progressive Web Apps'],
      gradient: 'from-accent to-primary'
    },
    {
      id: 'ai-solutions',
      icon: <Brain className="w-8 h-8" />,
      title: 'AI Solutions',
      subtitle: 'Custom AI • Automation • ML',
      description: 'Intelligent automation and machine learning solutions to revolutionize your business processes.',
      features: ['Custom AI Models', 'Process Automation', 'Data Analytics', 'AI Integration'],
      gradient: 'from-primary-light to-accent'
    }
  ];

  const technologies = [
    { name: 'React', category: 'Frontend' },
    { name: 'Node.js', category: 'Backend' },
    { name: 'Python', category: 'AI/ML' },
    { name: 'Flutter', category: 'Mobile' },
    { name: 'TypeScript', category: 'Language' },
    { name: 'AWS', category: 'Cloud' },
    { name: 'TensorFlow', category: 'AI/ML' },
    { name: 'MongoDB', category: 'Database' }
  ];

  return (
    <div className="min-h-screen bg-background font-inter">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto text-center">
          <h1 className="text-5xl md:text-6xl font-poppins font-bold mb-6 animate-fade-up">
            <span className="bg-gradient-primary bg-clip-text text-transparent">
              Our Services
            </span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-12 animate-fade-up" style={{animationDelay: '0.1s'}}>
            Comprehensive tech solutions designed to propel your business into the digital future with innovation and excellence.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <Card 
                key={service.id}
                className="group bg-surface border-border hover:border-primary/50 transition-all duration-500 hover:shadow-glow animate-fade-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <CardContent className="p-8">
                  <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${service.gradient} flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300`}>
                    <div className="text-white">
                      {service.icon}
                    </div>
                  </div>
                  
                  <h3 className="text-2xl font-poppins font-semibold mb-2 text-foreground">
                    {service.title}
                  </h3>
                  
                  <p className="text-primary font-medium mb-4">
                    {service.subtitle}
                  </p>
                  
                  <p className="text-muted-foreground mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-3 mb-8">
                    {service.features.map((feature, idx) => (
                      <li key={idx} className="flex items-center gap-3 text-sm">
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                        <span className="text-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                  
                  <Button 
                    className="w-full bg-gradient-primary hover:opacity-90 transition-opacity group-hover:shadow-glow"
                    size="lg"
                  >
                    Learn More
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-surface">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-poppins font-bold mb-6">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Our Process
              </span>
            </h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              A streamlined approach that ensures quality, efficiency, and exceptional results.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              { icon: <Code className="w-6 h-6" />, title: 'Analyze & Plan', description: 'Deep dive into requirements and create a comprehensive roadmap.' },
              { icon: <Zap className="w-6 h-6" />, title: 'Design & Build', description: 'Rapid prototyping and development with continuous feedback loops.' },
              { icon: <Shield className="w-6 h-6" />, title: 'Test & Deploy', description: 'Rigorous testing and seamless deployment to production.' }
            ].map((step, index) => (
              <div key={index} className="text-center group animate-fade-up" style={{animationDelay: `${index * 0.2}s`}}>
                <div className="w-16 h-16 rounded-full bg-gradient-primary flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <div className="text-white">
                    {step.icon}
                  </div>
                </div>
                <h3 className="text-xl font-poppins font-semibold mb-4 text-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Technologies */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <div className="container mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-4">
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Technologies We Use
              </span>
            </h2>
            <p className="text-muted-foreground">
              Cutting-edge tools and frameworks that power our solutions
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {technologies.map((tech, index) => (
              <div 
                key={tech.name}
                className="bg-surface border border-border rounded-lg p-4 text-center hover:border-primary/50 transition-colors hover:shadow-card animate-fade-up"
                style={{animationDelay: `${index * 0.1}s`}}
              >
                <div className="text-foreground font-medium">{tech.name}</div>
                <div className="text-xs text-muted-foreground mt-1">{tech.category}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 sm:px-6 lg:px-8 bg-gradient-primary">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-poppins font-bold mb-6 text-white">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Let's discuss how we can bring your vision to life with cutting-edge technology solutions.
          </p>
          <Button 
            size="lg"
            className="bg-white text-primary hover:bg-white/90 font-inter font-medium shadow-elegant"
          >
            Get Started Today
            <ArrowRight className="w-4 h-4 ml-2" />
          </Button>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;