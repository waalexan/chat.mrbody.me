import Cookies from 'js-cookie';

export const useToken = () => {
    try {
        const token = Cookies.get('token');
        const id = Cookies.get('user_id');
        const name = Cookies.get('user_name');
        const email = Cookies.get('user_email');
        const phone = Cookies.get('user_phone');

        if (token) {
            return {
                status: 200,
                token,
                id,
                name,
                email,
                phone,
            };
        } else {
            return {
                status: 404,
                token: null,
                id: null,
                name: null,
                email: null,
                phone: null,
            };
        }
    } catch (error) {
        console.error(error);
        return {
            status: 500,
            token: null,
            id: null,
            name: null,
            email: null,
            phone: null,
        };
    }
};
