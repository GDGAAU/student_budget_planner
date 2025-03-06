"use client";
import { useState, useEffect } from "react";

export default function NameImagePage() {
  const [data, setData] = useState([]); // Initialize as an empty array
  const [inputs, setInputs] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/getAllCategories");
        const result = await response.json();

        if (!Array.isArray(result.categories)) {
          throw new Error("Invalid API response format");
        }

        setData(result.categories);
        setInputs(result.categories.map(({ id }) => ({ id, amount: 0 }))); // Default to "0"
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };

    fetchData();
  }, []);

  const handleInputChange = (index, value) => {
    // Ensure only integer values are accepted
    const intValue = value.replace(/\D/g, ""); // Remove non-numeric characters

    setInputs((prevInputs) =>
      prevInputs.map((input, i) =>
        i === index ? { ...input, amount: parseInt(intValue) || 0 } : input
      )
    );
    console.log(inputs);
  };
  const handleSubmit = async () => {
    //     console.log(inputs);
    //    await fetch("/api/createPlan", {
    //       method: "POST",
    //       body: JSON.stringify(inputs),
    //     });
  };

  return (
    <div>
      <div className="bg-gray-50 p-6 flex flex-col gap-2">
        {data.map(({ id, name, image }, index) => (
          <div
            key={id}
            className="bg-gradient-to-tl from-[#ffb004] to-[#fff9a4] rounded-xl shadow-lg text-center flex p-3"
          >
            <img src={image} alt={name} className="w-20 h-20" />
            <p className="text-lg font-semibold my-auto">{name}</p>
            <div className="my-auto ml-auto w-[30%]">
              <input
                className="rounded-3xl h-10 bg-white w-[80%] text-center"
                placeholder="0"
                value={inputs[index]?.amount || 0}
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
