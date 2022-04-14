import { AiOutlineLeft } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const Page = ({ links, children, title, back, actions }) => {
    const navigate = useNavigate();

    return (
        <>
            <div className={`bg-white px-10 ${back ? "py-6" : "pt-2"}`}>
                {back && (
                    <button
                        className="flex items-center text-slate-600 hover:text-slate-700"
                        onClick={() => navigate(-1)}
                    >
                        <AiOutlineLeft className="mr-1" />
                        <span className="font-light">Back</span>
                    </button>
                )}
                <div className="flex">
                    <h1
                        className={`text-3xl font-light ${
                            !back ? "py-6" : "pb-4"
                        }`}
                    >
                        {title}
                    </h1>
                    {actions && (
                        <div className="lg:ml-auto flex items-center">
                            {actions}
                        </div>
                    )}
                </div>

                {links}
            </div>
            <div className="flex-1 overflow-y-auto">{children}</div>
        </>
    );
};

export default Page;
