import Page from "../screens/Page";
import DataCard from "./DataCard";

const PageDetail = ({ title, actions, data, children }) => {
    return (
        <Page back title={title} actions={actions}>
            <div className="px-8 md:px-16 py-8 mx-auto max-w-4xl">
                <DataCard data={data} />
            </div>
            <div>{children}</div>
        </Page>
    );
};

export default PageDetail;
