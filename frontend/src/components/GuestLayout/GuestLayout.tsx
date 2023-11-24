import {Flex} from "@chakra-ui/react";
import {Outlet, useNavigate} from "react-router-dom";
import {useAppSelector} from "@/store/types/hooks.ts";
import {useEffect} from "react";

export const GuestLayout = () => {
    const { token } = useAppSelector(state => state.userReducer)
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            navigate('/app')
            return;
        }
    }, [token]);
    return (
        <Flex minH={'100vh'} minW={'100vw'}>
            <Outlet />
        </Flex>
    )
}
