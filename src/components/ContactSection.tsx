import { motion } from "framer-motion";
import { useState } from "react";
import {
  Mail,
  MapPin,
  Send,
  Github,
  Linkedin,
  Twitter,
  Phone,
} from "lucide-react";
import SectionTitle from "./SectionTitle";

const ContactSection = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const form = e.currentTarget;
    const formData = new FormData(form);

    // FormSubmit config
    formData.append("_captcha", "false");
    formData.append("_subject", "New Contact Form Message");
    formData.append("_template", "table");

    try {
      const response = await fetch(
        "https://formsubmit.co/ajax/ab2663f4fc57b89b79521c584f70f45a",
        {
          method: "POST",
          body: formData,
          headers: {
            Accept: "application/json",
          },
        }
      );

      if (response.ok) {
        setIsSubmitted(true);
        form.reset();
      } else {
        alert("Something went wrong. Please try again.");
      }
    } catch (error) {
      alert("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const contactInfo = [
    {
      icon: Mail,
      label: "Email",
      value: "sangamkharel222@gmail.com",
      href: "mailto:sangamkharel222@gmail.com",
    },
    {
      icon: Phone,
      label: "Phone",
      value: "+977 9829196150",
      href: "tel:+9779829196150",
    },
    { icon: MapPin, label: "Location", value: "Nepal" },
  ];

  const socialLinks = [
    { icon: Github, label: "GitHub", href: "https://github.com/sangam-kharel" },
    {
      icon: Linkedin,
      label: "LinkedIn",
      href: "https://www.linkedin.com/in/sangam-kharel-348684375/",
    },
    { icon: Twitter, label: "Twitter", href: "https://x.com/sangamkharel2" },
  ];

  return (
    <section id="contact" className="py-24 relative">
      <div className="container mx-auto px-6">
        <SectionTitle
          title="Get In Touch"
          subtitle="Have a project in mind or just want to say hi? Let's connect!"
        />

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            {/* Contact Info */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="space-y-8"
            >
              <div>
                <h3 className="text-xl font-semibold">
                  Let's Build Something Amazing
                </h3>
                <p className="text-muted-foreground mt-2">
                  I'm always open to discussing new projects or creative ideas.
                </p>
              </div>

              <div className="space-y-4">
                {contactInfo.map((item) => (
                  <div key={item.label} className="flex items-center gap-4">
                    <div className="p-3 rounded-lg glass-card">
                      <item.icon className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {item.label}
                      </p>
                      {item.href ? (
                        <a
                          href={item.href}
                          className="font-medium hover:underline"
                        >
                          {item.value}
                        </a>
                      ) : (
                        <p className="font-medium">{item.value}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              <div>
                <p className="text-sm text-muted-foreground mb-4">Find me on</p>
                <div className="flex gap-4">
                  {socialLinks.map((social) => (
                    <a
                      key={social.label}
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 rounded-lg glass-card hover:text-primary transition"
                    >
                      <social.icon className="w-5 h-5" />
                    </a>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {!isSubmitted ? (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Name
                    </label>
                    <input
                      name="name"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-muted border"
                      placeholder="Your name"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Email
                    </label>
                    <input
                      type="email"
                      name="email"
                      required
                      className="w-full px-4 py-3 rounded-lg bg-muted border"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <label className="block mb-2 text-sm font-medium">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={4}
                      required
                      className="w-full px-4 py-3 rounded-lg bg-muted border resize-none"
                      placeholder="Tell me about your project..."
                    />
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full px-8 py-4 rounded-lg bg-primary text-primary-foreground flex items-center justify-center gap-2 font-semibold"
                  >
                    <Send className="w-4 h-4" />
                    {loading ? "Sending..." : "Send Message"}
                  </motion.button>
                </form>
              ) : (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-12 space-y-6"
                >
                  <p className="text-lg font-semibold">
                    Thanks for reaching out! I'll get back to you soon.
                  </p>
                  <button
                    onClick={() => setIsSubmitted(false)}
                    className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-semibold"
                  >
                    Send another message
                  </button>
                </motion.div>
              )}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
