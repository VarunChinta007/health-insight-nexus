
import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  Heart, 
  Shield, 
  Users, 
  Target, 
  Star, 
  CheckCircle, 
  ChevronRight 
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const AboutUs = () => {
  return (
    <div className="min-h-[calc(100vh-60px)] py-10">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <div className="animate-fade-in">
            <h1 className="text-4xl md:text-5xl font-bold text-health-deep-blue mb-4">About Health Insight Nexus</h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Revolutionizing healthcare through innovative technology and patient-centered solutions.
            </p>
          </div>
        </section>
        
        {/* Our Mission */}
        <section className="mb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
            <div className="order-2 md:order-1 animate-fade-in">
              <h2 className="text-3xl font-bold text-health-deep-blue mb-6">Our Mission</h2>
              <p className="text-gray-600 mb-6">
                At Health Insight Nexus, we're dedicated to transforming healthcare through technology. 
                Our mission is to create a seamless connection between patients and healthcare providers, 
                making medical information more accessible, secure, and actionable.
              </p>
              <p className="text-gray-600 mb-6">
                We believe in a world where everyone has access to quality healthcare information and services,
                regardless of their location or background. Through our innovative platform, we're working to 
                make this vision a reality.
              </p>
              <div className="flex items-center text-health-bright-blue">
                <Heart className="mr-2" size={20} />
                <span className="font-medium">Empowering better health decisions every day</span>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <div className="bg-gradient-to-br from-health-bright-blue to-health-deep-blue h-80 rounded-2xl flex items-center justify-center">
                <div className="text-white text-center p-8">
                  <Shield size={60} className="mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Secure & Private</h3>
                  <p>Your health data is protected with industry-leading security standards</p>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Our Values */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-health-deep-blue mb-10 text-center">Our Core Values</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <Card className="p-6 hover-scale card-hover">
              <div className="h-12 w-12 rounded-full bg-health-bright-blue/10 flex items-center justify-center mb-4">
                <Users className="text-health-bright-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Patient-Centered</h3>
              <p className="text-gray-600">Everything we do begins and ends with patients' needs and wellbeing.</p>
            </Card>
            
            <Card className="p-6 hover-scale card-hover">
              <div className="h-12 w-12 rounded-full bg-health-teal/10 flex items-center justify-center mb-4">
                <Shield className="text-health-teal" />
              </div>
              <h3 className="text-xl font-bold mb-2">Privacy & Security</h3>
              <p className="text-gray-600">We maintain the highest standards of data protection and security.</p>
            </Card>
            
            <Card className="p-6 hover-scale card-hover">
              <div className="h-12 w-12 rounded-full bg-health-deep-blue/10 flex items-center justify-center mb-4">
                <Star className="text-health-deep-blue" />
              </div>
              <h3 className="text-xl font-bold mb-2">Innovation</h3>
              <p className="text-gray-600">Constantly improving our platform with cutting-edge technologies.</p>
            </Card>
            
            <Card className="p-6 hover-scale card-hover">
              <div className="h-12 w-12 rounded-full bg-health-lime/10 flex items-center justify-center mb-4">
                <Target className="text-health-lime" />
              </div>
              <h3 className="text-xl font-bold mb-2">Accessibility</h3>
              <p className="text-gray-600">Making healthcare information available to everyone, everywhere.</p>
            </Card>
            
            <Card className="p-6 hover-scale card-hover">
              <div className="h-12 w-12 rounded-full bg-health-orange/10 flex items-center justify-center mb-4">
                <CheckCircle className="text-health-orange" />
              </div>
              <h3 className="text-xl font-bold mb-2">Reliability</h3>
              <p className="text-gray-600">Providing dependable service and accurate information at all times.</p>
            </Card>
            
            <Card className="p-6 hover-scale card-hover">
              <div className="h-12 w-12 rounded-full bg-health-red/10 flex items-center justify-center mb-4">
                <Heart className="text-health-red" />
              </div>
              <h3 className="text-xl font-bold mb-2">Compassion</h3>
              <p className="text-gray-600">Understanding and empathizing with healthcare challenges.</p>
            </Card>
          </div>
        </section>
        
        {/* Our Team */}
        <section className="mb-20">
          <h2 className="text-3xl font-bold text-health-deep-blue mb-10 text-center">Leadership Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                name: "Dr. Sarah Johnson",
                title: "Chief Executive Officer",
                bio: "With over 15 years of experience in healthcare technology, Dr. Johnson leads our mission to transform digital health.",
                image: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
              },
              {
                name: "Michael Chen",
                title: "Chief Technology Officer",
                bio: "A pioneer in health informatics, Michael oversees all technical aspects of our platform and innovation initiatives.",
                image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
              },
              {
                name: "Dr. Amara Patel",
                title: "Medical Director",
                bio: "Board-certified physician ensuring all our health solutions meet the highest clinical standards and best practices.",
                image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
              }
            ].map((member, index) => (
              <Card key={index} className="overflow-hidden hover-scale card-hover">
                <div className="aspect-[3/2] w-full bg-gray-100 flex items-center justify-center">
                  {member.image ? (
                    <img 
                      src={member.image} 
                      alt={member.name} 
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <Users className="text-gray-400" size={60} />
                  )}
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-1">{member.name}</h3>
                  <p className="text-health-bright-blue font-medium mb-3">{member.title}</p>
                  <p className="text-gray-600 text-sm">{member.bio}</p>
                </div>
              </Card>
            ))}
          </div>
        </section>
        
        {/* CTA */}
        <section className="bg-gradient-to-r from-health-deep-blue to-health-bright-blue rounded-2xl p-10 text-white text-center mb-20">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience Better Healthcare?</h2>
          <p className="mb-8 max-w-2xl mx-auto">
            Join thousands of patients and providers who are already benefiting from our innovative platform.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Button size="lg" variant="secondary" asChild>
              <a href="/signup">Get Started</a>
            </Button>
            <Button size="lg" variant="outline" className="bg-transparent border-white hover:bg-white/10" asChild>
              <a href="/contact">Contact Us</a>
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
};

export default AboutUs;
