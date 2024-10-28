import { useState } from "react";
import { Dialog } from "@headlessui/react";

export default function EditModal({ product, onSave, onClose }) {
  const [name, setName] = useState(product.name);
  const [code, setCode] = useState(product.code);
  const [description, setDescription] = useState(product.description);
  const [quantity, setQuantity] = useState(product.quantity);
  const [price, setPrice] = useState(product.price);

  const handleSave = () => {
    onSave({
      name,
      code,
      description,
      quantity,
      price,
    });
  };

  return (
    <Dialog open onClose={onClose} className="relative z-10">
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto flex items-center justify-center">
        <div className=" flex w-full md:w-full min-h-full items-center justify-center text-center">
          <Dialog.Panel className=" w-full md:w-[40%] relative transform overflow-hidden rounded-lg bg-white px-12 py-8 text-left shadow-xl">
            <h1 className="text-xl font-semibold">Edit Product</h1>

            <div className="mt-6 space-y-4">
              <div className="space-y-1 text-sm">
                <label>Product Name</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="border px-4 py-2 text-base w-full outline-none ring-2 ring-purple-200 focus:ring-purple-500 rounded capitalize"
                />
              </div>

              <div className="space-y-1 text-sm">
                <label>Product Code</label>
                <input
                  type="text"
                  value={code}
                  onChange={(e) => setCode(e.target.value)}
                  className="border px-4 py-2 text-base w-full outline-none ring-2 ring-purple-200 focus:ring-purple-500 rounded uppercase"
                />
              </div>

              <div className="space-y-1 text-sm">
                <label>Description</label>
                <input
                  type="text"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="border px-4 py-2 text-base w-full outline-none ring-2 ring-purple-200 focus:ring-purple-500 rounded capitalize"
                />
              </div>

              <div className="flex  space-x-4">
                <div className="space-y-1 text-sm">
                  <label>Quantity</label>
                  <input
                    type="number"
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    className="border px-4 py-2 text-base w-full outline-none ring-2 ring-purple-200 focus:ring-purple-500 rounded"
                  />
                </div>

                <div className="space-y-1 text-sm">
                  <label>Price</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="border px-4 py-2 text-base w-full outline-none ring-2 ring-purple-200 focus:ring-purple-500 rounded"
                  />
                </div>
              </div>
            </div>


            <div className="flex  mt-4">
              <button onClick={handleSave} className="w-full bg-indigo-500 text-white px-4 py-2 rounded cursor-pointer hover:opacity-70">Save</button>
              <button onClick={onClose} className="w-full bg-gray-300 px-4 py-2 rounded ml-2 cursor-pointer hover:opacity-70">Cancel</button>
            </div>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
}
