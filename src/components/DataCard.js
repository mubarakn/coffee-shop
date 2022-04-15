const DataCard = ({ data }) => {
    const output = data.map((d, i) => {
        return (
            <div key={`data-point-${i}`} className="w-full px-6 mb-5 lg:w-1/2">
                <div className=" border-b border-slate-300">
                    <div className="text-slate-600 mb-1 font-light">
                        {d.label}
                    </div>
                    <div className="mb-1 font-semibold truncate">{d.value}</div>
                </div>
            </div>
        );
    });

    return (
        <div className="w-full bg-white shadow-lg rounded-lg p-10 flex flex-wrap">
            {output}
        </div>
    );
};

export default DataCard;
