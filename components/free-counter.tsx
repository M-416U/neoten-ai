import { MAX_API_LIMIT } from "@/constants";
import { Progress } from "./ui/progress";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { LightningBoltIcon } from "@radix-ui/react-icons";
import { useUpgradeModal } from "@/hooks/use-upgrade-modal";

const FreeCounter = ({ count = 0 }: { count: number }) => {
  const upgradeModal = useUpgradeModal();
  return (
    <div className="px-3">
      <Card className="bg-white/10 border-0">
        <CardContent className="py-6">
          <div className="text-center text-sm text-white mb-4 space-y-2">
            <p>
              {count} / {MAX_API_LIMIT} Free Generations
            </p>
            <Progress className="h-3" value={(count / MAX_API_LIMIT) * 100} />
          </div>
          <Button
            variant="premium"
            className="w-full"
            onClick={upgradeModal.onOpen}
          >
            Upgrade
            <LightningBoltIcon className="w-4 h-4 ml-2 fill-white" />
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default FreeCounter;
