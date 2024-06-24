import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Card from "./Card";
import Header from "../common/Header";
import Navbar from "../common/Navbar";

const Home = () => {
  const navigate = useNavigate();
  const [allBoards, setAllBoards] = useState([]);

  const handleLogout = () => {
    localStorage.clear();
    navigate("/");
  };

  const handleCreateBoard = () => {
    navigate("/boardBuilder");
  };
  const page = 1;
  const pageSize = 10;

  const fetchBoards = async () => {
    try {
      const response = await fetch(
        `https://prymr-dev-backend.vercel.app/api/board/fetchPublicBoards?page=${page}&pageSize=${pageSize}`
      );

      const data = await response.json();

      setAllBoards(data.data.boards);
      console.log("Data", data.count);
    } catch (error) {
      console.log("Error fetching boards", error);
    }
  };

  useEffect(() => {
    fetchBoards();
  }, []);

  if (!allBoards) {
    return <div>Loading...</div>;
  }

  return (
    // <div className="container">
    //   <h1 className="text-5xl  justify-center ">Home</h1>
    //   <div className="float-right top-0">
    //     <button
    //       className="bg-blue-600 mb-4 m-2 w-[20vw] text-sm ]"
    //       onClick={handleLogout}
    //     >
    //       {" "}
    //       LOGOUT{" "}
    //     </button>
    //     <button
    //       className="bg-blue-600 m-2 w-[20vw] flex justify-center text-sm  ]"
    //       onClick={handleCreateBoard}
    //     >
    //       {" "}
    //       Create Board{" "}
    //     </button>
    //   </div>
    // </div>
    <div className="relative">
      <Header />
      <div className="pt-16">
        {allBoards.map((board) => (
          <Card key={board._id} board={board} />
        ))}
      </div>
      <Navbar />
    </div>
  );
};

export default Home;
