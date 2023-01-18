import APIUserClientLoginToken from "../config/api/userClient/loginToken";
import GetToken from "./getToken";
import SetToken from "./setToken";

const ReloadUser = async () => {
    var data = {};
    const token = GetToken();
    const resp = await APIUserClientLoginToken({
        token_id: token
    });

    var dataResponse = resp.data.data[0];
    if (dataResponse === undefined) {
        data = null;
    } else {
        var json_admin_access = JSON.parse(dataResponse['admin_access']);

        data = {
            user_id: dataResponse['user_id'],
            user_name: dataResponse['user_name'],
            email: dataResponse['email'],
            phone_no: dataResponse['phone_no'],
            sex: dataResponse['sex'],
            birth_date: dataResponse['birth_date'],
            is_active: dataResponse['is_active'],
            is_admin: dataResponse['is_admin'],
            image_link: dataResponse['image_link'],
            seller_id: dataResponse['seller_id'],
            seller_store: dataResponse['seller_store'],
            store_description: dataResponse['store_description'],
            ktp_no: dataResponse['ktp_no'],
            admin_access: json_admin_access === null ? [] : json_admin_access,
        }
    }
    return data;
}

export default ReloadUser;
