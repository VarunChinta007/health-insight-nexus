
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAppStore } from '@/store';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { toast } from 'sonner';
import { Eye, EyeOff, Github, Mail } from 'lucide-react';
import { Separator } from '@/components/ui/separator';
import { FcGoogle } from 'react-icons/fc';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [role, setRole] = useState<"patient" | "doctor">("patient");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  
  const { signup } = useAppStore();
  const navigate = useNavigate();

  const checkPasswordStrength = (password: string) => {
    let strength = 0;
    if (password.length > 7) strength += 1;
    if (password.match(/[A-Z]/)) strength += 1;
    if (password.match(/[0-9]/)) strength += 1;
    if (password.match(/[^A-Za-z0-9]/)) strength += 1;
    setPasswordStrength(strength);
  };

  const getPasswordStrengthLabel = () => {
    if (password.length === 0) return "";
    if (passwordStrength === 0) return "Very weak";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Medium";
    if (passwordStrength === 3) return "Strong";
    return "Very strong";
  };

  const getPasswordStrengthColor = () => {
    if (password.length === 0) return "bg-gray-200";
    if (passwordStrength === 0) return "bg-red-500";
    if (passwordStrength === 1) return "bg-orange-500";
    if (passwordStrength === 2) return "bg-yellow-500";
    if (passwordStrength === 3) return "bg-green-500";
    return "bg-green-600";
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newPassword = e.target.value;
    setPassword(newPassword);
    checkPasswordStrength(newPassword);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!name || !email || !password || !confirmPassword) {
      toast.error('Please fill in all fields');
      return;
    }
    
    if (password !== confirmPassword) {
      toast.error('Passwords do not match');
      return;
    }
    
    if (passwordStrength < 2) {
      toast.error('Please use a stronger password');
      return;
    }
    
    setLoading(true);
    
    try {
      // In a real app, we would make an API call here
      signup(name, email, password, role);
      toast.success('Account created successfully!');
      navigate('/dashboard');
    } catch (error) {
      toast.error('Failed to create account. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSocialSignup = (provider: string) => {
    setLoading(true);
    
    try {
      // In a real app, we would integrate with the provider's auth SDK
      toast.success(`Signup with ${provider} successful!`);
      signup('User from ' + provider, 'user@' + provider.toLowerCase() + '.com', 'social-signup-token', role);
      navigate('/dashboard');
    } catch (error) {
      toast.error(`Signup with ${provider} failed. Please try again.`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-60px)] flex items-center justify-center bg-signup-bg bg-cover py-10">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-lg animate-fade-in">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-health-deep-blue">Create Account</h2>
          <p className="mt-2 text-gray-600">Join Health Insight Nexus today</p>
        </div>
        
        <div className="flex flex-col gap-4">
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 h-12 border-2"
            onClick={() => handleSocialSignup('Google')}
            disabled={loading}
          >
            <FcGoogle size={20} />
            <span>Sign up with Google</span>
          </Button>
          
          <Button 
            variant="outline" 
            className="w-full flex items-center justify-center gap-2 h-12 border-2 bg-black text-white hover:bg-gray-800"
            onClick={() => handleSocialSignup('GitHub')}
            disabled={loading}
          >
            <Github size={20} />
            <span>Sign up with GitHub</span>
          </Button>
          
          <div className="relative my-2">
            <Separator />
            <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 bg-white px-2 text-xs text-gray-500">
              OR
            </span>
          </div>
        </div>
        
        <form className="space-y-4" onSubmit={handleSubmit}>
          <div>
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="input-field mt-1"
              placeholder="John Doe"
              required
            />
          </div>
          
          <div>
            <Label htmlFor="email">Email</Label>
            <div className="relative mt-1">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" size={18} />
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 input-field"
                placeholder="you@example.com"
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="password">Password</Label>
            <div className="relative mt-1">
              <Input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={handlePasswordChange}
                className="input-field pr-10"
                placeholder="Create a strong password"
                required
              />
              <button
                type="button"
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {password && (
              <div className="mt-2">
                <div className="flex justify-between items-center mb-1">
                  <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${getPasswordStrengthColor()} transition-all duration-300`}
                      style={{ width: `${(passwordStrength + 1) * 25}%` }}
                    ></div>
                  </div>
                  <span className="text-xs ml-2 min-w-16 text-right">{getPasswordStrengthLabel()}</span>
                </div>
                <p className="text-xs text-gray-500">
                  Use at least 8 characters with uppercase letters, numbers, and symbols
                </p>
              </div>
            )}
          </div>
          
          <div>
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type={showPassword ? 'text' : 'password'}
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="input-field mt-1"
              placeholder="Confirm your password"
              required
            />
            {password && confirmPassword && password !== confirmPassword && (
              <p className="text-xs text-red-500 mt-1">Passwords do not match</p>
            )}
          </div>
          
          <div>
            <Label htmlFor="role">I am a</Label>
            <Select
              value={role}
              onValueChange={(value) => setRole(value as "patient" | "doctor")}
            >
              <SelectTrigger className="w-full mt-1">
                <SelectValue placeholder="Select your role" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="patient">Patient</SelectItem>
                <SelectItem value="doctor">Healthcare Provider</SelectItem>
              </SelectContent>
            </Select>
          </div>
          
          <Button
            type="submit"
            className="w-full mt-6 bg-health-bright-blue hover:bg-health-deep-blue transition-colors h-12"
            disabled={loading}
          >
            {loading ? 'Creating Account...' : 'Create Account'}
          </Button>
          
          <div className="text-center text-sm">
            <span className="text-gray-600">Already have an account?</span>{' '}
            <Link to="/login" className="text-health-bright-blue hover:underline font-medium">
              Sign in
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
