import React, { useEffect, useState } from 'react';
import {
  changePriceMembership,
  getAllMembership,
} from '../../api/MenbershipAPI';
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
} from '@material-tailwind/react';
import { useFormik } from 'formik';
import * as yup from 'yup';

const PriceManagement = () => {
  const [membership, setMembership] = useState([]);
  const [openPopupChangePrice, setOpenPopupChangePrice] = useState(false);
  const [membershipId, setMembershipId] = useState();
  const [price, setPrice] = useState();
  useEffect(() => {
    HandleGetAllMembership();
  }, []);

  const HandleGetAllMembership = async () => {
    const response = await getAllMembership();
    setMembership(response);
  };

  const handleOpenPopUpChangePrice = (id, price) => {
    setOpenPopupChangePrice(true);
    setMembershipId(id);
    setPrice(price);
  };


  const formik = useFormik({
    initialValues: {
      price: 2000,
    },
    validationSchema: yup.object({
      price: yup.number().required('Giá gói là bắt buộc').min(2000, 'Gía gói phải lớn hơn hoặc bằng 2000VND'),
    }),
    onSubmit: async (values) => {
      try {
        const response = await changePriceMembership(membershipId, parseInt(values.price));
        if (response.success) {
          HandleGetAllMembership();
          setTimeout(() => {
            setOpenPopupChangePrice(false);
          }, 600);
          setTimeout(() => {
            setNotification({
              show: true,
              message: 'Thay đổi giá gói thành công',
              type: 'success',
            });
          }, 3000);
        } else {
          setNotification({
            show: true,
            message: 'Thay đổi giá gói thất bại',
            type: 'error',
          });
        }
      } catch (error) {
        setNotification({
          show: true,
          message: 'Lỗi khi thay đổi giá gói',
          type: 'error',
        });
      }
    },
  });



  const formatCurrency = (money) => {
    return new Intl.NumberFormat('vi', {
      style: 'currency',
      currency: 'VND',
    }).format(money);
  };

  return (
    <div className='flex flex-col gap-10'>
      <h1 className='text-2xl font-bold'>Quản lý giá gói thành viên</h1>
      <div className='rounded-md overflow-x-auto scroll-auto'>
        <table className='w-full h-full  bg-white border border-gray-300 shadow-md rounded-lg'>
          <thead>
            <tr>
              <th className='border-[1px] bg-gray-100 border-gray-300/25 border-solid p-3'>
                #
              </th>
              <th className='border-[1px] bg-gray-100 border-gray-300/25  border-solid p-3'>
                Tên gói
              </th>
              <th className='border-[1px] bg-gray-100 border-gray-300/25  border-solid p-3'>
                giá gói
              </th>
              <th className='border-[1px] bg-gray-100 border-gray-300/25  border-solid p-3'>
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {membership.map((membership, index) => (
              <tr className='text-center'>
                <td className=' border-[1px] border-gray-300/25  border-solid p-3'>
                  {index + 1}
                </td>
                <td className='border-[1px] border-gray-300/25  border-solid p-3'>
                  {membership.name}
                </td>
                <td className='border-[1px] border-gray-300/25  border-solid p-3'>
                  {formatCurrency(membership.price)}
                </td>
                <td className='border-[1px] flex justify-center  border-gray-300/25  border-solid p-3'>
                  <button
                    onClick={() =>
                      handleOpenPopUpChangePrice(
                        membership.membershipId,
                        membership.price
                      )
                    }
                    className='hover:bg-blue-500 hover:text-white font-semibold text-blue-400 hover:border-blue-200 p-2 border-solid  border-blue-400 border-[1px] rounded-md'
                  >
                    Thay đổi giá
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <Dialog open={openPopupChangePrice} handler={handleOpenPopUpChangePrice}>
        <form onSubmit={formik.handleSubmit}>
          <DialogHeader>Thay đổi giá gói</DialogHeader>
          <DialogBody>
            <input
              type='text'
              name='price'
              value={formik.values.price}
              onChange={formik.handleChange}
              placeholder={formatCurrency(200000)}
              className='px-5 py-2 w-full border-[2px] border-solid border-gray-400 rounded-md focus:bg-gray-100'
            />
          </DialogBody>
          <DialogFooter>
            <Button
              variant='text'
              color='red'
              onClick={() => setOpenPopupChangePrice(false)}
              className='mr-1'
            >
              <span>Cancel</span>
            </Button>
            <Button variant='gradient' color='green' type='submit'>
              <span>Confirm</span>
            </Button>
          </DialogFooter>
        </form>
      </Dialog>
    </div>
  );
};

export default PriceManagement;
