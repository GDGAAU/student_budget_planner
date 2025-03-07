"use client";
import { getAllCategories } from "@/app/script/category.controller";
import { createPlan } from "@/app/script/plan.controller";
import { useState, useEffect } from "react";

export default function NameiconPage() {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const categories = await getAllCategories();
      setData(categories);

      // Initialize inputs with corresponding categories
      setInputs(
        categories.map((category) => ({
          id: category.id,
          amount: 0,
        }))
      );
    };
    fetchData();
  }, []);
  console.log("/icons/" + data[0]?.icon);

  console.log("datata", data);

  const handleInputChange = (index, value) => {
    const intValue = value.replace(/\D/g, ""); // Remove non-numeric characters
    setInputs((prevInputs) =>
      prevInputs.map((input, i) =>
        i === index ? { ...input, amount: parseFloat(intValue) || 0 } : input
      )
    );
    console.log(inputs);
  };

  const handleSubmit = async () => {
    const filteredInputs = inputs.filter((input) => input.amount > 0);
    console.log(filteredInputs);
    for (const { id, amount } of filteredInputs) {
      await createPlan(id, amount);
    }
  };

  return (
    <div className="w-[50%]">
      <div className="bg-gray-50 p-6 flex flex-col gap-2">
        {data.map(({ id, name, icon }, index) => (
          <div
            key={id}
            className="bg-gradient-to-tl from-[#ffb004] to-[#fff9a4] rounded-xl shadow-lg text-center flex p-3"
          >
            <img src={`/icons/${icon}`} alt={name} className="w-20 h-20" />
            <p className="text-lg font-semibold my-auto">{name}</p>
            <div className="my-auto ml-auto w-[30%]">
              <input
                className="rounded-3xl h-10 bg-white w-[80%] text-center"
                placeholder="0"
                value={inputs[index]?.amount || ""}
                onChange={(e) => handleInputChange(index, e.target.value)}
              />
            </div>
          </div>
        ))}
      </div>
      <button onClick={handleSubmit} className="bg-black text-white p-3">
        Submit
      </button>
    </div>
  );
}
