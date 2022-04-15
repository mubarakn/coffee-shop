import PageDetail from "../../components/PageDetail";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { getDevice, updateTags } from "./services/devicesService";
import { getTags } from "./services/tagsService";
import DeviceModal from "../../components/DeviceModal";
import AssignTags from "./AssignTags";

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
        >
            <AssignTags
                type={"device"}
                selectedTags={selectedTags}
                onSave={handleTagsSave}
                placeholder="Add tags to help you filter and group devices easily. You can create tags such as Main Cashier, Waiter, etc."
            />

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
