import PageDetail from "../../components/PageDetail";
import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { deleteDevice, getDevice, updateTags } from "./services/devicesService";
import { getTags } from "./services/tagsService";
import DeviceModal from "../../components/DeviceModal";
import AssignTags from "./AssignTags";
import Button from "../../components/Button";

/* type
  code
  name
  branch
  menuGroup
  receivesOnlineOrders
  activationCode
  isActivated
  slNo
  model
  appVersion
  systemVersion
  lastSync
  lastOnline
  lastOrder
  tags, */

const DeviceDetail = () => {
    const navigate = useNavigate();
    const params = useParams();
    const [showModal, toggleModal] = useState(false);
    const [device, setDevice] = useState({});
    const [tags, setTags] = useState([]);
    const [selectedTags, setSelectedTags] = useState([]);

    useEffect(() => {
        getDevice(params.deviceId).then((response) => {
            setDevice(response.data);
            setSelectedTags(response.data.tags);
        });

        getTags("device").then((response) => {
            setTags(response.data.tags);
        });
    }, [params.deviceId]);

    const handleSave = (device) => {};

    const handleCancel = () => {
        toggleModal(false);
    };

    const handleTagsSave = (tags) => {
        updateTags(params.deviceId, tags).then((response) => {
            if (response.status === 202) {
                setSelectedTags(tags);
            }
        });
    };

    const handleDelete = () => {
        if (window.confirm("Are you sure, you want to delete this device?")) {
            deleteDevice(params.deviceId).then((response) => {
                if (response.status === 204) {
                    navigate("/manage/devices", { replace: true });
                }
            });
        }
    };

    const handleEditDevice = () => {
        toggleModal(true);
    };

    return (
        <PageDetail
            title="Device Detail"
            data={[
                { label: "Code", value: device.code || "-" },
                { label: "Type", value: device.type || "-" },
                { label: "Name", value: device.name || "-" },
                {
                    label: "Branch",
                    value: device.branch ? device.branch.name : "-",
                },
                { label: "Menu Group", value: device.menuGroup || "-" },
                {
                    label: "Receives Online Orders",
                    value: device.receivesOnlineOrders || "-",
                },
                { label: "Model", value: device.model || "-" },
                { label: "App Version", value: device.appVersion || "-" },
                { label: "System Version", value: device.systemVersion || "-" },
                { label: "Last Sync", value: device.lastSync || "-" },
                { label: "Last Online", value: device.lastOnline || "-" },
                { label: "Last Order", value: device.lastOrder || "-" },
            ]}
            actions={
                <>
                    <Button title="Edit Device" onClick={handleEditDevice} />
                </>
            }
        >
            <AssignTags
                type={"device"}
                selectedTags={selectedTags}
                onSave={handleTagsSave}
                placeholder="Add tags to help you filter and group devices easily. You can create tags such as Main Cashier, Waiter, etc."
            />

            {/* Delete Device */}
            <div className="px-8 md:px-16 py-8 mx-auto max-w-4xl">
                <h1 className="text-xl">Delete Device</h1>

                <div className="flex flex-wrap bg-white p-6 rounded-lg mt-6">
                    <div className="flex items-center">
                        <p className="mr-10">
                            Make sure all active orders are uploaded. You will
                            lose all data on the device if you delete it!
                        </p>
                        <button
                            className="ml-auto p-2 rounded-lg bg-pink-500 text-white w-48 text-center hover:bg-pink-700 cursor-pointer transition"
                            onClick={handleDelete}
                        >
                            Delete Device
                        </button>
                    </div>
                </div>
            </div>

            <DeviceModal
                id={params.deviceId}
                show={showModal}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        </PageDetail>
    );
};

export default DeviceDetail;
