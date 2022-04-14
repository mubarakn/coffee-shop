import { useState } from "react";
import Button from "../components/Button";
import { login } from "../services/authService";
import { useNavigate, Link } from "react-router-dom";
import { getSettings } from "./manage/services/settingsService";

const LoginBox = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [processing, toggleProcessing] = useState(false);
    const [errors, setErrors] = useState([]);

    const handleLogin = (e) => {
        e.preventDefault();
        setErrors([]);
        toggleProcessing(true);
        login(email, password)
            .then((response) => {
                toggleProcessing(false);
                const { authToken, refreshToken, expiresIn } = response.data;
                localStorage.setItem("authToken", authToken);
                localStorage.setItem("expiresIn", expiresIn);
                localStorage.setItem("refreshToken", refreshToken);

                return getSettings();
            })
            .then((response) => {
                const data = response.data;
                localStorage.setItem("currency", data.country.currencyCode);
                navigate("/dashboard");
            })
            .catch((error) => {
                toggleProcessing(false);
                const { status, data } = error.response;
                if (status === 400) {
                    setErrors(data.map((d) => d.msg));
                } else {
                    setErrors(["Unknown Error Please try again later."]);
                }
            });
    };

    return (
        <div className="lg:w-2/6 isolate p-4 bg-white backdrop-blur rounded-lg shadow-lg">
            <h1 className="text-center text-3xl text-slate-500 font-semibold mb-2">
                KAAFI
            </h1>
            <p className="text-center text-slate-700 font-semibold">
                Login in to your account
            </p>

            <form className="mt-2 p-8" method="post" onSubmit={handleLogin}>
                <div>
                    {errors.length > 0 && (
                        <ul className="bg-pink-100 px-4 py-2 mb-4 rounded-lg w-full">
                            {errors.map((e, idx) => (
                                <li
                                    key={`error-${idx}`}
                                    className="text-pink-500 py-2"
                                >
                                    {e}
                                </li>
                            ))}
                        </ul>
                    )}
                    <div>
                        <label className="block mb-1 text-slate-600">
                            Email
                        </label>
                        <input
                            type="text"
                            className="bg-slate-200 block w-full p-1 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 border border-slate-300"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block mb-1 text-slate-600">
                            Password
                        </label>
                        <input
                            type="password"
                            className="bg-slate-200 block w-full p-1 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 border border-slate-300"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </div>
                    <div className="mt-8">
                        <Button
                            type="submit"
                            title="Login"
                            className="w-full"
                            primary
                            disabled={processing}
                        />
                    </div>
                    <Link
                        className="block mt-6 font-light text-sm hover:underline"
                        to="/forgotPassword"
                    >
                        Forgot Password ?
                    </Link>

                    <Link
                        className="block mt-2 font-light text-sm hover:underline"
                        to="/register"
                    >
                        Dont' have an account ? Try KAAFI for free
                    </Link>
                </div>
            </form>
        </div>
    );
};

const Login = () => {
    return (
        <div className="relative w-full h-full bg-slate-200 flex items-center justify-center">
            <div className="absolute top-0 w-full h-full left-0 lg:block lg:flex-1 h-full bg-login-poster bg-cover bg-center filter brightness-25 hue-rotate-45 bg-no-repeat"></div>
            <LoginBox />
        </div>
    );
};

export default Login;
