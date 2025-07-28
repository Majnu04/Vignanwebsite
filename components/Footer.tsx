
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
    <footer id="Footer" className="bg-white text-slate-800">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-5 gap-8 sm:gap-10 lg:gap-12">
          {/* About Section */}
          <div className="lg:col-span-2">
            <a href="#" className="flex items-center space-x-2 mb-5">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center overflow-hidden">
                <img src="/images/Vignan_logo.png" alt="Vignan Logo" className="h-8 w-8 object-contain" />
              </div>
              <span className="text-2xl font-bold text-slate-800">VIGNAN</span>
            </a>
            <p className="text-slate-600 mb-6">
              Vignan College, located in Visakhapatnam, is committed to providing world-class education in engineering, management, pharmacy and sciences. With state-of-the-art facilities and distinguished faculty, we prepare students to be future-ready professionals.
            </p>

            <div className="mb-8">
              <div className="flex space-x-1 items-center text-slate-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <address className="not-italic">
                  Campus Road, Duvvada, Visakhapatnam, Andhra Pradesh - 530046
                </address>
              </div>
              <div className="flex space-x-1 items-center text-slate-600 mb-2">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:info@vignan.edu" className="hover:text-blue-600 hover:underline">info@vignan.edu</a>
              </div>
              <div className="flex space-x-1 items-center text-slate-600">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2 text-slate-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                <a href="tel:+91-891-2567000" className="hover:text-blue-600 hover:underline">+91-891-2567000</a>
              </div>
            </div>

            {/* Social Media */}
            <div>
              <h4 className="text-slate-800 font-medium mb-3">Connect With Us</h4>
              <div className="flex space-x-4">
                <a href="#" aria-label="Facebook" className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-500 flex items-center justify-center transition-colors duration-300">
                  <span className="sr-only">Facebook</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Twitter" className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-500 flex items-center justify-center transition-colors duration-300">
                  <span className="sr-only">Twitter</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21-.36.1-.74.15-1.13.15-.27 0-.54-.03-.8-.08.54 1.69 2.11 2.95 4 2.98-1.46 1.16-3.31 1.84-5.33 1.84-.34 0-.68-.02-1.02-.06C3.9 20.29 6.16 21 8.58 21c7.88 0 12.21-6.54 12.21-12.21 0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/>
                  </svg>
                </a>
                <a href="#" aria-label="LinkedIn" className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-500 flex items-center justify-center transition-colors duration-300">
                  <span className="sr-only">LinkedIn</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/>
                  </svg>
                </a>
                <a href="#" aria-label="YouTube" className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-500 flex items-center justify-center transition-colors duration-300">
                  <span className="sr-only">YouTube</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"/>
                  </svg>
                </a>
                <a href="#" aria-label="Instagram" className="w-10 h-10 rounded-full bg-slate-100 hover:bg-blue-600 hover:text-white text-slate-500 flex items-center justify-center transition-colors duration-300">
                  <span className="sr-only">Instagram</span>
                  <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.987.01-4.04.059-.977.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.88-.344 1.857-.047 1.053-.059 1.37-.059 4.04 0 2.67.01 2.988.059 4.04.045.977.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.88.3 1.857.344 1.054.047 1.37.059 4.04.059 2.67 0 2.987-.01 4.04-.059.977-.045 1.504-.207 1.857-.344.467-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.88.344-1.857.047-1.054.059-1.37.059-4.04 0-2.67-.01-2.987-.059-4.04-.045-.977-.207-1.504-.344-1.857a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.88-.3-1.857-.344-1.053-.047-1.37-.059-4.04-.059zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.469a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>
          
          {/* Links Sections */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="text-lg font-semibold text-blue-600 tracking-wider uppercase mb-3 sm:mb-5">{title}</h3>
              <ul className="space-y-2 sm:space-y-3">
                {links.map((link) => (
                  <li key={link.name}>
                    <a 
                      href={link.href} 
                      className="text-slate-600 hover:text-blue-600 hover:underline transition-colors duration-300 inline-block text-sm sm:text-base"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        
        {/* Back to Top Button */}
        <div className="flex justify-center mt-12 mb-8">
          <a 
            href="#" 
            onClick={(e) => {
              e.preventDefault();
              window.scrollTo({ top: 0, behavior: 'smooth' });
            }}
            className="inline-flex items-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full text-sm font-medium transition-colors duration-300"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
            </svg>
            Back to Top
          </a>
        </div>

        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-slate-200 grid grid-cols-1 md:grid-cols-2 gap-y-4 sm:gap-y-6">
          <div className="text-slate-500 text-xs sm:text-sm">
            <p>&copy; {new Date().getFullYear()} Vignan College Visakhapatnam. All Rights Reserved.</p>
          </div>
          <div className="md:text-right">
            <nav className="flex flex-wrap gap-x-4 sm:gap-x-6 gap-y-1 sm:gap-y-2 justify-start md:justify-end text-xs sm:text-sm text-slate-500">
              <a href="#" className="hover:text-blue-600 hover:underline">Privacy Policy</a>
              <a href="#" className="hover:text-blue-600 hover:underline">Terms of Service</a>
              <a href="#" className="hover:text-blue-600 hover:underline">Cookie Policy</a>
              <a href="#" className="hover:text-blue-600 hover:underline">Sitemap</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
