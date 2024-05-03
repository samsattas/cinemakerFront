const CustomButton = ({ children, onClick, ...otherProps }) => (
  <button
    className="w-fit bg-primary hover:bg-blue-800 text-white font-bold rounded-full px-5 py-3 transition-colors duration-300 ease-in-out"
    onClick={onClick}
    {...otherProps}
  >
    {children}
  </button>
);

export default CustomButton;
