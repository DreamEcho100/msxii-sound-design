import Clickable from "~/app/components/core/Clickable";
import SideMainButton from "./SideMainButton";
import CustomNextImage from "~/app/components/common/CustomNextImage";

export default function MainHeader() {
  return (
    <>
      <header className="fixed inset-x-0 z-[2] w-full bg-black/5 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-main items-center justify-end gap-4 border-b px-4 sm:px-8">
          <Clickable href="/" isA="next-js" noDashboardCustomPgs>
            <CustomNextImage
              src="/images/logo.png"
              alt="logo"
              width="240"
              height="192"
              className="h-12 w-16"
              priority
            />
          </Clickable>
          <SideMainButton />
        </div>
      </header>
      <div className="h-16 w-full" />
    </>
  );
}
