
import React from 'react';
import { Button } from '@/components/ui/button';
import { Droplet, Search, MedicalCross } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  return (
    <div className="relative overflow-hidden bg-white">
      <div className="absolute inset-0 z-0 bg-gradient-to-br from-bloodred/10 to-medblue/10"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-28 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-12">
          <div className="lg:w-1/2">
            <h1 className="text-4xl md:text-5xl font-bold text-slate tracking-tight mb-6">
              Save Lives with <span className="text-bloodred">Blood Donation</span>
            </h1>
            <p className="text-lg text-gray-600 mb-8">
              Join our community to donate blood, find donors, and access essential medications.
              Your donation can save up to three lives!
            </p>
            <div className="flex flex-wrap gap-4">
              <Link to="/donate">
                <Button className="bg-bloodred hover:bg-bloodred/90 text-lg px-8 py-6 rounded-full">
                  <Droplet className="h-5 w-5 mr-2" />
                  Donate Blood
                </Button>
              </Link>
              <Link to="/find">
                <Button variant="outline" className="text-lg px-8 py-6 rounded-full">
                  <Search className="h-5 w-5 mr-2" />
                  Find Blood
                </Button>
              </Link>
            </div>
          </div>
          <div className="lg:w-1/2 flex justify-center">
            <div className="relative">
              <div className="absolute -inset-0.5 bg-gradient-to-r from-bloodred to-medblue rounded-full blur opacity-30 animate-pulse"></div>
              <img 
                src="https://images.unsplash.com/photo-1615461066841-6116e61058f4?q=80&w=1000&auto=format&fit=crop" 
                alt="Blood Donation" 
                className="relative rounded-full w-96 h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
