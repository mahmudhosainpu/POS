// QRCodeGenerate.js
"use client";
import { useEffect, useRef, useState } from "react";
import QRCodeStyling from "qr-code-styling";
import { Container } from "./Container";
import EditModal from "./EditModal";
import { MdModeEdit } from "react-icons/md";
import StickerPrinter from "./StickerPrinter";

export default function QRCodeGenerate() {
  const [productName, setProductName] = useState("");
  const [productCode, setProductCode] = useState("");
  const [discountPrice, setDiscountPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState("");
  const [products, setProducts] = useState([]);
  const qrCodeRefs = useRef([]);

  const [showEdit, setShowEdit] = useState(false);
  const [showStickerPrinter, setShowStickerPrinter] = useState(false);
  const [selectedProductIndex, setSelectedProductIndex] = useState(null);

  const handleGenerateCode = () => {
    if (productName && productCode && discountPrice && quantity && price) {
      const newProduct = {
        name: productName,
        code: productCode,
        discountPrice,
        quantity,
        price,
      };
      setProducts((prevProducts) => [...prevProducts, newProduct]);

      // Clear input fields
      setProductName("");
      setProductCode("");
      setDiscountPrice("");
      setQuantity("");
      setPrice("");
    } else {
      alert("Please fill in all fields.");
    }
  };

  const handleEditClick = (index) => {
    setSelectedProductIndex(index);
    setShowEdit(true);
  };

  const handleStickerPrintClick = (index) => {
    setSelectedProductIndex(index);
    setShowStickerPrinter(true);
  };


  const handleSaveEdit = (updatedProduct) => {
    const updatedProducts = [...products];
    updatedProducts[selectedProductIndex] = updatedProduct;
    setProducts(updatedProducts);
    setShowEdit(false);
  };

  useEffect(() => {
    qrCodeRefs.current.forEach((ref) => {
      if (ref) ref.innerHTML = "";
    });

    products.forEach((product, index) => {
      const qrCode = new QRCodeStyling({
        width: 50,
        height: 50,
        dotsOptions: { color: "#000000", type: "rounded" },
        backgroundOptions: { color: "#FFFFFF" },
        data: `Name : ${product.name.toUpperCase()}\nCode : ${product.code.toUpperCase()}\nPrice : RM ${product.price.toUpperCase()}\nDiscount Price : RM ${product.discountPrice}`,
      });


      if (qrCodeRefs.current[index]) {
        qrCode.append(qrCodeRefs.current[index]);
      }
    });
  }, [products]);

  return (
    <div className="mt-10">
      <Container>
        <div className="flex items-center justify-center bg-gray-200 p-8 rounded-md space-x-4">

          <div className="flex flex-col w-full">
            <label htmlFor="productName" className="text-sm mb-1">Product Name</label>
            <input
              className="px-4 py-2.5 w-full text-gray-800 rounded outline-none ring-2 ring-gray-200 focus:ring-purple-400 capitalize"
              type="text"
              placeholder="Enter product name"
              value={productName}
              onChange={(e) => setProductName(e.target.value)}
            />
          </div>
          <div className="flex flex-col w-full">
            <label htmlFor="productCode" className="text-sm mb-1">Product Code</label>
            <input
              className="px-4 py-2.5 w-full text-gray-800 rounded outline-none ring-2 ring-gray-200 focus:ring-purple-400 uppercase"
              type="text"
              placeholder="Enter product code"
              value={productCode}
              onChange={(e) => setProductCode(e.target.value)}
            />
          </div>

          <div className="flex flex-col w-fit">
            <label htmlFor="quantity" className="text-sm mb-1">QTY</label>
            <input
              className="px-4 py-2.5 w-40 text-gray-800 rounded outline-none ring-2 ring-gray-200 focus:ring-purple-400"
              type="number"
              placeholder="Quantity"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
            />
          </div>


          <div className="flex flex-col w-fit">
            <label htmlFor="price" className="text-sm mb-1">Price</label>
            <input
              className="px-4 py-2.5 w-40 text-gray-800 rounded outline-none ring-2 ring-gray-200 focus:ring-purple-400"
              type="number"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div className="flex flex-col w-full">
            <label htmlFor="discountPrice" className="text-sm mb-1">Discount Price</label>
            <input
              className="px-4 py-2.5 w-40 text-gray-800 rounded outline-none ring-2 ring-gray-200 focus:ring-purple-400 capitalize"
              type="number"
              placeholder="Discount Price"
              value={discountPrice}
              onChange={(e) => setDiscountPrice(e.target.value)}
            />
          </div>


          <button
            className="mt-6 w-fit h-fit px-4 py-2 text-white bg-blue-500 rounded hover:bg-blue-600 focus:outline-none"
            onClick={handleGenerateCode}
          >
            Upload
          </button>
        </div>

        <div className="pt-20">
          <table className="min-w-full divide-y divide-gray-300 ">
            <thead>
              <tr className="text-sm text-purple-800 border-b">
                <th scope="col" className="py-3.5 pl-4 pr-3 text-left sm:pl-0 ">Product Name</th>
                <th scope="col" className="hidden px-3 py-3.5 text-left lg:table-cell ">Product Code</th>
                <th scope="col" className="hidden px-3 py-3.5 text-left sm:table-cell ">QTY</th>
                <th scope="col" className="hidden px-3 py-3.5 text-left sm:table-cell ">Price</th>
                <th scope="col" className="hidden px-3 py-3.5 text-left sm:table-cell">Discount Price</th>
                <th scope="col" className="px-3 py-3.5 text-left">QR Code</th>
                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="">Action</span>
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-200 bg-white font-medium text-base">
              {products.map((product, index) => (
                <tr key={index}>
                  <td className="w-full max-w-0 py-4 pl-4 pr-3 text-base font-medium text-gray-900 sm:w-auto sm:max-w-none sm:pl-0 capitalize">{product.name}</td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 lg:table-cell uppercase">{product.code}</td>
                  <td className="hidden px-3 py-4 text-sm text-gray-500 sm:table-cell">
                    <span className="bg-purple-500 text-white font-semibold mx-auto px-2 py-2 rounded text-base">{product.quantity}</span>
                  </td>
                  <td className="hidden px-3 py-4 text-lg text-gray-500 sm:table-cell capitalize">
                    <span className="text-sm">RM</span> {" "}
                    <span className="text-bold">{product.price}</span>
                  </td>
                  <td className="hidden px-3 py-4 text-lg text-gray-500 sm:table-cell capitalize">
                    <span className="text-sm">RM</span> {" "}
                    <span className="text-bold text-purple-600">{product.discountPrice}</span>
                  </td>

                  <td className="px-3 py-4 text-sm text-gray-500"><div ref={(el) => (qrCodeRefs.current[index] = el)} /></td>

                  <td className="space-x-2 flex items-center justify-center py-4 pl-3 pr-4 text-sm font-medium sm:pr-0 cursor-pointer text-center">
                    <button onClick={() => handleStickerPrintClick(index)} className="px-2 py-2.5 bg-gray-500 rounded-md text-white hover:bg-gray-300 hover:text-gray-800 font-semibold text-xs" >
                      Print Sticker
                    </button>

                    <span onClick={() => handleEditClick(index)}>
                      <MdModeEdit className="text-center mx-auto bg-gray-200 hover:bg-gray-400 hover:text-white w-9 h-9 p-2 rounded-full" />
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showEdit && (
          <EditModal
            product={products[selectedProductIndex]}
            onSave={handleSaveEdit}
            onClose={() => setShowEdit(false)}
          />
        )}

        {
          showStickerPrinter && products[selectedProductIndex] && (
            <StickerPrinter
              product={products[selectedProductIndex]}
              onClose={() => setShowStickerPrinter(false)}
            />
          )
        }


      </Container>
    </div>
  );
}
