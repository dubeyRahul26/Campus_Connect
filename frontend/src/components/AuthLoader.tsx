type AuthLoaderProps = {
  fullscreen?: boolean;
};

export default function AuthLoader({ fullscreen = false }: AuthLoaderProps) {
  return (
    <div
      className={
        fullscreen
          ? "min-h-screen flex flex-col items-center justify-center bg-white"
          : "flex flex-col items-center justify-center"
      }
    >
      {/* Logo / Brand */}
      <div className="flex items-center gap-2 mb-6">
        <img
          src="/community.png"
          alt="CampusConnect"
          className="h-10 w-10"
        />
        <span className="text-2xl font-semibold text-teal-600">
          CampusConnect
        </span>
      </div>

      {/* Spinner */}
      <div className="relative">
        <div className="h-12 w-12 rounded-full border-4 border-teal-100" />
        <div className="absolute inset-0 h-12 w-12 rounded-full border-4 border-teal-600 border-t-transparent animate-spin" />
      </div>

      {/* Text */}
      <p className="mt-6 text-sm text-gray-500 tracking-wide">
        Preparing your workspace…
      </p>
    </div>
  );
}
