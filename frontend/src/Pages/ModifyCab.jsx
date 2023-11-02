import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
// import { Button, Modal, TextField } from '@mui/material';
import BasicModal from "../Components/BasicModal";
import "halfmoon/css/halfmoon.min.css";
const ModifyCab = () => {
  const [cabs, setCabs] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editedDetails, setEditedDetails] = useState({});
  const [add,setadd]=useState(false);
  useEffect(() => {
    axios.get("http://localhost:8800/api/cab/all").then((response) => {
      setCabs(response.data);
    });
  }, [isModalOpen]);

  const handleEdit = (cab) => {
    setadd(false);
    setEditedDetails(cab);
    setIsModalOpen(true);
  };

  const handleClose = () => {
    setIsModalOpen(false);
  };


  const renderTableHeader = () => {
    return (
      <thead>
        <tr>
          <th>Car Name</th>
          <th className="text-center">Driver Name</th>
          <th className="text-center">Driver Contact Number</th>
          <th className="text-center">Price Per Minute</th>
          <th className="text-center">Vehicle Number</th>
          <th className="text-end">Actions</th>
        </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    return (
      <tbody>
        {cabs.map((cab) => {
          return (
            <tr key={cab._id}>
              <td>{cab.name}</td>
              <td className="text-center">{cab.driverName}</td>
              <td className="text-center">{cab.contactNo}</td>
              <td className="text-center">{cab.pricePerMinute}</td>
              <td className="text-center">{cab.vehicleNumber}</td>
              <td className="text-end">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleEdit(cab)}
                >
                  Edit
                </button>
                <button
                  type="button"
                  className="btn btn-danger ms-1"
                  onClick={() => handleDelete(cab._id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
        {isModalOpen && add && (
          <BasicModal
            cab={{}}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            btname="Add"
          />
        )}
        {isModalOpen && !add && (
          <BasicModal
            cab={editedDetails}
            isModalOpen={isModalOpen}
            setIsModalOpen={setIsModalOpen}
            btname="Edit"
          />
        )}
      </tbody>
    );
  };

  const handleDelete = (id) => {
    axios
      .delete(`http://localhost:8800/api/cab/${id}`)
      .then((response) => {
        axios.get("http://localhost:8800/api/cab").then((response) => {
          setCabs(response.data);
        });
      })
      .catch((error) => {
        console.error("Error deleting the car:", error);
      });
  };
  const handleAddCab = ()=>{
    setadd(true);
    setIsModalOpen(true);
  }
  return (
    <div className="container">
      <h1>Cabs</h1>
      <button onClick={handleAddCab} className="btn btn-success">Add Cabs</button>
      <hr />
      <div className="card border-0">
        <table className="table table-borderless">
          {renderTableHeader()}
          {renderTableBody()}
        </table>
      </div>
    </div>
  );
};

export default ModifyCab;
