const Button = ({ title, onClick, primary, className, disabled }) => {
    return (
        <button
            disabled={disabled}
            className={`ml-auto px-4 py-2 rounded hover:shadow transition flex items-center justify-center
            ${className || ""}
            ${
                primary
                    ? `bg-teal-500 text-white ${
                          !disabled && "hover:bg-teal-400"
                      } ${disabled && "cursor-not-allowed"}`
                    : "text-slate-400 border border-slate-300 hover:text-slate-500"
            }`}
            onClick={() => typeof onClick === "function" && onClick()}
        >
            {disabled && (
                <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                >
                    <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                    ></circle>
                    <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                </svg>
            )}
            {disabled ? "Processing..." : title}
        </button>
    );
};

export default Button;
