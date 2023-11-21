import { Link } from "react-router-dom";
import Logo from "./Logo";

const Footer = () => {
  return (
    <footer className="bg-gray-300">
      <div className="flex justify-evenly py-2 max-w-3xl mx-auto">
        <Link to={"/"}>
          <Logo>LinkMe</Logo>
        </Link>
        <div className="flex flex-col font-medium text-gray-700">
          <Link to={"/blog"} className="hover:text-gray-800 hover:underline">
            Blog
          </Link>
          <Link to={"/careers"} className="hover:text-gray-800 hover:underline">
            Careers
          </Link>
          <Link to={"/press"} className="hover:text-gray-800 hover:underline">
            Press
          </Link>
        </div>
        <div className="flex flex-col font-medium text-gray-700">
          <Link to={"/about"} className="hover:text-gray-800 hover:underline">
            About
          </Link>
          <Link to={"/contact"} className="hover:text-gray-800 hover:underline">
            Contact
          </Link>
          <Link to={"/privacy"} className="hover:text-gray-800 hover:underline">
            Privacy
          </Link>
          <Link to={"/terms"} className="hover:text-gray-800 hover:underline">
            Terms
          </Link>
          <Link to={"/faq"} className="hover:text-gray-800 hover:underline">
            FAQ
          </Link>
        </div>
      </div>
      <p className="text-sm py-2 text-center">
        Made with ❤️ by{" "}
        <span className="transition-colors duration-700 hover:text-orange-500 hover:underline">
          <Link to={"https://github.com/taraksh01"} target="_blank">
            taraksh01
          </Link>
        </span>
      </p>
      <p className="text-sm py-2 text-center">
        &copy; {new Date().getFullYear()} LinkMe. All rights reserved.
      </p>
    </footer>
  );
};

export default Footer;
