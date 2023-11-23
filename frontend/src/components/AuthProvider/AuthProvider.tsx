import {FC, Fragment, ReactNode} from "react";

interface AuthProvider {
    children: ReactNode;
}

export const AuthProvider: FC<AuthProvider> = ({children}) => {

    // const { token } = useAppSelector(state => state.userReducer.user)

    // // const navigate = useNavigate();
    //
    // useEffect(() => {
    //     // navigate('/app')
    //
    //     // if (!token) {
    //     //     navigate('/', {replace: true})
    //     //     return;
    //     // }
    // }, [token]);

    return <Fragment>{children}</Fragment>
}
