import { MdDeleteForever } from "react-icons/md";
import { RiEditBoxFill } from "react-icons/ri";

const TaskCard = () => {
  return (
    <div className="border border-[#A1A3AB] p-4 rounded-2xl">
      <div className="">
        <div className="text-red-500 bg-red-500 w-[21px] h-[20px] rounded-full absolute"></div>

        <div className="ml-8">
          <div className="flex justify-between">
            {/* title */}
            <h1 className="montserrat w-9/12 font-bold mb-3 text-lg">
              Attend Nischal’s Birthday Party
            </h1>

            {/* short description */}
            <div className="flex gap-3">
              <p className="text-gray-500">
                <RiEditBoxFill size={18} />
              </p>
              <p className="text-gray-500">
                <MdDeleteForever size={19} />
              </p>
            </div>
          </div>
          <p className="montserrat line-clamp-3 text-sm">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Deleniti
            neque quae porro voluptatem ipsam eligendi iste non repellat error
            debitis ducimus, corporis facilis officia animi provident maxime
            dolor atque velit?
          </p>
        </div>
        <p className="text-[10px] md:text-xs mt-3 ml-8 montserrat">
          <span className="mr-2">
            Priority: <span>Moderate </span>
          </span>
          <span className="mr-2">
            Status: <span>In Progress </span>
          </span>
          <span>
            created on: <span>20/06/2025</span>
          </span>
        </p>
      </div>
    </div>
  );
};

export default TaskCard;
