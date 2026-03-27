# Decision Record: Astro 5 for v0.1.0, Astro 6 for v0.2.0

- Date: 2026-03-27
- Status: Accepted
- Owners: @srmdn

## Context

`@astrojs/node@9` (used with Astro 5) has a moderate severity vulnerability:
memory exhaustion DoS via missing request body size limit in Server Islands
(GHSA-3rmj-9m5h-8fpv).

The fix is `@astrojs/node@10`, which requires Astro 6, which requires
Node.js >= 22.12.0. The server currently runs Node 20.20.1.

Node 20 reaches end-of-life on 2026-04-30.

## Decision

Ship v0.1.0 with Astro 5 + `@astrojs/node@9`. Upgrade to Astro 6 in v0.2.0,
after Node is upgraded to 22 on the host.

## Rationale

- The vulnerability affects Server Islands — a feature not used in this theme.
  The attack surface does not apply to the default Inkwell setup.
- Astro 6 requires Node 22. Forcing a Node upgrade as part of v0.1.0 scope
  would block the first release on an unrelated infrastructure task.
- Node 20 EOL is 2026-04-30. The upgrade to Node 22 should happen before then
  regardless of Inkwell's release schedule.

## Consequences

- v0.1.0 ships with a known moderate vulnerability that does not affect
  the default usage pattern
- README must document the Node 22 requirement for users who want to upgrade
  to Astro 6 themselves
- Node upgrade is a hard prerequisite for v0.2.0

## Follow-up Actions

- [ ] Upgrade Node to 22 on host (before 2026-04-30 — Node 20 EOL)
- [ ] Upgrade to Astro 6 + `@astrojs/node@10` as part of v0.2.0
- [ ] Remove this constraint note from README once resolved
