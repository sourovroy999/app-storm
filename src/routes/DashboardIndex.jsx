import { Navigate } from "react-router";
import useRole from "../hooks/useRole";

const DashboardIndex = () => {
  const [role, isLoading] = useRole();

  if (isLoading) {
    return <p>loadinggg....</p>; // Show loading state while fetching role
  }

  switch (role) {
    case 'admin':
      return <Navigate to="/dashboard/manage-users" replace />;
    case 'moderator':
      return <Navigate to="/dashboard/product-review-queue" replace />;
    case 'guest':
    default:
      return <Navigate to="/dashboard/my-profile" replace />;
  }
};

export default DashboardIndex