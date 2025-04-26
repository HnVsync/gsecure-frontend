import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
import Loader from '../utils/Loader';

const AddPassword = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [showPassword, setShowPassword] = useState("")
  const [status, setStatus] = useState("")
  const [formData, setFormData] = useState({
    username: '',
    website: '',
    password: '',
    notes: '',
    keyword: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleEncrypt = () => {
    const { username, password, notes, keyword } = formData;

    // const newKeyword = keyword
    const encryptedUsername = CryptoJS.AES.encrypt(username, keyword).toString();
    const encryptedPassword = CryptoJS.AES.encrypt(password, keyword).toString();
    // const encryptedKeyword = CryptoJS.AES.encrypt(keyword, keyword).toString();
    console.log("Encrypted password : ", encryptedPassword)
    // const decryptedPassword = CryptoJS.AES.decrypt(encryptedPassword, Keyword).toString(CryptoJS.enc.Utf8);
    // console.log("Decrypted password : ", decryptedPassword)
    return {
      username: encryptedUsername,
      password: encryptedPassword,
      keyword: keyword,
      website: formData.website,
      notes: formData.notes
    };
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    const encryptedData = handleEncrypt();

    const token = localStorage.getItem("accessToken")
    const { website, username, password, notes, keyword } = encryptedData;
    try {
      const url = `${import.meta.env.VITE_APP_HOST}/gs/api/v1/vault/add-items`;
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
        body: JSON.stringify({
          website: website,
          username: username,
          upassword: password,
          notes: notes,
          keyword: keyword
        })
      })

      const result = await response.json();

      if (result.ok) {
        setStatus("Saved successfully.. Remember you Masterkey")
      } else {
        setStatus("Failed to save. : ", result.message || "")
      }
    } catch (error) {
      setStatus("Try again..")
    } finally {
      setIsLoading(false)
      setFormData({
        username: '',
        website: '',
        password: '',
        notes: '',
        keyword: '',
      })
    }
  }

  return (
    <div className="flex flex-col lg:flex-row justify-center gap-10 p-6 m-15 items-center max-w-6xl mx-auto w-full">
      {/* Info Section */}
      <div className="text-center lg:text-left lg:w-1/2">
        <h2 className="text-3xl font-bold text-gray-400 mb-2">Secure Password Encryption</h2>
        <p className="text-gray-600 mb-6">All data is encrypted before storage</p>

        {/* Security Info */}
        <div className="p-4 bg-blue-50 rounded-lg border border-blue-100">
          <h4 className="text-sm font-medium text-blue-800 mb-2">How it works:</h4>
          <ul className="text-xs text-blue-700 space-y-1">
            <li className="flex items-start">
              <span className="mr-2">•</span>
              Your password is encrypted locally before being saved
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              The encryption key is never stored
            </li>
            <li className="flex items-start">
              <span className="mr-2">•</span>
              You'll need the same key to decrypt later
            </li>
          </ul>
        </div>
      </div>

      {/* Form Section */}
      <div className="lg:w-1/2 w-full">
        <form onSubmit={handleSave} className="flex flex-col gap-4">
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Username/Email"
            className="pl-3 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="text"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="Website/App URL"
            className="pl-3 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Password"
              className="pl-3 px-4 py-3 pr-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
            {/* <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
            >
              👁
            </button> */}
          </div>
          <input
            type="text"
            name="notes"
            value={formData.notes}
            onChange={handleChange}
            placeholder="Notes as a hint"
            className="pl-3 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />
          <input
            type="password"
            name="keyword"
            value={formData.keyword}
            onChange={handleChange}
            placeholder="Master key (used for encryption password)"
            className="pl-3 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
          />

          {status && (
            <div className="text-sm text-green-600">{status}</div>
          )}

          <button
            type="submit"
            className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition"
          >
            {isLoading ? <Loader /> : "Encrypt & Save"}
          </button>
        </form>
      </div>
    </div>

    // <div className="flex justify-center items-center sm:flex-col md:flex-col lg:flex-row gap-10 mx-auto border-white rounded-xl shadow-md py-5">
    //   <div className="text-center mb-6">
    //     <h2 className="text-4xl font-bold text-gray-400">Secure Password Encryption</h2>
    //     <p className="mt-2 text-gray-600">All data is encrypted before storage</p>
    //   </div>

    //   <div className="flex flex-col gap-2">
    //     {/* Username Field */}
    //     <form onSubmit={handleSave}>
    //       <div className="relative">
    //         <input
    //           type="text"
    //           name="username"
    //           value={formData.username}
    //           onChange={handleChange}
    //           placeholder="Username/Email"
    //           className="pl-3 px-4 w-full py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    //         />
    //       </div>
    //       {/* Website Field */}
    //       <div className="relative">
    //         <input
    //           type="text"
    //           name="website"
    //           value={formData.website}
    //           onChange={handleChange}
    //           placeholder="Website/App URL"
    //           className="pl-3 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    //         />
    //       </div>
    //       {/* Password Field */}
    //       <div className="relative">
    //         <input
    //           type={showPassword ? "text" : "password"}
    //           name="password"
    //           value={formData.password}
    //           onChange={handleChange}
    //           placeholder="Password"
    //           className="pl-3 w-full px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 pr-10"
    //         />
    //         <button
    //           type="button"
    //           onClick={() => setShowPassword(!showPassword)}
    //           className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-500 hover:text-gray-700"
    //         >
    //           {/* {showPassword ? <FiEyeOff /> : <FiEye />} */}
    //         </button>
    //       </div>
    //       <div className="relative">
    //         <input
    //           type="textarea"
    //           name="notes"
    //           value={formData.notes}
    //           onChange={handleChange}
    //           placeholder="Notes as a hint"
    //           className="pl-3 w-full py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    //         />
    //       </div>
    //       {/* Encryption Key Field */}
    //       <div className="relative">
    //         <input
    //           type="password"
    //           name="keyword"
    //           value={formData.keyword}
    //           onChange={handleChange}
    //           placeholder="Master key (used for encryption password)"
    //           className="pl-3 w-full py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
    //         />
    //       </div>
    //       {status && <>{status}</>}
    //       <div className="pt-2">
    //         <button
    //           type='submit'
    //           className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-3 px-4 rounded-lg transition flex items-center justify-center"
    //         >
    //           {/* <FiSave className="mr-2" /> */}
    //           {isLoading ? <Loader /> : "Encrypt & Save"}
    //         </button>
    //       </div>
    //     </form>

    //     {/* Security Info */}
    //     <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-100">
    //       <h4 className="text-sm font-medium text-blue-800 mb-2">How it works:</h4>
    //       <ul className="text-xs text-blue-700 space-y-1">
    //         <li className="flex items-start">
    //           <span className="mr-2">•</span>
    //           Your password is encrypted locally before being saved
    //         </li>
    //         <li className="flex items-start">
    //           <span className="mr-2">•</span>
    //           The encryption key is never stored
    //         </li>
    //         <li className="flex items-start">
    //           <span className="mr-2">•</span>
    //           You'll need the same key to decrypt later
    //         </li>
    //       </ul>
    //     </div>
    //   </div>
    // </div >
  );
};

export default AddPassword;
