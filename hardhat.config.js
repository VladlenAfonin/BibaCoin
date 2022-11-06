/** @type import('hardhat/config').HardhatUserConfig */

require("@nomiclabs/hardhat-waffle");
require("@nomiclabs/hardhat-ethers");
require("dotenv").config();

const privateKey = process.env.PRIVATE_KEY;
const endpoint = process.env.URL;

module.exports = {
    solidity: "0.8.0",
    networks: {
        sepolia: {
            url: endpoint,
            accounts: [`0x${privateKey}`]
        }
    }
};
