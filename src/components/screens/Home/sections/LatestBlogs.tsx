import Image from "next/image";
import React from "react";
import { BsArrowRight } from "react-icons/bs";
import Clickable from "~/components/shared/core/Clickable";

type Props = {};

const blogs = [
  {
    id: "1",
    title: "Tape Series Vol. 1 from MSXIISound and AKAI Pro",
    image: { src: "/images/Rectangle 14.png", alt: "" },
  },
  {
    id: "2",
    title: "Holiday Jams By The WVGRD",
    image: { src: "/images/Rectangle 15.png", alt: "" },
  },
];

const HomeLatestBlogsSection = (props: Props) => {
  return (
    <section className="bg-basic-secondary-500 text-basic-primary-500 sm:px-main-p-3 sm:py-main-p-2">
      <div className="bg-special-primary-500 py-main-p-1 px-main-p-2  sm:rounded-xl md:p-main-p-1">
        <div className="mx-auto flex w-fit flex-col gap-4 sm:gap-12">
          <header>
            <h2 className="text-h1 font-black">Latest Blogs</h2>
          </header>
          <div className="flex w-fit flex-col gap-8 lg:flex-row">
            {blogs.map((blog) => (
              <article
                key={blog.id}
                className="flex aspect-video flex-col-reverse rounded-lg bg-basic-primary-0 text-basic-secondary-0 sm:flex-row md:max-w-[600px]"
              >
                <div className="sm:text-align-initial flex flex-col items-center justify-between gap-2 p-8 text-center sm:w-1/2 sm:items-start sm:gap-0 lg:p-4">
                  <Clickable
                    variants={{ btn: "secondary", rounded: null, p: "v1-sm" }}
                  >
                    Blog post
                  </Clickable>
                  <h3 className="text-h5 leading-primary-4">
                    <Clickable href="/" isA="next-js">
                      {blog.title}
                    </Clickable>
                  </h3>
                  <Clickable
                    href="/"
                    isA="next-js"
                    className="flex flex-wrap items-center gap-1"
                  >
                    Learn more{" "}
                    <BsArrowRight className="text-special-primary-500" />
                  </Clickable>
                </div>
                <div className="flex flex-col sm:w-1/2">
                  <Clickable
                    href="/"
                    isA="next-js"
                    className="block h-full w-full"
                  >
                    <Image
                      src={blog.image.src}
                      alt={blog.image.alt}
                      width={900}
                      height={500}
                      className="h-full w-full object-cover object-right"
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

export default HomeLatestBlogsSection;
