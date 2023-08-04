import { createServerSideHelpers } from "@trpc/react-query/server";
import { useState } from "react";
import { type AppRouter, appRouter } from "~/server/api/root";
import { createInnerTRPCContext } from "~/server/api/trpc";
import superjson from "superjson";
import { api } from "~/utils/api";
import { type InferGetStaticPropsType } from "next";
import { type inferRouterInputs } from "@trpc/server";
import {
  HiOutlineArrowNarrowLeft,
  HiOutlineArrowNarrowRight,
} from "react-icons/hi";
import Clickable from "~/components/shared/core/Clickable";
import CustomNextImage from "~/components/shared/CustomNextImage";

const BlogPage = (props: InferGetStaticPropsType<typeof getStaticProps>) => {
  const [currentPageIndex, setCurrentPageIndex] = useState(0);
  const articlesQuery = api.shopify.blog.articles.getManyBasic.useInfiniteQuery(
    props.blogGetManyInput,
    {
      getNextPageParam: (lastPage) => lastPage.nextCursor,
      keepPreviousData: true,
    }
  );

  if (articlesQuery.isLoading) return <>Loading...</>;

  if (articlesQuery.isError) return <>Error</>;

  const pages = articlesQuery.data.pages;
  const pagesLength = pages.length;
  const isOnLastPage = currentPageIndex === pagesLength - 1;

  if (!pages[currentPageIndex]) return <>No articles found</>;

  const currentPageItems = pages[currentPageIndex]!.items;

  // currentPageIndex === pagesSize - 1 &&
  const disableNextPageButton =
    articlesQuery.isFetching || (isOnLastPage && !articlesQuery.hasNextPage); //  || !articlesQuery.hasNextPage;
  const disablePreviousPageButton =
    articlesQuery.isFetching || currentPageIndex === 0;

  const goToNextPage = async () => {
    if (isOnLastPage) {
      if (!articlesQuery.hasNextPage) return;

      await articlesQuery.fetchNextPage();
    }

    setCurrentPageIndex((prev) => prev + 1);
  };
  const goToPreviousPage = () => {
    if (currentPageIndex === 0) return;

    setCurrentPageIndex((prev) => prev - 1);
  };

  // return <blogScreen blog={articlesQuery.data || []} />;
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
          {currentPageItems.map(({ node }) => (
            <article
              key={node.id}
              className="flex w-56 flex-col gap-4 text-center"
            >
              <Clickable
                variants={{ btn: null, px: null, py: null }}
                // className="mx-auto capitalize"
                isA="next-js"
                href={`/blog/${node.id.replace("gid://shopify/Article/", "")}`}
                className="aspect-square overflow-hidden rounded-lg"
              >
                <CustomNextImage
                  src={node.image.url}
                  alt={node.image.altText ?? ""}
                  width={node.image.width ?? 300}
                  height={node.image.height ?? 300}
                  className="h-full w-full object-cover duration-300 ease-in hover:scale-110"
                  priority
                />
              </Clickable>
              <h3 className="flex-grow text-[1rem] font-light leading-snug">
                <small>{node.title}</small>
              </h3>
              <p>read more</p>
            </article>
          ))}
        </div>
        <footer className="mt-4 flex flex-col items-center justify-center">
          <div className="flex items-center gap-6 text-h5 text-text-primary-400">
            <Clickable
              variants={null}
              className="flex items-center disabled:cursor-not-allowed disabled:text-text-primary-200"
              disabled={disablePreviousPageButton}
              onClick={goToPreviousPage}
            >
              {!disablePreviousPageButton && (
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
              disabled={disableNextPageButton}
              onClick={goToNextPage}
            >
              Newer
              {!disableNextPageButton && (
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
};

export async function getStaticProps() {
  // context: GetStaticPropsContext<undefined>
  const ssg = createServerSideHelpers({
    router: appRouter,
    ctx: createInnerTRPCContext({}),
    transformer: superjson, // optional - adds superjson serialization
  });
  /*
   * Prefetching the `blog.articles.getManyBasic` query here.
   * `prefetchQuery` does not return the result - if you need that, use `fetchQuery` instead.
   */
  const blogGetManyInput: inferRouterInputs<AppRouter>["shopify"]["blog"]["articles"]["getManyBasic"] =
    {
      limit: 24,
    };
  await ssg.shopify.blog.articles.getManyBasic.prefetchInfinite(
    blogGetManyInput
  );

  // Make sure to return { props: { trpcState: ssg.dehydrate() } }
  return {
    props: {
      trpcState: ssg.dehydrate(),
      blogGetManyInput,
    },
    revalidate: 10,
  };
}

export default BlogPage;
