// import CustomNextImage from "~/components/shared/CustomNextImage";
import Clickable from "~/app/components/core/Clickable";
import CustomNextImage from "~/app/components/common/CustomNextImage";
import CTAButton from "~/app/components/core/Shopify/Cards/CTAButton";
import { type RouterOutputs } from "~/server/api/root";

type Props = {
  basicArticles: RouterOutputs["shopify"]["blog"]["articles"]["getManyBasic"]["items"];
};

const HomeLatestBlogsSect = (props: Props) => {
  return (
    <section className="sm:px-main-p-3 sm:py-main-p-2">
      <div className="bg-bg-primary-0 px-main-p-2 py-main-p-1 sm:rounded-xl md:p-main-p-1">
        <div className="mx-auto flex w-fit flex-col gap-4 sm:gap-12">
          <header className="text-initial-primary-900">
            <h2 className="text-h1 font-semibold leading-h2">Latest Blogs</h2>
          </header>
          <div className="cards-container flex w-fit flex-col gap-8 text-initial-primary-500 lg:flex-row">
            {props.basicArticles.map(({ node }) => (
              <article
                key={node.id}
                className="flex flex-col-reverse overflow-hidden rounded-lg bg-bg-primary-600 bg-opacity-20 text-text-primary-500 transition-all duration-300 dark:bg-opacity-100 sm:aspect-video sm:flex-row md:max-w-[600px]"
              >
                <div className="sm:text-align-initial group flex flex-col items-center justify-between gap-2 p-8 text-center sm:w-1/2 sm:items-start sm:gap-0 lg:p-8">
                  <Clickable
                    className="rounded-[0.25rem] text-sm"
                    variants={{
                      btn: "secondary",
                      rounded: null,
                      py: "extra-sm",
                      px: "sm",
                    }}
                  >
                    Blog post
                  </Clickable>
                  <h3 className="text-[1.125rem] font-normal">
                    <Clickable
                      href={`/blog/${node.id.replace(
                        "gid://shopify/Article/",
                        "",
                      )}`}
                      isA="next-js"
                    >
                      {node.title}
                    </Clickable>
                  </h3>
                  <CTAButton
                    href={`/blog/${node.id.replace(
                      "gid://shopify/Article/",
                      "",
                    )}`}
                    isA="next-js"
                    text="Learn more"
                  />
                </div>
                <div className="flex flex-col sm:w-1/2">
                  <Clickable
                    href={`/blog/${node.id.replace(
                      "gid://shopify/Article/",
                      "",
                    )}`}
                    isA="next-js"
                    className="block h-full w-full overflow-hidden"
                  >
                    <CustomNextImage
                      src={node.image.url}
                      alt={node.image.altText}
                      width={375}
                      height={425}
                      className="card-img-zoom-animation-1 h-full w-full bg-fixed object-cover object-right duration-300 ease-in hover:scale-110"
                    />
                  </Clickable>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeLatestBlogsSect;
