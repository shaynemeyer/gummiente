import AutoScroll from "@/components/AutoScroll";

export default function Home() {
  return (
    <div className="flex flex-col w-full max-w-4xl py-24 mx-auto stretch">
      <AutoScroll trackVisibility />
    </div>
  );
}
