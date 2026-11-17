import { LinkComponent } from '@jellypack/runtime/lib/model/components';

export const app_id = 3323840420411918;
export const app_anchor = ''; // cspell:disable-line
export const name = 'burning test: ui test';
export const icon = 'https://file.easydapp.ai/image/5DSXiqXM0183c8e944.png';
export const combined: {
    version: string;
    components: LinkComponent[];
} = {
    version: '0.0.1',
    components: [
        { const: { id: 1, metadata: { value: { text: 'qweqwe1234456' } }, output: 'text' } },
        {
            view: {
                id: 2,
                metadata: {
                    text: {
                        value: { refer: { endpoint: { id: 1 } } },
                        style: '{"style":{"fontSize":"16px","textAlign":"right","paddingTop":"12px","paddingBottom":"12px","color":"#000000"}}',
                    },
                },
                inlets: [{ id: 1 }],
            },
        },
        {
            view: {
                id: 3,
                metadata: {
                    text: {
                        value: { const: { text: 'view text' } },
                        style: '{"style":{"fontSize":"14px","textAlign":"center","paddingTop":"5px","paddingBottom":"5px","color":"#C337FF"}}',
                    },
                },
            },
        },
        {
            view: {
                id: 4,
                metadata: {
                    table: {
                        value: {
                            const: {
                                object: [
                                    {
                                        key: 'headers',
                                        value: {
                                            array: {
                                                ty: 'text',
                                                values: [
                                                    { text: 'header1' },
                                                    { text: 'header2' },
                                                    { text: 'header3' },
                                                ],
                                            },
                                        },
                                    },
                                    {
                                        key: 'rows',
                                        value: {
                                            array: {
                                                ty: { array: 'text' },
                                                values: [
                                                    {
                                                        array: {
                                                            ty: 'text',
                                                            values: [
                                                                { text: 'row1.1' },
                                                                { text: 'row1.2' },
                                                                { text: 'row1.3' },
                                                            ],
                                                        },
                                                    },
                                                    {
                                                        array: {
                                                            ty: 'text',
                                                            values: [
                                                                { text: 'row2.1' },
                                                                { text: 'row2.2' },
                                                                { text: 'row2.3' },
                                                            ],
                                                        },
                                                    },
                                                    {
                                                        array: {
                                                            ty: 'text',
                                                            values: [
                                                                { text: 'row3.1' },
                                                                { text: 'row3.2' },
                                                                { text: 'row3.3' },
                                                            ],
                                                        },
                                                    },
                                                ],
                                            },
                                        },
                                    },
                                ],
                            },
                        },
                        style: '{"style":{"fontSize":"14px","border":"1px solid #e8e8e8","textAlign":"left","paddingTop":"5px","paddingBottom":"5px","color":"#000000"}}',
                    },
                },
            },
        },
        {
            view: {
                id: 5,
                metadata: {
                    bool: { value: { const: { bool: true } }, style: '{"style":{"size":"lg"}}' },
                },
            },
        },
        {
            view: {
                id: 6,
                metadata: {
                    image: {
                        value: {
                            const: {
                                text: 'https://gips2.baidu.com/it/u=1651586290,17201034&fm=3028&app=3028&f=JPEG&fmt=auto&q=100&size=f600_800',
                            },
                        },
                        style: '{"style":{"borderRadius":"1.25rem"}}',
                    },
                },
            },
        },
        {
            form: {
                id: 8,
                output: 'integer',
                metadata: {
                    style: '{"style":{"borderRadius":"0.5rem","borderStyle":"solid","paddingTop":"5px","paddingBottom":"5px"},"placeholder":"form 2"}',
                },
            },
        },
        {
            form: {
                id: 9,
                output: 'bool',
                metadata: {
                    style: '{"style":{"size":"m","location":"left","paddingTop":"5px","paddingBottom":"12px"}}',
                },
            },
        },
        {
            form: {
                id: 10,
                output: 'number',
                metadata: {
                    style: '{"style":{"borderRadius":"0.5rem","borderStyle":"solid","paddingTop":"5px","paddingBottom":"5px"},"placeholder":"form4"}',
                },
            },
        },
        { form: { id: 11, output: { object: [{ key: 'key0', ty: 'bool' }] }, metadata: {} } },
        {
            form: {
                id: 12,
                output: { array: 'text' },
                metadata: {
                    default: { array: { ty: 'text', values: [] } },
                    style: '{"style":{"borderRadius":"0.5rem","borderStyle":"solid","paddingTop":"5px","paddingBottom":"5px"},"placeholder":""}',
                },
            },
        },
        {
            call: {
                id: 13,
                metadata: {
                    ic: {
                        trigger: { click: { text: { const: { text: 'Call ic' } } } },
                        action: {
                            call: {
                                canister_id: { const: { text: 'myniu-wqaaa-aaaah-advna-cai' } },
                                api: {
                                    api: {
                                        origin: {
                                            candid: 'type Attribute = record { key : text; value : text };\ntype CanisterArgs = variant {\n  Upgrade : PlatformUpgradeArgs;\n  Init : PlatformInitArgs;\n};\ntype ChannelCategory = variant { Playlist; Radio; Other };\ntype MusicCategory = variant {\n  Emo;\n  Ska;\n  SoulMusic;\n  Britpop;\n  CountryMusic;\n  PopularMusic;\n  Singing;\n  EasyListening;\n  MusicOfLatinAmerica;\n  ElectronicDanceMusic;\n  HeavyMetal;\n  Funk;\n  Jazz;\n  KPop;\n  Reggae;\n  Rock;\n  HardRock;\n  ChristianMusic;\n  SynthPop;\n  ProgressiveRock;\n  Blues;\n  IndieRock;\n  PopMusic;\n  Grunge;\n  HouseMusic;\n  Disco;\n  FolkMusic;\n  WorldMusic;\n  NewAgeMusic;\n  TranceMusic;\n  IndianClassicalMusic;\n  ExperimentalMusic;\n  SwingMusic;\n  Dubstep;\n  ElectronicMusic;\n  Metal;\n  MusicOfAfrica;\n  LatinMusic;\n  PunkRock;\n  DanceMusic;\n  RhythmAndBlues;\n  VocalMusic;\n  ClassicalMusic;\n  Bachata;\n  Other;\n  NewWave;\n  Modernism;\n  HipHopMusic;\n  AlternativeRock;\n  Flamenco;\n  Techno;\n};\ntype MusicChannel = record {\n  id : nat64;\n  total_likes : nat64;\n  created : nat64;\n  sorted : bool;\n  owner : principal;\n  tracks : vec TrackInfo;\n  name : text;\n  total_plays : nat64;\n  music_type : MusicType;\n  updated : nat64;\n  category : opt ChannelCategory;\n  image : opt text;\n};\ntype MusicType = variant {\n  Pop;\n  Jazz;\n  Reggae;\n  Rock;\n  Blues;\n  HipHop;\n  Classical;\n  Electronic;\n  Other;\n  Country;\n};\ntype OssFileInfo = record {\n  oss_canister_id : principal;\n  track_id : nat64;\n  space_canister_id : principal;\n  file_id : nat32;\n};\ntype PlatformInitArgs = record {\n  ecdsa_key_name : text;\n  owner : principal;\n  name : text;\n  token_expiration : nat64;\n  init_channel : bool;\n};\ntype PlatformUpgradeArgs = record {\n  owner : opt principal;\n  token_expiration : opt nat64;\n};\ntype Result = variant { Ok : blob; Err : text };\ntype Result_1 = variant { Ok; Err : text };\ntype Result_2 = variant { Ok : MusicChannel; Err : text };\ntype Result_3 = variant { Ok : State; Err : text };\ntype State = record {\n  ecdsa_token_public_key : text;\n  next_channel_id : nat64;\n  ecdsa_key_name : text;\n  owner : principal;\n  name : text;\n  token_expiration : nat64;\n  space_count : nat;\n};\ntype Token = record {\n  subject : principal;\n  audience : principal;\n  policies : text;\n};\ntype TrackInfo = record {\n  duration : opt nat64;\n  external_url : text;\n  animation_url : text;\n  name : text;\n  album_name : opt text;\n  description : text;\n  created_at : nat64;\n  oss_file_info : opt OssFileInfo;\n  audio_url : text;\n  likes : nat64;\n  artist_name : text;\n  attributes : vec Attribute;\n  release_at : opt nat64;\n  category : opt MusicCategory;\n  image : text;\n  plays : nat64;\n  position : nat64;\n};\ntype WalletReceiveResult = record { accepted : nat64 };\nservice : (opt CanisterArgs) -> {\n  __get_candid_interface_tmp_hack : () -> (text) query;\n  access_token : (principal) -> (Result);\n  add_track_to_channel : (nat64, TrackInfo) -> (Result_1);\n  batch_add_tracks_to_channel : (nat64, vec TrackInfo) -> (Result_1);\n  delete_track_from_channel : (nat64, nat64) -> (Result_1);\n  delete_track_from_channel_by_share : (nat64, principal, nat64) -> (Result_1);\n  get_channel_info : (nat64) -> (Result_2) query;\n  get_channel_list : () -> (vec MusicChannel) query;\n  get_platform_info : () -> (Result_3) query;\n  sign_access_token : (Token) -> (Result);\n  wallet_balance : () -> (nat) query;\n  wallet_receive : () -> (WalletReceiveResult);\n}',
                                            method: 'access_token',
                                        },
                                    },
                                },
                                info: {
                                    module_hash:
                                        'a8d45b2c82139a48e65106e7c632315dd95eb26032ff96b6d05ce47e9c5ef399',
                                    updated: 1732105852459,
                                },
                                arg: {
                                    code: {
                                        data: [],
                                        code: {
                                            code: {
                                                code: { code: 'result = `Hello World!`;' },
                                                js: '',
                                            },
                                        },
                                    },
                                },
                                ret: {
                                    code: {
                                        code: {
                                            code: { code: 'result = `Hello World!`;' },
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
            call: {
                id: 14,
                metadata: {
                    evm: {
                        trigger: { click: { text: { const: { text: 'Call ethereum' } } } },
                        chain: 'ethereum',
                        action: { sign: { const: { text: 'eth message' } } },
                    },
                },
                output: 'text',
            },
        },
        {
            call: {
                id: 15,
                metadata: {
                    evm: {
                        trigger: {
                            click: { text: { const: { text: 'Call ethereum-test-sepolia' } } },
                        },
                        chain: 'ethereum-test-sepolia',
                        action: { sign: { const: { text: 'eth message2' } } },
                    },
                },
                output: 'text',
            },
        },
        {
            identity: {
                id: 16,
                metadata: {
                    metadata: {
                        ic: {
                            includes: [{ any: {} }],
                            connect: { const: { text: 'Connect Wallet ic' } },
                        },
                    },
                },
            },
        },
        {
            identity: {
                id: 17,
                metadata: {
                    metadata: {
                        evm: {
                            chain: 'ethereum',
                            includes: [{ any: {} }],
                            connect: { const: { text: 'Connect Wallet eth' } },
                        },
                    },
                },
            },
        },
        {
            identity: {
                id: 18,
                metadata: {
                    metadata: {
                        evm: {
                            chain: 'ethereum-test-sepolia',
                            includes: [{ any: {} }],
                            connect: { const: { text: 'Connect Wallet eth test' } },
                        },
                    },
                },
            },
        },
        {
            call: {
                id: 19,
                metadata: {
                    http: {
                        trigger: { click: { text: { const: { text: 'Call http' } } } },
                        url: { const: { text: 'https://baidu.com' } },
                        method: 'GET',
                        parsed: 'json',
                        post: { code: { code: { code: 'result = `Hello World!`;' }, js: '' } },
                    },
                },
                output: 'text',
            },
        },
        {
            form: {
                id: 7,
                output: 'text',
                metadata: {
                    style: '{"style":{"paddingTop":"5px","paddingBottom":"5px"},"placeholder":"111"}',
                },
            },
        },
        {
            interaction: {
                id: 20,
                metadata: {
                    metadata: {
                        choose: {
                            values: [
                                { name: 'Option 1', value: { const: { text: 'option1' } } },
                                { name: 'Option 2', value: { const: { text: 'option2' } } },
                                { name: 'Option 3', value: { const: { text: 'option3' } } },
                                { name: 'Option 4', value: { const: { text: 'option4' } } },
                            ],
                            style: '{"style":{"gridTemplateColumns":"repeat(2, minmax(0, 1fr))","paddingTop":"5px","paddingBottom":"5px","borderRadius":"0.5rem","fontWeight":"400","color":"#ffffff","backgroundColor":"#000000"}}',
                        },
                    },
                },
            },
        },
        {
            interaction: {
                id: 21,
                metadata: {
                    metadata: {
                        choose_form: {
                            values: [
                                { name: 'Option 1', value: { const: { text: 'option1' } } },
                                { name: 'Option 2', value: { const: { text: 'option2' } } },
                                { name: 'Option 3', value: { const: { text: 'option3' } } },
                                { name: 'Option 4', value: { const: { text: 'option4' } } },
                            ],
                            confirm: 'Confirm',
                            style: '{"style":{"gridTemplateColumns":"repeat(2, minmax(0, 1fr))","paddingTop":"5px","paddingBottom":"5px","borderRadius":"0.5rem","fontWeight":"400","color":"#ffffff","backgroundColor":"#634BFF"},"formPlaceholder":"xxxx"}',
                        },
                    },
                },
            },
        },
        {
            interaction: {
                id: 22,
                metadata: {
                    metadata: {
                        choose_tip: {
                            values: {
                                const: {
                                    array: {
                                        ty: 'text',
                                        values: [
                                            { text: 'Option 1' },
                                            { text: 'Option 2' },
                                            { text: 'Option 3' },
                                            { text: 'Option 4' },
                                        ],
                                    },
                                },
                            },
                            tips: {
                                const: {
                                    array: {
                                        ty: 'text',
                                        values: [
                                            { text: 'tips 1' },
                                            { text: 'tips 2' },
                                            { text: 'tips 3' },
                                            { text: 'tips 4' },
                                        ],
                                    },
                                },
                            },
                            style: '{"style":{"paddingTop":"5px","paddingBottom":"5px"},"outputLabel":"xxx","placeholder":"in3"}',
                        },
                    },
                },
            },
        },
        // {
        //     interaction: {
        //         id: 23,
        //         metadata: {
        //             metadata: {
        //                 choose_full: {
        //                     values: { refer: { endpoint: { id: 0 } } },
        //                     form: {},
        //                     style: '{"style":{"gridTemplateColumns":"repeat(2, minmax(0, 1fr))","paddingTop":"5px","paddingBottom":"5px","borderRadius":"0.5rem","fontWeight":"600","color":"#03E17A","backgroundColor":"#FF2989"}}',
        //                 },
        //             },
        //         },
        //         inlets: [{ id: 24 }],
        //     },
        // },
        {
            const: {
                id: 24,
                metadata: { value: { array: { ty: { object: [] }, values: [] } } },
                output: { array: { object: [] } },
            },
        },
    ],
};
