
import React from 'react';
import { Quote } from 'lucide-react';

const testimonials = [
  {
    content: "Donating blood through BloodConnect was incredibly easy. The platform made scheduling simple, and I felt great knowing my donation helped save lives.",
    author: "Sarah Johnson",
    role: "Regular Donor"
  },
  {
    content: "When my father needed urgent blood transfusion, BloodConnect helped us find donors quickly. The real-time updates feature was a lifesaver.",
    author: "Michael Chen",
    role: "Blood Recipient Family"
  },
  {
    content: "As someone with a rare blood type, I was worried about finding donors. BloodConnect connected me with compatible donors within hours.",
    author: "Emma Rodriguez",
    role: "Patient"
  }
];

const Testimonials = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-slate mb-4">What People Say</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Hear from donors and recipients who have used our platform to save lives.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-50 p-8 rounded-xl shadow-sm relative">
              <Quote className="absolute top-4 right-4 h-8 w-8 text-bloodred/20" />
              <p className="text-gray-600 mb-6 italic">{testimonial.content}</p>
              <div className="flex items-center">
                <div className="bg-medblue/20 h-12 w-12 rounded-full flex items-center justify-center mr-4">
                  <span className="text-medblue font-bold">
                    {testimonial.author.charAt(0)}
                  </span>
                </div>
                <div>
                  <h4 className="font-semibold text-slate">{testimonial.author}</h4>
                  <p className="text-sm text-gray-500">{testimonial.role}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
