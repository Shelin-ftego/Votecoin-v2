// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0; // specification of compiler

contract Election{

/***********************************************************************STATE VARIABLES**********************************************************************/

    address public contractOwner; // address of the owner of the smart contract (IEC)
    
    bool public isVotingOpen; // status of election

    uint public totalVotes; // total votes cast during election

    event voteEvent(address indexed _voter, uint _candidateIndex); // vote event log

    mapping(address => Voter) public voters; // hashmap of voters addresses

    Candidate[] public candidates; // array of candidates

/***********************************************************************CONSTRUCTOR**********************************************************************/
    
    constructor() public{ // constructor
        contractOwner = msg.sender; // sets caller to owner of contract
        totalVotes = 0;
    }    

    modifier adminOnly(){ // function to require special permission
        require(msg.sender == contractOwner, "Requires administrator priviledges!"); // requires contract owner to request function call
        _; // if *require* is achieved, executes rest of code
    }    

/****************************************************************CANDIDATE/VOTER STRUCTURE***************************************************************/    
    
    struct Candidate{
        uint id;    // candidate id
        string name; // name of candidate
        uint votesReceived; // number of votes candidate received
    }
    
    struct Voter{
        bool voted; // checks if voter has voted
        uint vote; // candidate voter has voted
    }

/**********************************************************************WRITE FUNCTIONS***********************************************************************/

    function addCandidate(string memory _name) adminOnly public{
        require(!isVotingOpen, "Cannot add candidates after voting has begun!"); // requires voting to be closed
        candidates.push(Candidate(candidates.length, _name, 0)); // adds the candidate onto the candidate array, by default 0 votes
    }

    function endElection() adminOnly public{ // ends the contract and election
        isVotingOpen = false;
    }    
    
    function startElection() adminOnly public{ // begins the election
        isVotingOpen = true;
    }

    function vote(uint _candidateIndex) public{ // function for the user to vote
        require(isVotingOpen, "Cannot vote before voting period has begun!"); // requires voting to be open
        require(!voters[msg.sender].voted, "Already voted!"); // voter *MUST NOT* have voted
        require(_candidateIndex >= 0, "Invalid candidate!"); // requires valid candidateID
        
        voters[msg.sender].vote = _candidateIndex; // sets candidate voted for
        voters[msg.sender].voted = true; // changes voter's status to have voted
        candidates[_candidateIndex].votesReceived += 1; // increments candidate's vote tally
        totalVotes += 1; // increments total votes in election

        emit voteEvent(msg.sender, _candidateIndex); // vote event
    }

/********************************************************************READ-ONLY FUNCTIONS*********************************************************************/

    function getCandidate(uint _candidateIndex) public view returns (uint id, string memory name, uint votesReceived){
        require(_candidateIndex >= 0, "Invalid candidate!"); // requires valid candidateID
        return (candidates[_candidateIndex].id, candidates[_candidateIndex].name, candidates[_candidateIndex].votesReceived);
    }
    
    function getCandidateVotes(uint _candidateIndex) public view returns (uint){ // returns number of votes for candidate, read only function (zero fees)
        require(!isVotingOpen, "Cannot see candidate's votes until end of voting period!"); // requires voting to be closed
        require(_candidateIndex >= 0, "Invalid candidate!"); // requires valid candidateID
        return candidates[_candidateIndex].votesReceived; // returns candidate's vote tally
    }

    function getNumofCandidates() public view returns (uint){ // returns number of candidates, read only function (zero fees)
        return candidates.length;
    }
    
    function getWinnerCandidate() public view returns (uint id, string memory name, uint votesReceived){ // returns winning candidate's details, read only function (zero fees)
        require(!isVotingOpen, "Cannot display winner until end of voting period!"); // requires voting to be closed

        uint winnersVotes = 0;
        uint _candidateIndex = 0;
        
        for (uint i = 0; i < candidates.length; i++) {
            if (candidates[i].votesReceived > winnersVotes) {
                winnersVotes = candidates[i].votesReceived;
                _candidateIndex = i;
            }
        }

        return (candidates[_candidateIndex].id, candidates[_candidateIndex].name, candidates[_candidateIndex].votesReceived);
    }
    
    function verifyVote(address _voter) public view returns (string memory){ // verify's users vote
        uint id = voters[_voter].vote;
        return candidates[id].name;
    }
}

/********************************************************************END*********************************************************************/