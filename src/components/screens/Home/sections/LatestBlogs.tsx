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
    <section className="bg-basic-secondary-500 text-basic-primary-500 sm:p-main-p-3">
      <div className="flex flex-col gap-4 bg-special-primary-500 p-main-p-3 sm:rounded-xl">
        <header>
          <h2 className="text-h1 font-black">New Releases</h2>
        </header>
        <div className="flex flex-col gap-8 lg:flex-row">
          {blogs.map((blog) => (
            <article
              key={blog.id}
              className="flex aspect-video flex-col-reverse rounded-lg bg-basic-primary-0 text-basic-secondary-0 sm:flex-row"
            >
              <div className="lg:p- sm:text-align-initial flex flex-col items-center justify-between gap-2 p-8 text-center sm:w-1/2 sm:items-start sm:gap-0">
                <p>Blog post</p>
                <h3 className="text-h4">
                  <Clickable href="/" isA="next-js">
                    {blog.title}
                  </Clickable>
                </h3>
                <Clickable
                  href="/"
                  isA="next-js"
                  className="flex flex-wrap items-center"
                >
                  Learn more <BsArrowRight />
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
    </section>
  );
};

export default HomeLatestBlogsSection;
