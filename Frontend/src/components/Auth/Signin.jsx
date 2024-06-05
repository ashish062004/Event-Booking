import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext.jsx'
import { api, setAuthToken } from '../../api.js'

export default function Signin() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [role, setrole] = useState('user')
    const { setRole, setIsSignin } = useAuth();

    const handleSignin = async (e) => {
        e.preventDefault()
        setRole(role);
        try {
            const response = await api.post(`/${role}/signin`, {
                username,
                password,
            })
            console.log("response on signin", response);
            if (response.status === 200) {
                alert('Signin successful')
                //set the token in the context
                 setAuthToken(response.data.token)
                 setIsSignin(true);
                 //redirect to the home page
                window.location.href = '/';
            }else{
                alert('Signin failed')
            }

        } catch (error) {
            console.error(error)
        }
    }

    return (
        <div className="w-full max-w-md mx-auto">
            <form onSubmit={handleSignin} className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                <h1 className="text-2xl mb-4">Sign In</h1>
                <div className="mb-4">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="username"
                        type="text"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="mb-2">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input
                        className="shadow appearance-none border border-red rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                        id="password"
                        type="password"
                        placeholder="******************"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <div className="mb-6">
                    <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="role">
                        Role
                    </label>
                    <select
                        className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                        id="role"
                        value={role}
                        onChange={(e) => setrole(e.target.value)}
                    >
                        <option value="user">User</option>
                        <option value="admin">Admin</option>
                    </select>
                </div>
                <div className="flex items-center justify-between">
                    <button
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit"
                    >
                        Sign In
                    </button>
                    <Link
                        className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
                        to="/signup"
                    >
                        Sign Up
                    </Link>
                </div>
            </form>
        </div>
)}


