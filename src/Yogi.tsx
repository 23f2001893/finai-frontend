import React from "react";
import { useNavigate } from "react-router-dom";
import downloadImg from "./images/ChatGPT Image Dec 4, 2025, 08_13_22 PM.png";

const BUTTON_SIZE = 140; // px
const RADIUS = 220; // distance from center in px

const Yogi: React.FC = () => {
    const currentUser = sessionStorage.getItem("username") || "User";
	const navigate = useNavigate();
	const buttons = [
		{ angle: 0, route: "/dashboard", label: "Chat With AI" },
		{ angle: 120, route: "/manage-finances", label: "Manage Finances" },
		{ angle: 240, route: "/investment-advice", label: "Investment Advice" },
	];

	return (
		<div className="fixed inset-0 z-50 flex items-center justify-center bg-gradient-to-br from-blue-50 to-indigo-100 ">
            <div className="absolute top-16 text-center">
                <h1 className="text-4xl font-bold text-indigo-700 mb-2">Welcome, {currentUser}!</h1>
                <p className="text-lg text-indigo-600">Your Personal Finance AI Assistant</p>
            </div> 
        
			<div className="relative w-full h-full flex items-center justify-center animate-accordion-up">
				{/* Center image */}
				<img
					src={downloadImg}
                    
					alt="central"
					className="relative rounded-full shadow-2xl object-cover bg-white"
					style={{ width: 360, height: 360 }}
				/>

				{/* Three semicircular buttons placed around the image */}
			{buttons.map((btn, idx) => {
				const angle = (btn.angle * Math.PI) / 180;
				const x = Math.cos(angle) * RADIUS;
				const y = Math.sin(angle) * RADIUS;

				return (
					<button
						key={idx}
						aria-label={`navigate-to-${btn.route}`}
						onClick={() => navigate(btn.route)}
							className="absolute flex items-center justify-center text-white shadow-lg "
							style={{
								left: `calc(50% + ${x}px)`,
								top: `calc(50% + ${y}px)`,
								transform: "translate(-50%,-50%)",
								width: BUTTON_SIZE,
								height: BUTTON_SIZE / 2,
								borderRadius: BUTTON_SIZE / 2,
								background: "linear-gradient(90deg, rgba(59,130,246,1), rgba(139,92,246,1))",
								border: "4px solid rgba(255,255,255,0.12)",
								transition: "transform 200ms, box-shadow 200ms",
								cursor: "pointer",
							}}
							onMouseEnter={(e) => {
								(e.currentTarget as HTMLButtonElement).style.transform =
									"translate(-50%,-50%) scale(1.05)";
								(e.currentTarget as HTMLButtonElement).style.boxShadow =
									"0 10px 30px rgba(0,0,0,0.35)";
							}}
							onMouseLeave={(e) => {
								(e.currentTarget as HTMLButtonElement).style.transform =
									"translate(-50%,-50%)";
								(e.currentTarget as HTMLButtonElement).style.boxShadow = "";
							}}
						>
							{/* Button label */}
							<div className="text-sm font-semibold">{btn.label}</div>
						</button>
					);
				})}
			</div>
		</div>
	);
};

export default Yogi;
