const Button = ({
  children,
  type = "button",
  bgColor = "bg-green-600",
  color = "text-white",
  className = "",
  ...props
}) => {
  return (
    <button
      type={type}
      className={`${bgColor} ${color} ${className} m-1 px-4 py-1 font-medium rounded-full hover:opacity-80`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
