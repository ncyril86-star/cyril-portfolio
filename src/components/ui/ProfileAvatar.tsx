import { assets } from "../../data/assets";

export function ProfileAvatar() {
  return (
    <div className="relative mx-auto size-32 sm:size-40 md:size-44">
      <div
        className="absolute -inset-2 -rotate-6 rounded-full bg-[#f5c518] shadow-[0_4px_14px_rgba(0,0,0,0.2)]"
        aria-hidden
      />
      <div className="relative size-full overflow-hidden rounded-full border-4 border-white shadow-[0_8px_28px_rgba(0,0,0,0.18)]">
        <img
          src={assets.profile}
          alt="Cyril Noel"
          className="size-full object-cover contrast-[1.08] saturate-[1.12]"
          style={{ objectPosition: "50% 20%" }}
        />
      </div>
      <div className="absolute -bottom-1 -right-1 flex size-10 rotate-12 items-center justify-center rounded-full border-4 border-white bg-coral shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
        <img src={assets.profileSparkle} alt="" className="size-5" />
      </div>
    </div>
  );
}
