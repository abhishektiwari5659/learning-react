import User from "./User";
import UserClass from "./UserClass.js";
const About = () => {
    return (
        <div>
            <p> its my react prroject</p>
            
            <UserClass name={"abhi"} location={"Mumbai"}/>
            <UserClass name={"test"} location={"Mumbai"}/>
        </div>
    )
}

export default About;