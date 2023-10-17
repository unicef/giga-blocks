import AuthGuard from "../auth/AuthGuard";

const Dashboard = () => {
    return ( 
        <AuthGuard>
            Dashboard
        </AuthGuard>
     );
}
 
export default Dashboard;