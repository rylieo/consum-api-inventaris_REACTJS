import React, { useState } from "react";
import axios from "axios";

export default function ModalAdd({ isOpen, closeModal, judulModal, inputData, endpoints }) {
    const [dataDetail, setDataDetail] = useState({});
    const [alertMessage, setAlertMessage] = useState(null);
    const [alertType, setAlertType] = useState(null);

    if (!isOpen) {
        return null;
    }

    const handleStore = (e) => {
        e.preventDefault();
        axios.post(endpoints.create, dataDetail, {
            headers: {
                Authorization: 'Bearer ' + localStorage.getItem('access_token'),
            },
        })
            .then((res) => {
                setAlertType('success');
                setAlertMessage('Data berhasil ditambahkan!');
                setTimeout(() => {
                    setAlertMessage(null);
                    setAlertType(null);
                    window.location.reload();
                }, 2000);
            })
            .catch((err) => {
                console.log(err);
                let message = "Terjadi kesalahan: ";
                if (err.response) {
                    switch (err.response.status) {
                        case 400:
                            message += "The name field is required.";
                            break;
                        case 401:
                            message += "Unauthorized access.";
                            break;
                        case 403:
                            message += "Forbidden access.";
                            break;
                        case 404:
                            message += "Resource not found.";
                            break;
                        default:
                            message += `Server responded with status code ${err.response.status}`;
                    }
                } else if (err.request) {
                    message += "No response from server.";
                } else {
                    message += err.message;
                }
                setAlertType('danger');
                setAlertMessage(message);
            });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setDataDetail((prevDataDetail) => ({
            ...prevDataDetail,
            [name]: value,
        }));
    };

    const Alert = () => {
        if (!alertMessage) return null;
        return (
            <div
                className={`flex items-center p-4 mb-4 text-sm text-${alertType}-800 border border-${alertType}-300 rounded-lg bg-${alertType}-50 dark:bg-gray-800 dark:text-${alertType}-400 dark:border-${alertType}-800`}
                role="alert"
            >
                <svg
                    className="flex-shrink-0 inline w-4 h-4 mr-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                >
                    <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                </svg>
                <span className="sr-only">Info</span>
                <div>
                    <span className="font-medium">
                        {alertType.charAt(0).toUpperCase() + alertType.slice(1)} alert!
                    </span>{" "}
                    {alertMessage}
                </div>
            </div>
        );
    };

    return (
        <div
            id="authentication-modal"
            tabIndex="-1"
            aria-hidden="true"
            className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50"
        >
            <div className="relative p-4 w-full max-w-md max-h-full">
                <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                            Add Data {judulModal}
                        </h3>
                        <button
                            onClick={closeModal}
                            type="button"
                            className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ml-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                            data-modal-hide="authentication-modal"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                    </div>
                    <div className="p-4 md:p-5">
                        {alertMessage && <Alert />}
                        <form className="space-y-4" onSubmit={handleStore}>
                            {Object.entries(inputData).map(([index, item]) => (
                                <div className="mb-6" key={index}>
                                    {item.type === "select" ? (
                                        <div>
                                            <label
                                                htmlFor={index}
                                                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                                            >
                                                {index}
                                            </label>
                                            <select
                                                id={index}
                                                name={index}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                onChange={handleChange}
                                            >
                                                <option hidden disabled selected>
                                                    Select {index}
                                                </option>
                                                {item.options.map((opt, idx) => (
                                                    <option key={idx} value={opt}>
                                                        {opt}
                                                    </option>
                                                ))}
                                            </select>
                                        </div>
                                    ) : (
                                        <div>
                                            <label
                                                htmlFor={index}
                                                className="block text-sm font-medium text-gray-900 dark:text-white capitalize mb-3"
                                            >
                                                {index}
                                            </label>
                                            <input
                                                type={item.type}
                                                name={index}
                                                id={index}
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                                                onChange={handleChange}
                                            />
                                        </div>
                                    )}
                                </div>
                            ))}
                            <button
                                type="submit"
                                className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                            >
                                Add Data
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}
