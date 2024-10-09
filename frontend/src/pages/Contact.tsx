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
    // Handle form submission logic here
    console.log('Form submitted:', { name, email, message });
  };

  return (
    <div className="container mx-auto p-1">
        <div className="min-h-screen bg-white flex items-center justify-center p-4">
        <Card className="w-full max-w-4xl shadow-xl overflow-hidden border border-gray-200">
            <div className="flex flex-col md:flex-row">
            <div className="md:w-1/2 bg-black p-8 text-white">
                <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
                <div className="space-y-4">
                <div className="flex items-center space-x-4">
                    <Mail className="h-6 w-6 text-gray-400" />
                    <span>support@databreachchecker.com</span>
                </div>
                <div className="flex items-center space-x-4">
                    <Phone className="h-6 w-6 text-gray-400" />
                    <span>+1 (555) 123-4567</span>
                </div>
                <div className="flex items-center space-x-4">
                    <MapPin className="h-6 w-6 text-gray-400" />
                    <span>123 Security Street, Cybertown, CT 00000</span>
                </div>
                </div>
                <div className="mt-8">
                <h3 className="text-xl font-semibold mb-4">Business Hours</h3>
                <div className="space-y-2">
                    <div className="flex items-center space-x-4">
                    <Clock className="h-6 w-6 text-gray-400" />
                    <span>Monday - Friday: 9AM - 5PM</span>
                    </div>
                    <div className="pl-10">
                    <span>Saturday: 10AM - 2PM</span>
                    </div>
                    <div className="pl-10">
                    <span>Sunday: Closed</span>
                    </div>
                </div>
                </div>
            </div>
            <CardContent className="md:w-1/2 p-8 bg-white">
                <h2 className="text-2xl font-bold mb-6 text-black">Send Us a Message</h2>
                <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <Label htmlFor="name" className="text-sm font-medium text-gray-700">Name</Label>
                    <Input
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="mt-1"
                    required
                    />
                </div>
                <div>
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">Email</Label>
                    <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email"
                    className="mt-1"
                    required
                    />
                </div>
                <div>
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700">Message</Label>
                    <Textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Your message"
                    className="mt-1"
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