import React from "react";
import Modal from "@mui/material/Modal";
import { useState } from "react";
import "halfmoon/css/halfmoon.min.css";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const BasicModal = (props) => {
  const { cab, isModalOpen, setIsModalOpen } = props;
  const handleClose = () => setIsModalOpen(false);
  const [updatedCab, setUpdatedCab] = useState({ ...cab });

  const handleChange = (name, value) => {
    setUpdatedCab({
      ...updatedCab,
      [name]: value,
    });
  };

  const handleCreateCab = async ( )=>{
    await axios
      .post(`http://localhost:8800/api/cab/`, updatedCab)
      .then((response) => {
         console.log(response)
        setIsModalOpen(false);
         toast.success("Cab Created Successfully !", {
           position: "top-center",
           autoClose: 1000,
           hideProgressBar: false,
           closeOnClick: true,
           draggable: true,
           progress: undefined,
           theme: "light",
         });
      })
      .catch((error) => {
        console.error("Error updating the cab:", error);
      });
  }
  
  const handleupdateCab = async () =>{
  
    console.log(updatedCab,"update")
    await axios
      .patch(`http://localhost:8800/api/cab/${updatedCab._id}`, updatedCab)
      .then((response) => {
        setIsModalOpen(false);
      })
      .catch((error) => {
        console.error("Error updating the cab:", error);
      });

  }
  const handleSaved = (e) => {
    e.preventDefault();
    if(props.btname=="Add") handleCreateCab();
    else handleupdateCab();
  };
  return (
    <div>
      <Modal
        className="container d-flex align-items-center"
        open={isModalOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className="card container specific-w-500">
          <div className="card-body d-flex flex-column">
            <div>
              <h2 className="card-title">Details</h2>
            </div>
            <div>
              <form action="">
                <div className="d-flex flex-column">
                  <div className="m-1">
                    <label htmlFor="" className="form-label">
                      Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Car Name"
                      value={updatedCab.name}
                      onChange={(e) => handleChange("name", e.target.value)}
                    />
                  </div>
                  <div className="m-1">
                    <label htmlFor="" className="form-label">
                      Driver Name
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Driver Name"
                      value={updatedCab.driverName}
                      onChange={(e) =>
                        handleChange("driverName", e.target.value)
                      }
                    />
                  </div>
                  <div className="m-1">
                    <label htmlFor="" className="form-label">
                      Contact Number
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Driver Contact"
                      value={updatedCab.contactNo}
                      onChange={(e) =>
                        handleChange("contactNo", e.target.value)
                      }
                    />
                  </div>
                  <div className="m-1">
                    <label htmlFor="" className="form-label">
                      Price/minute
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      placeholder="Price Per Minute"
                      value={updatedCab.pricePerMinute}
                      onChange={(e) =>
                        handleChange("pricePerMinute", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="m-1">
                    <label htmlFor="" className="form-label">
                      Vehicle Number
                    </label>
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Enter Vehicle Number"
                      value={updatedCab.vehicleNumber}
                      onChange={(e) =>
                        handleChange("vehicleNumber", e.target.value)
                      }
                      required
                    />
                  </div>
                </div>
                <div className="d-flex justify-content-center">
                  <button
                    className="btn btn-primary btn-lg m-2"
                    onClick={(e) => handleSaved(e)}
                    variant="contained"
                    color="primary"
                  >
                    {props.btname}
                  </button>
                  <ToastContainer />
                  <button
                    className="btn btn-secondary btn-lg m-2"
                    onClick={handleClose}
                    variant="contained"
                    color="secondary"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default BasicModal;
