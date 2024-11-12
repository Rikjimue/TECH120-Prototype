import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react';

const Contact: React.FC = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { name, email, message });
  };

  return (
    <div className="container mx-auto p-4 sm:p-6 md:p-8 lg:p-12">
      <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl shadow-xl overflow-hidden border border-gray-200 rounded-lg">
          <div className="flex flex-col md:flex-row">

            {/* Contact Information Section */}
            <div className="md:w-1/2 bg-black p-6 sm:p-8 md:p-10 lg:p-12 text-white">
              <h2 className="text-white text-xl xs:text-lg sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6">Get in Touch</h2>
              <div className="space-y-3 xs:space-y-2 sm:space-y-4">
                <div className="flex items-center space-x-3 xs:space-x-2 sm:space-x-4">
                  <Mail className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                  <span className="text-sm xs:text-xs sm:text-base md:text-lg">support@databreachchecker.com</span>
                </div>
                <div className="flex items-center space-x-3 xs:space-x-2 sm:space-x-4">
                  <Phone className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                  <span className="text-sm xs:text-xs sm:text-base md:text-lg">+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-3 xs:space-x-2 sm:space-x-4">
                  <MapPin className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                  <span className="text-sm xs:text-xs sm:text-base md:text-lg">123 Security Street, Cybertown, CT 00000</span>
                </div>
              </div>
              <div className="mt-6 sm:mt-8">
                <h3 className="text-white text-lg xs:text-sm sm:text-xl lg:text-2xl font-semibold mb-2 sm:mb-4">Business Hours</h3>
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 xs:space-x-2 sm:space-x-4">
                    <Clock className="h-5 w-5 sm:h-6 sm:w-6 text-gray-400" />
                    <span className="text-sm xs:text-xs sm:text-base md:text-lg">Monday - Friday: 9AM - 5PM</span>
                  </div>
                  <div className="pl-8 xs:pl-6 sm:pl-10 text-sm xs:text-xs sm:text-base md:text-lg">
                    <span>Saturday: 10AM - 2PM</span>
                  </div>
                  <div className="pl-8 xs:pl-6 sm:pl-10 text-sm xs:text-xs sm:text-base md:text-lg">
                    <span>Sunday: Closed</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form Section */}
            <CardContent className="md:w-1/2 p-6 sm:p-8 md:p-10 lg:p-12 bg-white">
              <h2 className="text-xl xs:text-lg sm:text-2xl lg:text-3xl font-bold mb-4 sm:mb-6 text-black">Send Us a Message</h2>
              <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
                <div>
                  <Label htmlFor="name" className="text-sm xs:text-xs font-medium text-gray-700">Name</Label>
                  <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="mt-1 text-sm xs:text-xs sm:text-base"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="email" className="text-sm xs:text-xs font-medium text-gray-700">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="mt-1 text-sm xs:text-xs sm:text-base"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="message" className="text-sm xs:text-xs font-medium text-gray-700">Message</Label>
                  <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message"
                    className="mt-1 text-sm xs:text-xs sm:text-base"
                    rows={4}
                    required
                  />
                </div>
                <Button type="submit" className="w-full bg-black hover:bg-gray-800 text-white">
                  <Send className="mr-2 h-4 w-4" /> Send Message
                </Button>
              </form>
            </CardContent>

          </div>
        </Card>
      </div>
    </div>
  );
};

export default Contact;
