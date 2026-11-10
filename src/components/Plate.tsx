/**
 * Plates: line drawings of how each selected project works.
 * Every label and number comes from that project's case study.
 */
import type { ReactNode } from "react";

function rng(seed: number) {
  let a = seed;
  return () => {
    a = (a + 0x6d2b79f5) | 0;
    let t = Math.imul(a ^ (a >>> 15), 1 | a);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

function Frame({ label, children }: { label: string; children: ReactNode }) {
  return (
    <svg className="plate" viewBox="0 0 480 300" role="img" aria-label={label}>
      {children}
    </svg>
  );
}

function FraudGraph() {
  const r = rng(11);
  const centres = [
    [110, 100],
    [250, 190],
    [370, 95],
    [150, 225],
    [390, 215],
  ];
  const nodes = Array.from({ length: 78 }, (_, i) => {
    const [cx, cy] = centres[i % centres.length];
    const a = r() * Math.PI * 2;
    const d = 12 + r() * 62;
    return { x: cx + Math.cos(a) * d, y: cy + Math.sin(a) * d * 0.72, fraud: false };
  });
  [6, 11, 21, 36, 51, 66].forEach((i) => (nodes[i].fraud = true));
  const edges: [number, number][] = [];
  nodes.forEach((n, i) => {
    nodes
      .map((m, j) => ({ j, d: (m.x - n.x) ** 2 + (m.y - n.y) ** 2 }))
      .filter((m) => m.j !== i)
      .sort((p, q) => p.d - q.d)
      .slice(0, 2)
      .forEach((m) => edges.push([i, m.j]));
  });
  return (
    <Frame label="Card transactions drawn as a graph. Fraudulent transactions are highlighted with their neighbours.">
      {edges.map(([a, b], i) => {
        const hot = nodes[a].fraud || nodes[b].fraud;
        return (
          <line
            key={i}
            pathLength={1}
            x1={nodes[a].x}
            y1={nodes[a].y}
            x2={nodes[b].x}
            y2={nodes[b].y}
            strokeWidth={hot ? 1.6 : 0.6}
            opacity={hot ? 1 : 0.55}
          />
        );
      })}
      {nodes.map((n, i) =>
        n.fraud ? (
          <circle key={i} className="mark" cx={n.x} cy={n.y} r={6.5} strokeWidth={1.6} />
        ) : (
          <circle key={i} className="dot" cx={n.x} cy={n.y} r={2.1} />
        ),
      )}
      <text x="16" y="288">492 fraud cases in 284,807 transactions</text>
    </Frame>
  );
}

function Tycoon() {
  const layers = [
    ["L1", "Headers and domain", 0.3],
    ["L2", "URLs and redirects", 0.3],
    ["L3", "Message body", 0.2],
    ["L4", "Threat intelligence", 0.2],
  ] as const;
  return (
    <Frame label="Four detection layers, weighted 0.30, 0.30, 0.20 and 0.20, combine into one verdict: deliver, warn or block.">
      {layers.map(([id, name, w], i) => {
        const y = 44 + i * 60;
        const width = w * 330;
        return (
          <g key={id}>
            <text x="16" y={y - 8}>
              {id} {name}
            </text>
            <rect className="mark" x="16" y={y} width={width} height="20" />
            <text className="num" x={24 + width} y={y + 15}>
              {w.toFixed(2)}
            </text>
            <path
              pathLength={1}
              d={`M ${58 + width} ${y + 10} C 260 ${y + 10}, 290 150, 352 150`}
            />
          </g>
        );
      })}
      <circle className="dot" cx="352" cy="150" r="4" />
      <line pathLength={1} x1="352" y1="150" x2="376" y2="150" />
      <rect x="376" y="104" width="90" height="92" />
      <text x="388" y="128">deliver</text>
      <text x="388" y="155">warn</text>
      <text x="388" y="182">block</text>
    </Frame>
  );
}

function ZeroProof() {
  const arrow = (y: number, toServer: boolean, text: string) => {
    const [a, b] = toServer ? [150, 400] : [400, 150];
    const tip = toServer ? -8 : 8;
    return (
      <g>
        <line pathLength={1} x1={a} y1={y} x2={b} y2={y} />
        <path d={`M ${b + tip} ${y - 5} L ${b} ${y} L ${b + tip} ${y + 5}`} />
        <text x="275" y={y - 8} textAnchor="middle">
          {text}
        </text>
      </g>
    );
  };
  return (
    <Frame label="The browser sends a public commitment and a Schnorr proof. The server sends a nonce. The secret never leaves the browser.">
      <text x="150" y="26" textAnchor="middle">
        Browser
      </text>
      <text x="400" y="26" textAnchor="middle">
        Server
      </text>
      <line pathLength={1} x1="150" y1="38" x2="150" y2="262" strokeDasharray="none" />
      <line pathLength={1} x1="400" y1="38" x2="400" y2="262" />
      <rect className="mark" x="20" y="118" width="96" height="58" />
      <text x="68" y="143" textAnchor="middle">
        secret
      </text>
      <text x="68" y="161" textAnchor="middle">
        stays here
      </text>
      {arrow(86, true, "public commitment")}
      {arrow(152, false, "128-bit nonce, expires in 60 s")}
      {arrow(218, true, "Schnorr proof")}
      <text x="400" y="284" textAnchor="middle">
        verifies, learns nothing
      </text>
    </Frame>
  );
}

function Eventra() {
  const engines = [
    [20, 24, "Intelligence", "Gemini"],
    [320, 24, "Recommendation", "pgvector"],
    [20, 216, "Communication", "email, SMS, chat"],
    [320, 216, "Lifecycle", "ticketing, payments"],
  ] as const;
  return (
    <Frame label="Four engines behind one router: Intelligence, Recommendation, Communication and Lifecycle.">
      {engines.map(([x, y, name, sub]) => (
        <g key={name}>
          <line pathLength={1} x1={x + 70} y1={y + 30} x2="240" y2="150" />
          <rect className="paper" x={x} y={y} width="140" height="60" />
          <text x={x + 12} y={y + 26}>
            {name}
          </text>
          <text className="quiet" x={x + 12} y={y + 44}>
            {sub}
          </text>
        </g>
      ))}
      <circle className="mark" cx="240" cy="150" r="46" />
      <text x="240" y="147" textAnchor="middle">
        Engine
      </text>
      <text x="240" y="162" textAnchor="middle">
        router
      </text>
    </Frame>
  );
}

function Tomato() {
  const ins = Array.from({ length: 8 }, (_, i) => 48 + i * 29);
  const outs = [
    [84, "Pure Fresh"],
    [150, "Good"],
    [216, "Stale to Spoiled"],
  ] as const;
  return (
    <Frame label="Six gas sensors, temperature and humidity become 26 features. A Random Forest sorts each sample into Pure Fresh, Good, or Stale to Spoiled.">
      {ins.map((y, i) => (
        <g key={y}>
          <circle className="dot" cx="22" cy={y} r="3" />
          <path pathLength={1} d={`M 26 ${y} C 90 ${y}, 100 150, 150 150`} />
          {i === 0 && <text x="14" y="28">6 gas sensors, temperature, humidity</text>}
        </g>
      ))}
      <rect className="mark" x="150" y="122" width="84" height="56" />
      <text x="192" y="147" textAnchor="middle">
        26
      </text>
      <text x="192" y="163" textAnchor="middle">
        features
      </text>
      <line pathLength={1} x1="234" y1="150" x2="258" y2="150" />
      <rect x="258" y="122" width="84" height="56" />
      <text x="300" y="147" textAnchor="middle">
        Random
      </text>
      <text x="300" y="163" textAnchor="middle">
        Forest
      </text>
      {outs.map(([y, name]) => (
        <g key={name}>
          <path pathLength={1} d={`M 342 150 C 362 150, 358 ${y}, 378 ${y}`} />
          <text x="384" y={y + 4}>
            {name}
          </text>
        </g>
      ))}
      <text x="14" y="288">Each prediction explained with LIME and SHAP</text>
    </Frame>
  );
}

function Seismic() {
  const r = rng(4);
  const signal = (x: number) =>
    34 * Math.exp(-(((x - 250) / 62) ** 2)) * Math.sin(x / 5.2) +
    12 * Math.exp(-(((x - 372) / 30) ** 2)) * Math.sin(x / 3.4);
  const xs = Array.from({ length: 226 }, (_, i) => 16 + i * 2);
  const raw = xs.map((x) => `${x},${(92 + signal(x) + (r() - 0.5) * 44).toFixed(1)}`).join(" ");
  const clean = xs.map((x) => `${x},${(214 + signal(x)).toFixed(1)}`).join(" ");
  return (
    <Frame label="A raw seismic trace above the same trace after filtering.">
      <text x="16" y="24">Raw</text>
      <polyline pathLength={1} points={raw} strokeWidth="0.8" opacity="0.7" />
      <rect className="mark flat" x="16" y="160" width="450" height="108" />
      <text x="24" y="180">Filtered</text>
      <polyline pathLength={1} points={clean} strokeWidth="1.7" />
    </Frame>
  );
}

const plates: Record<string, () => ReactNode> = {
  "gnn-credit-card-fraud-detection": FraudGraph,
  "tycoon-2fa-detection": Tycoon,
  zeroproof: ZeroProof,
  eventra: Eventra,
  "tomato-freshness-xai": Tomato,
  "nasa-seismic-noise-filtering-system": Seismic,
};

export const hasPlate = (slug: string) => slug in plates;

export function Plate({ slug }: { slug: string }) {
  const P = plates[slug];
  return P ? <P /> : null;
}
