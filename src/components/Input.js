import { forwardRef } from "react";

const Input = forwardRef(
  (
    {
      children,
      label,
      required = false,
      type = "text",
      placeholder = "type something",
      bgColor = "bg-white",
      color = "text-gray-700",
      className = "",
      error = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="mx-auto text-gray-700">
        {label && (
          <label className="block m-2  text-sm">
            {label}
            {required && <span className="text-red-500">*</span>}
            {error && (
              <span className="text-red-500 p-1">This is a required field</span>
            )}
          </label>
        )}
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
