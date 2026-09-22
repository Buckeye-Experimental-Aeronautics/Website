import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod/v4";
import { zodResolver } from "@hookform/resolvers/zod";
import { motion } from "framer-motion";
import { CheckCircle, CaretDown } from "@phosphor-icons/react";
import { CONTACT_EMAIL, JOIN_FORM } from "@/lib/constants";

// These strings must match the Google Form's choices EXACTLY. Google silently
// drops any value it does not recognize, and the opaque no-cors response means
// the site cannot detect it. Verify against the form before changing either.
const TEAM_OPTIONS = [
  "Propulsion",
  "Aerothermal",
  "Structures",
  "Controls",
  "Avionics",
  "Flight Test",
  "Business",
  "Undecided",
] as const;

const YEAR_OPTIONS = [
  "Freshman",
  "Sophomore",
  "Junior",
  "Senior",
  "Graduate Student",
] as const;

const formSchema = z.object({
  fullName: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  year: z.enum(YEAR_OPTIONS, { message: "Please select your year" }),
  major: z.string().min(2, "Please enter your major"),
  teams: z
    .array(z.string())
    .min(1, "Please select at least one team"),
  whyBexa: z
    .string()
    .min(10, "Please tell us a bit more (at least 10 characters)"),
});

type FormData = z.infer<typeof formSchema>;

