import Image from "next/image";

export default function HeadBG({ height }: { height: string }) {
  return (
    <div className={`w-full bg-primarycolor  h-[${height}] overflow-hidden`}>
      <Image
        src="/assets/home/bg-head.png"
        alt="Background Image"
        fill
        className="object-cover"
        // width={2800}
        // height={1700}
        // style={{ width: "100%", height: "auto" }}
      />
    </div>
  );
}
