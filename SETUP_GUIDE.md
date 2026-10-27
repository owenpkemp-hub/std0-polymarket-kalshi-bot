# 🚀 Complete Real-Money & 24/7 Hands-Free Automation Guide
**For Owen Kemp — `std0 // POLYMARKET + KALSHI BOT` & `GROK DESK — SIX AGENTS · ONE BOOK`**

- **Live Web App #1 (`std0` Repricing Desk)**: [https://owenpkemp-hub.github.io/std0-polymarket-kalshi-bot/](https://owenpkemp-hub.github.io/std0-polymarket-kalshi-bot/)
- **Live Web App #2 (`GROK DESK` Six Agents)**: [https://owenpkemp-hub.github.io/grok-desk-six-agents/](https://owenpkemp-hub.github.io/grok-desk-six-agents/)

---

## 1. Getting Your Kalshi API Key (2 Minutes — Easiest First $10 US Real-Money Trade)
Kalshi is CFTC-regulated in the US, accepts instant debit/ACH deposits, and settles binary crypto & event contracts at **$1.00 per contract**.

1. **Log in to Kalshi**: Go to [https://kalshi.com](https://kalshi.com) and sign in to your account.
2. **Generate an API Key**:
   - Click your **Profile Icon (top right) → Account & Security → API Keys** (or go to `https://kalshi.com/account/profile`).
   - Click **Create New API Key** and name it `GrokDesk-Owen500`.
   - Kalshi will download a `.key` / `.pem` **RSA Private Key file** and show your **API Key ID** (a UUID like `a1b2c3d4-...`). Save both!
3. **Connect in the Web App or `.env`**:
   - **In the Web App**: Click **`[ 🔌 CONNECT ]`**, paste your **Kalshi API Key ID** and **Kalshi Private Key (PEM)**, and click **`SAVE`** (stored 100% locally in your browser's `localStorage`).
   - **For the 24/7 Python Autopilot (`auto_trader.py`)**: Put them in a `.env` file alongside `auto_trader.py`:
     ```bash
     KALSHI_KEY_ID="your-kalshi-key-id-uuid"
     KALSHI_PRIVATE_KEY_PATH="/path/to/kalshi_private_key.pem"
     ```

---

## 2. Getting Your Polymarket CLOB Key & Polygon USDC Wallet
Polymarket runs on **Polygon (Chain ID `137`)** using **USDC.e / USDC** and has **0% maker/taker fees** on many crypto binary books.

1. **Fund Your Polygon Wallet**:
   - Deposit **$50–$500 USDC** into your Polymarket account ([https://polymarket.com](https://polymarket.com)) or your Polygon wallet (`0x...`).
2. **Export Your API Credentials**:
   - In Polymarket, go to **Settings → API Keys** (or derive them automatically using `py-clob-client` from your Polygon private key).
3. **Connect in the Web App or `.env`**:
   - **In the Web App**: Click **`[ 🔌 CONNECT ]`**, paste your **Polymarket CLOB API Key**, **Secret**, and **Wallet Address (`0x...`)**, and click **`SAVE`**.
   - **For the 24/7 Python Autopilot (`auto_trader.py`)**: Add to your `.env` file:
     ```bash
     POLY_PRIVATE_KEY="0xYourPolygonPrivateKey"
     POLY_API_KEY="your-clob-api-key"
     POLY_API_SECRET="your-clob-api-secret"
     POLY_API_PASSPHRASE="your-clob-passphrase"
     POLY_FUNDER="0xYourPolymarketProxyAddress"
     ```

---

## 3. Making Your First $5–$10 Real-Money Trade (Step-by-Step)
Before turning on full 24/7 automation, run this **3-minute checklist** to verify your fills end-to-end with a tiny **$5–$10 stake**:

1. **Step 1 — Select Your `$500` Book**:
   - Open either live desk and click **`OWEN $500`** in the top header bar. This scales Quarter-Kelly sizing to your **$500 bankroll**.
2. **Step 2 — Verify a Live Edge Gap (`> 2.2¢`)**:
   - Watch the live Coinbase/Binance spot feed vs. the window opening reference price **`S₀`**.
   - Confirm that **`MODEL FAIR P(UP)`** leads **`BOOK ASK`** by at least **`+2.2¢`** (passing the Posterior Safety Gate / `05 GUARD` hurdle).
3. **Step 3 — Execute a Single Leg & Lock a `< $1.00` Complete Set**:
   - Click **`[ ▲ STEP-IN BUY UP ]`** (or **`[ ▲ BUY UP ]`**) when spot jumps above `S₀`.
   - When the window mean-reverts or dips, click **`[ ▼ HEDGE BUY DOWN ]`** (or **`[ ▼ BUY DOWN ]`**) and then click **`[ 🔒 LOCK ARB (<$1.00) ]`**.
   - Verify in the audit log that **1 UP + 1 DOWN** combined cost is **`< 98.2¢`** (e.g., `97.6¢` = **`+2.4¢` locked risk-free profit per pair**, paying a guaranteed **$1.00** at settlement regardless of whether BTC finishes Up or Down).

---

## 4. Turning On 100% Hands-Free 24/7 Automation
You have **two ways** to let the bot trade for you automatically without watching the screen:

### Option A — In-Browser Hands-Free `[ 🤖 AUTOPILOT: ON ]` (Phone or Desktop)
1. Click the **`[ 🤖 AUTOPILOT ]`** button in the top header bar of either web app.
2. Set your personal safety caps in the **Hands-Free Autopilot Modal**:
   - **Max $/Leg**: `$10.00` (recommended for your first week)
   - **Daily Loss Stop**: `$35.00` (hard circuit breaker — halts trading automatically if hit)
   - **Min Edge Gate**: `2.2¢` (minimum net edge above spread + fees)
   - **Max Complete-Set Cost**: `98.2¢` (automatically locks `UP + DOWN` pairs whenever combined ask `≤ 98.2¢` for `≥ +1.8¢` guaranteed risk-free spread)
3. Toggle **`AUTOPILOT: ON`**. While the tab or Home Screen PWA is open, the desk will automatically step in on `>2.2¢` mispricings, hedge reversals, lock `< $1.00` complete sets, and settle expired 5m windows.

### Option B — 24/7 Background Daemon (`auto_trader.py`) — Runs Even With Browser Closed!
For true "sleep-at-night" 24/7 execution without keeping a browser window open, run `auto_trader.py`:

```bash
# 1. Install dependencies (one-time)
pip install cryptography py-clob-client

# 2. Test 2 cycles in safe PAPER mode first ($0 risk, writes autopilot_log.json)
python3 auto_trader.py --paper --cycles 2

# 3. Run 24/7 in PAPER mode to watch full-day simulated PnL
python3 auto_trader.py --paper --bankroll 500 --max-per-trade 10 --max-daily-loss 35

# 4. Go LIVE on Kalshi with strict $10 max per leg & -$35 daily stop-loss kill switch
python3 auto_trader.py --live --venue kalshi \
  --bankroll 500 \
  --max-per-trade 10 \
  --max-window-heat 50 \
  --max-daily-loss 35 \
  --min-edge 0.022 \
  --max-pair-cost 0.982

# 5. Go LIVE on BOTH Polymarket & Kalshi in the background (24/7 daemon)
nohup python3 auto_trader.py --live --venue both \
  --bankroll 500 --max-per-trade 10 --max-daily-loss 35 \
  > autopilot_stdout.log 2>&1 &
```

### 🛡️ Built-In Risk Officer Safety Guardrails (`05 GUARD`)
| Guardrail Flag | Default | What It Protects |
| :--- | :--- | :--- |
| `--bankroll` | `$500.00` | Base capital used for Quarter-Kelly (`0.25 × f*`) fractional sizing |
| `--max-per-trade` | `$10.00` | Hard cap on any single step-in or hedge leg |
| `--max-window-heat` | `$50.00` | Maximum total open exposure allowed in any single 5m/15m window |
| `--max-daily-loss` | `$35.00` | **Kill-Switch Circuit Breaker**: halts all trading for the day if net PnL hits `-$35.00` |
| `--min-edge` | `0.022` (`2.2¢`) | Minimum model edge over ask price before firing a directional step-in |
| `--max-pair-cost` | `0.982` (`98.2¢`) | Maximum `UP + DOWN` sum to auto-lock a guaranteed `$1.00` complete set (`+1.8¢` min arb) |
