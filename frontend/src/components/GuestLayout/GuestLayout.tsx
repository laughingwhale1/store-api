import {Flex} from "@chakra-ui/react";
import {Outlet} from "react-router-dom";

export const GuestLayout = () => {
    return (
        <Flex minH={'100vh'} minW={'100vw'}>
            <Outlet />
        </Flex>
    )
}
