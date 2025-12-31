import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";
import { Contract } from "ethers";

/**
 * Deploys a challenge solution contract
 *
 * @param hre HardhatRuntimeEnvironment object.
 */
const deployChallengeSolution: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  // This is the deployer account:
  // - localhost: hardhat account 0
  // - live network: encrypted PK in .env file (use `yarn generate` to generate one or `yarn account:import` to import your own PK)
  //
  const { deployer } = await hre.getNamedAccounts();
  const { deploy } = hre.deployments;
  const s1c2 = await hre.ethers.getContract<Contract>("Season1Challenge2", deployer);

  await deploy("Season1Challenge2Solution", {
    from: deployer,
    args: [await s1c2.getAddress()],
    log: true,
    autoMine: true,
  });

  const s1c2s = await hre.ethers.getContract<Contract>("Season1Challenge2Solution", deployer);
  console.log("🚩 S1Challenge2 Solution contract deployed");
  await s1c2s.mintFlag();
  console.log("🚩 S1Challenge2 Flag minted");
};

export default deployChallengeSolution;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags solution2
deployChallengeSolution.tags = ["s1c2s"];
