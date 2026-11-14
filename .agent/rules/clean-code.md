# Clean Code Standards — E-Cell MITAOE

1. **Strict TypeScript:** No implicit `any`. Maintain strict interfaces for data items (`EventItem`, `TeamMember`, `InitiativeItem`, `InsightItem`).
2. **Separation of Concerns:** Content in `src/data/`, reusable primitives in `src/components/ui/`, section narratives in `src/components/sections/`.
3. **No Dead Code:** Remove unused assets, legacy prototype files, and redundant imports.
4. **Zero Compilation Warnings:** Maintain clean linting and type-checking on every build.
