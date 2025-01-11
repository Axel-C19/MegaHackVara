import { HexString } from '@gear-js/api';

interface ContractSails {
  programId: HexString,
  idl: string
}

export const ACCOUNT_ID_LOCAL_STORAGE_KEY = 'account';

export const ADDRESS = {
  NODE: import.meta.env.VITE_NODE_ADDRESS,
  BACK: import.meta.env.VITE_BACKEND_ADDRESS,
  GAME: import.meta.env.VITE_CONTRACT_ADDRESS as HexString,
};

export const ROUTES = {
  HOME: '/',
  MAIN: '/Main',
  EXAMPLES: '/examples',
  NOTFOUND: '*',
};

// To use the example code, enter the details of the account that will pay the vouchers, etc. (name and mnemonic)
// Here, you have an example account that contains tokens, in your dApp, you need to put a sponsor name
// and a sponsor mnemonic
export const sponsorName = 'Alice';
export const sponsorMnemonic = 'bottom drive obey lake curtain smoke basket hold race lonely fit walk';

export const CONTRACT_DATA: ContractSails = {
  programId: '0xb3809b8c18422c3a8fc6e3452b11234dea7cddbfd073c427f42e1ed08408cdb7',
  idl: `
    type ExpenseDto = struct {
  description: str,
  amount: u128,
  currency: str,
};

type Events = enum {
  GroupCreated: u32,
  UserJoined: struct { actor_id, u32 },
  ExpenseAdded: struct { u32, u32 },
  Error: str,
};

type IoState = struct {
  admins: vec actor_id,
  groups: vec Group,
};

type Group = struct {
  id: u32,
  members: vec actor_id,
  expenses: vec Expense,
};

type Expense = struct {
  id: u32,
  description: str,
  amount: u128,
  currency: str,
  actor_id: actor_id,
};

constructor {
  New : ();
};

service Service {
  AddExpense : (group_id: u32, expenseDTO: ExpenseDto) -> Events;
  CreateGroup : () -> Events;
  JoinGroup : (group_id: u32) -> Events;
  query Query : () -> IoState;
  query QueryAdmins : () -> vec actor_id;
  query QueryExpenses : (group_id: u32) -> opt vec Expense;
  query QueryGroupMembers : (group_id: u32) -> opt vec actor_id;
};
  `
};