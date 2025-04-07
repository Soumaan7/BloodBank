
import React from 'react';
import { ClipboardCheck, Clock, Droplet, Heart } from 'lucide-react';

const steps = [
  {
    icon: <ClipboardCheck className="h-10 w-10 text-medblue" />,
    title: 'Register',
    description: 'Create an account and complete your donor profile with relevant medical information.'
  },
  {
    icon: <Clock className="h-10 w-10 text-bloodred" />,
    title: 'Schedule',
    description: 'Book an appointment at a blood donation center near you at your convenient time.'
  },
  {
    icon: <Droplet className="h-10 w-10 text-medblue" />,
    title: 'Donate',
    description: 'Visit the center and donate blood. The process typically takes less than an hour.'
  },
  {
    icon: <Heart className="h-10 w-10 text-bloodred" />,
    title: 'Save Lives',
    description: 'Your donation can save up to three lives and make a significant difference.'
  }
];

const DonationProcess = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate mb-4">How Blood Donation Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Donating blood is a simple and straightforward process that can save lives. 
            Here's how it works:
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center bg-white p-8 rounded-xl shadow-sm z-10 relative hover:shadow-md transition-shadow duration-300">
                <div className="flex justify-center mb-4">{step.icon}</div>
                <h3 className="text-xl font-semibold text-slate mb-2">{step.title}</h3>
                <p className="text-gray-600">{step.description}</p>
              </div>
              
              {index < steps.length - 1 && (
                <div className="hidden lg:block absolute top-1/2 left-full w-8 h-0.5 bg-gray-300 transform -translate-y-1/2 z-0">
                  <div className="absolute right-0 top-1/2 transform translate-x-1/2 -translate-y-1/2 w-2 h-2 bg-bloodred rounded-full"></div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DonationProcess;
