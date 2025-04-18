// // export default WorkspaceGuard;
// import { useMsal } from "@azure/msal-react";
// import { Navigate } from "@tanstack/react-router";
// import PageLayout from "@/components/layout/PageLayout/PageLayout";
// import Loader from "@/components/shared/Loader/Loader";
// import { FeatureTogglesProvider } from "@/components/feature-toggles-provider";
// import usePluginStore from "@/store/PluginsStore";

// const WorkspaceGuard = ({
//   Layout = PageLayout,
// }: {
//   Layout: React.FC<{ children?: React.ReactNode }>;
// }) => {
//   const { accounts } = useMsal(); // Get the authenticated user account
//   const WorkspacePreloader = usePluginStore((state) => state.WorkspacePreloader);

//   // If no user is logged in (i.e., no account found), redirect to the login page
//   if (accounts.length === 0) {
//     return <Navigate to="/login" />;
//   }

//   // Show loader while workspace is loading
//   if (!WorkspacePreloader) {
//     return <Loader />;
//   }

//   return (
//     <WorkspacePreloader>
//       <FeatureTogglesProvider>
//         <Layout />
//       </FeatureTogglesProvider>
//     </WorkspacePreloader>
//   );
// };

// export default WorkspaceGuard;



import { useMsal } from "@azure/msal-react";
import { Navigate, useRouterState } from "@tanstack/react-router";
import PageLayout from "@/components/layout/PageLayout/PageLayout";
import Loader from "@/components/shared/Loader/Loader";
import { FeatureTogglesProvider } from "@/components/feature-toggles-provider";
import usePluginStore from "@/store/PluginsStore";

const WorkspaceGuard = ({
  Layout = PageLayout,
}: {
  Layout: React.FC<{ children?: React.ReactNode }>;
}) => {
  const { accounts } = useMsal();
  const WorkspacePreloader = usePluginStore((state) => state.WorkspacePreloader);
  const routerState = useRouterState(); // for getting current path

  const isAuthenticated = accounts.length > 0;

  if (!isAuthenticated) {
    // Redirect to login with intended destination
    return (
      <Navigate
        to="/login"
        search={{ redirectTo: routerState.location.pathname + routerState.location.search }}
      />
    );
  }

  if (!WorkspacePreloader) {
    return <Loader />;
  }

  return (
    <WorkspacePreloader>
      <FeatureTogglesProvider>
        <Layout />
      </FeatureTogglesProvider>
    </WorkspacePreloader>
  );
};

export default WorkspaceGuard;
