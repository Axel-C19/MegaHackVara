import { HexString } from "@gear-js/api";

interface ContractSails {
  programId: HexString;
  idl: string;
}

export const ACCOUNT_ID_LOCAL_STORAGE_KEY = "account";

export const ADDRESS = {
  NODE: import.meta.env.VITE_NODE_ADDRESS,
  BACK: import.meta.env.VITE_BACKEND_ADDRESS,
  GAME: import.meta.env.VITE_CONTRACT_ADDRESS as HexString,
};

export const ROUTES = {
  LANDING: "/",
  HOME: "/home",
  EXPENSES: "/expenses",
  GROUPLIST: "/group-list",
  MAIN: "/Main",
  EXAMPLES: "/examples",
  NOTFOUND: "*",
};

// To use the example code, enter the details of the account that will pay the vouchers, etc. (name and mnemonic)
// Here, you have an example account that contains tokens, in your dApp, you need to put a sponsor name
// and a sponsor mnemonic
export const sponsorName = "Alice";
export const sponsorMnemonic =
  "bottom drive obey lake curtain smoke basket hold race lonely fit walk";

export const CONTRACT_DATA: ContractSails = {
  programId:
    "0x23fb2c14c54008e6f2419d5303742000693275c70eac20fe4c4189207575b0a4",
  idl: `type ExpenseDto = struct {
  description: str,
  amount: u128,
  currency: str,
};

type Events = enum {
  GroupCreated: u32,
  UserJoined: struct { actor_id, u32 },
  ExpenseAdded: struct { u32, u32 },
  PaymentAdded: struct { u32, u32 },
  Error: str,
};

type IoState = struct {
  groups: vec Group,
};

type Group = struct {
  id: u32,
  name: str,
  members: vec actor_id,
  expenses: vec Expense,
  payments: vec Payment,
};

type Expense = struct {
  id: u32,
  description: str,
  amount: u128,
  currency: str,
  actor_id: actor_id,
};

type Payment = struct {
  id: u32,
  from: actor_id,
  to: actor_id,
  amount: u32,
};

constructor {
  New : ();
};

service Service {
  AddExpense : (group_id: u32, expenseDTO: ExpenseDto) -> Events;
  AddPayment : (group_id: u32, amount: u32, to: actor_id) -> Events;
  CreateGroup : (group_name: str) -> Events;
  JoinGroup : (group_id: u32) -> Events;
  query Query : () -> IoState;
  query QueryActorGroups : () -> vec Group;
  query QueryExpenses : (group_id: u32) -> opt vec Expense;
  query QueryGroup : (groupId: u32) -> Group;
  query QueryGroupMembers : (group_id: u32) -> opt vec actor_id;
};
`,
};
