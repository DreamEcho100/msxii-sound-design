import { type FormStoreApi, useCreateFormStore } from "@de100/form-echo";
import Dialog from "~/components/shared/common/Dialog";
import { cx } from "class-variance-authority";
import { Fragment, useRef, useMemo, useState, useEffect } from "react";
import { BiPlus } from "react-icons/bi";
import { toast } from "react-toastify";
import { z } from "zod";
import ContainedInputField from "~/components/shared/common/@de100/form-echo/Fields/Contained/Input";
import Form from "~/components/shared/common/@de100/form-echo/Forms";
import CustomNextImage from "~/components/shared/CustomNextImage";
import { type RouterInputs, api } from "~/utils/api";
import SectionLoaderContainer from "~/components/shared/LoadersContainers/Section";
import SectionPrimaryLoader from "~/components/shared/Loaders/SectionPrimary";

const formSchema = {
  slug: z.string().min(3),
  //
  imageSrc: z.string().min(3).nullable().optional(),
  imageAltText: z.string().min(3).nullable().optional(),
  imageWidth: z.number().min(0).nullable().optional(),
  imageHeight: z.number().min(0).nullable().optional(),
  //
  seoTitle: z.string().min(3),
  seoDescription: z.string().min(3).nullable().optional(),
};
type FormValues = {
  slug: string;
  //
  imageSrc?: string | null;
  imageAltText?: string | null;
  imageWidth?: number | null;
  imageHeight?: number | null;
  //
  seoTitle: string;
  seoDescription?: string | null;
};
type FormSchema = typeof formSchema;
type FormStore = FormStoreApi<FormValues, FormSchema>;

function SelectProductModal(props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean | ((isOpen: boolean) => boolean)) => void;
  formStore: FormStore;
  itemsSlugs: (string | null)[];
}) {
  const searchInputRef = useRef<HTMLInputElement>(null);
  const itemsSlugsMap = useMemo(() => {
    const itemsSlugsMap: Record<string, true> = {};

    for (const slug of props.itemsSlugs) {
      if (slug) itemsSlugsMap[slug] = true;
    }

    return itemsSlugsMap;
  }, [props.itemsSlugs]);
  const [query, setQuery] = useState<
    RouterInputs["dashboard"]["shopify"]["getProducts"]
  >({
    title: undefined,
  });
  const getShopifyProductsQuery =
    api.dashboard.shopify.getProducts.useQuery(query);

  useEffect(() => {
    if (!props.isOpen || !searchInputRef.current) return;

    searchInputRef.current.focus();
  }, [props.isOpen]);

  return (
    <Dialog setIsOpen={props.setIsOpen} isOpen={props.isOpen}>
      <div className="flex flex-col gap-4">
        <input
          ref={searchInputRef}
          type="search"
          onChange={(event) => {
            const value = event.target.value;
            setQuery((prev) => ({
              ...prev,
              title: value.length < 3 ? undefined : value,
            }));
          }}
          className={cx(
            "border-b border-b-special-primary-500 outline-none",
            "hover:border-b-special-primary-600",
            "focus:ring-special-primary-500",
          )}
        />
        {getShopifyProductsQuery.isLoading && (
          <SectionLoaderContainer>
            <SectionPrimaryLoader />
          </SectionLoaderContainer>
        )}
        {getShopifyProductsQuery.isError && (
          <>{getShopifyProductsQuery.error.message}</>
        )}
        <div
          className="grid gap-4"
          style={{
            gridTemplateColumns: "repeat(auto-fit, minmax(8rem, 1fr))",
          }}
        >
          {getShopifyProductsQuery.data?.map(({ node }) =>
            node.handle && itemsSlugsMap[node.handle] ? (
              <Fragment key={node.id} />
            ) : (
              <button
                key={node.id}
                type="button"
                onClick={() => {
                  const setFieldValue =
                    props.formStore.getState().utils.setFieldValue;

                  setFieldValue("slug", node.handle);

                  setFieldValue("imageSrc", node.featuredImage.url);
                  setFieldValue("imageAltText", node.featuredImage.altText);
                  setFieldValue("imageWidth", node.featuredImage.width);
                  setFieldValue("imageHeight", node.featuredImage.height);

                  setFieldValue("seoTitle", node.title);
                  setFieldValue("seoDescription", node.description);

                  props.setIsOpen(false);
                }}
                className="flex h-full flex-grow flex-col gap-2"
              >
                <CustomNextImage
                  src={node.featuredImage.url}
                  alt={node.featuredImage.altText ?? ""}
                  width={node.featuredImage.width ?? 250}
                  height={node.featuredImage.height ?? 250}
                  className="aspect-square bg-black/20 object-contain"
                />
                <p>{node.title}</p>
              </button>
            ),
          )}
        </div>
      </div>
    </Dialog>
  );
}

