import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      children,
      label,
      type = "text",
      placeholder = "type something",
      bgColor = "bg-white",
      color = "text-gray-700",
      className = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="mx-auto text-gray-700">
        {label && <label className="block m-2  text-sm">{label}</label>}
        <input
          type={type}
          placeholder={placeholder}
          className={`${className} ${bgColor} ${color} py-1.5 px-4 rounded-full border border-gray-300 shadow-md outline-none mb-2`}
          ref={ref}
          {...props}
        />
      </div>
    );
  }
);

export default Input;
