import React, { useState } from "react";
import { useIntervalContext } from "../Hooks/IntervalContext";

const IntervalModal = ({ closeModal }) => {
  const [intervalValue, setIntervalValue] = useState("");
  const { setNewIntervalValue } = useIntervalContext();

  return (
    <div>
      <div
        className="fixed top-0 left-0 w-full h-full bg-black opacity-50"
        onClick={closeModal}
      ></div>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white px-8 py-6 rounded-md shadow-lg">
        <h2 className="text-2xl font-semibold mb-3">Set Interval</h2>
        <label className="block mb-4">
          Interval
          <input
            type="number"
            placeholder="Enter Interval value"
            onChange={(e) => setIntervalValue(e.target.value * 1000)}
            className="border border-gray-300 px-2 py-1 w-full rounded-md"
          />
        </label>
        <div className="flex justify-end">
          <button
            onClick={() => {
              if (!isNaN(intervalValue) && intervalValue > 0) {
                setNewIntervalValue(parseInt(intervalValue));
                closeModal();
              } else {
                alert("Please enter a valid positive number for the interval.");
              }
            }}
            className="bg-blue-500 text-white px-4 py-2 rounded-md mr-2"
          >
            Save
          </button>
          <button
            onClick={closeModal}
            className="bg-gray-300 text-gray-700 px-4 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default IntervalModal;
