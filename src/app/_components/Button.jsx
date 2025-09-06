import Link from "next/link";
import React from "react";

const Button = ({ disabled, href, children, onClick, className }) => {
  if (href)
    return (
      <Link
        href={href}
        className={`${className} px-4 py-2 border-2 rounded-3xl hover:translate-y-[-2px] cursor-pointer transition-all duration-300 hover:bg-gray-950`}
      >
        {children}
      </Link>
    );
  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`${className} px-4 py-2 border-2 bg-white text-black rounded-3xl hover:translate-y-[-2px] cursor-pointer transition-all duration-300 hover:bg-gray-300 font-[500]`}
    >
      {children}
    </button>
  );
};

export default Button;
