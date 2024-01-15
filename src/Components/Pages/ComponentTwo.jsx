import React, { useEffect, useState } from "react";
import { IoIosSettings } from "react-icons/io";
import { Formik, Form, Field } from "formik";
import IntervalModal from "../Atoms/IntervalModal";
import Box from "../Atoms/Box";
import CustomToaster from "../Atoms/CustomToaster";
import { useIntervalContext } from "../Hooks/IntervalContext";

const initialValues = {
  additionalInput: "",
};

export default function ComponentTwo() {
  const [isModalOpen, setModalOpen] = useState(false);
  const { intervalValue } = useIntervalContext();
  const [toastCount, setToastCount] = useState(1);
  const [toasters, setToasters] = useState([]);
  const [showToaster, setShowToaster] = useState(false);

  const onSubmit = (values, { resetForm }) => {
    setShowToaster(true);

    resetForm({ values: initialValues });

    const newToaster = {
      id: new Date(),
      message: `${toastCount + 1} : ${values.additionalInput}!`,
      expiryTime: new Date() + 7, //(seconds),
      isEntityDeletable: true,
      showToaster: true,
    };
    setToastCount(toastCount + 1);
    setToasters((prevToasters) => [...prevToasters, newToaster]);
  };

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

  useEffect(() => {
    const intervalId = setInterval(
      () => {
        setToasters((prevData) => {
          let currentTime = prevData.find; //currenttime //7 seconds
          return prevData.length > 0 ? prevData.slice(1) : prevData;
        });
      },
      intervalValue === null ? 7000 : intervalValue
    );

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="flex justify-center my-10 gap-y-4 items-center">
      <div>
        <Box>
          <Formik initialValues={initialValues} onSubmit={onSubmit}>
            {(formik) => {
              return (
                <Form>
                  <div className="m-8">
                    <div className="mb-1-block">
                      <label className="text-sm font-medium">
                        Enter Custom Toast Text
                      </label>
                    </div>
                    <Field
                      type="text"
                      name="additionalInput"
                      placeholder="Enter here"
                      className="border border-gray-400 px-3 py-1.5 rounded-md mr-2 mb-4"
                    />

                    <div className="mb-1-block">
                      <button
                        type="submit"
                        className="bg-[#4942E4] rounded-md px-4 py-1.5 w-auto text-white font-medium"
                      >
                        Show Toast
                      </button>
                    </div>
                  </div>
                </Form>
              );
            }}
          </Formik>
        </Box>
      </div>
      <div className="ml-4">
        <button
          onClick={() => {
            setModalOpen(true);
          }}
          className="inline-flex items-center gap-x-1.5 rounded-md p-1.5 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-[#4942E4] hover:text-white"
        >
          <IoIosSettings className="w-5 h-5" />
        </button>
      </div>

      {isModalOpen && (
        <IntervalModal
          closeModal={() => {
            setModalOpen(false);
          }}
        />
      )}

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
    </div>
  );
}
