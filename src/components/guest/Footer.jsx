import React from 'react';
import { Facebook, Instagram, Linkedin, Twitter, Youtube } from 'lucide-react';
import Logo from '../../assets/logo.png';

const Footer = () => {
  return (
    <footer className='bg-gray-900  text-white py-8 px-6'>
      <div className='max-w-7xl mx-auto grid grid-cols-1 md:flex  md:justify-between md:items-start gap-8'>
        {/* Cột Menu */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Menu</h3>
          <ul className='space-y-2'>
            <li>
              <a href='#' className='hover:text-gray-400'>
                Giới thiệu
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-gray-400'>
                Blog
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-gray-400'>
                Hỏi đáp
              </a>
            </li>
            <li>
              <a href='#' className='hover:text-gray-400'>
                Liên hệ
              </a>
            </li>
          </ul>
        </div>

        {/* Cột Liên hệ */}
        <div>
          <h3 className='text-lg font-semibold mb-4'>Liên hệ</h3>
          <p>
            Email:{' '}
            <a
              href='mailto:support@growthtrack.com'
              className='hover:text-gray-400'
            >
              support@growthtrack.com
            </a>
          </p>
          <p>
            Hotline: <span className='hover:text-gray-400'>0123 456 789</span>
          </p>
        </div>

        <div className='flex flex-col items-start md:items-start'>
          <h3 className='text-lg font-semibold mb-4'>Mạng xã hội</h3>
          {/* Mạng xã hội */}
          <div className='flex gap-4 mb-4'>
            <a href='#' className='hover:text-gray-400'>
              <Facebook className='w-6 h-6' />
            </a>
            <a href='#' className='hover:text-gray-400'>
              <Instagram className='w-6 h-6' />
            </a>
            <a href='#' className='hover:text-gray-400'>
              <Linkedin className='w-6 h-6' />
            </a>
            <a href='#' className='hover:text-gray-400'>
              <Twitter className='w-6 h-6' />
            </a>
            <a href='#' className='hover:text-gray-400'>
              <Youtube className='w-6 h-6' />
            </a>
          </div>
        </div>

        {/* Cột Mạng xã hội và logo */}
        <div className='flex flex-col items-start md:items-end'>
          <div className='flex gap-4 mb-4'>
            <a href='#' className='hover:text-gray-400 text-xl'>
              <i className='fab fa-facebook'></i>
            </a>
            <a href='#' className='hover:text-gray-400 text-xl'>
              <i className='fab fa-instagram'></i>
            </a>
            <a href='#' className='hover:text-gray-400 text-xl'>
              <i className='fab fa-linkedin'></i>
            </a>
          </div>
          <div>
            <h3 className='text-lg font-semibold flex items-center gap-2'>
              <span><img className='w-10' src={Logo} alt="" /></span> GrowthTrack
            </h3>
            <p className='text-gray-400 text-sm'>
              Theo dõi sự phát triển toàn diện của trẻ
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
