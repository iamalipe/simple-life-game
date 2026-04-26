import React, { useState } from "react";

// Define the shape of our form state
interface FormData {
  firstName: string;
  lastName: string;
  sex: "Male" | "Female";
  country: string;
}

const Home: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: "Julian",
    lastName: "Sato",
    sex: "Male",
    country: "Nauru",
  });

  // Handle changes for both inputs and selects
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Submitted:", formData);
  };

  return (
    // Full-screen wrapper to center the form vertically and horizontally
    <div className="min-h-screen flex items-center justify-center bg-[#161722] p-4">
      <div className="w-full max-w-md p-6 bg-transparent font-sans">
        <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
          {/* First Name */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs text-gray-400 font-semibold tracking-wider uppercase">
                First Name
              </label>
              <button
                type="button"
                className="text-xs bg-[#1a1b2a] border border-[#2e2f45] text-gray-400 px-2.5 py-1 rounded-md flex items-center gap-1.5 hover:bg-[#25263a] transition-colors"
              >
                <span>🎲</span> Random
              </button>
            </div>
            <input
              type="text"
              name="firstName"
              value={formData.firstName}
              onChange={handleChange}
              className="w-full bg-[#161722] border border-[#2e2f45] rounded-md px-3 py-2.5 text-gray-200 outline-none focus:border-[#7c63f8] transition-colors"
            />
          </div>

          {/* Last Name */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs text-gray-400 font-semibold tracking-wider uppercase">
                Last Name
              </label>
              <button
                type="button"
                className="text-xs bg-[#1a1b2a] border border-[#2e2f45] text-gray-400 px-2.5 py-1 rounded-md flex items-center gap-1.5 hover:bg-[#25263a] transition-colors"
              >
                <span>🎲</span> Random
              </button>
            </div>
            <input
              type="text"
              name="lastName"
              value={formData.lastName}
              onChange={handleChange}
              className="w-full bg-[#161722] border border-[#2e2f45] rounded-md px-3 py-2.5 text-gray-200 outline-none focus:border-[#7c63f8] transition-colors"
            />
          </div>

          {/* Sex */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs text-gray-400 font-semibold tracking-wider uppercase">
                Sex
              </label>
              <button
                type="button"
                className="text-xs bg-[#1a1b2a] border border-[#2e2f45] text-gray-400 px-2.5 py-1 rounded-md flex items-center gap-1.5 hover:bg-[#25263a] transition-colors"
              >
                <span>🎲</span> Random
              </button>
            </div>
            <div className="flex gap-3">
              <button
                type="button"
                onClick={() => setFormData({ ...formData, sex: "Male" })}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-md border transition-colors ${
                  formData.sex === "Male"
                    ? "bg-[#1f2038] border-[#7c63f8] text-white"
                    : "bg-[#161722] border-[#2e2f45] text-gray-400 hover:bg-[#1a1b2a]"
                }`}
              >
                <span>♂</span> Male
              </button>
              <button
                type="button"
                onClick={() => setFormData({ ...formData, sex: "Female" })}
                className={`flex-1 flex items-center justify-center gap-2 px-3 py-2.5 rounded-md border transition-colors ${
                  formData.sex === "Female"
                    ? "bg-[#1f2038] border-[#7c63f8] text-white"
                    : "bg-[#161722] border-[#2e2f45] text-gray-400 hover:bg-[#1a1b2a]"
                }`}
              >
                <span>♀</span> Female
              </button>
            </div>
          </div>

          {/* Country */}
          <div className="flex flex-col gap-1.5">
            <div className="flex justify-between items-center">
              <label className="text-xs text-gray-400 font-semibold tracking-wider uppercase">
                Country
              </label>
              <button
                type="button"
                className="text-xs bg-[#1a1b2a] border border-[#2e2f45] text-gray-400 px-2.5 py-1 rounded-md flex items-center gap-1.5 hover:bg-[#25263a] transition-colors"
              >
                <span>🎲</span> Random
              </button>
            </div>
            <div className="relative">
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full bg-[#161722] border border-[#2e2f45] rounded-md px-3 py-2.5 text-gray-200 outline-none focus:border-[#7c63f8] appearance-none cursor-pointer transition-colors"
              >
                <option value="Nauru">Nauru</option>
                <option value="Japan">Japan</option>
                <option value="USA">United States</option>
                {/* Add more options as needed */}
              </select>
              {/* Custom dropdown arrow */}
              <div className="absolute inset-y-0 right-0 flex items-center px-3 pointer-events-none text-gray-400">
                <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                  <path
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    fillRule="evenodd"
                  ></path>
                </svg>
              </div>
            </div>
          </div>

          {/* Global Action Buttons */}
          <div className="flex flex-col gap-3 mt-2">
            <button
              type="button"
              className="w-full bg-[#24253a] hover:bg-[#2a2b42] text-gray-300 border border-[#2e2f45] rounded-lg py-3 flex items-center justify-center gap-2 text-sm font-medium transition-colors"
            >
              <span>🎲</span> Randomize Everything
            </button>

            <button
              type="submit"
              className="w-full bg-[#7c63f8] hover:bg-[#8b75ff] text-white rounded-lg py-3 font-semibold shadow-[0_0_15px_rgba(124,99,248,0.3)] transition-all flex items-center justify-center gap-2"
            >
              Begin Life <span>→</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Home;
