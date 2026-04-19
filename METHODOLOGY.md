# The DarkFlow Methodology

**Version 1.0 · April 2026**

How a solo near-term swing trading system finds, scores, and tracks options opportunities from institutional flow. Public-facing version. The specific filter names, scoring weights, and data vendors stay internal, but the structure and the tracking discipline are on the table.

---

## The one-paragraph version

DarkFlow runs six independent evidence layers on every candidate ticker, scores them on a 0-100 convergence scale, and tracks every 75+ signal on a public dashboard through calendar expiry. The edge is not speed and not a single data source. The edge is convergence: one layer tells you almost nothing, six layers agreeing tells you a lot. Most signal services give you a ticker and a direction. This system shows you why six independent factors line up, scores the conviction, and then lives with the outcome publicly. Every win, every loss, every stop.

---

## Why this design

Three honest constraints shaped the system.

**1. Retail traders drown in data, not lack of it.** There is no shortage of flow scanners, dark pool trackers, technical indicators, and macro calendars. The bottleneck is turning that firehose into a yes/no decision with a conviction level. A scoring system that forces all the evidence into a single number does that.

**2. Signal services hide their misses.** Nobody believes the track records because nobody shows the losses. The only way to build credibility is radical transparency: publish every signal at time of signal, track it publicly through expiry, and accept that the bad weeks will be visible. The public dashboard is not a marketing flourish; it is the core of the product.

**3. Near-term swings have the best signal-to-noise.** Intraday trades are dominated by market-making flow. Month-out positions are dominated by hedging. The 7-30 DTE window is where conviction-based directional institutional positioning actually predicts price movement. So the system optimizes for that window exclusively.

---

## The six convergence pillars

Every candidate ticker is scored on six layers. Each layer produces a sub-score that rolls up into a total 0-100 conviction. The threshold for publication: **75 or higher = primary signal. 60-74 = watchlist. Below 60 = no action.**

### Pillar 1 · Options Flow (0-20 points)

Eight distinct flow characteristics are evaluated on institutional options alerts. Which characteristics hit, how many, and how they cluster directionally. The specific characteristic names are internal, but the concepts are standard: size, urgency, repetition, unusualness relative to open interest, and whether trades clear at the ask.

The reason this is the largest single pillar: options flow is the most leading indicator in the stack. If a $10M block of calls hits the tape at 9:31 AM, that positioning existed before most retail traders had coffee.

### Pillar 2 · Dark Pool (0-20 points)

Dark pool block trades are off-exchange prints that institutions use to move size without moving the public tape. The system cross-references the options flow direction against dark pool dollar volume on the underlying. If a ticker shows bullish options flow and the dark pool has $150M of accumulation in the same session, that's confirmation. If the dark pool is net-selling while the options flow is bullish, that's a conflict that costs points.

### Pillar 3 · Technical (0-15 points)

Multi-timeframe technical read using standard indicators (RSI, MACD, moving averages, ATR) across daily and weekly timeframes, plus a 4-hour overlay for near-term swings. A custom price-action sub-signal contributes within this pillar (0-7 points of the 15). Technicals alone never justify a signal, but they answer two questions: is the setup at a clean level, and is the trend structurally aligned with the flow direction.

### Pillar 4 · Macro (0-15 points)

Macroeconomic context from institutional sources. Economic calendar (CPI, PPI, FOMC, GDP, employment, PMI), central bank commentary, and sector-specific catalysts. Also includes a CME FedWatch delta component (±2 or -3 points inside the pillar) because changes in rate-cut expectations move whole sectors.

The macro pillar does two jobs: it filters signals that fight the tape (a bullish call on a rate-sensitive name hours before a hawkish FOMC release is a trap), and it spots macro-aligned signals that deserve extra conviction (bullish semi flow on the morning of a strong jobs print).

### Pillar 5 · Institutional Thesis (0-20 points)

The second-largest single pillar, and the most judgment-driven. Can a coherent explanation be written for why institutions are positioning this way right now? A product launch, an earnings setup, a sector rotation, a policy tailwind, a chart-based catalyst. Signals without a thesis tend to underperform; signals where the thesis is obvious tend to run. A high score here requires the why.

### Pillar 6 · Continuation (0-10 points)

The smallest pillar, and a bonus factor. Did the same ticker score 75+ yesterday, or the day before? Repeated flow on the same name across sessions is a strong indicator that the positioning is a thesis, not a one-day event. Continuation adds up to 10 points, which is enough to push a borderline signal over the 75 threshold.

---

## The scoring philosophy

Six independent pillars × one threshold = a bar that is hard to hit by luck.

