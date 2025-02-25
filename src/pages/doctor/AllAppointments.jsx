import React, { useState } from "react";
import { Link } from "react-router";

const AllAppointments = () => {
  const [updateStatus, setUpdateStatus] = useState(false);
  const appointments = [
    {
      name: "Nguyễn Văn A",
      date: "15/03/2025",
      time: "08:00",
      meetLink: "https://meet.google.com/abc-defg-hij",
      pin: "123456",
      status: "Chờ khám",
    },
    {
      name: "Trần Thị B",
      date: "16/03/2025",
      time: "14:30",
      meetLink: "https://meet.google.com/xyz-uvw-rst",
      pin: "789012",
      status: "Xem kết quả",
    },
    {
      name: "Lê Văn C",
      date: "17/03/2025",
      time: "18:15",
      meetLink: "https://meet.google.com/lmn-opq-rts",
      pin: "345678",
      status: "Xem kết quả",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Filter Buttons */}
      <div className="mb-4 flex items-center justify-between">
        <div className="space-x-2">
          <button className="rounded-lg bg-gray-200 px-4 py-2">
            Đang xử lý
          </button>
          <button className="rounded-lg bg-gray-200 px-4 py-2">Đã xử lý</button>
          <button className="rounded-lg bg-blue-600 px-4 py-2 text-white">
            Tất cả
          </button>
        </div>
        <Link to={"/doctor/set-calendar"}>
          <button className="rounded-lg bg-green-200 px-4 py-2 text-green-800">
            Giờ khám bệnh
          </button>
        </Link>
      </div>

      {/* Table */}
      <div className="overflow-hidden rounded-lg bg-white shadow-md">
        <table className="w-full text-left">
          <thead className="bg-gray-100 text-gray-600">
            <tr>
              <th className="p-3">Bệnh Nhân</th>
              <th className="p-3">Ngày Khám</th>
              <th className="p-3">Giờ Khám</th>
              <th className="p-3">Google Meet</th>
              <th className="p-3">Mã PIN</th>
              <th className="p-3">Trạng Thái</th>
            </tr>
          </thead>
          <tbody>
            {appointments.map((appt, index) => (
              <tr key={index} className="border-t">
                <td className="flex items-center p-3">
                  <div className="mr-2 h-8 w-8 rounded-full bg-gray-300"></div>
                  {appt.name}
                </td>
                <td className="p-3">{appt.date}</td>
                <td className="p-3">{appt.time}</td>
                <td className="p-3">
                  <a href={appt.meetLink} className="text-blue-500 underline">
                    {appt.meetLink}
                  </a>
                </td>
                <td className="p-3">{appt.pin}</td>
                <td className="p-3">
                  {appt.status === "Chờ khám" ? (
                    <div className="relative">
                      <Link to={"/doctor/request-form"}>
                        <button
                          className={`rounded-lg px-4 py-1 ${
                            appt.status === "Chờ khám"
                              ? "w-[9em] bg-gray-200 text-gray-600"
                              : "w-[9em] bg-blue-500 text-white"
                          }`}
                        >
                          {appt.status}
                        </button>
                      </Link>
                      <button className="pl-3 pt-4" onClick={() => setUpdateStatus(!updateStatus)}>
                      </button>
                      {updateStatus ? <div className="absolute right-5"><div><button  className="rounded text-white bg-blue-100 p-2">Đã khám</button></div></div> : ""}
                    </div>
                  ) : (
                    <Link to={"/doctor/result-advisory"}>
                      <button
                        className={`rounded-lg px-4 py-1 ${
                          appt.status === "Chờ khám"
                            ? "w-[9em] bg-gray-200 text-gray-600"
                            : "w-[9em] bg-blue-500 text-white"
                        }`}
                      >
                        {appt.status}
                      </button>
                    </Link>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AllAppointments;
