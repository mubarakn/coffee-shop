import PageDetail from "../../components/PageDetail";
import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { getDevice } from "./services/devicesService";

const DeviceDetail = () => {
    const params = useParams();

    useEffect(() => {
        getDevice(params.deviceId).then((response) => {
            console.log(response);
        });
    }, [params.deviceId]);

    return (
        <PageDetail
            title="Device Detail"
            data={[
                { label: "Reference", value: "fddhguy01" },
                { label: "Type", value: "Cashier" },
            ]}
        ></PageDetail>
    );
};

export default DeviceDetail;
