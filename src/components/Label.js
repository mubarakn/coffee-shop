const Label = ({ children, className }) => {
    return (
        <label
            className={`block font-light text-slate-600 text-sm ${className}`}
        >
            {children}
        </label>
    );
};

export default Label;
