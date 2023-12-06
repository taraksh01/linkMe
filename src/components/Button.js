const Button = ({
  children,
  type = "button",
  bgColor = "bg-purple-700",
  color = "text-white",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`${bgColor} ${color} ${className} m-1 px-4 py-2 font-medium rounded-full transition-opacity duration-300 hover:opacity-90`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
