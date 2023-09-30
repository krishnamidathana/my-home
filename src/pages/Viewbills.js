import React from "react";

import {
  collection,
  getDocs,
  getDoc,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../firebase";
import CountUp from "react-countup";

import { useEffect, useState } from "react";
import { RiDeleteBin6Fill } from "react-icons/ri";

const Viewbills = () => {
  const [kirana, setKirana] = useState([]);
  const [vegetables, setVegetables] = useState([]);
  const [milk, setMilk] = useState([]);
  const [meat, setMeat] = useState([]);
  const [others, setOthers] = useState([]);
  const [totals, setTotals] = useState({});

  const [buttonStates, setButtonStates] = useState({
    kirana: false,
    vegetables: false,
    milk: false,
    meat: false,
    others: false,
  });

  let kadd, vadd, milkadd, meatadd, othersadd;

  var kiranab, vegetablesb, milkb, meatb, othersb;
  let spentTotal, overAllBalance;

  const handleClick = (buttonName) => {
    const newButtonStates = {
      kirana: false,
      vegetables: false,
      milk: false,
      meat: false,
      others: false,
    };
    newButtonStates[buttonName] = true;
    setButtonStates(newButtonStates);
  };

  //arranging total to display
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

  //kirana total function
  const adds = () => {
    kadd = kirana.reduce((accumulator, item) => {
      return accumulator + parseInt(item.data.amount);
    }, 0);
  };

  adds();
  //veg total function
  const vegadds = () => {
    vadd = vegetables.reduce((accumulator, item) => {
      return accumulator + parseInt(item.data.amount);
    }, 0);
  };

  vegadds();

  //milk total function
  const milkadds = () => {
    milkadd = milk.reduce((accumulator, item) => {
      return accumulator + parseInt(item.data.amount);
    }, 0);
  };

  milkadds();

  //meat total function
  const meatadds = () => {
    meatadd = meat.reduce((accumulator, item) => {
      return accumulator + parseInt(item.data.amount);
    }, 0);
  };

  meatadds();

  //others total function
  const othersadds = () => {
    othersadd = others.reduce((accumulator, item) => {
      return accumulator + parseInt(item.data.amount);
    }, 0);
  };

  othersadds();

  // all sub items bal counting
  const allAdds = () => {
    kiranab = totals.kiranaAmount - kadd || 0;
    vegetablesb = totals.vegatablesAmount - vadd || 0;
    milkb = totals.milkAmount - milkadd || 0;
    meatb = totals.meatAmount - meatadd || 0;
    othersb = totals.otherBills - othersadd || 0;
  };
  allAdds();

  //overall ball counting

  const spentAmountTotal = () => {
    spentTotal = kadd + vadd + milkadd + meatadd + othersadd;

    overAllBalance = totals.addOverAllAmount - spentTotal;
  };
  spentAmountTotal();

  useEffect(() => {
    const datacollectionRef = collection(db, "KIRANA");

    const getKirana = async () => {
      const data = await getDocs(datacollectionRef);
      setKirana(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getKirana();
  }, []);

  useEffect(() => {
    const datacollectionRef = collection(db, "VEGETABLES");

    const getVegetables = async () => {
      const data = await getDocs(datacollectionRef);
      setVegetables(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getVegetables();
  }, []);

  useEffect(() => {
    const datacollectionRef = collection(db, "MILK");

    const getCollection = async () => {
      const data = await getDocs(datacollectionRef);
      setMilk(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getCollection();
  }, []);

  useEffect(() => {
    const datacollectionRef = collection(db, "MEAT");

    const getCollection = async () => {
      const data = await getDocs(datacollectionRef);
      setMeat(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getCollection();
  }, []);

  useEffect(() => {
    const datacollectionRef = collection(db, "OTHERS");

    const getCollection = async () => {
      const data = await getDocs(datacollectionRef);
      setOthers(data.docs.map((doc) => ({ ...doc.data(), id: doc.id })));
    };

    getCollection();
  }, []);

  const deletekiranaCell = async (deleteId) => {
    const shouldDelete = window.confirm("Are you sure , want to delete?");
    try {
      if (shouldDelete) {
        const datacollectionRef = collection(db, "KIRANA");
        const ref = doc(datacollectionRef, deleteId);
        await deleteDoc(ref);
        const kiranaFilterData = kirana.filter((item) => item.id !== deleteId);
        setKirana(kiranaFilterData);
        alert("Deleted Successfully");
      }
    } catch (error) {
      alert("an error occured");
    }
  };

  const deletevegetablesCell = async (deleteId) => {
    const shouldDelete = window.confirm("Are you sure , want to delete?");
    try {
      if (shouldDelete) {
        const datacollectionRef = collection(db, "VEGETABLES");
        const ref = doc(datacollectionRef, deleteId);
        await deleteDoc(ref);
        const vegetablesFilterData = vegetables.filter(
          (item) => item.id !== deleteId
        );
        setVegetables(vegetablesFilterData);
        alert("Deleted Successfully");
      }
    } catch (error) {
      alert("an error occured");
    }
  };

  const deletemilkCell = async (deleteId) => {
    const shouldDelete = window.confirm("Are you sure , want to delete ?");
    try {
      if (shouldDelete) {
        const datacollectionRef = collection(db, "MILK");
        const ref = doc(datacollectionRef, deleteId);
        await deleteDoc(ref);
        const milkFilterData = milk.filter((item) => item.id !== deleteId);
        setMilk(milkFilterData);
        alert("Deleted Successfully");
      }
    } catch (error) {
      alert("an error occured");
    }
  };

  const deletemeatCell = async (deleteId) => {
    const shouldDelete = window.confirm("Are you sure ,u want to delete ?");
    try {
      if (shouldDelete) {
        const datacollectionRef = collection(db, "MEAT");
        const ref = doc(datacollectionRef, deleteId);
        await deleteDoc(ref);
        const meatFilterData = meat.filter((item) => item.id !== deleteId);
        setMeat(meatFilterData);
        alert("Deleted Successfully");
      }
    } catch (error) {
      alert("an error occured");
    }
  };

  const deleteothersCell = async (deleteId) => {
    const shouldDelete = window.confirm("Are you sure , want to delete ?");
    try {
      if (shouldDelete) {
        const datacollectionRef = collection(db, "OTHERS");
        const ref = doc(datacollectionRef, deleteId);
        await deleteDoc(ref);
        const othersFilterData = others.filter((item) => item.id !== deleteId);
        setOthers(othersFilterData);
        alert("Deleted Successfully");
      }
    } catch (error) {
      alert("an error occured");
    }
  };

  const deleteKiranaAll = () => {
    if (kirana.length === 0) {
      alert("No items to delete");
    } else {
      const shouldDelete = window.confirm(
        "Are you sure ,want to delete all items?"
      );
      if (shouldDelete) {
        const arr = [];

        kirana.map((item) => {
          return arr.push(item.id);
        });

        arr.map((ii) => {
          const datacollectionRef = collection(db, "KIRANA");
          const ref = doc(datacollectionRef, ii);
          deleteDoc(ref);
          const filterData = others.filter((item) => item.id === ii);
          return setKirana(filterData);
        });
        alert("Deleted Successfully");
      }
    }
  };

  const deleteVegetablesAll = () => {
    if (vegetables.length === 0) {
      alert("No items to delete");
    } else {
      const shouldDelete = window.confirm(
        "Are you sure ,want to delete all items?"
      );
      if (shouldDelete) {
        const arr = [];

        vegetables.map((item) => {
          return arr.push(item.id);
        });

        arr.map((ii) => {
          const datacollectionRef = collection(db, "VEGETABLES");
          const ref = doc(datacollectionRef, ii);
          deleteDoc(ref);
          const filterData = others.filter((item) => item.id === ii);
          return setVegetables(filterData);
        });
        alert("Deleted Successfully");
      }
    }
  };

  const deleteMilkAll = () => {
    if (milk.length === 0) {
      alert("No items to delete");
    } else {
      const shouldDelete = window.confirm(
        "Are you sure ,want to delete all items?"
      );
      if (shouldDelete) {
        const arr = [];

        milk.map((item) => {
          return arr.push(item.id);
        });

        arr.map((ii) => {
          const datacollectionRef = collection(db, "MILK");
          const ref = doc(datacollectionRef, ii);
          deleteDoc(ref);
          const filterData = others.filter((item) => item.id === ii);
          return setMilk(filterData);
        });
        alert("Deleted Successfully");
      }
    }
  };

  const deleteMeatAll = () => {
    if (meat.length === 0) {
      alert("No items to delete");
    } else {
      const shouldDelete = window.confirm(
        "Are you sure ,want to delete all items?"
      );
      if (shouldDelete) {
        const arr = [];

        meat.map((item) => {
          return arr.push(item.id);
        });

        arr.map((ii) => {
          const datacollectionRef = collection(db, "MEAT");
          const ref = doc(datacollectionRef, ii);
          deleteDoc(ref);
          const filterData = others.filter((item) => item.id === ii);
          return setMeat(filterData);
        });
        alert("Deleted Successfully");
      }
    }
  };

  const deleteOthersAll = () => {
    if (others.length === 0) {
      alert("No items to delete");
    } else {
      const shouldDelete = window.confirm(
        "Are you sure ,want to delete all items?"
      );
      if (shouldDelete) {
        const arr = [];

        others.map((item) => {
          return arr.push(item.id);
        });

        arr.map((ii) => {
          const datacollectionRef = collection(db, "OTHERS");
          const ref = doc(datacollectionRef, ii);
          deleteDoc(ref);
          const filterData = kirana.filter((item) => item.id === ii);
          return setOthers(filterData);
        });
        alert("Deleted Successfully");
      }
    }
  };

  return (
    <div className="bg-black pb-[100px]">
      <div className="h-[1300px]  bg-black">
        {/* card display */}
        <div className="flex flex-row gap-[80px] justify-center pb-[100px] pt-[140px]">
          <div className="w-[350px] p-1 h-[150px] bg-yellow-300 font-bold text-xl rounded-xl shadow-2xl shadow-yellow-300/50">
            <h1 className="pt-[40px] text-[50px] font-medium">
              <CountUp
                end={totals.addOverAllAmount || 0}
                start={0}
                duration={2.75}
                prefix="₹"
              />
            </h1>
            <h1 className="pt-[30px] font-bold">TOTAL ESTIMATE AMOUNT</h1>
          </div>

          <div className="w-[350px] p-1 h-[150px] bg-cyan-300 font-bold text-xl rounded-xl shadow-2xl shadow-cyan-300/50">
            <h1 className="pt-[40px] text-[50px] font-medium">
              <CountUp
                end={spentTotal || 0}
                start={0}
                duration={2.75}
                prefix="₹"
              />
            </h1>
            <h1 className="pt-[30px] font-bold">TOTAL SPENT AMOUNT</h1>
          </div>

          <div className="w-[350px] p-1 h-[150px] bg-green-300 font-bold text-xl rounded-xl shadow-2xl shadow-green-300/50">
            <h1 className="pt-[40px] text-[50px] font-medium">
              <CountUp
                end={overAllBalance || 0}
                start={0}
                duration={2.75}
                prefix="₹"
              />
            </h1>
            <h1 className="pt-[30px] font-bold">TOTAL BALANCE AMOUNT</h1>
          </div>
        </div>
        {/* small cards */}
        <div className="flex flex-col gap-[80px] justify-center pb-[100px]">
          <div className="flex flex-row gap-[80px] justify-center pb-[50px]">
            <div className="flex flex-col  p-[10px] bg-red-300 w-[400px] h-[180px]  rounded-xl shadow-2xl shadow-red-300/50">
              <div className="flex flex-row justify-between  ">
                <div>
                  <h1 className="pt-[20px] font-bold text-[30px]">
                    <CountUp
                      end={totals.kiranaAmount || 0}
                      start={0}
                      duration={2.75}
                      prefix="₹"
                    />
                  </h1>
                  <h1 className="pt-[30px] font-bold">ESTIMATE</h1>
                </div>

                <div>
                  <h1 className="pt-[20px] font-bold text-[30px]">
                    <CountUp
                      end={kadd || 0}
                      start={0}
                      duration={2.75}
                      prefix="₹"
                    />
                  </h1>
                  <h1 className="pt-[30px] font-bold">TOTAL SPENT </h1>
                </div>

                <div>
                  <h1 className="pt-[20px] font-bold text-[30px]">
                    <CountUp
                      end={kiranab || 0}
                      start={0}
                      duration={2.75}
                      prefix="₹"
                    />
                  </h1>
                  <h1 className="pt-[30px] font-bold">BALANCE </h1>
                </div>
              </div>
              <div className="text-center font-bold text-lg pt-[20px]">
                KIRANA
              </div>
            </div>

            <div className="flex flex-col  p-[10px] bg-violet-500 w-[400px] h-[180px]  rounded-xl shadow-2xl shadow-violet-300/50">
              <div className="flex flex-row justify-between  ">
                <div>
                  <h1 className="pt-[20px] font-bold text-[30px]">
                    <CountUp
                      end={totals.vegatablesAmount || 0}
                      start={0}
                      duration={2.75}
                      prefix="₹"
                    />
                  </h1>
                  <h1 className="pt-[30px] font-bold">ESTIMATE</h1>
                </div>

                <div>
                  <h1 className="pt-[20px] font-bold text-[30px]">
                    <CountUp
                      end={vadd || 0}
                      start={0}
                      duration={2.75}
                      prefix="₹"
                    />
                  </h1>
                  <h1 className="pt-[30px] font-bold">TOTAL SPENT </h1>
                </div>

                <div>
                  <h1 className="pt-[20px] font-bold text-[30px]">
                    <CountUp
                      end={vegetablesb || 0}
                      start={0}
                      duration={2.75}
                      prefix="₹"
                    />
                  </h1>
                  <h1 className="pt-[30px] font-bold">BALANCE </h1>
                </div>
              </div>
              <div className="text-center font-bold text-lg pt-[20px]">
                VEGETABLES
              </div>
            </div>
          </div>

          <div className="flex flex-row gap-[80px] justify-center pb-[50px]">
            <div className="flex flex-col  p-[10px] bg-yellow-300 w-[400px] h-[180px]  rounded-xl shadow-2xl shadow-yellow-300/50">
              <div className="flex flex-row justify-between  ">
                <div>
                  <h1 className="pt-[20px] font-bold text-[30px]">
                    <CountUp
                      end={totals.milkAmount || 0}
                      start={0}
                      duration={2.75}
                      prefix="₹"
                    />
                  </h1>
                  <h1 className="pt-[30px] font-bold">ESTIMATE</h1>
                </div>

                <div>
                  <h1 className="pt-[20px] font-bold text-[30px]">
                    <CountUp
                      end={milkadd || 0}
                      start={0}
                      duration={2.75}
                      prefix="₹"
                    />
                  </h1>
                  <h1 className="pt-[30px] font-bold">TOTAL SPENT </h1>
                </div>

                <div>
                  <h1 className="pt-[20px] font-bold text-[30px]">
                    <CountUp
                      end={milkb || 0}
                      start={0}
                      duration={2.75}
                      prefix="₹"
                    />
                  </h1>
                  <h1 className="pt-[30px] font-bold">BALANCE </h1>
                </div>
              </div>
              <div className="text-center font-bold text-lg pt-[20px]">
                MILK
              </div>
            </div>

            <div className="flex flex-col  p-[10px] bg-cyan-500 w-[400px] h-[180px]  rounded-xl shadow-2xl shadow-cyan-300/50">
              <div className="flex flex-row justify-between  ">
                <div>
                  <h1 className="pt-[20px] font-bold text-[30px]">
                    <CountUp
                      end={totals.meatAmount || 0}
                      start={0}
                      duration={2.75}
                      prefix="₹"
                    />
                  </h1>
                  <h1 className="pt-[30px] font-bold">ESTIMATE</h1>
                </div>

                <div>
                  <h1 className="pt-[20px] font-bold text-[30px]">
                    <CountUp
                      end={meatadd || 0}
                      start={0}
                      duration={2.75}
                      prefix="₹"
                    />
                  </h1>
                  <h1 className="pt-[30px] font-bold">TOTAL SPENT </h1>
                </div>

                <div>
                  <h1 className="pt-[20px] font-bold text-[30px]">
                    <CountUp
                      end={meatb || 0}
                      start={0}
                      duration={2.75}
                      prefix="₹"
                    />
                  </h1>
                  <h1 className="pt-[30px] font-bold">BALANCE </h1>
                </div>
              </div>
              <div className="text-center font-bold text-lg pt-[20px]">
                MEAT
              </div>
            </div>
          </div>

          <div className=" flex justify-center">
            <div className="flex flex-col justify-center  p-[10px] bg-blue-500 w-[400px] h-[180px]  rounded-xl shadow-2xl shadow-cyan-300/50">
              <div className="flex flex-row justify-between  ">
                <div>
                  <h1 className="pt-[20px] font-bold text-[30px]">
                    <CountUp
                      end={totals.otherBills || 0}
                      start={0}
                      duration={2.75}
                      prefix="₹"
                    />
                  </h1>
                  <h1 className="pt-[30px] font-bold">ESTIMATE</h1>
                </div>

                <div>
                  <h1 className="pt-[20px] font-bold text-[30px]">
                    <CountUp
                      end={othersadd || 0}
                      start={0}
                      duration={2.75}
                      prefix="₹"
                    />
                  </h1>
                  <h1 className="pt-[30px] font-bold">TOTAL SPENT </h1>
                </div>

                <div>
                  <h1 className="pt-[20px] font-bold text-[30px]">
                    <CountUp
                      end={othersb || 0}
                      start={0}
                      duration={2.75}
                      prefix="₹"
                    />
                  </h1>
                  <h1 className="pt-[30px] font-bold">BALANCE </h1>
                </div>
              </div>
              <div className="text-center font-bold text-lg pt-[20px]">
                OTHERS
              </div>
            </div>
          </div>
        </div>
      </div>

      <div id="viewbills" className="flex flex-row gap-[80px] justify-center">
        <button
          className={
            buttonStates.kirana
              ? "px-4 py-2 bg-orange-400 rounded-lg text-xl font-bold"
              : "px-4 py-2 bg-green-400 rounded-lg text-xl font-bold"
          }
          onClick={() => handleClick("kirana")}
        >
          Kirana Bills
        </button>
        <button
          className={
            buttonStates.vegetables
              ? "px-4 py-2 bg-orange-400 rounded-lg text-xl font-bold"
              : "px-4 py-2 bg-green-400 rounded-lg text-xl font-bold"
          }
          onClick={() => handleClick("vegetables")}
        >
          Vegetables Bills
        </button>
        <button
          className={
            buttonStates.milk
              ? "px-4 py-2 bg-orange-400 rounded-lg text-xl font-bold"
              : "px-4 py-2 bg-green-400 rounded-lg text-xl font-bold"
          }
          onClick={() => handleClick("milk")}
        >
          Milk Bills
        </button>
        <button
          className={
            buttonStates.meat
              ? "px-4 py-2 bg-orange-400 rounded-lg text-xl font-bold"
              : "px-4 py-2 bg-green-400 rounded-lg text-xl font-bold"
          }
          onClick={() => handleClick("meat")}
        >
          Meat Bills
        </button>
        <button
          className={
            buttonStates.others
              ? "px-4 py-2 bg-orange-400 rounded-lg text-xl font-bold"
              : "px-4 py-2 bg-green-400 rounded-lg text-xl font-bold"
          }
          onClick={() => handleClick("others")}
        >
          Others Bills
        </button>
      </div>

      <div>
        {buttonStates.kirana ? (
          <table className="flex flex-col w-[98%] mx-auto  mt-10 text-wrap ">
            <thead>
              <tr className=" bg-black text-white flex justify-center text-xl font-bold">
                KIRANA BILLS
              </tr>
              <tr className="flex text-lg bg-gray-400 ">
                <th className="w-[30%]  ">Date</th>
                <th className="w-[60%]  ">Items</th>
                <th className="w-[19%] ">Amount</th>
                <th
                  className="w-[19%]  bg-red-500 cursor-pointer "
                  onClick={() => deleteKiranaAll()}
                >
                  Delete All
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-200 text-black ">
              {kirana.map((item) => {
                return (
                  <tr
                    key={item.id}
                    className=" text-[15px] text-start font-bold flex text-xl  border-b-2 border-black "
                  >
                    <td className=" w-[30%]  py-[30px] text-center  ">
                      {item.data.date}
                    </td>
                    <td className="w-[60%]  overflow-hidden py-[10px] pl-[20px] pr-[140px]   ">
                      {item.data.items}
                    </td>
                    <td className=" w-[19%] py-[30px] text-center ">
                      {item.data.amount}
                    </td>
                    <td className=" w-[19%]   py-[30px]  ">
                      <RiDeleteBin6Fill
                        className="text-red-400 mx-auto hover:text-red-700"
                        onClick={() => deletekiranaCell(item.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          ""
        )}

        {buttonStates.vegetables ? (
          <table className="flex flex-col w-[98%]  mx-auto mt-10 text-wrap ">
            <thead>
              <tr className=" bg-black text-white flex justify-center text-xl font-bold">
                VEGETABLE BILLS
              </tr>
              <tr className="flex text-lg bg-gray-400 ">
                <th className="w-[30%]  ">Date</th>
                <th className="w-[60%]  ">Items</th>
                <th className="w-[19%] ">Amount</th>
                <th
                  className="w-[19%]  bg-red-500 cursor-pointer "
                  onClick={() => deleteVegetablesAll()}
                >
                  Delete All
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-200 text-black ">
              {vegetables.map((item) => {
                return (
                  <tr
                    key={item.id}
                    className=" text-[15px] text-start font-bold flex text-xl  border-b-2 border-black "
                  >
                    <td className=" w-[30%]  py-[30px] text-center  ">
                      {item.data.date}
                    </td>
                    <td className="w-[60%]  overflow-hidden py-[10px] pl-[20px] pr-[140px]   ">
                      {item.data.items}
                    </td>
                    <td className=" w-[19%] py-[30px] text-center ">
                      {item.data.amount}
                    </td>
                    <td className=" w-[19%]   py-[30px]  ">
                      <RiDeleteBin6Fill
                        className="text-red-400 mx-auto hover:text-red-700"
                        onClick={() => deletevegetablesCell(item.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          ""
        )}

        {buttonStates.milk ? (
          <table className="flex flex-col w-[98%]  mx-auto mt-10 text-wrap ">
            <thead>
              <tr className=" bg-black text-white flex justify-center text-xl font-bold">
                MILK BILLS
              </tr>
              <tr className="flex text-lg bg-gray-400 ">
                <th className="w-[30%]  ">Date</th>
                <th className="w-[60%]  ">Items</th>
                <th className="w-[19%] ">Amount</th>
                <th
                  className="w-[19%]  bg-red-500 cursor-pointer "
                  onClick={() => deleteMilkAll()}
                >
                  Delete All
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-200 text-black ">
              {milk.map((item) => {
                return (
                  <tr
                    key={item.id}
                    className=" text-[15px] text-start font-bold flex text-xl  border-b-2 border-black "
                  >
                    <td className=" w-[30%]  py-[30px] text-center  ">
                      {item.data.date}
                    </td>
                    <td className="w-[60%]  overflow-hidden py-[10px] pl-[20px] pr-[140px]   ">
                      {item.data.items}
                    </td>
                    <td className=" w-[19%] py-[30px] text-center ">
                      {item.data.amount}
                    </td>
                    <td className=" w-[19%]   py-[30px]  ">
                      <RiDeleteBin6Fill
                        className="text-red-400 mx-auto hover:text-red-700"
                        onClick={() => deletemilkCell(item.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          ""
        )}

        {buttonStates.meat ? (
          <table className="flex flex-col w-[98%]  mx-auto mt-10 text-wrap ">
            <thead>
              <tr className=" bg-black text-white flex justify-center text-xl font-bold">
                MEAT BILLS
              </tr>
              <tr className="flex text-lg bg-gray-400 ">
                <th className="w-[30%]  ">Date</th>
                <th className="w-[60%]  ">Items</th>
                <th className="w-[19%] ">Amount</th>
                <th
                  className="w-[19%]  bg-red-500 cursor-pointer "
                  onClick={() => deleteMeatAll()}
                >
                  Delete All
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-200 text-black ">
              {meat.map((item) => {
                return (
                  <tr
                    key={item.id}
                    className=" text-[15px] text-start font-bold flex text-xl  border-b-2 border-black "
                  >
                    <td className=" w-[30%]  py-[30px] text-center  ">
                      {item.data.date}
                    </td>
                    <td className="w-[60%]  overflow-hidden py-[10px] pl-[20px] pr-[140px]   ">
                      {item.data.items}
                    </td>
                    <td className=" w-[19%] py-[30px] text-center ">
                      {item.data.amount}
                    </td>
                    <td className=" w-[19%]   py-[30px]  ">
                      <RiDeleteBin6Fill
                        className="text-red-400 mx-auto hover:text-red-700"
                        onClick={() => deletemeatCell(item.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          ""
        )}

        {buttonStates.others ? (
          <table className="flex flex-col w-[98%]  mx-auto mt-10 text-wrap ">
            <thead>
              <tr className=" bg-black text-white flex justify-center text-xl font-bold">
                OTHER BILLS
              </tr>
              <tr className="flex text-lg bg-gray-400 ">
                <th className="w-[30%]  ">Date</th>
                <th className="w-[60%]  ">Items</th>
                <th className="w-[19%] ">Amount</th>
                <th
                  className="w-[19%]  bg-red-500 cursor-pointer "
                  onClick={() => deleteOthersAll()}
                >
                  Delete All
                </th>
              </tr>
            </thead>
            <tbody className="bg-gray-200 text-black ">
              {others.map((item) => {
                return (
                  <tr
                    key={item.id}
                    className=" text-[15px] text-start font-bold flex text-xl  border-b-2 border-black "
                  >
                    <td className=" w-[30%]  py-[30px] text-center  ">
                      {item.data.date}
                    </td>
                    <td className="w-[60%]  overflow-hidden py-[10px] pl-[20px] pr-[140px]   ">
                      {item.data.items}
                    </td>
                    <td className=" w-[19%] py-[30px] text-center ">
                      {item.data.amount}
                    </td>
                    <td className=" w-[19%]   py-[30px]  ">
                      <RiDeleteBin6Fill
                        className="text-red-400 mx-auto hover:text-red-700"
                        onClick={() => deleteothersCell(item.id)}
                      />
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          " "
        )}
      </div>
    </div>
  );
};

export default Viewbills;
