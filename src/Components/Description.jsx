import { useSelector } from "react-redux";

export default function Description() {
  const { products } = useSelector((state) => state.user);
 
  
  return (
    <div className="w-full p-2 text-black font-bold text-center text-[1.1rem] ">
      {
        products?.description
      }
    </div>
  );
}
