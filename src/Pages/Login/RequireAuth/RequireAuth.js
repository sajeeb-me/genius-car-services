import { useAuthState, useSendEmailVerification } from "react-firebase-hooks/auth";
import { Navigate, useLocation } from "react-router-dom";
import auth from "../../../firebase.init";
import Loading from "../Loading/Loading";
import { toast } from 'react-toastify';


const RequireAuth = ({ children }) => {
    const location = useLocation();
    const [user, loading] = useAuthState(auth);
    const [sendEmailVerification, sending, error] = useSendEmailVerification(auth);
    if (loading) {
        return <Loading></Loading>
    }
    if (!user) {
        return <Navigate to='/login' state={{ from: location }} replace />;
    }
    // console.log(user)
    if (user.providerData[0]?.providerId === "password" && !user.emailVerified) {
        return <div>
            <h4 className="text-danger">Your email is not verified?</h4>
            <p>Please verify your email first.</p>
            <button
                className="btn btn-primary"
                onClick={async () => {
                    await sendEmailVerification();
                    toast.info('Sent email');
                }}
            >
                Verify email
            </button>
        </div>
    }

    return children;
};

export default RequireAuth;