import {
    Avatar,
    Box, Button,
    Flex,
    Icon,
    IconButton,
    Popover, PopoverArrow, PopoverBody, PopoverContent,
    PopoverTrigger, Text, VStack
} from "@chakra-ui/react";
import {GiHamburgerMenu} from "react-icons/gi";
import {FC} from "react";
import {FaChevronDown, FaRegUserCircle} from "react-icons/fa";
import {IoMdExit} from "react-icons/io";
import {useAppDispatch, useAppSelector} from "@/store/types/hooks.ts";
import {logoutStart} from "@/store/reducers/user.reducer.ts";
import apiBase from "@/api/api.base.ts";

interface HeaderProps {
    toggleSidebar: VoidFunction;
}

export const Header: FC<HeaderProps> = ({toggleSidebar}) => {

    const dispath = useAppDispatch();
    const { name } = useAppSelector(state => state.userReducer.user);

    const handleAdminLogout = () => {
        dispath(logoutStart());
    }

    return (
        <Flex
            bg={'gray.200'}
            w={'100%'}
            p={'20px'}
            alignItems={'center'}
            justifyContent={'space-between'}>
            <IconButton
                onClick={toggleSidebar}
                aria-label={'sidebar'}
                icon={<Icon as={GiHamburgerMenu} />}
            />
            <Box>
                <Popover closeOnEsc={true} autoFocus={false}>
                    <PopoverTrigger>
                        <Flex alignItems={'center'} gap={'10px'} cursor={'pointer'}>
                            <Avatar
                                cursor={'pointer'}
                                size='md'
                                name='Kola Tioluwani'
                                src='https://avataaars.io/?avatarStyle=Circle&topType=Hat&accessoriesType=Round&facialHairType=Blank&clotheType=BlazerShirt&eyeType=Default&eyebrowType=Default&mouthType=Default&skinColor=Light'
                            />
                            <Text>
                                {name}
                            </Text>
                            <Icon as={FaChevronDown} />
                        </Flex>
                    </PopoverTrigger>
                    <PopoverContent maxW={'150px'}>
                        <PopoverArrow />
                        <PopoverBody >
                            <VStack>
                                <Button w={'100%'}><Icon mr={'5px'} as={FaRegUserCircle} />Profile</Button>
                                <Button w={'100%'} onClick={handleAdminLogout}><Icon mr={'5px'} as={IoMdExit} />Logout</Button>
                            </VStack>
                        </PopoverBody>
                    </PopoverContent>
                </Popover>
            </Box>
        </Flex>
    )
}
