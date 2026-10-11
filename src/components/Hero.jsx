
import Image from "next/image";
import Link from "next/link";

const Hero = () => {
  return (
    <section className="mx-2 mt-0 mb-6 border border-[#2A2D35] bg-[#15171D] sm:mb-8 lg:mb-12">
      <div className="mx-auto flex min-h-[auto] max-w-6xl flex-col items-center gap-8 px-5 py-12 sm:px-8 sm:py-14 lg:min-h-[600px] lg:flex-row lg:gap-12 lg:px-10 lg:py-0 xl:gap-16">
        {/* Left Content */}
        <div className="w-full min-w-0 lg:w-[52%]">
          <p className="mb-4 text-xs font-medium tracking-[0.2em] text-[#C2F800] sm:mb-5 sm:text-sm">
            WORKOUT LIBRARY
          </p>

          <h1 className="text-3xl font-bold leading-[1.1] tracking-tight sm:text-4xl lg:text-5xl">
            TRAIN WITH INTENT. LOG
            <br />
            EVERY SET.
          </h1>

          <p className="mt-5 max-w-xl text-sm leading-6 text-gray-400 sm:mt-6 sm:text-base sm:leading-7">
            FitLog is a dark, no-nonsense gym companion: pick a lift, lock it
            into today's plan, and watch the week's work add up.
          </p>

          <Link
            href="#library"
            className="mt-7 inline-flex items-center justify-center rounded-md bg-[#C2F800] px-6 py-3 text-sm font-bold text-black transition hover:bg-[#d0ff33] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#C2F800] sm:mt-8"
          >
            BROWSE WORKOUTS
          </Link>
        </div>

        {/* Right Banner */}
        <div className="flex w-full min-w-0 justify-center lg:w-[48%] lg:justify-end">
          <div className="relative aspect-[4/3] w-full max-w-[520px] sm:aspect-[5/4] lg:aspect-auto lg:h-[420px] xl:h-[460px]">
            <Image
              src="/assets/banner.png"
              alt="FitLog workout banner"
              fill
              priority
              sizes="(max-width: 1023px) 100vw, 50vw"
              className="object-contain"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;
