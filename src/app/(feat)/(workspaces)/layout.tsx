import MainContent from "@/components/common/main-content";

const WorkspaceLayout = async ({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) => {
  return <MainContent>{children}</MainContent>;
};

export default WorkspaceLayout;
