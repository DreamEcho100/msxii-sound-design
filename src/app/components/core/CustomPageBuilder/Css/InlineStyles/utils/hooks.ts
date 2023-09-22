import { toast } from "react-toastify";
import { trpcApi } from "~/app/libs/trpc/client";

export const useSetInlineStylesOneRequest = () => {
  return trpcApi.dashboard.css.inlineStyles.setOne.useMutation({
    onError(error) {
      toast(error.message, { type: "error" });
    },
    onSuccess() {
      toast("Successful submission!", { type: "success" });
    },
  });
};
