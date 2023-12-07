const Logo = ({
  children,
  width = "w-32",
  bgColor = "bg-transparent",
  color = "text-orange-400",
  className = "",
  ...props
}) => {
  return (
    <div
      className={`${bgColor} ${color} text-3xl font-bold inline-block px-2 py-1`}
      {...props}
    >
      {children}
    </div>
  );
};

export default Logo;
