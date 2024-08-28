import { getCurrentUserData } from "@/feats/auth/services/auth.service";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

const currUser = async () => {
  const user = await getCurrentUserData();
  return { userId: user?.id };
};

export const ourFileRouter = {
  workspaceImage: f({
    image: { maxFileSize: "4MB", maxFileCount: 1 },
  })
    .middleware(() => currUser())
    .onUploadComplete(() => {}),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
