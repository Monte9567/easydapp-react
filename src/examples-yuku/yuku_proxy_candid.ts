export const candid = `type thirdCollectionInfo =
 record {
   collectionType: text;
   creator: principal;
 };
type User =
 variant {
   address: AccountIdentifier;
   "principal": principal;
 };
type TransferResponse =
 variant {
   err:
    variant {
      CannotNotify: AccountIdentifier;
      InsufficientBalance;
      InvalidToken: TokenIdentifier__1;
      Other: text;
      Rejected;
      Unauthorized: AccountIdentifier;
    };
   ok: Balance;
 };
type TransferRequest =
 record {
   amount: Balance;
   from: User;
   memo: Memo;
   notify: bool;
   subaccount: opt SubAccount;
   to: User;
   token: TokenIdentifier__1;
 };
type TokenIdentifier__1 = text;
type TokenIdentifier = text;
type Time = int;
type SubAccount = vec nat8;
type Result__1_1 =
 variant {
   err: CommonError;
   ok: Balance__1;
 };
type Result__1 =
 variant {
   err: CommonError;
   ok: AccountIdentifier__1;
 };
type Result_1 =
 variant {
   err: FillDepositErr;
   ok;
 };
type Result =
 variant {
   err: ReserveDepositErr;
   ok;
 };
type ReserveDepositErr =
 variant {
   checkOwnerErr;
   getBearerErr;
   unSupportCollectionErr;
 };
type Memo = blob;
type FillDepositErr =
 variant {
   getBearerErr;
   noExistDeposit;
   ownerError;
   unSupportCollectionErr;
 };
type DepositInfo =
 record {
   deposit: principal;
   status: bool;
   ttl: Time;
 };
type CommonError =
 variant {
   InvalidToken: TokenIdentifier__1;
   Other: text;
 };
type Balance__1 = nat;
type Balance = nat;
type AllowanceRequest =
 record {
   owner: User;
   spender: principal;
   token: TokenIdentifier__1;
 };
type AccountIdentifier__1 = text;
type AccountIdentifier = text;
service : {
  addCreator_whitelist: (vec principal) -> ();
  addThirdCollection: (principal, thirdCollectionInfo) -> () oneway;
  allowance: (AllowanceRequest) -> (Result__1_1);
  balance: () -> (nat);
  bearer: (TokenIdentifier) -> (Result__1);
  delCreator_whitelist: (vec principal) -> ();
  fillDeposit: (principal, nat32) -> (Result_1);
  getAllDeposit: () -> (vec record {
                              text;
                              nat32;
                              principal;
                            }) query;
  getCreator_whitelist: () -> (vec principal) query;
  getDeposit: (principal, nat32) -> (opt DepositInfo) query;
  getDepositTokenIndexs: (principal) -> (vec nat32) query;
  getDeposits: (principal, vec nat32) ->
   (vec record {
          nat32;
          principal;
        }) query;
  getMinter: (principal) -> (principal) query;
  getOwner: () -> (principal);
  getThirdCollections: () ->
   (vec record {
          principal;
          thirdCollectionInfo;
        }) query;
  getTokenIdentifierByUser: (principal) -> (vec TokenIdentifier) query;
  removeThirdCollection: (principal) ->
   (vec record {
          principal;
          thirdCollectionInfo;
        });
  reserveDeposit: (principal, nat32) -> (Result);
  setOwner: (principal) -> ();
  setYumiOwner: (principal) -> ();
  transfer: (TransferRequest) -> (TransferResponse);
  wallet_receive: () -> (nat);
  withdraw: (TokenIdentifier) -> (TransferResponse);
}
`;
