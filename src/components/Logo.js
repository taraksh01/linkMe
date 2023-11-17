const Logo = ({
  children,
  width = "w-32",
  bgColor = "bg-transparent",
  color = "text-orange-400",
  className = "",
  ...porps
}) => {
  return (
    <div
      className={`${bgColor} ${color} text-2xl font-medium inline-block px-2 py-1 m-1`}
    >
      {children}
    </div>
  );
};

export default Logo;
