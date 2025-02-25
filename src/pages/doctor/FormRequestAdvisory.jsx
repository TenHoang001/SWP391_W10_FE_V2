import React from "react";
import { Link } from "react-router";

const FormRequestAdvisory = () => {
  return (
    <div className="py-[2em] bg-gray-100">
      <div className="mx-auto max-w-lg rounded-lg bg-white p-6 shadow-md">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-xl font-semibold">Thông tin cá nhân</h2>
          <Link to={"/doctor/chart"}><button className="rounded-md bg-yellow-300 px-3 py-1 font-semibold text-black">
            Charts
          </button></Link>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Họ và tên
          </label>
          <p className="text-lg font-semibold">Nguyễn Văn A</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Giới tính
          </label>
          <div className="flex items-center space-x-4">
            <label className="flex items-center">
              <input type="radio" name="gender" className="mr-2" checked />
              Nam
            </label>
            <label className="flex items-center">
              <input type="radio" name="gender" className="mr-2" />
              Nữ
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Năm sinh
          </label>
          <select className="mt-1 block w-full rounded-md border border-gray-300 p-2">
            <option>2025</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Chẩn đoán
          </label>
          <textarea
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder="Nhập kết luận sơ bộ..."
          ></textarea>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">
            Phản hồi tư vấn
          </label>
          <textarea
            className="w-full rounded-md border border-gray-300 p-2"
            placeholder="Nhập phản hồi..."
          ></textarea>
        </div>

        <Link to={"/doctor/response-success"}>
          <button className="w-full rounded-md bg-blue-500 py-2 text-white transition hover:bg-blue-600">
            Gửi phản hồi
          </button>
        </Link>
      </div>
    </div>
  );
};

export default FormRequestAdvisory;
