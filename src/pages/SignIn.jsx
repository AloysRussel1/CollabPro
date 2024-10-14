// import React from 'react';
import './../assets/Css/pagesCss/SignIn.css';

const SignIn = () => {
  return (
    <div className="custom-login-page">
      <div className="custom-login-container">
        <div className="custom-welcome-section">
          <div className="custom-welcome-text">
            <h2>Welcome Back!</h2>
            <p>Sign in to continue and access your account</p>
          </div>
        </div>
        <div className="custom-signin-section">
          <h2>Sign In</h2>
          <p>Please enter your credentials to sign in</p>
          <form className="custom-form">
            <input type="email" placeholder="Email Address" className="custom-input" />
            <input type="password" placeholder="Password" className="custom-input" />
            <button className="custom-btn">CONTINUE</button>
          </form>
          <p className="custom-forgot-password">
            <a href="/forgot-password" className="forgot-link">Forgot Password?</a>
          </p>
          <p className="custom-alt-action">
            Don't have an account? <a href="/register" className="alt-link">Sign up here</a>
          </p>
          <p className="custom-social-text">or Connect with Social Media</p>
          <div className="custom-social-buttons">
            <button className="custom-google-btn">Sign In With Google</button>
            <button className="custom-facebook-btn">Sign In With Facebook</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
