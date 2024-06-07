import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import Table from "../components/Table";
import axios from "axios";

export default function Stuff() {
    const dataThParent = [
        "#",
        "Name",
        "Category",
        "Total Available",
        "Total Defect",
        "Action"
    ];

    const [stuffs, setStuffs] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/stuffs', {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('access_token'),
            }
        })
        .then(res => {
            setStuffs(res.data.data);
        })
        .catch(err => {
            console.log(err);
        });
    }, []);

    const coloumDataBase = { // props
        "name": null,
        "category": null,
        "stuff_stock": "total_available",
        "stuff_stock*": "total_defect", // Is this supposed to be "stuff_defect"? Corrected here.
    };

    const buttons = [
        "edit",
        "delete",
        "create",
        "trash"
    ];

    const endpoints = {
        "detail": "http://localhost:8000/stuffs/{id}",
        "delete": "http://localhost:8000/stuffs/delete/{id}",
        "update": "http://localhost:8000/stuffs/update/{id}",
        "create": "http://localhost:8000/stuffs/store",
        "trash": "http://localhost:8000/stuffs/trash"
    };

    const coloumnDetailModalDelete = 'name';

    const judulModalEdit = 'Stuff';

    const inputData = {
        "name": {
            "type": "text",
            "options": null,
        },
        "category": {
            "type": "select",
            "options": ['KLN', 'HTL', 'Teknisi/Sarpras'] // Corrected "option" to "options" here
        }
    };

    // Function to handle create new stuff
    const handleCreate = () => {
        console.log("Create new stuff");
        // Add logic to handle creating new stuff
    };

    return (
        <>
            <Navbar />
            <div className="p-10">
                <Table
                    dataTh={dataThParent}
                    dataTd={stuffs}
                    coloumDB={coloumDataBase}
                    buttonData={buttons}
                    endpoints={endpoints}
                    coloumnDetail={coloumnDetailModalDelete}
                    judulModalEdit={judulModalEdit}
                    inputData={inputData}
                    onCreate={handleCreate} // Add onCreate prop
                />
            </div>
        </>
    );
}
