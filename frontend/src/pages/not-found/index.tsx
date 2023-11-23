import {Box, Flex, Link, Text} from "@chakra-ui/react";


const NotFoundPage = () => {
    return (
        <Flex alignItems={'center'} flexDirection={'column'} w={'100%'}>
            <Text fontSize={'24px'} fontWeight={'700'}>
                Page not found :(
            </Text>
            <Box mt={'40px'}>
                <Link href={'/'} color={'blue.300'}>
                    Back to home page
                </Link>
            </Box>
        </Flex>
    )
}

export default NotFoundPage;
