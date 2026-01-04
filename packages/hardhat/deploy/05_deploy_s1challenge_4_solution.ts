import { DeployFunction } from "hardhat-deploy/types";
import { HardhatNetworkHDAccountsConfig, HardhatRuntimeEnvironment } from "hardhat/types";
import { Contract, Mnemonic, HDNodeWallet, AbiCoder, keccak256, toBeArray } from "ethers";

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
  // 1.按照challenge4的脚本获取minter地址
  const challenge4Contract = await hre.ethers.getContract<Contract>("Season1Challenge4", deployer);
  const hAccounts = hre.config.networks.hardhat.accounts as HardhatNetworkHDAccountsConfig;
  const derivationPath = "m/44'/60'/0'/0/12";
  const minter = HDNodeWallet.fromMnemonic(Mnemonic.fromPhrase(hAccounts.mnemonic), derivationPath);

  // 2.获取signature
  const coder = AbiCoder.defaultAbiCoder();
  // 2.1编码多个参数
  const message = keccak256(coder.encode(["string", "address"], ["BG CTF Challenge 4", deployer]));
  // 2.2生成签名时，需要将message转为Uint8Array
  const signature = await minter.signMessage(toBeArray(message));

  // 3.调用mint方法
  await challenge4Contract.mintFlag(minter.address, signature);

  console.log("🚩 Season1Challenge4 flag minted");
};

export default deployChallengeSolution;

// Tags are useful if you have multiple deploy files and only want to run one of them.
// e.g. yarn deploy --tags solution2
deployChallengeSolution.tags = ["s1c4s"];
