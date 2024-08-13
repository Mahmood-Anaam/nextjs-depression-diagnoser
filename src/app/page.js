import Hero from "@/components/Hero";
import Stepper from "@/components/Stepper";
import Diagnosis from "@/components/Diagnosis";

// dark => #202737
// light => #f8f9ff
export default function Home() {
  return (
    <>
      {/* <Hero /> */}
     
     <Diagnosis/>

      {/* <section
        id="home"
        className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="container mx-auto p-4">
          <h1 className="text-2xl font-bold mb-4">Stepper Example</h1>
          <Stepper />
        </div>
      </section> */}
    </>
  );
}
