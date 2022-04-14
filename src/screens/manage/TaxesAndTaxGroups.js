import Page from "../Page";
import Taxes from "./Taxes";
import TaxesGroup from "./TaxesGroup";

const TaxesAndTaxGroups = () => {
    return (
        <Page back title="Taxes &amp; Groups">
            <div className="p-10">
                <Taxes />
                <TaxesGroup />
            </div>
        </Page>
    );
};

export default TaxesAndTaxGroups;
