import React from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import "halfmoon/css/halfmoon.min.css";
const Booking = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    axios.get("http://localhost:8800/api/booking/").then((response) => {
      setBookings(response.data);
    });
  }, []);
  
  const renderTableHeader = () => {
    return (
      <thead>
        <tr>
          <th className="">User Email</th>
          <th className="text-center">Source</th>
          <th className="text-center">Destination</th>
          <th className="text-center">Estimated Time</th>
          <th className="text-center">Estimated Cost</th>
          <th className="text-center">Name</th>
          <th className="text-center">Vehicle Number</th>
          <th className="text-center">Status</th>
        </tr>
      </thead>
    );
  };

  const renderTableBody = () => {
    return (
      <tbody>
        {bookings.length > 0 &&
          bookings.map((booking) => {
            return (
              <tr key={booking._id}>
                <td>{booking.userEmail}</td>
                <td className="text-center">{booking.source}</td>
                <td className="text-center">{booking.destination}</td>
                <td className="text-center">{booking.estimatedTime}</td>
                <td className="text-center">{booking.estimatedCost}</td>
                <td className="text-center">{booking?.cabId?.name}</td>
                <td className="text-center">{booking?.cabId?.vehicleNumber}</td>
                <td className="text-center">{booking?.cabId?.isCompleted?"Completed":"Running"}</td>
              </tr>
            );
          })}
      </tbody>
    );
  };

  return (
    <div className="container mt-1">
      <h1>Booking History</h1>
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

export default Booking;
