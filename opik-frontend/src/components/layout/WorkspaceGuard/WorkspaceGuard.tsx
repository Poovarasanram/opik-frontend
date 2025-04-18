// import PageLayout from "@/components/layout/PageLayout/PageLayout";
// import Loader from "@/components/shared/Loader/Loader";
// import usePluginStore from "@/store/PluginsStore";
// import { FeatureTogglesProvider } from "@/components/feature-toggles-provider";

// const WorkspaceGuard = ({
//   Layout = PageLayout,
// }: {
//   Layout: React.FC<{ children?: React.ReactNode }>;
// }) => {
//   const WorkspacePreloader = usePluginStore(
//     (state) => state.WorkspacePreloader,
//   );

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
// import { Navigate } from "@tanstack/react-router";
// import PageLayout from "@/components/layout/PageLayout/PageLayout";
// import Loader from "@/components/shared/Loader/Loader";
// import usePluginStore from "@/store/PluginsStore";
// import { FeatureTogglesProvider } from "@/components/feature-toggles-provider";
// import { useLoggedInUserName } from "@/store/AppStore";

// const WorkspaceGuard = ({
//   Layout = PageLayout,
// }: {
//   Layout: React.FC<{ children?: React.ReactNode }>;
// }) => {
//   const loggedInUser = useLoggedInUserName();

//   // 🔐 If not logged in, redirect to login page
//   if (!loggedInUser) {
//     return <Navigate to="/login" />;
//   }

//   const WorkspacePreloader = usePluginStore(
//     (state) => state.WorkspacePreloader,
//   );

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

import PageLayout from "@/components/layout/PageLayout/PageLayout";
import Loader from "@/components/shared/Loader/Loader";
import { FeatureTogglesProvider } from "@/components/feature-toggles-provider";
import useAppStore from "@/store/AppStore";
import { Navigate } from "@tanstack/react-router";
import usePluginStore from "@/store/PluginsStore";

const WorkspaceGuard = ({
  Layout = PageLayout,
}: {
  Layout: React.FC<{ children?: React.ReactNode }>;
}) => {
  const WorkspacePreloader = usePluginStore(
    (state) => state.WorkspacePreloader,
  );

  const apiKey = useAppStore((state) => state.user.apiKey);

  if (!apiKey) {
    return <Navigate to="/login" />;
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
