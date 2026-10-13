/* All site content lives here. Edit text in this file; pages render from it. */
window.SITE = {
  profile: {
    name: "Pratik Priyaranjan Sahoo",
    first: "Pratik",
    last: "Priyaranjan Sahoo",
    role: "Financial Reporting Analyst · CFA Level II Candidate",
    subline: "Fund reporting, NAV validation and investment operations at State Street, plus independent equity research and financial modelling on Indian markets.",
    location: "Bengaluru, India",
    email: "sahoopratik111@gmail.com",
    linkedin: "https://www.linkedin.com/in/pratik-priyaranjan-sahoo-5abab1372/",
    linkedinLabel: "linkedin.com/in/pratik-priyaranjan-sahoo",
    cv: "documents/Pratik_P_Sahoo_resume%20and%20Portfolio.pdf",
    focus: ["Fund reporting", "NAV validation", "Equity research", "Financial modelling", "US GAAP & IFRS"],
    about: [
      "I’m a Financial Reporting Analyst at State Street in Bengaluru, working on U.S. mutual fund reporting under US GAAP and IFRS: financial statements, Portfolio of Investments, NAV validation, reconciliations and fair-value disclosures. I’ve cleared CFA Level I and am preparing for Level II.",
      "Outside work I build full financial models (Waaree Energies, Bharti Airtel), write equity research on Indian companies (Schneider Electric Infra, Sun Pharma), publish data-first market commentary, and co-authored a conceptual paper on how Gen Z invests. I invest across Indian and U.S. markets and trade derivatives. I want to grow into financial analysis, reporting and fund operations roles where accuracy and judgement both matter."
    ],
    glance: [
      ["Current role", "Financial Reporting Analyst, State Street"],
      ["Focus", "Fund reporting · Financial analysis · Equity research"],
      ["Standards", "US GAAP · IFRS · Ind AS"],
      ["Education", "B.Com (Hons) Finance, Audit & Taxation, JAIN University (2026) · CGPA 8.5"],
      ["Languages", "English · Hindi · Odia"]
    ],
    stats: [
      { value: 4, suffix: "", label: "Equity coverages", note: "SEIL · Waaree · Airtel · Sun Pharma" },
      { value: 12, suffix: "-yr", label: "3-statement models", note: "FY20–FY31, integrated IS / BS / CF" },
      { value: 4, suffix: "", label: "Market commentaries", note: "Macro, equities, AI, commodities" },
      { value: 99.9, suffix: "%", decimals: 1, label: "Data accuracy", note: "Fund reporting at State Street" }
    ],
    terminal: [
      ["whoami", "Financial Reporting Analyst @ State Street"],
      ["coverage", "BHARTIARTL HOLD | SUNPHARMA HOLD | WAAREEENER HOLD | SEIL SELL"],
      ["status", "CFA Level II candidate — open to work"]
    ]
  },

  // Live price band: indices and the stocks covered on the site (prices only).
  ticker: [
    { kind: "stock", series: "NIFTY" },
    { kind: "stock", series: "SENSEX" },
    { kind: "stock", series: "BHARTIARTL", rating: "HOLD", tp: 1789, tpLabel: "TP" },
    { kind: "stock", series: "SUNPHARMA", rating: "HOLD", tp: 1770, tpLabel: "FV" },
    { kind: "stock", series: "WAAREEENER", rating: "HOLD", tp: 2395, tpLabel: "TP" },
    { kind: "stock", series: "WAAREERTL" },
    { kind: "stock", series: "SCHNEIDER", label: "SEIL", rating: "SELL", tp: 965, tpLabel: "TP" }
  ],

  experience: [
    {
      org: "State Street", role: "Financial Reporting Analyst", where: "Bengaluru", period: "Feb 2026 – Present", current: true,
      chips: [["100%", "on-time reporting"], ["99.9%", "data accuracy"], ["15–20%", "fewer discrepancies"]],
      groups: [
        { title: "Financial statements & NAV", bullets: [
          "Perform First Level Review (FLR) and prepare financial statements, Portfolio of Investments and regulatory reports across multiple fund portfolios on a monthly cycle, with 100% accuracy within reporting deadlines.",
          "Execute end-to-end NAV computation and validation for multiple funds, with zero material discrepancies.",
          "Validate Total Investment Securities and Total Net Assets (TNA) through reconciliations with underlying records, maintaining 99.9% data accuracy."
        ]},
        { title: "Instruments & disclosures", bullets: [
          "Analyse repos, securities lending and other short-term investments to verify accurate disclosure.",
          "Review derivative transactions (futures, forwards, options, swaps) for pricing, valuation and reconciliation.",
          "Evaluate fair-value hierarchy classifications (Level 1, 2, 3) under ASC 820."
        ]},
        { title: "Controls & collaboration", bullets: [
          "Support audit deliverables, tax reporting schedules and compliance documentation.",
          "Run period-over-period variance analysis and escalate exceptions.",
          "Work with Fund Accounting, Custody and Investment Operations, reducing data discrepancies by 15–20%."
        ]}
      ]
    },
    {
      org: "Focus Wise Solution", role: "Finance Intern (online)", where: "Bengaluru", period: "Jul – Aug 2025",
      chips: [],
      groups: [{ title: "", bullets: [
        "Tracked market trends, company fundamentals and financial performance to support stock research and investment recommendations.",
        "Contributed to financial models and performance tracking by organising business metrics and analysing trends."
      ]}]
    }
  ],

  /* ------------------------------------------------------------------ RESEARCH */
  research: [
    {
      id: "sunpharma",
      oldPath: "/research/sunpharma",
      kind: "equity",
      kicker: "Equity research · Buy-side investment memo",
      company: "Sun Pharmaceutical Industries",
      title: "Sun Pharmaceutical Industries — Q1 FY27 Result Update",
      headline: "A strong core business, now priced as a leveraged Organon bet",
      subtitle: "Pharmaceuticals · NSE: SUNPHARMA · BSE: 524715",
      date: "12-Oct-2026",
      series: "SUNPHARMA",
      rating: "HOLD", targetLabel: "Fair value", target: 1770, cmpLabel: "CMP (12-Oct-2026)", cmp: 1760, move: "+0.6%", moveLabel: "Upside",
      extra: [["Accumulate below", "₹1,650"], ["Bull / bear", "₹2,142 / ₹1,375"], ["Mkt cap", "₹4,22,259 Cr"]],
      pdf: { href: "documents/Sun_Pharma_Q1FY27_Investment_Memo.pdf", label: "Sun Pharma — Q1 FY27 Investment Memo (10 pages)" },
      card: {
        question: "Is Sun Pharma’s strong core business still worth owning now that it is buying Organon with debt?",
        work: "Rebuilt the standalone (ex-Organon) P&L FY22A–FY28E, a pro-forma Organon EPS bridge, a P/E × EPS sensitivity grid, bull/base/bear scenarios and peer and broker comparisons.",
        deliverable: "A 10-page buy-side investment memo with catalysts, a risk map and a full source log.",
        call: "HOLD, fair value ₹1,770 (average of 30x standalone and 22x pro-forma FY28E EPS) — accumulate below ₹1,650."
      },
      blocks: [
        { t: "kpis", items: [
          { label: "India formulations", value: "+16.0%", note: "Q1 FY27 growth · share 8.5%", tone: "up" },
          { label: "Innovative Medicines", value: "$351m", note: "+12.8% YoY · 21.9% of sales", tone: "up" },
          { label: "US formulations", value: "−9.7%", note: "$427m · Revlimid erosion", tone: "down" },
          { label: "Net debt / EBITDA", value: "2.3x", note: "after Organon, from $3.4bn net cash", tone: "down" },
          { label: "Q1 revenue", value: "₹15,300 Cr", note: "+10.5% YoY" },
          { label: "EBITDA margin", value: "28.9%", note: "170 bps above consensus", tone: "up" }
        ]},
        { t: "h2", code: "VIEW", text: "Investment view" },
        { t: "cards", num: true, items: [
          { title: "The operating engine is in good shape", body: "Q1 FY27 revenue rose 10.5% to ₹15,300 Cr and EBITDA margin was 28.9%. India grew 16%, with about 60% of that growth from volume and new launches. Innovative Medicines ($1.42bn in FY26, +16.8%) is now larger than US generics." },
          { title: "But earnings quality is softening", body: "Adjusted PAT grew only 3.1% to ₹3,089 Cr. The tax rate rose to 27.8%, R&D was underspent at 5.4% of sales against 6–7% guidance, and US generics are shrinking with no lenalidomide-type replacement. Our FY27E/FY28E adjusted EPS of ₹52.6/₹59.1 is below consensus (₹55/₹65)." },
          { title: "Organon changes the investment case", body: "The $11.75bn deal (~6.2x Organon’s 2025 adjusted EBITDA) roughly doubles revenue, but about two-thirds of Organon is ex-growth, and it turns $3.4bn of net cash into ~2.3x leverage just as US pricing (MFN) and tariffs are being reset. We estimate it adds ~₹21 to FY28E EPS after funding costs." },
          { title: "Valuation sits close to fair", body: "At 33.5x TTM and 30x our FY28E standalone EPS the stock is no longer expensive — down 14% from its high and ~15 points behind Nifty Pharma over a year — but a ₹1,770 fair value leaves little margin of safety." }
        ]},
        { t: "quote", html: "<b>Verdict: HOLD.</b> Build a position below ₹1,650; upgrade on a clean Ilumya psoriatic arthritis approval (FDA action due 29 Oct) plus clarity on Organon financing costs." },
        { t: "h2", code: "RSLT", text: "Q1 FY27: margins beat, earnings mix weaker" },
        { t: "table", title: "Quarterly results (₹ Cr)", head: ["₹ Cr", "Q1 FY26", "Q2 FY26", "Q3 FY26", "Q4 FY26", "Q1 FY27", "YoY", "QoQ"], rows: [
          ["Revenue from operations", "13,851", "14,478", "15,521", "14,612", "15,300", "10.5%", "4.7%"],
          ["Gross margin", "79.7%", "79.4%", "81.0%", "80.8%", "80.6%", "+90 bps", "−20 bps"],
          ["EBITDA (company)", "4,302", "4,527", "4,948", "3,954", "4,418", "2.7%", "11.7%"],
          ["EBITDA margin", "31.1%", "31.3%", "31.9%", "27.1%", "28.9%", "−220 bps", "+180 bps"],
          ["R&D % of sales", "~6.5%", "–", "5.8%", "6.7%", "5.4%", "", ""],
          ["Adjusted PAT", "2,996", "3,118", "3,763", "2,708", "3,089", "3.1%", "14.1%"],
          ["EPS (₹)", "9.50", "13.00", "14.04", "11.31", "12.10", "27.4%", "7.0%"]
        ], bold: [0, 2, 5], note: "Source: company press releases (22 May and 31 Jul 2026), Screener.in, ICICI Securities. Adjusted PAT excludes exceptional items." },
        { t: "table", title: "Versus Street consensus (₹ Cr)", head: ["Metric", "Consensus", "Actual", "Variance"], rows: [
          ["Revenue", "15,625", "15,300", "−2.1%"], ["EBITDA", "4,255", "4,418", "+3.8%"], ["EBITDA margin", "27.2%", "28.9%", "+170 bps"], ["Net profit", "3,051", "2,895", "−5.1%"]
        ], tone: true, note: "Consensus per NiftyTrader / CNBC-TV18 poll (31 Jul 2026). Against broker estimates (Kotak ₹2,747 Cr, Motilal Oswal ₹2,785 Cr) PAT was a beat." },
        { t: "cards", items: [
          { title: "Mix shift is working", body: "India and Innovative Medicines carried the quarter, and the gross margin stayed above 80%." },
          { title: "Part of the margin beat was timing", body: "R&D at 5.4% of sales must rise to 6–7% for the rest of FY27, which costs about 100–150 bps of margin." },
          { title: "Tax is the hidden drag", body: "The ETR rose to 27.8% from 24.3% and will stay there until Organon closes, which alone takes about 4% off EPS." }
        ]},
        { t: "h2", code: "SEGM", text: "Segments: India and specialty carry the growth" },
        { t: "hbars", title: "Revenue mix, Q1 FY27", sub: "% of sales", unit: "%", items: [
          { label: "India formulations · +16.0% YoY", value: 36.1, hi: true },
          { label: "US formulations · −9.7% YoY", value: 26.6 },
          { label: "Emerging markets · +4.2% YoY", value: 19.0 },
          { label: "Rest of world · +10.0% YoY", value: 14.0 },
          { label: "API · +10.5% YoY", value: 4.0 }
        ], note: "Innovative Medicines ($351m, 21.9% of sales) spans geographies and overlaps the regional segments." },
        { t: "table", title: "Innovative Medicines pipeline", head: ["Asset", "Indication", "Status", "Next milestone"], rows: [
          ["Ilumya (tildrakizumab)", "Psoriatic arthritis", "sBLA accepted Mar 2026", "FDA action by 29 Oct 2026"],
          ["Fibromun", "Soft-tissue sarcoma / GBM", "Phase 2 done / Phase 2", "Phase 3 start / filing"],
          ["GL0034", "Type 2 diabetes", "Phase 2", "Topline 2H CY27"],
          ["Nidlegy (EU/ANZ)", "Melanoma; BCC; cSCC", "Phase 3 done; Phase 2", "EMA filing (Philogen)"],
          ["MM-II", "Osteoarthritis pain", "Phase 2 done", "Out-licensing"]
        ], note: "Source: company presentation (22 May 2026)." },
        { t: "h2", code: "ORGN", text: "Organon: cheap on paper, costly in risk" },
        { t: "table", title: "Our FY28E pro-forma EPS bridge (₹ Cr)", head: ["Item", "₹ Cr"], rows: [
          ["Organon EBITDA (assumed $1.8bn, flat-to-down)", "16,380"], ["Less: D&A (assumed $300m)", "(2,730)"], ["Less: interest on $9.5bn at 6.5%", "(5,619)"], ["Less: lost income on $2.25bn cash at 6%", "(1,228)"], ["Incremental PBT", "6,802"], ["Tax at 25%", "(1,701)"], ["Incremental PAT", "5,102"], ["Incremental EPS (₹)", "21.3"], ["Standalone FY28E adj. EPS (₹)", "59.1"], ["Pro-forma FY28E EPS (₹)", "80.3"]
        ], bold: [6, 9], note: "All Organon inputs are our assumptions (₹91/$), excluding PPA amortisation and synergies." },
        { t: "twocol", left: { title: "What the deal buys", items: ["Scale: ~$12.4bn combined revenue and women’s health leadership.", "The No. 7 global biosimilars platform, plus entry into China (~$800m) and South Korea.", "Bought at ~6x EBITDA against Sun’s own ~22x — accretive on paper from year one.", "A global commercial channel for Sun’s specialty launches."] }, right: { title: "What it costs", items: ["$3.4bn net cash becomes ~₹75,985 Cr of net debt (our estimate).", "Only ~one-third of the combined portfolio is a growth engine.", "It doubles US exposure just as MFN pricing and Section 232 tariffs reset US economics.", "The largest integration in Sun’s history; dividends at risk and more deal charges guided."] } },
        { t: "h2", code: "FA", text: "Financial model: standalone, ex-Organon" },
        { t: "bars3d", title: "Revenue and adjusted EPS, FY22A–FY28E", sub: "₹ Cr (bars) · ₹ EPS (line)", labels: ["FY22A", "FY23A", "FY24A", "FY25A", "FY26A", "FY27E", "FY28E"], values: [38654, 43886, 48497, 52578, 58462, 64308, 70739], actual: 5, fmt: "cr", line: { label: "Adj. EPS (₹)", values: [13.6, 36.1, 41.7, 47.7, 51.9, 52.6, 59.1], fmt: "1" }, note: "Source: Screener.in consolidated (FY22A–FY26A), our estimates (FY27E–FY28E). FY22 EPS is reported." },
        { t: "table", title: "Key forecasts (₹ Cr)", head: ["Y/E March", "FY24A", "FY25A", "FY26A", "FY27E", "FY28E"], rows: [
          ["Revenue", "48,497", "52,578", "58,462", "64,308", "70,739"], ["EBITDA", "13,018", "15,114", "16,501", "18,006", "20,161"], ["EBITDA margin", "26.8%", "28.7%", "28.2%", "28.0%", "28.5%"], ["Effective tax rate", "13.3%", "20.3%", "23.9%", "27.5%", "27.5%"], ["Adjusted PAT", "9,994", "11,443", "12,461", "12,616", "14,173"], ["Adjusted EPS (₹)", "41.65", "47.69", "51.94", "52.58", "59.07"], ["ROE", "15.7%", "15.8%", "14.9%", "–", "–"], ["Free cash flow", "9,964", "12,005", "8,906", "–", "–"]
        ], bold: [0, 4], note: "We are 4–9% below consensus, mainly on tax (27.5% vs ~25%) and the US generics drag. Quality-of-earnings flag: FY26 operating cash flow fell 12% as receivable days rose to 97 and inventory days to 363." },
        { t: "h2", code: "VAL", text: "Valuation: fairly priced, not cheap" },
        { t: "table", title: "Fair value build (FY28E basis)", head: ["Method", "EPS (₹)", "P/E", "Value (₹)", "Rationale"], rows: [
          ["Standalone (ex-Organon)", "59.1", "30x", "1,772", "Discount to the 38x MOSL uses, for lower EPS growth and a higher tax rate"],
          ["Pro-forma with Organon", "80.3", "22x", "1,767", "Lower multiple for leverage and the ex-growth Organon mix"],
          ["Fair value (average)", "", "", "1,770", "+0.6% vs CMP ₹1,760"]
        ], bold: [2] },
        { t: "scenarios", cmp: 1760, items: [
          { name: "Bear", value: 1375, chg: "−22%", note: "EPS ₹55 × 25x — US generics slide, tariff or MFN hit, integration drag" },
          { name: "Base", value: 1770, chg: "+1%", note: "EPS ₹59.1 × 30x / 22x pro-forma — guidance delivered, Organon closes on time" },
          { name: "Bull", value: 2142, chg: "+22%", note: "EPS ₹63 × 34x — Ilumya PsA approved, Organon accretive, India 15%+" }
        ]},
        { t: "grid", title: "Sensitivity — value per share (₹) by FY28E standalone EPS and P/E", corner: "P/E \\ EPS", cols: ["₹50", "₹55", "₹59.1", "₹63", "₹67"], rows: [
          { h: "24x", v: [1200, 1320, 1418, 1512, 1608] }, { h: "27x", v: [1350, 1485, 1596, 1701, 1809] }, { h: "30x", v: [1500, 1650, 1773, 1890, 2010] }, { h: "33x", v: [1650, 1815, 1950, 2079, 2211] }, { h: "36x", v: [1800, 1980, 2128, 2268, 2412] }
        ], cmp: 1760, base: [2, 2], note: "Tinted green above / red below CMP ₹1,760. Outlined = base case (30x on ₹59.1)." },
        { t: "hbars", title: "Broker targets after Q1 FY27 vs our fair value", sub: "₹ per share", unit: "₹", min: 1700, ref: { value: 1770, label: "Our FV ₹1,770" }, items: [
          { label: "Motilal Oswal · Buy", value: 2310 }, { label: "Deven Choksey · Accum.", value: 2218 }, { label: "Prabhudas L. · Buy", value: 2150 }, { label: "Emkay · Add", value: 2100 }, { label: "ICICI Sec · Hold", value: 2090 }, { label: "Geojit · Buy", value: 2070 }
        ], note: "Source: Trendlyne, broker notes (Aug 2026). The Street capitalises Organon accretion at Sun’s own multiple." },
        { t: "h2", code: "CATS", text: "Catalysts, risks and what would change our mind" },
        { t: "timeline", items: [
          { when: "29 Oct 2026", title: "Ilumya psoriatic arthritis — FDA action date", body: "Approval extends a $796m franchise into a large indication and is our main upgrade trigger." },
          { when: "~3 Nov 2026", title: "Q2 FY27 results", body: "Watch US generics stabilising, R&D stepping up toward 6–7%, the tax rate and further Organon charges." },
          { when: "Q3 FY27", title: "Organon financing", body: "NCD terms (up to ₹15,000 Cr) and USD debt pricing. Every 50 bps on $9.5bn is ~₹430 Cr of PBT." },
          { when: "Q4 FY27", title: "Organon close", body: "First combined guidance and synergy targets." },
          { when: "By Apr 2027", title: "Section 232 review of generics", body: "Commerce is due to report on whether generics need tariff action." }
        ]},
        { t: "twocol", left: { title: "Bull case: why own it", items: ["India compounds at mid-teens with share gains, plus GLP-1 optionality.", "Innovative Medicines ($1.42bn, +16.8%) now bigger than US generics; Ilumya PsA, Leqselvi and Unloxcyt early in their ramps.", "Organon at ~6x EBITDA is accretive; pro-forma FY28E P/E falls to ~22x.", "Sentiment washed out: 14% off the high, every post-results broker target above CMP."] }, right: { title: "Bear case: why stay away", items: ["Balance sheet flips from $3.4bn net cash to ~2x leverage.", "US generics shrinking with no replacement; MFN commitments cap pricing on future launches.", "FY27 EPS growth muted by a 27.8% tax rate, an R&D step-up, deal costs and interest.", "Halol and Baska both OAI; working capital lengthening; exceptional charges recur."] } },
        { t: "quote", html: "<b>Upgrade to OWN if:</b> Ilumya PsA is approved, Organon financing comes in at 6% or less, and Q2 shows US generics bottoming. <b>Move to AVOID if:</b> Organon synergies disappoint, generics are tariffed, or another site is classified OAI." },
        { t: "pdf" }
      ]
    },

    {
      id: "airtel",
      oldPath: "/research/airtel",
      kind: "equity",
      kicker: "Financial model · DCF · Telecom",
      company: "Bharti Airtel Ltd",
      title: "Bharti Airtel Ltd (NSE: BHARTIARTL) — Financial Model",
      headline: "India’s premium telco, fully priced after the 5G build-out",
      subtitle: "Consolidated, ₹ Cr, FY ends 31 March · FY20–26 actual, FY27–31 forecast",
      date: "12-Oct-2026",
      series: "BHARTIARTL",
      rating: "HOLD", targetLabel: "Target", target: 1789, cmpLabel: "Share price (12-Oct-2026)", cmp: 1773, move: "+0.9%", moveLabel: "Upside",
      extra: [["DCF growth / exit", "₹1,275 / ₹1,995"], ["Net debt / EBITDA FY27E", "1.1x"], ["Case", "Base"]],
      pdf: { href: "documents/Bharti_Airtel_Financial_Model.pdf", label: "Bharti Airtel — Financial Model (10-page PDF export)" },
      card: {
        question: "Does India’s highest-ARPU telco still have upside after the 5G build-out, with the next tariff hike delayed?",
        work: "Segment revenue build (customers × ARPU for India mobile, Homes and Africa), integrated IS/BS/CF FY20–FY31 with a Base/Bull/Bear switch, an FCFF DCF and peer multiples.",
        deliverable: "A 6-tab Excel model — Assumptions, Revenue_Costs, Schedules, Financials, Valuation, Dashboard — exported as a 10-page PDF.",
        call: "HOLD, TP ₹1,789 — 0.9% upside, from weighted mid-points of DCF (growth and exit) and peer P/E and EV/EBITDA."
      },
      blocks: [
        { t: "kpis", items: [
          { label: "Share price", value: "₹1,773", note: "12-Oct-2026" },
          { label: "Target price", value: "₹1,789", note: "Weighted mid-points", tone: "up" },
          { label: "DCF growth / exit", value: "₹1,275 / ₹1,995", note: "Value per share" },
          { label: "FY27E EBITDA", value: "₹1,33,314 Cr", note: "−3.9% vs Axis FY27E" },
          { label: "India mobile ARPU", value: "₹264", note: "Q1 FY27, per month", tone: "up" },
          { label: "Balance sheet", value: "Balances ✓", note: "Check = 0, FY26A–FY31E", tone: "up" }
        ]},
        { t: "h2", code: "FA", text: "Key financials" },
        { t: "table", title: "Key financials (₹ Cr)", head: ["₹ Cr", "FY26A", "FY27E", "FY28E", "FY29E", "FY30E", "FY31E"], rows: [
          ["Revenue", "2,10,973", "2,39,394", "2,68,096", "2,93,608", "3,18,041", "3,41,025"],
          ["Growth", "22.0%", "13.5%", "12.0%", "9.5%", "8.3%", "7.2%"],
          ["EBITDA", "1,16,514", "1,33,314", "1,53,185", "1,68,877", "1,83,304", "1,96,829"],
          ["EBITDA margin", "55.2%", "55.7%", "57.1%", "57.5%", "57.6%", "57.7%"],
          ["Net profit to shareholders", "26,698", "34,114", "44,135", "50,977", "57,610", "63,891"],
          ["EPS (₹)", "43.81", "54.66", "70.72", "81.68", "92.31", "102.37"],
          ["Return on equity", "20.3%", "20.9%", "23.5%", "24.2%", "24.7%", "24.8%"],
          ["Net debt incl. leases", "1,62,789", "1,44,913", "1,15,769", "81,275", "41,097", "(7,942)"],
          ["Capex", "45,547", "55,061", "53,619", "55,786", "57,247", "57,974"],
          ["Free cash flow", "76,683", "49,985", "69,978", "83,084", "97,007", "1,11,245"],
          ["India mobile ARPU (₹/month)", "256", "272", "299", "317", "333", "346"]
        ], bold: [0, 2, 4], note: "Source: Bharti Airtel financial model (Dashboard). FY26A per Screener.in; FY27E–FY31E model forecasts, Base case." },
        { t: "h2", code: "GP", text: "Growth, mix and balance sheet" },
        { t: "bars3d", title: "Revenue and EBITDA margin, FY20A–FY31E", sub: "₹ Cr (bars) · EBITDA margin % (line)", labels: ["FY20", "FY21", "FY22", "FY23", "FY24", "FY25", "FY26", "FY27E", "FY28E", "FY29E", "FY30E", "FY31E"], values: [87539, 100616, 116547, 139145, 149982, 172985, 210973, 239394, 268096, 293608, 318041, 341025], actual: 7, fmt: "cr", line: { label: "EBITDA margin", values: [41.8, 45.0, 49.4, 51.2, 51.9, 49.2, 55.2, 55.7, 57.1, 57.5, 57.6, 57.7], fmt: "pct" }, note: "Revenue nearly quadruples from FY20 to FY31E while EBITDA margin climbs from 41.8% to 57.7%. Source: Screener.in (FY20–FY26), model forecasts (FY27E–FY31E)." },
        { t: "mix", title: "Revenue mix — gross segment revenue", sub: "% of gross segment revenue", keys: ["India mobile", "Homes & DTV", "Airtel Business", "Passive infra (Indus)", "Airtel Africa"], rows: [
          { label: "FY26A", parts: [48.2, 4.6, 9.0, 13.9, 24.2] }, { label: "FY27E", parts: [46.4, 4.8, 8.8, 12.9, 27.2] }, { label: "FY28E", parts: [46.5, 4.9, 8.5, 12.1, 28.1] }, { label: "FY29E", parts: [45.6, 5.0, 8.4, 11.6, 29.4] }, { label: "FY30E", parts: [44.9, 5.1, 8.4, 11.1, 30.5] }, { label: "FY31E", parts: [44.0, 5.2, 8.4, 10.8, 31.7] }
        ], note: "Africa rises from 24% to 32% of the mix as customers grow ~8% a year; source: model Revenue_Costs tab." },
        { t: "signed", title: "Net debt incl. leases, FY26A–FY31E", sub: "₹ Cr · negative = net cash", labels: ["FY26A", "FY27E", "FY28E", "FY29E", "FY30E", "FY31E"], values: [162789, 144913, 115769, 81275, 41097, -7942], note: "Falling capex intensity after 5G and strong free cash flow take Airtel to net cash by FY31E." },
        { t: "h2", code: "VAL", text: "Valuation" },
        { t: "p", html: "Target price = weighted mid-points: 40% DCF growth method, 20% each for DCF exit multiple, peer P/E and peer EV/EBITDA. Rating scale: BUY above +15%, SELL below −10%, otherwise HOLD." },
        { t: "football", title: "Football field — value per share (₹)", target: 1789, cmp: 1773, rows: [
          { label: "DCF – growth method (WACC ±1%, g ±0.5%)", low: 973, high: 1814, weight: "40%" },
          { label: "DCF – exit multiple (±1x)", low: 1799, high: 2191, weight: "20%" },
          { label: "Peer P/E × FY27E EPS", low: 827, high: 2742, weight: "20%" },
          { label: "Peer EV/EBITDA × FY27E EBITDA", low: 1107, high: 3644, weight: "20%" },
          { label: "52-week trading range", low: 1726, high: 2175, weight: "–", ctx: true },
          { label: "Broker targets (May–Aug 2026)", low: 2335, high: 2530, weight: "–", ctx: true }
        ], note: "Source: model Valuation tab. Grey rows are context only and carry no weight." },
        { t: "kpis", small: true, title: "Cost of capital", items: [
          { label: "Risk-free rate", value: "7.4%", note: "10Y G-Sec, 12-Oct-2026" }, { label: "Beta", value: "0.85", note: "Estimate" }, { label: "Equity risk premium", value: "5.5%", note: "Estimate" }, { label: "Cost of equity", value: "12.0%", note: "Rf + β × ERP" }, { label: "Cost of debt (post-tax)", value: "6.7%", note: "9.0% pre-tax" }, { label: "WACC", value: "11.2%", note: "Equity weight 85%" }, { label: "Terminal growth", value: "6.0%", note: "Below nominal GDP" }, { label: "Exit EV/EBITDA", value: "10.0x", note: "Axis SOTP ~10x FY28E" }
        ]},
        { t: "grid", title: "DCF sensitivity — value per share, growth method (₹)", corner: "WACC \\ g", cols: ["5.0%", "5.5%", "6.0%", "6.5%", "7.0%"], rows: [
          { h: "9.2%", v: [1787, 1978, 2229, 2570, 3063] }, { h: "10.2%", v: [1391, 1502, 1640, 1814, 2042] }, { h: "11.2%", v: [1121, 1192, 1275, 1377, 1501] }, { h: "12.2%", v: [926, 973, 1027, 1091, 1166] }, { h: "13.2%", v: [778, 810, 847, 889, 938] }
        ], cmp: 1773, base: [2, 2], note: "Tinted vs share price ₹1,773. Outlined = base (WACC 11.2%, g 6.0%)." },
        { t: "table", title: "Peer comparison (Screener, 12-Oct-2026; TTM / FY26)", head: ["Company", "Price ₹", "Mkt cap (₹ Cr)", "EV/EBITDA", "P/E", "EBITDA mgn"], rows: [
          ["Indus Towers (~51% subsidiary)", "410", "1,08,151", "7.0x", "15.1x", "54.8%"], ["Vodafone Idea", "11", "1,21,778", "18.9x", "n.m.", "42.1%"], ["Tata Communications", "1,647", "46,956", "11.6x", "50.2x", "19.3%"], ["Bharti Airtel (reference)", "1,773", "11,06,545", "10.1x", "30.4x", "56.9%"], ["Peer median", "", "", "11.6x", "32.7x", ""]
        ], bold: [3] },
        { t: "h2", code: "LEVR", text: "Model levers" },
        { t: "table", title: "Scenario lever — India mobile ARPU growth YoY (tariff hikes)", head: ["Case", "FY27E", "FY28E", "FY29E", "FY30E", "FY31E"], rows: [
          ["Base", "6.5%", "10.0%", "6.0%", "5.0%", "4.0%"], ["Bull", "8.0%", "13.0%", "7.0%", "6.0%", "5.0%"], ["Bear", "4.0%", "5.0%", "4.0%", "3.5%", "3.0%"]
        ], bold: [0], note: "Other live levers: India customer growth (±pp), Africa ARPU FX/devaluation, India mobile EBITDA margin and capex intensity. Outputs on this page are Base case." },
        { t: "h2", code: "THES", text: "Thesis & risks" },
        { t: "twocol", left: { title: "Thesis", items: ["India’s #2 telco with the highest ARPU (₹264 in Q1 FY27) and record postpaid adds; the premium mix keeps improving.", "The next tariff hike (expected H2 FY27 / early CY2027) flows mostly to margin.", "Capex intensity is falling after the 5G build-out; strong free cash flow is cutting net debt.", "A higher Africa stake (~79% from Jun-2026) plus Homes, Business and data centres add growth."] }, right: { title: "Risks", items: ["Tariff hikes could be delayed again (June 2026: put off amid high inflation) or diluted by competition.", "Africa currency devaluations are a key swing factor (lever: Africa FX).", "Jio’s IPO (opening 21-Oct-2026) and pricing moves could reset sector economics.", "Several FY26 balance-sheet splits are flagged ESTIMATE pending the FY26 Annual Report."] } },
        { t: "h2", code: "ARCH", text: "Model architecture" },
        { t: "cards", num: true, cols: 3, items: [
          { title: "Assumptions", body: "Scenario switch (Base / Bull / Bear), market anchors, the Africa share-swap, operating and financing inputs." },
          { title: "Revenue_Costs", body: "Customers × ARPU for India mobile, Homes, DTV and Africa; growth builds for Business and Indus; segment EBITDA margins." },
          { title: "Schedules", body: "Working capital, capex / CWIP and depreciation, debt incl. leases and spectrum, tax, equity and minorities." },
          { title: "Financials", body: "Integrated income statement, balance sheet and cash flow with a zero balance check." },
          { title: "Valuation", body: "FCFF DCF (growth and exit), minorities at market value, peer multiples and a football-field target." },
          { title: "Dashboard", body: "Headlines, key financials, thesis and risks, and charts." }
        ]},
        { t: "pdf" }
      ]
    },

    {
      id: "seil",
      oldPath: "/research/seil",
      kind: "equity",
      kicker: "Equity research · Result update",
      company: "Schneider Electric Infra Ltd",
      title: "Schneider Electric Infra Ltd — Q1FY27 Result Update",
      headline: "Record orders, weakest margins in years; valuation leaves no room",
      subtitle: "Capital Goods – Power T&D Equipment · Result Update (initiation)",
      date: "26-Sep-2026",
      series: "SCHNEIDER",
      rating: "SELL", targetLabel: "Target", target: 965, cmpLabel: "CMP (25-Sep-2026)", cmp: 1210, move: "−20%", moveLabel: "Downside",
      extra: [["Mkt cap", "₹28,931 Cr"], ["TTM P/E", "158x"], ["Book-to-bill", "1.40x"]],
      pdf: { href: "documents/seil-result-update-q1fy27.pdf", label: "SEIL Result Update — Q1FY27 (10 pages)" },
      card: {
        question: "Is a record ₹2,169 Cr order backlog worth 158x TTM earnings, after the lowest-margin quarter in 13?",
        work: "Rebuilt the standalone P&L, balance sheet and cash flow (FY24A–FY28E), a five-company T&D peer set, a 10-year FCFF DCF cross-check and a P/E × EPS sensitivity grid.",
        deliverable: "A 10-page sell-side style Result Update with change-in-estimates, bull/base/bear scenarios, seven key risks and a full data log.",
        call: "SELL, TP ₹965 (80x FY28E EPS of ₹12.07) — 20% downside. Even the bull case offers only ~10% upside."
      },
      blocks: [
        { t: "kpis", items: [
          { label: "Q1FY27 revenue", value: "₹651 Cr", note: "+4.8% YoY" },
          { label: "EBITDA", value: "₹41 Cr", note: "−44% YoY", tone: "down" },
          { label: "EBITDA margin", value: "6.3%", note: "vs 11.8% Q1FY26", tone: "down" },
          { label: "PAT", value: "₹12.4 Cr", note: "−70% YoY", tone: "down" },
          { label: "Order backlog", value: "₹2,169 Cr", note: "+32.7% YoY", tone: "up" },
          { label: "Book-to-bill", value: "1.40x", note: "Record ₹915 Cr intake", tone: "up" }
        ]},
        { t: "p", html: "<span class='mono'>Est. vs actual, Q1FY27:</span> Revenue <b class='tag-flat'>IN-LINE</b> · EBITDA <b class='tag-down'>MISS</b> · PAT <b class='tag-down'>MISS</b>" },
        { t: "h2", code: "THES", text: "Investment thesis" },
        { t: "cards", num: true, items: [
          { title: "Demand is strong, but order growth has stalled at the margin", body: "Q1FY27 intake hit a record ₹915 Cr and the backlog rose 32.7% YoY to ₹2,169 Cr; data centres and semiconductors are now over one-fifth of the order bank. But FY26’s 27.4% intake growth came almost entirely from 9MFY26 (~+38%): Q4FY26 intake grew only +1.4% and Q1FY27 +0.5% YoY. The backlog covers only ~9 months of revenue." },
          { title: "Margin reset from commodities and legacy orders", body: "Gross margin fell 230 bps YoY to 36.5% and EBITDA margin to 6.3%, driven by copper inflation, fixed-price legacy orders booked before Dec’25, INR weakness on imports and April wage hikes. New Vadodara and Kolkata capacity (₹477 Cr invested to Jul’26) arrives in H2FY27." },
          { title: "Valuation stretched against a shrinking earnings base", body: "The stock trades at 158x TTM EPS and 41.9x P/BV while TTM PAT (₹183 Cr) is 32% below FY25. No dividend is paid, and related-party dependence is high (FY27 RPT approval ₹1,620 Cr)." }
        ]},
        { t: "quote", html: "Sector outlook positive — India’s T&D, grid-modernisation and data-centre capex cycle is intact, but largely priced in (peers at 85–115x TTM). Management gave no numerical guidance; it expects the next three quarters to be better than Q1." },
        { t: "h2", code: "RSLT", text: "Q1FY27 results" },
        { t: "table", title: "Q1FY27 key financials (standalone, ₹ Cr)", head: ["₹ Cr", "Q1FY27", "QoQ (%)", "YoY (%)", "FY26 avg qtr", "Variance (%)"], rows: [
          ["Net sales", "651", "10.4", "4.8", "723", "−9.9"], ["EBITDA", "41", "−18.0", "−44.3", "97", "−57.9"], ["EBITDA margin", "6.3", "−218 bps", "−555 bps", "13.5", "−717 bps"], ["Net profit", "12.4", "−43.6", "−69.9", "53.1", "−76.7"], ["EPS (₹)", "0.52", "−43.5", "−69.8", "2.22", "−76.6"]
        ], note: "Source: company, Screener.in, research estimates. FY26 avg qtr = FY26A ÷ 4." },
        { t: "table", title: "Order intake & backlog (₹ Cr)", head: ["₹ Cr", "9MFY25*", "Q4FY25*", "FY25", "9MFY26*", "Q4FY26", "FY26", "Q1FY27"], rows: [
          ["Order intake", "1,931", "761", "2,692", "2,658", "772", "3,430", "915"], ["YoY growth (%)", "—", "—", "—", "37.6", "1.4", "27.4", "0.5"], ["Closing backlog", "—", "—", "1,273*", "—", "—", "1,911", "2,169"]
        ], note: "*Derived: Q4FY25 = 772/1.014; 9M = full year − Q4; FY25 backlog = 1,911/1.501." },
        { t: "h2", code: "FA", text: "Estimates & financials" },
        { t: "bars3d", title: "Net sales and EBITDA margin, FY24A–FY28E", sub: "₹ Cr (bars) · EBITDA margin % (line)", labels: ["FY24A", "FY25A", "FY26A", "FY27E", "FY28E"], values: [2207, 2637, 2891, 3240, 3791], actual: 3, fmt: "cr", line: { label: "EBITDA margin", values: [13.6, 15.4, 13.5, 11.1, 13.1], fmt: "pct" }, note: "Source: company, Screener.in, research estimates." },
        { t: "table", title: "Change in estimates (₹ Cr)", head: ["", "Old FY27E*", "Old FY28E*", "New FY27E", "New FY28E", "Chg FY27E", "Chg FY28E"], rows: [
          ["Sales", "3,240", "3,791", "3,240", "3,791", "0%", "0%"], ["EBITDA", "436", "509", "360", "496", "−17%", "−2%"], ["EBIT", "378", "441", "302", "428", "−20%", "−3%"], ["PAT", "252", "298", "196", "289", "−22%", "−3%"], ["EPS (₹)", "10.52", "12.46", "8.18", "12.07", "−22%", "−3%"]
        ], note: "*Initiation: “Old” is a mechanical baseline that holds FY26A operating margin (12.8%) on the same revenue, isolating the Q1 margin reset." },
        { t: "table", title: "Profit & loss (standalone, ₹ Cr)", head: ["Y/E March", "FY24A", "FY25A", "FY26A", "FY27E", "FY28E"], rows: [
          ["Net sales", "2,207", "2,637", "2,891", "3,240", "3,791"], ["Growth YoY (%)", "NA", "19.5", "9.6", "12.1", "17.0"], ["EBITDA (company defn.)", "301", "407", "389", "360", "496"], ["EBITDA margin (%)", "13.6%", "15.4%", "13.5%", "11.1%", "13.1%"], ["Depreciation", "22", "25", "32", "38", "46"], ["Interest & fin. charges", "69", "49", "51", "58", "60"], ["Pre-tax profit", "210", "351", "292", "264", "390"], ["Profit after tax", "172", "268", "213", "196", "289"], ["EPS basic (₹, FV ₹2)", "7.19", "11.20", "8.89", "8.18", "12.07"], ["P/BV (x)", "–", "–", "41.9", "32.7", "24.6"], ["ROE (%)", "–", "–", "36%", "25%", "28%"]
        ], bold: [0, 2, 7], note: "Forward tax rate 26%." },
        { t: "h2", code: "VAL", text: "Valuation" },
        { t: "p", html: "Primary method: <b>80x FY28E EPS of ₹12.07 = ₹965</b>. Peers trade at 85–115x TTM, estimated at ~60–80x two-year-forward earnings. Applying 80x — the top of that range, with no discount for weaker margins, smaller scale or related-party exposure — gives a TP of ₹965 (−20%), or 118x FY27E EPS. The DCF (₹163/share) is a cross-check, not blended." },
        { t: "scenarios", cmp: 1210, items: [
          { name: "Bear", value: 652, chg: "−46%", note: "60x on EPS 10% below estimate (₹10.86)" },
          { name: "Base", value: 965, chg: "−20%", note: "80x on FY28E EPS of ₹12.07" },
          { name: "Bull", value: 1327, chg: "+10%", note: "100x on EPS 10% above estimate (₹13.27)" }
        ]},
        { t: "grid", title: "Target price sensitivity: P/E × FY28E EPS (₹)", corner: "Target P/E", cols: ["EPS −10% (10.86)", "Base (12.07)", "EPS +10% (13.27)"], rows: [
          { h: "60x", v: [652, 724, 796] }, { h: "70x", v: [760, 845, 929] }, { h: "80x", v: [869, 965, 1062] }, { h: "90x", v: [977, 1086, 1195] }, { h: "100x", v: [1086, 1207, 1327] }
        ], cmp: 1210, base: [2, 1], note: "Only 100x on EPS 10% above our estimate reaches the CMP." },
        { t: "table", title: "Peer comparison (late Sep-2026)", head: ["Company", "Mkt cap (₹ Cr)", "P/E TTM (x)", "P/B (x)", "ROE (%)", "ROCE (%)"], rows: [
          ["Hitachi Energy India", "1,38,330", "116", "26.7", "21.9", "29.4"], ["ABB India (CY)", "~1,51,000", "~91*", "NA", "NA", "NA"], ["GE Vernova T&D India", "1,11,380", "86.5", "37.0", "55.3", "75.5"], ["CG Power & Industrial", "NA", "~111", "NA", "NA", "NA"], ["Siemens Energy India", "1,14,457", "NA", "NA", "29.2", "40.2"], ["SEIL", "28,931", "158", "41.9", "36.4", "29.7"]
        ], bold: [5], note: "SEIL trades at a ~55% premium to the peer median (~101x) despite the lowest margin, the only declining earnings trend, net debt and no dividend." },
        { t: "kpis", small: true, title: "DCF cross-check (FCFF, 10 years, mid-year)", items: [
          { label: "WACC", value: "14.07%", note: "CoE 14.25% · CoD 5.99% post-tax" }, { label: "Terminal growth", value: "6.0%", note: "TV = 64% of EV" }, { label: "Enterprise value", value: "₹4,166 Cr", note: "PV FCFF ₹1,505 + PV TV ₹2,661" }, { label: "Value per share", value: "₹163", note: "−87% vs CMP", tone: "down" }
        ]},
        { t: "p", html: "<b>Reconciling ~158x TTM P/E with a DCF of ₹163.</b> At 6% terminal growth, today’s price implies a WACC of ~7.4% — roughly the 10-year G-Sec yield. At our 14.07% WACC it needs ~13% perpetual growth. The premium comes from the sector theme (the whole T&D group re-rated to 85–115x), MNC brand and technology, a low free float that amplifies moves, and speculative parent-led optionality we don’t value." },
        { t: "h2", code: "RISK", text: "Key risks" },
        { t: "list", ordered: true, items: [
          "<b>Commodity costs.</b> Copper, aluminium and steel dominate COGS; each 100 bps of gross margin ≈ ₹38 Cr of FY28E EBITDA (~10% of FY28E PAT).",
          "<b>Related-party dependence and governance.</b>", "<b>Labour Codes.</b>", "<b>Execution and working capital.</b>", "<b>Valuation and de-rating.</b>", "<b>Low free float.</b>", "<b>No dividend.</b>"
        ]},
        { t: "quote", html: "<b>Upside risks to the SELL call:</b> faster price pass-through, a copper correction, large data-centre/semiconductor/export orders, parent-led corporate action (none disclosed), or continued flow-driven sector re-rating." },
        { t: "pdf" }
      ]
    },

    {
      id: "waaree",
      oldPath: "/research/waaree",
      kind: "equity",
      kicker: "Financial model · DCF · Solar",
      company: "Waaree Energies Ltd",
      title: "Waaree Energies Ltd (NSE: WAAREEENER) — Financial Model",
      headline: "The largest non-Chinese module maker — growth priced in",
      subtitle: "Consolidated, ₹ Cr, FY ends 31 March · FY20–26 actual, FY27–31 forecast",
      date: "26-Sep-2026",
      series: "WAAREEENER",
      rating: "HOLD", targetLabel: "Target", target: 2395, cmpLabel: "Share price (25-Sep-2026)", cmp: 2495, move: "(4.0%)", moveLabel: "Downside",
      extra: [["DCF growth / exit", "₹1,684 / ₹2,584"], ["Order book", "₹61,500 Cr"], ["Case", "Base"]],
      pdf: { href: "documents/waaree-energies-financial-model.pdf", label: "Waaree Energies — Financial Model (9-page PDF export)" },
      card: {
        question: "After an 84% revenue jump in FY26, how much of Waaree’s solar manufacturing growth is already in the price?",
        work: "Capacity × utilisation × price revenue build by segment, own-cell share driving material costs, integrated IS/BS/CF FY20–FY31 with Base/Bull/Bear levers, FCFF DCF and peer multiples.",
        deliverable: "A 6-tab Excel model with dashboard, scenario levers and a football-field target (9-page PDF export).",
        call: "HOLD, TP ₹2,395 — (4.0%) downside on weighted DCF and peer methods."
      },
      blocks: [
        { t: "kpis", items: [
          { label: "Share price", value: "₹2,495", note: "Close 25-Sep-2026" },
          { label: "Target price", value: "₹2,395", note: "Weighted mid-points", tone: "down" },
          { label: "DCF growth / exit", value: "₹1,684 / ₹2,584", note: "Value per share" },
          { label: "FY27E EBITDA", value: "₹7,150 Cr", note: "Within ₹7,000–7,700 Cr guidance" },
          { label: "Order book", value: "₹61,500 Cr", note: "1.8x FY27E revenue", tone: "up" },
          { label: "Balance sheet", value: "Balances ✓", note: "Check = 0, FY26A–FY31E", tone: "up" }
        ]},
        { t: "h2", code: "FA", text: "Key financials" },
        { t: "table", title: "Key financials (₹ Cr)", head: ["₹ Cr", "FY26A", "FY27E", "FY28E", "FY29E", "FY30E", "FY31E"], rows: [
          ["Revenue", "26,537", "34,919", "42,605", "51,522", "56,125", "57,010"], ["Growth", "83.7%", "31.6%", "22.0%", "20.9%", "8.9%", "1.6%"], ["EBITDA", "5,909", "7,150", "9,472", "12,706", "12,975", "12,160"], ["EBITDA margin", "22.3%", "20.5%", "22.2%", "24.7%", "23.1%", "21.3%"], ["Net profit to shareholders", "3,709", "4,161", "5,329", "7,119", "6,974", "6,619"], ["EPS (₹)", "129.02", "144.73", "185.36", "247.62", "242.58", "230.23"], ["ROE", "31.0%", "25.3%", "25.4%", "26.4%", "20.8%", "16.6%"], ["Net debt / (net cash)", "(287)", "1,600", "3,185", "93", "(9,976)", "(19,385)"], ["Capex", "4,836", "7,139", "9,459", "7,388", "842", "855"], ["Free cash flow", "(3,209)", "(1,242)", "(1,372)", "3,448", "10,487", "9,939"], ["Modules sold – India (GW)", "10.56", "13.31", "14.52", "15.00", "15.25", "15.25"], ["Own-cell share of India modules", "20.0%", "28.4%", "53.7%", "82.1%", "80.8%", "80.8%"]
        ], bold: [0, 2, 4], note: "Source: Waaree Energies financial model (Dashboard). FY26A per Screener.in; FY27E–FY31E Base case." },
        { t: "h2", code: "GP", text: "Growth, mix and balance sheet" },
        { t: "bars3d", title: "Revenue and EBITDA margin, FY26A–FY31E", sub: "₹ Cr (bars) · EBITDA margin % (line)", labels: ["FY26A", "FY27E", "FY28E", "FY29E", "FY30E", "FY31E"], values: [26537, 34919, 42605, 51522, 56125, 57010], actual: 1, fmt: "cr", line: { label: "EBITDA margin", values: [22.3, 20.5, 22.2, 24.7, 23.1, 21.3], fmt: "pct" }, note: "Revenue grew from ₹1,996 Cr in FY20A to ₹26,537 Cr in FY26A; margin peaks at 24.7% in FY29E as the own-cell share rises. India modules fall from 80.8% of revenue to 47.1% as US modules, BESS (17.5% by FY31E) and other businesses scale." },
        { t: "signed", title: "Net debt / (net cash), FY26A–FY31E", sub: "₹ Cr · negative = net cash", labels: ["FY26A", "FY27E", "FY28E", "FY29E", "FY30E", "FY31E"], values: [-287, 1600, 3185, 93, -9976, -19385], note: "Net debt peaks at ₹3,185 Cr in FY28E during the capex programme, then flips to net cash of ₹19,385 Cr by FY31E." },
        { t: "h2", code: "VAL", text: "Valuation" },
        { t: "p", html: "Target price = weighted mid-points: 40% DCF growth method, 20% each for DCF exit multiple, peer P/E and peer EV/EBITDA." },
        { t: "football", title: "Football field — value per share (₹)", target: 2395, cmp: 2495, rows: [
          { label: "DCF – growth method (WACC ±1%, g ±0.5%)", low: 1438, high: 2051, weight: "40%" },
          { label: "DCF – exit multiple (±1x)", low: 2342, high: 2826, weight: "20%" },
          { label: "Peer P/E × FY27E EPS", low: 2355, high: 3518, weight: "20%" },
          { label: "Peer EV/EBITDA × FY27E EBITDA", low: 1716, high: 4217, weight: "20%" },
          { label: "52-week trading range", low: 2402, high: 3720, weight: "–", ctx: true }
        ], note: "Source: model Valuation tab. Rating scale: BUY > +15%, SELL < −10%, otherwise HOLD." },
        { t: "kpis", small: true, title: "Cost of capital", items: [
          { label: "Risk-free rate", value: "7.1%", note: "10Y G-Sec, 25-Sep-2026" }, { label: "Beta", value: "1.15", note: "Estimate" }, { label: "Equity risk premium", value: "5.5%", note: "Estimate" }, { label: "Cost of equity", value: "13.4%", note: "Rf + β × ERP" }, { label: "Cost of debt (post-tax)", value: "6.5%", note: "8.8% pre-tax, CARE AA-" }, { label: "WACC", value: "13.1%", note: "Equity weight 95.7%" }, { label: "Terminal growth", value: "6.0%", note: "Estimate" }, { label: "Exit EV/EBITDA", value: "9.0x", note: "Below today’s ~11.6x" }
        ]},
        { t: "grid", title: "DCF sensitivity — value per share, growth method (₹)", corner: "WACC \\ g", cols: ["5.0%", "5.5%", "6.0%", "6.5%", "7.0%"], rows: [
          { h: "11.1%", v: [2144, 2242, 2358, 2499, 2673] }, { h: "12.1%", v: [1832, 1894, 1967, 2051, 2152] }, { h: "13.1%", v: [1596, 1637, 1684, 1737, 1799] }, { h: "14.1%", v: [1410, 1438, 1469, 1504, 1543] }, { h: "15.1%", v: [1261, 1280, 1301, 1324, 1350] }
        ], cmp: 2495, base: [2, 2], note: "Tinted vs share price ₹2,495. Outlined = base (WACC 13.1%, g 6.0%)." },
        { t: "table", title: "Peer comparison (Screener, close 25-Sep-2026; TTM to Jun-2026)", head: ["Company", "Price ₹", "Mkt cap (₹ Cr)", "EV/EBITDA", "P/E", "EBITDA mgn"], rows: [
          ["Premier Energies", "896", "40,692", "17.2x", "24.3x", "30.0%"], ["Vikram Solar", "160", "5,808", "7.1x", "16.3x", "15.3%"], ["Waaree Renewable Tech. (subsidiary)", "833", "8,683", "12.6x", "17.0x", "19.1%"], ["Waaree Energies (reference)", "2,495", "71,740", "11.7x", "17.9x", "21.1%"], ["Peer median", "", "", "12.6x", "17.0x", ""]
        ], bold: [3] },
        { t: "h2", code: "LEVR", text: "Model levers" },
        { t: "table", title: "Base case lever values, FY27E–FY31E", head: ["Base lever", "Unit", "FY27E", "FY28E", "FY29E", "FY30E", "FY31E"], rows: [
          ["India module price change YoY", "%", "(4.0%)", "(3.0%)", "(3.0%)", "(2.0%)", "(2.0%)"], ["India module utilisation adjustment", "pp", "–", "–", "–", "–", "–"], ["Raw-material cost change YoY", "%", "–", "(2.0%)", "(2.0%)", "(1.0%)", "(1.0%)"], ["US module price adjustment", "%", "–", "–", "–", "–", "–"], ["US 45X tax-credit realisation", "%", "100%", "100%", "100%", "100%", "100%"]
        ], note: "Switch Base / Bull / Bear in the downloadable model; the live lever row feeds the whole model." },
        { t: "h2", code: "THES", text: "Thesis & risks" },
        { t: "twocol", left: { title: "Thesis", items: ["Largest non-Chinese module maker (~26 GW) with a record ~₹61,500 Cr order book.", "Own cells (5.4 → 15.4 GW) and wafers lift margins as the own-cell share rises.", "New businesses (BESS, T&D, inverters, electrolysers) widen the growth runway."] }, right: { title: "Risks", items: ["Indian module oversupply could push prices down faster (lever: module price).", "US tariffs / 45X credit rules are a big profit swing (levers: US price, 45X).", "Input-cost spikes, as seen in Q1 FY27 margins (lever: raw-material cost)."] } },
        { t: "h2", code: "ARCH", text: "Model architecture" },
        { t: "cards", num: true, cols: 3, items: [
          { title: "Assumptions", body: "Scenario switch (Base / Bull / Bear), market anchors, capacity, utilisation, prices, costs and financing inputs." },
          { title: "Revenue_Costs", body: "Capacity × utilisation × price revenue build by segment; material-cost build driven by own-cell share." },
          { title: "Schedules", body: "Working capital, capex / CWIP and depreciation, debt and interest, tax, equity and minorities." },
          { title: "Financials", body: "Integrated income statement, balance sheet and cash flow with a zero balance check." },
          { title: "Valuation", body: "FCFF DCF (growth and exit methods), peer multiples and football-field target price." },
          { title: "Dashboard", body: "Headlines, key financials, thesis & risks and charts." }
        ]},
        { t: "list", items: ["Blue = input, black = formula, green = link to another tab.", "No circularity: interest is calculated on opening balances.", "Every input is sourced; placeholders are flagged ESTIMATE for replacement from the FY26 Annual Report.", "Balance check = 0 in every forecast year."] },
        { t: "pdf" }
      ]
    },

    {
      id: "genz",
      oldPath: "/research/genz",
      kind: "paper",
      kicker: "Research paper · Behavioural finance",
      company: "Digital Natives & Digital Assets",
      title: "Digital Natives & Digital Assets: Financial Behaviour and Investment Patterns Among Generation Z",
      headline: "How the first fintech-native generation learns, decides and invests",
      subtitle: "Authors: Pratik Priyaranjan Sahoo, Samyak Jain · Mentor: Dr Sheetal Hukkeri, Associate Professor, JAIN University",
      date: "2026",
      metrics: [["Theories", "4"], ["Propositions", "6"], ["Contributions", "3"]],
      keywords: ["Generation Z", "financial behaviour", "fintech adoption", "digital financial literacy", "behavioural finance"],
      pdf: { href: "documents/genz-financial-behaviour-paper.pdf", label: "Digital Natives & Digital Assets — full paper (PDF)" },
      card: {
        question: "What actually drives how Gen Z invests — and how should researchers test it?",
        work: "Synthesised behavioural finance, the Technology Acceptance Model, financial socialisation and social identity theory into one integrative model.",
        deliverable: "A conceptual framework paper with six testable propositions and three theoretical contributions.",
        call: "Digital Financial Socialisation is a distinct construct; social media moderates biases rather than causing them."
      },
      blocks: [
        { t: "p", html: "<span class='mono'>Method:</span> Conceptual framework paper — theoretical synthesis of published research; no primary data collected." },
        { t: "h2", code: "ABST", text: "Abstract, in plain English" },
        { t: "p", html: "Gen Z (born roughly 1997–2012) is the first generation to enter financial markets having grown up with fintech, yet most research on young investors still centres on Millennials." },
        { t: "p", html: "This conceptual paper brings behavioural finance, the Technology Acceptance Model, financial socialisation and social identity theory into one model that links how Gen Z learns about money online, adopts fintech, handles risk and loss, and values sustainability to what they actually invest in." },
        { t: "p", html: "It sets out six testable propositions and three theoretical contributions to guide future data-driven studies." },
        { t: "h2", code: "THRY", text: "Theoretical foundation" },
        { t: "cards", cols: 2, items: [
          { kicker: "Prospect Theory (Kahneman & Tversky, 1979) · Mental Accounting (Thaler, 1999)", title: "Behavioural Finance", body: "Loss aversion, the disposition effect, treating crypto as “fun money”, and anchoring on the 2020–21 post-Covid bull market." },
          { kicker: "Davis (1989) · UTAUT (Venkatesh et al., 2003)", title: "Technology Acceptance Model", body: "Fintech adoption follows perceived usefulness and ease of use, plus social influence and platform design." },
          { kicker: "Danes (1994) · Shim et al. (2010)", title: "Financial Socialisation Theory", body: "Online platforms join family, school and peers as a fourth socialising agent — the basis for Digital Financial Socialisation." },
          { kicker: "Modigliani & Brumberg (1954) · Tajfel & Turner (1979)", title: "Life-Cycle Hypothesis & Social Identity Theory", body: "Student debt, gig work and micro-investing complicate the life-cycle path; group identity explains herd events like WallStreetBets." }
        ]},
        { t: "h2", code: "MODL", text: "Conceptual model" },
        { t: "model", cols: [
          { title: "Antecedents", sub: "Independent variables", items: ["Digital Financial Socialisation", "Financial Literacy", "Risk Tolerance", "Loss Aversion", "Sustainability Consciousness", "Socioeconomic Background"] },
          { title: "Mediators", sub: "How antecedents become behaviour", items: ["Fintech Adoption Intensity", "Perceived Usefulness of Digital Tools"] },
          { title: "Outcomes", sub: "Dependent variables", items: ["Portfolio Diversification", "Speculative Asset Holdings", "ESG Participation", "Fintech Investment Behaviour"] }
        ], moderators: ["Social Media Trading Influence", "Regulatory Environment", "Financial Shock Experience"], note: "Source: Sahoo & Jain, Figure 1 — integrative conceptual model. Moderators act across all key relationships." },
        { t: "h2", code: "PROP", text: "Six testable propositions" },
        { t: "cards", cols: 2, items: [
          { kicker: "P1 · Positive", title: "Digital financial socialisation → fintech adoption", body: "Gen Z investors who learn about money mainly online see fintech as more useful and adopt it more. The link weakens where internet access is poor or fintech is tightly regulated." },
          { kicker: "P2 · Positive interaction", title: "Literacy, risk tolerance and diversification", body: "Financial literacy turns risk appetite into sensible diversification. Risk-tolerant investors without it tend to concentrate in a few risky assets." },
          { kicker: "P3 · Positive (mediated)", title: "Loss aversion, social media and speculation", body: "When online groups showcase speculative winners, loss-averse investors fear missing gains more than losing money, and join in." },
          { kicker: "P4 · Positive", title: "Sustainability consciousness → ESG investing", body: "Sustainability-minded Gen Z investors allocate more to ESG, amplified by digital socialisation and supported by evidence that ESG rarely costs returns." },
          { kicker: "P5 · Positive (mediated)", title: "Fintech adoption as mediator", body: "Fintech adoption is the channel through which perceived usefulness becomes more frequent, more varied and more inclusive investing." },
          { kicker: "P6 · Attenuated in high-regulation markets", title: "Regulation moderates peer influence", body: "Leverage limits, product rules and disclosure requirements dampen peer-driven risk-taking." }
        ]},
        { t: "h2", code: "CONT", text: "Three theoretical contributions" },
        { t: "cards", num: true, items: [
          { title: "Digital Financial Socialisation as a distinct construct", body: "Online, informal and social learning about money, treated as a fourth socialisation agent separate from conventional financial literacy." },
          { title: "Social-media trading influence as a moderator, not a direct cause", body: "It amplifies existing biases — turning loss aversion into FOMO-driven speculation — rather than creating behaviour on its own." },
          { title: "Sustainability consciousness as a driver of portfolio choice", body: "A theoretically grounded reason for what Gen Z holds, missing from earlier behavioural finance models." }
        ]},
        { t: "h2", code: "IMPL", text: "Implications" },
        { t: "cards", items: [
          { title: "Educators", body: "Teach digital financial literacy in formats that match how Gen Z consumes media, ideally at the point of decision inside apps. Credible finance creators can reach this audience better than lectures." },
          { title: "Fintech platforms", body: "Prioritise diversification prompts, concentration warnings and historical-performance context over gamified features that encourage speculation. Default to the risk level the user has stated." },
          { title: "Regulators", body: "Require social-trading platforms to disclose losses alongside profits, cap retail leverage, and treat manipulative gamification as a potential investor-protection issue (P6)." }
        ]},
        { t: "h2", code: "LIMS", text: "Limitations & future research" },
        { t: "twocol", neutral: true, left: { title: "Limitations", items: ["Theoretical only: no primary data is collected, so the propositions still need real-world testing.", "The literature review is selective; financial anxiety, mental wellbeing and macro conditions sit outside the model.", "Most evidence comes from North America, Europe and East Asia.", "Digital Financial Socialisation has no validated measurement scale yet."] }, right: { title: "Future research", items: ["Longitudinal panels that follow Gen Z investors from account opening to built portfolios.", "Cross-country studies across high- and low-regulation markets to test P6.", "Develop and validate a Digital Financial Socialisation scale before testing the full model."] } },
        { t: "pdf" }
      ]
    }
  ],

  /* ------------------------------------------------------------------ BLOG */
  posts: [
    {
      id: "india-urea-paradox",
      topic: "Commodities · Agriculture · Policy",
      title: "The ₹3 Lakh Crore Bag: India’s Urea Paradox and the Business Hiding Inside It",
      dek: "India is the world’s largest urea importer, and in FY26 its dependence got worse. Imports surged 83% while output slipped — and that was before the 2026 Hormuz crisis hit.",
      date: "12-Oct-2026", read: "~8 min read",
      tags: ["Fertiliser", "Urea", "LNG", "Fiscal policy"],
      pdf: "documents/The_3_Lakh_Crore_Bag_India_Urea_Paradox.pdf",
      stats: [["Urea imports, FY26", "103.5 lakh t", "+83% YoY"], ["FY27 fertiliser subsidy", "up to ₹3.4 lakh Cr", "vs ₹1.71 lakh Cr budgeted"], ["Imported LNG in urea gas", "~86%", "per IEEFA"]],
      blocks: [
        { t: "p", html: "India is the world’s largest importer of urea, and in FY26 its dependence got worse, not better. Urea imports surged 83% to 103.5 lakh tonnes while domestic production slipped to 293 lakh tonnes — and that was <em>before</em> the 2026 Hormuz crisis hit." },
        { t: "h2", text: "The big picture" },
        { t: "p", html: "Urea is the backbone of Indian farming. It accounts for roughly 45% of all fertiliser used in the country, and sales touched nearly 40 million tonnes in calendar 2025. Farmers buy it at a government-fixed price far below market rates, so demand keeps rising regardless of global costs." },
        { t: "stacked", title: "Imports jumped 83% as output fell", sub: "Urea supply by source, lakh tonnes", legend: ["Domestic production", "Imports"], cats: [{ label: "FY25", parts: [307, 56] }, { label: "FY26", parts: [293, 104] }], note: "Import share of supply rose from ~16% in FY25 to ~26% in FY26. Govt data in Parliament via India Sea Trade News." },
        { t: "table", head: ["Metric", "Figure"], rows: [["Urea plants in India", "33"], ["Installed capacity", "~269 lakh tonnes a year"], ["Production, FY24 (record)", "314 lakh tonnes"], ["Production, FY26", "293 lakh tonnes"], ["Imports, FY26", "103.5 lakh tonnes (+83% YoY)"], ["Typical annual imports", "6–10 million tonnes"]] },
        { t: "h3", text: "The hidden dependence: gas" },
        { t: "p", html: "The headline import number understates the real problem. Urea is made from ammonia, and ammonia is made from natural gas. According to IEEFA, imported LNG now supplies around 86% of the gas used in domestic urea plants, and roughly half of India’s LNG comes from the Gulf. So even “Made in India” urea is largely imported energy in a different form. Counting the feedstock, India’s true dependence on foreign supply for its nitrogen fertiliser is far higher than the ~20–26% import share suggests." },
        { t: "h2", text: "Why India still imports — and what 2026 exposed" },
        { t: "h3", text: "Demand outruns capacity" },
        { t: "p", html: "India’s 33 plants can make about 269 lakh tonnes a year at nameplate capacity, and run above that in good years. But demand is near 400 lakh tonnes. Because the farm-gate price is fixed (roughly ₹266 for a 45-kg bag), there is no price signal to curb overuse — urea is often applied well beyond what crops need, at the expense of phosphate and potash balance." },
        { t: "h3", text: "The 2026 Hormuz shock" },
        { t: "p", html: "When the Strait of Hormuz was closed during the US–Iran conflict, India was hit twice:" },
        { t: "list", items: [
          "<b>Feedstock shock:</b> Qatari LNG supplies were suspended. Some urea plants shut down or advanced maintenance, and domestic output fell by about a quarter in March 2026. LNG spot prices jumped from about $10.4/MMBtu in late February to a peak near $25.4 in early March.",
          "<b>Import price shock:</b> Global urea prices rose about 65% in 40 days. In April, Indian Potash Ltd bought a record 2.5 million tonnes in a single tender at $935–959 per tonne — more than double the year-earlier price."
        ]},
        { t: "linepts", title: "Urea import price: spike and retreat", sub: "USD per tonne", points: [{ label: "Apr 2025", value: 415 }, { label: "Late Feb 2026", value: 482 }, { label: "Early Apr 2026", value: 795 }, { label: "Apr 2026 tender", value: 947 }, { label: "Aug 2026 tender", value: 392 }], note: "April tender = midpoint of $935–959; August tender landed at ~$390–394. Business Today, Kotak Neo, KNN India, Superkalam." },
        { t: "p", html: "India avoided an actual shortage. The strait reopened on 17 April, the government bought aggressively on spot markets, and it rerouted supply: Egypt, Algeria, Nigeria and Georgia supplied 52% of India’s 2.5 million tonnes of urea imports in April–June 2026, up from almost nothing a year earlier. By June, urea stocks stood at 81 lakh tonnes, up from 69 lakh a year before. Prices have since normalised — an August tender landed near $390 a tonne." },
        { t: "h3", text: "Farms dodged it; the budget didn’t" },
        { t: "p", html: "Farmers kept paying the same price, so the entire shock landed on the exchequer. The FY27 fertiliser subsidy was budgeted at ₹1.71 lakh crore; officials now say it could exceed ₹3 lakh crore, with some estimates up to ₹3.4 lakh crore. In April 2026 alone the Centre spent about ₹22,000 crore on fertiliser subsidy. That is the real cost of import dependence: every global spike becomes a fiscal hole." },
        { t: "hbars", title: "FY27 fertiliser subsidy may double", sub: "₹ lakh crore", unit: "", items: [{ label: "FY27 Budget estimate", value: 1.71 }, { label: "FY27 projected (upper)", value: 3.40, hi: true }], note: "Projection per government officials and fiscal estimates, mid-2026." },
        { t: "h2", text: "The self-sufficiency push: what’s working and what isn’t" },
        { t: "table", head: ["Initiative", "Status", "My read"], rows: [
          ["New gas-based plants", "Six plants added ~76 lakh tonnes of capacity (Gorakhpur, Sindri, Barauni, Ramagundam and others)", "Worked on volume, but deepened LNG dependence"],
          ["Talcher coal-gasification plant (Odisha)", "12.7 lakh tonnes a year; JV of GAIL, Coal India, RCF and FCIL; targeted for Dec 2027", "Strategically big: first urea from domestic coal instead of imported gas"],
          ["Coal & lignite gasification scheme", "₹37,500 crore outlay approved May 2026; goal of 100 MT gasification capacity by 2030", "Could replicate Talcher if the first plant’s economics hold"],
          ["Nano urea (IFFCO)", "~14 crore bottles produced since 2021; ~2.5 crore unsold; efficacy studies ongoing", "Unproven — a PAU field trial found wheat and rice yields fell 21% and 13%"],
          ["Supplier diversification", "Africa, Georgia, Russia, China; long-term Saudi and Moroccan contracts for phosphates", "Reduces chokepoint risk, not cost risk"],
          ["LNG diversification", "Cargoes from the US, Oman, Angola, Norway and others after Qatar disruption", "Helps security; gas remains imported"]
        ]},
        { t: "p", html: "The pattern is clear. India has become far better at <em>making</em> urea, but it has done so mainly by importing the gas to make it. True self-reliance needs either domestic feedstock (coal gasification, more domestic gas) or lower consumption per hectare (better efficiency products, balanced nutrition, subsidy reform)." },
        { t: "h2", text: "Where the business opportunity is" },
        { t: "p", html: "A government that may spend over ₹3 lakh crore a year on fertiliser subsidies has every incentive to pay for anything that cuts imports or cuts usage. That creates openings across the value chain — though not all of them are open to small players." },
        { t: "table", head: ["Opportunity", "Why now", "Who can play", "Entry barrier"], rows: [
          ["Coal-to-urea / coal-to-ammonia", "₹37,500 cr gasification scheme; Talcher as proof of concept", "EPC firms, equipment makers, PSU JVs", "Very high (₹13,000+ cr per plant)"],
          ["Green ammonia & green urea", "Long-term route to cut both gas imports and emissions as renewable hydrogen costs fall", "Renewable developers, large industrial groups", "Very high; economics still emerging"],
          ["Efficiency fertilisers (coated, slow-release, water-soluble, customised blends)", "Every tonne saved per hectare is a tonne not imported", "Mid-size agrochem and specialty fertiliser firms", "Medium; needs regulatory approval and field proof"],
          ["Soil testing, precision nutrition & drone spraying", "Overuse of urea is the cheapest “supply” to unlock", "Agri-tech startups, FPOs, rural entrepreneurs", "Low to medium"],
          ["Port handling, bagging, warehousing & rail logistics", "Record single tenders of 2.5 MT and new African routes need capacity", "Logistics firms, port operators, warehouse owners", "Medium"],
          ["Distribution & retail (agri-input stores)", "~40 MT of annual sales flows through dealers", "Local entrepreneurs", "Low; thin margins, fixed MRP"]
        ]},
        { t: "h3", text: "The investor’s angle" },
        { t: "p", html: "Listed urea makers (such as Chambal Fertilisers, RCF, NFL and GSFC) operate under a cost-plus subsidy regime. Their profits depend less on urea prices and more on plant energy efficiency versus government norms, and on how quickly subsidy dues are paid. In a year like FY27, when the subsidy bill may double, delayed payments can strain working capital. Gas importers and handlers (such as Petronet LNG and GAIL) and specialty fertiliser companies (such as Coromandel International) offer different exposures to the same theme. <em>This is not a recommendation to buy any stock.</em>" },
        { t: "h3", text: "Key risks" },
        { t: "list", items: [
          "<b>Policy risk:</b> Fixed farm-gate prices and state-canalised urea imports limit private pricing power and trading access.",
          "<b>Feedstock risk:</b> Any new gas-based capacity adds to LNG dependence; coal routes carry high capital and emissions costs.",
          "<b>Unproven technology:</b> Nano urea’s mixed field results are a warning that efficiency claims need independent evidence.",
          "<b>Fiscal fatigue:</b> A government squeezed by subsidies may delay payments or reform rules abruptly."
        ]},
        { t: "h2", text: "My view" },
        { t: "p", html: "India’s urea story is a classic case of solving the visible problem while deepening a hidden one. Building plants reduced finished-urea imports for a few years, but it shifted the dependence upstream into LNG — which the 2026 Hormuz crisis exposed brutally. The opportunity of the next decade lies in two places: <b>domestic feedstock</b> (coal gasification today, green ammonia tomorrow) and <b>using less</b> (efficiency products, precision application and, eventually, subsidy reform that gives farmers a reason to stop overusing urea). Businesses that help India grow the same crop with fewer imported molecules will have the government as their most motivated customer." },
        { t: "disclaimer", html: "This article is the author’s personal analysis for educational purposes and is not investment advice. Data as of 12 October 2026." },
        { t: "sources", items: ["India Sea Trade News — FY26 urea imports surge 83%", "Angel One — India’s urea production, capacity and nano urea sales FY26", "Business Today — India to import record urea at nearly 2x price", "East Asia Forum — India’s farms dodged the Hormuz crisis, but its budget didn’t", "Outlook Business — Hormuz crisis pushes India to seek urea from China", "Ecofin — India turns to African fertiliser suppliers", "Fertilizer Daily — Kharif stocks 16% above last year", "Kotak Neo — Fertiliser subsidy may cross ₹3 lakh crore in FY27", "GKToday — India raises urea imports from alternative suppliers", "Superkalam — India locks in 1.7 MT urea at sharply lower price", "Argus — India outlines 2026–27 urea subsidy", "IEEFA — India’s fertiliser subsidy needs an overhaul", "Talcher Fertilizers Ltd — project overview", "Odisha Bytes — Talcher applies for coal gasification scheme", "Down To Earth — PAU field experiment on nano urea", "PSU Watch — Nano urea sales lag production"] }
      ]
    },

    {
      id: "india-ai-compute-gap",
      topic: "Technology · India",
      title: "Data-Rich, Compute-Poor: Why India Is Behind in the AI Race",
      dek: "India has the data and the engineers, but the AI race is decided by research spending, compute, capital and pay — and on each of those India is operating at a fraction of the leaders.",
      date: "27-Sep-2026", read: "~8 min read",
      tags: ["Artificial intelligence", "R&D", "Indian IT", "Venture capital"],
      pdf: "documents/blog/india-ai-compute-gap.pdf",
      stats: [["India R&D / GDP", "~0.64%", "vs ~3.5% in the US"], ["IndiaAI Mission", "₹10,372 Cr", "~$1.25 bn, multi-year"], ["AI researcher pay gap", "~6x", "$30,782 vs $178,920 median"]],
      blocks: [
        { t: "p", html: "India generates close to a fifth of the world’s data, has one of the largest pools of engineers on the planet and hosted a global AI summit this year that drew over $200 billion in pledges. Yet when you look at who is building frontier models, who owns the compute and who captures the profits, India is still a spectator more than a player. This piece looks at why — and whether the gap can close." },
        { t: "h2", text: "The scoreboard" },
        { t: "p", html: "The gap is not about ambition; it is about scale. On every hard metric that decides who wins in AI — research spending, compute, capital and pay — India is operating at a fraction of the leaders." },
        { t: "table", title: "India vs the US and China on the metrics that matter", head: ["Metric", "India", "United States", "China"], rows: [
          ["R&D spend (% of GDP)", "~0.64% (Economic Survey 2025–26)", "~3.5%", "~2.4–2.5%"], ["Private sector share of R&D", "~36%", "~75%", "~77%"], ["AI infrastructure spend (% of GDP, 2026)", "Negligible", "~2%", "~0.4%"], ["Flagship public AI programme", "IndiaAI Mission: ₹10,372 crore (~$1.25 bn)", "Private hyperscalers guiding ~$725 bn of 2026 capex", "State-backed plus Big Tech"], ["Median AI researcher pay", "~$30,800", "~$178,900", "—"]
        ]},
        { t: "p", html: "To put the IndiaAI Mission in perspective: its entire multi-year budget is smaller than what a single US hyperscaler spends on data centres in a couple of weeks. The US alone accounts for more than 80% of an estimated $800 billion in global AI infrastructure spending this year." },
        { t: "hbars", title: "R&D spend: India is at ~1/5 of the US", sub: "Gross R&D expenditure, % of GDP", unit: "%", items: [{ label: "India", value: 0.64, hi: true }, { label: "China", value: 2.40 }, { label: "United States", value: 3.50 }, { label: "South Korea", value: 4.90 }], note: "Source: Economic Survey 2025–26, CareEdge Ratings, Lapaas Voice · 2026." },
        { t: "hbars", title: "AI researcher pay: a ~6x gap", sub: "Median annual salary, US$", unit: "$", items: [{ label: "India", value: 30782, hi: true }, { label: "United States", value: 178920 }], note: "Source: Economic Survey 2025–26, CareEdge Ratings, Lapaas Voice · 2026." },
        { t: "h2", text: "Six reasons India is behind" },
        { t: "h3", text: "1. India under-invests in research — and the private sector barely participates" },
        { t: "p", html: "India’s gross R&D spending has been stuck at roughly 0.6–0.7% of GDP for years, and even the most recent upward revision keeps it below 1%. The Economic Survey 2025–26 is candid that the problem is not talent. It is that Indian companies contribute only about a third of national R&D, and research rarely crosses the “valley of death” from lab prototype to commercial product. CareEdge Ratings adds that corporate R&D is concentrated in a few sectors like autos and pharma, and tends to be incremental rather than breakthrough." },
        { t: "p", html: "Frontier AI is the most R&D-intensive industry in history. A country that spends 0.6% of GDP on research cannot expect to build models that compete with labs spending tens of billions a year." },
        { t: "h3", text: "2. Compute: the new oil, and India is importing it" },
        { t: "p", html: "India is data-rich but compute-poor. The IndiaAI Mission’s public GPU pool has grown from about 34,000 to a targeted 54,000, with a goal of 100,000 GPUs by December 2026. That sounds large until you remember that a single frontier training run at a US lab can use more chips than India’s entire public pool." },
        { t: "p", html: "There is also an execution gap. Reporting in April 2026 suggested only around ₹400 crore of the ₹10,372 crore mission had actually been released, and less than half of the FY26 allocation was spent. Announcements are running well ahead of deployment." },
        { t: "h3", text: "3. Capital is patient in the US and impatient in India" },
        { t: "p", html: "Global venture capital hit about $510 billion in the first half of 2026 alone, with OpenAI and Anthropic absorbing 43% of it. Indian venture money, by contrast, remains weighted toward SaaS, fintech and consumer apps — businesses with predictable, near-term returns. Foundation-model companies burn enormous sums for years before revenue arrives, and India has few investors willing to underwrite that. In a Blind survey of 1,723 Indian tech professionals, 12% named the lack of long-term risk capital as the main barrier." },
        { t: "h3", text: "4. The talent is Indian, but the jobs are abroad" },
        { t: "p", html: "India ranks at or near the top globally in AI skill penetration, and Indian-origin researchers are everywhere in Silicon Valley. The problem is where they work. A median AI researcher in the US earns about $178,900 a year versus roughly $30,800 in India — nearly a six-fold gap, before counting access to world-class compute and frontier problems. The new Prime Minister Research Chair scheme to attract researchers back is a start, but money and GPUs, not grants alone, move people." },
        { t: "h3", text: "5. Every Indian model runs on American chips" },
        { t: "p", html: "Sarvam’s models, BharatGen’s Param2 and the national GPU pool all depend on NVIDIA hardware. India’s semiconductor push is real, but it is years from producing AI-grade chips. That leaves India’s “sovereign AI” exposed to US export policy, and there is still no binding long-term guarantee of access to top-end chips that would survive a change of administration in Washington." },
        { t: "h3", text: "6. A services mindset in a products race" },
        { t: "p", html: "India’s tech success story was built on IT services: selling skilled hours to global clients. That model created wealth and jobs, but it trained the ecosystem to implement others’ technology rather than own the intellectual property. Tellingly, 62% of respondents in the Blind survey cited the absence of homegrown R&D and IP as India’s primary barrier, and only 5% saw India as a global AI leader. Worse, generative AI now threatens the services model itself by automating the very tasks India’s IT and BPO firms sell." },
        { t: "h2", text: "The counter-argument: India is not out of the race" },
        { t: "p", html: "It would be lazy to call India a lost cause. There are real strengths:" },
        { t: "list", items: [
          "<b>Indigenous models are shipping.</b> At the India AI Impact Summit in February 2026, Sarvam AI launched 30-billion and 105-billion parameter models trained on IndiaAI Mission compute and built for Indian languages. The government-backed BharatGen Param2, a 17-billion parameter model covering 22 languages, launched alongside.",
          "<b>Investment pledges are huge.</b> The summit drew more than $200 billion in commitments across data centres, models and applications, from Reliance, Adani and global hyperscalers.",
          "<b>Digital public infrastructure is a unique asset.</b> Aadhaar, UPI and ONDC give India a population-scale platform to deploy AI in payments, identity and public services that few countries can match.",
          "<b>Adoption, not invention, may be the prize.</b> IT Minister Ashwini Vaishnaw has pushed back on the “lagging” narrative, calling this the first chapter of the AI revolution. There is a credible argument that India’s biggest economic gains will come from applying AI across 1.4 billion people, not from winning the frontier-model race."
        ]},
        { t: "quote", html: "The honest conclusion: India is behind in <em>building</em> AI, but it may not be behind in <em>using</em> it." },
        { t: "h2", text: "Why this matters for investors" },
        { t: "p", html: "The AI gap is not just a technology story; it is showing up in the stock market. A Reuters poll of 24 analysts in May flagged India’s limited participation in the global AI-led rally as one of the reasons the Nifty and Sensex could post their first annual loss since 2015. When global money is chasing AI winners in the US, Taiwan and Korea, a market dominated by banks, consumer names and IT services looks less exciting — and India’s IT exporters face the added risk that AI compresses their billable-hours model." },
        { t: "h2", text: "My view: what would actually close the gap" },
        { t: "list", items: [
          "<b>Deploy what has been announced.</b> Speeding up disbursement of the IndiaAI Mission budget matters more than announcing new headline numbers.",
          "<b>Pay for talent, not just grants.</b> Competitive salaries plus guaranteed compute access are what bring researchers home.",
          "<b>Force private R&D up.</b> Stronger tax incentives and procurement preferences for Indian IP could push corporate R&D toward the ~2% of GDP that CareEdge suggests by 2035.",
          "<b>Build patient capital.</b> A sovereign deep-tech fund or venture-debt programme, similar to Israel’s and Singapore’s models, would fund the long-gestation bets private VCs avoid.",
          "<b>Solve power and chips together.</b> Data centres need reliable, cheap electricity, and India needs long-term chip supply agreements while its fabs mature.",
          "<b>Play to strengths.</b> Indic-language models, DPI-integrated AI and applied AI for agriculture, health and finance are races India can realistically win."
        ]},
        { t: "h2", text: "Bottom line" },
        { t: "p", html: "India is not behind because it lacks brains or data. It is behind because the AI race is a capital-intensive, research-heavy, hardware-dependent contest — and on all three counts India started late and is spending small. The next two to three years of execution will decide whether India becomes an AI producer or remains the world’s largest AI consumer." },
        { t: "disclaimer", html: "This article reflects the author’s personal analysis for educational purposes and is not investment advice. Data as of 27 September 2026." },
        { t: "sources", items: ["Forbes India — India’s R&D expenditure just 0.6% of GDP: Economic Survey", "Business Today — CareEdge: India’s R&D spend should rise to 2% of GDP", "Kapyn — The IndiaAI Mission, explained", "IFB Trend — IndiaAI Mission: 100,000 GPUs by 2026", "explainx.ai — India sovereign AI status 2026", "American Bazaar — Most Indian tech professionals say India is lagging in AI", "Lapaas Voice — India wants AI talent back, but what’s the incentive?", "Memeburn — AI global funding statistics 2026", "Wikipedia — India AI Impact Summit 2026", "Whalesbook — India’s AI dilemma: huge talent, missing capital", "Business Today — Sensex, Nifty may deliver negative returns in 2026 (Reuters poll)"] }
      ]
    },

    {
      id: "india-equities-next-decade",
      topic: "Indian equities · Markets",
      title: "India’s Next Decade in Equities: Why This Slump Could Be the Setup",
      dek: "A bad year does not change the forces behind Indian stocks. Separating the cyclical noise from the structural story — and putting numbers on where the Nifty could be in 2036.",
      date: "27-Sep-2026", read: "~8 min read",
      tags: ["Nifty 50", "FPI flows", "Valuation", "Scenario analysis"],
      pdf: "documents/blog/india-equities-next-decade.pdf",
      series: "NIFTY",
      stats: [["Nifty 50 (26-Sep-2026)", "23,140", "Seventh straight weekly fall"], ["FPI selling, 2026 YTD", "~₹2.96 lakh Cr", "Via exchanges"], ["Monthly SIP inflows", "₹32,297 Cr", "Record, Aug 2026"]],
      blocks: [
        { t: "p", html: "Indian equities are having one of their worst years in a decade: the Sensex and Nifty just logged seven straight weekly declines and foreign investors have pulled nearly ₹3 lakh crore out through the exchanges in 2026. Yet the long-term case for Indian stocks rests on forces that a bad year does not change. This piece separates the cyclical noise from the structural story — and puts numbers on what the next ten years could look like." },
        { t: "h2", text: "Where we stand today" },
        { t: "p", html: "The market is paying for a global shock it did not create: an oil spike from the US–Iran conflict, a US 10-year yield above 5% and a record-weak rupee have combined to push foreign money out." },
        { t: "table", title: "Market dashboard", head: ["Indicator", "Latest reading", "What it tells us"], rows: [
          ["Nifty 50 / Sensex (26 Sep 2026)", "23,140 / 73,896", "Seventh straight weekly fall; indices down ~8–10% YTD"], ["FPI net selling via exchanges (2026 YTD)", "~₹2.96 lakh crore", "Partly offset by ~₹54,400 crore FPI buying in IPOs"], ["Foreign ownership of large caps", "17.6% (mid-2026) vs ~24% peak in Dec 2020", "Lowest in over a decade — foreigners are underweight"], ["Monthly SIP inflows (Aug 2026)", "₹32,297 crore (record)", "10 crore+ active SIP accounts"], ["Equity MF inflow streak", "66 consecutive months", "Domestic investors keep buying the dip"], ["Nifty trailing P/E", "~20.9x vs 10-yr average ~23.4x", "Large caps ~11% below historical norm"], ["Nifty Midcap 150 trailing P/E", "~33–34x vs 7-yr median ~31x", "Mid caps still priced above average"], ["USD/INR", "Record low near 97 in May; ~94.5–96 range since", "Imported inflation and FPI pressure"], ["RBI repo rate", "5.25%", "On hold, with the risk tilted toward a hike"]
        ]},
        { t: "p", html: "Two things stand out. First, the tug-of-war between foreign sellers and domestic buyers: domestic institutions have now been net buyers for 37 months straight. Second, the valuation split: large caps have de-rated to below their long-term average, while mid and small caps — where retail SIP money is flowing — have not." },
        { t: "h2", text: "Five structural tailwinds for 2026–2036" },
        { t: "h3", text: "1. The financialisation of Indian savings" },
        { t: "p", html: "This is the single most powerful force in the market. Indian households have historically parked wealth in gold, property and bank deposits. That is changing fast: monthly SIP flows have grown from about ₹5,200 crore in 2017 to a record ₹32,297 crore in August 2026, and mutual fund AUM now stands at ₹87 lakh crore. Even through this year’s sell-off, equity funds have seen inflows for 66 months running. Domestic money is becoming a permanent floor under the market — something India simply did not have in 2008 or 2013." },
        { t: "h3", text: "2. Demographics and a growing middle class" },
        { t: "p", html: "India has the world’s largest working-age population, and it will keep growing for another two decades. More earners mean more consumption, more credit, more tax revenue and more savings to channel into markets." },
        { t: "h3", text: "3. A long track record of compounding" },
        { t: "p", html: "The Sensex went from about 27,200 in July 2016 to around 77,600 in July 2026 — roughly 11% a year despite a pandemic, two wars and multiple rate cycles. India’s GDP has compounded at around 7% for a decade, and corporate profits tend to follow nominal GDP over long periods." },
        { t: "h3", text: "4. Foreigners are underweight — which means they can come back" },
        { t: "p", html: "Foreign ownership of Indian large caps is at a decade low of 17.6%. India’s weight in global indices is still small relative to the size of its economy. When the global cycle turns — lower US yields, lower oil — the re-rating potential from FPIs simply returning to neutral is large. There are early signs already: J.P. Morgan notes FPIs were net buyers of about $2.5 billion in July and $3 billion in August before September’s renewed selling." },
        { t: "h3", text: "5. Manufacturing, infrastructure and capex" },
        { t: "p", html: "Government capex, production-linked incentives and supply-chain diversification away from China are slowly lifting India’s manufacturing base. A deeper industrial economy means a broader, higher-quality set of listed companies beyond banks, IT and consumer names." },
        { t: "h2", text: "What could go wrong" },
        { t: "list", items: [
          "<b>Oil dependence.</b> India imports most of its crude. Every Gulf flare-up hits the rupee, inflation and corporate margins at once, as 2026 has shown painfully.",
          "<b>Higher-for-longer global rates.</b> With the US 10-year above 5%, the hurdle for owning emerging-market equities has risen. Sustained high US yields could keep FPI flows muted for years, not months.",
          "<b>AI disruption of IT services.</b> Indian IT is a heavyweight in the indices. If generative AI compresses the billable-hours model, a large chunk of index earnings is at risk.",
          "<b>Mid- and small-cap froth.</b> Retail SIP money is concentrated in mid and small caps, which still trade above their historical valuations. A sharp correction there could test the patience of first-time investors.",
          "<b>Earnings disappointment.</b> Long-term returns need earnings to compound at low double digits. Kotak Institutional Equities has flagged India’s weaker relative earnings growth versus other EMs as a reason FPIs are staying away.",
          "<b>Currency drift.</b> For a dollar-based investor, a rupee that loses 3–4% a year eats a large slice of equity returns."
        ]},
        { t: "h2", text: "Where could the Nifty be in 2036? Three scenarios" },
        { t: "p", html: "Over long periods, index returns come from two things: earnings growth and the change in the valuation multiple. Starting from 23,140 and a P/E near 20x, the arithmetic is simple." },
        { t: "formula", text: "Nifty₂₀₃₆ = Nifty₂₀₂₆ × (1 + g)¹⁰ × (P/E₂₀₃₆ ÷ P/E₂₀₂₆)" },
        { t: "bars3d", title: "Nifty 50 in 2036: three scenarios", sub: "Index level · illustrative arithmetic, not a forecast", labels: ["Today", "Bear 2036", "Base 2036", "Bull 2036"], values: [23140, 44960, 60020, 71870], actual: 1, fmt: "int", note: "Source: author’s calculation · base = Nifty 23,140 on 26 Sep 2026." },
        { t: "list", items: [
          "<b>Bear case (~45,000):</b> earnings compound at 8% a year and the market de-rates to 18x. That is still roughly 7% a year before dividends — a decade of high oil, high US rates and slower growth.",
          "<b>Base case (~60,000):</b> 10% earnings growth, roughly in line with nominal GDP, and a stable 20x multiple. About 10% a year, close to the last decade’s record.",
          "<b>Bull case (~72,000):</b> 12% earnings growth as manufacturing, credit and consumption fire together, with no change in valuation. About 12% a year."
        ]},
        { t: "p", html: "The striking point: even the bear case roughly doubles the index. Unless something breaks India’s earnings engine, a 10-year investor starting from today’s de-rated large-cap valuations is starting from a better position than one who bought at the 2024 peak." },
        { t: "h2", text: "My view" },
        { t: "p", html: "The 2026 sell-off is a cyclical event driven by oil, the rupee and US rates, layered on a structural story that remains intact. My takeaways for the decade ahead:" },
        { t: "list", items: [
          "<b>Large caps look better value than mid and small caps today.</b> The valuation gap is historically wide, and large caps are where returning FPI money lands first.",
          "<b>Domestic flows are the new anchor.</b> ₹32,000+ crore a month of SIP money gives the market a resilience it has never had before.",
          "<b>Sector leadership will shift.</b> Financials, manufacturing, capital goods, power and consumption look better placed for the decade than IT services, which must reinvent itself for the AI era.",
          "<b>Returns will be lumpier.</b> Higher global rates and geopolitics mean more 2026-style drawdowns. Staying invested through them is where most long-term wealth is made."
        ]},
        { t: "h2", text: "Bottom line" },
        { t: "p", html: "The next decade is unlikely to be a straight line — but for patient investors, today’s pessimism may turn out to be the entry point." },
        { t: "disclaimer", html: "This article is the author’s personal analysis for educational purposes and is not investment advice. Scenario figures are illustrative calculations, not forecasts. Data as of 26 September 2026." },
        { t: "sources", items: ["Social News XYZ / IANS — FPI outflows to continue amid high US bond yields (26 Sep 2026)", "J.P. Morgan — What is the outlook for India’s stock market?", "AMFI on X — August 2026 mutual fund data", "Upstox — AMFI August 2026: equity inflows hit four-month high", "CrispIdea — Indian equities outlook 2026", "Business Today — Sensex, Nifty down 8–10% in 2026", "Business Today — Sensex, Nifty may deliver negative returns in 2026 (Reuters poll)", "VT Markets — Rupee steadies after record low", "Holistic Investment — The future of Sensex (10-year return history)"] }
      ]
    },

    {
      id: "us-treasury-yields-5-percent",
      topic: "Fixed income · Macro",
      title: "Five Percent and Rising: Decoding the 19-Year High in US Treasury Yields",
      dek: "The Fed has cut net 25 bps in a year, yet the 10-year is up about a full point. What is driving long yields — and what it means for mortgages, equities and FPI flows into India.",
      date: "27-Sep-2026", read: "~7 min read",
      tags: ["US Treasuries", "Federal Reserve", "Term premium", "FPI flows"],
      pdf: "documents/blog/us-treasury-yields-5-percent.pdf",
      stats: [["10-year UST (25-Sep-2026)", "5.23%", "Intraday high — highest since 2007"], ["Fed funds target", "3.75–4.00%", "+25 bps on 16 Sep"], ["1-yr inflation expectations", "4.6%", "Up from 4.0% in August"]],
      blocks: [
        { t: "h2", text: "The number everyone is watching" },
        { t: "p", html: "On Friday, 25 September 2026, the 10-year US Treasury yield touched 5.23% intraday — its highest level since 2007 — before settling near 5.17%. Earlier this month it was trading just under 4.8%. A year ago it sat around 4.1%. The 30-year bond has gone further, breaking to levels last seen in 2004 at roughly 5.3%." },
        { t: "p", html: "For context, in February the Congressional Budget Office projected the 10-year would average about 4.1% in 2026. The market has blown through that assumption by more than a full percentage point in seven months." },
        { t: "p", html: "The 10-year yield is not just another data point. It is the discount rate the world uses to price everything from a US mortgage to an Indian large-cap stock. When it moves 40–50 basis points in a month, every valuation model on every trading desk needs to be rerun." },
        { t: "table", title: "Snapshot: US rates, late Sep 2026", head: ["Measure", "Level", "Context"], rows: [
          ["Fed funds target range", "3.75% – 4.00%", "Raised 25 bps on 16 Sep; first hike since July 2023"], ["10-year Treasury yield", "~5.17% (5.23% intraday high)", "Highest since 2007"], ["30-year Treasury yield", "~5.3%", "Highest since 2004"], ["1-yr inflation expectations (UMich)", "4.6%", "Up from 4.0% in August"], ["Odds of another hike on 28 Oct", "~64–70%", "CME FedWatch / swaps pricing"]
        ]},
        { t: "grouped", title: "Policy rate lower, long yields ~1pt up", sub: "Yield / rate, % · 19 Sep 2025 vs 25 Sep 2026", legend: ["Sep 2025", "Sep 2026"], groups: [{ label: "Fed funds (upper)", a: 4.25, b: 4.00 }, { label: "10-year UST", a: 4.14, b: 5.17 }, { label: "30-year UST", a: 4.75, b: 5.29 }], note: "Source: Federal Reserve, Trading Economics, MacroRadar, Advisor Perspectives." },
        { t: "p", html: "The chart captures the puzzle of 2026: the Fed’s policy rate is actually a touch lower than a year ago, yet long-term borrowing costs are sharply higher. The short end is driven by the Fed; the long end is being driven by inflation fears, bond supply and risk." },
        { t: "h2", text: "Why yields are climbing: five forces at work" },
        { t: "h3", text: "1. The Fed has turned from cutter to hiker" },
        { t: "p", html: "On 16 September the FOMC voted 12–0 to raise the policy rate by 25 bps to 3.75–4.00%, reversing part of the easing cycle that ran through late 2024 and 2025. More striking than the hike was the guidance: 16 of the 18 dot-plot submissions pointed to another increase, and four saw two more. The FOMC statement described economic activity as expanding at a solid pace with resilient spending, strong productivity and robust capital investment — this is a central bank tightening into strength, not weakness." },
        { t: "p", html: "The market has taken the hint. Swaps are now pricing roughly three further quarter-point hikes over the next year." },
        { t: "h3", text: "2. The oil shock and the US–Iran conflict" },
        { t: "p", html: "The conflict with Iran and disruption around the Strait of Hormuz has kept crude prices elevated, and energy feeds directly into headline inflation and expectations. The 10-year is now more than a full percentage point higher than just before the war began. Tellingly, Friday’s small pullback in yields came only because oil dipped on reports that negotiators might be exploring a phased reopening of the strait. The bond market is effectively trading headlines out of the Gulf." },
        { t: "h3", text: "3. Inflation expectations are drifting up" },
        { t: "p", html: "The University of Michigan’s September survey showed year-ahead inflation expectations jumping to 4.6% from 4.0% in August. For a Fed still scarred by the “transitory” misjudgment of 2021, this is exactly the kind of data that justifies tightening. When households and businesses start expecting higher prices, they behave in ways that make those expectations self-fulfilling." },
        { t: "h3", text: "4. Supply, supply, supply — including from AI" },
        { t: "p", html: "This is the part of the story that gets less airtime. Yields are set by supply and demand for bonds, and supply is surging from two directions:" },
        { t: "list", items: [
          "<b>Government borrowing.</b> Large deficits and a rising debt stock mean Treasury has to sell more paper every quarter. Treasury Secretary Bessent’s attempt to cap long-end yields through larger buybacks has, by most accounts, done little.",
          "<b>Corporate AI borrowing.</b> Vanguard estimates that Alphabet, Amazon, Meta, Microsoft and Oracle issued around $132 billion of debt through July — against a 2020–24 average of about $35 billion a year. Broader AI-linked issuance across data centres, semiconductors and utilities could reach $300–570 billion this year. Every dollar of high-grade corporate debt competes with Treasuries for the same investor pool."
        ]},
        { t: "p", html: "When supply rises faster than demand, prices fall and yields rise. It is that simple." },
        { t: "h3", text: "5. The term premium is back" },
        { t: "p", html: "For most of the 2010s, investors accepted almost no extra compensation for locking money up for 10 or 30 years. That era is over. Fiscal uncertainty, geopolitical risk and inflation volatility mean investors now demand a meaningful term premium — which is why the long end (10- and 30-year) is rising even faster than short-dated yields." },
        { t: "h2", text: "What higher yields mean in practice" },
        { t: "list", items: [
          "<b>For US households:</b> The 30-year mortgage rate tracks the 10-year Treasury closely, so housing affordability is deteriorating again just as it had started to improve.",
          "<b>For equities:</b> A higher risk-free rate raises the discount rate applied to future earnings. Long-duration growth stocks — including much of the AI trade — are the most sensitive. At 5%+ on a risk-free government bond, the equity risk premium on a market trading at over 21x forward earnings looks thin.",
          "<b>For the US fiscal position:</b> Higher yields feed straight into interest costs, which is why congressional concern about the debt trajectory is growing louder. This creates a feedback loop: more debt → higher yields → higher interest bills → more debt.",
          "<b>For emerging markets like India:</b> US investors hold about 44% of FPI equity assets in India (roughly ₹31 lakh crore, per ICICI Securities). When a US investor can earn over 5% risk-free at home, the hurdle rate for owning Indian equities goes up — and the India–US 10-year spread has narrowed to around 2.2 percentage points. It is no coincidence that FPIs have sold close to ₹3 lakh crore of Indian stocks through exchanges this year."
        ]},
        { t: "h2", text: "My take: three scenarios for the next six months" },
        { t: "table", head: ["Scenario", "What happens", "10-year yield range"], rows: [
          ["Base case", "Fed hikes once more (Oct or Dec), oil stays elevated but stable, fiscal worries persist", "4.9% – 5.4%"], ["Bull case for bonds", "Hormuz deal brings oil down sharply, inflation expectations cool, Fed pauses after one more hike", "4.5% – 4.9%"], ["Bear case for bonds", "Conflict escalates, oil spikes, inflation expectations de-anchor, Fed forced into multiple hikes", "5.5%+"]
        ]},
        { t: "p", html: "My view is that the base case is most likely, but the risks are skewed to the upside for yields. The supply story — government deficits plus the AI capex boom — is structural, not cyclical. Even if oil calms down, the market will keep demanding a higher term premium to absorb all that paper." },
        { t: "p", html: "The biggest lesson from this episode? The 2010s playbook of near-zero rates and a Fed that cuts at the first sign of stress is not coming back soon. Investors who built portfolios for that world need to rethink duration risk, equity valuations and emerging-market allocations." },
        { t: "h2", text: "Key takeaways" },
        { t: "list", items: ["The 10-year Treasury yield hit a 19-year high of 5.23% as the Fed began a new hiking cycle.", "Drivers: a hawkish Fed, the oil shock from the Iran conflict, rising inflation expectations, heavy government and AI-related bond supply, and a returning term premium.", "Consequences reach well beyond the US — from mortgage rates to FPI flows into India.", "Watch: the 28 October FOMC meeting, oil prices and Hormuz headlines, and monthly Treasury auction demand."] },
        { t: "disclaimer", html: "This article is for educational purposes only and does not constitute investment advice. Data is as of 26 September 2026." },
        { t: "sources", items: ["CNBC — The 10-year Treasury yield is at its highest in nearly two decades (26 Sep 2026)", "Federal Reserve — FOMC statement, 16 Sep 2026", "CNBC — Fed rate decision September 2026", "Trading Economics — US 10-Year Treasury Yield", "Fortune — US debt outlook as Treasury yields surge (26 Sep 2026)", "Advisor Perspectives — Fed’s interest rate decision, 16 Sep 2026", "MacroRadar — 30-Year Treasury Yield", "Business Today — Sensex, Nifty down 8–10% in 2026; rising US yields a concern"] }
      ]
    }
  ],

  projects: [
    { tag: "Entrepreneurship", title: "Fashion Phobia", body: "Founded a rental fashion brand: rent branded apparel, footwear and accessories." },
    { tag: "Operations", title: "Strategic Engagement Program", body: "Built a process playbook for new-joiner readiness." },
    { tag: "Research", title: "Gen Z financial behaviour", body: "Empirical-to-conceptual research on financial behaviour and investment patterns among Generation Z.", href: "research.html?id=genz" }
  ],

  skills: [
    { code: "FUND OPS", title: "Fund operations", items: [["Fund accounting"], ["NAV computation", "#experience"], ["Financial statements", "#experience"], ["Audit & tax support"], ["Reconciliations", "#experience"], ["Exception investigation"], ["Expense accruals"], ["Portfolio analysis"], ["Securities valuation"], ["Corporate actions"], ["Month-end close"]] },
    { code: "ANALYSIS", title: "Analysis & valuation", items: [["Financial statement analysis", "research.html?id=seil"], ["3-statement modelling", "research.html?id=airtel"], ["DCF (FCFF)", "research.html?id=waaree"], ["Relative valuation", "research.html?id=sunpharma"], ["Scenario & sensitivity analysis", "research.html?id=airtel"], ["Equity valuation", "research.html?id=sunpharma"], ["Bond valuation"], ["Commodity valuation", "post.html?id=india-urea-paradox"]] },
    { code: "STANDARDS", title: "Standards", items: [["US GAAP (incl. ASC 820)", "#experience"], ["IFRS"], ["Ind AS", "research.html?id=seil"]] },
    { code: "TOOLS", title: "Tools", items: [["FundSuite Arc"], ["Bloomberg"], ["Alteryx"], ["Excel (VLOOKUP, VBA, Power Query)", "research.html?id=waaree"], ["SAP FICO"], ["PowerPoint"], ["Outlook"], ["Copilot"]] }
  ],

  education: [
    { title: "CFA Program", org: "CFA Institute", detail: "Level I cleared · Level II candidate", badge: "L2" },
    { title: "B.Com (Honours), Finance, Audit & Taxation", org: "JAIN University, Bengaluru · 2026", detail: "CGPA 8.5", badge: "8.5" },
    { title: "Schooling", org: "SAI International Residential School", detail: "91%", badge: "91%" }
  ],
  certs: [
    ["Accounting Professionals Program", "KPMG"],
    ["Financial Modelling and Forecasting Financial Statements", "LinkedIn Learning"],
    ["Stock Market using AI", "Springboard by Springpad"],
    ["AI Tools for Profession & Productivity", "Be10x"]
  ]
};
