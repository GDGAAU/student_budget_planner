"use client";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import NavCard from "./NavCard";

const SideBar = () => {
  const router = useRouter(); // Initialize the router object

  return (
    <div
      style={{
        position: "fixed", // Fix the sidebar to the left
        top: 0,
        left: 0,
        height: "100vh", // Full height of the viewport
        width: "300px", // Set a fixed width for the sidebar
        backgroundColor: "white", // Light background color
        padding: "20px", // Add some padding
        // boxShadow: '2px 0 5px rgba(0, 0, 0, 0.1)', // Add a shadow for depth
        overflowY: "auto", // Allow scrolling if content overflows
        border: "2px solid #f0f0f0", // Add a border to the sidebar
      }}
      className="flex flex-col"
    >
      <NavCard title="Home" onClick={() => router.push("/home")} />
      <NavCard
        title="Expense and Analytics"
        onClick={() => router.push("/category")}
      />
      <NavCard title="Education" onClick={() => router.push("/educational")} />
    </div>
  );
};

export default SideBar;
