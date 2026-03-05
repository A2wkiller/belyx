import { motion } from "motion/react";
import { Link } from "react-router";
import { ArrowLeft, Mail } from "lucide-react";

export default function PrivacyPolicy() {
  return (
    <div className="min-h-screen pt-24 pb-20 px-6">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          {/* Header */}
          <div className="mb-12">
            <Link 
              to="/" 
              className="inline-flex items-center gap-2 text-white/40 hover:text-teal-400 transition-colors mb-6 text-sm font-medium group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 tracking-tight">
              Privacy Policy
            </h1>
            <div className="flex items-center gap-3 text-white/40 text-sm">
              <span>Last Updated: February 25, 2026</span>
              <span className="w-1 h-1 rounded-full bg-teal-500/50" />
              <span>BelyxHost</span>
            </div>
          </div>

          {/* Content */}
          <div className="bg-[#111111] border border-white/5 rounded-3xl p-8 md:p-12 space-y-10 shadow-2xl">
            
            {/* Intro */}
            <div className="text-white/70 leading-relaxed">
              <p className="mb-4">
                At BelyxHost, accessible from our website, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that are collected and recorded by BelyxHost and how we use it.
              </p>
            </div>

            {/* Section 1 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 text-sm font-mono border border-teal-500/20">01</span>
                Information We Collect
              </h2>
              <div className="pl-11 space-y-4 text-white/70 leading-relaxed">
                <p>
                  We collect several different types of information for various purposes to provide and improve our service to you.
                </p>
                
                <div className="bg-white/5 rounded-xl p-6 border border-white/5">
                  <h3 className="text-white font-medium mb-3">Personal Data</h3>
                  <p className="mb-4 text-sm">
                    While using our Service, we may ask you to provide us with certain personally identifiable information that can be used to contact or identify you ("Personal Data"). This may include, but is not limited to:
                  </p>
                  <ul className="grid sm:grid-cols-2 gap-2 text-sm">
                    {["Email address", "First name and last name", "Phone number", "Address, State, Province, ZIP/Postal code, City", "Cookies and Usage Data"].map((item, i) => (
                      <li key={i} className="flex items-center gap-2 text-white/60">
                        <span className="w-1.5 h-1.5 rounded-full bg-teal-500/50" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </section>

            {/* Section 2 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 text-sm font-mono border border-teal-500/20">02</span>
                How We Use Your Information
              </h2>
              <div className="pl-11 space-y-4 text-white/70 leading-relaxed">
                <p>We use the collected data for various purposes:</p>
                <ul className="space-y-2">
                  {[
                    "To provide and maintain the Service",
                    "To notify you about changes to our Service",
                    "To allow you to participate in interactive features of our Service when you choose to do so",
                    "To provide customer care and support",
                    "To provide analysis or valuable information so that we can improve the Service",
                    "To monitor the usage of the Service",
                    "To detect, prevent and address technical issues"
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-teal-500 flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </section>

            {/* Section 3 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 text-sm font-mono border border-teal-500/20">03</span>
                Log Files
              </h2>
              <div className="pl-11 text-white/70 leading-relaxed">
                <p>
                  BelyxHost follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this as a part of hosting services' analytics. The information collected by log files includes internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
                </p>
              </div>
            </section>

            {/* Section 4 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 text-sm font-mono border border-teal-500/20">04</span>
                Cookies and Web Beacons
              </h2>
              <div className="pl-11 text-white/70 leading-relaxed">
                <p>
                  Like any other website, BelyxHost uses 'cookies.' These cookies are used to store information, including visitors' preferences and the pages on the website that the visitor accessed or visited. The information is used to optimize the users' experience by customizing our web page content based on visitors' browser type and/or other information.
                </p>
              </div>
            </section>

            {/* Section 5 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 text-sm font-mono border border-teal-500/20">05</span>
                Third Party Privacy Policies
              </h2>
              <div className="pl-11 text-white/70 leading-relaxed">
                <p>
                  BelyxHost's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective privacy policies of these third-party ad servers for more detailed information. It may include their practices and instructions about how to opt out of certain options.
                </p>
              </div>
            </section>

            {/* Section 6 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 text-sm font-mono border border-teal-500/20">06</span>
                Data Security
              </h2>
              <div className="pl-11 text-white/70 leading-relaxed">
                <p>
                  The security of your data is important to us, but remember that no method of transmission over the Internet or method of electronic storage is 100% secure. While we strive to use commercially acceptable means to protect your personal data, we cannot guarantee its absolute security.
                </p>
              </div>
            </section>

            {/* Section 7 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 text-sm font-mono border border-teal-500/20">07</span>
                Children's Information
              </h2>
              <div className="pl-11 text-white/70 leading-relaxed space-y-4">
                <p>
                  Another part of our priority is adding protection for children while using the internet. We encourage parents and guardians to observe, participate in, and/or monitor and guide their online activity.
                </p>
                <div className="bg-red-500/5 border border-red-500/20 p-4 rounded-xl text-sm">
                  <p className="text-red-200/80">
                    BelyxHost does not knowingly collect any personal identifiable information from children under the age of 13. If you think that your child provided this kind of information on our website, we strongly encourage you to contact us immediately, and we will do our best to promptly remove such information from our records.
                  </p>
                </div>
              </div>
            </section>

            {/* Section 8 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 text-sm font-mono border border-teal-500/20">08</span>
                Changes to This Privacy Policy
              </h2>
              <div className="pl-11 text-white/70 leading-relaxed">
                <p>
                  We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page. You are advised to review this Privacy Policy periodically for any changes.
                </p>
              </div>
            </section>

            {/* Section 9 */}
            <section className="space-y-4">
              <h2 className="text-2xl font-bold text-white flex items-center gap-3">
                <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-500/10 text-teal-400 text-sm font-mono border border-teal-500/20">09</span>
                Contact Us
              </h2>
              <div className="pl-11 text-white/70 leading-relaxed">
                <p className="mb-4">
                  If you have any questions about this Privacy Policy, please contact us:
                </p>
                <a 
                  href="mailto:belyxhost@gmail.com" 
                  className="inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-teal-500/10 text-teal-400 font-medium border border-teal-500/20 hover:bg-teal-500/20 transition-all group"
                >
                  <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
                  belyxhost@gmail.com
                </a>
              </div>
            </section>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
