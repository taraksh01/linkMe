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
      className={`${bgColor} ${color} ${className} m-1 py-1 px-3.5 font-medium rounded-lg hover:opacity-80`}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
