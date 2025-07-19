
import React from 'react';

const footerLinks = {
  'About Us': [
    { name: 'Our History', href: '#' },
    { name: 'Vision & Mission', href: '#' },
    { name: 'Leadership', href: '#' },
    { name: 'Accreditations & Rankings', href: '#' },
    { name: 'Campus Infrastructure', href: '#' },
    { name: 'Virtual Tour', href: '#' },
  ],
  'Academics': [
    { name: 'Engineering & Technology', href: '#' },
    { name: 'Management Studies', href: '#' },
    { name: 'Pharmacy', href: '#' },
    { name: 'Sciences', href: '#' },
    { name: 'Academic Calendar', href: '#' },
    { name: 'Faculty Directory', href: '#' },
    { name: 'Research Centers', href: '#' },
  ],
  'Admissions': [
    { name: 'Admission Process', href: '#' },
    { name: 'Fee Structure', href: '#' },
    { name: 'Scholarships', href: '#' },
    { name: 'Education Loans', href: '#' },
    { name: 'Apply Online', href: '#' },
    { name: 'FAQs', href: '#' },
    { name: 'International Students', href: '#' },
  ],
  'Student Life': [
    { name: 'Hostels & Dining', href: '#' },
    { name: 'Clubs & Societies', href: '#' },
    { name: 'Sports & Recreation', href: '#' },
    { name: 'Events Calendar', href: '#' },
    { name: 'Student Council', href: '#' },
    { name: 'Health & Wellness', href: '#' },
  ],
};

const Footer: React.FC = () => {
  return (
    <footer className="bg-gradient-to-br from-blue-900 to-blue-950 text-white">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Newsletter Subscription */}
        <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 lg:p-8 mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center">
            <div className="lg:col-span-2">
              <h2 className="text-2xl font-bold mb-2">Stay Connected with Vignan</h2>
              <p className="text-blue-100/80">
                Subscribe to our newsletter for the latest updates on events, admissions, and academic achievements.
              </p>
            </div>
            <div>
              <div className="flex flex-col sm:flex-row gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="px-4 py-3 rounded-lg bg-white/20 border border-white/30 text-white placeholder:text-blue-100/60 focus:outline-none focus:ring-2 focus:ring-white/50 flex-grow"
                />
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 whitespace-nowrap">
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          {/* About Section */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center space-x-2 mb-5">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center">
                 <span className="text-blue-900 font-bold text-2xl">V</span>
              </div>
              <span className="text-2xl font-bold text-white">VIGNAN</span>
            </a>
            <p className="text-blue-100/80 mb-6">
              Vignan College, located in Visakhapatnam, is committed to providing world-class education in engineering, management, pharmacy and sciences. With state-of-the-art facilities and distinguished faculty, we prepare students to be future-ready professionals.
            </p>

            <div className="mb-8">
              <div className="flex space-x-1 items-center text-blue-100/80 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <address className="not-italic">
                  Campus Road, Duvvada, Visakhapatnam, Andhra Pradesh - 530046
                </address>
              </div>
              <div className="flex space-x-1 items-center text-blue-100/80 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@vignan.edu" className="hover:text-white hover:underline">info@vignan.edu</a>
              </div>
              <div className="flex space-x-1 items-center text-blue-100/80">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+91-891-2567000" className="hover:text-white hover:underline">+91-891-2567000</a>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-white font-medium mb-3">Connect With Us</h4>
              <div className="flex space-x-4">
                {['facebook', 'twitter', 'linkedin', 'youtube', 'instagram'].map(platform => (
                  <a key={platform} href="#" className="w-10 h-10 rounded-full bg-white/10 hover:bg-blue-600 flex items-center justify-center transition-colors duration-300">
                    <span className="sr-only">{platform}</span>
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm0 22c-5.514 0-10-4.486-10-10s4.486-10 10-10 10 4.486 10 10-4.486 10-10 10z"/>
                    </svg>
                  </a>
                ))}
              </div>
            </div>
          </div>
          
          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-lg font-semibold text-white tracking-wider uppercase mb-5">{title}</h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-blue-100/80 hover:text-white hover:underline transition-colors duration-300 inline-block">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        <div className="mt-16 pt-8 border-t border-white/10 grid grid-cols-1 md:grid-cols-2 gap-y-6">
          <div className="text-blue-100/60 text-sm">
            <p>&copy; {new Date().getFullYear()} Vignan College Visakhapatnam. All Rights Reserved.</p>
          </div>
          <div className="md:text-right">
            <nav className="flex flex-wrap gap-x-6 gap-y-2 justify-start md:justify-end text-sm text-blue-100/60">
              <a href="#" className="hover:text-white hover:underline">Privacy Policy</a>
              <a href="#" className="hover:text-white hover:underline">Terms of Service</a>
              <a href="#" className="hover:text-white hover:underline">Cookie Policy</a>
              <a href="#" className="hover:text-white hover:underline">Sitemap</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
