
import React from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Heart, 
  Brain, 
  Apple, 
  Dumbbell, 
  Moon, 
  Clock, 
  Thermometer,
  Pill,
  Droplets,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';

const HealthTips = () => {
  const categories = [
    { name: "Heart Health", icon: Heart, color: "text-health-red" },
    { name: "Mental Wellness", icon: Brain, color: "text-health-deep-blue" },
    { name: "Nutrition", icon: Apple, color: "text-health-lime" },
    { name: "Fitness", icon: Dumbbell, color: "text-health-orange" },
    { name: "Sleep", icon: Moon, color: "text-health-bright-blue" },
    { name: "Preventive Care", icon: Thermometer, color: "text-health-teal" }
  ];

  const tips = [
    {
      title: "Understanding Blood Pressure Readings",
      category: "Heart Health",
      content: "Blood pressure is recorded as two numbers: Systolic (the higher number) measures pressure when your heart beats, while diastolic (the lower number) measures pressure when your heart rests between beats. A normal reading is less than 120/80 mm Hg.",
      icon: Heart,
      color: "text-health-red",
      bgColor: "bg-health-red/10"
    },
    {
      title: "5-Minute Mindfulness Practice",
      category: "Mental Wellness",
      content: "Take 5 minutes each day to focus on your breath. Sit comfortably, close your eyes, and pay attention to the sensation of breathing. When your mind wanders, gently bring your focus back to your breath.",
      icon: Brain,
      color: "text-health-deep-blue",
      bgColor: "bg-health-deep-blue/10"
    },
    {
      title: "Balanced Plate Method",
      category: "Nutrition",
      content: "Fill half your plate with fruits and vegetables, one quarter with lean protein, and one quarter with whole grains. This simple approach ensures you get a good balance of nutrients at every meal.",
      icon: Apple,
      color: "text-health-lime",
      bgColor: "bg-health-lime/10"
    },
    {
      title: "Importance of Strength Training",
      category: "Fitness",
      content: "Incorporate strength training at least twice a week. It helps maintain muscle mass, boost metabolism, improve bone density, and reduce the risk of injury as you age.",
      icon: Dumbbell,
      color: "text-health-orange",
      bgColor: "bg-health-orange/10"
    },
    {
      title: "Creating a Sleep-Friendly Environment",
      category: "Sleep",
      content: "Keep your bedroom dark, quiet, and cool (around 65°F or 18°C). Remove electronic devices and use comfortable bedding to create an optimal sleep environment.",
      icon: Moon,
      color: "text-health-bright-blue",
      bgColor: "bg-health-bright-blue/10"
    },
    {
      title: "Regular Health Screenings",
      category: "Preventive Care",
      content: "Schedule regular check-ups and age-appropriate screenings with your healthcare provider. Early detection is key for many conditions and increases treatment success rates.",
      icon: Thermometer,
      color: "text-health-teal",
      bgColor: "bg-health-teal/10"
    },
    {
      title: "Medication Adherence Tips",
      category: "Preventive Care",
      content: "Take medications as prescribed, use pill organizers, set reminders, and keep a medication list. Always consult your doctor before changing your medication routine.",
      icon: Pill,
      color: "text-health-teal",
      bgColor: "bg-health-teal/10"
    },
    {
      title: "Staying Hydrated",
      category: "Nutrition",
      content: "Drink water throughout the day. A good rule of thumb is to drink when you're thirsty and enough so your urine is light yellow or clear. Most adults need about 8 cups daily.",
      icon: Droplets,
      color: "text-health-lime",
      bgColor: "bg-health-lime/10"
    }
  ];

  const handleDownloadTip = (tipTitle: string) => {
    // In a real app, this would generate a PDF or other document
    toast.success(`Downloading "${tipTitle}" as PDF...`);
    // Simulate download delay
    setTimeout(() => {
      toast.info("Download complete! Check your downloads folder.");
    }, 2000);
  };

  const handleShareTip = (tipTitle: string) => {
    // In a real app, this would open share options
    navigator.clipboard.writeText(`Health Insight Nexus Tip: ${tipTitle}`);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-[calc(100vh-60px)] py-10">
      <div className="container mx-auto px-4">
        {/* Hero Section */}
        <section className="mb-16 text-center">
          <div className="animate-fade-in max-w-3xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold text-health-deep-blue mb-4">Health Tips & Resources</h1>
            <p className="text-xl text-gray-600">
              Expert advice and practical tips to help you maintain optimal health and wellness.
            </p>
          </div>
        </section>

        {/* Categories */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-health-deep-blue mb-6">Browse by Category</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
            {categories.map((category, index) => (
              <Card key={index} className="hover:shadow-md transition-shadow cursor-pointer hover-scale">
                <CardContent className="p-6 flex flex-col items-center justify-center text-center">
                  <category.icon className={`${category.color} mb-3`} size={28} />
                  <h3 className="font-medium">{category.name}</h3>
                </CardContent>
              </Card>
            ))}
          </div>
        </section>

        {/* Featured Tips */}
        <section className="mb-16">
          <h2 className="text-2xl font-bold text-health-deep-blue mb-6">Featured Health Tips</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {tips.map((tip, index) => (
              <Card key={index} className="overflow-hidden hover-scale card-hover">
                <CardHeader className={`${tip.bgColor} flex flex-row items-center gap-3`}>
                  <div className="h-10 w-10 rounded-full bg-white flex items-center justify-center">
                    <tip.icon className={tip.color} size={20} />
                  </div>
                  <div>
                    <CardTitle className="text-lg">{tip.title}</CardTitle>
                    <CardDescription>{tip.category}</CardDescription>
                  </div>
                </CardHeader>
                <CardContent className="p-6">
                  <p className="text-gray-600">{tip.content}</p>
                </CardContent>
                <CardFooter className="flex justify-between border-t p-4">
                  <Button 
                    variant="ghost" 
                    size="sm"
                    onClick={() => handleDownloadTip(tip.title)}
                  >
                    Download PDF
                  </Button>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={() => handleShareTip(tip.title)}
                  >
                    Share
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <section className="mb-16">
          <Card className="bg-gradient-to-br from-health-deep-blue to-health-bright-blue text-white overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="p-8">
                <h2 className="text-3xl font-bold mb-4">Stay Updated</h2>
                <p className="mb-6">
                  Subscribe to our newsletter to receive the latest health tips, research updates, and resources directly in your inbox.
                </p>
                <div className="flex max-w-md">
                  <input 
                    type="email" 
                    placeholder="Enter your email" 
                    className="flex-1 px-4 py-2 rounded-l-md text-gray-800 focus:outline-none"
                  />
                  <Button className="rounded-l-none bg-white text-health-deep-blue hover:bg-gray-100">
                    Subscribe
                  </Button>
                </div>
                <p className="mt-3 text-sm opacity-80">
                  We respect your privacy. Unsubscribe at any time.
                </p>
              </div>
              <div className="hidden md:flex items-center justify-center bg-white/10 backdrop-blur-sm p-8">
                <Clock size={120} className="text-white/80" />
              </div>
            </div>
          </Card>
        </section>

        {/* Additional Resources */}
        <section>
          <h2 className="text-2xl font-bold text-health-deep-blue mb-6">Additional Resources</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <Card className="hover-scale card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Health Calculators</h3>
                <p className="text-gray-600 mb-4">BMI, calorie needs, heart disease risk, and more.</p>
                <Button variant="ghost" className="flex items-center gap-2">
                  <span>Use Calculators</span>
                  <ChevronRight size={16} />
                </Button>
              </CardContent>
            </Card>
            <Card className="hover-scale card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Video Library</h3>
                <p className="text-gray-600 mb-4">Exercise demos, cooking tutorials, and expert interviews.</p>
                <Button variant="ghost" className="flex items-center gap-2">
                  <span>Browse Videos</span>
                  <ChevronRight size={16} />
                </Button>
              </CardContent>
            </Card>
            <Card className="hover-scale card-hover">
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-2">Symptom Checker</h3>
                <p className="text-gray-600 mb-4">Understand possible causes of symptoms and next steps.</p>
                <Button variant="ghost" className="flex items-center gap-2">
                  <span>Check Symptoms</span>
                  <ChevronRight size={16} />
                </Button>
              </CardContent>
            </Card>
          </div>
        </section>
      </div>
    </div>
  );
};

export default HealthTips;
