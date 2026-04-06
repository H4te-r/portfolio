import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiMail } from "react-icons/hi";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 px-6 py-10">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-5 sm:flex-row sm:justify-between">
        <p className="text-sm text-slate-600">
          &copy; {new Date().getFullYear()} Jess Patrick R. Paguel. Built with Next.js &amp; shipped from the Philippines.
        </p>
        <div className="flex gap-5">
          <a
            href="https://github.com/H4te-r"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 transition-colors hover:text-cyan-400"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://www.linkedin.com/in/jess-patrick-paguel-7ab067357"
            target="_blank"
            rel="noopener noreferrer"
            className="text-slate-600 transition-colors hover:text-cyan-400"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="mailto:jess102904@gmail.com"
            className="text-slate-600 transition-colors hover:text-cyan-400"
            aria-label="Email"
          >
            <HiMail size={20} />
          </a>
        </div>
      </div>
    </footer>
  );
}
