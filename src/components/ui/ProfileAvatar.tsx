import { useState } from "react";
import { assets } from "../../data/assets";

export function ProfileAvatar() {
  const [imageFailed, setImageFailed] = useState(false);
  const [sparkleFailed, setSparkleFailed] = useState(false);

  return (
    <div className="relative mx-auto size-32 sm:size-40 md:size-44">
      <div
        className="absolute -inset-2 -rotate-6 rounded-full bg-[#f5c518] shadow-[0_4px_14px_rgba(0,0,0,0.2)]"
        aria-hidden
      />
      <div className="relative size-full overflow-hidden rounded-full border-4 border-white shadow-[0_8px_28px_rgba(0,0,0,0.18)]">
        {imageFailed ? (
          <div className="flex size-full items-start justify-center bg-[#f5c518] pt-4 font-display text-2xl font-bold text-ink sm:pt-5 sm:text-3xl">
            Cyril Noel
          </div>
        ) : (
          <img
            src={assets.profile}
            alt="Cyril Noel"
            className="size-full object-cover contrast-[1.08] saturate-[1.12]"
            style={{ objectPosition: "50% 20%" }}
            onError={() => setImageFailed(true)}
          />
        )}
      </div>
      <div className="absolute -bottom-1 -right-1 flex size-10 rotate-12 items-center justify-center rounded-full border-4 border-white bg-coral shadow-[0_4px_12px_rgba(0,0,0,0.25)]">
        {!sparkleFailed ? (
          <img
            src={assets.profileSparkle}
            alt=""
            className="size-5"
            onError={() => setSparkleFailed(true)}
          />
        ) : (
          <span className="text-sm" aria-hidden>
            ✨
          </span>
        )}
      </div>
    </div>
  );
}
