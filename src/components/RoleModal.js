import { useEffect, useState } from "react";
import Label from "./Label";
import Modal from "./Modal";
import {
    getRole,
    updateRole,
    deleteRole,
    createRole,
} from "../screens/manage/services/rolesService";

const RoleModal = ({ show, id, onDelete, onCancel, onSave }) => {
    const [name, setName] = useState("");
    //Order Authorities
    const [readOrders, setReadOrders] = useState(false);
    const [manageOrders, setManageOrders] = useState(false);
    const [manageOrderTags, setManageOrderTags] = useState(false);
    //Customer Authorities
    const [readCustomers, setReadCustomers] = useState(false);
    const [readCustomersInsights, setReadCustomerInsights] = useState(false);
    const [manageCustomers, setManageCustomers] = useState(false);
    const [manageCustomerHouseAccount, setManageCustomerHouseAccount] =
        useState(false);
    const [manageCustomerLoyalty, setManageCustomerLoyalty] = useState(false);
    //Inventory Authorities
    const [readInventoryItems, setReadInventoryItems] = useState(false);
    const [manageInventoryItems, setManageInventoryItems] = useState(false);
    const [readSuppliers, setReadSuppliers] = useState(false);
    const [manageSuppliers, setManageSuppliers] = useState(false);
    const [createPurchaseOrders, setCreatePurchaseOrders] = useState(false);
    const [submitPurchaseOrders, setSubmitPurchaseOrders] = useState(false);
    const [approvePurchaseOrders, setApprovePurchaseOrders] = useState(false);
    const [viewApprovedPurchaseOrders, setViewApprovedPurchaseOrders] =
        useState(false);
    const [createTransferOrders, setCreateTransferOrders] = useState(false);
    const [submitTransferOrders, setSubmitTransferOrders] = useState(false);
    const [createTransfers, setCreateTransfers] = useState(false);
    const [sendAndReceiveTransfers, setSendAndReceiveTransfers] =
        useState(false);
    const [createPurchasing, setCreatePurchasing] = useState(false);
    const [submitPurchasing, setSubmitPurchasing] = useState(false);
    const [createProduction, setCreateProduction] = useState(false);
    const [submitProduction, setSubmitProduction] = useState(false);
    const [createQuantityAdjustment, setCreateQuantityAdjustment] =
        useState(false);
    const [submitQuantityAdjustment, setSubmitQuantityAdjustment] =
        useState(false);
    const [createCostAdjustment, setCreateCostAdjustment] = useState(false);
    const [submitCostAdjustment, setSubmitCostAdjustment] = useState(false);
    const [createInventoryCount, setCreateInventoryCount] = useState(false);
    const [submitInventoryCount, setSubmitInventoryCount] = useState(false);
    const [readOrderTransactions, setReadOrderTransactions] = useState(false);
    //Menu Authorities
    const [readMenu, setReadMenu] = useState(false);
    const [manageMenu, setManageMenu] = useState(false);
    //Other Authorities
    const [manageIngredients, setManageIngredients] = useState(false);
    const [manageCosts, setManageCosts] = useState(false);
    //Admin Authorities
    const [manageBranches, setManageBranches] = useState(false);
    const [manageCoupons, setManageCoupons] = useState(false);
    const [manageDevices, setManageDevices] = useState(false);
    const [manageDiscounts, setManageDiscounts] = useState(false);
    const [manageGiftCards, setManageGiftCards] = useState(false);
    const [managePromotions, setManagePromotions] = useState(false);
    const [manageSettings, setManageSettings] = useState(false);
    const [manageDeliveryZones, setManageDeliveryZones] = useState(false);
    const [manageTimedEvents, setManageTimedEvents] = useState(false);
    const [manageUsers, setManageUsers] = useState(false);
    const [manageApps, setManageApps] = useState(false);
    //Report Authorities
    const [viewCostAnalysisReport, setViewCostAnalysisReport] = useState(false);
    const [viewInventoryControlReport, setViewInventoryControlReport] =
        useState(false);
    const [viewInventoryLevelsReport, setViewInventoryLevelsReport] =
        useState(false);
    const [inventoryTransactionsReport, setInventoryTransactionsReport] =
        useState(false);
    const [viewOtherReports, setViewOtherReports] = useState(false);
    const [viewSalesReports, setViewSalesReports] = useState(false);
    const [
        viewCostAdjustmentHistoryReport,
        setViewCostAdjustmentHistoryReport,
    ] = useState(false);
    const [viewMenuCostReports, setViewMenuCostReports] = useState(false);
    const [viewInventoryItemsCostReport, setViewInventoryItemsCostReport] =
        useState(false);
    //Dashboard Authorities
    const [accessGeneralDashboard, setAccessGeneralDashboard] = useState(false);
    const [accessBranchesDashboard, setAccessBranchesDashboard] =
        useState(false);
    const [accessInventoryDashboard, setAccessInventoryDashboard] =
        useState(false);
    //Cashier App Authorities
    const [accessCashRegister, setAccessCashRegister] = useState(false);
    const [accessDeviceManagement, setAccessDeviceManagement] = useState(false);
    const [accessReports, setAccessReports] = useState(false);
    const [actAsDriver, setActAsDriver] = useState(false);
    const [actAsWaiter, setActAsWaiter] = useState(false);
    const [addOpenCharge, setAddOpenCharge] = useState(false);
    const [addOpenPriceProduct, setAddOpenPriceProduct] = useState(false);
    const [applyAheadOrders, setApplyAheadOrders] = useState(false);
    const [applyPredefinedDiscounts, setApplyPredefinedDiscounts] =
        useState(false);
    const [applyOpenDiscounts, setApplyOpenDiscounts] = useState(false);
    const [editProductsSendToKitchen, setEditProductsSendToKitchen] =
        useState(false);
    const [joinOrder, setJoinOrder] = useState(false);
    const [accessDrawerOperations, setAccessDrawerOperations] = useState(false);
    const [performEndOfDay, setPerformEndOfDay] = useState(false);
    const [printCheck, setPrintCheck] = useState(false);
    const [printReceipt, setPrintReceipt] = useState(false);
    const [returnOrder, setReturnOrder] = useState(false);
    const [splitOrder, setSplitOrder] = useState(false);
    const [viewDoneOrders, setViewDoneOrders] = useState(false);
    const [viewOrdersAndProducts, setViewOrdersAndProducts] = useState(false);
    const [performPayment, setPerformPayment] = useState(false);
    const [editOrdersOpenedByOtherUsers, setEditOrdersOpenedByOtherUsers] =
        useState(false);
    const [changeTableOwner, setChangeTableOwner] = useState(false);
    const [registerUsersFingerprint, setRegisterUsersFingerprint] =
        useState(false);
    const [sendToKitchenBeforePayment, setSendToKitchenBeforePayment] =
        useState(false);
    const [kitchenReprint, setKitchenReprint] = useState(false);
    const [editTablesLayout, setEditTablesLayout] = useState(false);
    const [closeShiftWithActiveOrders, setCloseShiftWithActiveOrders] =
        useState(false);

    //categorywise toggling
    const [enableAll, toggleAll] = useState(false);
    const [orders, toggleOrders] = useState(false);
    const [customers, toggleCustomers] = useState(false);
    const [inventories, toggleInventories] = useState(false);
    const [menus, toggleMenus] = useState(false);
    const [others, toggleOthers] = useState(false);
    const [admin, toggleAdmin] = useState(false);
    const [report, toggleReport] = useState(false);
    const [dashboard, toggleDashboard] = useState(false);
    const [cashier, toggleCashier] = useState(false);

    useEffect(() => {
        if (id) {
            getRole(id).then((response) => {
                const role = response.data;
                setName(role.name);
                setReadOrders(role.readOrders);
                setManageOrders(role.manageOrders);
                setManageOrderTags(role.manageOrderTags);
                setReadCustomers(role.readCustomers);
                setReadCustomerInsights(role.readCustomersInsights);
                setManageCustomers(role.manageCustomers);
                setManageCustomerHouseAccount(role.manageCustomerHouseAccount);
                setManageCustomerLoyalty(role.manageCustomerLoyalty);
                setReadInventoryItems(role.readInventoryItems);
                setManageInventoryItems(role.manageInventoryItems);
                setReadSuppliers(role.readSuppliers);
                setManageSuppliers(role.manageSuppliers);
                setCreatePurchaseOrders(role.createPurchaseOrders);
                setSubmitPurchaseOrders(role.submitPurchaseOrders);
                setApprovePurchaseOrders(role.approvePurchaseOrders);
                setViewApprovedPurchaseOrders(role.viewApprovedPurchaseOrders);
                setCreateTransferOrders(role.createTransferOrders);
                setSubmitTransferOrders(role.submitTransferOrders);
                setCreateTransfers(role.createTransfers);
                setSendAndReceiveTransfers(role.sendAndReceiveTransfers);
                setCreatePurchasing(role.createPurchasing);
                setSubmitPurchasing(role.submitPurchasing);
                setCreateProduction(role.createProduction);
                setSubmitProduction(role.submitProduction);
                setCreateQuantityAdjustment(role.createQuantityAdjustment);
                setSubmitQuantityAdjustment(role.submitQuantityAdjustment);
                setCreateCostAdjustment(role.createCostAdjustment);
                setSubmitCostAdjustment(role.submitCostAdjustment);
                setCreateInventoryCount(role.createInventoryCount);
                setSubmitInventoryCount(role.submitInventoryCount);
                setReadOrderTransactions(role.readOrderTransactions);
                setReadMenu(role.readMenu);
                setManageMenu(role.manageMenu);
                setManageIngredients(role.manageIngredients);
                setManageCosts(role.manageCosts);
                setManageBranches(role.manageBranches);
                setManageCoupons(role.manageCoupons);
                setManageDevices(role.manageDevices);
                setManageDiscounts(role.manageDiscounts);
                setManageGiftCards(role.manageGiftCards);
                setManagePromotions(role.managePromotions);
                setManageSettings(role.manageSettings);
                setManageDeliveryZones(role.manageDeliveryZones);
                setManageTimedEvents(role.manageTimedEvents);
                setManageUsers(role.manageUsers);
                setManageApps(role.manageApps);
                setViewCostAnalysisReport(role.viewCostAnalysisReport);
                setViewInventoryControlReport(role.viewInventoryControlReport);
                setViewInventoryLevelsReport(role.viewInventoryLevelsReport);
                setInventoryTransactionsReport(
                    role.inventoryTransactionsReport
                );
                setViewOtherReports(role.viewOtherReports);
                setViewSalesReports(role.viewSalesReports);
                setViewCostAdjustmentHistoryReport(
                    role.viewCostAdjustmentHistoryReport
                );
                setViewMenuCostReports(role.viewMenuCostReports);
                setViewInventoryItemsCostReport(
                    role.viewInventoryItemsCostReport
                );
                setAccessGeneralDashboard(role.accessGeneralDashboard);
                setAccessBranchesDashboard(role.accessBranchesDashboard);
                setAccessInventoryDashboard(role.accessInventoryDashboard);
                setAccessCashRegister(role.accessCashRegister);
                setAccessDeviceManagement(role.accessDeviceManagement);
                setAccessReports(role.accessReports);
                setActAsDriver(role.actAsDriver);
                setActAsWaiter(role.actAsWaiter);
                setAddOpenCharge(role.addOpenCharge);
                setAddOpenPriceProduct(role.addOpenPriceProduct);
                setApplyAheadOrders(role.applyAheadOrders);
                setApplyPredefinedDiscounts(role.applyPredefinedDiscounts);
                setApplyOpenDiscounts(role.applyOpenDiscounts);
                setEditProductsSendToKitchen(role.editProductsSendToKitchen);
                setJoinOrder(role.joinOrder);
                setAccessDrawerOperations(role.accessDrawerOperations);
                setPerformEndOfDay(role.performEndOfDay);
                setPrintCheck(role.printCheck);
                setPrintReceipt(role.printReceipt);
                setReturnOrder(role.returnOrder);
                setSplitOrder(role.splitOrder);
                setViewDoneOrders(role.viewDoneOrders);
                setViewOrdersAndProducts(role.viewOrdersAndProducts);
                setPerformPayment(role.performPayment);
                setEditOrdersOpenedByOtherUsers(
                    role.editOrdersOpenedByOtherUsers
                );
                setChangeTableOwner(role.changeTableOwner);
                setRegisterUsersFingerprint(role.registerUsersFingerprint);
                setSendToKitchenBeforePayment(role.sendToKitchenBeforePayment);
                setKitchenReprint(role.kitchenReprint);
                setEditTablesLayout(role.editTablesLayout);
                setCloseShiftWithActiveOrders(role.closeShiftWithActiveOrders);
            });
        }
    }, [id]);

    const resetData = () => {
        setName(false);
        setReadOrders(false);
        setManageOrders(false);
        setManageOrderTags(false);
        setReadCustomers(false);
        setReadCustomerInsights(false);
        setManageCustomers(false);
        setManageCustomerHouseAccount(false);
        setManageCustomerLoyalty(false);
        setReadInventoryItems(false);
        setManageInventoryItems(false);
        setReadSuppliers(false);
        setManageSuppliers(false);
        setCreatePurchaseOrders(false);
        setSubmitPurchaseOrders(false);
        setApprovePurchaseOrders(false);
        setViewApprovedPurchaseOrders(false);
        setCreateTransferOrders(false);
        setSubmitTransferOrders(false);
        setCreateTransfers(false);
        setSendAndReceiveTransfers(false);
        setCreatePurchasing(false);
        setSubmitPurchasing(false);
        setCreateProduction(false);
        setSubmitProduction(false);
        setCreateQuantityAdjustment(false);
        setSubmitQuantityAdjustment(false);
        setCreateCostAdjustment(false);
        setSubmitCostAdjustment(false);
        setCreateInventoryCount(false);
        setSubmitInventoryCount(false);
        setReadOrderTransactions(false);
        setReadMenu(false);
        setManageMenu(false);
        setManageIngredients(false);
        setManageCosts(false);
        setManageBranches(false);
        setManageCoupons(false);
        setManageDevices(false);
        setManageDiscounts(false);
        setManageGiftCards(false);
        setManagePromotions(false);
        setManageSettings(false);
        setManageDeliveryZones(false);
        setManageTimedEvents(false);
        setManageUsers(false);
        setManageApps(false);
        setViewCostAnalysisReport(false);
        setViewInventoryControlReport(false);
        setViewInventoryLevelsReport(false);
        setInventoryTransactionsReport(false);
        setViewOtherReports(false);
        setViewSalesReports(false);
        setViewCostAdjustmentHistoryReport(false);
        setViewMenuCostReports(false);
        setViewInventoryItemsCostReport(false);
        setAccessGeneralDashboard(false);
        setAccessBranchesDashboard(false);
        setAccessInventoryDashboard(false);
        setAccessCashRegister(false);
        setAccessDeviceManagement(false);
        setAccessReports(false);
        setActAsDriver(false);
        setActAsWaiter(false);
        setAddOpenCharge(false);
        setAddOpenPriceProduct(false);
        setApplyAheadOrders(false);
        setApplyPredefinedDiscounts(false);
        setApplyOpenDiscounts(false);
        setEditProductsSendToKitchen(false);
        setJoinOrder(false);
        setAccessDrawerOperations(false);
        setPerformEndOfDay(false);
        setPrintCheck(false);
        setPrintReceipt(false);
        setReturnOrder(false);
        setSplitOrder(false);
        setViewDoneOrders(false);
        setViewOrdersAndProducts(false);
        setPerformPayment(false);
        setEditOrdersOpenedByOtherUsers(false);
        setChangeTableOwner(false);
        setRegisterUsersFingerprint(false);
        setSendToKitchenBeforePayment(false);
        setKitchenReprint(false);
        setEditTablesLayout(false);
        setCloseShiftWithActiveOrders(false);
    };

    const handleDelete = () => {
        deleteRole(id).then((response) => {
            if (response.status === 204) {
                if (typeof onDelete === "function") {
                    resetData();
                    onDelete(id);
                }
            }
        });
    };

    const handleSave = () => {
        const role = {
            id,
            name,
            readOrders,
            manageOrders,
            manageOrderTags,
            readCustomers,
            readCustomersInsights,
            manageCustomers,
            manageCustomerHouseAccount,
            manageCustomerLoyalty,
            readInventoryItems,
            manageInventoryItems,
            readSuppliers,
            manageSuppliers,
            createPurchaseOrders,
            submitPurchaseOrders,
            approvePurchaseOrders,
            viewApprovedPurchaseOrders,
            createTransferOrders,
            submitTransferOrders,
            createTransfers,
            sendAndReceiveTransfers,
            createPurchasing,
            submitPurchasing,
            createProduction,
            submitProduction,
            createQuantityAdjustment,
            submitQuantityAdjustment,
            createCostAdjustment,
            submitCostAdjustment,
            createInventoryCount,
            submitInventoryCount,
            readOrderTransactions,
            readMenu,
            manageMenu,
            manageIngredients,
            manageCosts,
            manageBranches,
            manageCoupons,
            manageDevices,
            manageDiscounts,
            manageGiftCards,
            managePromotions,
            manageSettings,
            manageDeliveryZones,
            manageTimedEvents,
            manageUsers,
            manageApps,
            viewCostAnalysisReport,
            viewInventoryControlReport,
            inventoryTransactionsReport,
            viewOtherReports,
            viewSalesReports,
            viewCostAdjustmentHistoryReport,
            viewMenuCostReports,
            viewInventoryItemsCostReport,
            accessGeneralDashboard,
            accessBranchesDashboard,
            accessInventoryDashboard,
            accessCashRegister,
            accessDeviceManagement,
            accessReports,
            actAsDriver,
            actAsWaiter,
            addOpenCharge,
            addOpenPriceProduct,
            applyAheadOrders,
            applyPredefinedDiscounts,
            applyOpenDiscounts,
            editProductsSendToKitchen,
            joinOrder,
            accessDrawerOperations,
            performEndOfDay,
            printCheck,
            printReceipt,
            returnOrder,
            splitOrder,
            viewDoneOrders,
            viewOrdersAndProducts,
            performPayment,
            editOrdersOpenedByOtherUsers,
            changeTableOwner,
            registerUsersFingerprint,
            sendToKitchenBeforePayment,
            kitchenReprint,
            editTablesLayout,
            closeShiftWithActiveOrders,
        };
        if (id) {
            updateRole(role).then((response) => {
                if (typeof onSave === "function") {
                    resetData();
                    onSave(role);
                }
            });
        } else {
            createRole(role).then((response) => {
                if (typeof onSave === "function") {
                    resetData();
                    onSave(response.data);
                }
            });
        }
    };

    const handleCancel = () => {
        if (typeof onCancel === "function") {
            resetData();
            onCancel();
        }
    };

    return (
        <Modal
            title={id ? "Edit Rold" : "Create Role"}
            show={show}
            onSave={handleSave}
            onCancel={handleCancel}
            onDelete={handleDelete}
            deleteText={id && "Delete Role"}
        >
            <div className="max-h-[70vh] overflow-y-scroll p-2">
                <div>
                    <Label>Name</Label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className="mt-1 w-full block bg-white border border-slate-200 p-1 rounded"
                    />
                </div>
                <div className="mt-4">
                    <Label>Authorities</Label>

                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={enableAll}
                            onChange={() => toggleAll(!enableAll)}
                        />
                        <span className="ml-2">Toggle All</span>
                    </Label>

                    {/* Order Options */}
                    <Label className="flex items-center block mt-6">
                        <input
                            type="checkbox"
                            checked={orders}
                            onChange={() => toggleOrders(!orders)}
                        />
                        <span className="ml-2 font-semibold">
                            Order Authorities
                        </span>
                    </Label>

                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={readOrders}
                            onChange={() => setReadOrders(!readOrders)}
                        />
                        <span className="ml-2">Read Orders</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={manageOrders}
                            onChange={() => setManageOrders(!manageOrders)}
                        />
                        <span className="ml-2">Manage Orders</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={manageOrderTags}
                            onChange={() =>
                                setManageOrderTags(!manageOrderTags)
                            }
                        />
                        <span className="ml-2">Manage Order Tags</span>
                    </Label>

                    {/* Customer Options */}
                    <Label className="flex items-center block mt-6">
                        <input
                            type="checkbox"
                            checked={customers}
                            onChange={() => toggleCustomers(!customers)}
                        />
                        <span className="ml-2 font-semibold">
                            Customer Authorities
                        </span>
                    </Label>

                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={readCustomers}
                            onChange={() => setReadCustomers(!readCustomers)}
                        />
                        <span className="ml-2">Read Customers</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={readCustomersInsights}
                            onChange={() =>
                                setReadCustomerInsights(!readCustomersInsights)
                            }
                        />
                        <span className="ml-2">Read Customers Insights</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={manageCustomers}
                            onChange={() =>
                                setManageCustomers(!manageCustomers)
                            }
                        />
                        <span className="ml-2">Manage Customers</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={manageCustomerHouseAccount}
                            onChange={() =>
                                setManageCustomerHouseAccount(
                                    !manageCustomerHouseAccount
                                )
                            }
                        />
                        <span className="ml-2">
                            Manage Customers House Account
                        </span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={manageCustomerLoyalty}
                            onChange={() =>
                                setManageCustomerLoyalty(!manageCustomerLoyalty)
                            }
                        />
                        <span className="ml-2">Manage Customer Loyalty</span>
                    </Label>

                    {/* Inventory Options */}
                    <Label className="flex items-center block mt-6">
                        <input
                            type="checkbox"
                            checked={inventories}
                            onChange={() => toggleInventories(!inventories)}
                        />
                        <span className="ml-2 font-semibold">
                            Inventory Authorities
                        </span>
                    </Label>

                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={readInventoryItems}
                            onChange={() =>
                                setReadInventoryItems(!readInventoryItems)
                            }
                        />
                        <span className="ml-2">Read Inventory Items</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={manageInventoryItems}
                            onChange={() =>
                                setManageInventoryItems(!manageInventoryItems)
                            }
                        />
                        <span className="ml-2">Manage Inventory Items</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={readSuppliers}
                            onChange={() => setReadSuppliers(!readSuppliers)}
                        />
                        <span className="ml-2">Read Suppliers</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={manageSuppliers}
                            onChange={() =>
                                setManageSuppliers(!manageSuppliers)
                            }
                        />
                        <span className="ml-2">Manage Suppliers</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={createPurchaseOrders}
                            onChange={() =>
                                setCreatePurchaseOrders(!createPurchaseOrders)
                            }
                        />
                        <span className="ml-2">Create Purchase Orders</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={submitPurchaseOrders}
                            onChange={() =>
                                setSubmitPurchaseOrders(!submitPurchaseOrders)
                            }
                        />
                        <span className="ml-2">Submit Purchase Orders</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={approvePurchaseOrders}
                            onChange={() =>
                                setApprovePurchaseOrders(!approvePurchaseOrders)
                            }
                        />
                        <span className="ml-2">Approve Purchase Orders</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={viewApprovedPurchaseOrders}
                            onChange={() =>
                                setViewApprovedPurchaseOrders(
                                    !viewApprovedPurchaseOrders
                                )
                            }
                        />
                        <span className="ml-2">
                            View Approved Purchase Orders
                        </span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={createTransferOrders}
                            onChange={() =>
                                setCreateTransferOrders(!createTransferOrders)
                            }
                        />
                        <span className="ml-2">Create Transfer Orders</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={submitTransferOrders}
                            onChange={() =>
                                setSubmitTransferOrders(!submitTransferOrders)
                            }
                        />
                        <span className="ml-2">Submit Transfer Orders</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={createTransfers}
                            onChange={() =>
                                setCreateTransfers(!createTransfers)
                            }
                        />
                        <span className="ml-2">Create Transfers</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={sendAndReceiveTransfers}
                            onChange={() =>
                                setSendAndReceiveTransfers(
                                    !sendAndReceiveTransfers
                                )
                            }
                        />
                        <span className="ml-2">
                            Send &amp; Receive Transfers
                        </span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={createPurchasing}
                            onChange={() =>
                                setCreatePurchasing(!createPurchasing)
                            }
                        />
                        <span className="ml-2">Create Purchasing</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={submitPurchasing}
                            onChange={() =>
                                setSubmitPurchasing(!submitPurchasing)
                            }
                        />
                        <span className="ml-2">Submit Purchasing</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={createProduction}
                            onChange={() =>
                                setCreateProduction(!createProduction)
                            }
                        />
                        <span className="ml-2">Create Production</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={submitProduction}
                            onChange={() =>
                                setSubmitProduction(!submitProduction)
                            }
                        />
                        <span className="ml-2">Submit Production</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={createQuantityAdjustment}
                            onChange={() =>
                                setCreateQuantityAdjustment(
                                    !createQuantityAdjustment
                                )
                            }
                        />
                        <span className="ml-2">Create Quantity Adjustment</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={submitQuantityAdjustment}
                            onChange={() =>
                                setSubmitQuantityAdjustment(
                                    !submitQuantityAdjustment
                                )
                            }
                        />
                        <span className="ml-2">Submit Quantity Adjustment</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={createCostAdjustment}
                            onChange={() =>
                                setCreateCostAdjustment(!createCostAdjustment)
                            }
                        />
                        <span className="ml-2">Create Cost Adjustment</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={submitCostAdjustment}
                            onChange={() =>
                                setSubmitCostAdjustment(!submitCostAdjustment)
                            }
                        />
                        <span className="ml-2">Submit Cost Adjustment</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={createInventoryCount}
                            onChange={() =>
                                setCreateInventoryCount(!createInventoryCount)
                            }
                        />
                        <span className="ml-2">Create Inventory Count</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={submitInventoryCount}
                            onChange={() =>
                                setSubmitInventoryCount(!submitInventoryCount)
                            }
                        />
                        <span className="ml-2">Submit Inventory Count</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={readOrderTransactions}
                            onChange={() =>
                                setReadOrderTransactions(!readOrderTransactions)
                            }
                        />
                        <span className="ml-2">Read Order Transactions</span>
                    </Label>

                    {/* Menu Options */}
                    <Label className="flex items-center block mt-6">
                        <input
                            type="checkbox"
                            checked={menus}
                            onChange={() => toggleMenus(!menus)}
                        />
                        <span className="ml-2 font-semibold">
                            Menu Authorities
                        </span>
                    </Label>

                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={readMenu}
                            onChange={() => setReadMenu(!readMenu)}
                        />
                        <span className="ml-2">Read Menu</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={manageMenu}
                            onChange={() => setManageMenu(!manageMenu)}
                        />
                        <span className="ml-2">Manage Menu</span>
                    </Label>

                    {/* Other Options */}
                    <Label className="flex items-center block mt-6">
                        <input
                            type="checkbox"
                            checked={others}
                            onChange={() => toggleOthers(!others)}
                        />
                        <span className="ml-2 font-semibold">
                            Other Authorities
                        </span>
                    </Label>

                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={manageIngredients}
                            onChange={() =>
                                setManageIngredients(!manageIngredients)
                            }
                        />
                        <span className="ml-2">Manage Ingredients</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={manageCosts}
                            onChange={() => setManageCosts(!manageCosts)}
                        />
                        <span className="ml-2">Manage Costs</span>
                    </Label>

                    {/* Admin Options */}
                    <Label className="flex items-center block mt-6">
                        <input
                            type="checkbox"
                            checked={admin}
                            onChange={() => toggleAdmin(!admin)}
                        />
                        <span className="ml-2 font-semibold">
                            Admin Authorities
                        </span>
                    </Label>

                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={manageBranches}
                            onChange={() => setManageBranches(!manageBranches)}
                        />
                        <span className="ml-2">Manage Branches</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={manageCoupons}
                            onChange={() => setManageCoupons(!manageCoupons)}
                        />
                        <span className="ml-2">Manage Coupons</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={manageDevices}
                            onChange={() => setManageDevices(!manageDevices)}
                        />
                        <span className="ml-2">Manage Devices</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={manageDiscounts}
                            onChange={() =>
                                setManageDiscounts(!manageDiscounts)
                            }
                        />
                        <span className="ml-2">Manage Discounts</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={manageGiftCards}
                            onChange={() =>
                                setManageGiftCards(!manageGiftCards)
                            }
                        />
                        <span className="ml-2">Manage Gift Cards</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={managePromotions}
                            onChange={() =>
                                setManagePromotions(!managePromotions)
                            }
                        />
                        <span className="ml-2">Manage Promotions</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={manageSettings}
                            onChange={() => setManageSettings(!manageSettings)}
                        />
                        <span className="ml-2">Manage Settings</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={manageDeliveryZones}
                            onChange={() =>
                                setManageDeliveryZones(!manageDeliveryZones)
                            }
                        />
                        <span className="ml-2">Manage Delivery Zones</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={manageTimedEvents}
                            onChange={() =>
                                setManageTimedEvents(!manageTimedEvents)
                            }
                        />
                        <span className="ml-2">Manage Timed Events</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={manageUsers}
                            onChange={() => setManageUsers(!manageUsers)}
                        />
                        <span className="ml-2">Manage Users</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={manageApps}
                            onChange={() => setManageApps(!manageApps)}
                        />
                        <span className="ml-2">Manage Apps</span>
                    </Label>

                    {/* Report Options */}
                    <Label className="flex items-center block mt-6">
                        <input
                            type="checkbox"
                            checked={report}
                            onChange={() => toggleReport(!report)}
                        />
                        <span className="ml-2 font-semibold">
                            Report Authorities
                        </span>
                    </Label>

                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={viewCostAnalysisReport}
                            onChange={() =>
                                setViewCostAnalysisReport(
                                    !viewCostAnalysisReport
                                )
                            }
                        />
                        <span className="ml-2">View Cost Analysis Report</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={viewInventoryControlReport}
                            onChange={() =>
                                setViewInventoryControlReport(
                                    !viewInventoryControlReport
                                )
                            }
                        />
                        <span className="ml-2">
                            View Inventory Control Report
                        </span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={viewInventoryLevelsReport}
                            onChange={() =>
                                setViewInventoryLevelsReport(
                                    !viewInventoryLevelsReport
                                )
                            }
                        />
                        <span className="ml-2">
                            View Inventory Levels Report
                        </span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={inventoryTransactionsReport}
                            onChange={() =>
                                setInventoryTransactionsReport(
                                    !inventoryTransactionsReport
                                )
                            }
                        />
                        <span className="ml-2">
                            Inventory Transactions Reports
                        </span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={viewOtherReports}
                            onChange={() =>
                                setViewOtherReports(!viewOtherReports)
                            }
                        />
                        <span className="ml-2">View Other Reports</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={viewSalesReports}
                            onChange={() =>
                                setViewSalesReports(!viewSalesReports)
                            }
                        />
                        <span className="ml-2">View Sales Reports</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={viewCostAdjustmentHistoryReport}
                            onChange={() =>
                                setViewCostAdjustmentHistoryReport(
                                    !viewCostAdjustmentHistoryReport
                                )
                            }
                        />
                        <span className="ml-2">
                            View Cost Adjustment History Report
                        </span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={manageDeliveryZones}
                            onChange={() =>
                                setManageDeliveryZones(!manageDeliveryZones)
                            }
                        />
                        <span className="ml-2">Manage Delivery Zones</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={viewMenuCostReports}
                            onChange={() =>
                                setViewMenuCostReports(!viewMenuCostReports)
                            }
                        />
                        <span className="ml-2">View Menu Cost Reports</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={viewInventoryItemsCostReport}
                            onChange={() =>
                                setViewInventoryItemsCostReport(
                                    !viewInventoryItemsCostReport
                                )
                            }
                        />
                        <span className="ml-2">
                            View Inventory Items Cost Report
                        </span>
                    </Label>

                    {/* Dashboard Options */}
                    <Label className="flex items-center block mt-6">
                        <input
                            type="checkbox"
                            checked={dashboard}
                            onChange={() => toggleDashboard(!dashboard)}
                        />
                        <span className="ml-2 font-semibold">
                            Dashboard Authorities
                        </span>
                    </Label>

                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={accessGeneralDashboard}
                            onChange={() =>
                                setAccessGeneralDashboard(
                                    !accessGeneralDashboard
                                )
                            }
                        />
                        <span className="ml-2">Access General Dashboard</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={accessBranchesDashboard}
                            onChange={() =>
                                setAccessBranchesDashboard(
                                    !accessBranchesDashboard
                                )
                            }
                        />
                        <span className="ml-2">Access Branches Dashboard</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={accessInventoryDashboard}
                            onChange={() =>
                                setAccessInventoryDashboard(
                                    !accessInventoryDashboard
                                )
                            }
                        />
                        <span className="ml-2">Access Inventory Dashboard</span>
                    </Label>

                    {/* Cashier App Options */}
                    <Label className="flex items-center block mt-6">
                        <input
                            type="checkbox"
                            checked={cashier}
                            onChange={() => toggleCashier(!cashier)}
                        />
                        <span className="ml-2 font-semibold">
                            Cashier App Authorities
                        </span>
                    </Label>

                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={accessCashRegister}
                            onChange={() =>
                                setAccessCashRegister(!accessCashRegister)
                            }
                        />
                        <span className="ml-2">Access Cash Register</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={accessDeviceManagement}
                            onChange={() =>
                                setAccessDeviceManagement(
                                    !accessDeviceManagement
                                )
                            }
                        />
                        <span className="ml-2">Access Devices Management</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={accessReports}
                            onChange={() => setAccessReports(!accessReports)}
                        />
                        <span className="ml-2">Access Reports</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={actAsDriver}
                            onChange={() => setActAsDriver(!actAsDriver)}
                        />
                        <span className="ml-2">Act as Driver</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={actAsWaiter}
                            onChange={() => setActAsWaiter(!actAsWaiter)}
                        />
                        <span className="ml-2">Act as Waiter</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={addOpenCharge}
                            onChange={() => setAddOpenCharge(!addOpenCharge)}
                        />
                        <span className="ml-2">Add Open Charge</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={addOpenPriceProduct}
                            onChange={() =>
                                setAddOpenPriceProduct(!addOpenPriceProduct)
                            }
                        />
                        <span className="ml-2">Add Open Price Product</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={applyAheadOrders}
                            onChange={() =>
                                setApplyAheadOrders(!applyAheadOrders)
                            }
                        />
                        <span className="ml-2">Apply Ahead Orders</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={applyPredefinedDiscounts}
                            onChange={() =>
                                setApplyPredefinedDiscounts(
                                    !applyPredefinedDiscounts
                                )
                            }
                        />
                        <span className="ml-2">Apply Predefined Discounts</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={applyOpenDiscounts}
                            onChange={() =>
                                setApplyOpenDiscounts(!applyOpenDiscounts)
                            }
                        />
                        <span className="ml-2">Apply Open Discounts</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={editProductsSendToKitchen}
                            onChange={() =>
                                setEditProductsSendToKitchen(
                                    !editProductsSendToKitchen
                                )
                            }
                        />
                        <span className="ml-2">
                            Edit Products Sent to Kitchen
                        </span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={joinOrder}
                            onChange={() => setJoinOrder(!joinOrder)}
                        />
                        <span className="ml-2">Join Order</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={accessDrawerOperations}
                            onChange={() =>
                                setAccessDrawerOperations(
                                    !accessDrawerOperations
                                )
                            }
                        />
                        <span className="ml-2">Access Drawer Operations</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={performEndOfDay}
                            onChange={() =>
                                setPerformEndOfDay(!performEndOfDay)
                            }
                        />
                        <span className="ml-2">Perform End of Day</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={printCheck}
                            onChange={() => setPrintCheck(!printCheck)}
                        />
                        <span className="ml-2">Print Check</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={printReceipt}
                            onChange={() => setPrintReceipt(!printReceipt)}
                        />
                        <span className="ml-2">Print Receipt</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={returnOrder}
                            onChange={() => setReturnOrder(!returnOrder)}
                        />
                        <span className="ml-2">Return Order</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={splitOrder}
                            onChange={() => setSplitOrder(!splitOrder)}
                        />
                        <span className="ml-2">Split Order</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={viewDoneOrders}
                            onChange={() => setViewDoneOrders(!viewDoneOrders)}
                        />
                        <span className="ml-2">View Done Orders</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={viewOrdersAndProducts}
                            onChange={() =>
                                setViewOrdersAndProducts(!viewOrdersAndProducts)
                            }
                        />
                        <span className="ml-2">View Orders and Products</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={performPayment}
                            onChange={() => setPerformPayment(!performPayment)}
                        />
                        <span className="ml-2">Perform Payment</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={editOrdersOpenedByOtherUsers}
                            onChange={() =>
                                setEditOrdersOpenedByOtherUsers(
                                    !editOrdersOpenedByOtherUsers
                                )
                            }
                        />
                        <span className="ml-2">
                            Edit Orders Openend by Other Users
                        </span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={changeTableOwner}
                            onChange={() =>
                                setChangeTableOwner(!changeTableOwner)
                            }
                        />
                        <span className="ml-2">Change Table Owner</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={registerUsersFingerprint}
                            onChange={() =>
                                setRegisterUsersFingerprint(
                                    !registerUsersFingerprint
                                )
                            }
                        />
                        <span className="ml-2">Register Users fingerprint</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={sendToKitchenBeforePayment}
                            onChange={() =>
                                setSendToKitchenBeforePayment(
                                    !sendToKitchenBeforePayment
                                )
                            }
                        />
                        <span className="ml-2">
                            Send to Kitchen Before Payment
                        </span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={kitchenReprint}
                            onChange={() => setKitchenReprint(!kitchenReprint)}
                        />
                        <span className="ml-2">Kitchen Reprint</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={editTablesLayout}
                            onChange={() =>
                                setEditTablesLayout(!editTablesLayout)
                            }
                        />
                        <span className="ml-2">Edit tables layout</span>
                    </Label>
                    <Label className="flex items-center block mt-4">
                        <input
                            type="checkbox"
                            checked={closeShiftWithActiveOrders}
                            onChange={() =>
                                setCloseShiftWithActiveOrders(
                                    !closeShiftWithActiveOrders
                                )
                            }
                        />
                        <span className="ml-2">
                            Close Till/Shift With Active Orders
                        </span>
                    </Label>
                </div>
            </div>
        </Modal>
    );
};

export default RoleModal;
