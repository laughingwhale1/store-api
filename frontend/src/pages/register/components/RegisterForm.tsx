import {Box, Button, FormControl, FormLabel, Heading, Input, VStack} from "@chakra-ui/react";
import {FormEvent} from "react";


export const RegisterForm = () => {

    const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log(e)
    };

    return (
        <Box p={4}  >
            <Heading as="h2" mb={4} fontSize="xl">
                Register
            </Heading>
            <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                    <FormControl isRequired>
                        <FormLabel>Username</FormLabel>
                        <Input type="text" placeholder="Enter your username" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input type="email" placeholder="Enter your email" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" placeholder="Enter your password" />
                    </FormControl>
                    <Button
                        type="submit"
                        colorScheme="teal"
                        size="lg"
                        width="100%"
                    >
                        Register
                    </Button>
                </VStack>
            </form>
        </Box>
    )
}
