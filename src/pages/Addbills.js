import React from "react";
import { useState } from "react";
import { db } from "../firebase";
import { addDoc, collection } from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.min.css";

import TextField from "@mui/material/TextField";

const dataObj = {
  date: "",
  category: "",
  items: "",
  amount: "",
};

const Addbills = () => {
  const [data, setData] = useState(dataObj);

  const handleSubmit = (event) => {
    const collectionRef = collection(db, `${data.category}`);
    event.preventDefault();
    if (!data.category || !data.date || !data.items || !data.amount) {
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
      addDoc(collectionRef, { data })
        .then(() => {
          toast.success("Bill Added Successfully", {
            position: "top-center",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
          });
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
    <div className="pt-[100px] bg-black h-[1000px]">
      <ToastContainer />
      <form onSubmit={handleSubmit}>
        <div className="flex flex-col w-[40%]  mx-auto rounded-lg bg-orange-300">
          <h1 className="pb-[30px] text-lg font-bold pt-[30px]">Add BILLS</h1>
          <select
            className="w-[60%] mx-auto p-3 rounded-md  font-bold  "
            value={data.category}
            onChange={(e) => setData({ ...data, category: e.target.value })}
          >
            <option value="">SELECT CATEGORY</option>
            <option value="KIRANA">KIRANA</option>
            <option value="VEGETABLES">VEGETABLES</option>
            <option value="MILK">MILK</option>
            <option value="MEAT">MEAT</option>
            <option value="OTHERS">OTHER</option>
          </select>
          <input
            className="mx-auto w-[60%] px-2 py-3 mt-4 rounded-md  font-bold  "
            type="date"
            name="date"
            onChange={(e) => setData({ ...data, date: e.target.value })}
          />

          <textarea
            onChange={(e) => setData({ ...data, items: e.target.value })}
            value={data.items}
            placeholder="Enter Items , Ex:Onions  ,Soaps etc"
            className="mx-auto w-[60%] p-2 m-4 rounded-md  font-bold  "
          ></textarea>

          <div className="flex justify-center  pb-4">
            <TextField
              onChange={(e) => setData({ ...data, amount: e.target.value })}
              value={data.amount}
              className="bg-white w-[60%] rounded-md  text-black border-black"
              id="outlined-basic"
              label="Add Amount"
              variant="outlined"
            />
          </div>

          <div className=" my-7 mx-auto ">
            <button
              type="submit"
              className="px-14 py-5 mx-2 font-bold hover:shadow-lg hover:bg-blue-900 text-white bg-blue-500 rounded-[10px]"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Addbills;
