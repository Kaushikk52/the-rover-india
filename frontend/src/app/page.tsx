import Cateories from "@/components/Categories";
import HeroComponent from "@/components/HeroComponent";

export default function Home() {
  return (
    <>
      <div className="top-[84px] sticky z-10">
        <Cateories />
      </div>
      <div className="flex flex-col gap-5 object-cover">
        <div className="flex flex-col w-full">
          <HeroComponent />
        </div>
      </div>
    </>
  );
}
