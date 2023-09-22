// import {
// 	getGetAccessTokenFromCookie,
// 	useGetUserCheckoutDetailsAndIdAndKey,
// 	useGetUserDataFromStore,
// 	useLogoutUser
// } from '@utils/core/hooks';

import {
  type Dispatch,
  type FormEvent,
  Fragment,
  type SetStateAction,
  useMemo,
  useState,
} from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import Link from "next/link";
import CustomDialog, { DialogContentHeader } from "~/components/shared/Dialog";
import {
  type ShopifyCustomer,
  type ShopifyErrorShape,
} from "~/utils/shopify/types";
import { useStore } from "zustand";
import { globalStore } from "~/store";
import CustomNextImage from "~/components/shared/CustomNextImage";
import Clickable from "~/components/shared/core/Clickable";
import CustomNextSeo from "~/components/shared/CustomNextSeo";
import { defaultSiteName } from "~/utils/next-seo.config";
import FormField from "~/components/shared/core/FieldForm";
import { formatPrice } from "~/utils/shopify";
import { useIsMounted } from "~/utils/hooks";
import { useSignOutMutation } from "~/utils/shopify/hooks";
import SectionLoaderContainer from "~/components/shared/LoadersContainers/Section";
import SectionPrimaryLoader from "~/components/shared/Loaders/SectionPrimary";

const TitleValue = ({
  title,
  value,
  isSmall,
}: {
  title: string;
  value: string | number;
  isSmall?: boolean;
}) => (
  <p>
    {isSmall ? (
      <small>
        <strong className="capitalize">{title}</strong>&nbsp;
        {value}
      </small>
    ) : (
      <>
        <strong className="capitalize">{title}</strong>&nbsp;
        {value}
      </>
    )}
  </p>
);

