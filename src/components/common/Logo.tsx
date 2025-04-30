import React from "react";
import { Link } from "react-router-dom";

interface LogoProps {
  className?: string;
  linkTo?: string;
}

const Logo: React.FC<LogoProps> = ({ className = "", linkTo = "/" }) => {
  const logoImage = (
    <img src="/images/pmllogo2.png" alt="PML Academy" className="h-12" />
  );

  if (linkTo) {
    return (
      <Link to={linkTo} className={`flex items-center ${className}`}>
        {logoImage}
      </Link>
    );
  }

  return <div className={`flex items-center ${className}`}>{logoImage}</div>;
};

export default Logo;
