import "./App.css";
import React, { Component } from "react";
import axios from "axios";
import ApiArray from "./components/apiArray";
import moment from "moment";
const api = {
  baseUrl: "https://api.github.com",
  client_id: "Iv1.0cb8b730d238aeb3",
  client_secret: "d7c14f5e1f101619037f2d843f3fe62e547f8641",
};

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      githubData: [],
      isToggleOn: false,
      toggleRepo: false,
      repos: [],
    };
    this.clickOnDetails = this.clickOnDetails.bind(this);
    this.clickOnShowRepos = this.clickOnShowRepos.bind(this)
    this.userRepo = this.userRepo.bind(this)
  }
  componentDidMount() {
    axios
      .get(
        api.baseUrl +
          "/search/repositories?q=language:Java&sort=stars&page=1&client_id=" +
          api.client_id +
          "&client_secret=" +
          api.client_secret
      )
      .then((res) => {
        this.setState({ githubData: res.data.items });
      });
  }
  //step 5 ok
  async userRepo(id){
    this.setState({ repos: null})
    let hrefId = id.target.lastChild.href
    axios
    .get(
      hrefId
    ).then((res) => {
      const list = res.data.map((item)=>(
        <div className="text-center">
          <a href={item.svn_url}> Repo: {item.name}</a>
          <p> Id: {item.id}</p>
        </div>
      ))
        
      this.setState({ repos: list})
    });

  }
  clickOnDetails() {
    this.setState((prevState) => ({
      isToggleOn: !prevState.isToggleOn,
    }));
  }
  clickOnShowRepos() {
    this.setState((prevState) => ({
      toggleRepo: !prevState.toggleRepo,
    }));
  }
  render() {
    const { githubData } = this.state;
    const {repos} = this.state;
    // if(this.state.isToggleOn){
    //               console.log(this.state.isToggleOn)
    // }
    return (
      //step 3 ok
      <div>
        <div className="App">
          <div className="row">
            {githubData.map((item) => (
              <div className="card">
                <img src={item.owner.avatar_url} alt="Avatar"></img>
                <div className="container">
                  <ApiArray title="ID:" item={item.id} />
                  <ApiArray title="Login:" item={item.owner.login} />
                </div>
                <div className="detailsButton">
                  <button onClick={this.clickOnDetails}>Show details</button>
                </div>
                <div>
                  {(() => {
                    //step four ok
                    if (this.state.isToggleOn === true) {
                      return (<div> <br></br>
                        <ApiArray title="Description:" item={item.description} />
                        <ApiArray title="ID:" item={item.id} />
                        <ApiArray title="Login:" item={item.owner.login} />
                        <a href={item.owner.html_url}>{item.owner.html_url}</a>
                        <ApiArray title="Created:" item={moment(item.created_at).calendar()} />
                        <div className="repositories">
                          <button onClick={this.clickOnShowRepos}>Show Repositories</button>

                         </div>
                      </div>
                      
                      );
                    } 
                  })()}
                </div>
                <div onClick={this.userRepo}>
                {(() => {
                    if (this.state.toggleRepo === true) {
                      return (<div> Click here to display the list<br></br>
                        
                        {repos}
                        <a href={item.owner.repos_url}>{item.owner.repos_url}</a>
                      

                      </div>
                      
                      );
                    } 
                  })()}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}
export default App;
