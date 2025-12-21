import { Link } from "react-router-dom";

const Grab = () => {
  return (
    <div className="bg-[url('/src/assets/home-page/home-img-1.png')]  h-[430px] bg-cover bg-center flex items-center justify-center">
      <div className="flex flex-col justify-center items-center gap-3">
        <h1 className="text-2xl text-white font-bold">
          Do more with{" "}
          <span className="text-golden uppercase font-extrabold">Juwelo</span>
        </h1>
        <p className="text-md text-white">
          Browse and purchase products in various styles and materials.
        </p>
        <Link
          to="/task"
          className="bg-black text-white rounded-md px-4 py-2 w-32 text-center hover:opacity-90"
        >
          Grab Order
        </Link>
      </div>
    </div>
  );
};

export default Grab;
