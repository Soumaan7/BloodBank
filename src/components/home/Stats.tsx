
import React from 'react';
import { Droplet, Users, Truck } from 'lucide-react';

const stats = [
  {
    icon: <Droplet className="h-10 w-10 text-bloodred" />,
    value: '10,000+',
    label: 'Blood Donations'
  },
  {
    icon: <Users className="h-10 w-10 text-medblue" />,
    value: '5,000+',
    label: 'Registered Donors'
  },
  {
    icon: <Truck className="h-10 w-10 text-bloodred" />,
    value: '15,000+',
    label: 'Medicine Deliveries'
  }
];

const Stats = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center p-8 border rounded-xl shadow-sm hover:shadow-md transition-shadow duration-300">
              <div className="flex justify-center mb-4">{stat.icon}</div>
              <h3 className="text-4xl font-bold text-slate mb-2">{stat.value}</h3>
              <p className="text-gray-600">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Stats;
