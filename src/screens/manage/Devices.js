import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDevices } from "./services/devicesService";
import DeviceModal from "../../components/DeviceModal";
import { getBranches } from "./services/branchesService";
import Page from "../Page";

const Devices = () => {
    const [show, toggleModal] = useState(false);
    const [devices, setDevices] = useState([]);
    const [branchesMap, setBranchesMap] = useState({});
    const [id, setId] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        getDevices().then((response) => {
            const { devices } = response.data;
            setDevices(devices);
        });

        getBranches().then((response) => {
            const { branches } = response.data;
            const branchesMap = branches.reduce((acc, item) => {
                acc[item.id] = item.name;
                return acc;
            }, {});
            setBranchesMap(branchesMap);
        });
    }, []);

    const resetData = () => {
        setId("");
        toggleModal(false);
    };

    const handleItemClick = (device) => {
        //setId(device.id);
        //toggleModal(true);
        navigate(`${device.id}`, { replace: false });
    };

    const handleOnCreate = () => {
        resetData();
        toggleModal(true);
    };

    const handleDeviceSave = (device) => {
        if (id) {
            setDevices(
                devices.map((d) => {
                    if (d.id === device.id) {
                        return device;
                    }
                    return d;
                })
            );
        } else {
            setDevices([...devices, device]);
        }
        resetData();
    };

    const handleDeviceCancel = () => {
        resetData();
    };

    const handleDeviceDelete = () => {
        setDevices(devices.filter((d) => d.id !== id));
        resetData();
    };

    return (
        <Page
            title="Devices"
            actions={
                <button
                    onClick={handleOnCreate}
                    className="ml-auto font-light bg-white px-4 py-1 rounded-lg border border-slate-300 text-slate-600 hover:border-slate-700 hover:text-slate-800"
                >
                    Create Device
                </button>
            }
        >
            <div className="px-8 md:px-16 mx-auto py-8 mb-16">
                <div className="">
                    <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                        <table className="w-full bg-white">
                            <thead>
                                <tr className="border-b border-slate-200">
                                    <th>
                                        <input type="checkbox" />
                                    </th>
                                    <th className="text-left p-4">Code</th>
                                    <th className="text-left p-4">Name</th>
                                    <th className="text-left p-4">Status</th>
                                    <th className="text-left p-4">Type</th>
                                    <th className="text-left p-4">Branch</th>
                                </tr>
                            </thead>
                            <tbody>
                                {devices.map((device, idx) => {
                                    return (
                                        <tr
                                            key={`charge-${idx}`}
                                            onClick={() =>
                                                handleItemClick(device)
                                            }
                                            className="cursor-pointer hover:bg-slate-100"
                                        >
                                            <td className="text-center p-4">
                                                <input type="checkbox" />
                                            </td>
                                            <td className="p-4">
                                                {device.code}
                                            </td>
                                            <td className="p-4">
                                                {device.name}
                                            </td>
                                            <td className="p-4">
                                                {device.isActivated ? (
                                                    <span className="bg-yellow-500 px-4 py-1 rounded-lg text-white">
                                                        Active
                                                    </span>
                                                ) : (
                                                    <span className="bg-cyan-400 px-4 py-1 rounded-lg text-white">
                                                        Not Used
                                                    </span>
                                                )}
                                            </td>
                                            <td className="p-4">
                                                {device.type}
                                            </td>
                                            <td className="p-4">
                                                {branchesMap[device.branch]}
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <DeviceModal
                id={id}
                show={show}
                onSave={handleDeviceSave}
                onCancel={handleDeviceCancel}
                onDelete={handleDeviceDelete}
                id={id}
            />
        </Page>
    );
};

export default Devices;
