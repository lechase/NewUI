import React, { useRef, useState, useEffect } from "react";
import "./Login_SignUp.css";

import { OtpInput } from "reactjs-otp-input";

import GoogleSvg from "../../Asset/GoogleSvg";
export default function Login_SignUp({ onClose, isOpen }) {
  const [formData, setFormData] = useState({});
  const containerRef = useRef(null);
  const [step, setStep] = useState(0);
  const [otp, setOtp] = useState("");

  useEffect(() => {
    const handleOutsideClick = (event) => {
      if (
        containerRef.current &&
        !containerRef?.current.contains(event.target)
      ) {
        if (onClose) {
          isOpen && onClose();
        }
      }
    };

    if (isOpen) {
      document.addEventListener("click", handleOutsideClick);
    }

    return () => {
      document.removeEventListener("click", handleOutsideClick);
    };
  }, [containerRef, isOpen]);

  const handleSlideOnClick = (type) => {
    if (type === "login") {
      containerRef.current.classList.remove("right-panel-active");
      setFormData({});
    } else {
      containerRef.current.classList.add("right-panel-active");
      setFormData({});
    }
  };
  const handleChange = (e) => {
    const { name, value, checked } = e.target;

    setFormData({ ...formData, [name]: value });
  };

  const onSignSubmit = async (e) => {
    e?.preventDefault();
    try {
      let response = await fetch("http://13.51.4.167/api/login/", {
        method: "POST", // or 'PUT'
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData }),
      });

      if (response.status === 200) {
        let data = await response.json();
        console.log("kfkjdkj", data);
        onClose();
        localStorage.setItem("token", data?.access_token);
        localStorage.setItem("refreshToken", data?.refresh_token);
        localStorage.setItem(
          "fullName",
          `${data?.user?.firstName} ${data?.user?.lastName}`
        );
        localStorage.setItem("email", data?.user?.email);
        // handleSlideOnClick("login");
      }
    } catch (error) {
      console.log("error", error);
    }

    console.log("formData", formData);
  };
  const onSignUpSubmit = async (e) => {
    e?.preventDefault();
    try {
      let response = await fetch("http://13.51.4.167/api/login/", {
        method: "POST", // or 'PUT'
        headers: {
          accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...formData, birthTime: "11:11" }),
      });

      if (response.status === 201) {
        let data = await response.json();
        console.log("data", data);
        handleSlideOnClick("login");
        setStep(1);
      }
    } catch (error) {
      console.log("error", error);
    }

    console.log("formData", formData);
  };

  const onVerify = async (e) => {
    e.preventDefault();

    if (step == 0) {
      try {
        let response = await fetch("http://13.51.4.167/otp/send-otp/", {
          method: "POST", // or 'PUT'
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData?.Email }),
        });

        if (response.status === 200) {
          let data = await response.json();
          console.log("data", data);
          // handleSlideOnClick("login");
          setStep(1);
        }
      } catch (error) {
        console.log("error", error);
      }
    } else {
      try {
        let response = await fetch("http://13.51.4.167/otp/verify-otp/", {
          method: "POST", // or 'PUT'
          headers: {
            accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ email: formData?.Email, otp: otp }),
        });

        if (response.status === 200) {
          let data = await response.json();
          console.log("data", data);
          // handleSlideOnClick("login");
          setStep(2);
        }
      } catch (error) {
        console.log("error", error);
      }
    }
  };
  if (!isOpen) return null;

  return (
    <>
      <div className="login-signup-container">
        <div
          ref={containerRef}
          className={`Login-container`}
          id="login-container"
        >
          <div class="signup-form-container sign-up-container">
            {(step == 0 || step == 1) && (
              <form className="signup-form" action="#">
                <h1 className="signup-heading">Create Account</h1>
                <div class="social-container">
                  <a href="#" class="social signup-a">
                    <GoogleSvg width={"20px"} height={"20px"} />
                  </a>
                </div>
                <span className="signup-span">
                  or use your email for registration
                </span>
                <input
                  className="signup-input"
                  type="email"
                  placeholder="Email"
                  name="Email"
                  onChange={handleChange}
                />
                <div className="">
                  {step == 1 && (
                    <OtpInput
                      inputStyle={{
                        width: "80%",
                        height: "40px",
                        marginTop: "24px",
                        marginBottom: "20px",
                      }}
                      value={otp}
                      onChange={(e) => {
                        setOtp(e);
                      }}
                      numInputs={6}
                      separator={<span>-</span>}
                    />
                  )}
                </div>

                <button className="signup-button" onClick={onVerify}>
                  {step == 0 ? "Verify Email " : "Verify OTP"}
                </button>
              </form>
            )}
            {step == 2 && (
              <form className="signup-form" action="#">
                <h1 className="signup-heading">Create Account</h1>
                <div class="social-container">
                  <a href="#" class="social signup-a">
                    <GoogleSvg width={"20px"} height={"20px"} />
                  </a>
                </div>
                <span className="signup-span">
                  or use your email for registration
                </span>
                <input
                  className="signup-input"
                  type="text"
                  placeholder="Enter first name"
                  name="firstName"
                  onChange={handleChange}
                />
                <input
                  className="signup-input"
                  type="text"
                  placeholder="Enter last name"
                  name="lastName"
                  onChange={handleChange}
                />
                <input
                  className="signup-input"
                  type="text"
                  placeholder="Enter Birth place"
                  name="birthPlace"
                  onChange={handleChange}
                />
                <input
                  className="signup-input"
                  type="datetime-local"
                  placeholder="Enter date and time"
                  name="dob"
                  onChange={handleChange}
                />

                <input
                  className="signup-input"
                  type="password"
                  placeholder="******"
                  name="password"
                  onChange={handleChange}
                />
                <div className="signup-radio-input-container">
                  <div className="signup-radio-input-container">
                    <input
                      type="radio"
                      name="gender"
                      value={"Male"}
                      id="gender-1"
                      onChange={handleChange}
                    />
                    <label for="gender-1" style={{ marginLeft: "10px" }}>
                      Male
                    </label>
                  </div>
                  <div className="signup-radio-input-container">
                    <input
                      type="radio"
                      name="gender"
                      value={"Female"}
                      id="gender-2"
                      onChange={handleChange}
                    />
                    <label for="gender-2" style={{ marginLeft: "10px" }}>
                      Female
                    </label>
                  </div>
                  <div className="signup-radio-input-container">
                    <input
                      type="radio"
                      name="gender"
                      id="gender-3"
                      value={"Other"}
                      onChange={handleChange}
                    />
                    <label for="gender-3" style={{ marginLeft: "10px" }}>
                      Other
                    </label>
                  </div>
                </div>
                <button className="signup-button" onClick={onSignUpSubmit}>
                  Sign Up
                </button>
              </form>
            )}
          </div>
          <div class="signup-form-container sign-in-container ordering_1">
            <form className="signup-form" action="#">
              <h1 className="signup-heading">Sign in</h1>
              <div class="social-container">
                <a href="#" class="social signup-a">
                  <GoogleSvg width={"20px"} height={"20px"} />
                </a>
              </div>
              <span className="signup-span">or use your account</span>
              <input
                className="signup-input"
                type="email"
                placeholder="Email"
                name="email"
                onChange={handleChange}
              />
              <input
                className="signup-input"
                type="password"
                placeholder="Password"
                name="password"
                onChange={handleChange}
              />
              <a className="signup-a" href="#">
                Forgot your password?
              </a>
              <button className="signup-button" onClick={onSignSubmit}>
                Sign In
              </button>
            </form>
          </div>
          <div class="overlay-container ordering_1">
            <div class="overlay">
              <div class="overlay-panel overlay-left">
                <h1 className="signup-heading">Welcome Back!</h1>
                <p className="signup-para">
                  To keep connected with us please login with your personal info
                </p>
                <button
                  class="ghost signup-button"
                  id="signIn"
                  onClick={() => {
                    handleSlideOnClick("login");
                  }}
                >
                  Sign In
                </button>
              </div>
              <div class="overlay-panel overlay-right">
                <h1 className="signup-heading">Hello, Friend!</h1>
                <p className="signup-para">
                  Enter your personal details and start journey with us
                </p>
                <button
                  class="ghost signup-button"
                  id="signUp"
                  onClick={() => {
                    handleSlideOnClick("signup");
                  }}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
