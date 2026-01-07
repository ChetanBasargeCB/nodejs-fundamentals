import { useState } from "react";
import { MdEditCalendar } from "react-icons/md";
import { RiDeleteBin2Line } from "react-icons/ri";
import axios from "axios";
import { useEffect } from "react";

export default function Todo() {
  const date = new Date();
  const nowdate = date.toLocaleDateString();
  const [task, setTask] = useState({ id: "", task: "" });
  const [store, setStore] = useState([]);


  //! Backend Connections
  const fetchData = async () => {
    try {
      const connect = await axios.get("http://10.254.61.182:3000");
      setStore(connect.data);
    } catch (error) {
      console.log("Fetching error", error);
    }
  };
  useEffect(() => {
    fetchData();
  }, []);

  const handelSubmit = async (e) => {
    e.preventDefault();
    if (!task.task) return;
    if (store.some((item) => item.task == task.task)) {
      alert("Task Already Added");
      setTask({ id: "", task: "" });
      return;
    }
    //! data Sending to backend
    const data = await axios.post("http://10.254.61.182:3000", task);
    alert(data.data.message)
    fetchData();

    //  setStore(prev=>[...prev,task])
    setTask({ id: "", task: "" });
  };
  //? Controll Task
  const nowtime = date.getTime();
  const handelChange = (e) => {
    setTask((prev) => {
      return { ...prev, id: nowtime, [e.target.name]: e.target.value };
    });
  };
  //? Delete Task
  const handelDelete = async (id) => {
    // const updated = store.filter((item)=>item.id!==id)
    // setStore(updated)

    //! data deleting from backend
    const data = await axios.delete(`http://10.254.61.182:3000/${id}`);
    alert(data.data.message);
    fetchData();
  };

  //?  Edit Task
  const handelEdit = (id) => {
    const founded = store.find((item) => item.id == id);
    setTask({ id: founded.id, task: founded.task });
    
  };
  return (
    <div className="min-h-screen flex  justify-center bg-gray-800">
      <div className="">
        <div className="  items-center flex flex-col font-bold font-serif">
          <h1 className="text-blue-200 text-2xl">TODO LIST</h1>
          <p className=" bg-linear-to-r from-purple-500 to-pink-300 p-x-1 "> {nowdate}</p>
        </div>
        <div>
          <form onSubmit={handelSubmit}>
            <input
              type="text"
              name="task"
              value={task.task}
              onChange={handelChange}
              className="bg-gray-100 outline-none p-2 mt-2 ml-10 rounded-l-xs border-b-3 border-b-blue-600 outline-"
            />
            <button className="bg-red-500 p-2 rounded-l-xs-xs border-b-3 border-b-blue-400">
              Add Task
            </button>
          </form>
        </div>
        
        <div className="flex mt-20 gap-5  bg-gray-200 p-4 flex-wrap  ">
          {store.map((item) => (
            <div
              key={item.id}
              className="bg-white p-2 rounded-xs  w-50 border-t-4 border-t-green-400 flex  gap-4  hover:scale-105 "
            >
              <div className="text-[20px] text-xs flex-1 "> {item.task}</div>
              <span
                onClick={() => handelEdit(item.id)}
                className="text-yellow-400 text-lg hover:scale-110"
              >
                <MdEditCalendar />
              </span>
              <span
                onClick={() => handelDelete(item.id)}
                className="text-red-500 text-lg hover:scale-110"
              >
                <RiDeleteBin2Line />
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
