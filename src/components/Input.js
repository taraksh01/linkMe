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
      message = "",
      ...props
    },
    ref
  ) => {
    return (
      <div className="mx-auto text-gray-700">
        {label && (
          <label className="block m-2  text-sm">
            {label}
            {required && <span className="text-red-500 px-1">*</span>}
            {error && (
              <span className="text-red-500 px-1">
                This is a required field
              </span>
            )}
            {message === "userName is available" ? (
              <span className="text-green-500 block">{message}</span>
            ) : (
              <span className="text-red-500 block">{message}</span>
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
