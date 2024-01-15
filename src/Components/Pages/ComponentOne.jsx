import React, { useState, useEffect } from "react";
import { IoIosSettings } from "react-icons/io";
import CustomToaster from "../Atoms/CustomToaster";
import IntervalModal from "../Atoms/IntervalModal";
import { useIntervalContext } from "../Hooks/IntervalContext";

export default function ComponentOne() {
  const { intervalValue } = useIntervalContext();
  const [toasters, setToasters] = useState([]);
  const [isModalOpen, setModalOpen] = useState(false);
  const [counter, setCounter] = useState(0);

  const showToast = () => {
    const newToaster = {
      id: new Date(),
      message: `${counter + 1} Toaster Shown!`,
      expiryTime: new Date() + 7, //(seconds),
      isEntityDeletable: true,
      showToaster: true,
    };
    setCounter(counter + 1);
    setToasters((prevToasters) => [...prevToasters, newToaster]);
  };

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        setToasters((prevData) => {
          return prevData.length > 0 ? prevData.slice(1) : prevData;
        });
      },
      intervalValue === null ? 7000 : intervalValue
    );

    return () => clearInterval(intervalId);
  }, []);

  const closeToaster = (toasterId) => {
    let copy = [...toasters];
    let findToast = copy.findIndex((element) => {
      return element.id === toasterId;
    });
    if (findToast >= 0) {
      copy.splice(findToast, 1);
      setToasters(copy);
    }
  };

  const checkTime = () => {
    setTimeout(
      () => {
        toasters.splice(0, 1);
        setToasters(toasters);
      },
      intervalValue === null ? 7000 : intervalValue
    );
  };

  return (
    <>
      <div className="flex justify-center my-10 gap-x-4">
        <button
          onClick={showToast}
          className="w-auto bg-[#4942E4] rounded-md px-4 py-1.5 text-white font-medium flex-shrink-0"
        >
          Show Toast
        </button>
        <button
          onClick={() => {
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-x-1.5 rounded-md p-1.5 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-[#4942E4] hover:text-white"
        >
          <IoIosSettings className="w-5 h-5" />
        </button>
      </div>

      <div className="absolute bottom-12 left-[50%]">
        {toasters.slice(0, 3).map((toaster, index) => (
          <div className="my-5" key={`${toaster.id}-${index}`}>
            <CustomToaster
              message={toaster.message}
              onClose={() => closeToaster(toaster.id)}
            />
          </div>
        ))}
      </div>
      {isModalOpen && (
        <IntervalModal
          closeModal={() => {
            setModalOpen(false);
          }}
        />
      )}
    </>
  );
}
