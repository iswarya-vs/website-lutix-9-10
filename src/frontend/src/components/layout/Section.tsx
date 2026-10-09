import { cn } from "@/lib/utils";
import type { ReactNode } from "react";
import { motion } from "motion/react";

interface SectionProps {
  id: string;
  eyebrow?: string;
  title?: string;
  description?: string;
  children: ReactNode;
  className?: string;
  band?: boolean;
}

export function Section({
  id,
  eyebrow,
  title,
  description,
  children,
  className,
  band = false,
}: SectionProps) {
  return (
    <section
      id={id}
      data-ocid={`${id}.section`}
      className={cn(
        "scroll-mt-24 py-20 md:py-28 overflow-hidden",
        band && "bg-card/40",
        className,
      )}
    >
      <div className="container relative z-10">
        {(eyebrow || title || description) && (
          <motion.header
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
            className="mb-12 max-w-2xl md:mb-16"
          >
            {eyebrow && <p className="eyebrow mb-3 font-mono text-primary tracking-[0.22em] uppercase text-xs">{eyebrow}</p>}
            {title && (
              <h2 className="font-display text-3xl font-bold tracking-tight text-foreground md:text-5xl">
                {title}
              </h2>
            )}
            {description && (
              <p className="mt-4 text-base text-muted-foreground md:text-lg">
                {description}
              </p>
            )}
          </motion.header>
        )}
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.7, delay: 0.15, ease: [0.21, 0.47, 0.32, 0.98] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  );
}
