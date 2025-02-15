'use client'
import { useState, FormEvent } from "react";
import fetchDogsApi from "@/data/fetchDogsApi";
import { useRouter } from 'next/navigation';

export default function Login() {


    const [name, setName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [loading, setLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    // const [successMessage, setSuccessMessage] = useState<string | null>(null);

    const router = useRouter();

    const handleLogin = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        if (!name || !email) {
            setError('You must enter a name and email to continue.');
            setLoading(false);
            return;
        }
        const fetchData = async () => {
            try {
                const response = await fetchDogsApi('/auth/login', 'POST', { name: name, email: email});
                if (!response.ok) {
                    const errorData = await response.json();
                    throw new Error(errorData.message || response.statusText);
                }
            } catch (error) {
                setError('There was an issue logging in! Be sure you enter a valid email address format (name@email.com).')
            } finally {
                setLoading(false);
                router.push(`/dogs`);
            }
        };
        fetchData();
    };

    return (
        <>
            <form className="form" onSubmit={handleLogin}>
                <h1>Login to see who's at your doggy door.</h1>
                {!error ? null :
                    <div className="error-message">
                        <p>{error}</p>
                    </div>
                }
                {/* <p style={{ background: 'red' }}>{error}</p> */}
                {/* <p style={{ background: 'green' }}>{successMessage}</p> */}
                <input
                    className="input-field"
                    type="text"
                    value={name}
                    placeholder="Enter Your Name"
                    onChange={(e) => setName(String(e?.target.value))}
                />
                <input
                    className="input-field"
                    type="email"
                    value={email}
                    placeholder="Enter Your Email"
                    onChange={(e) => setEmail(String(e?.target.value))}
                />
                <button type="submit" disabled={loading}>
                    {loading ? 'Logging in...' : 'Login'}
                </button>
            </form>
        </>
    )
}

