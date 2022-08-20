import { Link } from "react-router-dom";
import "./styles.css";

export default function NavBar() {
  return (
    <nav className="nav">
      <Link to="/" className="site-title">
        Simple Calculator
      </Link>
      {/* <ul>
            <CustomLink to="/calculator">Main</CustomLink>
            <CustomLink to="/manage-licence">Manage Licence</CustomLink>
        </ul> */}
    </nav>
  );
}

// function CustomLink({to,children,...props}){
//     //const path=window.location.pathname;
//     return (
//         <li>
//             <Link to={to} {...props}>{children}</Link>
//         </li>
//     )
// }
