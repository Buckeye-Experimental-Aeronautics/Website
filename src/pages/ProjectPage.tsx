import { useParams, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowLeft, Wrench } from "@phosphor-icons/react";
import PageHero from "@/components/sections/PageHero";
import JoinCTASection from "@/components/sections/JoinCTASection";
import { PROJECTS } from "@/lib/constants";
import { useSEO } from "@/lib/useSEO";

const viewport = { once: true, margin: "-50px" } as const;

export default function ProjectPage() {
  const { slug } = useParams<{ slug: string }>();
  const project = PROJECTS.find((p) => p.slug === slug);

  // Hooks must run before the not-found early return below
  useSEO({
    title: project
      ? `${project.name} - BExA Projects | Buckeye Experimental Aeronautics`
      : "Projects - BExA | Buckeye Experimental Aeronautics",
    description:
      project?.blurb ??
      "Explore the aircraft and test platforms BExA is designing, building, and flying.",
    path: project ? `/projects/${project.slug}` : "/projects",
  });

  if (!project) {
    return (
      <section className="py-24 md:py-32 text-center px-4">
        <h1 className="font-heading text-3xl font-bold text-text mb-4">
          Project not found
        </h1>
        <p className="text-muted mb-8">
          This project page doesn't exist yet. Check out our current work:
        </p>
        <div className="flex flex-wrap justify-center gap-3">
          {PROJECTS.map((p) => (
            <Link
              key={p.slug}
              to={`/projects/${p.slug}`}
              className="inline-flex items-center px-4 py-2 rounded-md bg-[rgba(22,22,24,0.7)] border border-white/[0.08] text-sm text-text hover:border-primary/40 transition-colors"
            >
              {p.name}
            </Link>
          ))}
        </div>
      </section>
    );
  }

  const isActive = project.status === "In Development";

  return (
    <>
      <PageHero heading={project.name} subtext={project.blurb} />

      <section className="pb-16 md:pb-24">
        <div className="max-w-3xl mx-auto px-4">
          {/* Status */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, ease: "easeOut" }}
            className="flex justify-center mb-10"
          >
            <span
              className={`inline-flex items-center gap-2 px-3 py-1 rounded-sm text-sm font-medium ${
                isActive
                  ? "bg-success/10 text-success border border-success/20"
                  : "bg-neutral/10 text-neutral border border-neutral/20"
              }`}
            >
              <span
                aria-hidden="true"
                className={`w-1.5 h-1.5 rounded-full ${
                  isActive ? "bg-success" : "bg-neutral"
                }`}
              />
              {project.status}
            </span>
          </motion.div>

          {/* Project write-up, or a generic notice until one exists */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, delay: 0.1, ease: "easeOut" }}
            className="p-8 rounded-lg bg-[rgba(22,22,24,0.7)] border border-white/[0.06] backdrop-blur-[12px] glass-blur mb-8"
          >
            {project.description ? (
              <>
                <h2 className="font-heading text-xl font-semibold text-text mb-3">
                  The Mission
                </h2>
                <p className="text-sm text-muted leading-relaxed">
                  {project.description}
                </p>
              </>
            ) : (
              <div className="text-center">
                <Wrench
                  size={40}
                  weight="duotone"
                  className="text-primary mx-auto mb-4"
                />
                <h2 className="font-heading text-xl font-semibold text-text mb-3">
                  Documentation in progress
                </h2>
                <p className="text-sm text-muted leading-relaxed max-w-md mx-auto">
                  Design notes, build photos, and test data will be published
                  here as this project develops. Check back as the team makes
                  progress.
                </p>
              </div>
            )}
          </motion.div>

          {/* Featured photo when one exists */}
          {project.image && (
            <motion.figure
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={viewport}
              transition={{ duration: 0.5, delay: 0.15, ease: "easeOut" }}
              className="mb-8"
            >
              <img
                src={project.image}
                alt={project.imageAlt ?? project.name}
                loading="lazy"
                decoding="async"
                className="w-full rounded-lg border border-white/[0.06] object-cover"
              />
            </motion.figure>
          )}

          {/* Supporting photos, or placeholder slots until there are any */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={viewport}
            transition={{ duration: 0.5, delay: 0.2, ease: "easeOut" }}
            className={`grid gap-4 mb-12 ${
              project.gallery?.length
                ? "grid-cols-1 sm:grid-cols-2"
                : project.image
                  ? "grid-cols-2"
                  : "grid-cols-2 sm:grid-cols-3"
            }`}
          >
            {project.gallery?.length
              ? project.gallery.map((photo) => (
                  <figure key={photo.src} className="m-0">
                    <img
                      src={photo.src}
                      alt={photo.alt}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-64 sm:h-72 object-cover rounded-lg border border-white/[0.06]"
                    />
                  </figure>
                ))
              : (project.image ? [0, 1] : [0, 1, 2]).map((i) => (
                  <div
                    key={i}
                    className="aspect-video rounded-lg bg-border/30 border border-border/50 flex items-center justify-center"
                  >
                    <span className="text-xs text-muted">
                      {project.image ? "[More photos TBD]" : "[Photo TBD]"}
                    </span>
                  </div>
                ))}
          </motion.div>

          <div className="text-center">
            <Link
              to="/efforts"
              className="inline-flex items-center gap-2 py-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
            >
              <ArrowLeft size={16} weight="bold" />
              See the full prototype roadmap
            </Link>
          </div>
        </div>
      </section>

      <JoinCTASection />
    </>
  );
}
