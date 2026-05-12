import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { ArrowRight, Check, ChevronDown, AlertCircle } from "lucide-react";

const ContactForm: React.FC = () => {
  const formRef = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState("idle");

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "Custom Web Development",
    message: "",
    consent: false,
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >,
  ) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;

    let stateKey = name;
    if (name === "user-name") stateKey = "name";
    if (name === "user-email") stateKey = "email";
    if (name === "data-processing") stateKey = "consent";

    setFormData((prev) => ({
      ...prev,
      [stateKey]: type === "checkbox" ? checked : value,
    }));

    if (errors[stateKey]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[stateKey];
        return newErrors;
      });
    }
  };

  const validateForm = (data: typeof formData) => {
    const newErrors: { [key: string]: string } = {};

    if (data.name.trim().split(/\s+/).length < 2) {
      newErrors.name = "Please enter your first and last name";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!data.email.trim()) {
      newErrors.email = "Email is required";
    } else if (!emailRegex.test(data.email)) {
      newErrors.email = "Please enter a valid email address";
    }

    if (data.message.trim().length < 150) {
      newErrors.message = `Message must be at least 150 characters.`;
    }

    if (!data.consent) {
      newErrors.consent = "You must agree to the privacy policy";
    }

    return newErrors;
  };

  const sendEmail = (e: React.FormEvent) => {
    e.preventDefault();

    const honeypot = (e.target as any).address_confirm?.value;
    if (honeypot) {
      setStatus("success");
      setTimeout(() => setStatus("idle"), 3000);
      return;
    }

    setStatus("submitting");
    setErrors({});

    if (formRef.current) {
      const dateInput = formRef.current.querySelector(
        'input[name="date"]',
      ) as HTMLInputElement;
      const timeInput = formRef.current.querySelector(
        'input[name="time"]',
      ) as HTMLInputElement;
      if (dateInput) dateInput.value = new Date().toLocaleDateString();
      if (timeInput)
        timeInput.value = new Date().toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
        });
    }

    const formErrors = validateForm(formData);
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      setStatus("idle");
      return;
    }

    if (formRef.current) {
      emailjs
        .sendForm(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          formRef.current,
          import.meta.env.VITE_EMAILJS_PUBLIC_KEY,
        )
        .then(
          (result) => {
            console.log(result.text);
            setStatus("success");
            setFormData({
              name: "",
              email: "",
              subject: "Custom Web Development",
              message: "",
              consent: false,
            });
            setTimeout(() => setStatus("idle"), 3000);
          },
          (error) => {
            console.log(error.text);
            alert("Failed to send message. Please try again.");
            setStatus("error");
          },
        );
    }
  };

  return (
    // Changed outer div to <section> for semantic document outlining
    <section
      aria-labelledby="form-title"
      className="w-full bg-oat-cream border-2 border-rich-black rounded-[1rem] p-8 md:p-10 shadow-[12px_12px_0px_#050505] transition-all duration-300 hover:-translate-y-1 hover:shadow-[16px_16px_0px_#050505]"
    >
      {/* Changed h3 to h2 to maintain strict heading hierarchy */}
      <h2
        id="form-title"
        className="text-2xl font-anton font-normal text-rich-black mb-8"
      >
        Tell Me About Your Idea
      </h2>

      <form
        ref={formRef}
        onSubmit={sendEmail}
        className="flex flex-col gap-6"
        noValidate
        // Removed aria-live="polite" from the form tag to prevent screen readers from reading every single keystroke
      >
        <input type="hidden" name="date" defaultValue="" />
        <input type="hidden" name="time" defaultValue="" />

        <div
          style={{
            display: "none",
            opacity: 0,
            position: "absolute",
            left: "-9999px",
          }}
          aria-hidden="true"
        >
          <input
            type="text"
            name="address_confirm"
            tabIndex={-1}
            autoComplete="off"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="flex flex-col gap-2">
            <label
              htmlFor="user-name"
              className="font-fraunces text-base uppercase tracking-wider text-rich-black/70 font-bold"
            >
              Name
            </label>
            <input
              type="text"
              id="user-name"
              name="user-name"
              value={formData.name}
              onChange={handleChange}
              autoComplete="name"
              aria-required="true"
              aria-invalid={!!errors.name}
              aria-describedby={errors.name ? "name-error" : undefined}
              className={`w-full border rounded-2xl p-4 text-rich-black font-sans focus:outline-none transition-colors 
                ${errors.name ? "border-red-400 bg-red-50 focus:border-red-500" : "bg-rich-black/5 border-rich-black/10 focus:border-cornflower"}`}
              placeholder="John Doe"
            />
            {errors.name && (
              <div
                id="name-error"
                aria-live="polite"
                className="flex items-center gap-1 mt-2 text-red-500 text-sm font-poppins"
              >
                <AlertCircle aria-hidden="true" className="w-4 h-4" />{" "}
                {errors.name}
              </div>
            )}
          </div>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="user-email"
              className="font-fraunces text-base uppercase tracking-wider text-rich-black/70 font-bold"
            >
              Email
            </label>
            <input
              type="email"
              id="user-email"
              name="user-email"
              value={formData.email}
              onChange={handleChange}
              autoComplete="email"
              aria-required="true"
              aria-invalid={!!errors.email}
              aria-describedby={errors.email ? "email-error" : undefined}
              className={`w-full border rounded-2xl p-4 text-rich-black font-sans focus:outline-none transition-colors 
                ${errors.email ? "border-red-400 bg-red-50 focus:border-red-500" : "bg-rich-black/5 border-rich-black/10 focus:border-cornflower"}`}
              placeholder="john@example.com"
            />
            {errors.email && (
              <div
                id="email-error"
                aria-live="polite"
                className="flex items-center gap-1 mt-2 text-red-500 text-sm font-poppins"
              >
                <AlertCircle aria-hidden="true" className="w-4 h-4" />{" "}
                {errors.email}
              </div>
            )}
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="subject"
            className="font-fraunces text-base uppercase tracking-wider text-rich-black/70 font-bold"
          >
            Subject
          </label>
          <div className="relative">
            <select
              id="subject"
              name="subject"
              value={formData.subject}
              onChange={handleChange}
              aria-required="true"
              className={`w-full border rounded-2xl p-4 text-rich-black font-poppins focus:outline-none transition-colors appearance-none cursor-pointer bg-rich-black/5 border-rich-black/10 focus:border-cornflower`}
            >
              <option value="Custom Web Development">
                Custom Web Development
              </option>
              <option value="UI/UX Design & Prototyping">
                UI/UX Design & Prototyping
              </option>
              <option value="AI Implementation & Automation">
                AI Implementation & Automation
              </option>
              <option value="Something Else">Something Else</option>
            </select>
            <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-rich-black/50">
              <ChevronDown aria-hidden="true" className="w-5 h-5" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          <label
            htmlFor="message"
            className="font-fraunces text-base uppercase tracking-wider text-rich-black/70 font-bold"
          >
            Message
          </label>
          <textarea
            id="message"
            name="message"
            value={formData.message}
            onChange={handleChange}
            aria-required="true"
            aria-invalid={!!errors.message}
            aria-describedby={
              errors.message ? "message-error message-hint" : "message-hint"
            }
            className={`w-full border rounded-2xl p-4 text-rich-black font-sans focus:outline-none transition-colors resize-none min-h-[150px] 
              ${errors.message ? "border-red-400 bg-red-50 focus:border-red-500" : "bg-rich-black/5 border-rich-black/10 focus:border-cornflower"}`}
            placeholder="Tell me about your project..."
          />
          <div className="flex justify-between items-start mt-1">
            {errors.message ? (
              <div
                id="message-error"
                aria-live="polite"
                className="flex items-center gap-1 text-red-500 text-sm font-poppins"
              >
                <AlertCircle aria-hidden="true" className="w-4 h-4" />{" "}
                {errors.message}
              </div>
            ) : (
              <div aria-hidden="true"></div>
            )}
            <span
              id="message-hint"
              className="text-base text-rich-black/80 font-sans"
            >
              {formData.message.length}/150 min characters
            </span>
          </div>
        </div>

        <div className="flex flex-col gap-2">
          {/* Added 'relative' here so the invisible label can cover the whole row */}
          <div className="flex items-center gap-3 group w-fit select-none relative">
            {/* 1. THE SINGLE LABEL (Invisible, covers the entire row) */}
            <label
              htmlFor="data-processing"
              className="absolute inset-0 cursor-pointer z-10"
            >
              <span className="sr-only">
                I agree to the Privacy Policy and data processing
              </span>
            </label>

            <div className="relative flex items-center justify-center shrink-0">
              <input
                type="checkbox"
                id="data-processing"
                name="data-processing"
                checked={formData.consent}
                onChange={handleChange}
                aria-required="true"
                aria-invalid={!!errors.consent}
                // describedby links the visual text below so screen readers read it out
                aria-describedby={
                  errors.consent ? "consent-error consent-text" : "consent-text"
                }
                className="peer sr-only"
              />

              <div
                aria-hidden="true"
                className={`w-5 h-5 rounded flex items-center justify-center border transition-all duration-300 shrink-0 peer-focus-visible:ring-2 peer-focus-visible:ring-cornflower peer-focus-visible:ring-offset-2 peer-focus-visible:ring-offset-oat-cream
        ${
          errors.consent
            ? "bg-red-50 border-red-400"
            : formData.consent
              ? "bg-cornflower border-cornflower"
              : "bg-rich-black/5 border-rich-black/20 group-hover:border-cornflower/50"
        }`}
              >
                {formData.consent && (
                  <Check
                    aria-hidden="true"
                    className="w-3.5 h-3.5 text-oat-cream"
                  />
                )}
              </div>
            </div>

            {/* 2. THE VISUAL TEXT (No label tags here anymore!) */}
            <span
              id="consent-text"
              className={`text-base font-sans transition-colors relative z-0 ${errors.consent ? "text-red-500" : "text-rich-black/80"}`}
            >
              I agree to the{" "}
              <a
                href="#"
                // relative and z-20 puts this link ABOVE the invisible label
                className="text-cornflower hover:underline outline-none focus-visible:ring-2 focus-visible:ring-cornflower font-bold rounded-sm relative z-20"
                onClick={(e) => e.stopPropagation()}
              >
                Privacy Policy
              </a>{" "}
              and data processing.
            </span>
          </div>

          {errors.consent && (
            <div
              id="consent-error"
              aria-live="polite"
              className="flex items-center gap-1 mt-1 text-red-500 text-sm font-poppins ml-8"
            >
              <AlertCircle aria-hidden="true" className="w-4 h-4" />{" "}
              {errors.consent}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={status === "submitting"}
          aria-busy={status === "submitting"}
          className={`bg-cornflower text-oat-cream  px-8 py-4 rounded-xl font-poppins font-bold flex  items-center gap-2 hover:cornflower/50 transition-colors w-fit mt-2 disabled:opacity-70 disabled:cursor-not-allowed outline-none focus-visible:ring-2 focus-visible:ring-rich-black focus-visible:ring-offset-2 focus-visible:ring-offset-oat-cream`}
        >
          {status === "submitting"
            ? "SENDING..."
            : status === "success"
              ? "SENT!"
              : "SEND MESSAGE"}
          {status === "success" ? (
            <Check aria-hidden="true" className="w-5 h-5" />
          ) : (
            <ArrowRight aria-hidden="true" className="w-5 h-5" />
          )}
        </button>

        {/* Screen Reader Only: Dedicated Status Announcer */}
        <div aria-live="polite" className="sr-only" aria-atomic="true">
          {status === "submitting" && "Sending your message..."}
          {status === "success" && "Your message has been sent successfully!"}
          {status === "error" &&
            "There was an error sending your message. Please try again."}
        </div>
      </form>
    </section>
  );
};

export default ContactForm;