export default function JoinForm() {
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      year: undefined,
      major: "",
      teams: [],
      whyBexa: "",
    },
  });

  const selectedTeams = watch("teams") || [];

  const toggleTeam = (team: string) => {
    const current = selectedTeams;
    if (current.includes(team)) {
      setValue(
        "teams",
        current.filter((t) => t !== team),
        { shouldValidate: true }
      );
    } else {
      setValue("teams", [...current, team], { shouldValidate: true });
    }
  };

  const onSubmit = async (data: FormData) => {
    setSending(true);

    const body = new URLSearchParams();
    body.append(JOIN_FORM.fields.fullName, data.fullName);
    body.append(JOIN_FORM.fields.email, data.email);
    body.append(JOIN_FORM.fields.year, data.year);
    body.append(JOIN_FORM.fields.major, data.major);
    // Checkbox questions take one repeated key per selected choice
    data.teams.forEach((team) => body.append(JOIN_FORM.fields.teams, team));
    body.append(JOIN_FORM.fields.whyBexa, data.whyBexa);

    try {
      // Google Forms sends no CORS headers, so the response is opaque and we
      // cannot read its status. The success screen offers an email fallback
      // for the rare case this silently fails.
      await fetch(JOIN_FORM.action, {
        method: "POST",
        mode: "no-cors",
        body,
      });
    } catch {
      // Network-level failure only; the fallback below still gives them a path.
    }

    setSending(false);
    setSubmitted(true);
  };

  return (
    <section className="py-16 md:py-24">
      <div className="max-w-xl mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="p-6 md:p-8 surface"
        >
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              role="status"
              aria-live="polite"
              className="text-center py-8"
            >
              <CheckCircle
                size={48}
                weight="duotone"
                className="text-success mx-auto mb-4"
              />
              <h3 className="font-heading text-xl font-semibold text-text mb-2">
                Thanks for your interest!
              </h3>
              <p className="text-sm text-muted">
                Your response has been recorded. We'll be in touch.
              </p>
              <p className="text-xs text-muted/80 mt-4">
                Didn't hear back? Reach us directly at{" "}
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="text-text/80 underline underline-offset-2 hover:text-primary transition-colors"
                >
                  {CONTACT_EMAIL}
                </a>
              </p>
            </motion.div>
          ) : (
            <>
              <h3 className="font-heading text-xl font-semibold text-text mb-6 text-center">
                Interest Form
              </h3>

              <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-5"
                noValidate
              >
                {/* Full Name */}
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">
                    Full Name <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("fullName")}
                    className="w-full h-11 px-3 rounded-md bg-bg border border-border text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-colors"
                    placeholder="Your full name"
                  />
                  {errors.fullName && (
                    <p role="alert" className="text-xs text-primary mt-1">
                      {errors.fullName.message}
                    </p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">
                    Email <span className="text-primary">*</span>
                  </label>
                  <input
                    type="email"
                    {...register("email")}
                    className="w-full h-11 px-3 rounded-md bg-bg border border-border text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-colors"
                    placeholder="you@example.com"
                  />
                  {errors.email && (
                    <p role="alert" className="text-xs text-primary mt-1">
                      {errors.email.message}
                    </p>
                  )}
                </div>

                {/* Year */}
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">
                    Year <span className="text-primary">*</span>
                  </label>
                  <div className="relative">
                    <select
                      {...register("year")}
                      className="w-full h-11 pl-3 pr-9 rounded-md bg-bg border border-border text-sm text-text focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-colors appearance-none cursor-pointer"
                    >
                      <option value="">Select your year</option>
                      {YEAR_OPTIONS.map((y) => (
                        <option key={y} value={y}>
                          {y}
                        </option>
                      ))}
                    </select>
                    <CaretDown
                      size={16}
                      weight="bold"
                      aria-hidden="true"
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-muted pointer-events-none"
                    />
                  </div>
                  {errors.year && (
                    <p role="alert" className="text-xs text-primary mt-1">
                      {errors.year.message}
                    </p>
                  )}
                </div>

                {/* Major */}
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">
                    Major <span className="text-primary">*</span>
                  </label>
                  <input
                    type="text"
                    {...register("major")}
                    className="w-full h-11 px-3 rounded-md bg-bg border border-border text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-colors"
                    placeholder="e.g. Aerospace Engineering"
                  />
                  {errors.major && (
                    <p role="alert" className="text-xs text-primary mt-1">
                      {errors.major.message}
                    </p>
                  )}
                </div>

                {/* Sub-team Preference */}
                <div>
                  <label className="block text-sm font-medium text-text mb-2">
                    Sub-team Preference{" "}
                    <span className="text-primary">*</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {TEAM_OPTIONS.map((team) => (
                      <label
                        key={team}
                        className={`flex items-center gap-2 min-h-11 px-3 py-2 rounded-md text-xs cursor-pointer transition-all border ${
                          selectedTeams.includes(team)
                            ? "bg-primary/10 border-primary/30 text-text"
                            : "bg-bg border-border text-muted hover:border-muted/50 hover:text-text/80"
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={selectedTeams.includes(team)}
                          onChange={() => toggleTeam(team)}
                          className="sr-only"
                        />
                        <div
                          className={`w-3.5 h-3.5 rounded-sm border shrink-0 flex items-center justify-center ${
                            selectedTeams.includes(team)
                              ? "bg-primary border-primary"
                              : "border-border"
                          }`}
                        >
                          {selectedTeams.includes(team) && (
                            <svg
                              viewBox="0 0 12 12"
                              fill="none"
                              className="w-2.5 h-2.5"
                            >
                              <path
                                d="M2 6l3 3 5-5"
                                stroke="white"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          )}
                        </div>
                        {team}
                      </label>
                    ))}
                  </div>
                  {errors.teams && (
                    <p role="alert" className="text-xs text-primary mt-1">
                      {errors.teams.message}
                    </p>
                  )}
                </div>

                {/* Why BExA */}
                <div>
                  <label className="block text-sm font-medium text-text mb-1.5">
                    Why BExA? <span className="text-primary">*</span>
                  </label>
                  <textarea
                    {...register("whyBexa")}
                    rows={3}
                    className="w-full px-3 py-2 rounded-md bg-bg border border-border text-sm text-text placeholder:text-muted/50 focus:outline-none focus:border-primary/50 focus:ring-1 focus:ring-primary/25 transition-colors resize-none"
                    placeholder="Tell us briefly why you're interested in joining BExA."
                  />
                  {errors.whyBexa && (
                    <p role="alert" className="text-xs text-primary mt-1">
                      {errors.whyBexa.message}
                    </p>
                  )}
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  disabled={sending}
                  className="w-full h-11 rounded-md bg-primary text-white text-sm font-medium transition-all hover:bg-primary/90 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {sending ? "Sending..." : "Submit Interest Form"}
                </button>
              </form>
            </>
          )}
        </motion.div>
      </div>
    </section>
  );
}
