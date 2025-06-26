
import React from 'react';
import { Heart } from 'lucide-react';

const Footer: React.FC = () => {
  return (
    <footer className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-30 w-[90%] max-w-4xl">
      <div className="glass rounded-2xl px-6 py-3 opacity-75">
        <div className="flex items-center justify-center space-x-2 text-sm text-slate-600">
          <span>Built with</span>
          <Heart size={14} className="text-red-500 fill-current" />
          <span>using React, Tailwind, and modern web technologies</span>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
