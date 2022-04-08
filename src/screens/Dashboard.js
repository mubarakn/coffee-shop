import Master from "./Master";
import Dropdown from "../components/Dropdown";

const data = [
    { value: 1, label: "Mubarak" },
    { value: 2, label: "Sulaiman" },
    { value: 3, label: "Mudasir" },
    { value: 4, label: "Imran Khan" },
];

const Dashboard = () => {
    return (
        <div className="flex w-full h-full flex items-center justify-center">
            <div className="w-1/4">
                <Dropdown
                    data={data}
                    onOptionSelected={(data) => console.log(data)}
                    multiple
                    selectedValue={[1, 2]}
                />
            </div>
        </div>
    );
};

export default Dashboard;
