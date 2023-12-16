import type { ShopifyCustomer } from "~/libs/shopify/types";

import TitleValue from "../../_components/title-value";
import { useState } from "react";
import { Edit2 } from "lucide-react";
import CustomDialog, {
  DialogContentHeader,
} from "~/app/components/common/Dialog";
import { trpcApi } from "~/app/libs/trpc/client";
import type { RouterInputs } from "~/server/api/root";
import FormInput from "~/app/components/core/FormInput";
import Clickable from "~/app/components/core/Clickable";
import { useStore } from "zustand";
import { globalStore } from "~/app/libs/store";
import { toast } from "react-toastify";

interface Props {
  customerData: ShopifyCustomer;
}

function EditBasicInfoButton(props: Props) {
  const updateCustomerInGlobalStore = useStore(
    globalStore,
    (store) => store.authSession.utils.update,
  );
  const [isOpen, setIsOpen] = useState(false);
  const [formValues, setFormValues] = useState<
    Required<RouterInputs["shopify"]["customers"]["updateOneBasic"]>
  >({
    email: props.customerData.email,
    acceptsMarketing: props.customerData.acceptsMarketing,
    firstName: props.customerData.firstName,
    lastName: props.customerData.lastName,
    phone: props.customerData.phone ?? "",
  });

  const updateOneBasic = trpcApi.shopify.customers.updateOneBasic.useMutation({
    onError: (err) => {
      toast.error(err.message);
    },
    onSuccess: () => {
      toast.success("Successful Request");
    },
  });

  return (
    <>
      <button
        type="button"
        title="edit basic info."
        onClick={() => setIsOpen(true)}
      >
        <Edit2 className="h-5 w-5" />
      </button>

      <CustomDialog setIsOpen={setIsOpen} isOpen={isOpen}>
        <DialogContentHeader titleProps={{ children: "Edit Basic Info" }} />
        <form
          className="flex flex-col gap-4 py-4"
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={async (event) => {
            event.preventDefault();

            await updateOneBasic.mutateAsync(formValues);

            updateCustomerInGlobalStore((prev) => ({
              ...prev,
              ...formValues,
            }));
          }}
        >
          <FormInput
            name={"firstName"}
            setFormValues={setFormValues}
            value={formValues.firstName}
            placeholder="* First Name"
            required
          />
          <FormInput
            name={"lastName"}
            setFormValues={setFormValues}
            value={formValues.lastName}
            placeholder="* Last Name"
            required
          />
          <FormInput
            name={"email"}
            setFormValues={setFormValues}
            value={formValues.email}
            placeholder="* Email"
            required
            type="email"
          />
          <FormInput
            name={"phone"}
            setFormValues={setFormValues}
            value={formValues.phone ?? ""}
            placeholder="* Phone"
          />
          <Clickable
            type="submit"
            variants={{ py: "sm", w: "full" }}
            className="mt-4"
            disabled={updateOneBasic.isLoading}
          >
            Submit
          </Clickable>
        </form>
      </CustomDialog>
    </>
  );
}

function CustomerProfileBasicInfo(props: Props) {
  return (
    <section className="p-8">
      <header className="flex gap-4">
        <h1 className="text-h1">Customer Profile</h1>
        <EditBasicInfoButton customerData={props.customerData} />
      </header>
      <TitleValue title="email" value={props.customerData.email} />
      <TitleValue title="first name" value={props.customerData.firstName} />
      <TitleValue title="last name" value={props.customerData.lastName} />
      <TitleValue title="phone" value={props.customerData.phone} />
      {props.customerData.defaultAddress && (
        <address>
          <TitleValue
            title="address 1"
            value={props.customerData.defaultAddress.address1}
          />
          <TitleValue
            title="address 2"
            value={props.customerData.defaultAddress.address2}
          />
          <TitleValue
            title="country"
            value={props.customerData.defaultAddress.country}
          />
          <TitleValue
            title="province"
            value={props.customerData.defaultAddress.province}
          />
          <TitleValue
            title="city"
            value={props.customerData.defaultAddress.city}
          />
          <TitleValue
            title="phone"
            value={props.customerData.defaultAddress.phone}
          />
          <TitleValue
            title="zip"
            value={props.customerData.defaultAddress.zip}
          />
        </address>
      )}
      {/* <p>Accepts Marketing: {props.customerData.acceptsMarketing}</p> */}
    </section>
  );
}

export default CustomerProfileBasicInfo;
