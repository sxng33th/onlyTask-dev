import { BrowserRouter as Router, Link } from "react-router-dom";

export default function Header() {
    return (
        <Router>
            <div className="p-10 flex justify-between mx-10">
                <div>
                    <h1 className="text-3xl font-bold text-center text-slate-300">Only Task</h1>
                </div>

                <div className=" text-slate-100">
                    <Link to="/profile" className="btn btn-secondary">
                        Profile
                    </Link>
                </div>
            </div>
        </Router>
    );
}
