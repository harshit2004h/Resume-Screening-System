"use client";
import React, { useState } from "react";
import "./styles.css";
import Navbar from "../(Landing-Page)/NavBar";
import Image from "next/image";
import Link from "next/link";

const Login = () => {
  const [isActive, setIsActive] = useState(true);

  return (
    <>
      <Navbar />
      <div className={`container ${isActive ? "active" : ""}`}>
        <div className="form-box login">
          <form action="#">
            <h1>Login</h1>
            <div className="input-box">
              <input type="text" placeholder="Username" required />
              <i className="bx bxs-user" />
            </div>
            <div className="input-box">
              <input type="password" placeholder="Password" required />
              <i className="bx bxs-lock-alt" />
            </div>
            <div className="forgot-link">
              <Link href="#">Forgot Password?</Link>
            </div>
            <button type="submit" className="btn">
              Login
            </button>
            <p>or login with social platforms</p>
            <div className="social-icons">
              <Link href="#">
                <Image
                  className="dark:invert bx bxl-google"
                  src={"/google-brands.svg"}
                  width="15"
                  height="15"
                  alt="google"
                ></Image>
              </Link>
              <Link href="#">
                <Image
                  className="dark:invert bx bxl-github"
                  src={"/github-brands.svg"}
                  width="15"
                  height="15"
                  alt="google"
                ></Image>
              </Link>
              <Link href="#">
                <Image
                  className="dark:invert bx bxl-linkedin"
                  src={"/linkedin-brands.svg"}
                  width="15"
                  height="15"
                  alt="google"
                ></Image>
              </Link>
            </div>
          </form>
        </div>
        <div className="form-box register">
          <form action="#">
            <h1>Sign Up</h1>
            <div className="input-box">
              <input type="text" placeholder="Username" required />
              <i className="bx bxs-user" />
            </div>
            <div className="input-box">
              <input type="email" placeholder="Email" required />
              <i className="bx bxs-envelope" />
            </div>
            <div className="input-box">
              <input type="password" placeholder="Password" required />
              <i className="bx bxs-lock-alt" />
            </div>
            <button type="submit" className="btn">
              Register
            </button>
            <p>or register with social platforms</p>
            <div className="social-icons">
              <Link href="#">
                <Image
                  className="dark:invert bx bxl-google"
                  src={"/google-brands.svg"}
                  width="15"
                  height="15"
                  alt="google"
                ></Image>
              </Link>
              <Link href="#">
                <Image
                  className="dark:invert bx bxl-github"
                  src={"/github-brands.svg"}
                  width="15"
                  height="15"
                  alt="google"
                ></Image>
              </Link>
              <Link href="#">
                <Image
                  className="dark:invert bx bxl-linkedin"
                  src={"/linkedin-brands.svg"}
                  width="15"
                  height="15"
                  alt="google"
                ></Image>
              </Link>
            </div>
          </form>
        </div>
        <div className="toggle-box">
          <div className="toggle-panel toggle-left">
            <h1>Hello, Welcome!</h1>
            <p>Do not have an account?</p>
            <button
              className="btn register-btn"
              onClick={() => setIsActive(true)}
            >
              Register
            </button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Welcome Back!</h1>
            <p>Already have an account?</p>
            <button
              className="btn login-btn"
              onClick={() => setIsActive(false)}
            >
              Login
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
