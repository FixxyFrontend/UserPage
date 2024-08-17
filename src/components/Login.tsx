import { GoogleLogin } from 'react-google-login'
import { useNavigate } from 'react-router-dom';
const client_id="392980597886-hur0lq3lf73k39jea3t2mgvotnv776ut.apps.googleusercontent.com"

function Login({ onLoginSuccess }){
    const navigate=useNavigate();
    const onSuccess = (res:any) => {
        console.log("Login Successful", res.profileObj);
        const user = res.profileObj;
        localStorage.setItem('user', JSON.stringify(user));
        if (onLoginSuccess) onLoginSuccess(); // Call the function to update user state
      };
    
     const onFailure=(res:any)=>{
        console.log("Login failed",res);
     }
    return(
        <div>
            <GoogleLogin
                clientId={client_id}
                buttonText="Login with Google"
                onSuccess={onSuccess}
                onFailure={onFailure}
                cookiePolicy={'single_host_origin'}
                isSignedIn={true}
            />
        </div>
    )
}
export default Login;