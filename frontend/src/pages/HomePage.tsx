import { Link } from "react-router-dom";
import { useAppSelector } from "../store/hooks";

const HomePage = () => {
  const { isAuthenticated, user } = useAppSelector(
    (state) => state.auth
  );

  const dashboardPath =
    user?.role === "admin"
      ? "/admin/dashboard"
      : "/dashboard";

  return (
    <div className="font-sans text-gray-800 bg-gray-50">
      {/* HERO SECTION */}
      <section className="bg-teal-100 text-teal-900 py-20 px-6 text-center">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Gateway to Your Dream Job & Interview Success
        </h1>

        <p className="text-lg md:text-xl mb-8 max-w-2xl mx-auto">
          Browse job opportunities, apply with ease, and prepare for interviews
          with questions curated by peers and experts.
        </p>

        <div className="flex justify-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/signup"
                className="bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-teal-700 transition"
              >
                Sign Up
              </Link>

              <Link
                to="/login"
                className="bg-white border border-teal-600 text-teal-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-teal-600 hover:text-white transition"
              >
                Login
              </Link>
            </>
          ) : (
            <Link
              to={dashboardPath}
              className="bg-teal-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-teal-700 transition"
            >
              Go to Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* FEATURES SECTION */}
      <section className="py-20 px-6">
        <h2 className="text-3xl font-bold text-center mb-12 text-teal-900">
          Features
        </h2>

        <div className="grid md:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {[
            {
              icon: "💼",
              title: "Explore Job Openings",
              desc: "Browse thousands of job listings posted by companies and fellow users.",
            },
            {
              icon: "📄",
              title: "Apply with Ease",
              desc: "Apply to jobs directly and keep track of all your applications in one place.",
            },
            {
              icon: "📝",
              title: "Interview Preparation",
              desc: "Access categorized interview questions for different roles and difficulty levels.",
            },
            {
              icon: "🤝",
              title: "Community-Powered",
              desc: "Study questions added by peers and contribute your own to help others.",
            },
          ].map((feature, idx) => (
            <div
              key={idx}
              className="bg-white p-6 rounded-2xl shadow-md hover:shadow-xl transition text-center"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="font-semibold text-xl mb-2 text-teal-800">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-20 px-6 bg-teal-50">
        <h2 className="text-3xl font-bold text-center mb-12 text-teal-900">
          How It Works
        </h2>

        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto text-center">
          {[
            {
              icon: "👤",
              title: "Sign Up & Login",
              desc: "Create your account to start applying and tracking your progress.",
            },
            {
              icon: "🔍",
              title: "Browse & Apply Jobs",
              desc: "Find jobs that fit your skills and apply with one click.",
            },
            {
              icon: "📚",
              title: "Prepare & Succeed",
              desc: "Use interview questions to study and boost your chances of success.",
            },
          ].map((step, idx) => (
            <div
              key={idx}
              className="p-6 bg-white rounded-2xl shadow-md hover:shadow-lg transition"
            >
              <div className="text-5xl mb-4">{step.icon}</div>
              <h3 className="font-semibold text-xl mb-2 text-teal-800">
                {step.title}
              </h3>
              <p className="text-gray-600">{step.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-teal-200 text-teal-900 py-20 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          Get Started Today!
        </h2>

        <div className="flex justify-center gap-4">
          {!isAuthenticated ? (
            <>
              <Link
                to="/signup"
                className="bg-teal-600 text-white font-semibold px-6 py-3 rounded-lg shadow-md hover:bg-teal-700 transition"
              >
                Sign Up
              </Link>

              <Link
                to="/login"
                className="bg-white border border-teal-600 text-teal-600 font-semibold px-6 py-3 rounded-lg shadow hover:bg-teal-600 hover:text-white transition"
              >
                Login
              </Link>
            </>
          ) : (
            <Link
              to={dashboardPath}
              className="bg-teal-600 text-white font-semibold px-8 py-3 rounded-lg shadow-md hover:bg-teal-700 transition"
            >
              Continue to Dashboard
            </Link>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-200 text-gray-600 py-6 text-center">
        <p>
          &copy; {new Date().getFullYear()} JobPortal. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default HomePage;
