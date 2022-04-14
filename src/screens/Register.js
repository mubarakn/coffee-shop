import { useEffect, useState } from "react";
import Button from "../components/Button";
import { register } from "../services/authService";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Label from "../components/Label";
import axios from "axios";

const RegistrationBox = () => {
    const navigate = useNavigate();
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [businessName, setBusinessName] = useState("");
    const [businessType, setBusinessType] = useState("Coffee Shop");
    const [businessLocation, setBusinessLocation] = useState("");
    const [acceptTerms, toggleAcceptTerms] = useState(false);
    const [processing, toggleProcessing] = useState(false);
    const [errors, setErrors] = useState([]);
    const [countries, setCountries] = useState([]);

    useEffect(() => {
        axios.get("/countries").then((response) => {
            console.log(response);
            setCountries(
                response.data.map((c) => ({ id: c.id, name: c.name }))
            );
        });
    }, []);

    const handleRegister = (e) => {
        e.preventDefault();
        if (!acceptTerms) {
            alert("You must accept to Terms in order to register.");
            return;
        }

        setErrors([]);
        toggleProcessing(true);
        register(
            name,
            email,
            password,
            businessName,
            businessType,
            businessLocation
        )
            .then((response) => {
                const { authToken, expiresIn, refreshToken } = response.data;
                localStorage.setItem("authToken", authToken);
                localStorage.setItem("expiresIn", expiresIn);
                localStorage.setItem("refreshToken", refreshToken);
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
                Try KAAFI free for 14 days
            </p>
            <form className="mt-6 p-8" onSubmit={handleRegister}>
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
                        <Label className="font-semibold text-base mb-2 block">
                            Name
                        </Label>
                        <Input type="text" value={name} onChange={setName} />
                    </div>
                    <div className="mt-4">
                        <Label className="font-semibold text-base mb-2 block">
                            Email
                        </Label>
                        <Input type="email" value={email} onChange={setEmail} />
                    </div>
                    <div className="mt-4">
                        <Label className="font-semibold text-base mb-2 block">
                            Password
                        </Label>
                        <Input
                            type="password"
                            value={password}
                            onChange={setPassword}
                        />
                    </div>
                    <div className="mt-4">
                        <Label className="font-semibold text-base mb-2 block">
                            Business Name
                        </Label>
                        <Input
                            type="text"
                            value={businessName}
                            onChange={setBusinessName}
                        />
                    </div>
                    <div className="mt-4">
                        <Label className="font-semibold text-base mb-2 block">
                            Business Type
                        </Label>
                        <Input
                            type="text"
                            value={businessType}
                            onChange={setBusinessType}
                            readOnly={true}
                        />
                    </div>
                    <div className="mt-4">
                        <label className="block mb-1 text-slate-600">
                            Business Location
                        </label>
                        <select
                            value={businessLocation}
                            onChange={(e) =>
                                setBusinessLocation(e.target.value)
                            }
                            className="bg-slate-200 block w-full p-1 rounded focus:outline-none focus:ring-2 focus:ring-teal-500 border border-slate-300"
                        >
                            <option value="">Select</option>
                            {countries.map((c, idx) => (
                                <option key={`country-${idx}`} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mt-4">
                        <Label className="flex items-center">
                            <input
                                type="checkbox"
                                checked={acceptTerms}
                                onChange={() => toggleAcceptTerms(!acceptTerms)}
                            />
                            <span className="ml-2">
                                Accept Terms and Conditions
                            </span>
                        </Label>
                    </div>
                    <div className="mt-4">
                        <Button
                            type="submit"
                            title="Start 14 Days Free Trial"
                            className="w-full"
                            primary
                            disabled={processing}
                        />
                    </div>
                    <Link
                        className="block mt-2 font-light text-sm hover:underline"
                        to="/login"
                    >
                        Already have an account ? Login
                    </Link>
                </div>
            </form>
        </div>
    );
};

const Register = () => {
    return (
        <div className="relative w-full h-full bg-slate-200 flex items-center justify-center">
            <div className="absolute top-0 w-full h-full left-0 lg:block lg:flex-1 h-full bg-login-poster bg-cover bg-center filter brightness-25 hue-rotate-45 bg-no-repeat"></div>
            <RegistrationBox />
        </div>
    );
};

export default Register;
