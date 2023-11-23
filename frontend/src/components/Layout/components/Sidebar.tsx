import {Box, Flex, Icon, Link, Text} from "@chakra-ui/react";
import {navBarLinks} from "../helper.ts";
import {FC} from "react";

interface SidebarProps {
    isExpanded: boolean;
}

export const Sidebar: FC<SidebarProps> = ({isExpanded}) => {
    return (
        <Box
            w={isExpanded ? '200px' : '70px'}
            minH={'100vh'}
            transition={'all .3s'}
            bg={'purple.500'}
            p={'20px'}
            color={'white'}>
            <Flex flexDirection={'column'} gap={'20px'}>
                {navBarLinks?.map((link, index) => (
                    <Link
                        _hover={{color: 'blue.600', bg: 'pink.100'}}
                        p={'5px'}
                        borderRadius={'5px'}
                        href={link.url}
                        key={index}
                        display={'flex'}
                        gap={'5px'}
                        justifyContent={isExpanded ? 'start' : 'center'}
                        alignItems={'center'}>
                        <Icon as={link.icon} boxSize={5}/>
                        <Text display={isExpanded ? 'block' : 'none'}>
                            {link.name}
                        </Text>
                    </Link>
                ))}
            </Flex>
        </Box>
    )
}
