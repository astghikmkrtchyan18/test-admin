import { ArrowUpRight, DollarSign, PlusCircle, Users } from "lucide-react";

const stats = [
	{
		title: "Total Tasks",
		value: "$124,563",
		change: "+12.5%",
		trend: "up",
		icon: DollarSign,
		color: "from-emerald-500 to-teal-600",
		bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
		textColor: "text-emerald-600 dark:text-emerald-400",
	},
	{
		title: "Active Users",
		value: "8,549",
		change: "+8.2%",
		trend: "up",
		icon: Users,
		color: "from-blue-500 to-indigo-600",
		bgColor: "bg-blue-50 dark:bg-blue-900/20",
		textColor: "text-blue-600 dark:text-blue-400",
	},
];

export const StatsGrid = () => {
	const onAdd = () => console.log("Add new stat...");

	return (
		<div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
			{/* Add Button Card */}
			<div className="flex items-center justify-center bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl rounded-2xl p-6 min-h-[150px] border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300 group">
				<button
					onClick={onAdd}
					className="flex flex-col items-center justify-center text-slate-600 dark:text-slate-300 hover:text-emerald-500 transition-all"
				>
					<PlusCircle size={50} className="mb-2" />
					<span className="text-sm font-medium">Add Metric</span>
				</button>
			</div>

			{/* Stat Cards */}
			{stats.map((state, index) => {
				const progressWidth = state.trend === "up" ? "70%" : "40%";
				return (
					<div
						key={index}
						className="flex flex-col  justify-between bg-white/80 dark:bg-slate-900/80 rounded-2xl p-6 min-h-[150px] border border-slate-200/50 dark:border-slate-700/50 hover:shadow-lg transition-all duration-300 group"
					>
						<div className="flex items-start justify-between">
							<div className="flex-1">
								<p className="text-sm font-medium text-slate-600 dark:text-slate-400 mb-2">
									{state.title}
								</p>
								<p className="text-3xl font-bold text-slate-800 dark:text-white mb-3">
									{state.value}
								</p>
								<div className="flex items-center space-x-2">
									<ArrowUpRight
										className={`w-4 h-4 ${state.trend === "up"
												? "text-emerald-500"
												: "text-red-500"
											}`}
									/>
									<span
										className={`text-sm font-semibold ${state.trend === "up"
												? "text-emerald-500"
												: "text-red-500"
											}`}
									>
										{state.change}
									</span>
									<span className="text-sm text-slate-500 dark:text-slate-400">
										vs Last month
									</span>
								</div>
							</div>
							<div
								className={`p-3 rounded-xl ${state.bgColor} group-hover:scale-110 transition-all duration-300`}
							>
								<state.icon className={`w-6 h-6 ${state.textColor}`} />
							</div>

						</div>
						{/* Progress bar */}
						<div className=" relative  h-2 bg-slate-100 dark:bg-slate-800 rounded-full overflow-hidden">
							<div
								className={`h-full bg-linear-to-r ${state.color} rounded-full`}
								style={{ width: progressWidth }}
							/>
						</div>

					</div>
				);
			})}
		</div>
	);
};
