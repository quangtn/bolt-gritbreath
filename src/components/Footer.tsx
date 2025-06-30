const Footer = () => {
  return (
    <footer className="bg-white/70 backdrop-blur-lg border-t border-white/20 py-4 px-6">
      <div className="flex justify-center items-center">
        <a
          href="https://bolt.new/"
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center space-x-2 text-gray-600 hover:text-[#24880C] transition-colors duration-200"
        >
          <img
            src="https://oczen.io/assets/mvp/white_circle_360x360.png"
            alt="Bolt Logo"
            className="w-8 h-8 rounded-full"
          />
          <span className="text-sm font-medium">Powered by Bolt</span>
        </a>
      </div>
    </footer>
  );
};

export default Footer; 