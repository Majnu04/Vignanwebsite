import React from 'react';

// A more professional and organized data structure
const contactData = {
  name: 'Dr. B. Prasad',
  position: 'Dean - Training & Placements, Internships',
  mobile: '9866399942',
  email: 'dean_tp@vignaniit.edu.in',
};

const bgvContact = {
  email: 'vignaniit@yahoo.com',
};

const ContactT: React.FC = () => {
  return (
    <div className="p-3 bg-gray-100 min-h-screen">
      <div className="bg-white p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold mb-1 text-blue-700">
          Contact Information
        </h2>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead className="bg-gray-50">
              <tr>
                <th className="py-1 px-4 border-b text-left">Name</th>
                <th className="py-1 px-4 border-b text-left">Position</th>
                <th className="py-1 px-4 border-b text-left">Mobile Number</th>
                <th className="py-1 px-4 border-b text-left">Email</th>
              </tr>
            </thead>
            <tbody>
              <tr className="hover:bg-gray-50">
                <td className="py-1 px-4 border-b">{contactData.name}</td>
                <td className="py-1 px-4 border-b">{contactData.position}</td>
                <td className="py-1 px-4 border-b">
                  <a href={`tel:${contactData.mobile}`} className="flex items-center text-blue-600 hover:underline">
                    {/* Phone icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    {contactData.mobile}
                  </a>
                </td>
                <td className="py-1 px-4 border-b">
                  <a href={`mailto:${contactData.email}`} className="flex items-center text-blue-600 hover:underline">
                    {/* Email icon */}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    {contactData.email}
                  </a>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className="mt-2 p-2 border-l-4 border-blue-600 bg-yellow-50">
          <p>
            <strong>Note:</strong> For Background Verifications (BGVs), please send a request email to{' '}
            <a href={`mailto:${bgvContact.email}`} className="text-blue-600 hover:underline">
              {bgvContact.email}
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContactT;