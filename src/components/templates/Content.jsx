const Content = ({ children, className }) => {
  return (
    <section
      className={`p-8 w-full bg-gray-200 rounded-xl overflow-auto ${className}`}
    >
      {children}
    </section>
  );
};

export default Content;
