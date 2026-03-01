import { PageHero } from '../components/PageHero';
import { FormInput } from '../components/FormInput';

export function Quote() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Thank you! We will send you a detailed quote within 24 hours.');
  };

  return (
    <>
      <PageHero
        title="Request Apparel Manufacturing Quote"
        subtitle="Get a detailed production quote tailored to your specific requirements"
        dark={false}
      />

      <section className="py-24 bg-white">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <div className="bg-gray-50 p-8 mb-12 border-l-4 border-gray-900">
              <h3 className="text-gray-900 mb-3" style={{ fontSize: '20px', fontWeight: 700 }}>
                What to Expect
              </h3>
              <ul className="space-y-2 text-gray-700" style={{ fontSize: '16px', lineHeight: 1.6 }}>
                <li className="flex items-start gap-2">
                  <span className="text-gray-900 mt-1">•</span>
                  <span>Detailed quote within 24 hours</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-900 mt-1">•</span>
                  <span>Free consultation with our manufacturing team</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-900 mt-1">•</span>
                  <span>Sample production options and timeline</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-gray-900 mt-1">•</span>
                  <span>Transparent pricing with no hidden costs</span>
                </li>
              </ul>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <FormInput
                  label="Full Name"
                  name="name"
                  placeholder="Your name"
                  required
                />

                <FormInput
                  label="Company Name"
                  name="company"
                  placeholder="Your company"
                  required
                />
              </div>

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

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="product-type" className="block text-gray-900 mb-2" style={{ fontSize: '15px', fontWeight: 600 }}>
                    Product Type <span className="text-red-500">*</span>
                  </label>
                  <select
                    id="product-type"
                    name="product-type"
                    required
                    className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-colors"
                    style={{ fontSize: '15px' }}
                  >
                    <option value="">Select product type</option>
                    <option value="tshirts">T-Shirts</option>
                    <option value="hoodies">Hoodies</option>
                    <option value="shirts">Shirts</option>
                    <option value="jackets">Jackets</option>
                    <option value="trackpants">Trackpants</option>
                    <option value="shorts">Shorts</option>
                    <option value="other">Other</option>
                  </select>
                </div>

                <FormInput
                  label="Quantity Required"
                  name="quantity"
                  type="number"
                  placeholder="e.g., 1000"
                  required
                />
              </div>

              <div>
                <label htmlFor="fabric-type" className="block text-gray-900 mb-2" style={{ fontSize: '15px', fontWeight: 600 }}>
                  Fabric Type
                </label>
                <select
                  id="fabric-type"
                  name="fabric-type"
                  className="w-full px-4 py-3 border border-gray-300 focus:border-gray-900 focus:outline-none focus:ring-1 focus:ring-gray-900 transition-colors"
                  style={{ fontSize: '15px' }}
                >
                  <option value="">Select fabric type (if known)</option>
                  <option value="cotton">100% Cotton</option>
                  <option value="polyester">Polyester</option>
                  <option value="blend">Cotton-Poly Blend</option>
                  <option value="fleece">Fleece</option>
                  <option value="linen">Linen</option>
                  <option value="other">Other / Not Sure</option>
                </select>
              </div>

              <FormInput
                label="Additional Details"
                name="message"
                textarea
                rows={6}
                placeholder="Tell us about your requirements: colors, sizes, printing/embroidery needs, timeline, etc."
                required
              />

              <div className="bg-gray-50 p-6 rounded-sm">
                <label className="flex items-start gap-3 cursor-pointer">
                  <input
                    type="checkbox"
                    required
                    className="mt-1 w-4 h-4 border-gray-300 rounded text-gray-900 focus:ring-gray-900"
                  />
                  <span className="text-gray-700" style={{ fontSize: '14px', lineHeight: 1.6 }}>
                    I agree to be contacted by Apparel Manufacturing team regarding my quote request. I understand that my information will be used in accordance with the privacy policy.
                  </span>
                </label>
              </div>

              <button
                type="submit"
                className="w-full md:w-auto bg-gray-900 text-white px-12 py-4 hover:bg-gray-800 transition-colors"
                style={{ fontSize: '16px', fontWeight: 600 }}
              >
                Get Production Quote
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-[1440px] mx-auto px-6 lg:px-12">
          <div className="max-w-4xl mx-auto">
            <h3 className="text-gray-900 text-center mb-8" style={{ fontSize: '28px', fontWeight: 700 }}>
              Why Choose Our Manufacturing Services?
            </h3>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="text-gray-900 mb-2" style={{ fontSize: '42px', fontWeight: 700 }}>15+</div>
                <div className="text-gray-600" style={{ fontSize: '16px' }}>Years Experience</div>
              </div>
              <div className="text-center">
                <div className="text-gray-900 mb-2" style={{ fontSize: '42px', fontWeight: 700 }}>50K+</div>
                <div className="text-gray-600" style={{ fontSize: '16px' }}>Monthly Capacity</div>
              </div>
              <div className="text-center">
                <div className="text-gray-900 mb-2" style={{ fontSize: '42px', fontWeight: 700 }}>500+</div>
                <div className="text-gray-600" style={{ fontSize: '16px' }}>Brands Served</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
