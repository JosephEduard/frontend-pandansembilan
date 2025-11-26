import React from "react";
import {
  Target,
  Eye,
  FileCheck,
  Award,
  Users,
  TrendingUp,
  Shield,
  Building2,
} from "lucide-react";
const Profile = () => {
  return (
    <div className="min-h-screen bg-white">
      {/* Company Profile Section */}
      <section id="profile" className="relative px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
              Company Profile
            </h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-blue-600" />
          </div>

          <div className="mb-16 grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-blue-500 hover:shadow-lg">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-blue-600">
                <Users className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-800">
                Who We Are
              </h3>
              <p className="leading-relaxed text-gray-600">
                CV Pandan Sembilan is a leading construction company
                specializing in building constructions and supplier services.
                Established in Palembang, Indonesia, we have built a reputation
                for delivering high-quality construction projects with
                excellence and integrity.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-8 transition-all duration-300 hover:border-blue-500 hover:shadow-lg">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-blue-600">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-800">
                Our Impact
              </h3>
              <p className="leading-relaxed text-gray-600">
                With numerous successful projects across Palembang and South
                Sumatra, we have delivered transformative construction solutions
                that meet the highest standards. Our dedicated team works
                tirelessly to exceed client expectations and deliver excellence
                in every project.
              </p>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { number: "100+", label: "Projects Completed" },
              { number: "50+", label: "Team Members" },
              { number: "15+", label: "Years Experience" },
              { number: "95%", label: "Client Satisfaction" },
            ].map((stat, index) => (
              <div
                key={index}
                className="rounded-lg border border-blue-100 bg-blue-50 p-6 text-center transition-all duration-300 hover:border-blue-300"
              >
                <div className="mb-2 text-4xl font-bold text-blue-600 md:text-5xl">
                  {stat.number}
                </div>
                <div className="text-sm font-medium text-gray-600">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section id="vision" className="relative bg-gray-50 px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
              Vision & Mission
            </h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-blue-600" />
          </div>

          <div className="mb-12 grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-10 shadow-md transition-all duration-300 hover:border-blue-500 hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-600">
                <Eye className="h-9 w-9 text-white" />
              </div>
              <h3 className="mb-6 text-3xl font-bold text-gray-800">
                Our Vision
              </h3>
              <p className="text-lg leading-relaxed text-gray-600">
                To become the most trusted and reliable construction company in
                South Sumatra, recognized for our commitment to quality,
                innovation, and sustainable building practices that create
                lasting value for our clients and community.
              </p>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-10 shadow-md transition-all duration-300 hover:border-blue-500 hover:shadow-xl">
              <div className="mb-6 flex h-16 w-16 items-center justify-center rounded-lg bg-blue-600">
                <Target className="h-9 w-9 text-white" />
              </div>
              <h3 className="mb-6 text-3xl font-bold text-gray-800">
                Our Mission
              </h3>
              <p className="text-lg leading-relaxed text-gray-600">
                To deliver exceptional construction services and quality
                building materials through professional expertise, integrity,
                and dedication to excellence. We strive to exceed client
                expectations while maintaining the highest standards of safety
                and quality.
              </p>
            </div>
          </div>

          {/* Core Values */}
          <div className="rounded-lg border border-gray-200 bg-white p-10 shadow-md">
            <h3 className="mb-8 text-center text-3xl font-bold text-gray-800">
              Our Core Values
            </h3>
            <div className="grid gap-6 md:grid-cols-3">
              {[
                {
                  title: "Quality",
                  desc: "Delivering excellence in every project",
                },
                {
                  title: "Integrity",
                  desc: "Operating with honesty and transparency",
                },
                {
                  title: "Professionalism",
                  desc: "Maintaining highest industry standards",
                },
              ].map((value, index) => (
                <div
                  key={index}
                  className="rounded-lg border border-blue-100 bg-blue-50 p-6 text-center transition-all duration-300 hover:border-blue-300"
                >
                  <h4 className="mb-3 text-xl font-semibold text-blue-600">
                    {value.title}
                  </h4>
                  <p className="text-gray-600">{value.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Legality Section */}
      <section id="certifications" className="relative px-6 py-20">
        <div className="mx-auto max-w-6xl">
          <div className="mb-16 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-800 md:text-5xl">
              Legal Information
            </h2>
            <div className="mx-auto h-1 w-20 rounded-full bg-blue-600" />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-md transition-all duration-300 hover:border-blue-500 hover:shadow-lg">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-blue-600">
                <FileCheck className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-800">
                Company Registration
              </h3>
              <div className="space-y-3 text-gray-600">
                <p>
                  <span className="font-semibold text-blue-600">
                    Legal Name:
                  </span>{" "}
                  CV Pandan Sembilan
                </p>
                <p>
                  <span className="font-semibold text-blue-600">
                    Registration Number:
                  </span>{" "}
                  [Your Registration Number]
                </p>
                <p>
                  <span className="font-semibold text-blue-600">
                    Establishment Date:
                  </span>{" "}
                  [Your Date]
                </p>
                <p>
                  <span className="font-semibold text-blue-600">Location:</span>{" "}
                  Palembang, South Sumatra, Indonesia
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-md transition-all duration-300 hover:border-blue-500 hover:shadow-lg">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-blue-600">
                <Shield className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-800">
                Certifications & Compliance
              </h3>
              <div className="space-y-3 text-gray-600">
                <p>
                  <span className="font-semibold text-blue-600">
                    Business License:
                  </span>{" "}
                  Active & Valid
                </p>
                <p>
                  <span className="font-semibold text-blue-600">
                    Construction Permit:
                  </span>{" "}
                  Certified
                </p>
                <p>
                  <span className="font-semibold text-blue-600">
                    Safety Standards:
                  </span>{" "}
                  Compliant
                </p>
                <p>
                  <span className="font-semibold text-blue-600">
                    Environmental Compliance:
                  </span>{" "}
                  Certified
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-md transition-all duration-300 hover:border-blue-500 hover:shadow-lg">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-blue-600">
                <Award className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-800">
                Tax Information
              </h3>
              <div className="space-y-3 text-gray-600">
                <p>
                  <span className="font-semibold text-blue-600">NPWP:</span>{" "}
                  [Your Tax Number]
                </p>
                <p>
                  <span className="font-semibold text-blue-600">
                    Tax Status:
                  </span>{" "}
                  Registered & Compliant
                </p>
                <p>
                  <span className="font-semibold text-blue-600">
                    VAT Registered:
                  </span>{" "}
                  Yes
                </p>
              </div>
            </div>

            <div className="rounded-lg border border-gray-200 bg-white p-8 shadow-md transition-all duration-300 hover:border-blue-500 hover:shadow-lg">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-lg bg-blue-600">
                <Building2 className="h-7 w-7 text-white" />
              </div>
              <h3 className="mb-4 text-2xl font-bold text-gray-800">
                Corporate Address
              </h3>
              <div className="space-y-2 text-gray-600">
                <p>CV Pandan Sembilan</p>
                <p>[Your Street Address]</p>
                <p>Palembang, South Sumatra</p>
                <p>Indonesia</p>
              </div>
            </div>
          </div>

          <div className="mt-12 rounded-lg border border-gray-200 bg-white p-8 shadow-md">
            <h3 className="mb-6 text-center text-2xl font-bold text-gray-800">
              Legal Documents
            </h3>
            <div className="flex flex-wrap justify-center gap-4">
              {[
                "Business License",
                "Company Certificate",
                "Tax Documents",
                "Safety Certification",
              ].map((doc, index) => (
                <button
                  key={index}
                  className="rounded bg-blue-600 px-6 py-3 font-medium text-white transition-all duration-300 hover:bg-blue-700"
                >
                  {doc}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
export default Profile;
