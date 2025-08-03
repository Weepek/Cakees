 

import { MapPin, Phone } from 'lucide-react';

export default function Contact() {
  return (
    <section id="contact" className="py-20 bg-pink-100 contact">
      <div className="container mx-auto px-6" >
        <h2 className="text-3xl font-script text-center text-pink-500 mb-12">Get In Touch</h2>
        
        <div className="flex flex-col sm:flex-row gap-12  order">
          <div className="flex-1 w-full  ">
            <form className="space-y-4 w-full sm:order-2">
              <input 
                type="text" 
                placeholder="Name" 
                className="w-full px-4 py-3 rounded-lg bg-white"
              />
              <input 
                type="tel" 
                placeholder="Contact No" 
                className="w-full px-4 py-3 rounded-lg bg-white"
              />
              <input 
                type="email" 
                placeholder="Mail ID" 
                className="w-full px-4 py-3 rounded-lg bg-white"
              />
              <textarea 
                placeholder="Message" 
                rows={4}
                className="w-full px-4 py-3 rounded-lg bg-white"
              />
              <button className="w-full bg-pink-500 text-white py-3 rounded-lg hover:bg-pink-600 transition-colors">
                Submit
              </button>
            </form>
          </div>
          
          <div className="flex-1 w-full  sm:order-1 bg-pink-500 rounded-lg p-8 text-white">
            <h3 className="text-2xl font-script mb-6 text-center ">Contact</h3>
            <div className="space-y-4">
              <div className="flex justify-center items-center gap-3">
                <MapPin className="h-5 w-5" />
                <p>789 A Street,<br />Miami, FL 33101</p>
              </div>
              <div className="flex justify-center items-center gap-3">
                <Phone className="h-5 w-5" />
                <p>+1 (555) 123-4567</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
