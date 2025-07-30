import { Link } from "react-router-dom";
import Moose from "./Moose";

export default function NotFound() {
  return (
    <div>
      <Moose text="Ooops!! Looks like you page you tried to open is not in our system..." />

      <div className="moose-fact">
        <h2>Let's get you back home!</h2>
        <Link to="/home">Home</Link>
      </div>
    </div>
  );
}
