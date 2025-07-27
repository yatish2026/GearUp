import React, { useEffect, useState } from "react";
import { assets } from "../../assets/assets";
import Title from "../../components/owner/Title";
import { useAppContext } from "../../context/AppContext";
import toast from "react-hot-toast";

const Dashboard = () => {
  const { axios, isOwner, currency } = useAppContext();

  const [data, setData] = useState({
    totalCars: 0,
    totalBookings: 0,
    pendingBookings: 0,
    completedBookings: 0,
    recentBookings: [],
    monthlyRevenue: 0,
  });

  const dashboardCards = [
    { title: "Total Cars", value: data.totalCars, icon: assets.carIconColored },
    { title: "Total Bookings", value: data.totalBookings, icon: assets.listIconColored },
    { title: "Pending", value: data.pendingBookings, icon: assets.cautionIconColored },
    { title: "Confirmed", value: data.completedBookings, icon: assets.listIconColored },
  ];

  const fetchDashboardData = async () => {
    try {
      const { data } = await axios.get("/api/owner/dashboard");
      if (data.success) {
        setData(data.dashboardData);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  useEffect(() => {
    if (isOwner) {
      fetchDashboardData();
    }
  }, [isOwner]);

  return (
    <div className="flex-1 px-4 pt-10 md:px-10">
      {/* Title */}
      <Title
        title={"Admin Dashboard"}
        subTitle={
          "Monitor overall platform performance including total cars, bookings, revenue, and recent activities"
        }
      />

      {/* Dashboard Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 my-8">
        {dashboardCards.map((card, index) => (
          <div
            key={index}
            className="flex gap-2 items-center justify-between border p-4 rounded-lg border-borderColor bg-white shadow hover:shadow-md transition"
          >
            <div>
              <h1 className="text-xs text-gray-500">{card.title}</h1>
              <p className="text-lg font-semibold">{card.value}</p>
            </div>
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-primary/10">
              <img src={card.icon} alt="" className="h-4 w-4" />
            </div>
          </div>
        ))}
      </div>

      {/* Recent Booking & Monthly Revenue */}
      <div className="flex flex-col md:flex-row items-start gap-6 mt-8">
        {/* Recent Bookings */}
        <div className="p-4 md:p-6 border border-borderColor rounded-lg bg-white shadow w-full md:w-3/5">
          <h1 className="text-lg font-medium">Recent Bookings</h1>
          <p className="text-gray-500">Latest customer bookings</p>
          {data.recentBookings.length > 0 ? (
            data.recentBookings.map((booking, index) => (
              booking.car ? (
                <div key={index} className="mt-4 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="hidden md:flex items-center justify-center w-12 h-12 rounded-full bg-primary/10">
                      <img src={assets.listIconColored} alt="" className="h-5 w-5" />
                    </div>
                    <div>
                      <p>{booking.car.brand} {booking.car.model}</p>
                      <p className="text-sm text-gray-500">
                        {booking.createdAt?.split("T")[0]}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 font-medium">
                    <p className="text-sm text-gray-500">
                      {currency}{booking.price}
                    </p>
                    <p className="px-3 py-0.5 border border-borderColor rounded-full text-sm capitalize">
                      {booking.status}
                    </p>
                  </div>
                </div>
              ) : (
                <div key={index} className="mt-4 text-gray-400 italic">
                  Booking data incomplete (car details missing)
                </div>
              )
            ))
          ) : (
            <p className="mt-4 text-gray-500">No recent bookings found.</p>
          )}
        </div>

        {/* Monthly Revenue */}
        <div className="p-4 md:p-6 border border-borderColor rounded-lg bg-white shadow w-full md:w-2/5">
          <h1 className="text-lg font-medium">Monthly Revenue</h1>
          <p className="text-gray-500 mb-2">Revenue for current month</p>
          <p className="text-3xl font-semibold text-primary">
            {currency}{data.monthlyRevenue}
          </p>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
