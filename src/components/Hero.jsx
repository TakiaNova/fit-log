import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className=" border border-[#2A2D35] bg-[#15171D]">
      <div className="mx-auto flex min-h-[600px] max-w-6xl items-center gap-24 px-10 py-16">

        {/* Left Content */}
        <div className="w-[52%]">
          <p className="mb-5 text-sm font-medium tracking-[0.2em] text-[#C2F800]">
            WORKOUT LIBRARY
          </p>

          <h1 className="whitespace-nowrap text-5xl font-extrabold leading-[1.05] tracking-tight lg:text-6xl">
            TRAIN WITH INTENT.
            <br />
            LOG EVERY SET.
          </h1>

          <p className="mt-6 text-base leading-7 text-gray-400">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            <br />
            into today's plan, and watch the week's work add up.
          </p>

          <Link
            href="#library"
            className="mt-8 inline-flex rounded-md bg-[#C2F800] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#d0ff33]"
          >
            BROWSE WORKOUTS
          </Link>
        </div>

        {/* Right Banner */}
        <div className="flex w-[48%] justify-end">
          <div className="relative h-[460px] w-full">
            <Image
              src="/assets/banner.png"
              alt="FitLog workout banner"
              fill
              priority
              className="object-contain"
            />
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;