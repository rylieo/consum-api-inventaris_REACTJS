import React, { useState } from "react";
import ModalDelete from "./ModalDelete";
import ModalEdit from "./ModalEdit";
import ModalAdd from "./ModalAdd";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

export default function Table({
  dataTh,
  dataTd,
  coloumDB,
  buttonData,
  endpoints,
  coloumnDetail,
  judulModalEdit,
  inputData,
  onCreate,
}) {
  const [isOpenModalDelete, setisOpenModalDelete] = useState(false);
  const [endpointsReplaced, setEndpointsReplaced] = useState({});
  const [isOpenModalEdit, setisOpenModalEdit] = useState(false);
  const [isOpenModalAdd, setisOpenModalAdd] = useState(false);

  const navigate = useNavigate();

  function handleModalEdit(id) {
    const detailReplaced = endpoints["detail"].replace("{id}", id);
    const updateReplaced = endpoints["update"].replace("{id}", id);
    setEndpointsReplaced({ detail: detailReplaced, update: updateReplaced });
    setisOpenModalEdit(true);
  }

  function handleModalDelete(id) {
    const detailReplaced = endpoints["detail"].replace("{id}", id);
    const deleteReplaced = endpoints["delete"].replace("{id}", id);
    setEndpointsReplaced({ detail: detailReplaced, delete: deleteReplaced });
    setisOpenModalDelete(true);
  }

  function handleModalAdd() {
    setEndpointsReplaced({ create: endpoints["create"] });
    setisOpenModalAdd(true);
  }

  function handleRestore(id) {
    const endpointRestore = endpoints["restore"].replace("{id}", id);
    axios
      .get(endpointRestore, {
        headers: {
          Authorization: "bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => navigate("/stuff"))
      .catch((err) => console.log(err));
  }

  return (
    <>
      <div className="relative shadow-md sm:rounded-lg px-20 py-10 overflow-x-hidden">
        <div className="flex justify-end mb-5 space-x-2">
          {buttonData.includes("create") && (
            <button
              onClick={handleModalAdd}
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-green-500 border border-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-200"
            >
              Create
            </button>
          )}
          {buttonData.includes("trash") && (
            <Link
              to="/stuff/trash"
              className="inline-flex items-center px-4 py-2 text-sm font-medium text-white bg-orange-500 border border-orange-500 rounded-lg hover:bg-orange-600 focus:outline-none focus:ring-4 focus:ring-orange-200"
            >
              Trash
            </Link>
          )}
        </div>

        <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              {dataTh.map((data, index) => (
                <th key={index} scope="col" className="px-6 py-3">
                  {data}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {Array.isArray(dataTd) && dataTd.length > 0 ? (
              dataTd.map((value, index) => (
                <tr
                  key={value.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="px-6 py-4 text-right">{index + 1}.</td>
                  {Object.entries(coloumDB).map(([i, v]) => (
                    <td key={i} className="px-6 py-4">
                      {!v
                        ? value[i]
                        : value[i.replace(/[!@#$%^&]/, "")]?.[v] || "0"}
                    </td>
                  ))}
                  <td className="px-6 py-4 flex space-x-2">
                    {buttonData.includes("edit") && (
                      <button
                        onClick={() => handleModalEdit(value.id)}
                        type="button"
                        className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-green-500 border border-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-200"
                      >
                        Edit
                      </button>
                    )}
                    {buttonData.includes("delete") && (
                      <button
                        onClick={() => handleModalDelete(value.id)}
                        type="button"
                        className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-red-500 border border-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-200"
                      >
                        Delete
                      </button>
                    )}
                    {buttonData.includes("restore") && (
                      <button
                        onClick={() => handleRestore(value.id)}
                        type="button"
                        className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-green-500 border border-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus:ring-4 focus:ring-green-200"
                      >
                        Restore
                      </button>
                    )}
                    {buttonData.includes("permanent-delete") && (
                      <button
                        type="button"
                        className="inline-flex items-center px-3 py-1 text-sm font-medium text-white bg-red-500 border border-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-4 focus:ring-red-200"
                      >
                        Permanent Delete
                      </button>
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={dataTh.length + 1} className="text-center py-4">
                  No data available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <ModalDelete
        isOpen={isOpenModalDelete}
        closeModal={() => setisOpenModalDelete(false)}
        endpoints={endpointsReplaced}
        coloumnDetail={coloumnDetail}
      />
      <ModalEdit
        isOpen={isOpenModalEdit}
        closeModal={() => setisOpenModalEdit(false)}
        judulModal={judulModalEdit}
        inputData={inputData}
        endpoints={endpointsReplaced}
      />
      <ModalAdd
        isOpen={isOpenModalAdd}
        closeModal={() => setisOpenModalAdd(false)}
        judulModal={judulModalEdit}
        inputData={inputData}
        endpoints={endpointsReplaced} // pastikan endpointsReplaced digunakan
        onCreate={onCreate} // tambahkan properti onCreate di sini
      />
    </>
  );
}
