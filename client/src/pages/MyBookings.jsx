import React, { useEffect, useState } from "react";
import { assets } from "../assets/assets";
import Title from "../components/Title";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";

const MyBookings = () => {
  const { axios, user, currency } = useAppContext();
  const [bookings, setBookings] = useState([]);

  const fetchMyBookings = async () => {
    try {
      const { data } = await axios.get("api/bookings/user");
      if (data.success) {
        setBookings(data.bookings);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message || "Something went wrong");
    }
  };

  useEffect(() => {
    user && fetchMyBookings();
  }, [user]);

  return (
    <div className="px-6 md:px-16 lg:px-24 xl:px-32 2xl:px-48 mt-16 text-sm max-w-7xl">
      <Title
        title={"My Bookings"}
        subTitle={"View and manage your all car bookings"}
        align={"left"}
      />

      <div>
        {bookings.length === 0 ? (
          <p className="mt-10 text-gray-500 italic">No bookings found.</p>
        ) : (
          bookings.map((booking, index) => {
            const car = booking?.car;

            return (
              <div
                key={booking._id || index}
                className="grid grid-cols-1 md:grid-cols-4 gap-6 p-4 border border-borderColor rounded-lg mt-5 first:mt-12"
              >
                {/* Car Info */}
                <div className="md:col-span-1">
                  <div className="rounded-md overflow-hidden mb-3">
                    <img
                      src={
                        car?.image ||
                        "https://via.placeholder.com/300x200?text=No+Image"
                      }
                      className="w-full h-auto aspect-video object-cover"
                      alt={car?.brand || "Car"}
                    />
                  </div>
                  <p className="text-lg font-medium mt-2">
                    {car ? `${car.brand} ${car.model}` : "Car Info Unavailable"}
                  </p>
                  <p className="text-gray-500">
                    {car
                      ? `${car.year} | ${car.category} | ${car.location}`
                      : "Missing car details"}
                  </p>
                </div>

                {/* Booking Info */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-2">
                    <p className="px-3 py-1.5 bg-light rounded">
                      Booking #{index + 1}
                    </p>
                    <p
                      className={`px-3 py-1 text-xs rounded-full ${booking.status === "confirmed"
                          ? "bg-green-400/15 text-green-600"
                          : "bg-red-400/15 text-red-600"
                        }`}
                    >
                      {booking.status}
                    </p>
                  </div>
                  <div className="flex items-start gap-2 mt-3">
                    <img
                      src={assets.calendar_icon_colored}
                      alt=""
                      className="w-4 h-4 mt-1"
                    />
                    <div>
                      <p className="text-gray-500">Rental Period</p>
                      <p>
                        {booking.pickupDate?.split("T")[0] || "-"} to{" "}
                        {booking.returnDate?.split("T")[0] || "-"}
                      </p>
                    </div>
                  </div>

                  <div className="flex items-start gap-2 mt-3">
                    <img
                      src={assets.location_icon_colored}
                      alt=""
                      className="w-4 h-4 mt-1"
                    />
                    <div>
                      <p className="text-gray-500">Pick-up Location</p>
                      <p>{car?.location || "Not available"}</p>
                    </div>
                  </div>
                </div>

                {/* Price Info */}
                <div className="md:col-span-1 flex flex-col justify-between gap-6 text-right">
                  <div className="text-sm text-gray-500">
                    <p>Total Price</p>
                    <h1 className="text-2xl font-semibold text-primary">
                      {currency}
                      {booking.price}
                    </h1>
                    <p>
                      Booked on {booking.createdAt?.split("T")[0] || "Unknown"}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};

export default MyBookings;
