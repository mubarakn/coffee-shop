import { forwardRef } from "react";

const Input = forwardRef(
    (
        { required, type, className, value, onChange, readOnly, placeholder },
        ref
    ) => {
        return required ? (
            <input
                ref={ref}
                required
                type={type}
                className={`bg-white block w-full p-1 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 border border-slate-300 ${className}`}
                value={value}
                onChange={(e) =>
                    typeof onChange === "function" && onChange(e.target.value)
                }
                readOnly={readOnly}
                placeholder={placeholder}
            />
        ) : (
            <input
                ref={ref}
                type={type}
                className={`bg-white block w-full p-1 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 border border-slate-300 ${className}`}
                value={value}
                onChange={(e) =>
                    typeof onChange === "function" && onChange(e.target.value)
                }
                readOnly={readOnly}
                placeholder={placeholder}
            />
        );
    }
);

export default Input;
