import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowLeft, ArrowUpRight, Shield, FileText, CheckCircle2 } from "lucide-react";

export default function TermsOfService() {
  const sections = [
    {
      id: "acceptance",
      title: "1. Acceptance of Terms",
      content: (
        <>
          <p className="mb-4">
            By accessing and using BelyxHost ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. In addition, when using these particular services, you shall be subject to any posted guidelines or rules applicable to such services.
          </p>
          <p>
            Any participation in this service will constitute acceptance of this agreement. If you do not agree to abide by the above, please do not use this service.
          </p>
        </>
      )
    },
    {
      id: "privacy",
      title: "2. Privacy Policy",
      content: (
        <p>
          Its use and protection of your personal information is governed by the <Link to="/privacy" className="text-teal-400 hover:underline inline-flex items-center gap-1">Privacy Policy <ArrowUpRight className="w-3 h-3" /></Link>. We encourage you to review it carefully as it explains how we collect and use your data.
        </p>
      )
    },
    {
      id: "accounts",
      title: "3. User Accounts",
      content: (
        <>
          <p className="mb-4">
            You must register for an account to access certain features. You agree to:
          </p>
          <ul className="space-y-2 ml-2">
            {[
              "Provide accurate, current, and complete information",
              "Maintain and update your information",
              "Maintain the security of your password",
              "Accept all risks of unauthorized access to your account"
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <CheckCircle2 className="w-4 h-4 text-teal-500 mt-1 shrink-0" />
                <span className="text-white/80">{item}</span>
              </li>
            ))}
          </ul>
        </>
      )
    },
    {
      id: "conduct",
      title: "4. User Conduct",
      content: (
        <>
          <p className="mb-4">
            You agree not to use the Service for any unlawful purpose or in any way that interrupts, damages, or impairs the service. Prohibited activities include but are not limited to:
          </p>
          <div className="grid sm:grid-cols-2 gap-3">
            {[
              "Sending spam or unsolicited messages",
              "Harassing or threatening other users",
              "Distributing malware or viruses",
              "Attempting to gain unauthorized access",
              "Engaging in DDOS attacks",
              "Hosting illegal content"
            ].map((item, i) => (
              <div key={i} className="bg-white/5 border border-white/5 rounded-lg p-3 text-sm text-white/70">
                {item}
              </div>
            ))}
          </div>
        </>
      )
    },
    {
      id: "termination",
      title: "5. Termination",
      content: (
        <p>
          We may terminate or suspend access to our Service immediately, without prior notice or liability, for any reason whatsoever, including without limitation if you breach the Terms. All provisions of the Terms which by their nature should survive termination shall survive termination, including, without limitation, ownership provisions, warranty disclaimers, indemnity and limitations of liability.
        </p>
      )
    },
    {
      id: "refunds",
      title: "6. Refund Policy",
      content: (
        <p>
          We offer a 48-hour money-back guarantee for initial orders of our shared hosting plans. Dedicated servers and VPS plans are non-refundable once deployed. Refunds are processed within 5-7 business days to the original payment method.
        </p>
      )
    },
    {
      id: "changes",
      title: "7. Changes to Terms",
      content: (
        <p>
          BelyxHost reserves the right to update or change these Terms at any time. Your continued use of the Service after we post any modifications to the Terms on this page will constitute your acknowledgment of the modifications and your consent to abide and be bound by the modified Terms.
        </p>
      )
    }
  ];

  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="grid lg:grid-cols-[300px_1fr] gap-12"
        >
          {/* Sidebar Navigation */}
          <div className="hidden lg:block">
            <div className="sticky top-32 space-y-8">
              <div>
                <Link 
                  to="/" 
                  className="inline-flex items-center gap-2 text-white/40 hover:text-teal-400 transition-colors mb-6 text-sm font-medium group"
                >
                  <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                  Back to Home
                </Link>
                <h3 className="text-white font-bold mb-4 flex items-center gap-2">
                  <FileText className="w-4 h-4 text-teal-500" />
                  On this page
                </h3>
                <nav className="space-y-1 border-l border-white/10">
                  {sections.map((section) => (
                    <a
                      key={section.id}
                      href={`#${section.id}`}
                      className="block pl-4 py-2 text-sm text-white/50 hover:text-white hover:border-l-2 hover:border-teal-500 border-l-2 border-transparent transition-all -ml-[2px]"
                    >
                      {section.title.split('. ')[1]}
                    </a>
                  ))}
                </nav>
              </div>

              <div className="bg-[#111111] rounded-2xl p-6 border border-white/5">
                <Shield className="w-8 h-8 text-teal-500 mb-3" />
                <h4 className="font-bold text-white mb-2">Need help?</h4>
                <p className="text-sm text-white/60 mb-4">
                  If you have questions about our terms, please contact our support team.
                </p>
                <a href="mailto:support@belyxhost.com" className="text-sm text-teal-400 hover:underline">
                  Contact Support
                </a>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="space-y-12">
            {/* Mobile Back Link */}
            <div className="lg:hidden">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-white/40 hover:text-teal-400 transition-colors text-sm font-medium group"
              >
                <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                Back to Home
              </Link>
            </div>

            <div className="border-b border-white/10 pb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
                Terms of Service
              </h1>
              <div className="flex items-center gap-3 text-white/40 text-sm">
                <span>Last Updated: February 25, 2026</span>
                <span className="w-1 h-1 rounded-full bg-teal-500/50" />
                <span>BelyxHost</span>
              </div>
            </div>

            <div className="space-y-16">
              {sections.map((section) => (
                <section key={section.id} id={section.id} className="scroll-mt-32">
                  <h2 className="text-2xl font-bold text-white mb-6 flex items-center gap-3 group">
                    <span className="w-1.5 h-8 bg-teal-500 rounded-full" />
                    {section.title}
                  </h2>
                  <div className="text-white/70 leading-relaxed text-lg pl-5 border-l border-white/5 ml-[3px]">
                    {section.content}
                  </div>
                </section>
              ))}
            </div>

            <div className="pt-12 border-t border-white/10 text-center">
              <p className="text-white/40 mb-4">
                By using our services, you acknowledge that you have read and understood these Terms.
              </p>
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-teal-500/10 text-teal-400 border border-teal-500/20 text-sm font-medium">
                <CheckCircle2 className="w-4 h-4" />
                Agreed & Accepted
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
