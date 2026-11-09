const Footer = () => {
  return (
    // Footer er background dark navy, text white.
    <footer className="mt-auto bg-ink py-8 text-white">
      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 px-4 text-center sm:flex-row sm:px-6 sm:text-left lg:px-8">
        <p className="text-sm font-semibold">
          Change <span className="text-brand">Nest</span>
        </p>
        <p className="text-xs text-white/60">
          Together We Grow · Connecting volunteers, organizers, and communities.
        </p>
      </div>
    </footer>
  );
};

export default Footer;