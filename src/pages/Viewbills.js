import React, { useEffect, useState ,useRef } from "react";
import {
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import CountUp from "react-countup";
import { RiDeleteBin6Fill, RiMoneyDollarCircleLine } from "react-icons/ri";
import { FiShoppingBag, FiCoffee, FiDroplet, FiMeh } from "react-icons/fi";
import { GiFruitBowl, GiMeat } from "react-icons/gi";

const Viewbills = () => {
  // State and data fetching logic remains the same
  const [kirana, setKirana] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const [milk, setMilk] = useState([]);
  const [meat, setMeat] = useState([]);
  const [others, setOthers] = useState([]);
  const [totals, setTotals] = useState({});
  const [activeCategory, setActiveCategory] = useState(null);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  const categoryRefs = useRef({});

  // Add resize listener for mobile detection
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Your existing data fetching and calculation functions
  let kadd, vadd, milkadd, meatadd, othersadd;
  var kiranab, vegetablesb, milkb, meatb, othersb;
  let spentTotal, overAllBalance;

  // Fetch totals
  useEffect(() => {
    const getTotals = async () => {
      const datacollectionRef = doc(db, "TOTALS", "gr27oRxD0MX7MLeX44cx");
      const totalsData = await getDoc(datacollectionRef);
      const {
        kiranaAmount,
        milkAmount,
        meatAmount,
        otherBills,
        vegatablesAmount,
        addOverAllAmount,
      } = totalsData.data();
      setTotals({
        kiranaAmount,
        milkAmount,
        meatAmount,
        otherBills,
        vegatablesAmount,
        addOverAllAmount,
      });
    };
    getTotals();
  }, []);

    // Function to scroll to category
    const scrollToCategory = (categoryId) => {
      setActiveCategory(activeCategory === categoryId ? null : categoryId);
      
      if (categoryRefs.current[categoryId]) {
        const container = document.querySelector('.categories-container');
        const categoryElement = categoryRefs.current[categoryId];
        
        if (container && categoryElement) {
          const containerWidth = container.offsetWidth;
          const categoryLeft = categoryElement.offsetLeft;
          const categoryWidth = categoryElement.offsetWidth;
          
          container.scrollTo({
            left: categoryLeft - (containerWidth / 2) + (categoryWidth / 2),
            behavior: 'smooth'
          });
        }
      }
    };

  // Kirana calculations
  const adds = () => {
    kadd = kirana.reduce((accumulator, item) => {
      return accumulator + parseInt(item.data.amount);
    }, 0);
  };
  adds();

  // Vegetables calculations
  const vegadds = () => {
    vadd = vegetables.reduce((accumulator, item) => {
      return accumulator + parseInt(item.data.amount);
    }, 0);
  };
  vegadds();

  // Milk calculations
  const milkadds = () => {
    milkadd = milk.reduce((accumulator, item) => {
      return accumulator + parseInt(item.data.amount);
    }, 0);
  };
  milkadds();

  // Meat calculations
  const meatadds = () => {
    meatadd = meat.reduce((accumulator, item) => {
      return accumulator + parseInt(item.data.amount);
    }, 0);
  };
  meatadds();

  // Others calculations
  const othersadds = () => {
    othersadd = others.reduce((accumulator, item) => {
      return accumulator + parseInt(item.data.amount);
    }, 0);
  };
  othersadds();

  // All sub items balance counting
  const allAdds = () => {
    kiranab = totals.kiranaAmount - kadd || 0;
    vegetablesb = totals.vegatablesAmount - vadd || 0;
    milkb = totals.milkAmount - milkadd || 0;
    meatb = totals.meatAmount - meatadd || 0;
    othersb = totals.otherBills - othersadd || 0;
  };
  allAdds();

  // Overall balance counting
  const spentAmountTotal = () => {
    spentTotal = kadd + vadd + milkadd + meatadd + othersadd;
    overAllBalance = totals.addOverAllAmount - spentTotal;
  };
  spentAmountTotal();

  // Fetch Kirana data
  useEffect(() => {
    const datacollectionRef = collection(db, "KIRANA");
    const getKirana = async () => {
      const data = await getDocs(datacollectionRef);
      setKirana(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getKirana();
  }, []);

  // Fetch Vegetables data
  useEffect(() => {
    const datacollectionRef = collection(db, "VEGETABLES");
    const getVegetables = async () => {
      const data = await getDocs(datacollectionRef);
      setVegetables(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getVegetables();
  }, []);

  // Fetch Milk data
  useEffect(() => {
    const datacollectionRef = collection(db, "MILK");
    const getCollection = async () => {
      const data = await getDocs(datacollectionRef);
      setMilk(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getCollection();
  }, []);

  // Fetch Meat data
  useEffect(() => {
    const datacollectionRef = collection(db, "MEAT");
    const getCollection = async () => {
      const data = await getDocs(datacollectionRef);
      setMeat(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getCollection();
  }, []);

  // Fetch Others data
  useEffect(() => {
    const datacollectionRef = collection(db, "OTHERS");
    const getCollection = async () => {
      const data = await getDocs(datacollectionRef);
      setOthers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };
    getCollection();
  }, []);

  // Delete individual items
  const deletekiranaCell = async (deleteId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete?");
    if (shouldDelete) {
      try {
        const datacollectionRef = collection(db, "KIRANA");
        const ref = doc(datacollectionRef, deleteId);
        await deleteDoc(ref);
        setKirana(kirana.filter((item) => item.id !== deleteId));
        alert("Deleted successfully");
      } catch (error) {
        alert("Error deleting item");
      }
    }
  };

  const deletevegetablesCell = async (deleteId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete?");
    if (shouldDelete) {
      try {
        const datacollectionRef = collection(db, "VEGETABLES");
        const ref = doc(datacollectionRef, deleteId);
        await deleteDoc(ref);
        setVegetables(vegetables.filter((item) => item.id !== deleteId));
        alert("Deleted successfully");
      } catch (error) {
        alert("Error deleting item");
      }
    }
  };

  const deletemilkCell = async (deleteId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete?");
    if (shouldDelete) {
      try {
        const datacollectionRef = collection(db, "MILK");
        const ref = doc(datacollectionRef, deleteId);
        await deleteDoc(ref);
        setMilk(milk.filter((item) => item.id !== deleteId));
        alert("Deleted successfully");
      } catch (error) {
        alert("Error deleting item");
      }
    }
  };

  const deletemeatCell = async (deleteId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete?");
    if (shouldDelete) {
      try {
        const datacollectionRef = collection(db, "MEAT");
        const ref = doc(datacollectionRef, deleteId);
        await deleteDoc(ref);
        setMeat(meat.filter((item) => item.id !== deleteId));
        alert("Deleted successfully");
      } catch (error) {
        alert("Error deleting item");
      }
    }
  };

  const deleteothersCell = async (deleteId) => {
    const shouldDelete = window.confirm("Are you sure you want to delete?");
    if (shouldDelete) {
      try {
        const datacollectionRef = collection(db, "OTHERS");
        const ref = doc(datacollectionRef, deleteId);
        await deleteDoc(ref);
        setOthers(others.filter((item) => item.id !== deleteId));
        alert("Deleted successfully");
      } catch (error) {
        alert("Error deleting item");
      }
    }
  };

  // Delete all items in a category
  const deleteKiranaAll = async () => {
    if (kirana.length === 0) {
      alert("No items to delete");
      return;
    }
    
    const shouldDelete = window.confirm("Are you sure you want to delete ALL kirana items?");
    if (shouldDelete) {
      try {
        const batch = kirana.map(item => 
          deleteDoc(doc(db, "KIRANA", item.id))
        );
        await Promise.all(batch);
        setKirana([]);
        alert("All kirana items deleted successfully");
      } catch (error) {
        alert("Error deleting items");
      }
    }
  };

  const deleteVegetablesAll = async () => {
    if (vegetables.length === 0) {
      alert("No items to delete");
      return;
    }
    
    const shouldDelete = window.confirm("Are you sure you want to delete ALL vegetable items?");
    if (shouldDelete) {
      try {
        const batch = vegetables.map(item => 
          deleteDoc(doc(db, "VEGETABLES", item.id))
        );
        await Promise.all(batch);
        setVegetables([]);
        alert("All vegetable items deleted successfully");
      } catch (error) {
        alert("Error deleting items");
      }
    }
  };

  const deleteMilkAll = async () => {
    if (milk.length === 0) {
      alert("No items to delete");
      return;
    }
    
    const shouldDelete = window.confirm("Are you sure you want to delete ALL milk items?");
    if (shouldDelete) {
      try {
        const batch = milk.map(item => 
          deleteDoc(doc(db, "MILK", item.id))
        );
        await Promise.all(batch);
        setMilk([]);
        alert("All milk items deleted successfully");
      } catch (error) {
        alert("Error deleting items");
      }
    }
  };

  const deleteMeatAll = async () => {
    if (meat.length === 0) {
      alert("No items to delete");
      return;
    }
    
    const shouldDelete = window.confirm("Are you sure you want to delete ALL meat items?");
    if (shouldDelete) {
      try {
        const batch = meat.map(item => 
          deleteDoc(doc(db, "MEAT", item.id))
        );
        await Promise.all(batch);
        setMeat([]);
        alert("All meat items deleted successfully");
      } catch (error) {
        alert("Error deleting items");
      }
    }
  };

  const deleteOthersAll = async () => {
    if (others.length === 0) {
      alert("No items to delete");
      return;
    }
    
    const shouldDelete = window.confirm("Are you sure you want to delete ALL other items?");
    if (shouldDelete) {
      try {
        const batch = others.map(item => 
          deleteDoc(doc(db, "OTHERS", item.id))
        );
        await Promise.all(batch);
        setOthers([]);
        alert("All other items deleted successfully");
      } catch (error) {
        alert("Error deleting items");
      }
    }
  };

  // Enhanced Category data with estimate and spent values
  const categories = [
    {
      id: "kirana",
      name: "Kirana",
      icon: <FiShoppingBag className="text-amber-500" size={24} />,
      color: "bg-amber-100",
      textColor: "text-amber-800",
      estimate: totals.kiranaAmount || 0,
      spent: kadd || 0,
      balance: kiranab || 0
    },
    {
      id: "vegetables",
      name: "Vegetables",
      icon: <GiFruitBowl className="text-emerald-500" size={24} />,
      color: "bg-emerald-100",
      textColor: "text-emerald-800",
      estimate: totals.vegatablesAmount || 0,
      spent: vadd || 0,
      balance: vegetablesb || 0
    },
    {
      id: "milk",
      name: "Milk",
      icon: <FiDroplet className="text-blue-500" size={24} />,
      color: "bg-blue-100",
      textColor: "text-blue-800",
      estimate: totals.milkAmount || 0,
      spent: milkadd || 0,
      balance: milkb || 0
    },
    {
      id: "meat",
      name: "Meat",
      icon: <GiMeat className="text-red-500" size={24} />,
      color: "bg-red-100",
      textColor: "text-red-800",
      estimate: totals.meatAmount || 0,
      spent: meatadd || 0,
      balance: meatb || 0
    },
    {
      id: "others",
      name: "Others",
      icon: <FiMeh className="text-purple-500" size={24} />,
      color: "bg-purple-100",
      textColor: "text-purple-800",
      estimate: totals.otherBills || 0,
      spent: othersadd || 0,
      balance: othersb || 0
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8 pb-20">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mt-12">Expense Tracker</h1>
        <p className="text-gray-600 ">View and manage your bills</p>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {/* Total Estimate */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 font-medium">Total Estimate</p>
              <h2 className="text-3xl font-bold text-gray-800">
                <CountUp
                  end={totals.addOverAllAmount || 0}
                  start={0}
                  duration={2.75}
                  prefix="₹"
                />
              </h2>
            </div>
            <RiMoneyDollarCircleLine className="text-blue-500" size={32} />
          </div>
        </div>

        {/* Total Spent */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 font-medium">Total Spent</p>
              <h2 className="text-3xl font-bold text-gray-800">
                <CountUp
                  end={spentTotal || 0}
                  start={0}
                  duration={2.75}
                  prefix="₹"
                />
              </h2>
            </div>
            <FiShoppingBag className="text-green-500" size={32} />
          </div>
        </div>

        {/* Total Balance */}
        <div className="bg-white rounded-xl shadow-md p-6 border-l-4 border-amber-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 font-medium">Total Balance</p>
              <h2 className="text-3xl font-bold text-gray-800">
                <CountUp
                  end={overAllBalance || 0}
                  start={0}
                  duration={2.75}
                  prefix="₹"
                />
              </h2>
            </div>
            <FiCoffee className="text-amber-500" size={32} />
          </div>
        </div>
      </div>

      {/* Category Breakdown with Estimate, Spent, and Balance */}
      <div className="mb-8 overflow-x-auto categories-container">
      <div className="flex space-x-4 pb-2" style={{ minWidth: isMobile ? '600px' : 'auto' }}>
        {categories.map((category) => (
          <div 
            key={category.id}
            ref={el => categoryRefs.current[category.id] = el}
            className={`flex-1 min-w-[220px] rounded-xl p-4 cursor-pointer transition-all ${category.color} ${activeCategory === category.id ? 'ring-2 ring-offset-2 ring-gray-400' : ''}`}
            onClick={() => {
              setActiveCategory(activeCategory === category.id ? null : category.id);
              scrollToCategory(category.id);
            }}
          >
            <div className="flex items-center space-x-3 mb-3">
              {category.icon}
              <h3 className={`font-bold ${category.textColor}`}>{category.name}</h3>
            </div>
            
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Estimate</span>
                <span className="font-semibold">
                  ₹<CountUp end={category.estimate} duration={1} />
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Spent</span>
                <span className="font-semibold">
                  ₹<CountUp end={category.spent} duration={1} />
                </span>
              </div>
              
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-600">Balance</span>
                <span className="font-semibold">
                  ₹<CountUp end={category.balance} duration={1} />
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>


      {/* Category Details Section */}
      {activeCategory && (

        
        <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8">
          <div className={`p-4 ${categories.find(c => c.id === activeCategory)?.color} flex justify-between items-center`}>
            <div className="flex items-center space-x-3">
              {categories.find(c => c.id === activeCategory)?.icon}
              <h2 className="text-xl font-bold">
                {categories.find(c => c.id === activeCategory)?.name} Bills
               
              </h2>
            </div>
            <button 
              onClick={() => {
                if (activeCategory === 'kirana') deleteKiranaAll();
                if (activeCategory === 'vegetables') deleteVegetablesAll();
                if (activeCategory === 'milk') deleteMilkAll();
                if (activeCategory === 'meat') deleteMeatAll();
                if (activeCategory === 'others') deleteOthersAll();
              }}
              className="px-3 py-1 bg-white rounded-lg text-sm font-medium text-red-500 hover:bg-red-50"
            >
              Clear All
            </button>
          </div>

          {/* Bill items list */}
          <div className="divide-y divide-gray-200">
            {(activeCategory === 'kirana' ? kirana :
              activeCategory === 'vegetables' ? vegetables :
              activeCategory === 'milk' ? milk :
              activeCategory === 'meat' ? meat :
              others).map((item) => (
              <div key={item.id} className="p-4 hover:bg-gray-50 transition-colors">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="font-medium text-gray-800">{item.data.date}</p>
                    <p className="text-gray-600 mt-1">{item.data.items}</p>
                  </div>
                  <div className="flex items-center space-x-4">
                    <span className="font-bold">₹{item.data.amount}</span>
                    <button 
                      onClick={() => {
                        if (activeCategory === 'kirana') deletekiranaCell(item.id);
                        if (activeCategory === 'vegetables') deletevegetablesCell(item.id);
                        if (activeCategory === 'milk') deletemilkCell(item.id);
                        if (activeCategory === 'meat') deletemeatCell(item.id);
                        if (activeCategory === 'others') deleteothersCell(item.id);
                      }}
                      className="text-red-400 hover:text-red-600"
                    >
                      <RiDeleteBin6Fill size={20} />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Empty state */}
          {((activeCategory === 'kirana' && kirana.length === 0) ||
            (activeCategory === 'vegetables' && vegetables.length === 0) ||
            (activeCategory === 'milk' && milk.length === 0) ||
            (activeCategory === 'meat' && meat.length === 0) ||
            (activeCategory === 'others' && others.length === 0)) && (
            <div className="p-8 text-center text-gray-500">
              No bills found for this category
            </div>
          )}
        </div>
      )}

      {/* Mobile Navigation */}

  {isMobile && (
    <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t border-gray-200 p-2">
      <div className="flex justify-around">
        {categories.map((category) => (
          <button
            key={category.id}
            className={`flex flex-col items-center p-2 rounded-lg ${activeCategory === category.id ? category.color : ''}`}
            onClick={() => scrollToCategory(category.id)}
          >
            {React.cloneElement(category.icon, { size: 20 })}
            <span className="text-xs mt-1">{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  )}
    </div>
  );
};

export default Viewbills;
