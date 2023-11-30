import { Link } from "react-router-dom";


const Error = () => {
    return (
        <div className="text-center relative ">
            <div className="absolute ">
                <Link to='/'>
                    <button className="btn btn-accent">Back to Home</button>
                </Link>
            </div>


            <div>
            <img src="https://i.ibb.co/QQVVmQV/1581099611064.jpg" alt="" />
       
            </div>
        </div>
    );
};

export default Error;