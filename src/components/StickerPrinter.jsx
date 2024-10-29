import { useEffect, useRef, useState } from "react";
import { Dialog } from "@headlessui/react";
import QRCodeStyling from "qr-code-styling";
import { IoCloseCircleOutline } from "react-icons/io5";


export default function StickerPrinter({ onClose, product }) {
  const qrCodeRef = useRef(null);
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    // Set modal open state to trigger QR code generation
    setModalOpen(true);
    return () => setModalOpen(false); // Reset when closing modal
  }, []);

  useEffect(() => {
    // Generate QR code only when modal is fully opened
    if (modalOpen && product) {
      const qrCode = new QRCodeStyling({
        width: 100,
        height: 100,
        dotsOptions: { color: "#000000", type: "rounded" },
        backgroundOptions: { color: "#FFFFFF" },
        data: `Name : ${product.name.toUpperCase()}\nCode : ${product.code.toUpperCase()}\nPrice : RM ${product.price.toUpperCase()}\nDiscount Price : RM ${product.discountPrice}`,
      });

      if (qrCodeRef.current) {
        qrCode.append(qrCodeRef.current);
      }
    }
  }, [modalOpen, product]);

  return (
    <Dialog open onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
      <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center">
        <div className="flex w-full md:w-full min-h-full items-center justify-center text-center">




          <Dialog.Panel className="w-full md:w-fit relative transform overflow-hidden rounded-lg bg-white  text-left shadow-xl">
            <div className="flex justify-end p-4">
              <button onClick={onClose} className="">
                <IoCloseCircleOutline className="p-1 w-8 h-8 rounded-full bg-gray-100 text-gray-600 hover:bg-gray-300" />
              </button>
            </div>

            <div className="px-10 ">

              <div className=" mx-auto flex flex-col justify-between w-[200px] h-[300px] border border-gray-500 p-4 text-center space-y-">
                <div className="">
                  <h1 className="font-semibold text-xl capitalize">Super Clearance</h1>
                  <h1 className="font-semibold">{product.name.toUpperCase()}</h1>
                  <h1 className="font-semibold capitalize">{product.discountPrice}</h1>
                </div>
                <h1 className="font-semibold text-sm">RM {" "}
                  <span className="text-2xl">
                    {product.price.toUpperCase()}
                  </span>
                </h1>
                <div className="flex flex-col items-center justify-center mt-2">
                  <div ref={qrCodeRef} />
                  <h1 className=" font-semibold mt-">{product.code.toUpperCase()}</h1>
                </div>
                
              </div>
            </div>


            <div className="flex justify-center mt-4 pb-6">
              <button
                className="w-fit bg-indigo-500 text-white px-4 py-2 rounded cursor-pointer hover:opacity-70 font-semibold"

              >
                Print Strike
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
