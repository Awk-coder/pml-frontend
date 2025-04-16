import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../contexts/AuthContext";
import SquaresBackground from "../../components/layout/SquaresBackground";
import { api } from "../../services/api";
import CountrySelect from "../../components/form/CountrySelect";
import { useQuery } from "@tanstack/react-query";

const StudentRegistrationPage: React.FC = () => {
  const navigate = useNavigate();
  const { signup } = useAuth();
  const [step, setStep] = useState(1);
  const [error, setError] = useState("");

  // Basic Info (Step 1)
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [country, setCountry] = useState("");
  const [dateOfBirth, setDateOfBirth] = useState("");

  // Academic Background (Step 2)
  const [educationLevel, setEducationLevel] = useState("high_school");
  const [institution, setInstitution] = useState("");
  const [graduationYear, setGraduationYear] = useState("");
  const [gpa, setGpa] = useState("");

  // Account Setup (Step 3)
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);

  // Fetch university programs for recommendations
  const { data: programs } = useQuery({
    queryKey: ["universityPrograms"],
    queryFn: () => api.getUniversityPrograms(),
  });

  const nextStep = () => {
    // Simple validation for each step
    if (step === 1) {
      if (!firstName || !lastName || !email || !country) {
        setError("Please fill in all required fields");
        return;
      }
    } else if (step === 2) {
      if (!educationLevel || !institution) {
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
      await signup({
        firstName,
        lastName,
        email,
        password,
        phone,
        country,
        dateOfBirth,
        educationLevel,
        institution,
        graduationYear: parseInt(graduationYear) || null,
        gpa: parseFloat(gpa) || null,
        role: "student",
      });

      navigate("/student/dashboard");
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
              Basic Information
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
                Email Address*
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                required
              />
            </div>

            <div>
              <label className="block font-space text-sm text-gray-400 mb-2">
                Phone Number
              </label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block font-space text-sm text-gray-400 mb-2">
                Country of Residence*
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
                Date of Birth
              </label>
              <input
                type="date"
                value={dateOfBirth}
                onChange={(e) => setDateOfBirth(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
              />
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-orbitron text-white">
              Academic Background
            </h2>

            <div>
              <label className="block font-space text-sm text-gray-400 mb-2">
                Highest Education Level*
              </label>
              <select
                value={educationLevel}
                onChange={(e) => setEducationLevel(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                required
              >
                <option value="high_school">High School</option>
                <option value="associate">Associate Degree</option>
                <option value="bachelor">Bachelor's Degree</option>
                <option value="master">Master's Degree</option>
                <option value="doctorate">Doctorate</option>
              </select>
            </div>

            <div>
              <label className="block font-space text-sm text-gray-400 mb-2">
                Institution Name*
              </label>
              <input
                type="text"
                value={institution}
                onChange={(e) => setInstitution(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                required
              />
            </div>

            <div>
              <label className="block font-space text-sm text-gray-400 mb-2">
                Graduation Year
              </label>
              <input
                type="number"
                min="1950"
                max="2030"
                value={graduationYear}
                onChange={(e) => setGraduationYear(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
              />
            </div>

            <div>
              <label className="block font-space text-sm text-gray-400 mb-2">
                GPA / Academic Score
              </label>
              <input
                type="text"
                value={gpa}
                onChange={(e) => setGpa(e.target.value)}
                className="w-full bg-gray-800 border border-gray-700 rounded-lg px-4 py-3 text-white"
                placeholder="e.g. 3.5 / 4.0"
              />
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-4">
            <h2 className="text-xl font-orbitron text-white">
              Create Your Account
            </h2>

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

            {programs && programs.length > 0 && (
              <div className="mt-6 border-t border-gray-800 pt-4">
                <h3 className="text-white font-space mb-2">
                  Recommended Programs
                </h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {programs.slice(0, 4).map((program) => (
                    <div
                      key={program.id}
                      className="bg-gray-900 p-3 rounded-lg"
                    >
                      <h4 className="text-white">{program.title}</h4>
                      <p className="text-gray-400 text-sm">{program.level}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
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
              Student Registration
            </h1>

            {/* Progress indicators */}
            <div className="flex mb-8">
              {[1, 2, 3].map((s) => (
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
              onSubmit={step === 3 ? handleSubmit : (e) => e.preventDefault()}
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

                {step < 3 ? (
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
                    Create Account
                  </button>
                )}
              </div>
            </form>

            <div className="text-center mt-6">
              <p className="text-gray-400">
                Already have an account?{" "}
                <a
                  href="/student/login"
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

export default StudentRegistrationPage;
