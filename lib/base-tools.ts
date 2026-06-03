/**
 * Live Base-chain on-chain data via the Blockscout public REST API (v2).
 * Base mainnet = chain 8453. No API key required (public, rate-limited).
 * Docs: https://base.blockscout.com/api-docs
 */

const BASE = process.env.BLOCKSCOUT_BASE_URL || "https://base.blockscout.com";

const ADDRESS_RE = /^0x[a-fA-F0-9]{40}$/;

async function bs<T = unknown>(path: string): Promise<T> {
  const res = await fetch(`${BASE}${path}`, {
    headers: { accept: "application/json" },
    // on-chain data changes constantly — never cache
    cache: "no-store",
  });
  if (!res.ok) {
    throw new Error(`Blockscout ${res.status} for ${path}`);
  }
  return (await res.json()) as T;
}

function assertAddress(address: string) {
  if (!ADDRESS_RE.test(address)) {
    throw new Error(`"${address}" is not a valid 0x address`);
  }
}

/** Native ETH balance + basic metadata for an address on Base. */
export async function getAddressInfo(address: string) {
  assertAddress(address);
  const data = await bs<{
    coin_balance?: string;
    hash?: string;
    is_contract?: boolean;
    ens_domain_name?: string | null;
    exchange_rate?: string | null;
  }>(`/api/v2/addresses/${address}`);

  const wei = BigInt(data.coin_balance ?? "0");
  const eth = Number(wei) / 1e18;
  const usd =
    data.exchange_rate != null ? eth * Number(data.exchange_rate) : null;

  return {
    address: data.hash ?? address,
    isContract: data.is_contract ?? false,
    ens: data.ens_domain_name ?? null,
    ethBalance: eth.toFixed(6),
    ethUsdRate: data.exchange_rate ?? null,
    usdValue: usd != null ? usd.toFixed(2) : null,
  };
}

/** ERC-20 token holdings for an address on Base (top by value/amount). */
export async function getAddressTokens(address: string, limit = 15) {
  assertAddress(address);
  const data = await bs<{
    items?: Array<{
      value?: string;
      token?: {
        name?: string;
        symbol?: string;
        decimals?: string;
        address_hash?: string;
        exchange_rate?: string | null;
      };
    }>;
  }>(`/api/v2/addresses/${address}/tokens?type=ERC-20`);

  const items = (data.items ?? []).slice(0, limit).map((it) => {
    const decimals = Number(it.token?.decimals ?? "18");
    const raw = BigInt(it.value ?? "0");
    const amount = Number(raw) / 10 ** decimals;
    const rate = it.token?.exchange_rate ? Number(it.token.exchange_rate) : null;
    return {
      symbol: it.token?.symbol ?? "?",
      name: it.token?.name ?? "Unknown token",
      contract: it.token?.address_hash ?? null,
      amount: amount.toLocaleString("en-US", { maximumFractionDigits: 6 }),
      usdValue: rate != null ? (amount * rate).toFixed(2) : null,
    };
  });

  return { count: items.length, tokens: items };
}

/** Recent transactions for an address on Base. */
export async function getAddressTransactions(address: string, limit = 10) {
  assertAddress(address);
  const data = await bs<{
    items?: Array<{
      hash?: string;
      from?: { hash?: string };
      to?: { hash?: string } | null;
      value?: string;
      timestamp?: string;
      result?: string;
      method?: string | null;
    }>;
  }>(`/api/v2/addresses/${address}/transactions`);

  const items = (data.items ?? []).slice(0, limit).map((tx) => ({
    hash: tx.hash,
    from: tx.from?.hash ?? null,
    to: tx.to?.hash ?? null,
    ethValue: (Number(BigInt(tx.value ?? "0")) / 1e18).toFixed(6),
    method: tx.method ?? null,
    status: tx.result ?? null,
    timestamp: tx.timestamp ?? null,
  }));

  return { count: items.length, transactions: items };
}

