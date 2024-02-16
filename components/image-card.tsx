import Image from "next/image";
import { DownloadIcon } from "@radix-ui/react-icons";

import { Card, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const ImageCard = ({ source }: { source: string }) => {
  return (
    <Card key={source} className="rounded-lg overflow-hidden">
      <div className="relative aspect-square">
        <Image
          fill
          alt="Generated"
          src={source}
          blurDataURL="/image-placeholder.gif"
        />
      </div>
      <CardFooter className="p-2">
        <Button
          onClick={() => window.open(source)}
          variant="secondary"
          className="w-full"
        >
          <DownloadIcon className="h-4 w-4 mr-2" />
          Download
        </Button>
      </CardFooter>
    </Card>
  );
};

export default ImageCard;
