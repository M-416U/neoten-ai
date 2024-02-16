import Navbar from "@/components/navbar";
import SiderBar from "@/components/sidebar";
import { getApliLimit } from "@/lib/api-limit";
import { checkSubscription } from "@/lib/subscription";

const DashboardLayout = async ({ children }: { children: React.ReactNode }) => {
  const apiLimitCount = await getApliLimit();
  const isPro = await checkSubscription();
  return (
    <div className="h-full relative">
      <div className="hidden md:flex md:fixed md:w-72 bg-gray-800 h-full">
        <SiderBar count={apiLimitCount} isPro={isPro} />
      </div>
      <main className="md:pl-72">
        <Navbar count={apiLimitCount} isPro={isPro} />
        {children}
      </main>
    </div>
  );
};

export default DashboardLayout;
