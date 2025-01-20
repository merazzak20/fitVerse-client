import React from "react";
import Container from "../../Container";
import footerBg from "../../../assets/footer.jpg";
import { FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import logo from "../../../assets/logo.png";

const Footer = () => {
  return (
    <div
      style={{
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.8), rgba(0, 0, 0, 0.7)), url(${footerBg})`,
        backgroundPosition: "center",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat",
      }}
      className="bg-black py-5 mt-14"
    >
      <Container>
        <footer className="footer text-neutral-content p-10 md:grid-cols-3">
          <aside>
            <h2 className="text-4xl font-bold">
              {/* Fit<span className="text-orange-500">Verse</span> */}
              <img className="w-52" src={logo} alt="" />
            </h2>
            <p className="w-11/12 text-justify">
              We provide state-of-the-art equipment, advanced fitness
              technology, and personalized training programs tailored to your
              unique needs.
            </p>
          </aside>

          <nav className="text-center">
            <h6 className="footer-title">Company</h6>
            <a className="link link-hover">About us</a>
            <a className="link link-hover">Trainers</a>
            <a className="link link-hover">Classes</a>
            <a className="link link-hover">Forums</a>
          </nav>
          <nav>
            <h6 className="footer-title">Social</h6>
            <div className="grid grid-flow-col gap-4">
              <a href="https://www.facebook.com">
                <FaFacebook className="text-3xl"></FaFacebook>
              </a>
              <a href="https://www.twitter.com">
                <FaTwitter className="text-3xl"></FaTwitter>
              </a>
              <a href="https://www.instagram.com">
                <FaInstagram className="text-3xl"></FaInstagram>
              </a>
            </div>
          </nav>
        </footer>
        <div className="divider border-orange-500 border-t-2"></div>
        <footer className="footer footer-center text-neutral-content p-4">
          <aside>
            <p>
              Copyright © {new Date().getFullYear()} - All right reserved by
              <span className="text-orange-500 font-semibold">
                {" "}
                Abdur Razzak
              </span>
            </p>
          </aside>
        </footer>
      </Container>
    </div>
  );
};

export default Footer;
