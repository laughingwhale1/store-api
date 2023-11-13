import {Box, Spinner, Text} from "@chakra-ui/react";
import {postAPI} from "../../services/PostService";


const Home = () => {
    // const { users, error, isLoading } = useAppSelector(state => state.userReducer);
    //
    // const dispatch = useAppDispatch();

    const {isLoading, data} = postAPI.useFetchAllPostsQuery(5);

    if (isLoading) {
        return <Spinner />
    }

    return (
        <>
            <Text>Welcome to Home page!</Text>
            <Box>
                {data && data.map((item, index) => {
                    return (
                        <Box key={index}>
                            {item.title}
                        </Box>
                    )
                })}
            </Box>
        </>
    )
}

export default Home;