const ProductsOnOrder = ({
  lineItems,
  buttonText,
  statusUrl,
  financialStatus,
}: {
  lineItems: ShopifyCustomer["orders"]["edges"][0]["node"]["lineItems"]["edges"];
  buttonText: string;
  statusUrl: string;
  financialStatus?: string;
}) => {
  const isMounted = useIsMounted();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button type="button" onClick={() => setIsOpen(true)}>
        {buttonText}
      </button>
      <CustomDialog isOpen={isOpen} setIsOpen={setIsOpen}>
        <DialogContentHeader
          titleProps={{
            children:
              financialStatus === "PAID" ? (
                <>
                  {buttonText}{" "}
                  <small className="text-sm text-purple-700">
                    <a
                      href={statusUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      Go to the download page
                    </a>
                  </small>
                </>
              ) : undefined,
          }}
          descriptionProps={{
            children: <></>,
          }}
        />
        <div className="flex flex-col gap-4">
          {lineItems.map(({ node: item }, index) => {
            if (!item?.variant?.id) return <Fragment key={index} />;

            return (
              <div key={item.variant.id}>
                <div className="flex">
                  <div className="flex w-36 items-center bg-black">
                    {item?.variant?.image?.url && (
                      <CustomNextImage
                        unoptimized
                        src={item.variant.image.url}
                        alt={item.variant.image.altText ?? ""}
                        width={150}
                        height={150}
                        className="aspect-square h-full w-full object-contain"
                      />
                    )}
                  </div>
                  <div className="p-2">
                    <p>{item.title}</p>
                    <p>
                      Total Price{" "}
                      {formatPrice(
                        Number(item.originalTotalPrice.amount),
                        item.originalTotalPrice.currencyCode,
                        isMounted,
                      )}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </CustomDialog>
    </>
  );
};

const UpdateUserBasicDetails = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const queryClient = useQueryClient();
  // const { user: authSession } = useGetUserDataFromStore();
  // const accessTokenFrom = getGetAccessTokenFromCookie();
  const authSession = useStore(globalStore, (state) => state.authSession);

  const initFromValues = () => ({
    email: authSession.data ? authSession.data.email : "",
    firstName: authSession.data ? authSession.data.firstName : "",
    lastName: authSession.data ? authSession.data.lastName : "",
    acceptsMarketing: authSession.data
      ? authSession.data.acceptsMarketing
      : false,
  });

  const [formValues, setFormValues] = useState(initFromValues());

  const isChanged = useMemo(() => {
    if (
      !authSession.data ||
      (authSession.data &&
        authSession.data.email.trim() === formValues.email?.trim() &&
        authSession.data.firstName.trim() === formValues?.firstName?.trim() &&
        authSession.data.lastName.trim() === formValues?.lastName?.trim() &&
        authSession.data.acceptsMarketing === formValues.acceptsMarketing)
    )
      return false;

    return true;
  }, [
    formValues.acceptsMarketing,
    formValues.email,
    formValues.firstName,
    formValues.lastName,
    authSession.data,
  ]);

  const updateMutation = useMutation<
    unknown,
    ShopifyErrorShape<string>,
    FormEvent
  >({
    mutationFn: (event) => {
      event.preventDefault();

      if (!isChanged) throw new Error("No changes detected");
      if (!authSession.data) throw new Error("No user data available");

      return fetch(`${process.env.NEXT_PUBLIC_BACKEND_RELATIVE_PATH}/clients`, {
        method: "PUT",
        headers: {
          "Content-type": "application/json",
        },
        body: JSON.stringify({
          email:
            authSession.data.email.trim() !== formValues.email
              ? formValues.email
              : undefined,
          firstName:
            authSession.data.firstName.trim() !== formValues.firstName
              ? formValues.firstName
              : undefined,
          lastName:
            authSession.data.lastName.trim() !== formValues.lastName
              ? formValues.lastName
              : undefined,
          acceptsMarketing:
            authSession.data.acceptsMarketing !== formValues.acceptsMarketing
              ? formValues.acceptsMarketing
              : undefined,
        }),
      })
        .then((response) => response.json())
        .then(() => {
          // if ('success' in result && !result.success)
          // 	throw new Error(result.message);
          // return result;
        });
    },
    onSuccess: () => {
      // console.log('result', result)
      // await user.refetch();
      queryClient.setQueryData<ShopifyCustomer>(["check-token"], (prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          ...formValues,
        };
      });
      setIsOpen(false);
    },
  });

  return (
    <CustomDialog isOpen={isOpen} setIsOpen={setIsOpen}>
      <DialogContentHeader
        titleProps={{ children: "Update Your Basic Details" }}
        descriptionProps={{
          children: <></>,
        }}
      />
      <form
        className="mx-auto my-4 flex flex-col sm:w-11/12"
        onSubmit={updateMutation.mutate}
      >
        <fieldset
          className="mt-2 space-y-4"
          disabled={updateMutation.isLoading}
        >
          <FormField
            values={formValues}
            setValues={setFormValues}
            name="firstName"
            placeholder="*first name"
            autoComplete="first-name"
            minLength={3}
          />
          <FormField
            values={formValues}
            setValues={setFormValues}
            name="lastName"
            placeholder="*last name"
            autoComplete="last-name"
            minLength={3}
          />
          <FormField
            values={formValues}
            setValues={setFormValues}
            name="email"
            type="email"
            placeholder="*email"
            autoComplete="email"
            minLength={3}
          />

          <div className="">
            <label>
              <input
                checked={formValues.acceptsMarketing}
                type="checkbox"
                name="acceptsMarketing"
                onChange={() =>
                  setFormValues((prev) => ({
                    ...prev,
                    acceptsMarketing: !prev.acceptsMarketing,
                  }))
                }
              />
              &nbsp;
              <span>Accept Marketing</span>
            </label>
          </div>

          <div className="flex justify-end">
            <Clickable
              type="submit"
              variants={{ w: "full" }}
              disabled={updateMutation.isLoading || !isChanged}
            >
              submit
            </Clickable>
          </div>
        </fieldset>
        {updateMutation.isError && (
          <div className="text-bg-secondary-2">
            <p>{updateMutation.error.message}</p>
          </div>
        )}
      </form>
    </CustomDialog>
  );
};

const CustomerProfileScreen = () => {
  // const { user } = useGetUserDataFromStore();
  const authSession = useStore(globalStore, (state) => state.authSession);
  const signOutMutation = useSignOutMutation({
    onError: (err) => console.error("err", err),
  });
  const isMounted = useIsMounted();

  // const [isLoggingOut, setIsLoggingOut] = useState(false);
  // const userCheckoutDetailsAndIdAndKey = useGetUserCheckoutDetailsAndIdAndKey();
  const [isUpdateUserBasicDetailsOpen, setIsUpdateUserBasicDetailsOpen] =
    useState(false);
  // const logoutUser = useLogoutUser({
  // 	userCheckoutDetailsAndIdAndKey
  // });

  const orders = useMemo(() => {
    let aNum: number;
    let bNum: number;

    return authSession?.data?.orders?.edges?.slice().sort(function (a, b) {
      aNum = Date.parse(a.node.processedAt);
      bNum = Date.parse(b.node.processedAt);
      if (aNum === bNum) return 0;

      return aNum > bNum ? -1 : 1;
    });
  }, [authSession?.data?.orders?.edges]);

  let pageTitle = `Loading... | ${defaultSiteName}`;

  if (authSession.status === "loading")
    //  && authSession.status === 'fetching'
    return (
      <>
        <CustomNextSeo
          pageTitle={pageTitle}
          additionalMetaTags={[
            { name: "robots", content: "noindex, nofollow" },
          ]}
        />
        <section className="bg-primary-1 section-p-v1 h-[75vh] max-h-[45rem] min-h-fit">
          <div className="mx-auto max-w-screen-md">
            <SectionLoaderContainer>
              <SectionPrimaryLoader />
            </SectionLoaderContainer>
          </div>
        </section>
      </>
    );

  if (!authSession.data) {
    pageTitle = !authSession.data
      ? `Please login first to view your data, or reload the page and make sure you have a good internet connection | ${defaultSiteName}`
      : `Your data doesn't exist | ${defaultSiteName}`;

    return (
      <>
        <CustomNextSeo
          pageTitle={pageTitle}
          additionalMetaTags={[
            { name: "robots", content: "noindex, nofollow" },
          ]}
        />
        <section className="bg-primary-1 section-p-v1 h-[75vh] max-h-[45rem] min-h-fit">
          <div className="mx-auto max-w-screen-md">
            <p>
              {!authSession.data
                ? "Please login first to view your data, or reload the page and make sure you have a good internet connection"
                : "Your data doesn't exist "}
            </p>
          </div>
        </section>
      </>
    );
  }

  pageTitle = `${authSession.data.firstName} ${authSession.data.lastName} | ShopifyCustomer Profile | ${defaultSiteName}`;

  return (
    <>
      <CustomNextSeo
        pageTitle={pageTitle}
        additionalMetaTags={[{ name: "robots", content: "noindex, nofollow" }]}
      />
      <section className="bg-primary-1 section-p-v1">
        <div className="mx-auto flex max-w-screen-md flex-col gap-16">
          <header className="flex flex-col items-center">
            <h1 className="text-h1 uppercase">Account</h1>
            <p>
              Logged in as{" "}
              <span className="text-bg-secondary-1">
                {authSession.data.email}
              </span>{" "}
              (
              <Clickable
                onClick={() => signOutMutation.mutate()}
                disabled={signOutMutation.isLoading}
                variants={{ rounded: null, px: null, py: null, btn: null }}
                className="text-bg-secondary-1 hover:text-violet-600 focus:text-violet-600"
              >
                logout
              </Clickable>
              )
            </p>
          </header>
          <div className="flex flex-col gap-1">
            <p className="text-primary-1 capitalize">
              {authSession.data.firstName} {authSession.data.lastName}
            </p>
            <p>{authSession.data.email}</p>
            <TitleValue
              title="Account Created:"
              value={new Date(authSession.data.createdAt).toLocaleString()}
              isSmall
            />

            <Clickable
              onClick={() => setIsUpdateUserBasicDetailsOpen(true)}
              variants={{ rounded: null, px: null, py: null, btn: null }}
              className="text-bg-secondary-1 hover:text-violet-600 focus:text-violet-600"
            >
              Edit
            </Clickable>
            <UpdateUserBasicDetails
              isOpen={isUpdateUserBasicDetailsOpen}
              setIsOpen={setIsUpdateUserBasicDetailsOpen}
            />
          </div>

          <div className="">
            {!Array.isArray(orders) ||
            orders.length === 0 ||
            !("node" in orders[0]!) ? (
              <p>
                <span>There&apos;s no orders</span>&nbsp;
                <Link
                  href="/drums-that-knock"
                  className="text-bg-secondary-1 hover:text-violet-600 focus:text-violet-600"
                >
                  let&apos;s do something about that
                </Link>
              </p>
            ) : (
              <>
                <table className="orders-table w-full table-fixed border-collapse overflow-x-auto">
                  <thead className="border border-gray-500 font-bold">
                    <tr>
                      <th className="px-8 py-6 md:px-12 md:py-8">Order</th>
                      <th className="px-8 py-6 md:px-12 md:py-8">Payment</th>
                      <th className="px-8 py-6 md:px-12 md:py-8">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(({ node: itemNode }) => (
                      <tr key={itemNode.id}>
                        <td className="border border-gray-500 px-8 py-6 md:px-12 md:py-8">
                          <span className="title hidden font-bold">
                            Order:&nbsp;
                          </span>
                          <span className="text-bg-secondary-1 hover:text-violet-600 focus:text-violet-600">
                            {/* {itemNode.name} */}
                            <ProductsOnOrder
                              lineItems={itemNode.lineItems.edges}
                              buttonText={itemNode.name}
                              statusUrl={itemNode.statusUrl}
                              financialStatus={itemNode.financialStatus}
                            />
                          </span>
                          &nbsp;-&nbsp;
                          <span>
                            {new Date(itemNode.processedAt).toLocaleDateString(
                              undefined,
                              {
                                dateStyle: "medium",
                              },
                            )}
                          </span>
                        </td>
                        <td className="border border-gray-500 px-8 py-6 capitalize md:px-12 md:py-8">
                          <span className="title hidden font-bold">
                            Payment:&nbsp;
                          </span>
                          {itemNode.financialStatus?.toLowerCase()}
                        </td>
                        <td className="border border-gray-500 px-8 py-6 md:px-12 md:py-8">
                          <span className="title hidden font-bold">
                            Total:&nbsp;
                          </span>
                          {formatPrice(
                            Number(itemNode.totalPrice.amount),
                            itemNode.totalPrice.currencyCode,
                            isMounted,
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <style jsx>{`
                  .orders-table {
                    border-collapse: collapse;
                    width: 100%;
                  }

                  /* .orders-table tr {
									padding: 0.35em;
								} */

                  .orders-table th,
                  .orders-table td {
                    text-align: center;
                  }

                  /* .orders-table th {
									text-transform: uppercase;
								} */

                  @media screen and (max-width: 600px) {
                    .orders-table {
                      border: 0;
                    }

                    .orders-table caption {
                      font-size: 1.3em;
                    }

                    .orders-table thead {
                      border: none;
                      clip: rect(0 0 0 0);
                      height: 1px;
                      margin: -1px;
                      overflow: hidden;
                      padding: 0;
                      position: absolute;
                      width: 1px;
                    }

                    .orders-table tr {
                      border-bottom: 3px solid #ddd;
                      display: block;
                      margin-bottom: 0.625em;
                    }

                    .orders-table td {
                      border-bottom: 1px solid #ddd;
                      display: block;
                      font-size: 0.8em;
                      text-align: initial;
                    }

                    .orders-table td .title {
                      display: inline-block;
                      width: 25%;
                      max-width: fit-content;
                    }

                    .orders-table td::before {
                      /*
    * aria-label has no advantage, it won't be read inside a table
    content: attr(aria-label);
    */
                      content: attr(data-label);
                      float: left;
                      font-weight: bold;
                      text-transform: uppercase;
                    }

                    .orders-table td:last-child {
                      border-bottom: 0;
                    }
                  }
                  @media screen and (max-width: 400px) {
                    .orders-table td {
                      padding: 0.5rem;
                      white-space: break-spaces;
                    }
                    .orders-table td .title {
                      width: auto;
                    }
                  }
                `}</style>
              </>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default CustomerProfileScreen;
