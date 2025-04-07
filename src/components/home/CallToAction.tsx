
import React from 'react';
import { Button } from '@/components/ui/button';
import { Droplet, Search } from 'lucide-react';
import { Link } from 'react-router-dom';

const CallToAction = () => {
  return (
    <section className="py-20 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-bloodred to-medblue opacity-90 z-0"></div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center text-white mb-12">
          <h2 className="text-4xl font-bold mb-4">Ready to Make a Difference?</h2>
          <p className="text-xl max-w-2xl mx-auto opacity-90">
            Join thousands of donors who are saving lives every day. 
            Donate blood or find donors in your area.
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link to="/donate">
            <Button className="bg-white text-bloodred hover:bg-gray-100 text-lg px-8 py-6 rounded-full">
              <Droplet className="h-5 w-5 mr-2" />
              Donate Blood
            </Button>
          </Link>
          <Link to="/find">
            <Button variant="outline" className="bg-transparent border-white text-white hover:bg-white/10 text-lg px-8 py-6 rounded-full">
              <Search className="h-5 w-5 mr-2" />
              Find Blood
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
