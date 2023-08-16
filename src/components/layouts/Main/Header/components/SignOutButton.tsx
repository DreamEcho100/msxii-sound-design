import { GoSignOut } from "react-icons/go";
import { useStore } from "zustand";
import Clickable from "~/components/shared/Clickable";
import { globalStore } from "~/store";
import { useSignOutMutation } from "~/utils/shopify/hooks";

const SignOutButton = () => {
  const authSessionStatus = useStore(
    globalStore,
    (store) => store.authSession.status,
  );

  const signOutMutation = useSignOutMutation({
    onError: (err) => console.error("err", err),
  });

  if (authSessionStatus !== "authenticated") return <></>;

  return (
    <Clickable onClick={() => signOutMutation.mutate()}>
      <GoSignOut />
    </Clickable>
  );
};

export default SignOutButton;
