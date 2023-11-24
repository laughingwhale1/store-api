import {Box, Button, Checkbox, FormControl, FormLabel, Heading, Input, Link, VStack} from "@chakra-ui/react";
import {useForm} from "react-hook-form";
import {useAppDispatch} from "@/store/types/hooks.ts";
import {authStart} from "@/store/reducers/user.reducer.ts";

export interface LoginForm {
    email: string
    password: string
    remember: boolean
}

export const LoginForm = () => {
    const {
        register,
        handleSubmit,
    } = useForm<LoginForm>()

    const dispatch = useAppDispatch();

    const onSubmit = (data: LoginForm) => {
        dispatch(authStart(data));
    };

    return (
        <Box p={4}>
            <Heading as="h2" mb={4} fontSize="xl">
                Login
            </Heading>
            <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={4} alignItems={'start'}>
                    <FormControl isRequired>
                        <FormLabel>Email</FormLabel>
                        <Input type="text" {...register('email')} placeholder="Enter your email" />
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel>Password</FormLabel>
                        <Input type="password" {...register('password')} placeholder="Enter your password" />
                    </FormControl>
                    <FormControl>
                        <Checkbox {...register('remember')} defaultChecked>Remember me</Checkbox>
                    </FormControl>
                    <Link href={'/password-request'}>
                        Forgot password?
                    </Link>
                    <Link href={'/register'}>
                        Sign Up
                    </Link>
                    <Button
                        type="submit"
                        colorScheme="teal"
                        size="lg"
                        width="100%"
                    >
                        Log in
                    </Button>
                </VStack>
            </form>
        </Box>
    )
}
