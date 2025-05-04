import React, { useState, useEffect } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";
import { 
  FiShoppingBag, 
  FiDroplet, 
  FiMeh,
  FiCalendar,
  FiDollarSign,
  FiPlus,
  FiList
} from "react-icons/fi";
import { GiFruitBowl, GiMeat } from "react-icons/gi";

const Addbills = () => {
  const [data, setData] = useState({
    date: "",
    category: "",
    items: "",
    amount: ""
  });

  // Set default date to today
  useEffect(() => {
    const today = new Date().toISOString().split('T')[0];
    setData(prev => ({ ...prev, date: today }));
  }, []);

  const categories = [
    { value: "KIRANA", label: "Kirana", icon: <FiShoppingBag />, color: "bg-amber-100", textColor: "text-amber-800" },
    { value: "VEGETABLES", label: "Vegetables", icon: <GiFruitBowl />, color: "bg-emerald-100", textColor: "text-emerald-800" },
    { value: "MILK", label: "Dairy", icon: <FiDroplet />, color: "bg-blue-100", textColor: "text-blue-800" },
    { value: "MEAT", label: "Meat", icon: <GiMeat />, color: "bg-red-100", textColor: "text-red-800" },
    { value: "OTHERS", label: "Other", icon: <FiMeh />, color: "bg-purple-100", textColor: "text-purple-800" }
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!data.category || !data.date || !data.items || !data.amount) {
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
      const collectionRef = collection(db, data.category);
      await addDoc(collectionRef, { data });
      
      toast.success("Bill Added Successfully", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });

      // Reset form (keep date as today)
      setData({
        date: new Date().toISOString().split('T')[0],
        category: "",
        items: "",
        amount: ""
      });

    } catch (error) {
      toast.error(error.message || "Failed to add bill", {
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-4 md:p-8">
      <ToastContainer />
      
      <div className="max-w-md mx-auto">
        <div className="mb-5 text-center">
          <h1 className="text-3xl font-bold text-gray-800">Add New Bill</h1>
          <p className="text-gray-600 mt-7">Track your daily expenses</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-lg overflow-hidden">
          {/* Form Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-500 p-4 text-white">
            <h2 className="text-xl font-semibold">Bill Details</h2>
          </div>

          <div className="p-6">
            {/* Category Select */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Category
              </label>
              <div className="relative">
                <select
                  name="category"
                  value={data.category}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none"
                  required
                >
                  <option value="">Select a category</option>
                  {categories.map((cat) => (
                    <option key={cat.value} value={cat.value}>
                      {cat.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiShoppingBag className="text-gray-400" />
                </div>
                <div className="absolute inset-y-0 right-0 flex items-center pr-3 pointer-events-none">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Date Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Date
              </label>
              <div className="relative">
                <input
                  type="date"
                  name="date"
                  value={data.date}
                  onChange={handleInputChange}
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FiCalendar className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Items Textarea */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Items
              </label>
              <div className="relative">
                <textarea
                  name="items"
                  value={data.items}
                  onChange={handleInputChange}
                  placeholder="Enter items (e.g., Onions, Soaps, etc.)"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 min-h-[100px]"
                  required
                />
                <div className="absolute top-3 left-3">
                  <FiList className="text-gray-400" />
                </div>
              </div>
            </div>

            {/* Amount Input */}
            <div className="mb-6">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Amount
              </label>
              <div className="relative rounded-md shadow-sm">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <span className="text-gray-500">₹</span>
                </div>
                <input
                  type="number"
                  name="amount"
                  value={data.amount}
                  onChange={handleInputChange}
                  placeholder="0.00"
                  className="block w-full pl-10 pr-3 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  required
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8">
              <button
                type="submit"
                className="w-full flex justify-center items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-gradient-to-r from-blue-600 to-blue-500 hover:from-blue-700 hover:to-blue-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-all duration-200"
              >
                <FiPlus className="mr-2" />
                Add Bill
              </button>
            </div>
          </div>
        </form>

      
      </div>
    </div>
  );
};

export default Addbills;
