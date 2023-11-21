import {Box, Flex} from "@chakra-ui/react";
import {Outlet} from "react-router-dom";
import {Sidebar} from "./components/Sidebar.tsx";
import {Header} from "./components/Header.tsx";

export const Layout = () => {
    return (
        <Flex minH={'100vh'} bg={'white'} minW={'100vw'}>
            <Sidebar/>

            <Box w={'100%'}>
                <Header />
                <Box p={'20px'}>
                    <Outlet />
                </Box>
            </Box>
        </Flex>
    )
}
