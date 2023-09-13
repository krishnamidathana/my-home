import React, { useEffect } from "react";
import { useState } from "react";

import { FcHome } from "react-icons/fc";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const location = useLocation();

  useEffect(() => {
    if (location.pathname === "/addbills") {
      setActiveTab("addbills");
    } else if (location.pathname === "/viewbills") {
      setActiveTab("viewbills");
    }
  }, [location]);

  return (
    <div className="w-full px-10  py-[20px] h-[70px] fixed shadow-lg bg-green-300">
      <nav className=" flex justify-between  flex-row">
        <div className=" text-xl  font-bold ">
          <Link to="/dashboard">
            <div className="flex flex-row w-[300px]">
              <FcHome className="text-3xl mr-2" />
              <h1 onClick={() => setActiveTab("dashboard")}>MY HOME</h1>
            </div>
          </Link>
        </div>

        <ul className="h-[40px]  justify-center    items-center flex text-l  font-bold  flex-row bg-green-300  ">
          <li className="px-9 ">
            <Link to="/dashboard">
              <p
                className={`${
                  activeTab === "dashboard"
                    ? "bg-orange-500 px-3 py-1 rounded-2xl"
                    : ""
                }`}
                onClick={() => setActiveTab("dashboard")}
              >
                Dashboard
              </p>
            </Link>
          </li>
          <li className="px-9 ">
            <Link to="/addbills">
              <p
                className={`${
                  activeTab === "addbills"
                    ? "bg-orange-500 px-3 py-1 rounded-2xl"
                    : ""
                }`}
                onClick={() => setActiveTab("addbills")}
              >
                Add Bills
              </p>
            </Link>
          </li>

          <li className="px-9">
            <Link to="/addestimate">
              <p
                className={`${
                  activeTab === "addestimate"
                    ? "bg-orange-500 px-3 py-1 rounded-2xl"
                    : ""
                }`}
                onClick={() => setActiveTab("addestimate")}
              >
                Add Estimate
              </p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
