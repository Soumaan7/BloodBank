
import React from 'react';
import { Droplet, Search, Pill, Bell, Shield, Clock } from 'lucide-react';

const features = [
  {
    icon: <Droplet className="h-10 w-10 text-bloodred" />,
    title: 'Blood Donation',
    description: 'Register as a donor and schedule appointments to donate blood at your convenience.'
  },
  {
    icon: <Search className="h-10 w-10 text-medblue" />,
    title: 'Find Blood',
    description: 'Search for blood donors based on blood type, location, and availability.'
  },
  {
    icon: <Pill className="h-10 w-10 text-bloodred" />,
    title: 'Medicine Marketplace',
    description: 'Purchase essential medications directly through our platform.'
  },
  {
    icon: <Bell className="h-10 w-10 text-medblue" />,
    title: 'Blood Alerts',
    description: 'Receive notifications for urgent blood donation requests in your area.'
  },
  {
    icon: <Shield className="h-10 w-10 text-bloodred" />,
    title: 'Safe & Secure',
    description: 'All donations and transactions follow strict medical guidelines and privacy standards.'
  },
  {
    icon: <Clock className="h-10 w-10 text-medblue" />,
    title: 'Real-Time Updates',
    description: 'Get real-time updates on blood availability and donation status.'
  }
];

const Features = () => {
  return (
    <section className="py-16 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate mb-4">Our Services</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            BloodConnect provides a comprehensive platform for blood donation, finding blood donors, 
            and accessing essential medications.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <div key={index} className="service-card hover:translate-y-[-5px]">
              <div className="mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-slate mb-2">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
