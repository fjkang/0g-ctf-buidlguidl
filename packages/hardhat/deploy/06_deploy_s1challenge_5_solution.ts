import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";
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
  // 1.获取challenge5合约
  const s1c5 = await hre.ethers.getContract<Contract>("Season1Challenge5", deployer);
  // 2.部署challenge5solution合约
  await deploy("Season1Challenge5Solution", {
    from: deployer,
    args: [await s1c5.getAddress()],
    log: true,
    autoMine: true,
  });

  // 3.调用claim10Points方法
  const challenge5Solution = await hre.ethers.getContract<Contract>("Season1Challenge5Solution", deployer);
  await challenge5Solution.claim10Points();
};

export default deployChallengeSolution;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags solution2
deployChallengeSolution.tags = ["s1c5s"];
