import { Link } from "react-router-dom";
import logo from "../../assets/Logo.svg";
import moviesIcon from "../../assets/MoviesIcon.svg";
import roomsIcon from "../../assets/RoomsIcon.svg";
import scheduleIcon from "../../assets/ScheduleIcon.svg";
import reservationsIcon from "../../assets/ReservationsIcon.svg";
import NavItem from "./NavItem";
import { useContext } from "react";
import { MyContext } from "../../utils/MyContext";

const Navbar = () => {
  const { page, setPage } = useContext(MyContext);

  const routes = [
    { title: "Películas", icon: moviesIcon, linkTo: "/movies" },
    { title: "Salas", icon: roomsIcon, linkTo: "/rooms" },
    { title: "Horarios", icon: scheduleIcon, linkTo: "/schedules" },
    { title: "Reservas", icon: reservationsIcon, linkTo: "/reservations" },
  ];

  return (
    <nav className="flex flex-col gap-8">
      <img src={logo} className="bg-gray-200 px-6 py-8 rounded-xl" />
      <ul className="w-80 bg-gray-200 rounded-xl flex flex-col px-2 py-12 gap-4 h-full">
        {/* <NavItem title="Home" linkTo="/" icon={moviesIcon} /> */}
        {routes.map((route, index) => (
          <NavItem
            key={index}
            title={route.title}
            linkTo={route.linkTo}
            icon={route.icon}
            isFocused={page === route.title}
          />
        ))}
      </ul>
    </nav>
  );
};

export default Navbar;
