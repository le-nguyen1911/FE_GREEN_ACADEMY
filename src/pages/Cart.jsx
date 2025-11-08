import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate} from "react-router-dom";
import del from "../assets/trashcan.png";
import { getcart, updatecart, removecart } from "../redux/cartSlice";
const Cart = () => {
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.auth);
  const { cartList, totalprice, status } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  useEffect(() => {
    if (currentUser?.id) {
      dispatch(getcart(currentUser.id)); 
    }
  }, [dispatch, currentUser]);

  const formatPrice = (v) =>
    new Intl.NumberFormat("vi-VN").format(Number(v) || 0) + " ₫";

  if (status === "loading") {
    return (
      <div className="mt-36 px-6 text-center text-gray-500 text-lg">
        Đang tải giỏ hàng...
      </div>
    );
  }

  if (cartList.length === 0) {
    return (
      <div className="mt-36 px-6 text-center ">
        <h1 className="text-3xl font-bold text-gray-700 mb-6 p-3">GIỎ HÀNG</h1>
        <p className="text-gray-500 text-lg mb-4">
          Giỏ hàng của bạn đang trống.
        </p>
        <Link
          to="/productPage"
          className="inline-block bg-[#8c52ff] text-white px-6 py-3 rounded-md hover:bg-[#7b3de3] transition"
        >
          Tiếp tục mua sắm
        </Link>
      </div>
    );
  }

  return (
    <div className="mt-36 px-6 pb-20">
      <Link
        to="/"
        className="block mt-9 text-xl uppercase underline mb-2 font-bold text-gray-400 hover:text-[#8c52ff]"
      >
        Trang chủ
      </Link>

      <h1 className="mt-5 text-3xl font-bold text-gray-800 inline-block">
        GIỎ HÀNG CỦA BẠN
        <hr className="mt-3 w-full bg-[#8c52ff] h-1 rounded" />
      </h1>

      <div className="overflow-x-auto mt-6">
        <table className="w-full text-center border-collapse rounded-xl overflow-hidden shadow-lg">
          <thead className="bg-[#8c52ff] text-white">
            <tr>
              <th className="py-3 px-2">STT</th>
              <th className="py-3 px-2">Hình ảnh</th>
              <th className="py-3 px-2">Tên sản phẩm</th>
              <th className="py-3 px-2">Giá</th>
              <th className="py-3 px-2">Số lượng</th>
              <th className="py-3 px-2">Tổng tiền</th>
              <th className="py-3 px-2">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {cartList.map((item, index) => {
              const img = Array.isArray(item.image)
                ? item.image[0]
                : item.image;
              const quantity = item.quantity || 1;

              return (
                <tr
                  key={item.id || index}
                  className="border-b hover:bg-gray-50 transition"
                >
                  <td className="py-3">{index + 1}</td>

                  <td className="py-3 flex justify-center">
                    <img
                      src={img}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded-lg shadow-sm"
                    />
                  </td>

                  <td className="py-3 font-medium text-gray-700">
                    {item.name}
                  </td>

                  <td className="py-3 text-[#8c52ff] font-semibold">
                    {formatPrice(item.price)}
                  </td>

                  <td className="py-3">
                    <div className="flex items-center justify-center gap-2">
                      <button
                        onClick={() =>
                          dispatch(
                            updatecart({
                              ...item,
                              quantity: Math.max(1, item.quantity - 1),
                            })
                          )
                        }
                        className="w-8 h-8 border rounded-md hover:bg-gray-100"
                      >
                        −
                      </button>

                      <span className="px-2">{quantity}</span>

                      <button
                        onClick={() =>
                          dispatch(
                            updatecart({
                              ...item,
                              quantity: item.quantity + 1,
                            })
                          )
                        }
                        className="w-8 h-8 border rounded-md hover:bg-gray-100"
                      >
                        +
                      </button>
                    </div>
                  </td>

                  <td className="py-3 text-[#8c52ff] font-semibold">
                    {formatPrice(item.price * quantity)}
                  </td>

                  <td className="py-3">
                    <button
                      className="text-red-500 hover:text-red-700 font-semibold"
                      onClick={() => dispatch(removecart(item.id))}
                    >
                      <img src={del} alt="delete" className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col md:flex-row justify-between items-center mt-8 px-2 gap-4">
        <h2 className="text-2xl font-bold text-gray-800">
          Tổng cộng:{" "}
          <span className="text-[#8c52ff]">{formatPrice(totalprice)}</span>
        </h2>

        <button className="bg-[#8c52ff] text-white px-8 py-3 rounded-md hover:bg-[#7b3de3] transition shadow-md"
                onClick={() =>
                    navigate("/payment", {
                        state: {
                            items: cartList,
                            total: totalprice,
                        },
                    })
                }
        >
          Thanh toán
        </button>
      </div>
    </div>
  );
};

export default Cart;
