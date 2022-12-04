const {expect} = require("chai");
const {BigNumber} = require("ethers");

function getSampleFriend(addr) {
    return {
        addr: addr,
        isMarried: true,
        salary: BigNumber.from(100),
        age: 100000,
    };
}

describe("BibaCoin", function () {
    let totalSupply = '10000000000000000000000';
    let token;
    let bibaCoin;
    let owner;
    let addr1;
    let addr2;
    let addrs;
    let sampleFriend;

    beforeEach(async function() {
        token = await ethers.getContractFactory("BibaCoin");

        [owner, addr1, addr2, ...addrs] = await ethers.getSigners();

        bibaCoin = await token.deploy(totalSupply);

        sampleFriend = getSampleFriend(owner.address);
    });

    describe("Friends", function() {
        it("Should emit change", async function() {
            await expect(bibaCoin.setFriend(addr2.address, sampleFriend))
                .to.emit(bibaCoin, "FriendChanged")
                .withArgs(addr2.address);
        });

        it("Should set mapping value", async function() {
            await bibaCoin.setFriend(addr1.address, sampleFriend);

            let x = await bibaCoin.getFriend(addr1.address);

            expect(x.addr).to.equal(owner.address)
        });

        it("Should get mapping value", async function() {
            let biba = await bibaCoin.getFriend(owner.address);

            // I don't know what to expect :(
        });
    });

    describe("Deployment", function() {
        it("Should assign the total supply of coins to the owner", async function () {
            const ownerBalance = await bibaCoin.balanceOf(owner.address);
            expect(await bibaCoin.totalSupply()).to.equal(ownerBalance);
        });
    });

    describe("Transactions", function() {
        it("Should transfer coins between accounts", async function () {
            // Transfer 50 coins from owner to addr1
            await bibaCoin.transfer(addr1.address, 50);
            const addr1Balance = await bibaCoin.balanceOf(addr1.address);
            expect(addr1Balance).to.equal(50);

            // Transfer 50 coins from addr1 to addr2
            // We use .connect(signer) to send a transaction from another account
            await bibaCoin.connect(addr1).transfer(addr2.address, 50);
            const addr2Balance = await bibaCoin.balanceOf(addr2.address);
            expect(addr2Balance).to.equal(50);
        });

        it("Should fail if sender doesn’t have enough coins", async function() {
            const initialOwnerBalance = await bibaCoin.balanceOf(owner.address);

            // Try to send 1 coin from addr1 (0 coins) to owner (1000000 coins).
            // `require` will evaluate false and revert the transaction.
            await expect(
                bibaCoin.connect(addr1).transfer(owner.address, 1)
            ).to.be.revertedWith("ERC20: transfer amount exceeds balance");

            // Owner balance shouldn't have changed.
            expect(await bibaCoin.balanceOf(owner.address)).to.equal(
                initialOwnerBalance
            );
        });
    });
});
