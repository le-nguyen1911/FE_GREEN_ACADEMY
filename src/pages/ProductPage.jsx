import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getdata } from "../redux/productSlice";
import { setKeyword } from "../redux/searchSlice";
import dropdow from "../assets/dropdown_icon.png";
import Productitem from "../components/Productitem";
import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";

const ProductPage = () => {
  const dispatch = useDispatch();
  const {
    products = [],
    status,
    error,
  } = useSelector((state) => state.products);
  const { keyword } = useSelector((state) => state.search);

  const [showfilter, setShowFilter] = useState(false);
  const [category, setcategory] = useState([]);
  const [subcategory, setsubcategory] = useState([]);
  const [filterProduct, setFilterProduct] = useState([]);
  const [sortType, setSortType] = useState("default");
  const [notfind, setnotfind] = useState(false);
  const [currentpage, setCurrentpage] = useState(1);

  const iteminpage = 8;

  // Hàm lấy giá nhỏ nhất từ sản phẩm
  const getMinPrice = (product) =>
    Array.isArray(product.price) && product.price.length > 0
      ? Math.min(...product.price)
      : Number(product.price) || 0;

  const sortPriceAsc = (products) =>
    [...products].sort((a, b) => getMinPrice(a) - getMinPrice(b));
  const sortPriceDesc = (products) =>
    [...products].sort((a, b) => getMinPrice(b) - getMinPrice(a));

  const categories = [...new Set(products.map((item) => item.category))];
  const subcategories = [...new Set(products.map((item) => item.subCategory))];

  const togglecategorie = (e) => {
    const value = e.target.value;
    setcategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const togglesubcategory = (e) => {
    const value = e.target.value;
    setsubcategory((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const handledreset = () => {
    setcategory([]);
    setsubcategory([]);
    setSortType("default");
    setnotfind(false);
    setFilterProduct(products);
    dispatch(setKeyword(""));
  };

  // Tính trang hiện tại
  const totalpage = Math.ceil(filterProduct.length / iteminpage);
  const startIndex = (currentpage - 1) * iteminpage;
  const endIndex = startIndex + iteminpage;
  const productactive = filterProduct.slice(startIndex, endIndex);
  const currentproduct = productactive.filter((item) => item.status === true);

  // Lọc và sắp xếp sản phẩm
  useEffect(() => {
    let filtered = [...products];

    if (category.length > 0)
      filtered = filtered.filter((item) => category.includes(item.category));
    if (subcategory.length > 0)
      filtered = filtered.filter((item) =>
        subcategory.includes(item.subCategory)
      );
    if (keyword)
      filtered = filtered.filter((item) =>
        item.name.toLowerCase().includes(keyword.toLowerCase())
      );

    setnotfind(filtered.length === 0);

    if (sortType === "price-asc") filtered = sortPriceAsc(filtered);
    else if (sortType === "price-desc") filtered = sortPriceDesc(filtered);

    setFilterProduct(filtered);
    setCurrentpage(1); 
  }, [category, subcategory, products, keyword, sortType]);

  useEffect(() => {
    if (status === "idle") dispatch(getdata());
  }, [dispatch, status]);

  if (status === "loading")
    return <p className="text-center mt-10">Đang tải dữ liệu...</p>;
  if (error)
    return <p className="text-center mt-10 text-red-500">Lỗi: {error}</p>;

  return (
    <div className="flex flex-col lg:flex-row gap-1 sm:gap-10 pt-[150px] border-t">
      {/* ==== SIDEBAR LỌC ==== */}
      <div className="min-w-60">
        <p className="my-2 text-3xl flex items-center cursor-pointer gap-2 font-bold">
          LỌC
          <img
            onClick={() => setShowFilter(!showfilter)}
            src={dropdow}
            alt="dropdown"
            className={`h-3 lg:hidden ${showfilter ? "rotate-90" : ""}`}
          />
        </p>

        {/* Lọc theo danh mục */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showfilter ? "" : "hidden"
          } lg:block`}
        >
          <p className="mb-3 text-lg font-medium">DANH MỤC</p>
          <div className="flex flex-col gap-2 text-base font-light text-gray-500">
            {categories.map((item) => (
              <p className="flex gap-2 text-md" key={item}>
                <input
                  type="checkbox"
                  className="w-3"
                  value={item}
                  checked={category.includes(item)}
                  onChange={togglecategorie}
                />
                {item}
              </p>
            ))}
          </div>
        </div>

        {/* Lọc theo hãng */}
        <div
          className={`border border-gray-300 pl-5 py-3 mt-6 ${
            showfilter ? "" : "hidden"
          } lg:block`}
        >
          <p className="mb-3 text-lg font-medium">HÃNG</p>
          <div className="flex flex-col gap-2 text-base font-light text-gray-500">
            {subcategories.map((item) => (
              <p className="flex gap-2 text-md" key={item}>
                <input
                  type="checkbox"
                  className="w-3"
                  value={item}
                  checked={subcategory.includes(item)}
                  onChange={togglesubcategory}
                />
                {item}
              </p>
            ))}
          </div>
        </div>
      </div>

      {/*  DANH SÁCH SẢN PHẨM  */}
      <div className="flex-1 flex flex-col justify-between">
        <div className="flex justify-between text-lg sm:text-2xl mb-4">
          <h1 className="flex flex-col items-center text-gray-700 font-bold">
            DANH SÁCH SẢN PHẨM
            <hr className="w-full h-1 bg-[#8c52ff] border-0 mt-2" />
          </h1>

          {/* Sắp xếp */}
          <select
            className="border-2 border-gray-300 text-base px-2"
            name="sort"
            onChange={(e) => setSortType(e.target.value)}
          >
            <option value="default">Mặc định</option>
            <option value="price-asc">Giá: Thấp → Cao</option>
            <option value="price-desc">Giá: Cao → Thấp</option>
          </select>
        </div>

        {/* Không tìm thấy */}
        {notfind ? (
          <div className="flex justify-center items-center w-full text-2xl font-bold text-gray-600 mt-10">
            <span>KHÔNG TÌM THẤY SẢN PHẨM HỢP LỆ</span>
            <button
              onClick={handledreset}
              className="text-red-600 ml-4 underline"
            >
              QUAY LẠI
            </button>
          </div>
        ) : (
          <>
            {/* Lưới sản phẩm */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 mt-6">
              {currentproduct.map((item) => (
                <Productitem key={item.id} product={item} />
              ))}
            </div>

            <div className="flex justify-center mt-16 mb-10">
              <Stack spacing={2} alignItems="center">
                <Pagination
                  count={totalpage}
                  page={currentpage}
                  onChange={(event, value) => setCurrentpage(value)}
                  variant="outlined"
                  color="secondary"
                  showFirstButton
                  showLastButton
                />
              </Stack>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ProductPage;
