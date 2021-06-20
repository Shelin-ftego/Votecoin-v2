// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0; // specification of compiler

contract Election{

/***** STATE VARIABLES *****/

    address public contractOwner; // address of the owner of the smart contract (IEC)
    
    bool public isVotingOpen; // status of election

    uint public totalVotes; // total votes cast during election

    event voteEvent(address indexed _voter, uint _candidateIndex); // vote event log

    mapping(address => Voter) public voters; // hashmap of voters addresses

    Candidate[] public candidates; // array of candidates

/***** CONSTRUCTOR *****/

    constructor() public{ // constructor
        contractOwner = msg.sender; // sets caller to owner of contract
        totalVotes = 0;
    }    

    modifier adminOnly(){ // function to require special permission
        require(msg.sender == contractOwner, "Requires administrator priviledges!"); // requires contract owner to request function call
        _; // if *require* is achieved, executes rest of code
    }    

/***** CANDIDATE/VOTER STRUCTURE *****/    
    
    struct Candidate{
        uint id;    // candidate id
        string name; // name of candidate
        uint votes; // number of votes candidate received
    }
    
    struct Voter{
        bool hasVoted; // checks if voter has voted
        uint cVoted; // candidate voter has voted
    }

/***** WRITE FUNCTIONS (COST GAS FEES) *****/

    function addCandidate(string memory _name) adminOnly public{ // add candidate to array
        require(!isVotingOpen, "Cannot add candidates after voting has begun!"); // requires voting to be closed
        candidates.push(Candidate(candidates.length, _name, 0)); // adds the candidate onto the candidate array, by default 0 votes
    }

    function endElection() adminOnly public{ // ends the contract and election
        isVotingOpen = false;
    }    
    
    function startElection() adminOnly public{ // begins the election
        isVotingOpen = true;
    }

    function vote(uint _idx) public{ // function for the user to vote
        require(isVotingOpen, "Cannot vote before voting period has begun!"); // requires voting to be open
        require(!voters[msg.sender].hasVoted, "Already voted!"); // voter *MUST NOT* have voted
        require(_idx >= 0, "Invalid candidate!"); // requires valid candidateID
        
        voters[msg.sender].cVoted = _idx; // sets candidate voted for
        voters[msg.sender].hasVoted = true; // changes voter's status to have voted
        candidates[_idx].votes += 1; // increments candidate's vote tally
        totalVotes += 1; // increments total votes in election

        emit voteEvent(msg.sender, _idx); // vote event
    }

/***** READ-ONLY FUNCTIONS (ZERO GAS FEES) *****/

    function getCandidate(uint _idx) public view returns (uint id, string memory name, uint votes){ // returns candidate's details
        require(_idx >= 0, "Invalid candidate!"); // requires valid candidateID
        return (candidates[_idx].id, candidates[_idx].name, candidates[_idx].votes);
    }
    
    function getCandidateVotes(uint _idx) public view returns (uint votes){ // returns number of votes for candidate
        require(!isVotingOpen, "Cannot see candidate's votes until end of voting period!"); // requires voting to be closed
        require(_idx >= 0, "Invalid candidate!"); // requires valid candidateID
        return candidates[_idx].votes; // returns candidate's vote tally
    }

    function getNumofCandidates() public view returns (uint){ // returns number of candidates
        return candidates.length;
    }
    
    function getWinnerCandidate() public view returns (uint id, string memory name, uint votes){ // returns winning candidate's details
        require(!isVotingOpen, "Cannot display winner until end of voting period!"); // requires voting to be closed

        uint wVotes = 0; // temporary winner's votes
        uint idx = 0; // candidate index
        
        for (uint i = 0; i < candidates.length; i++) {
            if (candidates[i].votes > wVotes) {
                idx = i;
                wVotes = candidates[i].votes;
            }
        }

        return (candidates[idx].id, candidates[idx].name, candidates[idx].votes);
    }
    
    function verifyVote(address _voter) public view returns (string memory){ // returns canididate name that address voted for
        uint id = voters[_voter].cVoted;
        return candidates[id].name;
    }
} // END OF CONTRACT