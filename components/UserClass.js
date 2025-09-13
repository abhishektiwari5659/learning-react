
import React from "react";
class UserClass extends React.Component{
    constructor(props){
        super(props)
        this.state = {
            userInfo: {
                name: "test",
                location: "test"
            }
        }
    }

    async componentDidMount(){
        const data = await fetch("https://api.github.com/users/abhishektiwari5659");
        const json = await data.json();

        this.setState({
            userInfo: json
        })
        console.log(json);
    }

    render(){
        const {name, location} = this.state.userInfo;
        return (<div>
            <p> my name is {name}</p>
            <p> my location is {location}</p>
        </div>)
    }
}

export default UserClass;