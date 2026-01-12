import { motion } from "framer-motion";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const COLORS = {
  Applied: "#9CA3AF",
  Shortlisted: "#3B82F6",
  Rejected: "#EF4444",
  Offer: "#22C55E",
};

export default function StatusPieChart({ data }: { data: any[] }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="
        bg-white
        rounded-xl sm:rounded-2xl
        border border-gray-100
        px-4 py-4 sm:px-6 sm:py-6
      "
    >
      <h3 className="mb-2 sm:mb-4 text-sm sm:text-base font-semibold text-gray-800">
        Application Status
      </h3>

      <div className="h-44 sm:h-56 md:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              dataKey="value"
              nameKey="name"
              innerRadius="55%"
              outerRadius="80%"
              paddingAngle={2}
              isAnimationActive={false}  
            >
              {data.map((entry) => (
                <Cell
                  key={entry.name}
                  fill={COLORS[entry.name as keyof typeof COLORS]}
                />
              ))}
            </Pie>

            <Tooltip
              cursor={false}
              wrapperStyle={{ outline: "none" }}
              contentStyle={{
                backgroundColor: "#fff",
                borderRadius: 8,
                border: "1px solid #E5E7EB",
                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                fontSize: "12px",
              }}
              itemStyle={{ color: "#374151" }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </motion.div>
  );
}
