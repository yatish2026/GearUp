import React from "react";
import { motion } from "motion/react";
import assest from "assert";

const Footer = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="px-6 md:px-16 lg:px-24 xl:px-32 mt-60 text-sm text-gray-500"
    >
      {/* Top Footer Content */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="flex flex-wrap justify-between items-start gap-8 pb-6 border-borderColor"
      >
        {/* Company Info */}
        <div>
          <motion.img
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            src="/car-rental-bd.png" // Change this to your actual logo path
            alt="Company Logo"
            className="h-16 md:h-20"
          />
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="max-w-80 mt-3"
          >
            Premium car rental service with a wide selection of luxury and
            everyday vehicles for all your driving needs.
          </motion.p>

          {/* Social Media Links */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex items-center gap-3 mt-6"
          >
            <a href="https://wa.me/917989479005" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp">
              <img src="https://upload.wikimedia.org/wikipedia/commons/6/6b/WhatsApp.svg" alt="WhatsApp" className="w-5 h-5" />
            </a>
            <a href="https://www.instagram.com/mr_yatishh/" target="_blank" rel="noopener noreferrer" aria-label="Instagram">
              <img src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png" alt="Instagram" className="w-5 h-5" />
            </a>
            <a href="mailto:yatish.techie@gmail.com" aria-label="Gmail">
              <img src="https://upload.wikimedia.org/wikipedia/commons/4/4e/Gmail_Icon.png" alt="Gmail" className="w-5 h-5" />
            </a>
            <a href="https://www.linkedin.com/in/yatish-gottapu/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <img src="https://upload.wikimedia.org/wikipedia/commons/0/01/LinkedIn_Logo.svg" alt="LinkedIn" className="w-5 h-5" />
            </a>
          </motion.div>
        </div>

        {/* Quick Links */}
        <motion.div>
          <h2 className="text-base font-medium text-gray-800 uppercase">Quick Links</h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li><a href="#">Home</a></li>
            <li><a href="#">Browse Cars</a></li>
            <li><a href="#">List Your Car</a></li>
            <li><a href="#">About Us</a></li>
          </ul>
        </motion.div>

        {/* Resources */}
        <div>
          <h2 className="text-base font-medium text-gray-800 uppercase">Resources</h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li><a href="#">Help Center</a></li>
            <li><a href="#">Terms of Service</a> </li>
            <li><a href="#">Privacy Policy</a> </li>
            <li><a href="#">Insurance</a></li>
          </ul>
        </div>

        {/* Contact Info */}
        <div>
          <h2 className="text-base font-medium text-gray-800 uppercase">Contact</h2>
          <ul className="mt-3 flex flex-col gap-1.5">
            <li>1-90 patarega</li>
            <li>visakhapatnam, CA 94107</li>
            <li>7989479005</li>
            <li>yatish.tech@gmail.com</li>
          </ul>
        </div>
      </motion.div>

      {/* Divider */}
      <hr className="border-gray-300 mt-8" />

      {/* Bottom Footer */}
      <div className="flex flex-col md:flex-row gap-2 items-center justify-between py-5">
        <p>© {new Date().getFullYear()} Mr.yatish. All rights reserved.</p>
        <ul className="flex items-center gap-4">
          <li><a href="#">Privacy</a> </li>
          <li><a href="#">Terms</a></li>
          <li><a href="#">Sitemap</a></li>
        </ul>
      </div>
    </motion.div>
  );
};

export default Footer;
