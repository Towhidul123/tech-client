import { FaYoutube } from "react-icons/fa";
import { FaXTwitter } from "react-icons/fa6";
import { FaFacebook } from "react-icons/fa";
const Footer = () => {
    return (
        <>
           
                <footer className="mt-5 footer p-10 bg-base-200 text-base-content">
                    <aside className="justify-center items-center">
                        <img src="icon.png" alt="" />
                        <h2 className="font-cust font-semibold text-xs md:font-bold md:text-xl flex items-center justify-center">TechFusion</h2>
                    </aside>
                    <nav>
                        <header className="footer-title">Follow Us</header>
                        <div className="flex gap-2">
                            <FaYoutube />
                            <FaXTwitter />
                            <FaFacebook />
                        </div>

                    </nav>
                    <nav>
                        <header className="footer-title">Contact Us</header>
                        <h2>
                            36 Sonargaon Janapath <br /> 2nd Floor, Sector 9 <br /> Uttara
                            <br />Tel: +8801755516969
                        </h2>
                    </nav>

                </footer>
                <div className="footer text-center items-center justify-center bg-base-200 text-base-content">
                    <h2>Copyright © 2023, TechFusion, All Rights Reserved</h2>
                </div>
           
        </>
    );
};

export default Footer;