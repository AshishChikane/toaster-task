import React, { useState } from "react";
import Box from "./Box";

const Table = ({ columnHeaders = [], data }) => {
  const [currentPage, setCurrentPage] = useState(0);
  const rowsPerPageOptions = [5, 10, 20]; // You can customize these options
  const [rowsPerPage, setRowsPerPage] = useState(rowsPerPageOptions[0]);

  const totalRows = data.length;
  const totalPages = Math.ceil(totalRows / rowsPerPage);

  const paginatedData = data.slice(
    currentPage * rowsPerPage,
    (currentPage + 1) * rowsPerPage
  );

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  const handleRowsPerPageChange = (value) => {
    setRowsPerPage(value);
    setCurrentPage(0);
  };

  return (
    <Box>
      <div className="m-4 mx-16">
        <span className="font-medium text-md">Table Data</span>
        <table className="border-collapse border w-full rounded-md">
          <thead>
            <tr>
              {columnHeaders.map((header, index) => (
                <th key={index} className="border p-2">
                  {header.label}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {paginatedData.map((row, rowIndex) => (
              <tr key={rowIndex}>
                {Object.values(row).map((cell, cellIndex) => (
                  <td key={cellIndex} className="border p-2">
                    {cell}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
        <Pagination
          totalPages={totalPages}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          rowsPerPageOptions={rowsPerPageOptions}
          rowsPerPage={rowsPerPage}
          onRowsPerPageChange={handleRowsPerPageChange}
        />
      </div>
    </Box>
  );
};

const Pagination = ({
  totalPages,
  currentPage,
  onPageChange,
  rowsPerPageOptions,
  rowsPerPage,
  onRowsPerPageChange,
}) => {
  return (
    <div className="flex justify-end items-center mt-3">
      <span className="mr-2">Rows per page:</span>
      <select
        value={rowsPerPage}
        onChange={(e) => onRowsPerPageChange(parseInt(e.target.value))}
        className="border p-1 rounded-md"
      >
        {rowsPerPageOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <span className="ml-4">
        Page {currentPage + 1} of {totalPages}
      </span>
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 0}
        className="ml-4 px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
      >
        Previous
      </button>
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages - 1}
        className="ml-2 px-4 py-2 bg-gray-300 text-gray-700 rounded-md"
      >
        Next
      </button>
    </div>
  );
};

export default Table;