- One pillar scoring max is easy. Flow can look incredible on any given Tuesday.
- Three pillars scoring 70%+ each is already rare and meaningful.
- All six pillars scoring 75%+ together is the setup the system is hunting for, and it's the signal quality that shows up on the winning side of the dashboard most weeks.

Convergence is the product. Not faster alerts, not louder alerts, not more alerts. Convergence.

---

## What the dashboard actually shows

Every 75+ signal gets entry prices captured at the moment it fires, tracked every 5 minutes during market hours, and lives publicly until its option expires.

- **Peak %**: the highest return the signal reached from entry. This is the signal-quality metric. If a call was bought at $2.00 and hit $8.00 at any point during its life, peak % = +300%. The thesis was correct at least once.
- **Current %**: the live option premium return vs entry, updated every 5 minutes.
- **Expiry date**: when the option contract itself expires, at which point the signal is marked closed with its final settled value.
- **-50% stop view**: a display toggle on the dashboard that shows what cumulative return would look like under a strict -50% hard-stop rule. Useful for modeling the conservative scenario; peak % is never capped.

Win/loss logic:

- **Win** = the signal peaked above 0% at some point during its life. The thesis was correct.
- **Loss** = the signal never went positive. Peak never crossed zero.

This matters because an option can peak at +300%, pull back, and expire worthless. That's still a win on signal quality even if the final settled value is -100%. The trader's exit timing is a separate discipline from the signal's underlying quality. DarkFlow tracks signal quality; trade management is up to the subscriber.

---

## Holding period and trade style

Near-term swings, 7-30 days to expiration, with the sweet spot at 7-14 DTE where institutional positioning has the most predictive power.

- **Not day trading.** Intraday noise dominates and taxes pile up.
- **Not position trading.** Month-out options are dominated by hedging flow, and the convergence signal weakens.
- **Typical holding: 2-10 trading days.** The thesis plays out over sessions, not minutes.
- **DTE is a scoring factor, not a hard filter.** If strong convergence shows up on a 5-DTE or a 45-DTE, the system scores it honestly. Shorter DTE means higher theta risk and lower score contribution, but never auto-reject.

---

## What this is not

This section matters as much as the methodology.

- **Not a secret.** The structure is above. The specific vendor names and weights are proprietary; the approach is not.
- **Not real-time market-making.** Signals fire 2-3 times per day during scheduled scans, not on every tick.
- **Not financial advice.** The dashboard is a transparency asset for a trading system, not a recommendation. Nothing here is tailored to any individual subscriber's risk tolerance, tax situation, or portfolio construction.
- **Not leveraged or short-volatility by default.** Long options have defined risk (the premium paid). The system does not short options, does not naked-sell calls, does not size beyond a defined per-signal budget.
- **Not a "hot picks" newsletter.** Signals are published when the convergence threshold is met, not on a daily quota. Some days have two signals. Some days have zero. The cadence is dictated by market conditions, not marketing.

---

## Verification

Every signal is logged at time of signal, not retroactively. The dashboard timestamps every entry. Anyone can pull up any date in the history and check it against the underlying's chart for that day. If the signal claims a BULLISH call at conviction 87 on 2026-04-09, the option premium should reflect that entry price at the timestamp shown, and the peak/current should match the live option chain from that contract.

The project also logs every evaluated signal (entered, skipped, rejected with reason) to an internal audit trail. When third-party verification matures, the audit trail will be partially exposed via the dashboard so subscribers can see not just what was published, but what was considered and rejected.

---

## The honest limits

- **Track record is still short.** Live trading data since April 2026; statistical significance requires more closed trades.
- **Options pricing feeds can disagree.** The dashboard uses broker-confirmed prices during market hours with a delayed-data fallback after hours. Discrepancies happen and are documented when they matter.
- **The system is solo-operated.** Bug fixes, content, and scan-day judgment come from one person. That's a strength (no conflicting incentives, no layers of approval) and a limitation (no redundancy on sick days).
- **Options are risky.** Even convergence signals fail. The -50% stop rule exists because no signal service, including this one, is right every time.

---

## Closing

DarkFlow is a system that tries to answer a hard question honestly: can institutional flow, when it converges across multiple independent evidence layers, produce a tradable edge, and can that edge be delivered to retail traders without the usual opacity and cherry-picking?

The public dashboard is the answer. The methodology above is the how. The win rate, the loss rate, and the peak returns are all visible at darkflowsignals.github.io.

If the transparency model matters to you, you're in the right place. If you want signals without the math and without the losses, there are plenty of other newsletters.

---

**Last updated:** 2026-04-19 · DarkFlow Signals · darkflowsignals.github.io
