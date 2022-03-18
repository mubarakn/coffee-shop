const MasterContentHeader = ({ title, children }) => {
    return (
        <div className="bg-white p-6 flex items-center">
            <h1 className="text-3xl font-light text-slate-600">{title}</h1>
            {children}
        </div>
    );
};

export default MasterContentHeader;
