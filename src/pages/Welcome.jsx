import React, { useEffect } from 'react';
import './Welcome.css'; // CSS moved to external file for cleaner JSX (optional)
import { Link } from 'react-router-dom';


const Welcome = () => {
    return (
        <>
            <div className="flex items-center justify-center bg-gradient-to-br">
                <div className="rounded-2xl shadow-lg w-full max-w-4xl p-10 text-center">
                    <h1 className="text-5xl font-bold text-gray-100 mb-4">🔐 Welcome to G-Secure</h1>
                    <h2 className="text-xl text-gray-600 mb-6">Your Modern Password Management Solution</h2>
                    <p className="text-gray-500 mb-6 text-lg">
                        Say goodbye to password anxiety! <span className="font-semibold text-blue-600">G-Secure</span> is a sleek, secure, and user-friendly password manager designed to keep your credentials safe and always within reach.
                    </p>

                    <ul className="text-left text-gray-700 mb-8 list-disc list-inside grid grid-cols-1 md:grid-cols-2 gap-2">
                        <li className="flex items-start">
                            <span className="mr-2">🔒</span>
                            <span className='text-zinc-400'>Store all your passwords in one encrypted vault</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">🌍</span>
                            <span className='text-zinc-400'>Access them anytime, anywhere</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">🔑</span>
                            <span className='text-zinc-400'>Generate strong, unique passwords in seconds</span>
                        </li>
                        <li className="flex items-start">
                            <span className="mr-2">🛡️</span>
                            <span className='text-zinc-400'>Protected with end-to-end encryption</span>
                        </li>
                    </ul>

                    <blockquote className="italic text-gray-600 mb-8 text-xl border-l-4 border-yellow-400 pl-4 py-2 bg-yellow-50 rounded">
                        "Get started today and experience a safer, smarter way to manage your digital life."
                    </blockquote>

                    <div className="flex flex-col sm:flex-row justify-center gap-4 mb-6">
                        <Link to="/signup" className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold transition transform hover:scale-105">
                            Get Started - It's Free
                        </Link>
                        <Link to="/demo" className="bg-green-500 hover:bg-green-600 text-white px-8 py-4 rounded-xl font-semibold transition transform hover:scale-105">
                            Try Now - No Registration Needed
                        </Link>
                    </div>

                    <div className="flex flex-col sm:flex-row justify-center gap-4">
                        <Link to="/login" className="bg-gray-200 hover:bg-gray-300 text-gray-800 px-6 py-3 rounded-xl font-semibold transition">
                            Existing User? Log In
                        </Link>
                        <Link to="/features" className="text-blue-600 hover:text-blue-800 px-6 py-3 rounded-xl font-medium transition">
                            Learn More About Features →
                        </Link>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Welcome;