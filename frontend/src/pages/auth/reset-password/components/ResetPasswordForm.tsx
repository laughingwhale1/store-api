import {Box, Button, FormControl, FormLabel, Heading, Input, Link, VStack} from "@chakra-ui/react";
import {useForm} from "react-hook-form";

type ResetPasswordForm = {
    newPassword: string;
    repeatNewPassword: string;
}

export const ResetPasswordForm = () => {
    const {
        register,
        handleSubmit,
        // formState: { errors },
    } = useForm<ResetPasswordForm>()

    const onSubmit = (data: ResetPasswordForm) => {
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
                        <Input type="email" {...register('newPassword')} placeholder="New password" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Repeat new password</FormLabel>
                        <Input type="password" {...register('repeatNewPassword')} placeholder="Repeat new password" />
                    </FormControl>
                    <Link href={'/login'}>
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
