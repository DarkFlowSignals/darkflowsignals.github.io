# How DarkFlow Publishes

**Version 2.0 · April 2026**

A plain-English guide to what you see on darkflowsignals.com, how the dashboard works, and what we promise about every trade we publish. This is the user manual for our transparency, not a description of our scoring internals.

---

## The one-paragraph version

DarkFlow is a near-term swing signal system focused on options. The system reads what institutions are doing across multiple data layers and publishes the highest-conviction setups it finds, in plain English. Every published signal goes on a public dashboard at signal fire, tracks live through calendar expiry, and stays on the dashboard forever. The winners and the losers. That's the promise.

---

## Our three promises

### 1. We only publish what we'd trade ourselves.

Most signal services publish too much. Twenty picks a day, spray and pray, let the winners carry the losers. We don't work that way. A signal only gets published when independent evidence sources agree on direction, size, and timing. Some days produce two primary signals. Some days produce zero. The cadence is dictated by what the tape is doing, not by a content quota.

### 2. Every signal is logged at time of signal, not retroactively.

When a signal fires, the entry price is captured from the live option chain at the moment of publication. The dashboard timestamps the entry. Peak and current returns update every 5 minutes during market hours. Nothing gets edited after the fact. Nothing gets deleted. A signal that went wrong stays on the board with the loss visible. That is not a bug. That is the product.

### 3. We close only at calendar expiry.

A signal closes publicly when its option contract reaches its expiration date. Not when we decide we've made enough. Not when the chart looks toppy. The dashboard shows the settled value at expiry, win or lose, and that becomes the final record.

The one exception to "only expiry closes" is a display tool on the dashboard called the -50% stop view. That's a toggle you can click to see what the cumulative returns would look like under a strict -50% premium-decay exit rule. It caps the displayed current return of any losing signal at -50% to model the risk-managed view. It does not close signals. Peak is never capped.

---

## How to read the dashboard

### The conviction score

Every published signal has a 0-100 conviction score shown on the card. Higher means more independent sources agreed. You can filter the dashboard to primary-tier signals or watchlist-tier signals using the category pills. The scale is there so you can quickly sort highest-conviction from edge-case calls. The scoring mechanics themselves are proprietary.

### Peak % (the signal-quality metric)

Peak % is the highest return the signal ever reached, measured from the captured entry price to the highest option premium printed during the signal's life. If a call bought at $2.00 reached $8.00 at any point, peak % = +300%. Peak only moves one direction: up. Once set, it never retreats.

Peak answers one question: was the thesis correct at any point? If peak went positive, the thesis worked, even if the option later faded. That's a win on signal quality.

### Current % (the live pricing metric)

Current % is the live option premium return, measured against the same entry. For an open signal, it updates every 5 minutes during market hours. For an expired signal, it locks to the settled value (intrinsic value at expiry for ITM options, -100% for options that expired OTM).

Current can swing between positive and negative as the option trades. It is not a signal-quality metric. It is the live pricing.

### WIN and LOSS

- **WIN** = peak reached at least +20% at some point during the signal's life.
- **LOSS** = peak never cleared the +20% threshold. The thesis didn't deliver a meaningful move.

This definition matters. An option can peak at +300%, pull back, and expire worthless. On the dashboard, that still shows as WIN because peak cleared +20%. The trader's exit timing is a separate discipline from the signal's underlying quality. We track the signal, not the exit.

### Expiry date

Every option has a contract expiration date. On the dashboard you'll see that date on each card. When expiry passes, the card flips from `open` to `expired`, the current % locks to settled intrinsic value, and the signal stops updating.

---

## Our trade style

DarkFlow is a near-term swing system. Typical trade characteristics:

- **DTE**: typically 7 to 30 days to expiration.
- **Holding period**: 2 to 10 trading days, depending on how the thesis plays out.
- **Vehicle**: single-leg options (calls or puts). We don't publish spreads, strangles, or exotic structures.
- **Direction**: bullish, bearish, or tactical hedge. Roughly two thirds bullish historically, reflecting the general market bias in the signal set.

DTE is a scoring factor, not a hard cutoff. If the system sees a strong setup on a shorter or longer DTE option, it gets graded honestly. Short DTE means higher theta risk and a lower ceiling; long DTE dilutes the time-sensitivity that makes near-term reads predictive.

---

## What this is not

- **Not a day-trading service.** Intraday noise dominates. Taxes pile up. Different game.
- **Not financial advice.** The dashboard shows our signal record. It is a transparency asset, not a recommendation tailored to your risk tolerance, tax situation, or portfolio construction.
- **Not a "hot picks" newsletter with a daily quota.** Some days produce signals. Some days don't. Cadence is dictated by tape conditions, not marketing.
- **Not leveraged or short-volatility.** We publish long options. Defined risk, premium paid is the max loss per contract.
- **Not systematic in the "press a button and the algo runs the bank" sense.** The monitoring is automated; the publish decision respects judgment layers we've built over time. The edge is in those judgment layers, not in faster alerts.

---

## What makes the dashboard different

Most signal services hide their losses. The track record screenshots you see on Twitter and Substack are cherry-picked. The misses vanish. The dashboard does the opposite: every signal logged at fire, every signal tracked through expiry, every loss visible.

Anyone can pull up any date in the history and cross-reference the signal entry against the underlying's option chain for that moment. If we say we bought a $100 call at $2.50 at 9:34 AM on April 15, the public record on the dashboard says so at that timestamp. If the option chain data for that moment shows a different price, we'd be caught.

That's the verifiable edge. That's why the dashboard is public and will stay public.

---

## The honest limits

- **Track record is still building.** Live trading data since early 2026. Meaningful statistical significance requires hundreds more closed trades, not tens.
- **Option pricing feeds can disagree.** The dashboard uses broker-confirmed prices during market hours with a delayed-data fallback after hours. When feeds disagree by more than a few cents, we flag it.
- **Solo-operated.** One person, one set of judgment. That's a strength (no conflicting incentives) and a limit (no backup on sick days, no second set of eyes in real time).
- **Options are risky.** Even high-conviction setups fail. The -50% stop view exists because no service, including this one, is right every time.

---

## What you get when you subscribe

**Free tier:**
- Last week's picks (3 to 7 day delayed view of the signal record)
- Weekly performance scorecard
- Access to the community Discord
- Substack newsletter

**Member ($59/mo, 14-day free trial):**
- Real-time alerts the moment a signal fires, with strike + entry premium
- Live signed-in dashboard with full signal detail and live Greeks
- Member Discord channels: pre-market briefing, midday check-in, post-market debrief
- On-demand `/check TICKER` deep read and `/pulse TICKER` quick snapshot in Discord
- Cancel anytime before day 14 of the trial and never get charged

---

**Last updated:** 2026-05-05
**DarkFlow Signals** · darkflowsignals.com
