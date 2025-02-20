import Todo from "../Todo/Todo";

const Dashboard = () => {
  return (
    <div className="mt-10 w-full">
      <h1 className="text-5xl mb-6">
        <span className="montserrat">Welcome back</span>,{" "}
        <span className="italia">Shah Alim</span>
        <span>👋</span>
      </h1>

      {/* task container */}
      <div className="flex gap-6 border-2 rounded border-gray-400 p-4">
        <Todo />
        <Todo />
      </div>
    </div>
  );
};

export default Dashboard;