/** Search for a token on Base by name or symbol. */
export async function lookupTokenBySymbol(query: string) {
  const data = await bs<{
    items?: Array<{
      address_hash?: string;
      name?: string;
      symbol?: string;
      type?: string;
      exchange_rate?: string | null;
      circulating_market_cap?: string | null;
      holders_count?: string | null;
      reputation?: string | null;
    }>;
  }>(`/api/v2/tokens?q=${encodeURIComponent(query)}&type=ERC-20`);

  const items = (data.items ?? []).slice(0, 8).map((t) => ({
    symbol: t.symbol ?? "?",
    name: t.name ?? "Unknown",
    contract: t.address_hash ?? null,
    priceUsd: t.exchange_rate ?? null,
    marketCap: t.circulating_market_cap ?? null,
    holders: t.holders_count ?? null,
    // security signal: Blockscout reputation ("ok" | "neutral" | "scam" | null)
    reputation: t.reputation ?? "unknown",
  }));

  return { count: items.length, results: items };
}

/** Detailed info for a specific token contract on Base. */
export async function getTokenInfo(contract: string) {
  assertAddress(contract);
  const t = await bs<{
    name?: string;
    symbol?: string;
    decimals?: string;
    total_supply?: string;
    exchange_rate?: string | null;
    circulating_market_cap?: string | null;
    holders_count?: string | null;
    reputation?: string | null;
    address_hash?: string;
  }>(`/api/v2/tokens/${contract}`);

  const decimals = Number(t.decimals ?? "18");
  const supply =
    t.total_supply != null
      ? (Number(BigInt(t.total_supply)) / 10 ** decimals).toLocaleString(
          "en-US",
          { maximumFractionDigits: 0 }
        )
      : null;

  return {
    symbol: t.symbol ?? "?",
    name: t.name ?? "Unknown",
    contract: t.address_hash ?? contract,
    decimals,
    totalSupply: supply,
    priceUsd: t.exchange_rate ?? null,
    marketCap: t.circulating_market_cap ?? null,
    holders: t.holders_count ?? null,
    // security signal: Blockscout reputation ("ok" | "neutral" | "scam" | null)
    reputation: t.reputation ?? "unknown",
  };
}

/** OpenAI-compatible tool schemas exposed to the model. */
export const baseToolSchemas = [
  {
    type: "function" as const,
    function: {
      name: "getAddressInfo",
      description:
        "Get the native ETH balance and basic info (contract? ENS? USD value) for a wallet/contract address on the Base chain.",
      parameters: {
        type: "object",
        properties: {
          address: { type: "string", description: "A 0x... address on Base" },
        },
        required: ["address"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "getAddressTokens",
      description:
        "List the ERC-20 token holdings (symbol, amount, USD value) of an address on Base.",
      parameters: {
        type: "object",
        properties: {
          address: { type: "string", description: "A 0x... address on Base" },
        },
        required: ["address"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "getAddressTransactions",
      description: "List the most recent transactions for an address on Base.",
      parameters: {
        type: "object",
        properties: {
          address: { type: "string", description: "A 0x... address on Base" },
        },
        required: ["address"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "lookupTokenBySymbol",
      description:
        "Search Base for tokens matching a name or symbol. Returns price, market cap, holders, contract address and a reputation security signal.",
      parameters: {
        type: "object",
        properties: {
          query: { type: "string", description: "Token name or symbol, e.g. 'USDC'" },
        },
        required: ["query"],
      },
    },
  },
  {
    type: "function" as const,
    function: {
      name: "getTokenInfo",
      description:
        "Get detailed info (supply, price, market cap, holders, reputation/security signal) for a specific token contract on Base.",
      parameters: {
        type: "object",
        properties: {
          contract: {
            type: "string",
            description: "The 0x... token contract address on Base",
          },
        },
        required: ["contract"],
      },
    },
  },
];

type ToolArgs = Record<string, string>;

/** Dispatch a tool call by name to its implementation. */
export async function runBaseTool(
  name: string,
  args: ToolArgs
): Promise<unknown> {
  switch (name) {
    case "getAddressInfo":
      return getAddressInfo(args.address);
    case "getAddressTokens":
      return getAddressTokens(args.address);
    case "getAddressTransactions":
      return getAddressTransactions(args.address);
    case "lookupTokenBySymbol":
      return lookupTokenBySymbol(args.query);
    case "getTokenInfo":
      return getTokenInfo(args.contract);
    default:
      throw new Error(`Unknown tool: ${name}`);
  }
}
