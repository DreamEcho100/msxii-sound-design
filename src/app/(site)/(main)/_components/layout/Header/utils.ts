export const headersLinks: (
  | {
      title: string;
      href: string;
      onLtLg?: "hide" | { title: string; href: string };
    }
  | {
      title: string;
      links: { title: string; href: string; isA?: string }[];
      onLtLg?: "hide" | { title: string; href: string };
    }
)[] = [
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
    onLtLg: "hide",
  },
  {
    title: "Samples",
    onLtLg: { title: "Samples", href: "/collections" },
    links: [
      { title: "Drum Kits", href: "/collections/drum-kits" },
      {
        title: "Ableton Racks",
        href: "https://racksforlive.com/",
        isA: "normal-link",
      },
      { title: "Vinyl", href: "/collections/vinyl" },
    ],
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
]; // as const;
