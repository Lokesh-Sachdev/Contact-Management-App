import React from 'react';
import { Link } from 'react-router-dom';
import logo from '../../assets/CMA logo.png';
import { VscGraphLine } from 'react-icons/vsc';
import { RiContactsBookLine } from 'react-icons/ri';

const Sidebar = () => {
  return (
    <div className="sidebar col-lg-6 bg-[#425F8F] w-1/5 min-w-[250px] max-w-[350px] overflow-y-auto">
      <div className="sidebar_logo mb-[100px]">
        <img src={logo} alt="logo" />
      </div>
      <nav className="navbar bg-[#425F8F] navbar-dark">
        <Link
          to={'/'}
          className="navbar-brand flex m-0 px-4 w-full hover:bg-[#EE564F]"
        >
          <RiContactsBookLine className="mt-1.5 mr-2" />
          <p className="m-0">Contact List</p>
        </Link>
        <Link
          to={'/charts&maps'}
          className="navbar-brand flex m-0 px-4 w-full hover:bg-[#EE564F]"
        >
          <VscGraphLine className="mt-1.5 mr-2" />
          <p className="m-0">Charts & Maps</p>
        </Link>
      </nav>
    </div>
  );
};

export default Sidebar;
