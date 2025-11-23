'use client';

import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useState } from 'react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: Add form submission logic here
    console.log('Form submitted:', formData);
    alert('Message sent! (This is a demo - actual submission not implemented yet)');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Contact Info Cards */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {/* Address */}
            <div className="text-center p-8 bg-white rounded-lg">
              <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="text-white" size={28} />
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Address</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                GBK Gate 3<br />
                Jakarta, Indonesia
              </p>
            </div>

            {/* Phone */}
            <div className="text-center p-8 bg-white rounded-lg">
              <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Phone className="text-white" size={28} />
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Phone Number</h3>
              <p className="text-gray-600 text-sm">+62 812-8489-0907</p>
            </div>

            {/* Email */}
            <div className="text-center p-8 bg-white rounded-lg">
              <div className="w-16 h-16 bg-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mail className="text-white" size={28} />
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Email</h3>
              <p className="text-gray-600 text-sm">admin@rollingchill.com</p>
            </div>

            {/* Business Hours */}
            <div className="text-center p-8 bg-white rounded-lg">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                <Clock className="text-white" size={28} />
              </div>
              <h3 className="text-lg font-bold mb-3 text-gray-900">Business Hours</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                Monday - Friday: 9:00 - 16:00<br />
                Saturday: 10:00 - 16:00
              </p>
            </div>
          </div>

          {/* Form and Map Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Send Message</h2>
              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Name and Email Row */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="name" className="block text-gray-900 text-sm font-medium mb-2">
                      Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                      placeholder="Name"
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-gray-900 text-sm font-medium mb-2">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                      placeholder="email@example.com"
                    />
                  </div>
                </div>

                {/* Subject */}
                <div>
                  <label htmlFor="subject" className="block text-gray-900 text-sm font-medium mb-2">
                    Subjek
                  </label>
                  <input
                    type="text"
                    id="subject"
                    name="subject"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-300"
                    placeholder="Subject"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-gray-900 text-sm font-medium mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    required
                    rows={6}
                    value={formData.message}
                    onChange={handleChange}
                    className="w-full px-4 py-3 bg-white border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-gray-300 resize-none"
                    placeholder="Write your message here..."
                  />
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  className="bg-gray-200 text-gray-400 px-8 py-3 rounded-md text-sm font-medium cursor-not-allowed"
                  disabled
                >
                  Send
                </button>
              </form>
            </div>

            {/* Google Maps */}
            <div className="h-full">
              <h2 className="text-3xl font-bold mb-6 text-gray-900">Our Location</h2>
              <div className="w-full h-[450px] rounded-lg overflow-hidden border border-gray-200 bg-gray-100 relative">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1983.16486125951!2d106.79998574584992!3d-6.220179375916008!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e69f12baecccdab%3A0x3fce59958e6b9ceb!2sGBK%20Pipel!5e0!3m2!1sen!2sid!4v1761413357557!5m2!1sen!2sid"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen={true}
                  loading="eager"
                  title="GBK Pipel Location Map"
                />
                {/* Fallback link in case iframe doesn't load */}
                <noscript>
                  <a 
                    href="https://www.google.com/maps/place/GBK+Pipel/@-6.2201794,106.7999857,17z" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="absolute inset-0 flex items-center justify-center bg-gray-100 text-blue-600 hover:text-blue-800"
                  >
                    Open in Google Maps
                  </a>
                </noscript>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
