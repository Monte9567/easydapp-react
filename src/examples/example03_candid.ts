export const candid = `type definite_canister_settings =
 record {
   compute_allocation: nat;
   controllers: opt vec principal;
   freezing_threshold: nat;
   memory_allocation: nat;
 };
type VerifyResult =
 variant {
   err: Err;
   ok: TokenIdentifier;
 };
type User__2 =
 variant {
   address: AccountIdentifier;
   "principal": principal;
 };
type User__1 =
 variant {
   address: AccountIdentifier;
   "principal": principal;
 };
type UserId__2 = principal;
type UserId__1 = principal;
type UserId = principal;
type User =
 variant {
   address: AccountIdentifier;
   "principal": principal;
 };
type UpdateInformationRequest = record {
                                  metrics: opt CollectMetricsRequestType;};
type UpdateCallsAggregatedData = vec nat64;
type TradeType =
 variant {
   auction;
   dutchAuction;
   fixed;
   offer;
 };
type TradeResult =
 variant {
   err: Err__1;
   ok: Order;
 };
type TokenSpec__3 =
 record {
   canister: text;
   decimal: nat;
   fee: nat64;
   symbol: text;
 };
type TokenSpec__2 =
 record {
   canister: text;
   decimal: nat;
   fee: nat64;
   symbol: text;
 };
type TokenSpec__1 =
 variant {
   extensible: CandyValue;
   ic: ICTokenSpec;
 };
type TokenSpec =
 record {
   canister: text;
   decimal: nat;
   fee: nat64;
   symbol: text;
 };
type TokenSettlement =
 record {
   amount: nat;
   caller: principal;
   from_subaccount: opt blob;
   memo: opt blob;
   to: principal;
   to_subaccount: opt blob;
   token: TokenSpec__3;
 };
type TokenIdentifier__4 = text;
type TokenIdentifier__3 = text;
type TokenIdentifier__2 = text;
type TokenIdentifier__1 = text;
type TokenIdentifier = text;
type Time = int;
type StatusResponse =
 record {
   cycles: opt nat64;
   heap_memory_size: opt nat64;
   memory_size: opt nat64;
 };
type StatusRequest =
 record {
   cycles: bool;
   heap_memory_size: bool;
   memory_size: bool;
 };
type StatsListings =
 record {
   price: Price__3;
   tokenIdentifier: TokenIdentifier__3;
 };
type Standard =
 variant {
   ext;
   ogy: OgyInfo;
 };
type ShowCart =
 record {
   collectionName: text;
   nftName: text;
   nftUrl: text;
   price: nat64;
   tokenIdentifier: TokenIdentifier;
 };
type Settlement =
 variant {
   point: PointSettlement;
   "record": RecordSettlement;
   token: TokenSettlement;
 };
type Royality =
 record {
   precision: nat64;
   rate: nat64;
 };
type Result_7 =
 variant {
   err: text;
   ok: BlockIndex;
 };
type Result_6 =
 variant {
   err: record {
          TokenIdentifier;
          text;
        };
   ok: TokenIdentifier;
 };
type Result_5 =
 variant {
   err: CollectionErr;
   ok: principal;
 };
type Result_4 =
 variant {
   err: ProfileErr;
   ok;
 };
type Result_3 =
 variant {
   err: ProfileErr;
   ok: ProfileLet;
 };
type Result_2 =
 variant {
   err: text;
   ok;
 };
type Result_1 =
 variant {
   err: CollectionErr;
   ok;
 };
type Result =
 variant {
   err: text;
   ok: nat;
 };
type RecordSettlement =
 record {
   collection: principal;
   date: int;
   eventType: RecordEventType;
   from: opt principal;
   fromAID: opt AccountIdentifier__2;
   height: nat64;
   item: TokenIdentifier__2;
   memo: nat64;
   price: opt Price__2;
   to: opt principal;
   toAID: opt AccountIdentifier__2;
   tokenSymbol: opt text;
 };
type RecordEventType =
 variant {
   acceptOffer;
   auction;
   auctionDeal;
   claim;
   dutchAuction;
   list;
   mint;
   offer;
   point;
   sold;
   transfer;
 };
type Property =
 record {
   immutable: bool;
   name: text;
   value: CandyValue;
 };
type ProfileLet =
 record {
   avatar: Img;
   banner: Img;
   bio: text;
   collected: vec TokenIdentifier__4;
   collections: vec principal;
   created: vec TokenIdentifier__4;
   email: text;
   favorited: vec TokenIdentifier__4;
   followeds: vec UserId__2;
   followers: vec UserId__2;
   notification: vec text;
   offersMade: vec OfferId__2;
   offersReceived: vec OfferId__2;
   time: Time;
   userId: UserId__2;
   userName: text;
 };
type ProfileErr =
 variant {
   alreadyCreate;
   defaultAccount;
   noProfile;
 };
type Price__3 = nat64;
type Price__2 = nat64;
type Price__1 = nat64;
type Price = nat64;
type PointSettlement =
 record {
   amount: nat64;
   user: User__2;
 };
type PageParam =
 record {
   page: nat;
   pageCount: nat;
 };
type Order =
 record {
   buyer: User__1;
   fee:
    record {
      platform: record {
                  fee: nat64;
                  precision: nat64;
                };
      royalties: record {
                   fee: nat64;
                   precision: nat64;
                 };
    };
   memo: nat64;
   price: Price__1;
   seller: User__1;
   time: int;
   token: TokenSpec__2;
   tokenIdentifier: TokenIdentifier__1;
   tradeType: TradeType;
 };
type OgyInfo =
 record {
   creator: principal;
   fee: record {
          precision: nat64;
          rate: nat64;
        };
   owner: principal;
   token: TokenSpec__1;
   totalFee: record {
               precision: nat64;
               rate: nat64;
             };
 };
type OfferStatus =
 variant {
   accepted;
   expired;
   ineffect;
   rejected;
 };
type OfferResult =
 variant {
   err: Err__1;
   ok: OfferId__1;
 };
type OfferId__2 = nat;
type OfferId__1 = nat;
type OfferId = nat;
type Offer =
 record {
   bidder: principal;
   offerId: OfferId__1;
   price: Price__1;
   seller: User__1;
   status: OfferStatus;
   time: Time;
   token: TokenSpec__2;
   tokenIdentifier: TokenIdentifier__1;
   ttl: int;
 };
type NumericEntity =
 record {
   avg: nat64;
   first: nat64;
   last: nat64;
   max: nat64;
   min: nat64;
 };
type NewProfile =
 record {
   avatar: Img;
   banner: Img;
   bio: text;
   email: text;
   notification: vec text;
   userName: text;
 };
type NewOffer =
 record {
   bidder: principal;
   price: Price__1;
   seller: User__1;
   token: TokenSpec__2;
   tokenIdentifier: TokenIdentifier__1;
   ttl: int;
 };
type NewFixed =
 record {
   price: Price__1;
   token: TokenSpec__2;
   tokenIdentifier: TokenIdentifier__1;
 };
type NewDutchAuction =
 record {
   endTime: Time;
   floorPrice: Price__1;
   payee: opt User__1;
   reducePrice: Price__1;
   reduceTime: nat64;
   startPrice: Price__1;
   startTime: Time;
   token: TokenSpec__2;
   tokenIdentifier: TokenIdentifier__1;
 };
type Nanos = nat64;
type NFTInfo =
 record {
   favoriters: vec principal;
   lastPrice: Price__2;
   listTime: opt Time;
   listing: Listing;
   views: nat;
 };
type MetricsResponse = record {metrics: opt CanisterMetrics;};
type MetricsRequest = record {parameters: GetMetricsParameters;};
type MetricsGranularity =
 variant {
   daily;
   hourly;
 };
type LogMessagesData =
 record {
   message: text;
   timeNanos: Nanos;
 };
type Listings =
 record {
   price: Price__3;
   tokenIdentifier: TokenIdentifier__3;
 };
type Listing =
 variant {
   auction: Auction;
   dutchAuction: DutchAuction;
   fixed: Fixed;
   unlist;
 };
type ListResult =
 variant {
   err: Err__1;
   ok: TokenIdentifier__1;
 };
type Links =
 record {
   discord: opt text;
   instagram: opt text;
   medium: opt text;
   telegram: opt text;
   twitter: opt text;
   yoursite: opt text;
 };
type Img__2 = text;
type Img__1 = text;
type Img = text;
type ICTokenSpec =
 record {
   canister: principal;
   decimals: nat;
   fee: nat;
   standard: variant {
               DIP20;
               EXTFungible;
               ICRC1;
               Ledger;
             };
   symbol: text;
 };
type HourlyMetricsData =
 record {
   canisterCycles: CanisterCyclesAggregatedData;
   canisterHeapMemorySize: CanisterHeapMemoryAggregatedData;
   canisterMemorySize: CanisterMemoryAggregatedData;
   timeMillis: int;
   updateCalls: UpdateCallsAggregatedData;
 };
type GetMetricsParameters =
 record {
   dateFromMillis: nat;
   dateToMillis: nat;
   granularity: MetricsGranularity;
 };
type GetLogMessagesParameters =
 record {
   count: nat32;
   filter: opt GetLogMessagesFilter;
   fromTimeNanos: opt Nanos;
 };
type GetLogMessagesFilter =
 record {
   analyzeCount: nat32;
   messageContains: opt text;
   messageRegex: opt text;
 };
type GetLatestLogMessagesParameters =
 record {
   count: nat32;
   filter: opt GetLogMessagesFilter;
   upToTimeNanos: opt Nanos;
 };
type GetInformationResponse =
 record {
   logs: opt CanisterLogResponse;
   metrics: opt MetricsResponse;
   status: opt StatusResponse;
   version: opt nat;
 };
type GetInformationRequest =
 record {
   logs: opt CanisterLogRequest;
   metrics: opt MetricsRequest;
   status: opt StatusRequest;
   version: bool;
 };
type Fixed =
 record {
   fee: Fee;
   price: Price__2;
   seller: principal;
   token: TokenSpec__3;
   tokenIdentifier: TokenIdentifier__2;
 };
type Fee =
 record {
   platform: Price__2;
   royalties: Price__2;
 };
type Err__1 =
 variant {
   amlNotPass;
   auctionFail;
   kycNotPass;
   kycorAmlNotPass;
   msgandBidder: record {
                   principal;
                   principal;
                 };
   nftAlreadyListing;
   nftNotAuction;
   nftNotlist;
   nftlockedByOther;
   notFoundOffer;
   offerExpired;
   other: record {
            TokenIdentifier__1;
            text;
          };
 };
type Err =
 variant {
   CannotNotify: AccountIdentifier__1;
   DuplicateHeight;
   InsufficientBalance;
   InvalidToken: TokenIdentifier;
   NotList;
   NotSell;
   Other: text;
   Rejected;
   TxNotFound;
   Unauthorized: AccountIdentifier__1;
   VerifyTxErr;
 };
type DutchAuctionResult =
 variant {
   err: Err__1;
   ok;
 };
type DutchAuction =
 record {
   endTime: Time;
   fee: Fee;
   floorPrice: Price__2;
   payee: User__2;
   reducePrice: Price__2;
   reduceTime: nat64;
   seller: principal;
   startPrice: Price__2;
   startTime: Time;
   token: TokenSpec__3;
   tokenIdentifier: TokenIdentifier__2;
 };
type DealPrice =
 record {
   price: nat64;
   token: TokenSpec;
 };
type DailyMetricsData =
 record {
   canisterCycles: NumericEntity;
   canisterHeapMemorySize: NumericEntity;
   canisterMemorySize: NumericEntity;
   timeMillis: int;
   updateCalls: nat64;
 };
type CreatorInfo =
 record {
   canister: principal;
   user: UserId__1;
   userName: text;
 };
type CollectionStatsImmut =
 record {
   createTime: Time;
   floorPrice: Price__2;
   listings: vec Listings;
   tradeCount: nat;
   volumeTrade: Price__2;
 };
type CollectionSortingField =
 variant {
   createTime;
   floorPrice;
   listingNumber;
   name;
   volumeTrade;
 };
type CollectionSortFilterArgs =
 record {
   ascending: bool;
   filterArgs: CollectionFilterArgs;
   limit: nat;
   offset: nat;
   sortingField: CollectionSortingField;
 };
type CollectionInit =
 record {
   banner: opt Img__1;
   category: opt Category;
   description: opt text;
   featured: opt Img__1;
   isVisible: bool;
   links: opt Links;
   logo: opt Img__1;
   name: opt text;
   openTime: opt Time;
   releaseTime: opt Time;
   royalties: Royality;
   standard: Standard;
   url: opt text;
 };
type CollectionInfo__1 =
 record {
   banner: opt Img__1;
   canisterId: principal;
   category: opt Category;
   creator: UserId;
   description: opt text;
   featured: opt Img__1;
   isVisible: bool;
   links: opt Links;
   logo: opt Img__1;
   name: text;
   releaseTime: opt Time;
   royalties: Royality;
   standard: Standard;
   url: opt text;
 };
type CollectionInfo =
 record {
   banner: opt Img__1;
   canisterId: principal;
   category: opt Category;
   creator: UserId;
   description: opt text;
   featured: opt Img__1;
   isVisible: bool;
   links: opt Links;
   logo: opt Img__1;
   name: text;
   releaseTime: opt Time;
   royalties: Royality;
   standard: Standard;
   url: opt text;
 };
type CollectionFilterArgs =
 record {
   category: opt vec text;
   creator: opt vec UserId;
   name: opt text;
 };
type CollectionErr =
 variant {
   guestCannotCreateCollection;
   maxCollNum;
   perMaxCollNum;
 };
type CollectionData =
 record {
   creator: opt CollectionCreatorData;
   info: CollectionInfo__1;
   stats: opt CollectionStatsImmut;
 };
type CollectionCreatorData =
 record {
   avatar: Img__1;
   bio: text;
   time: Time;
   userId: UserId;
   userName: text;
 };
type CollectMetricsRequestType =
 variant {
   force;
   normal;
 };
type Category = text;
type CanisterMetricsData =
 variant {
   daily: vec DailyMetricsData;
   hourly: vec HourlyMetricsData;
 };
type CanisterMetrics = record {data: CanisterMetricsData;};
type CanisterMemoryAggregatedData = vec nat64;
type CanisterLogResponse =
 variant {
   messages: CanisterLogMessages;
   messagesInfo: CanisterLogMessagesInfo;
 };
type CanisterLogRequest =
 variant {
   getLatestMessages: GetLatestLogMessagesParameters;
   getMessages: GetLogMessagesParameters;
   getMessagesInfo;
 };
type CanisterLogMessagesInfo =
 record {
   count: nat32;
   features: vec opt CanisterLogFeature;
   firstTimeNanos: opt Nanos;
   lastTimeNanos: opt Nanos;
 };
type CanisterLogMessages =
 record {
   data: vec LogMessagesData;
   lastAnalyzedMessageTimeNanos: opt Nanos;
 };
type CanisterLogFeature =
 variant {
   filterMessageByContains;
   filterMessageByRegex;
 };
type CanisterHeapMemoryAggregatedData = vec nat64;
type CanisterCyclesAggregatedData = vec nat64;
type CandyValue =
 variant {
   Array: variant {
            frozen: vec CandyValue;
            thawed: vec CandyValue;
          };
   Blob: blob;
   Bool: bool;
   Bytes: variant {
            frozen: vec nat8;
            thawed: vec nat8;
          };
   Class: vec Property;
   Empty;
   Float: float64;
   Floats: variant {
             frozen: vec float64;
             thawed: vec float64;
           };
   Int: int;
   Int16: int16;
   Int32: int32;
   Int64: int64;
   Int8: int8;
   Nat: nat;
   Nat16: nat16;
   Nat32: nat32;
   Nat64: nat64;
   Nat8: nat8;
   Nats: variant {
           frozen: vec nat;
           thawed: vec nat;
         };
   Option: opt CandyValue;
   Principal: principal;
   Text: text;
 };
type BlockIndex = nat64;
type BatchVerifyResult =
 variant {
   err: Err;
   ok: vec TokenIdentifier;
 };
type BatchTradeResult =
 variant {
   err: Err__1;
   ok: vec record {
             price: nat64;
             tid: nat;
             token: TokenSpec__2;
           };
 };
type Auction =
 record {
   fee: Fee;
   highestBidder: opt principal;
   highestPrice: opt Price__2;
   resevePrice: opt Price__2;
   seller: principal;
   startPrice: Price__2;
   tokenIdentifier: TokenIdentifier__2;
   ttl: int;
 };
type AddCart =
 record {
   nftName: text;
   nftUrl: text;
   tokenIdentifier: TokenIdentifier;
 };
type AccountIdentifier__2 = text;
type AccountIdentifier__1 = text;
type AccountIdentifier = text;
service : {
  acceptOffer: (OfferId) -> (Result_7);
  addCanisterController: (principal, principal) -> () oneway;
  addCarts: (vec AddCart) -> (vec Result_6);
  addCreator_whitelist: (vec principal) -> ();
  addSecond_creator_whitelist: (vec principal) -> ();
  add_import_collection_price: (TokenSpec, nat) -> () oneway;
  add_shikuland_owner: (User) -> () oneway;
  balance: () -> (nat);
  batchBuyNow: (vec TokenIdentifier) -> (BatchTradeResult);
  batchSell: (vec NewFixed) -> (vec ListResult);
  batchUpdateProfile: (vec UserId__1, text) -> ();
  batchVerifyTx2: (vec record {
                         nat;
                         TokenSpec;
                       }) -> (BatchVerifyResult);
  buyNow: (TokenIdentifier) -> (TradeResult);
  cancelOffer: (OfferId) -> (bool);
  checkOffer: (vec TokenIdentifier) -> ();
  checkSubAccountBalance: (AccountIdentifier__1, TokenSpec) -> (nat64);
  checkTx: (vec TokenIdentifier) -> ();
  collectionStats: (principal) ->
   (opt
     record {
       createTime: Time;
       floorPrice: Price;
       listings: vec StatsListings;
       tradeCount: nat;
       volumeTrade: Price;
     }) query;
  createCollection: (CollectionInit) -> (Result_5);
  createProfile: (NewProfile) -> (Result_4);
  createProfile4User: (principal, NewProfile) -> (Result_4);
  created: (TokenIdentifier, principal) -> ();
  dealOffer: (vec TokenIdentifier) -> ();
  delCreator_whitelist: (vec principal) -> ();
  delSecond_creator_whitelist: (vec principal) -> ();
  del_import_collection_price: (TokenSpec) -> () oneway;
  deleteCanister: (principal) -> ();
  deleteWait: (TokenIdentifier) -> ();
  deleteWaitByHeight: (nat) -> ();
  favorite: (TokenIdentifier) -> ();
  findHighOfferByNft: (TokenIdentifier) -> (opt Offer);
  findOfferById: (OfferId) -> (opt Offer);
  findOfferByNft: (TokenIdentifier) -> (vec Offer) query;
  findProfile: () -> (Result_3) query;
  findProfileWho: (User__2) -> (Result_3) query;
  flushPriceOfAuction: () -> ();
  follow: (principal) -> ();
  getBatchListingByTid: (nat) -> (vec Listing);
  getCanisterSettings: (principal) -> (definite_canister_settings);
  getCanistergeekInformation: (GetInformationRequest) ->
   (GetInformationResponse) query;
  getCollectionData: (principal) -> (opt CollectionData) query;
  getCollectionDatas: (vec principal) -> (vec CollectionData) query;
  getConfig: () ->
   (record {
      block: text;
      lanuchpad: principal;
      ledeger: text;
      owner: principal;
      platformFeeAccount: principal;
      point: principal;
      "record": principal;
    }) query;
  getCreator_whitelist: () -> (vec principal) query;
  getListingByHeight: (nat64, TokenSpec) -> (opt Listing);
  getListingByTid: (nat) -> (opt Listing);
  getOfferTids: () -> (vec TokenIdentifier) query;
  getOwner: () -> (principal);
  getPayAddress: () -> (text);
  getPayAddressWho: (principal) -> (text) query;
  getPriceOfAuction: (TokenIdentifier) -> (opt DealPrice) query;
  getSecond_creator_whitelist: () -> (vec principal) query;
  getSettlement: () -> (vec record {
                              Settlement;
                              nat;
                            }) query;
  get_import_collection_price: () -> (vec record {
                                            TokenSpec;
                                            nat;
                                          }) query;
  get_shikuland_owers: () -> (vec User) query;
  getrecordMarks: () ->
   (vec record {
          principal;
          vec record {
                text;
                nat;
              };
        }) query;
  getrecordMarksByCanister: (principal) -> (vec record {
                                                  text;
                                                  nat;
                                                }) query;
  handleOrigynActivity: (principal, vec text) -> ();
  icrc1_balance: (principal, text) -> (nat);
  importCollection: (principal, text, CollectionInit) -> (Result_1);
  importCollectionWithToken: (CollectionInit, TokenSpec, opt principal,
   opt principal) -> (Result_2);
  listCollected: () -> (vec TokenIdentifier) query;
  listCollections: () -> (vec text) query;
  listCollections2: (opt CollectionSortFilterArgs) ->
   (vec CollectionData) query;
  listCreated: () -> (vec TokenIdentifier) query;
  listCreators: () -> (vec CreatorInfo);
  listFavorite: () -> (vec TokenIdentifier) query;
  listOfferMade: (principal) -> (vec Offer);
  listOfferReceived: (principal) -> (vec Offer);
  listOrigynCollections: () -> (vec principal) query;
  listProfile: () -> (vec record {
                            text;
                            text;
                            text;
                          }) query;
  listfolloweds: () -> (vec principal) query;
  listfollowers: () -> (vec principal) query;
  makeOffer: (NewOffer) -> (OfferResult);
  migrateCollection: () -> ();
  migrateListing: () -> ();
  myCollectionList: () -> (vec CollectionInfo) query;
  nftInfo: (TokenIdentifier) -> (NFTInfo) query;
  nftInfos: (vec TokenIdentifier) -> (vec NFTInfo) query;
  nftInfosByCollection: (principal, vec nat32) -> (vec NFTInfo) query;
  nftInfosByCollectionOgy: (principal, vec text) -> (vec NFTInfo);
  nftInfosByCollectionPageable: (principal, PageParam) -> (vec NFTInfo) query;
  pageListProfile: (PageParam) ->
   (vec record {
          text;
          text;
          text;
          text;
          int;
        }) query;
  profileCount: () -> (nat) query;
  queryPlatformFee: () ->
   (record {
      account: AccountIdentifier__1;
      fee: Price;
      precision: nat64;
    }) query;
  queryPointRatio: () -> (nat64) query;
  querySortedCollection: (CollectionSortingField, bool, nat, nat,
   CollectionFilterArgs) -> (vec principal);
  rejectOffer: (OfferId) -> (Result_2);
  rejectOfferByUser: (OfferId) -> (Result_2);
  removeCarts: (opt TokenIdentifier) -> ();
  removeCollection: (principal, text) -> (Result_1);
  reset_shikuland_owner: () -> ();
  sell: (NewFixed) -> (ListResult);
  sellDutchAuction: (NewDutchAuction) -> (DutchAuctionResult);
  setEntrepotCreator: (principal, AccountIdentifier__1) -> () oneway;
  setMinter: (principal, text) -> ();
  setOwner: (principal) -> ();
  setPlatformAccount: (principal) -> ();
  setPlatformFee: (nat64, nat64) -> ();
  setPointRatio: (nat64) -> ();
  setPriceOfAuction: (TokenIdentifier, DealPrice) -> ();
  setRateLimit: (nat, nat) -> ();
  setRateLimitFalse: () -> ();
  showCart: () -> (vec ShowCart);
  subscribe: (text) -> ();
  test: (principal, principal, text, nat, opt nat) -> (Result);
  unSell: (TokenIdentifier) -> (ListResult);
  unfavorite: (TokenIdentifier) -> ();
  unfollow: (principal) -> ();
  updateAvatar: (principal, Img__2) -> (bool);
  updateCanistergeekInformation: (UpdateInformationRequest) -> ();
  updateCollection: (CollectionInfo) -> (bool);
  updateCreators: () -> (text);
  updateOffer: (OfferId, Price) -> (OfferResult);
  updateProfile: (NewProfile) -> (bool);
  verifyTxWithMemo2: (nat, TokenSpec) -> (VerifyResult);
  view: (TokenIdentifier) -> ();
  volumeTraded: (principal, Price) -> ();
  wallet_receive: () -> (nat);
  withdraw: (AccountIdentifier__1, Price, nat64, TokenSpec) -> (bool);
  withdrawByAdmin: (principal, Price, TokenSpec) -> (bool);
  withdrawBySubAccount: (User, Price, TokenSpec) -> (bool);
}
`;
