import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import SquaresBackground from "../../components/layout/SquaresBackground";
import { api } from "../../services/api";
import CountrySelect from "../../components/form/CountrySelect";
import PhoneInput from "../../components/form/PhoneInput";

const UniversityRegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  // Institution Info (Step 1)
  const [universityName, setUniversityName] = useState("");
  const [yearEstablished, setYearEstablished] = useState("");
  const [website, setWebsite] = useState("");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [accreditationNumber, setAccreditationNumber] = useState("");

  // Contact Person Info (Step 2)
  const [contactName, setContactName] = useState("");
  const [contactPosition, setContactPosition] = useState("");
  const [contactEmail, setContactEmail] = useState("");
  const [contactPhone, setContactPhone] = useState("");

  // Program Details (Step 3)
  const [programTypes, setProgramTypes] = useState<string[]>([]);
  const [description, setDescription] = useState("");
  const [reasonToJoin, setReasonToJoin] = useState("");

  // Account Setup (Step 4)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  const availableProgramTypes = [
    "Bachelor's Degrees",
    "Master's Degrees",
    "PhDs",
    "Diplomas",
    "Certificates",
    "Short Courses",
  ];

  const handleProgramTypeChange = (type: string) => {
    setProgramTypes((prev) =>
      prev.includes(type)
        ? prev.filter((item) => item !== type)
        : [...prev, type]
    );
  };

  const nextStep = () => {
    // Validation for each step
    if (step === 1) {
      if (!universityName || !country || !city) {
        setError("Please fill in all required fields");
        return;
      }
    } else if (step === 2) {
      if (!contactName || !contactEmail || !contactPosition) {
        setError("Please fill in all required fields");
        return;
      }

      // Basic email validation
      if (!/\S+@\S+\.\S+/.test(contactEmail)) {
        setError("Please enter a valid email address");
        return;
      }
    } else if (step === 3) {
      if (programTypes.length === 0 || !description) {
        setError(
          "Please select at least one program type and provide a description"
        );
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
      // University registration data format
      await signup({
        universityName,
        yearEstablished: parseInt(yearEstablished) || null,
        website,
        country,
        city,
        accreditationNumber,
        contactName,
        contactPosition,
        contactEmail,
        contactPhone,
        programTypes,
        description,
        reasonToJoin,
        password,
        role: "university",
        status: "pending", // Universities typically need approval
      });

      // After registration, we'll show a pending approval page
      navigate("/auth/pending-approval");
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
              Institution Information
            </h2>

            <div>
              <label className="block font-space text-sm text-gray-400 mb-2">
                University Name*
              </label>
              <input
                type="text"
                value={universityName}
                onChange={(e) => setUniversityName(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-space text-sm text-gray-400 mb-2">
                  Year Established
                </label>
                <input
                  type="number"
                  value={yearEstablished}
                  onChange={(e) => setYearEstablished(e.target.value)}
                  min="1500"
                  max={new Date().getFullYear()}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                />
              </div>

              <div>
                <label className="block font-space text-sm text-gray-400 mb-2">
                  Website
                </label>
                <input
                  type="url"
                  value={website}
                  onChange={(e) => setWebsite(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  placeholder="https://www.example.edu"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-space text-sm text-gray-400 mb-2">
                  Country*
                </label>
                <CountrySelect
                  value={country}
                  onChange={setCountry}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  required
                />
              </div>

              <div>
                <label className="block font-space text-sm text-gray-400 mb-2">
                  City*
                </label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  required
                />
              </div>
            </div>

            <div>
              <label className="block font-space text-sm text-gray-400 mb-2">
                Accreditation Number/ID
              </label>
              <input
                type="text"
                value={accreditationNumber}
                onChange={(e) => setAccreditationNumber(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                placeholder="Optional"
              />
              <p className="text-xs text-gray-400 mt-1">
                Provide your institutional accreditation ID if available
              </p>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-orbitron text-white">
              Primary Contact Person
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="block font-space text-sm text-gray-400 mb-2">
                  Contact Name*
                </label>
                <input
                  type="text"
                  value={contactName}
                  onChange={(e) => setContactName(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  required
                />
              </div>

              <div>
                <label className="block font-space text-sm text-gray-400 mb-2">
                  Position/Title*
                </label>
                <input
                  type="text"
                  value={contactPosition}
                  onChange={(e) => setContactPosition(e.target.value)}
                  className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                  required
                  placeholder="e.g. Admissions Director"
                />
              </div>
            </div>

            <div>
              <label className="block font-space text-sm text-gray-400 mb-2">
                Contact Email*
              </label>
              <input
                type="email"
                value={contactEmail}
                onChange={(e) => setContactEmail(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                required
              />
              <p className="text-xs text-gray-400 mt-1">
                This email will be used for your account login
              </p>
            </div>

            <div>
              <label className="block font-space text-sm text-gray-400 mb-2">
                Contact Phone
              </label>
              <PhoneInput
                value={contactPhone}
                onChange={setContactPhone}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-orbitron text-white">
              Program Information
            </h2>

            <div>
              <label className="block font-space text-sm text-gray-400 mb-2">
                Program Types Offered*
              </label>
              <div className="grid grid-cols-2 gap-2 mt-2">
                {availableProgramTypes.map((type) => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      checked={programTypes.includes(type)}
                      onChange={() => handleProgramTypeChange(type)}
                      className="form-checkbox h-5 w-5 text-blue-600"
                    />
                    <span className="ml-2 text-gray-300">{type}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <label className="block font-space text-sm text-gray-400 mb-2">
                Institution Description*
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={4}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                placeholder="Provide a brief description of your institution..."
                required
              />
            </div>

            <div>
              <label className="block font-space text-sm text-gray-400 mb-2">
                Why Join Our Platform?
              </label>
              <textarea
                value={reasonToJoin}
                onChange={(e) => setReasonToJoin(e.target.value)}
                rows={3}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                placeholder="What are your goals for joining our platform?"
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
                After submission, your application will be reviewed by our team.
                This process typically takes 2-3 business days. You'll receive
                an email notification once your university account is approved.
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
              University Registration
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
                  href="/university/login"
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

export default UniversityRegistrationPage;
