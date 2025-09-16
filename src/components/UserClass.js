
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
        const {name, avatar_url} = this.state.userInfo;
        return (<div>
            <p className="bg-blend-color-dodge"> my name is {name}</p>
            <p> <img src={avatar_url}></img></p>
        </div>)
    }
}

export default UserClass;