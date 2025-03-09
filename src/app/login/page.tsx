"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import "./styles.css";
import Navbar from "../(Landing-Page)/NavBar";
import Image from "next/image";
import { LoginLink } from "@kinde-oss/kinde-auth-nextjs/components";

const Login: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState('');

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  return (
    <>
      <Navbar />
      <div className="container">
        <div className="form-box login">
          <form action="#">
            <h1>Login</h1>
            <div className="input-box">
              <input type="email" placeholder="Email" required value={email} onChange={handleEmailChange} />
              <i className="bx bxs-user" />
            </div>
            <LoginLink
              authUrlParams={{
                connection_id: process.env.KINDE_CONNECTION_PASSWORDLESS_EMAIL || '',
                login_hint: email,
              }}
            >
              <button type="button" className="btn">
                Login
              </button>
            </LoginLink>
            <p>or login with social platforms</p>
            <div className="social-icons">
              <LoginLink authUrlParams={{ connection_id: process.env.KINDE_CONNECTION_GOOGLE || '' }}>
                <Image src={"/google-brands.svg"} width="15" height="15" alt="google" className="dark:invert" />
              </LoginLink>
              <LoginLink authUrlParams={{ connection_id: process.env.KINDE_CONNECTION_APPLE || "" }}>
                <Image src={"/apple-brands.svg"} width="15" height="15" alt="apple" className="dark:invert" />
              </LoginLink>
              <LoginLink authUrlParams={{ connection_id: process.env.KINDE_CONNECTION_GITHUB || "" }}>
                <Image src={"/github-brands.svg"} width="15" height="15" alt="github" className="dark:invert" />
              </LoginLink>
              <LoginLink authUrlParams={{ connection_id: process.env.KINDE_CONNECTION_LINKEDIN || "" }}>
                <Image src={"/linkedin-brands.svg"} width="15" height="15" alt="linkedin" className="dark:invert" />
              </LoginLink>
            </div>
          </form>
        </div>
        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Do not have an account?</p>
            <button className="btn register-btn" onClick={() => router.push("/signup")}>
              Register
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;