function CreateProductPageModal(props: {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean | ((isOpen: boolean) => boolean)) => void;
  itemsSlugs: (string | null)[];
}) {
  const [selectProductModalOpen, setSelectProductModalOpen] = useState(false);
  const formStore: FormStore = useCreateFormStore<FormValues, FormSchema>({
    initValues: {
      slug: "",
      //
      imageSrc: null,
      imageAltText: null,
      imageWidth: null,
      imageHeight: null,
      //
      seoTitle: "",
      seoDescription: null,
    },
    validationSchema: formSchema,
    validationEvents: { change: true },
    valuesFromStoreToFields: {
      imageSrc: (val) => val ?? "",
      imageAltText: (val) => val ?? "",
      imageWidth: (val) => (typeof val === "number" ? val.toString() : ""),
      imageHeight: (val) => (typeof val === "number" ? val.toString() : ""),
      seoDescription: (val) => val ?? "",
    },
    valuesFromFieldsToStore: {
      imageSrc: (val) => (val ? val : null),
      imageAltText: (val) => (val ? val : null),
      imageWidth: (val) => (val ? Number(val) : null),
      imageHeight: (val) => (val ? Number(val) : null),
      seoDescription: (val) => (val ? val : null),
    },
  });
  const createProductPage =
    api.dashboard.pages.createOneProductByTemplate.useMutation({
      onError(error) {
        toast(error.message, { type: "error" });
      },
      onSuccess() {
        toast("Successful submission!", { type: "success" });
      },
    });

  return (
    <>
      <Dialog setIsOpen={props.setIsOpen} isOpen={props.isOpen}>
        <Form
          // eslint-disable-next-line @typescript-eslint/no-misused-promises
          onSubmit={async (event, params) => {
            event.preventDefault();
            await createProductPage.mutateAsync(params.validatedValues);

            // props.onSuccess(params);
          }}
          store={formStore}
        >
          <button
            type="button"
            className="flex items-center justify-center bg-gray-500 py-4 capitalize text-white"
            onClick={() => setSelectProductModalOpen(true)}
          >
            select product
          </button>

          <fieldset className="flex min-w-[unset] max-w-full flex-col gap-2 rounded-sm border p-4 shadow-md">
            <legend className="capitalize">SEO</legend>
            <ContainedInputField
              store={formStore}
              name="seoTitle"
              labelProps={{ children: "title" }}
            />
            <ContainedInputField
              store={formStore}
              name="seoDescription"
              labelProps={{ children: "description" }}
              isA="textarea"
            />
          </fieldset>

          <fieldset className="flex min-w-[unset] max-w-full flex-col gap-2 rounded-sm border p-4 shadow-md">
            <legend className="capitalize">image</legend>
            <ContainedInputField
              store={formStore}
              name="imageSrc"
              labelProps={{ children: "src" }}
            />
            <ContainedInputField
              store={formStore}
              name="imageAltText"
              labelProps={{ children: "alt text" }}
            />
            <ContainedInputField
              store={formStore}
              name="imageWidth"
              labelProps={{ children: "initial width" }}
              type="number"
            />
            <ContainedInputField
              store={formStore}
              name="imageHeight"
              labelProps={{ children: "initial height" }}
              type="number"
            />
          </fieldset>

          <button
            type="submit"
            disabled={createProductPage.isLoading}
            className="focus:shadow-outline rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700 focus:outline-none"
          >
            submit
          </button>
        </Form>
      </Dialog>

      <SelectProductModal
        setIsOpen={setSelectProductModalOpen}
        isOpen={selectProductModalOpen}
        itemsSlugs={props.itemsSlugs}
        formStore={formStore}
      />
    </>
  );
}

export default function CreateProductPageButton(props: {
  dataLength: number;
  itemsSlugs: (string | null)[];
}) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className={cx(
          "flex items-center justify-center bg-gray-500 text-white",
          props.dataLength === 0 ? "h-96 w-96" : undefined,
        )}
        onClick={() => setIsOpen(true)}
      >
        <BiPlus className="text-9xl" />
      </button>
      {isOpen && (
        <CreateProductPageModal
          isOpen={isOpen}
          setIsOpen={setIsOpen}
          itemsSlugs={props.itemsSlugs}
        />
      )}
    </>
  );
}
