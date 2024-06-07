import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import axios from "axios";

export default function User() {
  const dataThParent = ["#", "Username", "Email", "Password", "Role" , "Action"];

  const [users, setUsers] = useState([]);
  useEffect(() => {
    axios
      .get("http://localhost:8000/users", {
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      })
      .then((res) => {
        setUsers(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const columnDatabase = {
    username: null,
    email: null,
    password: null,
    role: null,
  };

  const buttons = ["edit", "delete", "create"];

  const endpoints = {
    detail: "http://localhost:8000/users/{id}",
    delete: "http://localhost:8000/users/delete/{id}",
    update: "http://localhost:8000/users/update/{id}",
    create: "http://localhost:8000/users/store",
    trash: "http://localhost:8000/users/trash",
  };

  const coloumnDetailModalDelete = "username";

  const judulModalEdit = "User";

  const inputData = {
    username: {
      type: "text",
      options: null,
    },
    email: {
      type: "text",
      options: null,
    },
    password: {
      type: "password",
      options: null,
    },
    role: {
      type: "select",
      options: ["staff", "admin"],
    },
  };

  // Fungsi untuk menangani edit data pengguna
  const handleEdit = (id) => {
    console.log("Edit user with ID:", id);
    // Di sini Anda dapat menambahkan logika untuk menangani edit data pengguna
  };

  // Fungsi untuk menangani hapus data pengguna
  const handleDelete = (id) => {
    console.log("Delete user with ID:", id);
    // Di sini Anda dapat menambahkan logika untuk menangani hapus data pengguna
  };

  // Fungsi untuk menangani tambah data pengguna
  const handleCreate = () => {
    console.log("Create new user");
    // Di sini Anda dapat menambahkan logika untuk menangani tambah data pengguna
  };

  return (
    <>
      <Navbar />
      <div className="p-10">
        <Table
          dataTh={dataThParent}
          dataTd={users}
          coloumDB={columnDatabase} // Perbaikan penulisan properti di sini
          buttonData={buttons}
          endpoints={endpoints}
          coloumnDetail={coloumnDetailModalDelete}
          judulModalEdit={judulModalEdit}
          inputData={inputData}
          onEdit={handleEdit} // Menambahkan properti onEdit
          onDelete={handleDelete} // Menambahkan properti onDelete
          onCreate={handleCreate} // Menambahkan properti onCreate
        />
      </div>
    </>
  );
}
