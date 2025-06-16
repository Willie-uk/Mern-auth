import Navbar from "../basic/Navbar";
import { useAuthStore } from "../store/authStore";

const Greet = () => {
  const user = useAuthStore((state) => state.user);

  // Get the current hour
  const currentHour = new Date().getHours();
  
  // Determine the greeting based on the time of day
  let greeting: string;
  if (currentHour < 12) {
    greeting = "Good Morning";
  } else if (currentHour < 16) {
    greeting = "Good Afternoon";
  } else if (currentHour < 20) {
    greeting = "Good Evening";
  } else {
    greeting = "Happy Night";
  }

  // Determine if the business is open or closed (Open: 8 AM to 5 PM)
  const isOpen = currentHour >= 8 && currentHour < 17; // 8 AM to 5 PM (17:00)
  const businessStatus = isOpen ? "Open" : "Closed";

  // Conditional color styles for open/closed status
  const statusStyle = {
    color: isOpen ? "#007bff" : "orange", // Blue for open, orange for closed
  };

  return (
    <>
    <Navbar />
    <div className="flex items-center justify-center bg-yellow-100" style={{marginTop:"80px"}}>
      <div className="bg-white p-6 rounded shadow-md text-center space-y-4">
        <h2 className="text-2xl font-bold">
          {greeting}, {user?.name || "User"}.
        </h2>
        <h3 style={{ ...statusStyle, fontSize: "14px" }}>Status: {businessStatus}</h3>
      </div>
    </div>
    </>
  );
};

export default Greet;
