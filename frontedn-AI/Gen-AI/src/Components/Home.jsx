import React, { useState } from "react";
import axios from "axios";

export default function Home() {
  const [data, setData] = useState({ question: "" });
  const [output, setOutput] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currIndex, setCurrIndex] = useState(0);
  const [selected, setSelected] = useState(false);
  const [answered, setAnswered] = useState(null);
  const [token, setToken] = useState(0);

  const handelInput = (e) => {
    setData({ question: e.target.value });
  };

  const handelsubmit = async (e) => {
    e.preventDefault();
    if (!data.question) return;
    if (token >= 3) return;

    setLoading(true);
    try {
      const resp = await axios.post("http://localhost:4000/AI", { data });
      setOutput(resp.data);
      setCurrIndex(0);
      setSelected(false);
      setToken((pre) => pre + 1);
      setLoading(false);

      if (token === 2) {
        alert("You exceeded your current quota, please check your plan and billing details");
      }
      if (resp.data == "") {
        alert("You exceeded your current quota try after some time~");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handelNextbtn = () => {
    setCurrIndex((prev) => prev + 1);
    setSelected(false);
  };

  const handelPrevbtn = () => {
    setCurrIndex((prev) => prev - 1);
    setSelected(false);
  };

  const handelSelect = (optionIndex) => {
    if (selected) return;
    setAnswered(optionIndex);
    setSelected(true);
  };

  return (
    <div className="min-h-screen bg-gray-200 flex flex-col items-center justify-start pt-16 px-4">
      {/* Search Bar */}
      <form
        onSubmit={handelsubmit}
        className="flex flex-col sm:flex-row w-full max-w-md bg-white rounded-xl shadow-lg overflow-hidden"
      >
        <input
          type="text"
          value={data.question}
          onChange={handelInput}
          placeholder="Search topic..."
          className="flex-1 px-4 py-3 sm:px-5 text-sm sm:text-base outline-none text-gray-700"
        />
        <button
          disabled={token === 2}
          type="submit"
          className={`w-full sm:w-auto ${
            token === 1
              ? "bg-gray-500 cursor-not-allowed transition px-6 py-3 text-sm sm:text-base"
              : "bg-blue-600 text-white px-6 py-3 hover:bg-blue-700 transition text-sm sm:text-base"
          }`}
        >
          {loading ? "..." : "Go"}
        </button>
      </form>

      {/* Loading state */}
      {loading && (
        <div className="mt-10 w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      )}

      {/* Cards */}
      {!loading && output[currIndex] && (
        <div className="mt-10 w-full max-w-md px-1 sm:px-0">
          <h2 className="mb-4 text-lg sm:text-xl font-semibold text-center">
            {output[currIndex].question}
          </h2>

          <ol className="space-y-3">
            {output[currIndex].options.map((option, optionIndex) => {
              const correctIndex = output[currIndex].correctAnswer;
              let bg = "bg-white hover:bg-blue-100";
              if (selected) {
                if (optionIndex === correctIndex) {
                  bg = "bg-green-600 text-white";
                } else if (optionIndex === answered) {
                  bg = "bg-red-500 text-white";
                }
              }

              return (
                <li
                  key={optionIndex}
                  onClick={() => handelSelect(optionIndex)}
                  className={`border rounded-lg py-2 sm:py-3 px-3 sm:px-4 cursor-pointer transition shadow-sm ${bg}`}
                >
                  {option}
                </li>
              );
            })}
          </ol>

          {/* Buttons next,prev */}
          <div className="flex gap-4 justify-between mt-6">
            <button
              onClick={handelPrevbtn}
              disabled={currIndex === 0}
              className={`flex-1 px-4 py-2 rounded-lg text-white transition ${
                currIndex === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700"
              }`}
            >
              Prev
            </button>

            <button
              onClick={handelNextbtn}
              disabled={currIndex === output.length - 1}
              className={`flex-1 px-4 py-2 rounded-lg text-white transition ${
                currIndex === output.length - 1
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-green-600 hover:bg-green-700"
              }`}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
