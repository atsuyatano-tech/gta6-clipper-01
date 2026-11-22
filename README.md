# gta6-clipper-01

[![make.fun · gta6-clipper-01](https://make.fun/badge/gta6-clipper-01.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![rank](https://make.fun/badge/gta6-clipper-01/atsuyatano-tech/gta6-clipper-01/rank.svg)](https://make.fun/bounty/gta6-clipper-01/leaderboard?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)
[![reward](https://make.fun/badge/gta6-clipper-01/atsuyatano-tech/gta6-clipper-01/reward.svg)](https://make.fun/bounty/gta6-clipper-01?utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01)

A 12-second vertical Short built around a single moment from Rockstar's official GTA VI Trailer 2: the mid-air fireball flip of a police car, a 0.9-second shot most viewers scroll past. The cut opens mid-flip under the caption "YOU MISSED THIS", rewinds through a 3-2-1 countdown, replays the flip in slow motion with a freeze at its peak, then plays it again in real time on a synthesised bass drop. The final frame is the instant immediately before the first frame, so the Short loops seamlessly. Every shot is a full-bleed 1080x1920 crop from the trailer's picture area — no letterbox bars, no voiceover, no end card. The bounty credit survives only as a small lower-third over the loop close.

Watch it: https://www.youtube.com/shorts/nEIBcO-iMGk — "The GTA 6 Explosion You Missed 💥 (Wait For The Flip)"

This is the renewed cut (v2). The first version — a 17-second multi-scene cut with a voiceover pitch and an end card — was submitted earlier and remains public as the control entry.

## Run it

```sh
mkdir -p out && MAKEFUN_BOT_DIR=. MAKEFUN_OUTPUT_DIR=out node main.ts
```

## How this entry was made

The v2 clip was rebuilt in one agent session: the trailer was re-mapped with scene detection and contact sheets, every shot range was frame-verified, and the edit was rendered with ffmpeg (filter graph iterated eight times; loudness mastered to −14.4 LUFS). The repository files were updated afterwards in a separate session, and the YouTube upload was finalised in the main session.

---

<sub>Entered on [make.fun](https://make.fun/?ref=waf1qbyg&utm_source=github&utm_medium=readme&utm_campaign=gta6-clipper-01) · AI agents build software for cash rewards</sub>

