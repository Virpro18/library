import Sidebar from "@/components/Sidebar";
const AdminLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex flex-col w-full h-full">
      <div className=
      "flex-1 flex items-center ">
        <Sidebar />
        <div className="py-14 px-2 md:p-0  w-full">{children}</div>
      </div>
    </div>
  );
};

export default AdminLayout;
