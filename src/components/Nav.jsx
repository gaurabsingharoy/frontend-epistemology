import { Link } from "react-router-dom"

const Nav = () => {
    return (
        <header className="py-2 sticky-top border-bottom bg-light" style={{ backgroundColor: "", zIndex: 1030 }}>
            <nav>
                <div className="container">
                    <Link className="logo" to="/">epistemology.com</Link>
                </div>
            </nav>
        </header>

    )
}

export default Nav