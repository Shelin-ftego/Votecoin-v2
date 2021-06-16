var Election = artifacts.require("Election");

module.exports = function(deployer){
    deployer.deploy(Election, "UKZN 2021 Elections");
};