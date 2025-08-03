// src/components/Footer.tsx

import React from 'react';
import { AnimatedElement } from './AnimatedElement';

// --- DATA for Footer Links (No changes) ---
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

// --- Icon Sub-Components (UPDATED for light-on-dark theme) ---
const LocationIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-slate-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg> );
const MailIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-slate-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg> );
const PhoneIcon = () => ( <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-3 text-slate-300 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg> );

// --- MAIN COMPONENT ---
const Footer: React.FC = () => {
  return (
    // UPDATED: Replaced gradient with a solid dark blue background to match the image
    <footer className="bg-[#1a3b5d]" style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* UPDATED: Reduced vertical padding for a tighter layout */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8">
        {/* UPDATED: Reduced gaps between columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10 lg:gap-x-8">
          
          {/* Column 1: Main Info, Contact, and Socials */}
          <div className="lg:col-span-4">
            <AnimatedElement animation="fade-in" className="block">
              <a href="#" className="flex items-center space-x-3 mb-5">
                <img src="/images/Vignan_logo.png" alt="Vignan Logo" className="h-12 w-12 object-contain" />
                <span className="text-2xl font-bold text-white">VIGNAN</span>
              </a>
            </AnimatedElement>
            {/* UPDATED: Reduced bottom margin */}
            <AnimatedElement animation="slide-up" delay={100} className="block">
              <p className="text-slate-200 leading-relaxed mb-6">
                Vignan College, located in Visakhapatnam, is committed to providing world-class education. We prepare students to be future-ready professionals.
              </p>
            </AnimatedElement>
            {/* UPDATED: Reduced bottom margin and space between items */}
            <AnimatedElement animation="slide-up" delay={200} className="block">
              <div className="space-y-3 text-slate-200 mb-6">
                <div className="flex items-start"><LocationIcon /><span>Campus Road, Duvvada, Visakhapatnam, AP - 530046</span></div>
                <div className="flex items-center"><MailIcon /><a href="mailto:info@vignan.edu" className="hover:text-white transition-colors">info@vignan.edu</a></div>
                <div className="flex items-center"><PhoneIcon /><a href="tel:+91-891-2567000" className="hover:text-white transition-colors">+91-891-2567000</a></div>
              </div>
            </AnimatedElement>
            {/* Social Media */}
            <AnimatedElement animation="slide-up" delay={300} className="block">
              <div className="flex space-x-2">
                <a href="#" aria-label="Facebook" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8V15H8v-3h2V9.5C10 7.57 11.57 6 13.5 6H16v3h-2c-.55 0-1 .45-1 1v2h3v3h-3v6.95c5.05-.5 9-4.76 9-9.95z"/></svg></a>
                <a href="#" aria-label="Twitter" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M22.46 6c-.77.35-1.6.58-2.46.69.88-.53 1.56-1.37 1.88-2.38-.83.5-1.75.85-2.72 1.05C18.37 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98-3.56-.18-6.73-1.89-8.84-4.48-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.2-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21-.36.1-.74.15-1.13.15-.27 0-.54-.03-.8-.08.54 1.69 2.11 2.95 4 2.98-1.46 1.16-3.31 1.84-5.33 1.84-.34 0-.68-.02-1.02-.06C3.9 20.29 6.16 21 8.58 21c7.88 0 12.21-6.54 12.21-12.21 0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.14-2.23z"/></svg></a>
                <a href="#" aria-label="LinkedIn" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M19 3a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h14m-.5 15.5v-5.3a3.26 3.26 0 0 0-3.26-3.26c-.85 0-1.84.52-2.32 1.3v-1.11h-2.79v8.37h2.79v-4.93c0-.77.62-1.4 1.39-1.4a1.4 1.4 0 0 1 1.4 1.4v4.93h2.79M6.88 8.56a1.68 1.68 0 0 0 1.68-1.68c0-.93-.75-1.69-1.68-1.69a1.69 1.69 0 0 0-1.69 1.69c0 .93.76 1.68 1.69 1.68m1.39 9.94v-8.37H5.5v8.37h2.77z"/></svg></a>
                <a href="#" aria-label="YouTube" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M21.543 6.498C22 8.28 22 12 22 12s0 3.72-.457 5.502c-.254.985-.997 1.76-1.938 2.022C17.896 20 12 20 12 20s-5.893 0-7.605-.476c-.945-.266-1.687-1.04-1.938-2.022C2 15.72 2 12 2 12s0-3.72.457-5.502c.254-.985.997-1.76 1.938-2.022C6.107 4 12 4 12 4s5.896 0 7.605.476c.945.266 1.687 1.04 1.938 2.022zM10 15.5l6-3.5-6-3.5v7z"/></svg></a>
                <a href="#" aria-label="Instagram" className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-colors"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2c2.717 0 3.056.01 4.122.06 1.065.05 1.79.217 2.428.465.66.254 1.216.598 1.772 1.153a4.908 4.908 0 0 1 1.153 1.772c.247.637.415 1.363.465 2.428.047 1.066.06 1.405.06 4.122 0 2.717-.01 3.056-.06 4.122-.05 1.065-.218 1.79-.465 2.428a4.883 4.883 0 0 1-1.153 1.772 4.915 4.915 0 0 1-1.772 1.153c-.637.247-1.363.415-2.428.465-1.066.047-1.405.06-4.122.06-2.717 0-3.056-.01-4.122-.06-1.065-.05-1.79-.218-2.428-.465a4.89 4.89 0 0 1-1.772-1.153 4.904 4.904 0 0 1-1.153-1.772c-.248-.637-.415-1.363-.465-2.428C2.013 15.056 2 14.717 2 12c0-2.717.01-3.056.06-4.122.05-1.066.217-1.79.465-2.428a4.88 4.88 0 0 1 1.153-1.772A4.897 4.897 0 0 1 5.45 2.525c.638-.248 1.362-.415 2.428-.465C8.944 2.013 9.283 2 12 2zm0 1.802c-2.67 0-2.987.01-4.04.059-.977.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.88-.344 1.857-.047 1.053-.059 1.37-.059 4.04 0 2.67.01 2.988.059 4.04.045.977.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.88.3 1.857.344 1.054.047 1.37.059 4.04.059 2.67 0 2.987-.01 4.04-.059.977-.045 1.504-.207 1.857-.344.467.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.88.344-1.857.047-1.054.059-1.37.059-4.04 0-2.67-.01-2.987-.059-4.04-.045-.977-.207-1.504-.344-1.857a3.097 3.097 0 0 0-.748-1.15 3.098 3.098 0 0 0-1.15-.748c-.353-.137-.88-.3-1.857-.344-1.053-.047-1.37-.059-4.04-.059zm0 3.063a5.135 5.135 0 1 1 0 10.27 5.135 5.135 0 0 1 0-10.27zm0 8.468a3.333 3.333 0 1 0 0-6.666 3.333 3.333 0 0 0 0 6.666zm6.538-8.469a1.2 1.2 0 1 1-2.4 0 1.2 1.2 0 0 1 2.4 0z"/></svg></a>
              </div>
            </AnimatedElement>
          </div>
          
          <div className="lg:col-span-1"></div>

          {/* Links Sections */}
          <div className="lg:col-span-7 grid grid-cols-2 md:grid-cols-4 gap-8">
            {Object.entries(footerLinks).map(([title, links], index) => (
              <AnimatedElement key={title} animation="slide-up" delay={300 + index * 100} className="h-full">
                <div>
                  {/* UPDATED: Title styling to match image */}
                  <h3 className="font-bold text-sm text-white tracking-wider uppercase mb-4">{title}</h3>
                  {/* UPDATED: Reduced space between links */}
                  <ul className="space-y-3">
                    {links.map((link) => (
                      <li key={link.name}>
                        <a href={link.href} className="text-slate-300 hover:text-white transition-colors text-sm">
                          {link.name}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </AnimatedElement>
            ))}
          </div>
        </div>

        {/* Bottom Bar */}
        {/* UPDATED: Reduced top margin/padding for a tighter layout */}
        <div className="border-t border-white/10 pt-6 mt-12">
          <div className="flex flex-col md:flex-row justify-between items-center text-sm text-slate-300">
            <p className="text-center md:text-left mb-4 md:mb-0">© {new Date().getFullYear()} Vignan College Visakhapatnam. All Rights Reserved.</p>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 justify-center">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Sitemap</a>
            </nav>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;