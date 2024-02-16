import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";
const Navbar = async ({
  count = 0,
  isPro = false,
}: {
  count: number;
  isPro: boolean;
}) => {
  return (
    <nav className="flex items-center p-5">
      <MobileSidebar count={count} isPro={isPro} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;
