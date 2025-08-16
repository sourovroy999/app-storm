import MenuItem from "../MenuItem";

const AdminMenu = () => {
    return (
        <div>
            <MenuItem label={'Manage Users'} address={'manage-users'} />
            <MenuItem label={'Manage Coupons'} address={'manage-coupons'} />
            <MenuItem label={'Statistcs'} address={'statistics'} />



        </div>
    );
};

export default AdminMenu;