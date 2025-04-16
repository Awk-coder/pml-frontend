import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import SquaresBackground from "../../components/layout/SquaresBackground";
import { api } from "../../services/api";
import CountrySelect from "../../components/form/CountrySelect";
import PhoneInput from "../../components/form/PhoneInput";

const AgentRegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  // Personal Info (Step 1)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  // Business Details (Step 2)
  const [companyName, setCompanyName] = useState("");
  const [companyWebsite, setCompanyWebsite] = useState("");
  const [yearsInBusiness, setYearsInBusiness] = useState("");
  const [businessAddress, setBusinessAddress] = useState("");

  // Recruitment Territory (Step 3)
  const [primaryTerritory, setPrimaryTerritory] = useState("");
  const [secondaryTerritories, setSecondaryTerritories] = useState<string[]>(
    []
  );
  const [languages, setLanguages] = useState<string[]>([]);
  const [studentsRecruitedPerYear, setStudentsRecruitedPerYear] = useState("");
  const [existingUniversityPartners, setExistingUniversityPartners] =
    useState("");

  // Account Setup (Step 4)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const availableLanguages = [
    "English",
    "Spanish",
    "French",
    "German",
    "Chinese",
    "Arabic",
    "Russian",
    "Hindi",
    "Portuguese",
    "Other",
  ];

  const handleLanguageChange = (lang: string) => {
    setLanguages((prev) =>
      prev.includes(lang)
        ? prev.filter((item) => item !== lang)
        : [...prev, lang]
    );
  };

  const nextStep = () => {
    // Step-specific validation
    if (step === 1) {
      if (!firstName || !lastName || !email) {
        setError("Please fill in all required fields");
        return;
      }

      // Basic email validation
      if (!/\S+@\S+\.\S+/.test(email)) {
        setError("Please enter a valid email address");
        return;
      }
    } else if (step === 2) {
      // Business validation - minimal required fields
      if (!companyName) {
        setError("Please provide your company/agency name");
        return;
      }
    } else if (step === 3) {
      // Recruitment validation
      if (!primaryTerritory || languages.length === 0) {
        setError("Please fill in all required fields");
        return;
      }
    }

    setError("");
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
    setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!agreeToTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      // Submit agent application
      await signup({
        firstName,
        lastName,
        email,
        phone,
        password,
        companyName,
        companyWebsite,
        yearsInBusiness: parseInt(yearsInBusiness) || 0,
        businessAddress,
        primaryTerritory,
        secondaryTerritories,
        languages,
        studentsRecruitedPerYear: parseInt(studentsRecruitedPerYear) || 0,
        existingUniversityPartners,
        role: "agent",
      });

      // Navigate to thank you page after successful submission
      navigate("/auth/registration-success?role=agent");
    } catch (err) {
      setError(typeof err === "string" ? err : "Registration failed");
    }
  };

  // Render different form steps
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-orbitron text-white">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-space text-sm text-gray-400 mb-2">
                  First Name*
                </label>
                <input
                  type="text"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  required
                />
              </div>

              <div>
                <label className="block font-space text-sm text-gray-400 mb-2">
                  Last Name*
                </label>
                <input
                  type="text"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-space text-sm text-gray-400 mb-2">
                Email*
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                This email will be used for your account login
              </p>
            </div>

            <div>
              <label className="block font-space text-sm text-gray-400 mb-2">
                Phone Number
              </label>
              <PhoneInput
                value={phone}
                onChange={setPhone}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-orbitron text-white">
              Business Details
            </h2>

            <div>
              <label className="block font-space text-sm text-gray-400 mb-2">
                Company/Agency Name*
              </label>
              <input
                type="text"
                value={companyName}
                onChange={(e) => setCompanyName(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                required
              />
            </div>

            <div>
              <label className="block font-space text-sm text-gray-400 mb-2">
                Company Website
              </label>
              <input
                type="url"
                value={companyWebsite}
                onChange={(e) => setCompanyWebsite(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                placeholder="https://www.example.com"
              />
            </div>

            <div>
              <label className="block font-space text-sm text-gray-400 mb-2">
                Years in Education Recruitment
              </label>
              <input
                type="number"
                value={yearsInBusiness}
                onChange={(e) => setYearsInBusiness(e.target.value)}
                min="0"
                max="100"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block font-space text-sm text-gray-400 mb-2">
                Business Address
              </label>
              <textarea
                value={businessAddress}
                onChange={(e) => setBusinessAddress(e.target.value)}
                rows={3}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                placeholder="Enter your business address"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-orbitron text-white">
              Recruitment Experience
            </h2>

            <div>
              <label className="block font-space text-sm text-gray-400 mb-2">
                Primary Recruitment Territory*
              </label>
              <CountrySelect
                value={primaryTerritory}
                onChange={setPrimaryTerritory}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                required
              />
            </div>

            <div>
              <label className="block font-space text-sm text-gray-400 mb-2">
                Secondary Territories
              </label>
              <input
                type="text"
                value={secondaryTerritories.join(", ")}
                onChange={(e) =>
                  setSecondaryTerritories(
                    e.target.value.split(",").map((t) => t.trim())
                  )
                }
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                placeholder="e.g. Vietnam, Thailand, Indonesia"
              />
              <p className="text-xs text-gray-400 mt-1">
                Enter countries separated by commas
              </p>
            </div>

            <div>
              <label className="block font-space text-sm text-gray-400 mb-2">
                Languages Spoken*
              </label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {availableLanguages.map((lang) => (
                  <label key={lang} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={languages.includes(lang)}
                      onChange={() => handleLanguageChange(lang)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-300">{lang}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-space text-sm text-gray-400 mb-2">
                Average Students Recruited Per Year
              </label>
              <input
                type="number"
                value={studentsRecruitedPerYear}
                onChange={(e) => setStudentsRecruitedPerYear(e.target.value)}
                min="0"
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block font-space text-sm text-gray-400 mb-2">
                Existing University Partners
              </label>
              <textarea
                value={existingUniversityPartners}
                onChange={(e) => setExistingUniversityPartners(e.target.value)}
                rows={3}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                placeholder="List your current university partnerships"
              />
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-orbitron text-white">Account Setup</h2>

            <div>
              <label className="block font-space text-sm text-gray-400 mb-2">
                Password*
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                required
                minLength={8}
              />
              <p className="text-xs text-gray-400 mt-1">
                Minimum 8 characters, include numbers and special characters for
                better security
              </p>
            </div>

            <div>
              <label className="block font-space text-sm text-gray-400 mb-2">
                Confirm Password*
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                required
              />
            </div>

            <div className="mt-4">
              <label className="inline-flex items-center">
                <input
                  type="checkbox"
                  checked={agreeToTerms}
                  onChange={(e) => setAgreeToTerms(e.target.checked)}
                  className="form-checkbox h-5 w-5 text-blue-600"
                />
                <span className="ml-2 text-gray-400 text-sm">
                  I agree to the{" "}
                  <a href="/terms" className="text-blue-400 hover:underline">
                    Terms of Service
                  </a>{" "}
                  and{" "}
                  <a href="/privacy" className="text-blue-400 hover:underline">
                    Privacy Policy
                  </a>
                </span>
              </label>
            </div>

            <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-4 mt-6">
              <h3 className="text-blue-400 font-medium mb-2">
                What happens next?
              </h3>
              <p className="text-gray-300 text-sm">
                After submission, your agent application will be reviewed by our
                team. You'll receive an email notification once your account is
                approved, along with information about commission rates and
                partnership terms.
              </p>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-black">
      <div className="relative min-h-screen bg-black">
        <SquaresBackground
          direction="diagonal"
          speed={0.3}
          squareSize={40}
          borderColor="rgba(255, 255, 255, 0.3)"
          hoverFillColor="#333"
          backgroundColor="#000000"
        />

        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-full max-w-2xl p-8 bg-black/50 backdrop-blur-sm border border-gray-800 rounded-xl my-8">
            <h1 className="text-3xl font-orbitron text-white mb-6">
              Agent Registration
            </h1>

            {/* Progress indicators */}
            <div className="flex mb-8">
              {[1, 2, 3, 4].map((s) => (
                <div
                  key={s}
                  className={`flex-1 h-2 rounded-full mx-1 ${
                    s <= step ? "bg-blue-600" : "bg-gray-700"
                  }`}
                />
              ))}
            </div>

            {error && (
              <div className="bg-red-500/10 border border-red-500 text-red-500 px-4 py-2 rounded mb-4">
                {error}
              </div>
            )}

            <form
              onSubmit={step === 4 ? handleSubmit : (e) => e.preventDefault()}
            >
              {renderStep()}

              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Back
                  </button>
                )}

                {step < 4 ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="ml-auto px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                  >
                    Submit Application
                  </button>
                )}
              </div>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-400">
                Already have an account?{" "}
                <a
                  href="/agent/login"
                  className="text-blue-400 hover:underline"
                >
                  Log in
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AgentRegistrationPage;
