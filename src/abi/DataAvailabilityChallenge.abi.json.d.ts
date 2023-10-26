declare const abi: [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "_challengeWindow",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_resolveWindow",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "_bondSize",
        "type": "uint256"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "required",
        "type": "uint256"
      }
    ],
    "name": "BondTooLow",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ChallengeExists",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ChallengeNotActive",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ChallengeWindowNotOpen",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ResolveWindowNotClosed",
    "type": "error"
  },
  {
    "inputs": [],
    "name": "ResolveWindowNotOpen",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "bytes32",
        "name": "challengedHash",
        "type": "bytes32"
      },
      {
        "indexed": true,
        "internalType": "uint256",
        "name": "challengedBlockNumber",
        "type": "uint256"
      },
      {
        "indexed": false,
        "internalType": "enum ChallengeStatus",
        "name": "status",
        "type": "uint8"
      }
    ],
    "name": "ChallengeStatusChanged",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "bytes32",
        "name": "expiredChallengesHead",
        "type": "bytes32"
      }
    ],
    "name": "ExpiredChallengesHeadUpdated",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "name": "balances",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "bondSize",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "challengedBlockNumber",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "challengedHash",
        "type": "bytes32"
      }
    ],
    "name": "challenge",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "challengeWindow",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "name": "challenges",
    "outputs": [
      {
        "internalType": "enum ChallengeStatus",
        "name": "status",
        "type": "uint8"
      },
      {
        "internalType": "address",
        "name": "challenger",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "startBlock",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "deposit",
    "outputs": [],
    "stateMutability": "payable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "challengedBlockNumber",
        "type": "uint256"
      },
      {
        "internalType": "bytes32",
        "name": "challengedHash",
        "type": "bytes32"
      }
    ],
    "name": "expire",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "expiredChallengesHead",
    "outputs": [
      {
        "internalType": "bytes32",
        "name": "",
        "type": "bytes32"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "challengedBlockNumber",
        "type": "uint256"
      },
      {
        "internalType": "bytes",
        "name": "preImage",
        "type": "bytes"
      }
    ],
    "name": "resolve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "resolveWindow",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "withdraw",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
]; export default abi;
