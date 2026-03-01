import { PageHero } from '../components/PageHero';
import { FormInput } from '../components/FormInput';
import { Mail, MapPin, Phone } from 'lucide-react';

export function Contact() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
  };

  return (
    <>
      <PageHero
        title="Contact Apparel Manufacturer in Bangalore"
        subtitle="Get in touch with our team to discuss your manufacturing requirements"
        dark={false}
      />

      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <h2 className="text-gray-900 mb-6" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, lineHeight: 1.2 }}>
                Send Us a Message
              </h2>
              <p className="text-gray-600 mb-8" style={{ fontSize: '17px', lineHeight: 1.6 }}>
                Fill out the form below and our team will respond within 24 hours.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <FormInput
                  label="Full Name"
                  name="name"
                  placeholder="Your name"
                  required
                />

                <FormInput
                  label="Company Name"
                  name="company"
                  placeholder="Your company name"
                />

                <div className="grid md:grid-cols-2 gap-6">
                  <FormInput
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    placeholder="+91 XXXXX XXXXX"
                    required
                  />

                  <FormInput
                    label="Email Address"
                    name="email"
                    type="email"
                    placeholder="you@company.com"
                    required
                  />
                </div>

                <FormInput
                  label="Message"
                  name="message"
                  textarea
                  rows={6}
                  placeholder="Tell us about your requirements..."
                  required
                />

                <button
                  type="submit"
                  className="w-full md:w-auto bg-gray-900 text-white px-10 py-4 hover:bg-gray-800 transition-colors"
                  style={{ fontSize: '16px', fontWeight: 600 }}
                >
                  Send Message
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div>
              <h2 className="text-gray-900 mb-6" style={{ fontSize: 'clamp(1.75rem, 3vw, 2.25rem)', fontWeight: 700, lineHeight: 1.2 }}>
                Contact Information
              </h2>
              <p className="text-gray-600 mb-10" style={{ fontSize: '17px', lineHeight: 1.6 }}>
                Reach out to us directly through any of the following channels:
              </p>

              <div className="space-y-8 mb-12">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <Phone className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-gray-900 mb-1" style={{ fontSize: '16px', fontWeight: 600 }}>
                      Phone Number
                    </div>
                    <a href="tel:+919876543210" className="text-gray-600 hover:text-gray-900 transition-colors" style={{ fontSize: '17px' }}>
                      +91 98765 43210
                    </a>
                    <p className="text-gray-500 mt-1" style={{ fontSize: '14px' }}>
                      Monday - Saturday: 9:00 AM - 6:00 PM
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <Mail className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-gray-900 mb-1" style={{ fontSize: '16px', fontWeight: 600 }}>
                      Email Address
                    </div>
                    <a href="mailto:contact@apparelmfg.com" className="text-gray-600 hover:text-gray-900 transition-colors" style={{ fontSize: '17px' }}>
                      contact@apparelmfg.com
                    </a>
                    <p className="text-gray-500 mt-1" style={{ fontSize: '14px' }}>
                      We'll respond within 24 hours
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-gray-900 rounded-full flex items-center justify-center flex-shrink-0">
                    <MapPin className="text-white" size={20} />
                  </div>
                  <div>
                    <div className="text-gray-900 mb-1" style={{ fontSize: '16px', fontWeight: 600 }}>
                      Factory Address
                    </div>
                    <p className="text-gray-600" style={{ fontSize: '17px', lineHeight: 1.6 }}>
                      2nd Floor, Jalageramma, No 13<br />
                      Mariamma Temple Rd, Lottegollahalli<br />
                      Devinagar, Bengaluru, Karnataka 560094<br />
                      India
                    </p>
                  </div>
                </div>
              </div>

              {/* Google Maps Embed */}
              <div className="aspect-video bg-gray-200 rounded-sm overflow-hidden shadow-md">
                <iframe 
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31094.52455313618!2d77.5460981347656!3d13.047408599999994!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3d62de87f213%3A0xc7e1898b5896eb34!2sTAG%20UNLIMITED!5e0!3m2!1sen!2sin!4v1772317833150!5m2!1sen!2sin" 
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy" 
                  referrerPolicy="no-referrer-when-downgrade"
                  title="TAG UNLIMITED Factory Location"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}