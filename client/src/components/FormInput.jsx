import { forwardRef } from "react";

const FormInput = forwardRef(function (
  { type, name, placeholder, handleChange },
  ref
) {
  return (
    <input
      className="bg-primary-100 py-1 px-3 text-secondary-800 rounded-md font-medium"
      type={type}
      ref={ref}
      name={name}
      placeholder={placeholder}
      onChange={handleChange}
    />
  );
});
FormInput.displayName = "FormInput";
export default FormInput;
