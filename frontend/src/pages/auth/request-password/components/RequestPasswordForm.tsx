import {Box, Button, FormControl, FormLabel, Heading, Input, Link, VStack} from "@chakra-ui/react";
import {useForm} from "react-hook-form";

type RequestPasswordForm = {
    email: string;
}

export const RequestPasswordForm = () => {
    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm<RequestPasswordForm>()

    const onSubmit = (data: RequestPasswordForm) => {
        console.log(data)
    };

    return (
        <Box p={4}  >
            <Heading as="h2" mb={4} fontSize="xl">
                Reset password
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={4}>
                    <FormControl isRequired>
                        <FormLabel>New password</FormLabel>
                        <Input type="email" {...register('email')} placeholder="New password" />
                    </FormControl>
                    <Link href={'/'}>
                        Back to Sign in
                    </Link>
                    <Button
                        type="submit"
                        colorScheme="teal"
                        size="lg"
                        width="100%"
                    >
                        Submit
                    </Button>
                </VStack>
            </form>
        </Box>
    )
}
