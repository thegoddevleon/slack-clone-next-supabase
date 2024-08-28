import { getSeoTag } from "@/lib/seo/seo";
import { Metadata } from "next";
import CreateWorkspace from "./assets/components/create-work-space";

export const metadata: Metadata = getSeoTag({
  title: "Create Workspace",
  description: "Creating workspace for your new team or organization.",
});

const CreateWorkspacePage = () => {
  return <CreateWorkspace />;
};

export default CreateWorkspacePage;
