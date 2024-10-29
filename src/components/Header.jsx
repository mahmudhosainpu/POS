import { Container } from "./Container";


export default function Header() {
  return (
    <div className="py-6 bg-slate-200 shadow-md">
      <Container>

        <div className="space-x-4 flex justify-center">

          <button className="font-semibold px-5 py-2.5 bg-gray-400 duration-300 text-white outline-none focus:outline-none rounded-md hover:bg-purple-800">Sell</button>
          <button className="font-semibold px-5 py-2.5 bg-gray-400 duration-300 text-white outline-none focus:outline-none rounded-md hover:bg-purple-800">Add Product</button>
          <button className="font-semibold px-5 py-2.5 bg-gray-400 duration-300 text-white outline-none focus:outline-none rounded-md hover:bg-purple-800">Total Sell</button>

        </div>

      </Container>
    </div>
  );
}