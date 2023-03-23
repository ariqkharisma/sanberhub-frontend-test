import axios from 'axios'
import { Fragment, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import Loading from '../components/Loading';

function Signup() {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState();
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSignup = async(e) => {
        e.preventDefault();
        try {
        setLoading(true);
        await axios.post("https://cms-admin.ihsansolusi.co.id/testapi/auth/register", {
            name,
            email,
            password,
        });
        setLoading(false);
        navigate("/login");
        } catch (error) {
        setError(error.message);
        setLoading(false);
        }
    }

    return (
        <Fragment>
            <div className="w-screen h-screen flex flex-col md:justify-center items-center">
                <h1 className='m-10 text-4xl'> Signup </h1>
                <form className="p-2 flex flex-col container max-w-screen-sm">
                <div className="grid grid-rows-2 gap-4">
                    <input
                    className="px-2 py-3 border rounded-md border-black-100"
                    autoComplete="name"
                    placeholder="Name"
                    type="text"
                    value={name}
                    onChange={(e) => {setName(e.target.value); setError(null)}}
                    />
                    <input
                    className="px-2 py-3 border rounded-md border-black-100"
                    autoComplete="email"
                    placeholder="Email"
                    type="email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value); setError(null)}}
                    />
                    <input
                    className="px-2 py-3 border rounded-md border-black-100"
                    autoComplete="current-password"
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value); setError(null)}}
                    />
                </div>
                {error && <h1 className="p-3 mt-4 bg-red-200">{error}</h1>}
                {loading ? (
                    <button
                    disabled
                    className="px-2 py-3 mt-10 bg-slate-200 rounded-md flex justify-center items-center"
                    >
                    <Loading /> Sign Up
                    </button>
                ) : (
                    <button
                    className="px-2 py-3 mt-10 bg-blue-400 rounded-md"
                    onClick={handleSignup}
                    >
                    Sign Up
                    </button>
                )}
                </form>
                <p className="p-2 text-center">
                Already have an account?{" "}
                <Link className="border-b-2 border-purple" to={"/login"}>
                    Login
                </Link>
                </p>
            </div>
        </Fragment>

    )
}

export default Signup;