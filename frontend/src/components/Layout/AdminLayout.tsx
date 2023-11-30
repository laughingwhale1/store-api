import {Box, Flex} from "@chakra-ui/react";
import {Outlet, useNavigate} from "react-router-dom";
import {Sidebar} from "./components/Sidebar.tsx";
import {Header} from "./components/Header.tsx";
import {useEffect, useState} from "react";
import {useAppDispatch, useAppSelector} from "@/store/types/hooks.ts";
import {getCurrentUserStart} from "@/store/reducers/user.reducer.ts";

export const AdminLayout = () => {

    const { token } = useAppSelector(state => state.userReducer)
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
        dispatch(getCurrentUserStart());
        if (!token) {
            navigate('/', {replace: true})
                return;
        }
    }, [token]);

    const [isExpanded, setIsExpanded] = useState(true);

    return (
        <Flex minH={'100vh'} bg={'white'} minW={'100vw'}>
            <Sidebar isExpanded={isExpanded} />

            <Box w={'100%'}>
                <Header toggleSidebar={() => setIsExpanded(!isExpanded)} />
                <Box p={'20px'}>
                    <Outlet />
                </Box>
            </Box>
        </Flex>
    )
}
