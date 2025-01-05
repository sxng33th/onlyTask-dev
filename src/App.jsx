import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./common/header/header";
import Todo from "/src/pages/todo/todo.js";
import Profile from "/src/pages/profile/profile.js";

export default function App() {
    return (
        <div>
            <BrowserRouter>
                <Header />
                <Routes>
                   <Route path="/" element={<Todo />} />
                    <Route path="/profile" element={<Profile />}/>
                </Routes>
            </BrowserRouter>
        </div>
    );
}
