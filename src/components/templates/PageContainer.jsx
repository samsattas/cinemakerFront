import Navbar from "../navigation/Navbar";

const PageContainer = ({ children }) => {
  return (
    <div className="flex gap-14 p-14 h-full">
      <Navbar />
      {children}
    </div>
  );
};

export default PageContainer;
