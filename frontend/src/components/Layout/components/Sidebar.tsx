import {Box, Link} from "@chakra-ui/react";

const navBarLinks = [
    {
        name: 'Dashboard',
        url: '/app/dashboard'
    }
]

export const Sidebar = () => {
    return (
        <Box w={'200px'} minH={'100vh'} bg={'blue.900'} p={'20px'} color={'white'}>
            {navBarLinks.map((link, index) => (
                <Link href={link.url} key={index}>
                    {link.name}
                </Link>
            ))}
        </Box>
    )
}
