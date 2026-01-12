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
  // 1.获取challenge6合约
  const s1c6 = await hre.ethers.getContract<Contract>("Season1Challenge6", deployer);
  // 2.部署challenge6solution合约，实现name接口方法
  await deploy("Season1Challenge6Solution", {
    from: deployer,
    args: [await s1c6.getAddress()],
    log: true,
    autoMine: true,
  });
  const s1c6s = await hre.ethers.getContract<Contract>("Season1Challenge6Solution", deployer);

  // 3.调用mintFlag方法
  await s1c6s.mintFlag();

  console.log("🚩 Season1Challenge6 flag minted");
};

export default deployChallengeSolution;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags solution2
deployChallengeSolution.tags = ["s1c6s"];
