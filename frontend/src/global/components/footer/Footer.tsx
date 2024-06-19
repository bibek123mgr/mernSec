import React from "react";
import { Link } from "react-router-dom";

const Footer: React.FC = () => {
  const resourcesLinks = [
    { to: "/#", label: "Documentation" },
    { to: "/#", label: "Tutorials" },
    { to: "/#", label: "Support", new: true },
  ];

  const supportLinks = [
    { to: "/#", label: "Help Center" },
    { to: "/#", label: "Privacy Policy" },
    { to: "/#", label: "Conditions" },
  ];

  const contactLinks = [
    { to: "/#", label: "XXX XXXX, Floor 4 San Francisco, CA" },
    { to: "/#", label: "contact@company.com" },
  ];

  const socialLinks = [
    {
      to: "/#",
      svgPath: <i className="fa-brands fa-facebook"></i>,
    },
    {
      to: "/#",
      svgPath: <i className="fa-brands fa-google"></i>,
    },
    {
      to: "/#",
      svgPath: <i className="fa-brands fa-x-twitter"></i>,
    },
  ];

  return (
    <div>
      <div className="bg-gray-100">
        <div className="max-w-screen-lg px-4 sm:px-6 text-gray-800 sm:grid md:grid-cols-4 sm:grid-cols-2 mx-auto">
          <div className="p-5">
            <h3 className="font-bold text-xl text-indigo-600">Company Name</h3>
          </div>
          <div className="p-5">
            <div className="text-sm uppercase text-indigo-600 font-bold">
              Resources
            </div>
            {resourcesLinks.map((link, index) => (
              <Link key={index} className="my-3 block" to={link.to}>
                {link.label}
                {link.new && (
                  <span className="text-teal-600 text-xs p-1">New</span>
                )}
              </Link>
            ))}
          </div>
          <div className="p-5">
            <div className="text-sm uppercase text-indigo-600 font-bold">
              Support
            </div>
            {supportLinks.map((link, index) => (
              <Link key={index} className="my-3 block" to={link.to}>
                {link.label}
              </Link>
            ))}
          </div>
          <div className="p-5">
            <div className="text-sm uppercase text-indigo-600 font-bold">
              Contact us
            </div>
            {contactLinks.map((link, index) => (
              <Link key={index} className="my-3 block" to={link.to}>
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      <div className="bg-gray-100 pt-2">
        <div
          className="flex pb-5 px-3 m-auto pt-5 border-t text-gray-800 text-sm flex-col
      max-w-screen-lg items-center"
        >
          <div className="md:flex-auto md:flex-row-reverse mt-2 flex-row flex">
            {socialLinks.map((link, index) => (
              <Link key={index} to={link.to} className="w-6 mx-1">
                {link.svgPath}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
