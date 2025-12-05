import React from "react";
import { useNavigate } from "react-router-dom";
import { Award, TrendingUp,Shield,Zap, Brain ,Database,UserPlus} from 'lucide-react';
import { Button } from './components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';
import aiImage from './images/ai-in-finance-png.webp';


const Home: React.FC = () => {
  const navigate = useNavigate();
   const stats = [
    {
      icon: TrendingUp,
      value: '127%',
      label: 'Average ROI Increase',
      color: 'from-blue-500 to-blue-600',
    },
    {
      icon: Shield,
      value: 'Bank-Level',
      label: 'Security Standards',
      color: 'from-purple-500 to-purple-600',
    },
    {
      icon: Zap,
      value: '<1s',
      label: 'Real-Time Analytics',
      color: 'from-indigo-500 to-indigo-600',
    },
    {
      icon: Award,
      value: '#1',
      label: 'Fintech Platform 2024',
      color: 'from-violet-500 to-violet-600',
    },
  ];
   const steps = [
    {
      icon: UserPlus,
      title: 'Create Your Account',
      description: 'Sign up in minutes with our simple onboarding process. No credit card required to start.',
    },
    {
      icon: Database,
      title: 'Connect Your Data',
      description: 'Securely link your financial accounts using bank-level encryption and authentication.',
    },
    {
      icon: Brain,
      title: 'AI Analysis',
      description: 'Our advanced AI analyzes your financial data to understand patterns and opportunities.',
    },
    {
      icon: TrendingUp,
      title: 'Get Insights',
      description: 'Receive personalized recommendations and track your progress toward financial goals.',
    },
  ];

  return (
    <div>
      {/* Navbar */}
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl text-gray-900">FinAI</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-gray-700" onClick={()=>navigate("/login")}>
              Login
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white" onClick={()=>navigate("/register")}>
              Register
            </Button>
          </div>
        </div>
      </div>
    </nav>

      {/* Hero*/}
       <div className="pt-24 pb-16 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50 relative overflow-hidden">
      <div className="absolute inset-0 bg-grid-slate-100 [mask-image:linear-gradient(0deg,white,rgba(255,255,255,0.6))] -z-10" />
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-400/20 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl -z-10" />
      <div className="max-w-7xl mx-auto relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="text-left">
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full mb-6">
              <Sparkles className="w-4 h-4" />
              <span className="text-sm">AI-Powered Financial Intelligence</span>
            </div>
            
            <h1 className="text-5xl lg:text-6xl text-gray-900 mb-6">
              Smart Finance,{' '}
              <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Smarter Decisions
              </span>
            </h1>
            
            <p className="text-xl text-gray-600 mb-8 leading-relaxed">
              Harness the power of artificial intelligence to transform your financial management. 
              Get real-time insights, automated analytics, and personalized recommendations.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Button 
                size="lg" 
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
              >
                Get Started Free
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
              <Button 
                size="lg" 
                variant="outline"
                className="border-gray-300"
              >
                Watch Demo
              </Button>
            </div>
            
            <div className="flex items-center gap-8 mt-12">
              <div>
                <div className="text-3xl text-gray-900">$2.5B+</div>
                <div className="text-sm text-gray-500">Assets Managed</div>
              </div>
              <div className="w-px h-12 bg-gray-300" />
              <div>
                <div className="text-3xl text-gray-900">50K+</div>
                <div className="text-sm text-gray-500">Active Users</div>
              </div>
              <div className="w-px h-12 bg-gray-300" />
              <div>
                <div className="text-3xl text-gray-900">99.9%</div>
                <div className="text-sm text-gray-500">Uptime</div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-2xl blur-3xl opacity-20" />
            <img
              src={aiImage}
              alt="FinAI Dashboard"
              className="relative rounded-2xl shadow-2xl w-full"
            />
          </div>
        </div>
      </div>
    </div>
      {/* Stats */}
       <div className="py-16 bg-gradient-to-b from-white to-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className={`inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br ${stat.color} mb-4`}>
                <stat.icon className="w-8 h-8 text-white" />
              </div>
              <div className="text-3xl text-gray-900 mb-1">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
     {/* How It Works */}
      <div id="how-it-works" className="py-20 bg-gradient-to-b from-white via-indigo-50/30 to-white relative">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(99,102,241,0.05),transparent_50%)]" />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="text-center mb-16">
          <h2 className="text-4xl text-gray-900 mb-4">
            How FinAI Works
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Get started in four simple steps and transform your financial management
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="flex flex-col items-center text-center">
                <div className="relative">
                  <div className="w-20 h-20 rounded-full bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center mb-6">
                    <step.icon className="w-10 h-10 text-white" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl text-gray-900 mb-3">
                  {step.title}
                </h3>
                <p className="text-gray-600">
                  {step.description}
                </p>
              </div>
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-10 left-[60%] w-[80%] h-0.5 bg-gradient-to-r from-blue-300 to-purple-300" />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>

  {/* Footer */}
    <nav className="relative bg-white/80 backdrop-blur-md border-t border-gray-200 mt-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <div className="bg-gradient-to-br from-blue-600 to-purple-600 p-2 rounded-lg">
              <TrendingUp className="w-6 h-6 text-white" />
            </div>
            <span className="text-xl text-gray-900">FinAI</span>
          </div>

          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-600 hover:text-gray-900 transition-colors">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-600 hover:text-gray-900 transition-colors">
              How It Works
            </a>
            <a href="#pricing" className="text-gray-600 hover:text-gray-900 transition-colors">
              Pricing
            </a>
            <a href="#about" className="text-gray-600 hover:text-gray-900 transition-colors">
              About
            </a>
          </div>

          <div className="flex items-center gap-3">
            <Button variant="ghost" className="text-gray-700">
              Login
            </Button>
            <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white">
              Register
            </Button>
          </div>
        </div>
      </div>
    </nav>

    </div>
  );
};

export default Home;
