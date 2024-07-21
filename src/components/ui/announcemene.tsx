export const Announcement = () => {
  return (
    <a
      className="group block bg-gray-100 hover:bg-gray-200 p-4 absolute right-0 left-0 rounded-lg text-center transition-all duration-300 dark:bg-secondary !rounded-t-none dark:hover:bg-white/10"
      href="https://github.com/postiva/next-starter-blog"
      target="_blank"
      rel="noopener noreferrer"
    >
      <div className="max-w-[85rem] px-4 sm:px-6 lg:px-8 mx-auto">
        <p className="me-2 inline-block text-sm text-gray-800 dark:text-neutral-200">
          This is a Next.js blog example built with{" "}
          <span className="font-bold">Postiva</span>.
        </p>
        <span className="group-hover:underline decoration-2 inline-flex justify-center items-center gap-x-2 font-semibold text-blue-600 text-sm dark:text-blue-500">
          Star us on GitHub
          <svg
            className="flex-shrink-0 size-4"
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 18 6-6-6-6" />
          </svg>
        </span>
      </div>
    </a>
  );
};
