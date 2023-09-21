export const headersLinks = [
  {
    title: "New Releases",
    href: "/collections/new-releases",
  },
  {
    title: "iOS Apps",
    href: "/ios-apps",
  },
  {
    title: "Blue Label",
    href: "/blue-label",
  },
  {
    title: "Samples",
    links: [
      { title: "Drum Kits", href: "/collections/drum-kits" },
      {
        title: "Ableton Racks",
        href: "https://racksforlive.com/",
        isA: "normal-link",
      },
      { title: "Vinyl", href: "/collections/vinyl" },
    ] as {
      readonly title: "Ableton Racks";
      readonly href: "https://racksforlive.com/";
      readonly isA?: "normal-link";
    }[],
  },
  {
    title: "Bundles",
    href: "/collections/bundles",
  },
  {
    title: "Blog",
    href: "/blog",
  },
  {
    title: "Merch",
    href: "/merch",
  },
] as const;