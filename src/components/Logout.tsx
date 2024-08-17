import { GoogleLogout } from "react-google-login";
const client_id="392980597886-hur0lq3lf73k39jea3t2mgvotnv776ut.apps.googleusercontent.com"
function Logout({onLogout}){
    const handleLogout = () => {
        localStorage.removeItem('user');
        if (onLogout) onLogout(); // Call the function to update user state
        
      };
    return(
        <div>
            <GoogleLogout
                clientId={client_id}
                buttonText="Logout"
                onLogoutSuccess={handleLogout}
            />
        </div>
    )
}
export default Logout;