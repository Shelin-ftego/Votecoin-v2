import React, {useState, useEffect, Component} from 'react';
import NavbarA from '../NavbarA';

// web3 imports
import ElectionContract from "../../contracts/Election.json";
import getWeb3 from "../../getWeb3";

class ElectionS extends Component{

    // states + web3 states
    state = { web3: null, accounts: null, contract: null, status: null };

    // web3 initialization
    componentDidMount = async () => {
        try {
          // Get network provider and web3 instance.
          const web3 = await getWeb3();
    
          // Use web3 to get the user's accounts.
          const accounts = await web3.eth.getAccounts();
    
          // Get the contract instance.
          const networkId = await web3.eth.net.getId();
          const deployedNetwork = ElectionContract.networks[networkId];
          const instance = new web3.eth.Contract(
            ElectionContract.abi,
            deployedNetwork && deployedNetwork.address,
          );
    
          console.log(networkId);
          console.log(deployedNetwork.address);
          console.log(ElectionContract.abi);
          
          // Set web3, accounts, and contract to the state, and then proceed with an
          // example of interacting with the contract's methods.
          this.setState({ web3, accounts, contract: instance }, this.fetchStatus);
        } catch (error) {
          // Catch any errors for any of the above operations.
          alert(
            `Failed to load web3, accounts, or contract. Check console for details.`,
          );
          console.error(error);
        }
      };
    
      fetchStatus = async () => {
        const { accounts, contract } = this.state;
    
        // check the election status on smart contract
        const response = await contract.methods.isVotingOpen().call();

        // update state with status of election
        if (response == true){
            this.setState({ status: "Open" });
        }else{
            this.setState({ status: "Closed" });
        }    
      };

      // starts election on smart contract
      start = async () => {
        const { accounts, contract } = this.state;
        await contract.methods.startElection().send({ from: accounts[0] });
      };

      // stops election on smart contract
      stop = async () => {
        const { accounts, contract } = this.state;
        await contract.methods.endElection().send({ from: accounts[0] });
      };

    handleStartSubmit = event => {
        event.preventDefault()
        console.log("start")
        this.start() // call start function
        };

    handleStopSubmit = event => {
        event.preventDefault()
        console.log("stop")
        this.stop() // call stop function
        };


    render(){
    return (
        <div>
            <NavbarA/>
        <h1> VOTING STATUS: {this.state.status}</h1>
        <button onClick={this.handleStartSubmit}>Start Voting Period</button>
        <button onClick={this.handleStopSubmit}>End Voting Period</button>
        </div>
    )
    }

}

export default ElectionS