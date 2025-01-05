import { Link } from "react-router-dom";


export default function Header() {
    return (
     
            <div className="p-10 flex justify-between mx-10">
                <div>
                    <Link to="/">
                    <div className="flex items-center  ">
                    <img src="/logo.png" alt="logo" className="w-14" />
                    <h1 className="text-3xl font-bold text-center text-slate-300">OnlyTask</h1>
                    </div>
                    </Link>
                </div>

                <div className=" text-slate-100">
                    <Link to="/profile" className="btn btn-secondary">
                        Profile
                    </Link>
                </div>
            </div>

    );
}
