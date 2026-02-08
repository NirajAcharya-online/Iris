import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Cell,
} from "recharts";
import {
  useGetAllOrdersQuery,
  useGetAllProductsQuery,
  useGetAllUsersQuery,
} from "./adminApi";

const COLORS = ["#FFBB28", "#0088FE", "#00C49F", "#FF8042"];

function AdminDashboard() {
  const { data: products, isLoading: productsLoading } =
    useGetAllProductsQuery();
  const { data: users, isLoading: usersLoading } = useGetAllUsersQuery();
  const { data: orders, isLoading: ordersLoading } = useGetAllOrdersQuery();

  const defaultStatuses = {
    Pending: 0,
    Shipped: 0,
    Delivered: 0,
    Cancelled: 0,
  };

  const totalRevenue =
    orders
      ?.filter((order) => order.status === "Delivered")
      ?.reduce((sum, order) => sum + (Number(order.summary.totalPrice) || 0), 0) || 0;

  const orderStatusMap =
    orders?.reduce(
      (acc, order) => {
        const status = order.status || "Pending";
        acc[status] = (acc[status] || 0) + 1;
        return acc;
      },
      { ...defaultStatuses },
    ) || defaultStatuses;

  const dynamicOrderStatus = Object.keys(orderStatusMap).map((key) => ({
    name: key,
    value: orderStatusMap[key],
  }));

  const categoryMap = products?.reduce((acc, prod) => {
    const cat = prod.category || "Uncategorized";
    acc[cat] = (acc[cat] || 0) + 1;
    return acc;
  }, {});

  const dynamicCategoryData = categoryMap
    ? Object.keys(categoryMap).map((key) => ({
        name: key,
        count: categoryMap[key],
      }))
    : [];

  if (productsLoading || usersLoading || ordersLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Admin Dashboard</h1>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Stat
          title="Revenue (Delivered)"
          value={`$${totalRevenue.toLocaleString()}`}
          color="border-green-500"
        />
        <Stat
          title="Total Orders"
          value={orders?.length || 0}
          color="border-blue-500"
        />
        <Stat
          title="Total Users"
          value={users?.length || 0}
          color="border-purple-500"
        />
        <Stat
          title="Total Products"
          value={products?.length || 0}
          color="border-orange-500"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h2 className="font-semibold mb-3">Revenue (Mock Trend)</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart
              data={[
                { m: "Jan", r: 400 },
                { m: "Feb", r: 700 },
                { m: "Mar", r: totalRevenue },
              ]}
            >
              <XAxis dataKey="m" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Line
                type="monotone"
                dataKey="r"
                stroke="#10b981"
                strokeWidth={3}
                dot={{ r: 6 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-100">
          <h2 className="font-semibold mb-3">Products by Category</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={dynamicCategoryData}>
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <CartesianGrid strokeDasharray="3 3" vertical={false} />
              <Bar dataKey="count" fill="#6366f1" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-white p-4 rounded-xl shadow-sm lg:col-span-2 border border-gray-100">
          <h2 className="font-semibold mb-3 text-center">
            Order Status Distribution
          </h2>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={dynamicOrderStatus}
                dataKey="value"
                nameKey="name"
                outerRadius={100}
                label={({ name, value }) =>
                  value > 0 ? `${name}: ${value}` : null
                }
              >
                {dynamicOrderStatus.map((entry, index) => (
                  <Cell
                    key={`cell-${index}`}
                    fill={COLORS[index % COLORS.length]}
                  />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
          <div className="flex justify-center gap-4 mt-2">
            {dynamicOrderStatus.map((entry, index) => (
              <div
                key={index}
                className="flex items-center gap-1 text-xs font-medium text-gray-600"
              >
                <div
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: COLORS[index % COLORS.length] }}
                ></div>
                {entry.name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ title, value, color }) {
  return (
    <div
      className={`bg-white p-5 rounded-xl shadow-sm border-l-4 ${color} hover:shadow-md transition-shadow`}
    >
      <p className="text-xs text-gray-400 uppercase font-black tracking-widest mb-1">
        {title}
      </p>
      <p className="text-2xl font-bold text-gray-900">{value}</p>
    </div>
  );
}

export default AdminDashboard;
