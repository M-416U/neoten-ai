import Image from "next/image";

const Empty = ({ message }: { message: string }) => {
  return (
    <div className="flex h-full justify-center items-center p-20 flex-col">
      <Image alt="No Data" src={"/empty.png"} width={290} height={290} />
      <p className="text-sm text-center text-muted-foreground">{message}</p>
    </div>
  );
};

export default Empty;
