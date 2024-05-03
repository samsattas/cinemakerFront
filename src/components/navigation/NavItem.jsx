import { useContext } from "react";
import { Link } from "react-router-dom";
import { MyContext } from "../../utils/MyContext";

const NavItem = ({ title, linkTo, icon, isFocused }) => {
  const { page, setPage } = useContext(MyContext);
  return (
    <li>
      <Link
        to={linkTo}
        className={`flex gap-4 px-5 py-3 rounded-full items-center hover:bg-blue-400 transition-colors duration-300 ease-in-out ${
          isFocused && "bg-blue-300"
        }`}
        onClick={() => setPage(title)}
      >
        <img src={icon} alt={title} className="w-8" />
        <span className="text-xl">{title}</span>
      </Link>
    </li>
  );
};

export default NavItem;
