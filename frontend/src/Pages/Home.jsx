import React, { useEffect, useState } from "react";
import axios from "axios";
import Modal from "@mui/material/Modal";
import "halfmoon/css/halfmoon.min.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Home = () => {
  const [email, setEmail] = useState("");
  const [source, setSource] = useState("");
  const [destination, setDestination] = useState("");
  const [isModalOpen,setIsModalOpen]= useState(false);
  const [loading, setLoading] =useState(false);
  const [search, setSearch] = useState(false);
  const [city,setCity]= useState([]);
  const [cabs, setcabs] = useState([]);
  const [estimatedTime, setestimatedTime] = useState(0);


  const getAllNodes = async ()=>{
    setLoading(true);
    axios.get("http://localhost:8800/api/node/").then((response) => {
      setCity(response.data);
    });
    setLoading(false);
  }


  const fetchCabs = async () => {
    setLoading(true);
    await axios
      .get("http://localhost:8800/api/cab/activeCabs")
      .then((response) => {
        setcabs(response.data);
      });
    setLoading(false);
  };


  const getShortestTime = async () => {
    const queryparams = {
      email,
      source,
      destination,
    };
    setLoading(true);
    await axios
      .get("http://localhost:8800/api/node/calculate_minimum_time", {
        params: queryparams,
      })
      .then((response) => {
        setestimatedTime(response.data.minTime);
      });
    setLoading(false);
  };


  useEffect(() => {
   getAllNodes();
  }, []);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSearch(true);
    try {
      getShortestTime();
      fetchCabs();
    } catch (error) {

    }
  };
  const [dots, setDots] = useState("");

  useEffect(() => {
    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots.length < 3 ? prevDots + "." : "")); 
    }, 300); 
    return () => clearInterval(interval);
  }, []);

  const handleClose = ()=> setIsModalOpen(false);

  const bookCab = async({ cab, estimatedTime, source, destination, email }) => {
  const cabBooking = {
    cabId: cab._id,
    source,
    destination,
    estimatedTime,
    estimatedCost: cab.pricePerMinute * estimatedTime,
    email,
  };
  setIsModalOpen(false);
  axios
    .post("http://localhost:8800/api/booking", cabBooking)
    .then((response) => {
      toast.success("Booking Confirmed !", {
        position: "top-center",
        autoClose: 1000,
        hideProgressBar: false,
        closeOnClick: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log("Cab booked successfully:", response.data);
      setSearch(false);
      setSource("");
      setDestination("");
      setEmail("");
      fetchCabs();
    })
    .catch((error) => {
      console.error("Error booking cab:", error);
    });
};

  cabs.sort(function (a, b) {
    return a.pricePerMinute - b.pricePerMinute;
  });
 


  return (
    <div className="container-fluid vw-100 vh-100 d-flex  align-items-center bg-light">
      <div className="w-25 m-1 ">
        <div className="card border-0 bg-light">
          <div className="card-body">
            <h2 className="card-title">Book your cab</h2>
            <form onSubmit={handleSubmit} className="d-flex flex-column">
              <div className="mb-2">
                <label className="">Email:</label>
                <input
                  type="email"
                  placeholder="Enter email id"
                  className="form-control"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="mb-2">
                <label>Source Name:</label>
                <select
                  className="form-control"
                  value={source}
                  onChange={(e) => setSource(e.target.value)}
                >
                  <option value="">Select an option</option>
                  {city.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="mb-2">
                <label className="">Destination Name:</label>
                <select
                  className="form-control"
                  value={destination}
                  onChange={(e) => setDestination(e.target.value)}
                >
                  <option value="">Select an option</option>
                  {city.map((item, index) => (
                    <option key={index} value={item.name}>
                      {item.name}
                    </option>
                  ))}
                </select>
              </div>
              <button type="submit" className="btn btn-primary mt-3">
                Search
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer limit={1} />
      <div className="w-75">
        {!search ? (
          <h2 className="text-center">Let's Get You Going...</h2>
        ) : cabs.length > 0 ? (
          <>
            <div className="d-flex justify-content-between mx-2">
              <div>
                <h2 className="mb-3">Available Cabs</h2>
              </div>
              <div>
                <h4>Estimated Time: {estimatedTime} mins</h4>
              </div>
            </div>
            <div>
              {cabs.map((cab, index) => (
                <div key={cab._id} className="mb-3">
                  <div className="card border-0">
                    <div className="card-body d-flex flex-column">
                      <h3 className="card-title">{cab.name}</h3>
                      <hr />
                      <div className="row">
                        <div className="col">
                          <div>
                            <strong>Driver Name:</strong>{" "}
                            {cab.driverName.toUpperCase()}
                          </div>
                          <div>Contact No: {cab.contactNo}</div>
                        </div>
                        <div className="col text-center">
                          <strong className="fs-4">{cab.vehicleNumber}</strong>
                        </div>
                        <div className="col text-center">
                          Estimated Cost:{" "}
                          <span className="text-success fw-bold fs-5">
                            ${(cab.pricePerMinute * estimatedTime).toFixed(2)}
                          </span>
                        </div>
                        <div className="col text-end">
                          <button
                            onClick={() => setIsModalOpen(true)}
                            className="btn btn-success btn-lg"
                          >
                            BOOK
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
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
                          <h3 className="card-title text-center">
                            Confirm Booking
                          </h3>
                        </div>
                        <div>
                          <div className="d-flex justify-content-center">
                            <button
                              className="btn btn-primary btn-lg m-2"
                              onClick={() =>
                                bookCab({
                                  cab,
                                  estimatedTime,
                                  source,
                                  destination,
                                  email,
                                })
                              }
                              variant="contained"
                              color="primary"
                            >
                              Confirm
                            </button>
                            <button
                              className="btn btn-secondary btn-lg m-2"
                              onClick={() => handleClose()}
                              variant="contained"
                              color="secondary"
                            >
                              Cancel
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </div>
              ))}
            </div>
          </>
        ) : loading ? (
          <h3 className="text-center">Searching{dots}</h3>
        ) : (
          <h2 className="text-center">No Available Cab at the moment...</h2>
        )}
      </div>
    </div>
  );
};

export default Home;
