import React, {useEffect, useMemo, useState} from "react";
import {Link, useNavigate, useParams} from "react-router-dom";
import {useSelector, useDispatch} from "react-redux";
import {getdata} from "../redux/productSlice";
import {addcart, updatecart, getcart} from "../redux/cartSlice";
import Alert from "@mui/material/Alert";
import Collapse from "@mui/material/Collapse";
import RelatedProduct from "../components/RelatedProduct";
import { addComment, getComments } from "../redux/commentSlice";


const Product = () => {
    const {productID} = useParams();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const {products, status, error} = useSelector((state) => state.products);
    const {cartList} = useSelector((state) => state.cart);
    const {currentUser} = useSelector((state) => state.auth);
    const [image, setImage] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [showAlert, setShowAlert] = useState(false);
    const [confirm, setConfirm] = useState(false);
    const { commentList } = useSelector((state) => state.comment);
    const [comment, setComment] = useState("");



    const handleSubmitComment = async (e) => {
        e.preventDefault();
        if (!currentUser) {
            alert("Vui lòng đăng nhập để gửi bình luận!");
            navigate("/login");
            return;
        }
        if (!comment.trim()) return;

        await dispatch(
            addComment({
                productId: product.id,
                productName: product.name,
                userId: currentUser.id,
                userName: currentUser.displayName,
                content: comment,
                status: "approved"
            })
        );
        setComment("");
    };

    useEffect(() => {
        if (status === "idle") dispatch(getdata());
    }, [dispatch, status]);

    const allProducts = useMemo(() => {
       return  products.filter((product) => product.status === true);
    }, [products]);

    const product = useMemo(
        () => allProducts.find((item) => item.id === productID),
        [allProducts, productID]
    );
    const rltproduct = useMemo(
        () => allProducts.filter((item) => item.category === product?.category),
        [allProducts, product?.category]
    );
    const commentapproved = useMemo(() => commentList.filter((item)=> item.status === "approved"), [commentList]);
    useEffect(() => {
        if (!product) return;
        if (Array.isArray(product.image) && product.image.length)
            setImage(product.image[0]);
        else if (typeof product.image === "string") setImage(product.image);
        else setImage("");
        setQuantity(1);
    }, [product, commentList]);

    const stock = product?.stock ?? 0;
    const formatPrice = (n) =>
        typeof n === "number" ? new Intl.NumberFormat("vi-VN").format(n) : "";

    const handleDecrease = () => setQuantity((prev) => Math.max(1, prev - 1));
    const handleIncrease = () =>
        setQuantity((prev) => Math.min(stock || 1, prev + 1));
    const handleChangeQty = (e) => {
        let val = parseInt(e.target.value);
        if (isNaN(val) || val < 1) val = 1;
        if (stock) val = Math.min(val, stock);
        setQuantity(val);
    };

    const handleAddToCart = async () => {
        if (!product || stock <= 0) return;

        if (!currentUser) {
            alert("Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng!");
            navigate("/login");
            return;
        }

        try {
            const existing = cartList.find((item) => item.productId === product.id);

            if (existing) {
                await dispatch(
                    updatecart({
                        ...existing,
                        quantity: existing.quantity + quantity,
                    })
                ).unwrap();
            } else {
                await dispatch(
                    addcart({
                        userId: currentUser.id,
                        itemcart: {
                            productId: product.id,
                            name: product.name,
                            price: product.price,
                            image: Array.isArray(product.image)
                                ? product.image[0]
                                : product.image,
                            quantity,
                        },
                    })
                ).unwrap();
            }

            await dispatch(getcart(currentUser.id));

            setShowAlert(true);
            setTimeout(() => setShowAlert(false), 2000);
        } catch (err) {
            console.error("Lỗi thêm giỏ hàng:", err);
        }
    };
    useEffect(() => {
        if (product?.id) dispatch(getComments(product.id));
    }, [dispatch, product?.id]);

    if (status === "loading") return <p>Đang tải dữ liệu...</p>;
    if (status === "failed") return <p>Lỗi: {error}</p>;
    if (!product)
        return (
            <div className="p-6 mt-32 text-center">
                <p className="text-red-600 text-lg font-medium">
                    Không tìm thấy sản phẩm!
                </p>
                <Link to="/" className="text-blue-600 underline">
                    Quay về trang chủ
                </Link>
            </div>
        );

    const images = Array.isArray(product.image)
        ? product.image
        : [product.image].filter(Boolean);

    return (
        <div className="p-6 mt-32 max-w-7xl mx-auto">
            <div className="fixed bottom-5 right-5 z-50">
                <Collapse in={showAlert}>
                    <Alert severity="success">Thêm vào giỏ hàng thành công!</Alert>
                </Collapse>
            </div>

            <div className="flex flex-col lg:flex-row gap-8">
                {/* Ảnh sản phẩm */}
                <div className="flex-1 flex flex-col lg:flex-row gap-3">
                    <div className="flex-1">
                        {image ? (
                            <img
                                src={image}
                                alt={product.name}
                                className="w-full h-auto rounded-lg object-contain shadow-md"
                            />
                        ) : (
                            <div className="w-full aspect-video rounded-lg bg-gray-100 grid place-items-center">
                                <span className="text-gray-500">Không có hình ảnh</span>
                            </div>
                        )}
                    </div>

                    <div
                        className="flex flex-row lg:flex-col gap-2 w-full lg:w-[20%] overflow-x-auto lg:overflow-y-auto">
                        {images.map((img, index) => (
                            <img
                                key={index}
                                src={img}
                                alt={`${product.name} - ${index + 1}`}
                                onClick={() => setImage(img)}
                                className={`size-24 object-cover cursor-pointer border rounded-lg hover:opacity-80 ${
                                    img === image ? "border-[#8c52ff]" : "border-gray-300"
                                }`}
                            />
                        ))}
                    </div>
                </div>

                <div className="flex-1">
                    <h1 className="mt-4 text-2xl font-bold">{product.name}</h1>
                    {product.subCategory && (
                        <p className="mt-3 text-lg text-gray-500">
                            Hãng: <span className="font-medium">{product.subCategory}</span>
                        </p>
                    )}
                    <p className="mt-3 text-xl text-red-600 font-semibold">
                        {formatPrice(product.price)} ₫
                    </p>

                    {product.description && (
                        <p className="mt-6 text-gray-700 text-base leading-relaxed">
                            {product.description}
                        </p>
                    )}

                    <p className="mt-6 text-base">
                        Còn lại:{" "}
                        <span className={stock > 0 ? "text-green-600" : "text-red-600"}>
              {stock > 0 ? `${stock} sản phẩm` : "Hết hàng"}
            </span>
                    </p>

                    <div className="flex items-center mt-6 mb-3 gap-4">
                        <p className="text-lg text-gray-600">Số lượng:</p>
                        <div className="flex items-center border border-gray-300 rounded overflow-hidden">
                            <button
                                onClick={handleDecrease}
                                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-lg disabled:opacity-50"
                                disabled={quantity <= 1}
                            >
                                −
                            </button>
                            <input
                                type="number"
                                value={quantity}
                                min={1}
                                max={stock || 1}
                                onChange={handleChangeQty}
                                className="w-16 text-center p-2 outline-none"
                            />
                            <button
                                onClick={handleIncrease}
                                className="px-3 py-2 bg-gray-100 hover:bg-gray-200 text-lg disabled:opacity-50"
                                disabled={!stock || quantity >= stock}
                            >
                                +
                            </button>
                        </div>
                    </div>

                    <div className="flex flex-wrap items-center gap-4">
                        <button
                            onClick={handleAddToCart}
                            disabled={stock <= 0}
                            className="mt-6 px-6 py-3 bg-[#8c52ff] text-white rounded-lg hover:bg-[#7b3de3] disabled:opacity-50"
                        >
                            Thêm vào giỏ hàng
                        </button>

                        <button
                            onClick={() => setConfirm(true)}
                            disabled={stock <= 0}
                            className="mt-6 px-6 py-3 bg-black text-white rounded-lg hover:bg-gray-800 disabled:opacity-50"
                        >
                            Mua ngay
                        </button>
                    </div>

                    <div className="mt-6">
                        <Link to="/productPage" className="text-blue-600">
                            ← Tiếp tục mua sắm
                        </Link>
                    </div>
                </div>
            </div>

            <div className="mt-20">
                <div className="mt-3 mb-5 p-2 w-full grid grid-cols-2 sm:grid-cols-2 md:grid-cols-3 gap-4">
                    {rltproduct.map((item) => (
                        <RelatedProduct key={item.id} rltprd={item} />
                    ))}
                </div>
                <div className="flex">
                    <b className="border border-l-none px-5 py-3 text-sm cursor-pointer bg-[#8c52ff] text-white">
                        Mô tả
                    </b>
                    <p className="border px-5 py-3 text-sm cursor-pointer hover:bg-gray-100">
                        Đánh giá (150)
                    </p>
                </div>

                <div className="flex flex-col gap-4 border px-6 py-6 text-gray-600">
                    <p>
                        Website thương mại điện tử của chúng tôi là nền tảng trực tuyến giúp
                        bạn dễ dàng mua sắm sản phẩm mọi lúc, mọi nơi. Với hàng nghìn mặt
                        hàng đa dạng, từ công nghệ đến thời trang, chúng tôi cam kết mang
                        đến trải nghiệm mua sắm tiện lợi, nhanh chóng và đáng tin cậy.
                    </p>
                </div>

                {/* Form đánh giá */}
                {/* Bình luận sản phẩm */}
                <div className="mt-10 border rounded-xl p-6 shadow-sm">
                    <h3 className="text-2xl font-bold mb-4 text-gray-800">
                        Bình luận sản phẩm
                    </h3>

                    {commentList.length === 0 ? (
                        <p className="text-gray-500">Chưa có bình luận nào.</p>
                    ) : (
                        <div className="flex flex-col gap-4 mb-6">
                            {commentapproved.map((cmt) => (
                                <div
                                    key={cmt.id}
                                    className={`border p-3 rounded-lg bg-gray-50 shadow-sm ${
                                        cmt.status === "hidden" ? "hidden" : ""
                                    }`}

                                >
                                    <p className="font-semibold text-[#8c52ff]">{cmt.userName}</p>
                                    <p className="text-gray-700">{cmt.content}</p>
                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(cmt.createdAt).toLocaleString("vi-VN")}
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}

                    {/* Form thêm bình luận */}
                    <form onSubmit={handleSubmitComment} className="flex flex-col gap-4">
                        <input
                            type="text"
                            value={
                                currentUser
                                    ? "Tên: " + currentUser.displayName
                                    : "Khách (chưa đăng nhập)"
                            }
                            className="border border-gray-300 rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-[#8c52ff]"
                            disabled
                        />
                        <textarea
                            placeholder="Nhập bình luận..."
                            rows="4"
                            value={comment}
                            onChange={(e) => setComment(e.target.value)}
                            className="border rounded-md px-4 py-2 outline-none focus:ring-2 focus:ring-[#8c52ff]"
                            required
                        ></textarea>
                        <button
                            type="submit"
                            className="self-start bg-[#8c52ff] text-white px-6 py-2 rounded-md hover:bg-[#7b3de3] transition"
                        >
                            Gửi bình luận
                        </button>
                    </form>
                </div>

            </div>
            {/* Xác nhận mua " hàng  */}
            {confirm && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm">
                    <div className="bg-white rounded-2xl shadow-2xl w-[420px] p-5 animate-fadeIn">
                        <h1 className="text-center text-xl font-bold text-gray-700 mb-4 uppercase">
                            Xác nhận mua hàng
                        </h1>

                        <div className="flex items-center gap-4 border-b border-gray-200 pb-4 mb-4">
                            <img
                                src={product.image[0]}
                                alt={product.name}
                                className="h-24 w-24 object-cover rounded-xl border"
                            />
                            <div>
                                <h2 className="text-lg font-semibold text-gray-800">{product.name}</h2>
                                <p className="text-gray-500 mt-1">Giá: {product.price.toLocaleString()}₫</p>
                            </div>
                        </div>

                        <div className="flex items-center justify-between mb-5">
                            <span className="text-lg font-medium text-gray-700">Số lượng</span>
                            <div className="flex items-center border border-gray-300 rounded-lg overflow-hidden">
                                <button
                                    className="w-8 h-8 text-lg font-bold text-gray-600 hover:bg-gray-100"
                                    onClick={handleDecrease}
                                >
                                    −
                                </button>
                                <input
                                    type="number"
                                    value={quantity}
                                    onChange={handleChangeQty}
                                    className="w-12 text-center border-x border-gray-200 outline-none"
                                />
                                <button
                                    className="w-8 h-8 text-lg font-bold text-gray-600 hover:bg-gray-100"
                                    onClick={handleIncrease}
                                >
                                    +
                                </button>
                            </div>
                        </div>

                        <div className="flex justify-end gap-3">
                            <button
                                className="px-4 py-2 rounded-lg bg-gray-200 text-gray-700 hover:bg-gray-300"
                                onClick={() => setConfirm((false))}
                            >
                                Hủy
                            </button>
                            <button
                                className="px-4 py-2 rounded-lg bg-[#6c5ce7] text-white font-semibold hover:bg-[#a29bfe]"
                                onClick={() =>
                                    navigate("/payment", {
                                        state: {
                                            items: [{
                                                ...product,
                                                quantity,
                                                image: product.image[0],
                                                price: product.price,
                                            }],
                                            total: product.price * quantity
                                        }
                                    })
                                }>
                                Thanh toán ngay
                            </button>
                        </div>
                    </div>
                </div>
            )

            }

        </div>
    );
};

export default Product;
