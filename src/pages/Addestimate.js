import React, { useEffect, useState, useRef } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { FiDollarSign, FiShoppingBag, FiCoffee, FiDroplet, FiMeh, FiPlus } from "react-icons/fi";
import { GiFruitBowl, GiMeat } from "react-icons/gi";

const Addestimate = () => {
  // Refs for form inputs
  const refs = {
    addOverAllAmount: useRef(null),
    otherBills: useRef(null),
    kiranaAmount: useRef(null),
    vegatablesAmount: useRef(null),
    milkAmount: useRef(null),
    meatAmount: useRef(null),
  };

  const [data, setData] = useState({
    addOverAllAmount: "",
    otherBills: "",
    kiranaAmount: "",
    vegatablesAmount: "",
    milkAmount: "",
    meatAmount: "",
  });

  const [displayTotal, setDisplayTotal] = useState(0);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  // Handle window resize
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate total
  useEffect(() => {
    const othersv = parseInt(data.otherBills) || 0;
    const kiranav = parseInt(data.kiranaAmount) || 0;
    const vegetablesv = parseInt(data.vegatablesAmount) || 0;
    const milkv = parseInt(data.milkAmount) || 0;
    const meatv = parseInt(data.meatAmount) || 0;
    setDisplayTotal(othersv + kiranav + vegetablesv + milkv + meatv);
  }, [data]);

  const handleTotals = async (event) => {
    event.preventDefault();
    
    // Check if all fields are filled
    const isAnyFieldEmpty = Object.values(data).some(value => !value);
    if (isAnyFieldEmpty) {
      toast.error("Please fill all input fields", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      return;
    }

    try {
      const docRef = doc(db, "TOTALS", "gr27oRxD0MX7MLeX44cx");
      await updateDoc(docRef, data);
      
      toast.success("Estimate Added Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Reset form
      setData({
        addOverAllAmount: "",
        otherBills: "",
        kiranaAmount: "",
        vegatablesAmount: "",
        milkAmount: "",
        meatAmount: "",
      });

      // Clear all input fields
      Object.values(refs).forEach(ref => {
        if (ref.current) ref.current.value = "";
      });

    } catch (error) {
      toast.error(error.message || "Failed to update estimate", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setData(prev => ({ ...prev, [name]: value }));
  };

  // Category configuration
  const categories = [
    {
      id: "addOverAllAmount",
      label: "Total Bills Estimate",
      icon: <FiDollarSign className="text-blue-500" />,
      ref: refs.addOverAllAmount,
      color: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      id: "otherBills",
      label: "Other Fixed Bills",
      icon: <FiMeh className="text-purple-500" />,
      ref: refs.otherBills,
      color: "bg-purple-50",
      borderColor: "border-purple-200"
    },
    {
      id: "kiranaAmount",
      label: "Kirana Estimate",
      icon: <FiShoppingBag className="text-amber-500" />,
      ref: refs.kiranaAmount,
      color: "bg-amber-50",
      borderColor: "border-amber-200"
    },
    {
      id: "vegatablesAmount",
      label: "Vegetables Estimate",
      icon: <GiFruitBowl className="text-emerald-500" />,
      ref: refs.vegatablesAmount,
      color: "bg-emerald-50",
      borderColor: "border-emerald-200"
    },
    {
      id: "milkAmount",
      label: "Dairy Estimate",
      icon: <FiDroplet className="text-blue-400" />,
      ref: refs.milkAmount,
      color: "bg-blue-50",
      borderColor: "border-blue-200"
    },
    {
      id: "meatAmount",
      label: "Meat Estimate",
      icon: <GiMeat className="text-red-500" />,
      ref: refs.meatAmount,
      color: "bg-red-50",
      borderColor: "border-red-200"
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <ToastContainer />
      
      <div className="max-w-6xl mx-auto">
        {/* <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Add Monthly Estimate</h1>
          <p className="text-gray-600">Set your budget estimates for different categories</p>
        </div> */}

        <div className="flex flex-col lg:flex-row gap-8 mt-8">
          {/* Form Section */}
          <div className="flex-1">
            <form onSubmit={handleTotals} className="bg-white rounded-xl shadow-md p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {categories.map((category) => (
                  <div 
                    key={category.id} 
                    className={`p-4 rounded-lg border ${category.borderColor} ${category.color}`}
                  >
                    <label htmlFor={category.id} className="block text-sm font-medium text-gray-700 mb-1">
                      <div className="flex items-center">
                        {category.icon}
                        <span className="ml-2">{category.label}</span>
                      </div>
                    </label>
                    <div className="relative mt-1 rounded-md shadow-sm">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <span className="text-gray-500">₹</span>
                      </div>
                      <input
                        type="number"
                        id={category.id}
                        name={category.id}
                        ref={category.ref}
                        onChange={handleInputChange}
                        className="block w-full pl-8 pr-12 py-3 border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                        placeholder="0"
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  type="submit"
                  className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                >
                  <FiPlus className="mr-2" />
                  Save Estimates
                </button>
              </div>
            </form>
          </div>

          {/* Total Estimate Section */}
          <div className="lg:w-1/3">
            <div className="bg-white rounded-xl shadow-md p-6 h-full">
              <h2 className="text-xl font-semibold text-gray-800 mb-4">Estimated Budget Summary</h2>
              
              <div className="space-y-4">
                {categories.slice(1).map(category => (
                  data[category.id] && (
                    <div key={category.id} className="flex justify-between items-center">
                      <span className="text-gray-600">{category.label}</span>
                      <span className="font-medium">₹{data[category.id]}</span>
                    </div>
                  )
                ))}
              </div>

              <div className="mt-8 pt-4 border-t border-gray-200">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold">Subtotal</span>
                  <span className="text-lg font-semibold">₹{displayTotal}</span>
                </div>
              </div>

              {data.addOverAllAmount && (
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total Budget</span>
                    <span className="text-lg font-semibold">₹{data.addOverAllAmount}</span>
                  </div>
                  <div className="mt-2 flex justify-between items-center">
                    <span className="text-gray-600">Remaining</span>
                    <span className={`font-medium ${displayTotal > data.addOverAllAmount ? 'text-red-500' : 'text-green-500'}`}>
                      ₹{data.addOverAllAmount - displayTotal}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Addestimate;
