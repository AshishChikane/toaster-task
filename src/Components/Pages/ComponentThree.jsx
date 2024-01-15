import React, { useState, useEffect } from "react";
import { Formik, Form, Field } from "formik";
import { useIntervalContext } from "../Hooks/IntervalContext";
import Box from "../Atoms/Box";
import CustomToaster from "../Atoms/CustomToaster";
import Table from "../Atoms/Table";

const initialValues = {
  countDown: "",
};

const columnHeaders = [
  {
    label: "id",
    value: "id",
  },
  {
    label: "Name",
    value: "name",
  },
  {
    label: "Status",
    value: "status",
  },
];

const ComponentThree = () => {
  const { intervalValue, setNewIntervalValue } = useIntervalContext();
  const [counter, setCounter] = useState(intervalValue / 1000);
  const [showToaster, setShowToaster] = useState(false);
  const [tableValues, setTableValues] = useState([]);
  const [showTable, setShowTable] = useState(false);

  useEffect(() => {
    counter > 0 && setTimeout(() => setCounter(counter - 1), 1000);
    if (counter === 0 && tableValues.length !== 0) {
      setShowTable(true);
      setShowToaster(false);
    }
  }, [counter]);

  const getCountryData = async () => {
    try {
      const response = await fetch(
        "https://api.knowmee.co/api/v1/master/get-country-list"
      );
      const data = await response.json();

      const newRows = data?.responseData.map((country, i) => [
        country.country_id,
        country.country_name,
        country.status,
      ]);
      setTableValues(newRows);
    } catch (error) {
      console.error("API Error:", error);
    }
  };

  const onSubmit = (values, { resetForm }) => {
    if (!isNaN(values.countDown) && values.countDown > 0) {
      setNewIntervalValue(parseInt(values.countDown * 1000));
    }
    setShowToaster(true);
    setCounter(parseInt(values.countDown));
    getCountryData();
    resetForm();
  };

  return (
    <div className="flex justify-center my-10 gap-y-4 items-center">
      <div className="absolute bottom-12 left-[50%]">
        {showToaster && (
          <CustomToaster
            message={`Toaster!! : ${counter} ! `}
            onClose={() => setShowToaster(false)}
          />
        )}
      </div>
      {showTable ? (
        <Table columnHeaders={columnHeaders} data={tableValues}></Table>
      ) : (
        <div>
          <Box>
            <Formik initialValues={initialValues} onSubmit={onSubmit}>
              {(formik) => {
                const { values } = formik;
                return (
                  <Form>
                    <div className="m-8">
                      <div className="mb-1-block">
                        <label className="text-sm font-medium">
                          Enter Countdown (seconds)
                        </label>
                      </div>
                      <Field
                        type="number"
                        name="countDown"
                        placeholder="Enter seconds"
                        className="border border-gray-400 px-3 py-1.5 rounded-md mr-2 mb-4"
                      />

                      <div className="mb-1-block">
                        <button
                          type="submit"
                          disabled={!values.countDown}
                          className={`${
                            !values.countDown
                              ? "bg-gray-400 cursor-not-allowed"
                              : "bg-[#4942E4]"
                          } rounded-md px-4 py-1.5 w-auto text-white font-medium`}
                        >
                          Start Timer
                        </button>
                      </div>
                    </div>
                  </Form>
                );
              }}
            </Formik>
          </Box>
        </div>
      )}
    </div>
  );
};

export default ComponentThree;
