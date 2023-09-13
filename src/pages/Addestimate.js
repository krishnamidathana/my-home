import React, { useEffect } from "react";
import { useState, useRef } from "react";
import { db } from "../firebase";
import { doc, updateDoc } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

const Addestimate = () => {
  const ref0 = useRef(null);
  const ref1 = useRef(null);
  const ref2 = useRef(null);
  const ref3 = useRef(null);
  const ref4 = useRef(null);
  const ref5 = useRef(null);

  const dataObj = {
    addOverAllAmount: "",
    otherBills: "",
    kiranaAmount: "",
    vegatablesAmount: "",
    milkAmount: "",
    meatAmount: "",
  };
  const [data, setData] = useState(dataObj);
  const [displayTotal, setDisplayTotal] = useState();
  let othersv, kiranav, vegetablesv, milkv, meatv;

  useEffect(() => {
    othersv = parseInt(data.otherBills) || 0;
    kiranav = parseInt(data.kiranaAmount) || 0;
    vegetablesv = parseInt(data.vegatablesAmount) || 0;
    milkv = parseInt(data.milkAmount) || 0;
    meatv = parseInt(data.meatAmount) || 0;
    const total = othersv + kiranav + vegetablesv + milkv + meatv;
    setDisplayTotal(total);
  }, [data]);

  const handleTotals = (event) => {
    const docRef = doc(db, "TOTALS", "gr27oRxD0MX7MLeX44cx");
    event.preventDefault();
    if (
      !data.addOverAllAmount ||
      !data.otherBills ||
      !data.kiranaAmount ||
      !data.vegatablesAmount ||
      !data.milkAmount ||
      !data.meatAmount
    ) {
      toast.error("Please fill all input feilds", {
        position: "top-center",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      updateDoc(docRef, data)
        .then(() => {
          toast.success("Estimate Added Successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
          setData("");
          ref0.current.value = "";
          ref1.current.value = "";
          ref2.current.value = "";
          ref3.current.value = "";
          ref4.current.value = "";
          ref5.current.value = "";
        })

        .catch((error) => {
          toast.error(error, {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
        });
    }
  };

  return (
    <div className="pt-[100px] px-[50px] bg-black h-[700px]">
      <ToastContainer />
      <div className="flex flex-row">
        <div>
          <form onSubmit={handleTotals}>
            <div className="flex flex-col w-full  px-[40px]  bg-blue-300 rounded-md">
              <h1 className="pb-[30px] text-2xl font-bold pt-[20px] ">
                Add ESTIMATE
              </h1>

              <div className="flex  flex-row pb-[30px] ">
                <div className="flex  flex-col  items-start">
                  <label
                    htmlFor="otherBills"
                    className="font-bold  flex flex-col"
                  >
                    {" "}
                    Add Total Bills Estimate
                  </label>
                  <input
                    className="appearance-none bg-yellow-300 w-[70%] ml-[50px]  px-2 focus:border-none outline-none overflow:-moZ-scrollbars-none py-3 mt-4 rounded-md  font-bold  "
                    type="text"
                    ref={ref0}
                    name="addOverAllAmount"
                    id="addOverAllAmount"
                    onChange={(e) =>
                      setData({ ...data, addOverAllAmount: e.target.value })
                    }
                  />
                </div>

                <div className="flex  flex-col  items-start">
                  <label
                    htmlFor="otherBills"
                    className="font-bold flex flex-col"
                  >
                    Add other fixed Bills Estimate
                  </label>
                  <input
                    className="appearance-none w-[70%] ml-[50px] px-2 focus:border-none outline-none overflow:-moZ-scrollbars-none py-3 mt-4 rounded-md  font-bold  "
                    type="text"
                    ref={ref1}
                    name="otherBills"
                    id="otherBills"
                    onChange={(e) =>
                      setData({ ...data, otherBills: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex  flex-row pb-[30px] ">
                <div className="flex  flex-col  items-start">
                  <label
                    htmlFor="kiranaAmount"
                    className="font-bold flex flex-col"
                  >
                    {" "}
                    Add Kirana Estimate
                  </label>
                  <input
                    className="appearance-none w-[70%] ml-[50px] px-2 focus:border-none outline-none overflow:-moZ-scrollbars-none py-3 mt-4 rounded-md  font-bold  "
                    type="text"
                    ref={ref2}
                    name="kiranaAmount"
                    id="kiranaAmount"
                    onChange={(e) =>
                      setData({ ...data, kiranaAmount: e.target.value })
                    }
                  />
                </div>

                <div className="flex  flex-col  items-start">
                  <label
                    htmlFor="vegatablesAmount"
                    className="font-bold flex flex-col"
                  >
                    {" "}
                    Add Vegetables Estimate
                  </label>
                  <input
                    className="appearance-none w-[70%] ml-[50px] px-2 focus:border-none outline-none overflow:-moZ-scrollbars-none py-3 mt-4 rounded-md  font-bold  "
                    type="text"
                    ref={ref3}
                    name="vegatablesAmount"
                    id="vegatablesAmount"
                    onChange={(e) =>
                      setData({ ...data, vegatablesAmount: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className="flex  flex-row pb-[30px] ">
                <div className="flex  flex-col  items-start">
                  <label
                    htmlFor="milkAmount"
                    className="font-bold flex flex-col"
                  >
                    {" "}
                    Add Milk Estimate
                  </label>
                  <input
                    className="appearance-none w-[70%] ml-[50px] px-2 focus:border-none outline-none overflow:-moZ-scrollbars-none py-3 mt-4 rounded-md  font-bold  "
                    type="text"
                    ref={ref4}
                    name="milkAmount"
                    id="milkAmount"
                    onChange={(e) =>
                      setData({ ...data, milkAmount: e.target.value })
                    }
                  />
                </div>

                <div className="flex  flex-col  items-start">
                  <label
                    htmlFor="meatAmount"
                    className="font-bold flex flex-col"
                  >
                    {" "}
                    Add Meat Estimate
                  </label>
                  <input
                    className="appearance-none w-[70%] ml-[50px] px-2 focus:border-none outline-none overflow:-moZ-scrollbars-none py-3 mt-4 rounded-md  font-bold  "
                    type="text"
                    ref={ref5}
                    name="meatAmount"
                    id="meatAmount"
                    onChange={(e) =>
                      setData({ ...data, meatAmount: e.target.value })
                    }
                  />
                </div>
              </div>

              <div className=" my-7 mx-auto ">
                <button
                  type="submit"
                  className="px-14 py-5 mx-2 font-bold hover:shadow-lg hover:bg-green-500 text-white bg-blue-500 rounded-[10px]"
                >
                  SAVE
                </button>
              </div>
            </div>
          </form>
        </div>
        <div className="flex flex-col font-bold w-[30%] h-[300px] text-white  ml-[180px] justify-center mt-[100px]">
          <h1 className=" text-[30px]">CALCULATED TOTAL ESTIMATE</h1>
          <p className="text-[40px] ">{displayTotal}</p>
        </div>
      </div>
    </div>
  );
};

export default Addestimate;
