"use client";
import { Fragment, useEffect, useMemo, useState } from "react";
import { useStore } from "zustand";
import { useRouter } from "next/navigation";
import Link from "next/link";
import PagePrimaryLoader from "~/app/components/common/Loaders/PagePrimary";
import PageLoaderContainer from "~/app/components/common/LoadersContainers/Page";
import { globalStore } from "~/app/libs/store";
import { formatPrice } from "~/libs/shopify";
import { type ShopifyCustomer, type ShopifyOrder } from "~/libs/shopify/types";
import CustomDialog, {
  DialogContentHeader,
} from "~/app/components/common/Dialog";
import CustomNextImage from "~/app/components/common/CustomNextImage";
import classes from "./index.module.css";
import { cx } from "class-variance-authority";
import CustomerProfileBasicInfo from "./_sections/basic-info";

function ProductsOnOrder({
  lineItems,
  buttonText,
  statusUrl,
  financialStatus,
}: {
  lineItems: ShopifyOrder["lineItems"]["edges"];
  buttonText: string;
  statusUrl: string;
  financialStatus: string;
}) {
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
                    <a href={statusUrl} target="_blank" rel="noreferrer">
                      Go to the download page
                    </a>
                  </small>
                </>
              ) : undefined,
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
                    <p suppressHydrationWarning>
                      Total Price{" "}
                      {formatPrice(
                        Number(item.originalTotalPrice.amount),
                        item.originalTotalPrice.currencyCode,
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
}

function CustomerProfileScreenContent(props: {
  customerData: ShopifyCustomer;
}) {
  const orders = useMemo(() => {
    let aNum: number;
    let bNum: number;

    return props.customerData.orders?.edges?.slice().sort(function (a, b) {
      aNum = Date.parse(a.node.processedAt);
      bNum = Date.parse(b.node.processedAt);
      if (aNum === bNum) return 0;

      return aNum > bNum ? -1 : 1;
    });
  }, [props.customerData.orders?.edges]);

  return (
    <>
      <CustomerProfileBasicInfo customerData={props.customerData} />

      <section className="p-8">
        {!Array.isArray(orders) ||
        orders.length === 0 ||
        !("node" in orders[0]!) ? (
          <p>
            <span>There&apos;s no orders</span>&nbsp;
            <Link
              href="/collections"
              className="text-bg-secondary-1 hover:text-violet-600 focus:text-violet-600"
            >
              let&apos;s do something about that
            </Link>
          </p>
        ) : (
          <>
            <table
              className={cx(
                classes["orders-table"],
                "w-full table-fixed border-collapse overflow-x-auto",
              )}
            >
              <thead className="border border-gray-500 font-bold">
                <tr>
                  <th className="px-4 py-6 sm:px-8 md:py-8 lg:px-12">Order</th>
                  <th className="px-4 py-6 sm:px-8 md:py-8 lg:px-12">
                    Payment
                  </th>
                  <th className="px-4 py-6 sm:px-8 md:py-8 lg:px-12">Total</th>
                </tr>
              </thead>
              <tbody>
                {orders.map(({ node: itemNode }) => (
                  <tr key={itemNode.id}>
                    <td className="border border-gray-500 px-4 py-6 sm:px-8 md:py-8 lg:px-12">
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
                    <td className="border border-gray-500 px-4 py-6 capitalize sm:px-8 md:py-8 lg:px-12">
                      <span className="title hidden font-bold">
                        Payment:&nbsp;
                      </span>
                      {itemNode.financialStatus?.toLowerCase()}
                    </td>
                    <td
                      className="border border-gray-500 px-4 py-6 sm:px-8 md:py-8 lg:px-12"
                      suppressHydrationWarning
                    >
                      <span className="title hidden font-bold">
                        Total:&nbsp;
                      </span>
                      {formatPrice(
                        Number(itemNode.totalPrice.amount),
                        itemNode.totalPrice.currencyCode,
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </>
        )}
      </section>
    </>
  );
}

export default function CustomerProfileScreen() {
  const router = useRouter();
  const authSession = useStore(globalStore, (store) => store.authSession);
  const toggleOpenAuthDialog = useStore(
    globalStore,
    (store) => store.dialogs.auth.toggleOpen,
  );

  useEffect(() => {
    if (authSession.status === "unauthenticated") {
      router.push("/");
      toggleOpenAuthDialog();
    }
  }, [authSession.status, router, toggleOpenAuthDialog]);

  if (authSession.isLoading)
    return (
      <PageLoaderContainer>
        <PagePrimaryLoader />
      </PageLoaderContainer>
    );

  if (authSession.status === "authenticated")
    return <CustomerProfileScreenContent customerData={authSession.data} />;

  return authSession.status;
}
