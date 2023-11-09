import CustomNextImage from "~/app/components/common/CustomNextImage";
import Clickable from "~/app/components/core/Clickable";
import CTAButton from "~/app/components/core/Shopify/Cards/CTAButton";
import {
  flyTape2BasicData,
  chomplrBasicData,
  loFlyDirtBasicData,
} from "~/libs/utils/appData";

const products = [
  {
    id: "1",
    ...flyTape2BasicData,
    image: { src: "/images/Rectangle 9.png", alt: "" },
  },
  {
    id: "2",
    ...chomplrBasicData,
    image: { src: "/images/Mask group.png", alt: "" },
  },
  {
    id: "3",
    ...loFlyDirtBasicData,
    image: { src: "/images/Mask group-1.png", alt: "" },
  },
];

const HomeIOSAppsSect = () => {
  return (
    <section className="p-main-p-3">
      <div className="flex flex-col gap-8">
        <header>
          <h2 className="text-h1 font-semibold uppercase leading-h2 md:px-4">
            iOS Apps
          </h2>
        </header>
        <div className="cards-container flex flex-wrap justify-around gap-6 lg:flex-nowrap">
          {products.map((item) => (
            <article
              key={item.id}
              className="flex w-full flex-col gap-4 md:w-[46%] lg:w-[33%]"
            >
              <Clickable
                className="overflow-hidden rounded-xl"
                href={`/ios-apps/${item.slug}`}
                isA="next-js"
              >
                <CustomNextImage
                  src={item.image.src}
                  alt={item.image.alt}
                  width={1000}
                  height={1000}
                  className="card-img-zoom-animation-1 duration-300 ease-in"
                />
              </Clickable>
              <div className="group flex flex-col gap-2">
                <h3 className="font-normal capitalize leading-4">
                  <Clickable href={`/ios-apps/${item.slug}`} isA="next-js">
                    {item.title}
                  </Clickable>
                </h3>
                <CTAButton
                  href={`/ios-apps/${item.slug}`}
                  isA="next-js"
                  text="Discover more"
                />
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomeIOSAppsSect;
