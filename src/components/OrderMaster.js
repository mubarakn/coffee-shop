const OrderMaster = () => {
    return (
        <div className="mt-4 bg-white p-4 rounded shadow text-sm font-light">
            <div className="flex">
                <div>Branch</div>
                <div className="flex-1 text-right cursor-pointer truncate">
                    MyBranch
                </div>
            </div>
            <div className="flex mt-2">
                <div>Order Type</div>
                <div className="flex-1 text-right cursor-pointer truncate text-teal-500 hover:underline">
                    Pick Up
                </div>
            </div>
            <div className="flex mt-2">
                <div>Customer</div>
                <div className="flex-1 text-right cursor-pointer truncate text-teal-500 hover:underline">
                    Cash Customer
                </div>
            </div>
            <div className="flex mt-2">
                <div>Receipt Notes</div>
                <div className="flex-1 text-right cursor-pointer truncate text-teal-500 hover:underline">
                    MyBranch
                </div>
            </div>
            <div className="flex mt-2">
                <div>Kitchen Notes</div>
                <div className="flex-1 text-right cursor-pointer truncate text-teal-500 hover:underline">
                    MyBranch
                </div>
            </div>
        </div>
    );
};

export default OrderMaster;
