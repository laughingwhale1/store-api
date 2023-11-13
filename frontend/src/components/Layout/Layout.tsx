import {Box} from "@chakra-ui/react";
import {Outlet} from "react-router-dom";

export const Layout = () => {
    return (
        <Box minH={'100vh'} bg={'white'} p={'20px'} minW={'100vw'}>
            <Outlet />
        </Box>
    )
}
