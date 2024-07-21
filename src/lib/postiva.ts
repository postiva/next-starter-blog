import { createClient } from "@postiva/client";

export const postivaClient = createClient({
  apiKey: process.env.NEXT_PUBLIC_POSTIVA_API_KEY as string,
  workspaceId: process.env.NEXT_PUBLIC_WORKSPACE_ID as string,
  options: {
    debug: false,
  },
});
