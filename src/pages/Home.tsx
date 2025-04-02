
import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, Brain, ClipboardList, Shield, UserCog, CheckCircle, HeartPulse, Users, BarChart4 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';

const Home = () => {
  return (
    <div className="min-h-[calc(100vh-60px)]">
      {/* Hero Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-health-deep-blue to-health-bright-blue text-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6 animate-fade-in">
              <h1 className="text-4xl md:text-5xl font-bold leading-tight">
                Revolutionizing Healthcare with AI-Driven Solutions
              </h1>
              <p className="text-xl opacity-90">
                Secure and unified electronic health records, AI diagnostics, and data-driven insights for better healthcare decisions.
              </p>
              <div className="pt-2">
                <div className="flex flex-wrap gap-3 items-center">
                  <CheckCircle size={20} className="text-lime-300" />
                  <span>Unified medical records across healthcare providers</span>
                </div>
                <div className="flex flex-wrap gap-3 items-center mt-2">
                  <CheckCircle size={20} className="text-lime-300" />
                  <span>AI-powered diagnostic assistance and symptom assessment</span>
                </div>
                <div className="flex flex-wrap gap-3 items-center mt-2">
                  <CheckCircle size={20} className="text-lime-300" />
                  <span>Secure, encrypted personal health information</span>
                </div>
              </div>
              <div className="flex flex-wrap gap-4 pt-4">
                <Button asChild size="lg" className="bg-white text-health-deep-blue hover:bg-gray-100">
                  <Link to="/signup">Get Started</Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                  <Link to="/about">Learn More</Link>
                </Button>
              </div>
            </div>
            <div className="hidden lg:block">
              <img 
                src="/assets/hero-image.png" 
                alt="Health Insight Nexus Platform" 
                className="w-full max-w-md mx-auto rounded-xl shadow-2xl"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                  console.log("Image failed to load - would show healthcare platform visual");
                }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-health-deep-blue">
              Comprehensive Health Management
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform integrates cutting-edge technology to deliver personalized healthcare solutions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="border-2 border-gray-100 hover:border-health-bright-blue/30 transition-all duration-300 hover:shadow-lg">
                <CardContent className="p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-health-bright-blue/10 flex items-center justify-center text-health-bright-blue">
                    <feature.icon size={28} />
                  </div>
                  <h3 className="text-xl font-semibold mb-3 text-health-deep-blue">{feature.title}</h3>
                  <p className="text-gray-600">{feature.description}</p>
                  <Button asChild className="mt-4 bg-transparent text-health-bright-blue hover:bg-health-bright-blue/10 p-0">
                    <Link to={feature.link} className="flex items-center gap-1">
                      Learn more <ArrowRight size={16} />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Statistics Section - New */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {statistics.map((stat, index) => (
              <div key={index} className="p-6 bg-white rounded-xl shadow-sm hover:shadow-md transition-shadow">
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-health-bright-blue/10 flex items-center justify-center text-health-teal">
                  <stat.icon size={24} />
                </div>
                <h3 className="text-3xl font-bold text-health-deep-blue">{stat.value}</h3>
                <p className="text-gray-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gray-50">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-health-deep-blue">
              How It Works
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Our platform simplifies healthcare management through a seamless user experience.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white rounded-xl p-8 shadow-md hover:shadow-xl transition-shadow duration-300 h-full">
                  <div className="w-12 h-12 rounded-full bg-health-bright-blue text-white flex items-center justify-center font-bold text-xl mb-6">
                    {index + 1}
                  </div>
                  <h3 className="text-xl font-semibold mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-1/2 right-0 transform translate-x-1/2 -translate-y-1/2 text-health-bright-blue">
                    <ArrowRight size={24} />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section - New */}
      <section className="py-20 px-6 bg-white">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-health-deep-blue">
              What Our Users Say
            </h2>
            <p className="mt-4 text-xl text-gray-600 max-w-3xl mx-auto">
              Real stories from healthcare professionals and patients using our platform.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gray-50 p-8 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                <div className="flex items-center mb-6">
                  <div className="w-12 h-12 bg-gray-300 rounded-full overflow-hidden mr-4">
                    {/* This would be a user avatar in a real app */}
                    <div className="w-full h-full flex items-center justify-center text-gray-600 font-bold">
                      {testimonial.name.charAt(0)}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{testimonial.name}</h4>
                    <p className="text-gray-600 text-sm">{testimonial.role}</p>
                  </div>
                </div>
                <p className="text-gray-700 italic">"{testimonial.content}"</p>
                <div className="mt-4 flex">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-yellow-500">
                      ★
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-health-teal text-white">
        <div className="container mx-auto max-w-7xl text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Healthcare Experience?
          </h2>
          <p className="text-xl opacity-90 mb-10 max-w-3xl mx-auto">
            Join Health Insight Nexus today and experience the future of healthcare management with our AI-powered platform.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild size="lg" className="bg-white text-health-teal hover:bg-gray-100">
              <Link to="/signup">Sign Up Now</Link>
            </Button>
            <Button asChild size="lg" variant="outline" className="border-white text-white hover:bg-white/20">
              <Link to="/dashboard">View Demo</Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-6 bg-health-deep-blue text-white">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center">
                  <span className="text-health-deep-blue font-bold text-sm">H</span>
                </div>
                <span className="text-lg font-semibold">Health Insight Nexus</span>
              </div>
              <p className="text-sm opacity-80">
                Revolutionizing healthcare with AI-driven solutions for better global health outcomes.
              </p>
              <div className="mt-4">
                <p className="text-sm opacity-80">
                  <strong>Contact:</strong> info@healthinsightnexus.com<br />
                  <strong>Support:</strong> +1 (555) 123-4567
                </p>
              </div>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/" className="hover:underline">Home</Link></li>
                <li><Link to="/about" className="hover:underline">About Us</Link></li>
                <li><Link to="/features" className="hover:underline">Features</Link></li>
                <li><Link to="/contact" className="hover:underline">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Legal</h4>
              <ul className="space-y-2 text-sm opacity-80">
                <li><Link to="/privacy" className="hover:underline">Privacy Policy</Link></li>
                <li><Link to="/terms" className="hover:underline">Terms of Service</Link></li>
                <li><Link to="/compliance" className="hover:underline">Compliance</Link></li>
                <li><Link to="/hipaa" className="hover:underline">HIPAA Compliance</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-4">Connect With Us</h4>
              <p className="text-sm opacity-80 mb-2">
                Stay updated with our latest news and features.
              </p>
              <div className="relative mt-3">
                <input 
                  type="email" 
                  placeholder="Your email address" 
                  className="w-full py-2 pl-3 pr-20 text-sm text-gray-700 bg-white rounded-lg"
                />
                <Button size="sm" className="absolute top-0 right-0 h-full bg-health-bright-blue">
                  Subscribe
                </Button>
              </div>
              <div className="flex space-x-4 mt-4">
                <a href="#" className="text-white hover:text-health-bright-blue">
                  <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center">
                    <span>F</span>
                  </div>
                </a>
                <a href="#" className="text-white hover:text-health-bright-blue">
                  <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center">
                    <span>T</span>
                  </div>
                </a>
                <a href="#" className="text-white hover:text-health-bright-blue">
                  <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center">
                    <span>L</span>
                  </div>
                </a>
                <a href="#" className="text-white hover:text-health-bright-blue">
                  <div className="w-8 h-8 rounded-full border border-white flex items-center justify-center">
                    <span>I</span>
                  </div>
                </a>
              </div>
            </div>
          </div>
          <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm opacity-70">
            <p>© {new Date().getFullYear()} Health Insight Nexus. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

const features = [
  {
    icon: ClipboardList,
    title: "Unified EHR System",
    description: "Securely store and manage your complete medical history in one centralized location.",
    link: "/ehr"
  },
  {
    icon: Brain,
    title: "AI Diagnostics",
    description: "Get preliminary diagnoses and health insights powered by advanced machine learning algorithms.",
    link: "/diagnostics"
  },
  {
    icon: Shield,
    title: "Data Security",
    description: "Your health data is protected with enterprise-grade security and encryption protocols.",
    link: "/security"
  },
  {
    icon: UserCog,
    title: "Personalized Health",
    description: "Receive tailored health recommendations based on your unique medical history.",
    link: "/analytics"
  }
];

const steps = [
  {
    title: "Create Your Profile",
    description: "Sign up and create your secure health profile with your basic information and medical history. Our platform ensures your data remains confidential and protected."
  },
  {
    title: "Access Your Health Data",
    description: "Upload and manage your medical records, prescriptions, and test results in one secure place. Access them anytime, anywhere, and share with healthcare providers when needed."
  },
  {
    title: "Get AI-Powered Insights",
    description: "Receive personalized health insights and preliminary diagnoses from our advanced AI system. Our platform analyzes your data to provide meaningful health recommendations."
  }
];

// New statistics section data
const statistics = [
  {
    icon: Users,
    value: "50K+",
    label: "Active Users"
  },
  {
    icon: HeartPulse,
    value: "98%",
    label: "Diagnostic Accuracy"
  },
  {
    icon: Shield,
    value: "100%",
    label: "HIPAA Compliant"
  },
  {
    icon: BarChart4,
    value: "45%",
    label: "Faster Consultations"
  }
];

// New testimonials section data
const testimonials = [
  {
    name: "Dr. Sarah Johnson",
    role: "Cardiologist",
    content: "The unified EHR system has revolutionized how I manage patient records. I can access complete medical histories instantly, improving my diagnostic accuracy and patient care."
  },
  {
    name: "Michael Reynolds",
    role: "Patient",
    content: "Having all my medical records in one place has made managing my chronic condition so much easier. The AI insights provide helpful recommendations that have improved my health."
  },
  {
    name: "Dr. Robert Chen",
    role: "General Practitioner",
    content: "The AI diagnostic tools have transformed my practice. I can now provide more accurate preliminary assessments and focus my time on complex cases that require my expertise."
  }
];

export default Home;
