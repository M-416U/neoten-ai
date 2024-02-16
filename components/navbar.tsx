import { UserButton } from "@clerk/nextjs";
import MobileSidebar from "./mobile-sidebar";
import { getApliLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";
const Navbar = async () => {
  const apiLimitCount = await getApliLimit();
  const isPro = await checkSubscription();
  return (
    <nav className="flex items-center p-5">
      <MobileSidebar count={apiLimitCount} isPro={isPro} />
      <div className="flex w-full justify-end">
        <UserButton afterSignOutUrl="/" />
      </div>
    </nav>
  );
};

export default Navbar;
