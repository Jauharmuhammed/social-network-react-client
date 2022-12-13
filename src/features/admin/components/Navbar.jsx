import React from "react";

const Navbar = () => {
  return (
    <nav className="w-full h-20 p-5 flex">
      <div className="flex  items-baseline gap-1">
          <h2 className="font-boogaloo text-custom-yellow text-4xl ">
            showyourwork
          </h2>
          <span className="text-sm font-medium">Admin</span>
      </div>
    </nav>
  );
};

export default Navbar;
