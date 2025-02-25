import React, { useState } from "react";
import { Link } from "react-router";

const SetCalendar = () => {
  const times = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  return (
    <div className="min-h-screen bg-gray-200">
      <div className="mx-auto flex min-h-[20em] items-center justify-center">
        <div className="w-[35em]">
          <div className="my-10 flex items-center justify-between rounded bg-white p-[1em]">
            <div>
              <p className="font-semibold">Đặt lịch khám bác sĩ trực tuyến</p>
            </div>
            <div>
              <Link to={"/doctor/all-appointments"}>
                <button className="rounded bg-blue-500 p-2 text-white">
                  Lịch sử khám bệnh
                </button>
              </Link>
            </div>
          </div>
          <div className="space-y-10 rounded bg-white p-[2em]">
            <div className="flex flex-col gap-2">
              <label className="font-semibold" htmlFor="">
                Ngày-Tháng-Năm:
              </label>
              <input
                type="date"
                value="2025-02-17"
                className="rounded border border-gray-300 p-2"
              />
            </div>
            <div className="space-y-4">
              <label className="font-semibold" htmlFor="">
                Thời gian:
              </label>
              <div className="grid grid-cols-5 gap-2">
                {times.map((index, key) => (
                  <button
                    key={key}
                    className="rounded border border-gray-300 p-1 hover:bg-blue-500 hover:text-white"
                  >
                    {index}
                  </button>
                ))}
              </div>
            </div>
            <div className="flex gap-2 text-center">
              <button className="w-full rounded bg-blue-500 p-2 text-white">
                Xác nhận lịch hẹn
              </button>
              <button className="w-full rounded border border-gray-500 p-2">
                Hủy
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SetCalendar;
