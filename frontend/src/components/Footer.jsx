import { motion } from "framer-motion";
import { fadeUp, staggerContainer } from "../utils/motion";

function Footer() {
  return (
    <footer
      id="contact"
      className="bg-primary-deep text-primary-foreground"
    >
      <motion.div
        className="mx-auto max-w-7xl px-6 py-4"
        variants={staggerContainer}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
      >
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
          <motion.div
            variants={fadeUp}
            className="flex items-center lg:border-r lg:border-primary-foreground/20 lg:pr-10"
          >
            <div className="leading-tight">
              <p className="text-sm font-bold">
                Ministry of Statistics &amp;
                <br />
                Programme Implementation
              </p>
              <p className="text-xs opacity-70">Government of India</p>
            </div>
          </motion.div>

          <motion.div variants={fadeUp}>
            <nav className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-semibold">
              {[
                "Transparency",
                "Accountability",
                "Better Infrastructure",
              ].map((item, i) => (
                <span key={item} className="flex items-center gap-6">
                  <a
                    href="#contact"
                    className="opacity-95 transition-opacity hover:opacity-100"
                  >
                    {item}
                  </a>
                  {i < 2 && <span className="opacity-30">|</span>}
                </span>
              ))}
            </nav>

            <p className="mt-3 text-xs opacity-70">
              MPLADS · Powered by AI · For a Stronger India
            </p>
          </motion.div>

          <motion.img
            variants={fadeUp}
            src="/images/india_parliament.png"
            alt=""
            width={1024}
            height={512}
            loading="lazy"
            className="hidden h-36 w-auto opacity-55 invert lg:ml-auto lg:block"
          />
        </div>
      </motion.div>

      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        className="border-t border-primary-foreground/15"
      >
        <div className="mx-auto flex max-w-7xl flex-col gap-3 px-6 py-5 text-xs opacity-80 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © 2026 Ministry of Statistics &amp; Programme Implementation,
            Government of India. All rights reserved.
          </p>

          <p className="flex gap-5">
            <a href="#contact" className="hover:opacity-100">
              Privacy Policy
            </a>
            <a href="#contact" className="hover:opacity-100">
              Terms of Use
            </a>
            <a href="#contact" className="hover:opacity-100">
              Contact
            </a>
          </p>
        </div>
      </motion.div>
    </footer>
  );
}

export default Footer;