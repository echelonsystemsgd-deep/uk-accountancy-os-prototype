# MOBILE-FIRST ERGONOMICS & TOUCH TARGET SPECIFICATION
**Standard:** WCAG 2.2 Level AA Touch Target (Target Size Minimum 44×44 CSS Pixels)
**Theme:** Mercian Obsidian Luxury (#09090B deep obsidian, #141417 card surface, #DCAE53 gold accents)

---

## 1. Ergonomic Principles & Touch Target Rules

1. **Strict 44px Minimum Hit Area:**
   - All interactive controls (buttons, icon triggers, tabs, table action menus, select dropdowns) must comply with `min-height: 44px` and `min-width: 44px` or utilize extended padding (`touch-target-44`).
   - Secondary actions within dense tables provide at least 8px spacing to prevent fat-finger miss-clicks.

2. **Zero Horizontal Overflow:**
   - Root layouts enforce `overflow-x-hidden` and `w-full max-w-full`.
   - Financial tables automatically scroll smoothly with custom sleek scrollbars or switch to high-contrast mobile stacked cards on screens `< 768px`.

3. **Thumb-Zone Bottom Navigation Dock:**
   - On smartphone viewports (`< 768px`), users receive a tactile floating dock at the bottom of the screen:
     - ✦ **Dashboard:** Live net cash flow & CT600 tax shield
     - ✦ **Bills & OCR:** Quick camera/file receipt ingestion
     - ✦ **Properties:** Rental yields & lease tracking
     - ✦ **Tax Pack:** 1-Click HMRC & Accountant export
     - ✦ **Menu / DLA:** Director's loan account & mileage

4. **Keyboard Shortcuts for Rapid Desktop / Tablet Entry:**
   - `N` → Open "New Bill / Expense" modal
   - `U` → Open "Upload Receipt / Document" dropzone
   - `P` → Open "Add New Property" modal
   - `T` → Jump to Tax Pack Generator
   - `Esc` → Close all active modals

---

## 2. Visual Palette & Contrast Ratios

| Element | Hex Code | Purpose | Contrast vs Background |
|---|---|---|---|
| **Background Obsidian** | `#09090B` | Deep luxury base | N/A |
| **Card Surface** | `#141417` | Layered depth | 1.15:1 vs base |
| **Card Border** | `#27272A` | Crisp demarcation | 1.5:1 |
| **Gold Primary** | `#DCAE53` | Brand accents, key CTAs | 7.8:1 (AAA) |
| **Gold Hover / Border** | `#DAA640` | Hover states | 7.2:1 |
| **Emerald Tax Shield** | `#10B981` | Tax savings, allowable deductions | 6.5:1 (AA) |
| **Ruby Alert** | `#EF4444` | Arrears, missing receipts, overdrawn DLA | 4.8:1 (AA) |
| **Tabular Monospace** | `font-mono` | Financial figures, amounts, dates | Optimal scanning |
