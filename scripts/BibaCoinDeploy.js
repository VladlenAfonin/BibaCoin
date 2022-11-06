const hre = require("hardhat");

async function main() {
    const BibaCoin = await hre.ethers.getContractFactory("BibaCoin");
    console.log('Deploying BibaCoin...');
    const token = await BibaCoin.deploy('10000000000000000000000');

    await token.deployed();
    console.log("BibaCoin deployed to:", token.address);
}

main()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });
