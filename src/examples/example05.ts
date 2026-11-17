import { LinkComponent } from '@jellypack/runtime/lib/model/components';

const nft_abi =
    '[{"inputs":[{"internalType":"string","name":"name","type":"string"}],"stateMutability":"nonpayable","type":"constructor"},{"inputs":[{"internalType":"address","name":"account","type":"address"}],"name":"AddressInsufficientBalance","type":"error"},{"inputs":[{"internalType":"uint48","name":"deadline","type":"uint48"}],"name":"ERC2771ForwarderExpiredRequest","type":"error"},{"inputs":[{"internalType":"address","name":"signer","type":"address"},{"internalType":"address","name":"from","type":"address"}],"name":"ERC2771ForwarderInvalidSigner","type":"error"},{"inputs":[{"internalType":"uint256","name":"requestedValue","type":"uint256"},{"internalType":"uint256","name":"msgValue","type":"uint256"}],"name":"ERC2771ForwarderMismatchedValue","type":"error"},{"inputs":[{"internalType":"address","name":"target","type":"address"},{"internalType":"address","name":"forwarder","type":"address"}],"name":"ERC2771UntrustfulTarget","type":"error"},{"inputs":[],"name":"FailedInnerCall","type":"error"},{"inputs":[{"internalType":"address","name":"account","type":"address"},{"internalType":"uint256","name":"currentNonce","type":"uint256"}],"name":"InvalidAccountNonce","type":"error"},{"inputs":[],"name":"InvalidShortString","type":"error"},{"inputs":[{"internalType":"string","name":"str","type":"string"}],"name":"StringTooLong","type":"error"},{"anonymous":false,"inputs":[],"name":"EIP712DomainChanged","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"signer","type":"address"},{"indexed":false,"internalType":"uint256","name":"nonce","type":"uint256"},{"indexed":false,"internalType":"bool","name":"success","type":"bool"}],"name":"ExecutedForwardRequest","type":"event"},{"inputs":[],"name":"eip712Domain","outputs":[{"internalType":"bytes1","name":"fields","type":"bytes1"},{"internalType":"string","name":"name","type":"string"},{"internalType":"string","name":"version","type":"string"},{"internalType":"uint256","name":"chainId","type":"uint256"},{"internalType":"address","name":"verifyingContract","type":"address"},{"internalType":"bytes32","name":"salt","type":"bytes32"},{"internalType":"uint256[]","name":"extensions","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"gas","type":"uint256"},{"internalType":"uint48","name":"deadline","type":"uint48"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct ERC2771Forwarder.ForwardRequestData","name":"request","type":"tuple"}],"name":"execute","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"gas","type":"uint256"},{"internalType":"uint48","name":"deadline","type":"uint48"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct ERC2771Forwarder.ForwardRequestData[]","name":"requests","type":"tuple[]"},{"internalType":"address payable","name":"refundReceiver","type":"address"}],"name":"executeBatch","outputs":[],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"owner","type":"address"}],"name":"nonces","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"components":[{"internalType":"address","name":"from","type":"address"},{"internalType":"address","name":"to","type":"address"},{"internalType":"uint256","name":"value","type":"uint256"},{"internalType":"uint256","name":"gas","type":"uint256"},{"internalType":"uint48","name":"deadline","type":"uint48"},{"internalType":"bytes","name":"data","type":"bytes"},{"internalType":"bytes","name":"signature","type":"bytes"}],"internalType":"struct ERC2771Forwarder.ForwardRequestData","name":"request","type":"tuple"}],"name":"verify","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"}]';
const storage_abi = JSON.stringify([
    {
        inputs: [
            { internalType: 'bool', name: '_b', type: 'bool' },
            { internalType: 'int8', name: '_i8', type: 'int8' },
            { internalType: 'int256', name: '_i', type: 'int256' },
            { internalType: 'uint16', name: '_ui16', type: 'uint16' },
            { internalType: 'uint32', name: '_ui32', type: 'uint32' },
            { internalType: 'uint64', name: '_ui64', type: 'uint64' },
            { internalType: 'uint256', name: '_u', type: 'uint256' },
            { internalType: 'address', name: '_a', type: 'address' },
            { internalType: 'bytes3', name: '_b3', type: 'bytes3' },
            { internalType: 'bytes', name: '_by', type: 'bytes' },
            { internalType: 'string', name: '_s', type: 'string' },
        ],
        stateMutability: 'nonpayable',
        type: 'constructor',
    },
    {
        inputs: [],
        name: 'retrieve',
        outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'retrieve_array',
        outputs: [{ internalType: 'string[]', name: '', type: 'string[]' }],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [],
        name: 'retrieve_multi',
        outputs: [
            { internalType: 'bool', name: '', type: 'bool' },
            { internalType: 'int8', name: '', type: 'int8' },
            { internalType: 'int256', name: '', type: 'int256' },
            { internalType: 'uint16', name: '', type: 'uint16' },
            { internalType: 'uint32', name: '', type: 'uint32' },
            { internalType: 'uint64', name: '', type: 'uint64' },
            { internalType: 'uint256', name: '', type: 'uint256' },
            { internalType: 'address', name: '', type: 'address' },
            { internalType: 'bytes3', name: '', type: 'bytes3' },
            { internalType: 'bytes', name: '', type: 'bytes' },
            { internalType: 'string', name: '', type: 'string' },
        ],
        stateMutability: 'view',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'uint256', name: 'num', type: 'uint256' }],
        name: 'store',
        outputs: [],
        stateMutability: 'nonpayable',
        type: 'function',
    },
    {
        inputs: [{ internalType: 'string[]', name: '_sa', type: 'string[]' }],
        name: 'store_array',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
    {
        inputs: [
            { internalType: 'bool', name: '_b', type: 'bool' },
            { internalType: 'int8', name: '_i8', type: 'int8' },
            { internalType: 'int256', name: '_i', type: 'int256' },
            { internalType: 'uint16', name: '_ui16', type: 'uint16' },
            { internalType: 'uint32', name: '_ui32', type: 'uint32' },
            { internalType: 'uint64', name: '_ui64', type: 'uint64' },
            { internalType: 'uint256', name: '_u', type: 'uint256' },
            { internalType: 'address', name: '_a', type: 'address' },
            { internalType: 'bytes3', name: '_b3', type: 'bytes3' },
            { internalType: 'bytes', name: '_by', type: 'bytes' },
            { internalType: 'string', name: '_s', type: 'string' },
        ],
        name: 'store_multi',
        outputs: [],
        stateMutability: 'payable',
        type: 'function',
    },
]);
const storage_bytecode =
    '0x608060405234801561000f575f80fd5b50604051611eaa380380611eaa8339818101604052810190610031919061057c565b8a5f806101000a81548160ff021916908315150217905550895f60016101000a81548160ff02191690835f0b60ff160217905550886001819055508760025f6101000a81548161ffff021916908361ffff160217905550866002806101000a81548163ffffffff021916908363ffffffff16021790555085600260066101000a81548167ffffffffffffffff021916908367ffffffffffffffff160217905550846003819055508360045f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600460146101000a81548162ffffff021916908360e81c0217905550816005908161014491906108a5565b50806006908161015491906109d6565b505050505050505050505050610aa5565b5f604051905090565b5f80fd5b5f80fd5b5f8115159050919050565b61018a81610176565b8114610194575f80fd5b50565b5f815190506101a581610181565b92915050565b5f815f0b9050919050565b6101bf816101ab565b81146101c9575f80fd5b50565b5f815190506101da816101b6565b92915050565b5f819050919050565b6101f2816101e0565b81146101fc575f80fd5b50565b5f8151905061020d816101e9565b92915050565b5f61ffff82169050919050565b61022981610213565b8114610233575f80fd5b50565b5f8151905061024481610220565b92915050565b5f63ffffffff82169050919050565b6102628161024a565b811461026c575f80fd5b50565b5f8151905061027d81610259565b92915050565b5f67ffffffffffffffff82169050919050565b61029f81610283565b81146102a9575f80fd5b50565b5f815190506102ba81610296565b92915050565b5f819050919050565b6102d2816102c0565b81146102dc575f80fd5b50565b5f815190506102ed816102c9565b92915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f61031c826102f3565b9050919050565b61032c81610312565b8114610336575f80fd5b50565b5f8151905061034781610323565b92915050565b5f7fffffff000000000000000000000000000000000000000000000000000000000082169050919050565b6103818161034d565b811461038b575f80fd5b50565b5f8151905061039c81610378565b92915050565b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6103f0826103aa565b810181811067ffffffffffffffff8211171561040f5761040e6103ba565b5b80604052505050565b5f610421610165565b905061042d82826103e7565b919050565b5f67ffffffffffffffff82111561044c5761044b6103ba565b5b610455826103aa565b9050602081019050919050565b8281835e5f83830152505050565b5f61048261047d84610432565b610418565b90508281526020810184848401111561049e5761049d6103a6565b5b6104a9848285610462565b509392505050565b5f82601f8301126104c5576104c46103a2565b5b81516104d5848260208601610470565b91505092915050565b5f67ffffffffffffffff8211156104f8576104f76103ba565b5b610501826103aa565b9050602081019050919050565b5f61052061051b846104de565b610418565b90508281526020810184848401111561053c5761053b6103a6565b5b610547848285610462565b509392505050565b5f82601f830112610563576105626103a2565b5b815161057384826020860161050e565b91505092915050565b5f805f805f805f805f805f6101608c8e03121561059c5761059b61016e565b5b5f6105a98e828f01610197565b9b505060206105ba8e828f016101cc565b9a505060406105cb8e828f016101ff565b99505060606105dc8e828f01610236565b98505060806105ed8e828f0161026f565b97505060a06105fe8e828f016102ac565b96505060c061060f8e828f016102df565b95505060e06106208e828f01610339565b9450506101006106328e828f0161038e565b9350506101208c015167ffffffffffffffff81111561065457610653610172565b5b6106608e828f016104b1565b9250506101408c015167ffffffffffffffff81111561068257610681610172565b5b61068e8e828f0161054f565b9150509295989b509295989b9093969950565b5f81519050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f60028204905060018216806106ef57607f821691505b602082108103610702576107016106ab565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f600883026107647fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610729565b61076e8683610729565b95508019841693508086168417925050509392505050565b5f819050919050565b5f6107a96107a461079f846102c0565b610786565b6102c0565b9050919050565b5f819050919050565b6107c28361078f565b6107d66107ce826107b0565b848454610735565b825550505050565b5f90565b6107ea6107de565b6107f58184846107b9565b505050565b5b818110156108185761080d5f826107e2565b6001810190506107fb565b5050565b601f82111561085d5761082e81610708565b6108378461071a565b81016020851015610846578190505b61085a6108528561071a565b8301826107fa565b50505b505050565b5f82821c905092915050565b5f61087d5f1984600802610862565b1980831691505092915050565b5f610895838361086e565b9150826002028217905092915050565b6108ae826106a1565b67ffffffffffffffff8111156108c7576108c66103ba565b5b6108d182546106d8565b6108dc82828561081c565b5f60209050601f83116001811461090d575f84156108fb578287015190505b610905858261088a565b86555061096c565b601f19841661091b86610708565b5f5b828110156109425784890151825560018201915060208501945060208101905061091d565b8683101561095f578489015161095b601f89168261086e565b8355505b6001600288020188555050505b505050505050565b5f81519050919050565b5f819050815f5260205f209050919050565b601f8211156109d1576109a28161097e565b6109ab8461071a565b810160208510156109ba578190505b6109ce6109c68561071a565b8301826107fa565b50505b505050565b6109df82610974565b67ffffffffffffffff8111156109f8576109f76103ba565b5b610a0282546106d8565b610a0d828285610990565b5f60209050601f831160018114610a3e575f8415610a2c578287015190505b610a36858261088a565b865550610a9d565b601f198416610a4c8661097e565b5f5b82811015610a7357848901518255600182019150602085019450602081019050610a4e565b86831015610a905784890151610a8c601f89168261086e565b8355505b6001600288020188555050505b505050505050565b6113f880610ab25f395ff3fe608060405260043610610054575f3560e01c80632e64cec1146100585780635eb2018a146100825780636057361d1461009e5780637c096724146100c657806383dc0221146100f0578063c2def36f14610124575b5f80fd5b348015610063575f80fd5b5061006c610140565b604051610079919061062e565b60405180910390f35b61009c60048036038101906100979190610a55565b610149565b005b3480156100a9575f80fd5b506100c460048036038101906100bf9190610b7a565b61027a565b005b3480156100d1575f80fd5b506100da610284565b6040516100e79190610cc0565b60405180910390f35b3480156100fb575f80fd5b50610104610358565b60405161011b9b9a99989796959493929190610df2565b60405180910390f35b61013e60048036038101906101399190610f8b565b61052a565b005b5f600354905090565b8a5f806101000a81548160ff021916908315150217905550895f60016101000a81548160ff02191690835f0b60ff160217905550886001819055508760025f6101000a81548161ffff021916908361ffff160217905550866002806101000a81548163ffffffff021916908363ffffffff16021790555085600260066101000a81548167ffffffffffffffff021916908367ffffffffffffffff160217905550846003819055508360045f6101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555082600460146101000a81548162ffffff021916908360e81c0217905550816005908161025c91906111cc565b50806006908161026c91906112f3565b505050505050505050505050565b8060038190555050565b60606007805480602002602001604051908101604052809291908181526020015f905b8282101561034f578382905f5260205f200180546102c490610fff565b80601f01602080910402602001604051908101604052809291908181526020018280546102f090610fff565b801561033b5780601f106103125761010080835404028352916020019161033b565b820191905f5260205f20905b81548152906001019060200180831161031e57829003601f168201915b5050505050815260200190600101906102a7565b50505050905090565b5f805f805f805f805f6060805f8054906101000a900460ff165f60019054906101000a90045f0b60015460025f9054906101000a900461ffff1660028054906101000a900463ffffffff16600260069054906101000a900467ffffffffffffffff1660035460045f9054906101000a900473ffffffffffffffffffffffffffffffffffffffff16600460149054906101000a900460e81b600560068180546103ff90610fff565b80601f016020809104026020016040519081016040528092919081815260200182805461042b90610fff565b80156104765780601f1061044d57610100808354040283529160200191610476565b820191905f5260205f20905b81548152906001019060200180831161045957829003601f168201915b5050505050915080805461048990610fff565b80601f01602080910402602001604051908101604052809291908181526020018280546104b590610fff565b80156105005780601f106104d757610100808354040283529160200191610500565b820191905f5260205f20905b8154815290600101906020018083116104e357829003601f168201915b505050505090509a509a509a509a509a509a509a509a509a509a509a50909192939495969798999a565b8060079080519060200190610540929190610544565b5050565b828054828255905f5260205f2090810192821561058a579160200282015b8281111561058957825182908161057991906112f3565b5091602001919060010190610562565b5b509050610597919061059b565b5090565b5b808211156105ba575f81816105b191906105be565b5060010161059c565b5090565b5080546105ca90610fff565b5f825580601f106105db57506105f8565b601f0160209004905f5260205f20908101906105f791906105fb565b5b50565b5b80821115610612575f815f9055506001016105fc565b5090565b5f819050919050565b61062881610616565b82525050565b5f6020820190506106415f83018461061f565b92915050565b5f604051905090565b5f80fd5b5f80fd5b5f8115159050919050565b61066c81610658565b8114610676575f80fd5b50565b5f8135905061068781610663565b92915050565b5f815f0b9050919050565b6106a18161068d565b81146106ab575f80fd5b50565b5f813590506106bc81610698565b92915050565b5f819050919050565b6106d4816106c2565b81146106de575f80fd5b50565b5f813590506106ef816106cb565b92915050565b5f61ffff82169050919050565b61070b816106f5565b8114610715575f80fd5b50565b5f8135905061072681610702565b92915050565b5f63ffffffff82169050919050565b6107448161072c565b811461074e575f80fd5b50565b5f8135905061075f8161073b565b92915050565b5f67ffffffffffffffff82169050919050565b61078181610765565b811461078b575f80fd5b50565b5f8135905061079c81610778565b92915050565b6107ab81610616565b81146107b5575f80fd5b50565b5f813590506107c6816107a2565b92915050565b5f73ffffffffffffffffffffffffffffffffffffffff82169050919050565b5f6107f5826107cc565b9050919050565b610805816107eb565b811461080f575f80fd5b50565b5f81359050610820816107fc565b92915050565b5f7fffffff000000000000000000000000000000000000000000000000000000000082169050919050565b61085a81610826565b8114610864575f80fd5b50565b5f8135905061087581610851565b92915050565b5f80fd5b5f80fd5b5f601f19601f8301169050919050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52604160045260245ffd5b6108c982610883565b810181811067ffffffffffffffff821117156108e8576108e7610893565b5b80604052505050565b5f6108fa610647565b905061090682826108c0565b919050565b5f67ffffffffffffffff82111561092557610924610893565b5b61092e82610883565b9050602081019050919050565b828183375f83830152505050565b5f61095b6109568461090b565b6108f1565b9050828152602081018484840111156109775761097661087f565b5b61098284828561093b565b509392505050565b5f82601f83011261099e5761099d61087b565b5b81356109ae848260208601610949565b91505092915050565b5f67ffffffffffffffff8211156109d1576109d0610893565b5b6109da82610883565b9050602081019050919050565b5f6109f96109f4846109b7565b6108f1565b905082815260208101848484011115610a1557610a1461087f565b5b610a2084828561093b565b509392505050565b5f82601f830112610a3c57610a3b61087b565b5b8135610a4c8482602086016109e7565b91505092915050565b5f805f805f805f805f805f6101608c8e031215610a7557610a74610650565b5b5f610a828e828f01610679565b9b50506020610a938e828f016106ae565b9a50506040610aa48e828f016106e1565b9950506060610ab58e828f01610718565b9850506080610ac68e828f01610751565b97505060a0610ad78e828f0161078e565b96505060c0610ae88e828f016107b8565b95505060e0610af98e828f01610812565b945050610100610b0b8e828f01610867565b9350506101208c013567ffffffffffffffff811115610b2d57610b2c610654565b5b610b398e828f0161098a565b9250506101408c013567ffffffffffffffff811115610b5b57610b5a610654565b5b610b678e828f01610a28565b9150509295989b509295989b9093969950565b5f60208284031215610b8f57610b8e610650565b5b5f610b9c848285016107b8565b91505092915050565b5f81519050919050565b5f82825260208201905092915050565b5f819050602082019050919050565b5f81519050919050565b5f82825260208201905092915050565b8281835e5f83830152505050565b5f610c0082610bce565b610c0a8185610bd8565b9350610c1a818560208601610be8565b610c2381610883565b840191505092915050565b5f610c398383610bf6565b905092915050565b5f602082019050919050565b5f610c5782610ba5565b610c618185610baf565b935083602082028501610c7385610bbf565b805f5b85811015610cae5784840389528151610c8f8582610c2e565b9450610c9a83610c41565b925060208a01995050600181019050610c76565b50829750879550505050505092915050565b5f6020820190508181035f830152610cd88184610c4d565b905092915050565b610ce981610658565b82525050565b610cf88161068d565b82525050565b610d07816106c2565b82525050565b610d16816106f5565b82525050565b610d258161072c565b82525050565b610d3481610765565b82525050565b610d43816107eb565b82525050565b610d5281610826565b82525050565b5f81519050919050565b5f82825260208201905092915050565b5f610d7c82610d58565b610d868185610d62565b9350610d96818560208601610be8565b610d9f81610883565b840191505092915050565b5f82825260208201905092915050565b5f610dc482610bce565b610dce8185610daa565b9350610dde818560208601610be8565b610de781610883565b840191505092915050565b5f61016082019050610e065f83018e610ce0565b610e13602083018d610cef565b610e20604083018c610cfe565b610e2d606083018b610d0d565b610e3a608083018a610d1c565b610e4760a0830189610d2b565b610e5460c083018861061f565b610e6160e0830187610d3a565b610e6f610100830186610d49565b818103610120830152610e828185610d72565b9050818103610140830152610e978184610dba565b90509c9b505050505050505050505050565b5f67ffffffffffffffff821115610ec357610ec2610893565b5b602082029050602081019050919050565b5f80fd5b5f610eea610ee584610ea9565b6108f1565b90508083825260208201905060208402830185811115610f0d57610f0c610ed4565b5b835b81811015610f5457803567ffffffffffffffff811115610f3257610f3161087b565b5b808601610f3f8982610a28565b85526020850194505050602081019050610f0f565b5050509392505050565b5f82601f830112610f7257610f7161087b565b5b8135610f82848260208601610ed8565b91505092915050565b5f60208284031215610fa057610f9f610650565b5b5f82013567ffffffffffffffff811115610fbd57610fbc610654565b5b610fc984828501610f5e565b91505092915050565b7f4e487b71000000000000000000000000000000000000000000000000000000005f52602260045260245ffd5b5f600282049050600182168061101657607f821691505b60208210810361102957611028610fd2565b5b50919050565b5f819050815f5260205f209050919050565b5f6020601f8301049050919050565b5f82821b905092915050565b5f6008830261108b7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82611050565b6110958683611050565b95508019841693508086168417925050509392505050565b5f819050919050565b5f6110d06110cb6110c684610616565b6110ad565b610616565b9050919050565b5f819050919050565b6110e9836110b6565b6110fd6110f5826110d7565b84845461105c565b825550505050565b5f90565b611111611105565b61111c8184846110e0565b505050565b5b8181101561113f576111345f82611109565b600181019050611122565b5050565b601f821115611184576111558161102f565b61115e84611041565b8101602085101561116d578190505b61118161117985611041565b830182611121565b50505b505050565b5f82821c905092915050565b5f6111a45f1984600802611189565b1980831691505092915050565b5f6111bc8383611195565b9150826002028217905092915050565b6111d582610d58565b67ffffffffffffffff8111156111ee576111ed610893565b5b6111f88254610fff565b611203828285611143565b5f60209050601f831160018114611234575f8415611222578287015190505b61122c85826111b1565b865550611293565b601f1984166112428661102f565b5f5b8281101561126957848901518255600182019150602085019450602081019050611244565b868310156112865784890151611282601f891682611195565b8355505b6001600288020188555050505b505050505050565b5f819050815f5260205f209050919050565b601f8211156112ee576112bf8161129b565b6112c884611041565b810160208510156112d7578190505b6112eb6112e385611041565b830182611121565b50505b505050565b6112fc82610bce565b67ffffffffffffffff81111561131557611314610893565b5b61131f8254610fff565b61132a8282856112ad565b5f60209050601f83116001811461135b575f8415611349578287015190505b61135385826111b1565b8655506113ba565b601f1984166113698661129b565b5f5b828110156113905784890151825560018201915060208501945060208101905061136b565b868310156113ad57848901516113a9601f891682611195565b8355505b6001600288020188555050505b50505050505056fea26469706673582212205f96155b4d3ea6e1a78422496ab64a3b31a4d143d3e839e3d510774b30df56ad64736f6c634300081a0033';

// console.error('nft_abi', JSON.parse(nft_abi));
// console.error('storage_abi', JSON.parse(storage_abi));

export const app_id = 1410701688081224;
export const app_anchor = ''; // cspell:disable-line
export const name = 'Example 5: evm test (sepolia)';
export const icon = 'https://file.easydapp.ai/image/5DSXiqXM0183c8e944.png';

// 1. Evm call (address)->(uint256)
const example01: LinkComponent[] = [
    {
        view: {
            id: 100,
            metadata: {
                text: { value: { const: { text: '1. Evm call (address)->(uint256)' } } },
            },
        },
    },
    {
        call: {
            id: 101,
            // inlets: [{ id: 1 }],
            metadata: {
                evm: {
                    trigger: { click: { text: { const: { text: 'Trigger Call' } } } },
                    // identity: 1,
                    chain: 'ethereum-test-sepolia',
                    action: {
                        call: {
                            contract: {
                                const: { text: '0x84732a7d2bC9336ECB59e651DCCcF9B42B6bc0d3' },
                            },
                            api: {
                                api: {
                                    single: {
                                        api: JSON.stringify(
                                            JSON.parse(nft_abi).find(
                                                (item: any) => item.name === 'nonces',
                                            ),
                                        ),
                                    },
                                },
                            },
                            arg: {
                                code: {
                                    data: [
                                        {
                                            key: 'address',
                                            value: {
                                                const: {
                                                    text: '0x025c1667471685c323808647299e5DbF9d6AdcC9',
                                                },
                                            },
                                        },
                                    ],
                                    code: {
                                        code: {
                                            code: {
                                                code: `result = data.address;`,
                                            },
                                            js: '',
                                        },
                                    },
                                },
                            },
                            ret: {
                                code: {
                                    code: {
                                        code: {
                                            code: `result = data.toString();`,
                                        },
                                        js: '',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            output: 'text',
        },
    },
    {
        view: {
            id: 102,
            inlets: [{ id: 101 }],
            metadata: {
                text: { value: { refer: { endpoint: { id: 101 } } } },
            },
        },
    },
];
// 2. Evm call ([address,address,uint256,uint256,uint48,bytes,bytes])->(bool)
const example02: LinkComponent[] = [
    {
        view: {
            id: 200,
            metadata: {
                text: {
                    value: {
                        const: {
                            text: '2. Evm call ([address,address,uint256,uint256,uint48,bytes,bytes])->(bool)',
                        },
                    },
                },
            },
        },
    },
    {
        call: {
            id: 201,
            inlets: [{ id: 1 }],
            metadata: {
                evm: {
                    trigger: { click: { text: { const: { text: 'Trigger Call' } } } },
                    identity: 1,
                    chain: 'ethereum-test-sepolia',
                    action: {
                        call: {
                            contract: {
                                const: { text: '0x84732a7d2bC9336ECB59e651DCCcF9B42B6bc0d3' },
                            },
                            api: {
                                api: {
                                    single: {
                                        api: JSON.stringify(
                                            JSON.parse(nft_abi).find(
                                                (item: any) => item.name === 'verify',
                                            ),
                                        ),
                                    },
                                },
                            },
                            arg: {
                                code: {
                                    code: {
                                        code: {
                                            code: {
                                                code: `result = [
                                                        '0x025c1667471685c323808647299e5DbF9d6AdcC9',
                                                        '0x025c1667471685c323808647299e5DbF9d6AdcC9',
                                                        1n,
                                                        1n,
                                                        1n,
                                                        new Uint8Array([1]),
                                                        new Uint8Array([1]),
                                                    ];`,
                                            },
                                            js: '',
                                        },
                                    },
                                },
                            },
                            ret: {
                                code: {
                                    code: {
                                        code: {
                                            code: `result = data.toString();`,
                                        },
                                        js: '',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            output: 'text',
        },
    },
    {
        view: {
            id: 202,
            inlets: [{ id: 201 }],
            metadata: {
                text: { value: { refer: { endpoint: { id: 201 } } } },
            },
        },
    },
];
// 3. Evm call ()->(bytes1,string,string,uint256,address,bytes32,uint256[])
const example03: LinkComponent[] = [
    {
        view: {
            id: 300,
            metadata: {
                text: {
                    value: {
                        const: {
                            text: '3. Evm call ()->(bytes1,string,string,uint256,address,bytes32,uint256[])',
                        },
                    },
                },
            },
        },
    },
    {
        call: {
            id: 301,
            inlets: [{ id: 1 }],
            metadata: {
                evm: {
                    trigger: { click: { text: { const: { text: 'Trigger Call' } } } },
                    identity: 1,
                    chain: 'ethereum-test-sepolia',
                    action: {
                        call: {
                            contract: {
                                const: { text: '0x84732a7d2bC9336ECB59e651DCCcF9B42B6bc0d3' },
                            },
                            api: {
                                api: {
                                    single: {
                                        api: JSON.stringify(
                                            JSON.parse(nft_abi).find(
                                                (item: any) => item.name === 'eip712Domain',
                                            ),
                                        ),
                                    },
                                },
                            },
                            ret: {
                                code: {
                                    code: {
                                        code: {
                                            code: `result = JSON.stringify(data, (_, v) => typeof v === 'bigint' ? v.toString() : v);`,
                                        },
                                        js: '',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            output: 'text',
        },
    },
    {
        view: {
            id: 302,
            inlets: [{ id: 301 }],
            metadata: {
                text: { value: { refer: { endpoint: { id: 301 } } } },
            },
        },
    },
];
// 4. Evm sign
const example04: LinkComponent[] = [
    {
        view: {
            id: 400,
            metadata: {
                text: {
                    value: {
                        const: {
                            text: '4. Evm sign',
                        },
                    },
                },
            },
        },
    },
    {
        call: {
            id: 401,
            inlets: [{ id: 2 }],
            metadata: {
                evm: {
                    trigger: { click: { text: { const: { text: 'Trigger Sign' } } } },
                    identity: 2,
                    chain: 'ethereum-test-sepolia',
                    action: {
                        sign: {
                            const: {
                                text: 'Hello',
                            },
                        },
                    },
                },
            },
            output: 'text',
        },
    },
    {
        view: {
            id: 402,
            inlets: [{ id: 401 }],
            metadata: {
                text: { value: { refer: { endpoint: { id: 401 } } } },
            },
        },
    },
];
// 5. Evm transaction
const example05: LinkComponent[] = [
    {
        view: {
            id: 500,
            metadata: {
                text: {
                    value: {
                        const: {
                            text: '5. Evm transaction',
                        },
                    },
                },
            },
        },
    },
    {
        call: {
            id: 501,
            inlets: [{ id: 2 }],
            metadata: {
                evm: {
                    trigger: { click: { text: { const: { text: 'Trigger Transaction' } } } },
                    identity: 2,
                    chain: 'ethereum-test-sepolia',
                    action: {
                        transaction: {
                            contract: {
                                const: { text: '0x84732a7d2bC9336ECB59e651DCCcF9B42B6bc0d3' },
                            },
                            pay_value: { const: { text: '0.000001' } },
                            gas_limit: { const: { integer: 20 } },
                            gas_price: { const: { text: '1000' } },
                            nonce: { const: { integer: 0 } },
                            api: {
                                api: {
                                    single: {
                                        api: JSON.stringify(
                                            JSON.parse(nft_abi).find(
                                                (item: any) => item.name === 'execute',
                                            ),
                                        ),
                                    },
                                },
                            },
                            arg: {
                                code: {
                                    code: {
                                        code: {
                                            code: {
                                                code: `result = [
                                                    '0x025c1667471685c323808647299e5DbF9d6AdcC9',
                                                    '0x025c1667471685c323808647299e5DbF9d6AdcC9',
                                                    1n,
                                                    1n,
                                                    1n,
                                                    new Uint8Array([1]),
                                                    new Uint8Array([1]),
                                                ];`,
                                            },
                                            js: '',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            output: 'text', // The transaction returns TX Hash
        },
    },
    {
        view: {
            id: 502,
            inlets: [{ id: 501 }],
            metadata: {
                text: { value: { refer: { endpoint: { id: 501 } } } },
            },
        },
    },
];
// 6. Evm deploy
const example06: LinkComponent[] = [
    {
        view: {
            id: 600,
            metadata: {
                text: {
                    value: {
                        const: {
                            text: '6. Evm deploy',
                        },
                    },
                },
            },
        },
    },
    {
        call: {
            id: 601,
            inlets: [{ id: 2 }],
            metadata: {
                evm: {
                    trigger: { click: { text: { const: { text: 'Trigger Deploy' } } } },
                    identity: 2,
                    chain: 'ethereum-test-sepolia',
                    action: {
                        deploy: {
                            // pay_value: { const: { text: '0.000001' } },
                            gas_limit: { const: { integer: 1400000 } },
                            gas_price: { const: { text: '60' } },
                            // nonce: { const: { integer: 9 } },
                            abi: { const: { text: storage_abi } },
                            bytecode: { const: { text: storage_bytecode } },
                            initial: {
                                code: {
                                    code: {
                                        code: {
                                            code: {
                                                code: `result = [
                                                    true,
                                                    -1n,
                                                    -10000000000000000n,
                                                    1000n,
                                                    1000000n,
                                                    10000000000n,
                                                    10000000000000000n,
                                                    '0x84732a7d2bC9336ECB59e651DCCcF9B42B6bc0d3',
                                                    '0x112233',
                                                    '0x44556677',
                                                    'text string'
                                                ];`,
                                            },
                                            js: '',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            output: {
                object: [
                    {
                        key: 'tx',
                        ty: 'text',
                    },
                    {
                        key: 'address',
                        ty: 'text',
                    },
                ],
            },
        },
    },
    {
        view: {
            id: 602,
            inlets: [{ id: 601 }],
            metadata: {
                object: {
                    value: { refer: { endpoint: { id: 601 } } },
                    inner: [
                        {
                            key: 'tx',
                            inner: { text: {} },
                        },
                        {
                            key: 'address',
                            inner: { text: {} },
                        },
                    ],
                },
            },
        },
    },
];
// 7. Evm call storage
const example07: LinkComponent[] = [
    {
        view: {
            id: 700,
            metadata: {
                text: {
                    value: {
                        const: {
                            text: '7. Evm call storage',
                        },
                    },
                },
            },
        },
    },
    {
        call: {
            id: 701,
            inlets: [{ id: 1 }],
            metadata: {
                evm: {
                    trigger: { click: { text: { const: { text: 'Trigger Call' } } } },
                    identity: 1,
                    chain: 'ethereum-test-sepolia',
                    action: {
                        call: {
                            contract: {
                                const: { text: '0xbc4283e183ffc11f6d9a24a2bfa5b35eab77aef0' },
                            },
                            api: {
                                api: {
                                    single: {
                                        api: JSON.stringify(
                                            JSON.parse(storage_abi).find(
                                                (item: any) => item.name === 'retrieve_multi',
                                            ),
                                        ),
                                    },
                                },
                            },
                            ret: {
                                code: {
                                    code: {
                                        code: {
                                            code: `result = JSON.stringify(data, (_, v) => typeof v === 'bigint' ? v.toString() : v);`,
                                        },
                                        js: '',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            output: 'text',
        },
    },
    {
        view: {
            id: 702,
            inlets: [{ id: 701 }],
            metadata: {
                text: { value: { refer: { endpoint: { id: 701 } } } },
            },
        },
    },
];
// 8. Evm transaction storage
const example08: LinkComponent[] = [
    {
        view: {
            id: 800,
            metadata: {
                text: {
                    value: {
                        const: {
                            text: '8. Evm transaction storage',
                        },
                    },
                },
            },
        },
    },
    {
        call: {
            id: 801,
            inlets: [{ id: 2 }],
            metadata: {
                evm: {
                    trigger: { click: { text: { const: { text: 'Trigger Transaction' } } } },
                    identity: 2,
                    chain: 'ethereum-test-sepolia',
                    action: {
                        transaction: {
                            contract: {
                                const: { text: '0xbc4283e183ffc11f6d9a24a2bfa5b35eab77aef0' },
                            },
                            pay_value: { const: { text: '0.000001' } },
                            gas_limit: { const: { integer: 70000 } },
                            // gas_price: { const: { text: '1000' } },
                            // nonce: { const: { integer: 0 } },
                            api: {
                                api: {
                                    single: {
                                        api: JSON.stringify(
                                            JSON.parse(storage_abi).find(
                                                (item: any) => item.name === 'store_multi',
                                            ),
                                        ),
                                    },
                                },
                            },
                            arg: {
                                code: {
                                    code: {
                                        code: {
                                            code: {
                                                code: `result = [
                                                    true,
                                                    4n,
                                                    40000000000000000n,
                                                    4000n,
                                                    4000000n,
                                                    40000000000n,
                                                    40000000000000000n,
                                                    '0xbc4283e183ffc11f6d9a24a2bfa5b35eab77aef0',
                                                    '0x332211',
                                                    '0x77665544',
                                                    '123 text string'
                                                ];`,
                                            },
                                            js: '',
                                        },
                                    },
                                },
                            },
                            // ret: {
                            //     code: {
                            //         code: {
                            //             code: {
                            //                 code: `result = JSON.stringify(data, (_, v) => typeof v === 'bigint' ? v.toString() : v);`,
                            //             },
                            //             js: '',
                            //         },
                            //     },
                            // },
                        },
                    },
                },
            },
            output: 'text',
        },
    },
    {
        view: {
            id: 802,
            inlets: [{ id: 801 }],
            metadata: {
                text: { value: { refer: { endpoint: { id: 801 } } } },
            },
        },
    },
];
// 9. Evm call storage
const example09: LinkComponent[] = [
    {
        view: {
            id: 900,
            metadata: {
                text: {
                    value: {
                        const: {
                            text: '9. Evm call storage',
                        },
                    },
                },
            },
        },
    },
    {
        call: {
            id: 901,
            inlets: [{ id: 1 }],
            metadata: {
                evm: {
                    trigger: { click: { text: { const: { text: 'Trigger Call' } } } },
                    identity: 1,
                    chain: 'ethereum-test-sepolia',
                    action: {
                        call: {
                            contract: {
                                const: { text: '0xbc4283e183ffc11f6d9a24a2bfa5b35eab77aef0' },
                            },
                            api: {
                                api: {
                                    single: {
                                        api: JSON.stringify(
                                            JSON.parse(storage_abi).find(
                                                (item: any) => item.name === 'retrieve_multi',
                                            ),
                                        ),
                                    },
                                },
                            },
                            ret: {
                                code: {
                                    code: {
                                        code: {
                                            code: `result = JSON.stringify(data, (_, v) => typeof v === 'bigint' ? v.toString() : v);`,
                                        },
                                        js: '',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            output: 'text',
        },
    },
    {
        view: {
            id: 902,
            inlets: [{ id: 901 }],
            metadata: {
                text: { value: { refer: { endpoint: { id: 901 } } } },
            },
        },
    },
];
// 10. Evm call
const example10: LinkComponent[] = [
    {
        view: {
            id: 1000,
            metadata: {
                text: {
                    value: {
                        const: {
                            text: '10. Evm call',
                        },
                    },
                },
            },
        },
    },
    {
        call: {
            id: 1001,
            inlets: [{ id: 1 }],
            metadata: {
                evm: {
                    trigger: { loading: {} },
                    identity: 1,
                    chain: 'ethereum-test-sepolia',
                    action: {
                        call: {
                            contract: {
                                const: { text: '0xbc4283e183ffc11f6d9a24a2bfa5b35eab77aef0' },
                            },
                            api: {
                                api: {
                                    single: {
                                        api: JSON.stringify(
                                            JSON.parse(storage_abi).find(
                                                (item: any) => item.name === 'retrieve_array',
                                            ),
                                        ),
                                    },
                                },
                            },
                            ret: {
                                code: {
                                    code: {
                                        code: {
                                            code: `result = JSON.stringify(data, (_, v) => typeof v === 'bigint' ? v.toString() : v);`,
                                        },
                                        js: '',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            output: 'text',
        },
    },
    {
        view: {
            id: 1002,
            inlets: [{ id: 1001 }],
            metadata: {
                text: { value: { refer: { endpoint: { id: 1001 } } } },
            },
        },
    },
];
// 11. Evm transaction call
const example11: LinkComponent[] = [
    {
        view: {
            id: 1100,
            metadata: {
                text: {
                    value: {
                        const: {
                            text: '11. Evm transaction call',
                        },
                    },
                },
            },
        },
    },
    {
        form: {
            id: 1101,
            output: { array: 'text' },
        },
    },
    {
        call: {
            id: 1102,
            inlets: [{ id: 2 }, { id: 1101 }],
            metadata: {
                evm: {
                    trigger: { click: { text: { const: { text: 'Trigger Transaction' } } } },
                    identity: 2,
                    chain: 'ethereum-test-sepolia',
                    action: {
                        transaction: {
                            contract: {
                                const: { text: '0xbc4283e183ffc11f6d9a24a2bfa5b35eab77aef0' },
                            },
                            // pay_value: { const: { text: '0.000001' } },
                            // gas_limit: { const: { integer: 70000 } },
                            // gas_price: { const: { text: '1000' } },
                            // nonce: { const: { integer: 0 } },
                            api: {
                                api: {
                                    single: {
                                        api: JSON.stringify(
                                            JSON.parse(storage_abi).find(
                                                (item: any) => item.name === 'store_array',
                                            ),
                                        ),
                                    },
                                },
                            },
                            arg: {
                                code: {
                                    data: [
                                        {
                                            key: 'data',
                                            value: { refer: { endpoint: { id: 1101 } } },
                                        },
                                    ],
                                    code: {
                                        code: {
                                            code: {
                                                code: `result = data.data;`,
                                            },
                                            js: '',
                                        },
                                    },
                                },
                            },
                        },
                    },
                },
            },
            output: 'text',
        },
    },
    {
        call: {
            id: 1103,
            inlets: [{ id: 1 }, { id: 1102 }],
            metadata: {
                evm: {
                    trigger: { loading: {} },
                    identity: 1,
                    chain: 'ethereum-test-sepolia',
                    action: {
                        call: {
                            contract: {
                                const: { text: '0xbc4283e183ffc11f6d9a24a2bfa5b35eab77aef0' },
                            },
                            api: {
                                api: {
                                    single: {
                                        api: JSON.stringify(
                                            JSON.parse(storage_abi).find(
                                                (item: any) => item.name === 'retrieve_array',
                                            ),
                                        ),
                                    },
                                },
                            },
                            ret: {
                                code: {
                                    code: {
                                        code: {
                                            code: `result = JSON.stringify(data, (_, v) => typeof v === 'bigint' ? v.toString() : v);`,
                                        },
                                        js: '',
                                    },
                                },
                            },
                        },
                    },
                },
            },
            output: 'text',
        },
    },
    {
        view: {
            id: 1104,
            inlets: [{ id: 1103 }],
            metadata: {
                text: { value: { refer: { endpoint: { id: 1103 } } } },
            },
        },
    },
];
// 12. Evm transfer
const example12: LinkComponent[] = [
    {
        view: {
            id: 1200,
            metadata: {
                text: {
                    value: {
                        const: {
                            text: '12. Evm transfer',
                        },
                    },
                },
            },
        },
    },
    {
        form: {
            id: 1201,
            output: 'text',
        },
    },
    {
        form: {
            id: 1202,
            output: 'text',
        },
    },
    {
        call: {
            id: 1203,
            inlets: [{ id: 2 }, { id: 1201 }, { id: 1202 }],
            metadata: {
                evm: {
                    trigger: { click: { text: { const: { text: 'Trigger Transfer' } } } },
                    identity: 2,
                    chain: 'ethereum-test-sepolia',
                    action: {
                        transfer: {
                            transfer_to: {
                                refer: { endpoint: { id: 1201 } },
                            },
                            pay_value: {
                                refer: { endpoint: { id: 1202 } },
                            },
                        },
                    },
                },
            },
            output: 'text',
        },
    },
    {
        view: {
            id: 1204,
            inlets: [{ id: 1203 }],
            metadata: {
                text: { value: { refer: { endpoint: { id: 1203 } } } },
            },
        },
    },
];

export const combined: {
    version: string;
    components: LinkComponent[];
} = {
    version: '0.0.1',
    components: [
        {
            identity: {
                id: 1,
                metadata: {
                    metadata: {
                        evm: {
                            chain: 'ethereum-test-sepolia',
                        },
                    },
                },
            },
        },
        {
            identity: {
                id: 2,
                metadata: {
                    metadata: {
                        evm: {
                            chain: 'ethereum-test-sepolia',
                            includes: [{ any: {} }],
                            connect: { const: { text: 'Connect Wallet' } },
                        },
                    },
                },
            },
        },
        ...example01,
        ...example02,
        ...example03,
        ...example04,
        ...example05,
        ...example06,
        ...example07,
        ...example08,
        ...example09,
        ...example10,
        ...example11,
        ...example12,
    ],
};
