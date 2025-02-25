import React from "react";
import { Link } from "react-router";

const ResponseAdvisorySuccess = () => {
  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="max-w-xs rounded-2xl bg-white p-6 text-center shadow-lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-100">
          <svg
            className="h-8 w-8 text-green-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h2 className="mt-4 text-xl font-semibold text-gray-900">
          Gửi phản hồi thành công!
        </h2>
        <div className="flex flex-col gap-2 mt-5">
          <Link to="/doctor/result-advisory">
            <button className="flex w-full items-center justify-center rounded-lg bg-gray-100 px-4 py-2 transition hover:bg-gray-200">
              <svg
                className="mr-2 h-5 w-5 text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 15l-5.5 3 1.5-5.5L1 7.5l5.5-.5L10 2l2.5 5 5.5.5-4 4.5 1.5 5.5L10 15z" />
              </svg>
              Xem phản hồi của tôi
            </button>
          </Link>
          <Link to={"/doctor"}>
            <button className="flex w-full items-center justify-center rounded-lg bg-gray-100 px-4 py-2 transition hover:bg-gray-200">
              <svg
                className="mr-2 h-5 w-5 text-gray-600"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M10 2l8 8h-3v6H5v-6H2l8-8z" />
              </svg>
              Về trang chủ
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default ResponseAdvisorySuccess;
