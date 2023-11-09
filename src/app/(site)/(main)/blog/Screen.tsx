"use client";
import { Suspense, useState } from "react";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import Clickable from "~/app/components/core/Clickable";
import CustomNextImage from "~/app/components/common/CustomNextImage";
import { trpcApi } from "~/app/libs/trpc/client";
import { type RouterOutputs, type RouterInputs } from "~/server/api/root";

type Props = {
  baseInput: RouterInputs["shopify"]["blog"]["articles"]["getManyBasic"];
  baseData: RouterOutputs["shopify"]["blog"]["articles"]["getManyBasic"];
};

export default function BlogScreen(props: Props) {
  const [currentPgIndex, setCurrentPgIndex] = useState(0);
  const [articles, articlesQuery] =
    trpcApi.shopify.blog.articles.getManyBasic.useSuspenseInfiniteQuery(
      props.baseInput,
      {
        initialData: {
          pageParams: [undefined],
          pages: [props.baseData],
        },
        getNextPageParam: (lastPage) => lastPage.nextCursor,
        keepPreviousData: true,
      },
    );

  const pages = articles.pages;
  const pagesLength = pages.length;
  const isOnLastPage = currentPgIndex === pagesLength - 1;

  if (!pages[currentPgIndex]) return <>No articles found</>;

  const currentPgItems = pages[currentPgIndex]!.items;

  const disableNextPgButton =
    articlesQuery.isFetching || (isOnLastPage && !articlesQuery.hasNextPage); //  || !articlesQuery.hasNextPage;
  const disablePreviousPgButton =
    articlesQuery.isFetching || currentPgIndex === 0;

  const goToNextPg = async () => {
    if (isOnLastPage) {
      if (!articlesQuery.hasNextPage) return;

      await articlesQuery.fetchNextPage();
    }

    setCurrentPgIndex((prev) => prev + 1);
  };
  const goToPreviousPg = () => {
    if (currentPgIndex === 0) return;

    setCurrentPgIndex((prev) => prev - 1);
  };

  return (
    <div className="flex flex-col gap-12 px-main-p-3 py-main-p-1 sm:px-main-p-1">
      <header>
        <h1 className="text-h3 font-semibold">MSXII Sound Blog</h1>
      </header>
      <section className="flex flex-col gap-8">
        <header>
          <h2 className="text-h4 font-semibold text-text-primary-400">News</h2>
        </header>
        <div
          className="grid justify-items-center gap-x-8 gap-y-12"
          style={{
            gridTemplateColumns: "repeat(auto-fill, minmax(15rem, 1fr))",
          }}
        >
          <Suspense>
            {currentPgItems.map(({ node }) => (
              <article
                key={node.id}
                className="flex w-56 flex-col gap-4 text-center"
              >
                <Clickable
                  variants={{ btn: null, px: null, py: null }}
                  isA="next-js"
                  href={`/blog/${node.id.replace(
                    "gid://shopify/Article/",
                    "",
                  )}`}
                  className="aspect-square overflow-hidden rounded-lg"
                >
                  <CustomNextImage
                    src={node.image.url}
                    alt={node.image.altText ?? ""}
                    width={300}
                    height={300}
                    className="aspect-square h-full w-full object-cover duration-300 ease-in hover:scale-110"
                    priority
                  />
                </Clickable>
                <h3 className="flex-grow text-[1rem] font-light leading-snug">
                  <small>{node.title}</small>
                </h3>
                <p>read more</p>
              </article>
            ))}
          </Suspense>
        </div>
        <footer className="mt-4 flex flex-col items-center justify-center">
          <div className="flex items-center gap-6 text-h5 text-text-primary-400">
            <Clickable
              variants={null}
              className="flex items-center disabled:cursor-not-allowed disabled:text-text-primary-200"
              disabled={disablePreviousPgButton}
              onClick={goToPreviousPg}
            >
              {!disablePreviousPgButton && (
                <>
                  <HiOutlineArrowNarrowLeft className="translate-y-[10%]" />
                  &nbsp;
                </>
              )}
              Older
            </Clickable>
            <Clickable
              variants={null}
              className="flex items-center disabled:cursor-not-allowed disabled:text-text-primary-200"
              disabled={disableNextPgButton}
              // eslint-disable-next-line @typescript-eslint/no-misused-promises
              onClick={goToNextPg}
            >
              Newer
              {!disableNextPgButton && (
                <>
                  &nbsp;
                  <HiOutlineArrowNarrowRight className="translate-y-[10%]" />
                </>
              )}
            </Clickable>
          </div>
        </footer>
      </section>
    </div>
  );
}
