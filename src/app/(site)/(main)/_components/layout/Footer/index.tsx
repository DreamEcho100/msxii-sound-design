"use client";
import { FaFacebookF, FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import Clickable from "~/app/components/core/Clickable";
import { motion } from "framer-motion";
import { cx } from "class-variance-authority";
import { MdEmail } from "react-icons/md";
import Link from "next/link";
import { useStore } from "zustand";
import { globalStore } from "~/app/libs/store";
import CustomNextImage from "~/app/components/common/CustomNextImage";
import { useTheme } from "next-themes";
import { trpcApi } from "~/app/libs/trpc/client";
import z from "zod";
import { toast } from "react-toastify";
import { useState } from "react";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/app/components/common/ui/accordion";

function Subscribe() {
  const subscribeToEmailList = trpcApi.subscribeToEmailList.useMutation({
    onError: (error) => toast.error(error.message),
    onSuccess: () => {
      toast.success("Successful request, subscribed to the email list");
    },
  });

  return (
    <div className="flex max-w-sm flex-grow flex-col gap-4">
      <header className="flex flex-col gap-2">
        <h3 className="text-h4 font-medium dark:text-text-primary-500">
          Join our newsletter
        </h3>
        <p>New Subscribers get our Site Sampler Free!</p>
      </header>
      <form
        className="flex flex-col gap-6"
        onSubmit={(event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const emailSafeParsed = z
            .string()
            .email()
            .safeParse(data.get("email"));
          if (!emailSafeParsed.success) {
            toast.error("Please enter a valid email");
            return;
          }

          subscribeToEmailList.mutate(emailSafeParsed.data);
        }}
      >
        <input
          type="email"
          name="email"
          required
          placeholder="Enter your email address"
          className="border-b-[0.125rem] border-solid border-b-text-primary-200 bg-transparent py-2 outline-none"
        />
        <Clickable
          variants={{
            rounded: "md",
            w: "full",
            py: "sm",
            "font-weight": null,
          }}
          className="text-h4 font-normal uppercase"
          type="submit"
          disabled={subscribeToEmailList.isLoading}
        >
          Subscribe
        </Clickable>
      </form>
    </div>
  );
}

const footerLinks: {
  text: string;
  // href?: string;
  clickable?: Parameters<typeof Clickable>[0];
  links?: ({
    text: string;
    // href: string;
    icon?: JSX.Element | null;
  } & Parameters<typeof Clickable>[0])[];
}[] = [
  {
    text: "Collections",
    clickable: { href: "/collections", isA: "next-js" },
    links: [
      {
        text: "New Releases",
        isA: "next-js",
        href: "/collections/new-releases",
      },
      {
        text: "Loops",
        isA: "next-js",
        href: "/collections/loops",
      },
      {
        text: "One Shot Drums",
        isA: "next-js",
        href: "/collections/one-shot-drums",
      },
      {
        text: "Sample Packs",
        isA: "next-js",
        href: "/collections/sample-packs",
      },
      {
        text: "Drum Kits",
        isA: "next-js",
        href: "/collections/drum-kits",
      },
      // { text: 'Construction Kits', isA: 'next-js', href: '/', icon: null },
      {
        text: "Presets",
        isA: "next-js",
        href: "/collections/presets",
      },
      {
        text: "Bundles",
        isA: "next-js",
        href: "/collections/bundles",
      },
    ],
  },
  {
    text: "Navigation",
    links: [
      {
        text: "Search",
        isA: "button",
        variants: null,
        onClick: globalStore.getState().menus.toggleSearchMenuDropdown,
      },
      { text: "About Us", isA: "next-js", href: "/about", icon: null },
      { text: "Support", isA: "next-js", href: "/support", icon: null },
      {
        text: "License Agreement",
        isA: "next-js",
        href: "/policies/license-agreement",
      },
      {
        text: "Blue Label",
        isA: "next-js",
        href: "/blue-label",
      },
      {
        text: "Sitemap",
        href: "sitemap.xml",
      },
    ],
  },
  {
    text: "Contact Us",
    links: [
      {
        text: "support@msxaudio.com",
        href: "mailto:support@msxaudio.com",
        icon: <MdEmail />,
      },
    ],
  },
];

function ListsOnSm() {
  return (
    <Accordion type="multiple" className="w-full">
      {footerLinks.map((item) => (
        <AccordionItem value={item.text} key={item.text}>
          <AccordionTrigger className="pb-0">{item.text}</AccordionTrigger>
          <AccordionContent>
            <ul>
              {item.links?.map(({ icon, text, ...itemProps }) => (
                <li key={text}>
                  <Clickable
                    {...itemProps}
                    className={cx(
                      "flex w-fit flex-wrap items-center gap-1 border-b-[0.125rem] border-solid border-b-transparent outline-none sm:flex-nowrap",
                      "transition-all duration-150",
                      "focus:border-b-text-primary-200 focus:text-text-primary-300",
                      "hover:border-b-text-primary-500 hover:text-text-primary-500",
                    )}
                  >
                    {icon}
                    {text}
                  </Clickable>
                </li>
              ))}
            </ul>
          </AccordionContent>
        </AccordionItem>
      ))}
    </Accordion>
  );
}

const MainLayoutFooter = () => {
  const { theme: currentTheme, setTheme } = useTheme();
  const isDarkTheme = currentTheme === "dark";

  return (
    <footer id="main-footer">
      <div className="mx-auto flex max-w-main flex-col gap-4 px-main-p-3 py-main-p-4 text-text-primary-400 dark:text-text-primary-600 sm:px-main-p-2">
        <div className="flex flex-wrap justify-between gap-4">
          {footerLinks.map((item) => (
            <ul key={item.text} className="hidden flex-col gap-2 sm:flex">
              <li>
                <h3 className="text-h6 font-medium dark:text-text-primary-500">
                  {item.clickable ? (
                    <Clickable
                      {...item.clickable}
                      className={cx(
                        "flex w-fit flex-wrap items-center gap-1 border-b-[0.125rem] border-solid border-b-transparent outline-none sm:flex-nowrap",
                        "transition-all duration-150",
                        "focus:border-b-text-primary-200 focus:text-text-primary-300",
                        "hover:border-b-text-primary-500 hover:text-text-primary-500",
                      )}
                    >
                      {item.text}
                    </Clickable>
                  ) : (
                    item.text
                  )}
                </h3>
              </li>
              {item.links?.map(({ icon, text, ...itemProps }) => (
                <li key={text}>
                  <Clickable
                    {...itemProps}
                    className={cx(
                      "flex w-fit flex-wrap items-center gap-1 border-b-[0.125rem] border-solid border-b-transparent outline-none sm:flex-nowrap",
                      "transition-all duration-150",
                      "focus:border-b-text-primary-200 focus:text-text-primary-300",
                      "hover:border-b-text-primary-500 hover:text-text-primary-500",
                    )}
                  >
                    {icon}
                    {text}
                  </Clickable>
                </li>
              ))}
            </ul>
          ))}
          <ListsOnSm />
          <Subscribe />
        </div>
        <div className="mx-auto flex w-full max-w-main flex-grow flex-wrap items-center justify-around gap-x-8 gap-y-4 text-center font-normal sm:justify-between">
          <div>
            <small>
              &copy;&nbsp;2023&nbsp;
              <Link
                href="/"
                className="border-b-[0.0625rem] border-solid border-b-text-primary-200"
              >
                MSXII Sound
              </Link>
            </small>
          </div>
          <div className="md:ml-16 rtl:md:mr-16">
            <Clickable href="/" isA="next-js">
              <CustomNextImage
                src="/images/logo.png"
                alt="logo"
                width="240"
                height="192"
                className="h-12 w-16 object-contain"
                priority
              />
            </Clickable>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-2">
            <div className="flex">
              <p className="text-[90%]" suppressHydrationWarning>
                {isDarkTheme ? "Dark" : "Light"} mode
              </p>
              &nbsp;
              <Clickable
                variants={null}
                className={cx(
                  "flex h-6 w-12 cursor-pointer items-center justify-start rounded-[2.5rem] bg-text-primary-300/40 px-1",
                  isDarkTheme
                    ? "justify-end bg-text-primary-500/40"
                    : undefined,
                )}
                onClick={() => setTheme(isDarkTheme ? "light" : "dark")}
                title={`Set theme to ${isDarkTheme ? "light" : "dark"} mode.`}
              >
                <motion.div
                  className={cx(
                    "h-4 w-4 rounded-[50%] bg-text-primary-0",
                    isDarkTheme ? "bg-text-primary-1000/50" : "",
                  )}
                  layout
                  transition={{
                    type: "spring",
                    stiffness: 700,
                    damping: 30,
                  }}
                />
              </Clickable>
            </div>
            <ul className="flex flex-wrap gap-2">
              <li>
                <Clickable
                  isA="basic-link"
                  href="https://www.facebook.com/MSXIIsound/"
                  title="facebook"
                  target="_blank"
                >
                  <FaFacebookF />
                </Clickable>
              </li>
              <li>
                <Clickable
                  isA="basic-link"
                  href="https://twitter.com/msxiisound"
                  title="twitter"
                  target="_blank"
                >
                  <FaTwitter />
                </Clickable>
              </li>
              <li>
                <Clickable
                  isA="basic-link"
                  href="https://www.youtube.com/user/MSXAudio"
                  title="youtube"
                  target="_blank"
                >
                  <FaYoutube />
                </Clickable>
              </li>
              <li>
                <Clickable
                  isA="basic-link"
                  href="https://www.instagram.com/msxiisound/"
                  title="instagram"
                  target="_blank"
                >
                  <FaInstagram />
                </Clickable>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default MainLayoutFooter;
