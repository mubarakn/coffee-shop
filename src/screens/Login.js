import { useState } from "react";
import Button from "../components/Button";
import { login } from "../services/authService";
import { useNavigate } from "react-router-dom";

const LoginBox = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [processing, toggleProcessing] = useState(false);

    const handleLogin = (e) => {
        e.preventDefault();
        toggleProcessing(true);
        login(email, password)
            .then((response) => {
                toggleProcessing(false);
                const { authToken, refreshToken, expiresIn } = response.data;
                localStorage.setItem("authToken", authToken);
                localStorage.setItem("expiresIn", expiresIn);
                localStorage.setItem("refreshToken", refreshToken);
                navigate("/dashboard");
            })
            .catch((error) => {
                toggleProcessing(false);
                console.error(error);
            });
    };

    return (
        <form
            className="bg-white p-4 shadow rounded w-full lg:w-2/5 mx-4"
            onSubmit={handleLogin}
        >
            <h1 className="text-center text-xl text-slate-500 font-semibold mb-6">
                Login
            </h1>
            <div>
                <label className="block mb-1 text-slate-600">Email</label>
                <input
                    type="text"
                    className="bg-slate-200 block w-full p-1 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 border border-slate-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </div>
            <div className="mt-4">
                <label className="block mb-1 text-slate-600">Password</label>
                <input
                    type="password"
                    className="bg-slate-200 block w-full p-1 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 border border-slate-300"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </div>
            <div className="mt-8">
                <input
                    type="submit"
                    value="Login"
                    className="ml-auto px-4 py-2 rounded hover:shadow transition flex items-center justify-center w-full bg-teal-500 text-white hover:bg-teal-400 false"
                />
                {/* <Button
                    title="Login"
                    className="w-full"
                    primary
                    onClick={handleLogin}
                    disabled={processing}
                /> */}
            </div>
        </form>
    );
};

const Login = () => {
    return (
        <div className="w-full h-full bg-slate-200 flex items-center">
            <div className="hidden lg:block lg:flex-1 h-full bg-login-poster bg-cover bg-center filter brightness-25 hue-rotate-45 bg-no-repeat"></div>
            <LoginBox />
        </div>
    );
};

export default Login;
