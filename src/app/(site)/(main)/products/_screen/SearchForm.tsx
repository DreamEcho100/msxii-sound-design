"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

export function SearchForm() {
  const [formValues, setFormValues] = useState({
    productTitleQuery: "",
    productTitleQueryDebounce: "",
  });
  const router = useRouter();

  function handleSubmit() {
    if (
      formValues.productTitleQueryDebounce.length !== 0 &&
      formValues.productTitleQueryDebounce.length < 3
    )
      return;

    router.push(
      `/products?productTitleQuery=${formValues.productTitleQueryDebounce}`,
    );
  }

  useEffect(() => {
    if (
      formValues.productTitleQuery.length !== 0 &&
      formValues.productTitleQuery.length < 3
    )
      return;

    // productTitleQueryInputRef.current?.focus();
    setFormValues((prev) => ({
      ...prev,
      productTitleQueryDebounce: formValues.productTitleQuery,
    }));
  }, []);

  useEffect(() => {
    // productTitleQueryInputRef.current?.focus();
    const productTitleQuery =
      new URL(window.location.href).searchParams.get("productTitleQuery") ?? "";

    setFormValues((prev) => ({
      ...prev,
      productTitleQuery,
    }));
  }, []);

  return (
    <form
      onSubmit={(event) => {
        event.preventDefault();
      }}
    >
      <input
        type="search"
        name="productTitleQuery"
        id="productTitleQuery"
        value={formValues.productTitleQuery}
        onChange={(event) => {
          setFormValues((prev) => ({
            ...prev,
            productTitleQuery: event.target.value,
          }));
        }}
      />
    </form>
  );
}
