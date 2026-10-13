const MOTION = { enter: Easing.easeOutCubic, glide: Easing.easeInOutQuart, pop: Easing.easeOutBack };
const cl = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const tw = (T, s, e, a, b, ease = MOTION.enter) => a + (b - a) * ease(cl((T - s) / (e - s)));
const kf = (T, F, ease = MOTION.glide) => {
  if (T <= F[0][0]) return F[0][1];
  for (let i = 1; i < F.length; i++) if (T <= F[i][0]) {
    const [t0, v0] = F[i - 1], [t1, v1] = F[i];
    return v0 + (v1 - v0) * ease(cl((T - t0) / (t1 - t0)));
  }
  return F[F.length - 1][1];
};

const VW = 1440, VH = 810, CHROME = 44, TOTAL = 36.5;
const INK = '#141414', GOLD = '#A8843A', GOLDD = '#7E6328', CREAM = '#F8F5EF', SAND = '#E6D3A3', DARK = '#1C1711';
const FONT = "'Hanken Grotesk', system-ui, sans-serif";
const IMG = n => 'assets/showcase/' + n.replace(/[^a-z0-9]+/gi, '-').toLowerCase() + '.jpg';
const fmt = n => String(n).replace(/\B(?=(\d{3})+(?!\d))/g, '.');

const Img = ({ src, style }) => (
  <img src={src} alt="" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', display: 'block', ...style }} />
);
const Eyebrow = ({ children, color = GOLDD, line = GOLD, w = 28, style }) => (
  <div style={{ display: 'flex', alignItems: 'center', gap: 14, fontSize: 13, letterSpacing: '.22em', textTransform: 'uppercase', color, fontWeight: 500, ...style }}>
    <span style={{ width: w, height: 1, background: line }}></span>{children}
  </div>
);
const Chip = ({ children }) => (
  <span style={{ padding: '7px 14px', border: '1px solid rgba(20,20,20,.16)', borderRadius: 999, fontSize: 13, color: '#3A3A3A', whiteSpace: 'nowrap' }}>{children}</span>
);

const HERO = [
  ['Hasta Beach', 'Sanur', 'Bali', 'Hotel 01 - Beachfront Resort'],
  ['Hasta Retreat', 'Ubud', 'Bali', 'Hotel 03 - Mountain Wellness Retreat'],
  ['Hasta Ocean', 'Nusa Dua', 'Bali', 'Hotel 05 - Oceanfront Pool'],
  ['Hasta Island', 'Lombok', 'NTB', 'New Resort Property 01 - Island Destination'],
  ['Hasta Villas', 'Uluwatu', 'Bali', 'Villa 04 - Hillside Estate'],
];

function Nav({ T }) {
  const op = tw(T, 4.2, 5.0, 0, 1);
  const y = kf(T, [[0, 0], [10, 0], [10.6, -110], [32.1, -110], [32.8, 0]]);
  const bg = Math.max(tw(T, 6.2, 7.2, 0, 0.92), T > 31.5 ? 0.92 : 0);
  const items = ['Tentang Kami', 'Bisnis Kami', 'Hubungan Investor', 'Tata Kelola (GCG)', 'Keberlanjutan', 'Berita & Media', 'Kontak'];
  return (
    <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 76, padding: '0 56px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: `rgba(255,255,255,${bg})`, boxShadow: bg > 0.5 ? '0 1px 0 rgba(20,20,20,.08)' : 'none', opacity: op, transform: `translateY(${y}%)`, zIndex: 5 }}>
      <img src="assets/logo-color.svg" alt="" style={{ width: 150, height: 31, display: 'block' }} />
      <div style={{ display: 'flex', alignItems: 'center', gap: 30, fontSize: 14, color: INK }}>
        {items.map(t => <span key={t}>{t}</span>)}
        <div style={{ display: 'flex', gap: 8, paddingLeft: 20, borderLeft: '1px solid rgba(20,20,20,.2)', fontSize: 13, fontWeight: 500, letterSpacing: '.06em' }}>
          <span style={{ color: GOLDD, borderBottom: `1px solid ${GOLD}` }}>ID</span><span style={{ color: 'rgba(20,20,20,.35)' }}>/</span><span style={{ opacity: 0.6 }}>EN</span>
        </div>
      </div>
    </div>
  );
}

function Hero({ T }) {
  const e = tw(T, 6.2, 7.8, 0, 1, MOTION.glide), inv = 1 - e;
  const over = tw(T, 7.5, 8.4, 0, 1);
  const x2 = tw(T, 8.6, 9.6, 0, 1, MOTION.glide);
  const cur = T < 9.05 ? 0 : 1, d = HERO[cur];
  const nameOp = 1 - tw(T, 8.75, 9.05, 0, 1) + tw(T, 9.05, 9.4, 0, 1);
  const line = i => tw(T, 3.9 + i * 0.16, 4.9 + i * 0.16, 1, 0);
  const a1 = tw(T, 4.3, 5.0, 0, 1), a2 = tw(T, 4.6, 5.4, 0, 1);
  return (
    <div style={{ position: 'absolute', left: 0, top: 0, width: VW, height: VH, background: '#fff', overflow: 'hidden' }}>
      <img src="assets/s-mark.svg" alt="" style={{ position: 'absolute', right: -20, top: -50, height: 630, opacity: 0.07, transform: `translateY(${-80 * e}px) rotate(-6deg)` }} />
      <div style={{ position: 'absolute', left: 56, right: 56, top: 96, height: 324, display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 22, paddingBottom: 24, opacity: cl(1 - e * 1.6), transform: `translateY(${-65 * e}px)` }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', opacity: a1, transform: `translateY(${(1 - a1) * 14}px)` }}>
          <Eyebrow w={40}>PT Sanurhasta Tbk</Eyebrow>
          <div style={{ display: 'flex', gap: 8 }}><Chip>Hotel &amp; Resor</Chip><Chip>Properti</Chip><Chip>Cadangan Lahan</Chip></div>
        </div>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 28 }}>
          <h1 style={{ margin: 0, fontWeight: 300, fontSize: 92, lineHeight: 1, letterSpacing: '-.035em', color: INK }}>
            <div style={{ overflow: 'hidden', paddingBottom: 6 }}><div style={{ transform: `translateY(${line(0) * 110}%)` }}>Membangun ruang,</div></div>
            <div style={{ overflow: 'hidden', paddingBottom: 6 }}><div style={{ transform: `translateY(${line(1) * 110}%)` }}>menumbuhkan <span style={{ color: GOLD }}>nilai.</span></div></div>
          </h1>
          <div style={{ width: 340, display: 'flex', flexDirection: 'column', gap: 20, opacity: a2, transform: `translateY(${(1 - a2) * 18}px)` }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
              <div style={{ display: 'flex' }}>
                {HERO.map((h, i) => (
                  <span key={i} style={{ width: 44, height: 44, borderRadius: '50%', overflow: 'hidden', position: 'relative', marginLeft: i ? -12 : 0, border: '2px solid #fff', boxShadow: i === cur ? `0 0 0 2px ${GOLD}` : '0 0 0 1px rgba(20,20,20,.12)', zIndex: i === cur ? 2 : 1, transform: i === cur ? 'translateY(-4px)' : 'none', background: '#EFEAE0' }}><Img src={IMG(h[3])} /></span>
                ))}
              </div>
              <span style={{ fontSize: 13, lineHeight: 1.35, color: '#5A5A5A' }}>{d[0]}<br /><span style={{ color: GOLDD }}>{d[1]}, {d[2]}</span></span>
            </div>
            <p style={{ margin: 0, fontSize: 16, lineHeight: 1.55, color: '#3A3A3A' }}>Perusahaan terbuka di bidang hotel, pengembangan properti, dan cadangan lahan strategis di Indonesia.</p>
          </div>
        </div>
      </div>
      <div style={{ position: 'absolute', inset: 0, clipPath: `inset(${420 * inv}px ${56 * inv}px ${32 * inv}px ${56 * inv}px round ${28 * inv}px)`, background: '#3B362C', opacity: tw(T, 4.4, 5.4, 0, 1) }}>
        <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, top: 420 * inv, transform: `scale(${1.14 - 0.14 * e})`, overflow: 'hidden' }}>
          <Img src={IMG(HERO[0][3])} style={{ transform: `scale(${1.1 - 0.1 * tw(T, 4, 10, 0, 1, Easing.linear)})` }} />
          <Img src={IMG(HERO[1][3])} style={{ opacity: x2, transform: `scale(${1.08 - 0.06 * tw(T, 8.6, 11, 0, 1, Easing.linear)})` }} />
        </div>
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(15,14,12,.15) 0%,rgba(15,14,12,0) 35%,rgba(15,14,12,.7) 100%)', opacity: e }}></div>
        <div style={{ position: 'absolute', left: 56, right: 56, bottom: 52, display: 'flex', flexDirection: 'column', gap: 44, color: '#fff', opacity: over, transform: `translateY(${(1 - over) * 40}px)` }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', gap: 28 }}>
            <h2 style={{ margin: 0, maxWidth: 780, fontWeight: 300, fontSize: 62, lineHeight: 1.08, letterSpacing: '-.025em' }}>Aset yang dirancang untuk bertahan dan terus bernilai.</h2>
            <span style={{ padding: '16px 28px', background: '#fff', color: INK, borderRadius: 999, fontSize: 15, fontWeight: 500, whiteSpace: 'nowrap' }}>Jelajahi Bisnis Kami →</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: 64, paddingTop: 28, borderTop: '1px solid rgba(255,255,255,.22)' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16, width: 300 }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, minHeight: 36, opacity: nameOp }}>
                <span style={{ fontSize: 26, letterSpacing: '.02em', lineHeight: 1 }}>{d[0]}</span>
                <span style={{ width: 1, height: 24, background: 'rgba(255,255,255,.6)' }}></span>
                <span style={{ fontSize: 11, lineHeight: 1.15, letterSpacing: '.14em', textTransform: 'uppercase', color: 'rgba(255,255,255,.85)' }}>{d[1]}<br />{d[2]}</span>
              </div>
              <div style={{ position: 'relative', height: 3, background: 'rgba(255,255,255,.3)', borderRadius: 2, overflow: 'hidden' }}><div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: (20 + 20 * x2) + '%', background: '#fff' }}></div></div>
            </div>
            <span style={{ fontSize: 40, fontWeight: 300, lineHeight: 1, whiteSpace: 'nowrap', fontVariantNumeric: 'tabular-nums' }}>0{cur + 1}<span style={{ fontSize: '.45em', color: 'rgba(255,255,255,.6)' }}> / 05</span></span>
            <div style={{ display: 'flex', gap: 12 }}>
              {['←', '→'].map((a, i) => <span key={a} style={{ width: 44, height: 44, borderRadius: '50%', border: '1px solid rgba(255,255,255,.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 18, background: i && T > 8.5 && T < 9.1 ? '#fff' : 'transparent', color: i && T > 8.5 && T < 9.1 ? INK : '#fff' }}>{a}</span>)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const STATEMENT = 'Sanurhasta mengelola hotel, properti, dan cadangan lahan strategis di Indonesia, membangun aset yang terus bernilai bagi tamu, penghuni, mitra, dan pemegang saham.';
const GOLDW = new Set(['hotel,', 'properti,', 'cadangan', 'lahan']);
function About({ T }) {
  const ws = STATEMENT.split(' '), N = ws.length;
  const p = tw(T, 10.9, 13.4, 0, 1, Easing.linear);
  const cp = tw(T, 12.6, 14.4, 0, 1, Easing.easeOutCubic);
  const stats = [[12, '', 'Hotel & resor'], [28, '', 'Proyek properti'], [1240, ' ha', 'Cadangan lahan']];
  const ea = tw(T, 10.6, 11.3, 0, 1);
  return (
    <div style={{ position: 'absolute', left: 0, top: VH, width: VW, height: VH, background: '#fff', padding: '120px 96px 0', display: 'flex', gap: 96 }}>
      <div style={{ width: 200, flex: 'none', paddingTop: 22, opacity: ea }}><Eyebrow>Tentang Kami</Eyebrow></div>
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: 72 }}>
        <p style={{ margin: 0, fontWeight: 300, fontSize: 50, lineHeight: 1.18, letterSpacing: '-.022em', display: 'flex', flexWrap: 'wrap', columnGap: '.25em' }}>
          {ws.map((w, i) => <span key={i} style={{ opacity: cl(p * N * 1.3 - i, 0.22, 1), color: GOLDW.has(w) ? GOLD : INK }}>{w}</span>)}
        </p>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3,1fr)', borderTop: '1px solid rgba(20,20,20,.14)' }}>
          {stats.map((s, i) => {
            const a = tw(T, 12.4 + i * 0.15, 13.1 + i * 0.15, 0, 1);
            const v = Math.round(s[0] * cl((cp * 1.25) - i * 0.1));
            return (
              <div key={i} style={{ display: 'flex', flexDirection: 'column', gap: 14, padding: '32px 24px 0', paddingLeft: i ? 24 : 0, borderLeft: i ? '1px solid rgba(20,20,20,.14)' : 'none', opacity: a, transform: `translateY(${(1 - a) * 30}px)` }}>
                <span style={{ fontWeight: 200, fontSize: 84, lineHeight: 1, letterSpacing: '-.04em', fontVariantNumeric: 'tabular-nums' }}>{fmt(v)}<span style={{ fontSize: '.32em', fontWeight: 400, color: GOLDD, letterSpacing: 0 }}>{s[1]}</span></span>
                <span style={{ fontSize: 15, color: '#4A4A4A' }}>{s[2]}</span>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

const PILLARS = [
  { n: '01', img: 'Hotel 05 - Oceanfront Pool', kicker: 'Hospitality', title: 'Hotel', desc: 'Portofolio hotel dan resor di destinasi utama Indonesia, dikelola dengan standar layanan internasional.', tags: ['Resor', 'Hotel kota', 'MICE'] },
  { n: '02', img: 'Villa 01 - Tropical Pool Residence', kicker: 'Pengembangan', title: 'Properti', desc: 'Villa, hunian, dan kawasan terpadu yang dirancang untuk nilai jangka panjang.', tags: ['Villa', 'Residensial', 'Mixed-use'] },
  { n: '03', img: 'Land Bank 01 - Coastal Development Parcel', kicker: 'Cadangan Lahan', title: 'Land Bank', desc: 'Cadangan lahan strategis di koridor pertumbuhan, menjadi fondasi bagi pengembangan di masa depan.', tags: ['Koridor pertumbuhan', 'Pariwisata', 'Kawasan terpadu'] },
];
function Business({ T }) {
  const p = tw(T, 16.3, 20.4, 0, 1, MOTION.glide), x = -2284 * p;
  const ia = tw(T, 15.6, 16.4, 0, 1);
  return (
    <div style={{ position: 'absolute', left: 0, top: VH * 2, width: VW, height: VH, background: CREAM, overflow: 'hidden' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, height: VH, display: 'flex', alignItems: 'center', gap: 44, padding: '0 86px', transform: `translateX(${x}px)` }}>
        <div style={{ width: 420, flex: 'none', display: 'flex', flexDirection: 'column', gap: 28, opacity: ia, transform: `translateY(${(1 - ia) * 30}px)` }}>
          <Eyebrow>Bisnis Kami</Eyebrow>
          <h2 style={{ margin: 0, fontWeight: 300, fontSize: 64, lineHeight: 1.04, letterSpacing: '-.03em' }}>Tiga pilar, satu <span style={{ color: GOLD }}>visi jangka panjang.</span></h2>
          <p style={{ margin: 0, fontSize: 17, lineHeight: 1.65, color: '#3A3A3A' }}>Setiap lini usaha saling menguatkan: lahan menjadi fondasi, properti membentuk kawasan, dan hotel menghidupkannya.</p>
        </div>
        {PILLARS.map((b, i) => {
          const d = (86 + 420 + 44 + i * 1044 + 500 + x - 720) / 1440;
          return (
            <div key={i} style={{ width: 1000, height: 600, flex: 'none', display: 'flex', background: '#fff', borderRadius: 24, overflow: 'hidden', boxShadow: '0 30px 60px -30px rgba(60,48,20,.18)' }}>
              <div style={{ flex: '1.5 1 0', position: 'relative', overflow: 'hidden', background: '#EFE8DA' }}>
                <div style={{ position: 'absolute', top: 0, bottom: 0, left: '-8%', right: '-8%', transform: `translateX(${-d * 8}%)` }}><Img src={IMG(b.img)} /></div>
              </div>
              <div style={{ flex: '1 1 0', padding: 44, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 18 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 13, letterSpacing: '.2em', textTransform: 'uppercase', color: GOLDD, fontWeight: 500 }}><span>{b.kicker}</span><span style={{ color: '#8A8A8A' }}>{b.n}</span></div>
                  <h3 style={{ margin: 0, fontWeight: 300, fontSize: 56, lineHeight: 1, letterSpacing: '-.03em' }}>{b.title}</h3>
                  <p style={{ margin: 0, fontSize: 16, lineHeight: 1.7, color: '#3A3A3A' }}>{b.desc}</p>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 22 }}>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8 }}>{b.tags.map(t => <span key={t} style={{ fontSize: 13, padding: '7px 14px', border: '1px solid rgba(20,20,20,.18)', borderRadius: 999, color: '#2A2A2A', whiteSpace: 'nowrap' }}>{t}</span>)}</div>
                  <div style={{ fontSize: 15, fontWeight: 500, display: 'flex', justifyContent: 'space-between', paddingTop: 18, borderTop: '1px solid rgba(20,20,20,.12)' }}><span>Jelajahi {b.title}</span><span>→</span></div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div style={{ position: 'absolute', left: 86, right: 86, bottom: 40, height: 1, background: 'rgba(20,20,20,.12)' }}><div style={{ height: 1, width: p * 100 + '%', background: GOLD }}></div></div>
    </div>
  );
}

const SCENE = (() => {
  const F = []; let o = 0;
  const K = {
    grass: ['#B7CFA0', '#8FAE7A', '#7C9B68'], tree: ['#6F9460', '#56794A', '#4A6A40'],
    villa: ['#FFFFFF', '#E9E3D8', '#D5CCBD'], roof: ['#3B362E', '#E9E3D8', '#D5CCBD'],
    pool: ['#A9D2E0', '#D5CCBD', '#C7BEAE'], hotel: ['#EFE4C8', '#CDB27A', '#AB8F55'], hotel2: ['#F5EEDC', '#DCC79A', '#BBA06A']
  };
  const pa = 'repeating-linear-gradient(90deg, rgba(255,255,255,0) 0 8px, rgba(255,255,255,.38) 8px 9px)';
  const pb = 'repeating-linear-gradient(180deg, rgba(255,255,255,0) 0 8px, rgba(255,255,255,.38) 8px 9px)';
  const ga = 'repeating-linear-gradient(90deg, rgba(60,70,80,0) 0 6px, rgba(60,70,80,.22) 6px 14px)';
  const gb = 'repeating-linear-gradient(180deg, rgba(60,70,80,0) 0 6px, rgba(60,70,80,.22) 6px 14px)';
  const add = (x, y, w, d, z, h, k, step = 1) => {
    const win = k.startsWith('hotel'), vil = k === 'villa';
    F.push({ x, y, w, d, z, h, c: K[k], pa: win ? pa : vil ? ga : 'none', pb: win ? pb : vil ? gb : 'none', o }); o += step;
  };
  add(20, 300, 220, 230, 0, 6, 'grass'); add(20, 40, 150, 230, 0, 6, 'grass');
  [[50, 330], [100, 360], [170, 330], [60, 430], [140, 450], [200, 480], [50, 90], [110, 150], [60, 210], [130, 70]].forEach(p => add(p[0], p[1], 14, 14, 6, 20, 'tree', 0.4));
  const m1 = Math.ceil(o);
  [[270, 400], [350, 400], [430, 400], [270, 470], [350, 470], [430, 470]].forEach(p => {
    add(p[0] + 34, p[1] + 6, 26, 40, 0, 2, 'pool', 0.3); add(p[0], p[1], 34, 52, 0, 14, 'villa', 0.5); add(p[0] - 3, p[1] - 3, 40, 58, 14, 3, 'roof', 0.5);
  });
  const m2 = Math.ceil(o);
  for (let i = 0; i < 2; i++) add(200, 60, 300, 200, i * 16, 16, 'hotel2');
  for (let i = 0; i < 13; i++) add(220, 90, 100, 100, 32 + i * 16, 16, 'hotel');
  for (let i = 0; i < 9; i++) add(350, 120, 120, 80, 32 + i * 16, 16, 'hotel2', 0.7);
  for (let i = 0; i < 5; i++) add(230, 205, 220, 40, 32 + i * 16, 16, 'hotel', 0.4);
  return { F, m1, m2, n: o / 0.85 };
})();
const LEGEND = [
  ['Land Bank', '#8FAE7A', 'Lahan hijau strategis yang diakuisisi lebih awal di koridor pertumbuhan.', 0],
  ['Properti & Villa', '#D5CCBD', 'Villa dan hunian privat yang membentuk kawasan terpadu.', SCENE.m1],
  ['Hotel', '#CDB27A', 'Kompleks hotel multi-gedung yang menjadi jantung setiap destinasi.', SCENE.m2],
];
function Lanskap({ T }) {
  const p = tw(T, 21.6, 25.6, 0, 1, Easing.easeInOutSine || MOTION.glide);
  const ia = tw(T, 20.9, 21.7, 0, 1);
  const N = SCENE.n;
  const face = (st, f, a) => ({ position: 'absolute', opacity: a, ...st });
  return (
    <div style={{ position: 'absolute', left: 0, top: VH * 3, width: VW, height: VH, background: '#fff', overflow: 'hidden', display: 'flex', alignItems: 'center', gap: 28, padding: '76px 96px 20px' }}>
      <div style={{ width: 440, flex: 'none', display: 'flex', flexDirection: 'column', gap: 26, opacity: ia, transform: `translateY(${(1 - ia) * 30}px)` }}>
        <Eyebrow>Lanskap Portofolio</Eyebrow>
        <h2 style={{ margin: 0, fontWeight: 300, fontSize: 60, lineHeight: 1.04, letterSpacing: '-.03em' }}>Dari sebidang lahan menjadi <span style={{ color: GOLD }}>kawasan yang hidup.</span></h2>
        <div style={{ display: 'flex', flexDirection: 'column', borderBottom: '1px solid rgba(20,20,20,.14)' }}>
          {LEGEND.map(l => (
            <div key={l[0]} style={{ display: 'flex', gap: 18, alignItems: 'flex-start', padding: '16px 0', borderTop: '1px solid rgba(20,20,20,.14)', opacity: cl(p * N - l[3], 0.3, 1) }}>
              <span style={{ width: 14, height: 14, flex: 'none', borderRadius: 2, background: l[1], transform: 'translateY(3px)' }}></span>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 4 }}><span style={{ fontWeight: 500, fontSize: 17 }}>{l[0]}</span><span style={{ fontSize: 15, color: '#4A4A4A', lineHeight: 1.5 }}>{l[2]}</span></div>
            </div>
          ))}
        </div>
      </div>
      <div style={{ flex: 1, alignSelf: 'stretch', display: 'flex', alignItems: 'center', justifyContent: 'center', perspective: 2200 }}>
        <div style={{ width: 560, height: 560, flex: 'none', transform: 'scale(.88)' }}>
          <div style={{ position: 'relative', width: 560, height: 560, transformStyle: 'preserve-3d', transform: `rotateX(58deg) rotateZ(${-52 + p * 44}deg)` }}>
            <div style={{ position: 'absolute', inset: -60, backgroundColor: '#FBF9F5', backgroundImage: 'linear-gradient(rgba(20,20,20,.05) 1px,transparent 1px),linear-gradient(90deg,rgba(20,20,20,.05) 1px,transparent 1px)', backgroundSize: '40px 40px', border: '1px solid rgba(168,132,58,.25)' }}></div>
            {SCENE.F.map((f, i) => {
              const a = cl(p * N - f.o), h = f.h;
              if (a <= 0) return null;
              return (
                <div key={i} style={{ position: 'absolute', left: f.x, top: f.y, width: f.w, height: f.d, transformStyle: 'preserve-3d', transform: `translateZ(${f.z + (1 - a) * 160}px)` }}>
                  <div style={face({ inset: 0, background: f.c[0], transform: `translateZ(${h}px)` }, f, a)}></div>
                  <div style={face({ left: 0, top: '100%', width: '100%', height: h, transformOrigin: 'top', transform: 'rotateX(90deg)', backgroundColor: f.c[1], backgroundImage: f.pa }, f, a)}></div>
                  <div style={face({ left: 0, top: 0, width: '100%', height: h, transformOrigin: 'top', transform: 'rotateX(90deg)', backgroundColor: f.c[2], backgroundImage: f.pa }, f, a)}></div>
                  <div style={face({ left: '100%', top: 0, width: h, height: '100%', transformOrigin: 'left', transform: 'rotateY(-90deg)', backgroundColor: f.c[2], backgroundImage: f.pb }, f, a)}></div>
                  <div style={face({ left: 0, top: 0, width: h, height: '100%', transformOrigin: 'left', transform: 'rotateY(-90deg)', backgroundColor: f.c[1], backgroundImage: f.pb }, f, a)}></div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}

const GAL = [
  { name: 'Sanurhasta Resort Nusa Dua', loc: 'Nusa Dua, Bali', x: 40, y: 14, w: 21, ar: '3/4', r: '999px 999px 24px 24px', sp: -4, dy: 3, rot: -1.5, img: 'New Resort Property 01 - Island Destination' },
  { name: 'The Hasta Ubud', loc: 'Ubud, Bali', x: 66, y: 50, w: 15, ar: '4/5', r: '24px', sp: 7, dy: -5, rot: 2, img: 'Villa 04 - Hillside Estate' },
  { name: 'Hasta Suites Labuan Bajo', loc: 'Labuan Bajo, NTT', x: 87, y: 12, w: 30, ar: '4/3', r: '24px', sp: -2, dy: 2, rot: 0, img: 'New Resort Property 02 - Hillside Retreat' },
  { name: 'Hasta Residences Jakarta', loc: 'Jakarta', x: 124, y: 46, w: 17, ar: '1', r: '50%', sp: 9, dy: -7, rot: 0, img: 'Hotel 02 - Urban Landmark' },
  { name: 'Villa Seminyak Estate', loc: 'Seminyak, Bali', x: 146, y: 10, w: 19, ar: '4/5', r: '24px', sp: -5, dy: 4, rot: -2, img: 'Villa 02 - Coastal Retreat' },
  { name: 'Hasta Grand Bandung', loc: 'Bandung', x: 171, y: 38, w: 30, ar: '4/3', r: '24px', sp: 3, dy: -3, rot: 1, img: 'Hotel 03 - Mountain Wellness Retreat' },
  { name: 'Kawasan Lombok Selatan', loc: 'Lombok', x: 207, y: 14, w: 18, ar: '3/4', r: '999px 999px 24px 24px', sp: -6, dy: 5, rot: 1.5, img: 'Property Community 01 - Landscaped Neighborhood' },
];
function Gallery({ T }) {
  const p = tw(T, 21.8, 25.9, 0, 1, MOTION.glide), x = -2160 * p;
  const ia = tw(T, 21.1, 21.9, 0, 1);
  let near = 0, nd = 9;
  const cards = GAL.map((c, i) => {
    const left = c.x * 14.4, w = c.w * 14.4;
    const d = (left + w / 2 + x - 720) / 1440, ad = Math.min(1, Math.abs(d) * 1.4);
    if (Math.abs(d) < nd) { nd = Math.abs(d); near = i; }
    const on = cl(1 - Math.abs(d) / 0.11);
    return (
      <div key={i} style={{ position: 'absolute', left, top: c.y * 8.1, width: w, display: 'flex', flexDirection: 'column', gap: 14, transform: `translate(${d * c.sp * 14.4}px, ${d * c.dy * 8.1}px) rotate(${d * c.rot * 4}deg)`, zIndex: on > 0.5 ? 3 : 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12, letterSpacing: '.16em', textTransform: 'uppercase', color: SAND, fontWeight: 500, whiteSpace: 'nowrap' }}><span>{c.loc}</span><span style={{ color: 'rgba(230,211,163,.55)' }}>0{i + 1}</span></div>
        <div style={{ position: 'relative', width: '100%', aspectRatio: c.ar, borderRadius: c.r, overflow: 'hidden', background: '#2A2219', transform: `scale(${1 - ad * 0.08 + on * 0.03})`, filter: `grayscale(${ad * 0.85}) sepia(${ad * 0.35}) brightness(${1 - ad * 0.25})`, boxShadow: on > 0.3 ? `0 40px 80px -20px rgba(0,0,0,.6), 0 0 0 1px rgba(230,211,163,${0.7 * on})` : '0 20px 50px -24px rgba(0,0,0,.5)' }}>
          <div style={{ position: 'absolute', top: 0, bottom: 0, left: '-10%', right: '-10%', transform: `translateX(${-d * 9}%)` }}><Img src={IMG(c.img)} /></div>
          <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(180deg,rgba(15,12,8,0) 40%,rgba(15,12,8,.88) 100%)', opacity: on }}></div>
          <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: c.r === '50%' ? '0 18% 18%' : 20, display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 12, opacity: on, transform: `translateY(${(1 - on) * 16}px)` }}>
            <span style={{ fontSize: 22, lineHeight: 1.15, color: '#fff' }}>{c.name}</span>
            <span style={{ flex: 'none', width: 40, height: 40, borderRadius: '50%', background: SAND, color: DARK, display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16 }}>→</span>
          </div>
        </div>
      </div>
    );
  });
  return (
    <div style={{ position: 'absolute', left: 0, top: VH * 4, width: VW, height: VH, overflow: 'hidden', zIndex: 1, background: `radial-gradient(ellipse 70% 60% at 50% 55%,#2E2619 0%,${DARK} 75%)` }}>
      <div style={{ position: 'absolute', left: 0, bottom: -32, whiteSpace: 'nowrap', fontWeight: 200, fontSize: 345, lineHeight: 1, letterSpacing: '-.05em', color: 'rgba(230,211,163,.05)', transform: `translateX(${-864 * p}px)` }}>Destinasi Sanurhasta</div>
      <div style={{ position: 'absolute', left: 0, top: 0, width: 3600, height: VH, transform: `translateX(${x}px)` }}>
        <div style={{ position: 'absolute', left: 86, top: '50%', width: 432, transform: `translateY(calc(-50% + ${(1 - ia) * 30}px))`, opacity: ia, display: 'flex', flexDirection: 'column', gap: 28 }}>
          <Eyebrow color={SAND} line={SAND}>Properti</Eyebrow>
          <h2 style={{ margin: 0, fontWeight: 300, fontSize: 56, lineHeight: 1.05, letterSpacing: '-.03em', color: '#fff' }}>Dari pesisir hingga pusat kota, <span style={{ color: '#D6BA7A' }}>setiap aset punya ceritanya.</span></h2>
          <span style={{ display: 'flex', alignItems: 'center', gap: 12, fontSize: 14, color: 'rgba(255,255,255,.7)' }}>Gulir untuk menjelajah <span style={{ width: 40, height: 1, background: 'rgba(255,255,255,.5)' }}></span>→</span>
        </div>
        {cards}
        <span style={{ position: 'absolute', right: 86, top: '50%', transform: 'translateY(-50%)', padding: '18px 30px', border: `1px solid ${SAND}`, color: SAND, borderRadius: 999, fontSize: 15, fontWeight: 500, whiteSpace: 'nowrap' }}>Lihat semua properti →</span>
      </div>
      <div style={{ position: 'absolute', left: 56, right: 56, bottom: 32, display: 'flex', alignItems: 'center', gap: 20, color: '#fff' }}>
        <span style={{ fontSize: 15, letterSpacing: '.06em', fontVariantNumeric: 'tabular-nums' }}>0{near + 1}</span>
        <div style={{ flex: 1, height: 1, background: 'rgba(255,255,255,.2)', position: 'relative' }}><div style={{ position: 'absolute', left: 0, top: -1, height: 3, width: p * 100 + '%', background: SAND, borderRadius: 2 }}></div></div>
        <span style={{ fontSize: 15, color: 'rgba(255,255,255,.55)', letterSpacing: '.06em' }}>07</span>
      </div>
    </div>
  );
}

function Footer({ T }) {
  const p = tw(T, 26.3, 27.6, 0, 1);
  const g = tw(T, 26.9, 27.7, 0, 1);
  const lab = { fontSize: 13, letterSpacing: '.12em', textTransform: 'uppercase', color: GOLDD, fontWeight: 500 };
  const val = { fontSize: 16, lineHeight: 1.7, color: '#2A2A2A' };
  return (
    <div style={{ position: 'absolute', left: 0, top: VH * 5, width: VW, height: VH, background: CREAM, padding: '120px 96px 40px', overflow: 'hidden' }}>
      <Eyebrow>Kontak</Eyebrow>
      <h2 style={{ margin: '24px 0 0', fontWeight: 300, fontSize: 112, lineHeight: 1, letterSpacing: '-.04em', transform: `translateX(${(1 - p) * -86}px)`, opacity: p }}>Mari membangun<br /><span style={{ color: GOLD }}>bersama.</span></h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4,1fr)', gap: 40, marginTop: 64, paddingTop: 36, borderTop: '1px solid rgba(20,20,20,.14)', opacity: g, transform: `translateY(${(1 - g) * 24}px)` }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}><span style={lab}>Kantor Pusat</span><span style={val}>Sanurhasta Tower, Lt. 20<br />Jl. Jend. Sudirman Kav. 00<br />Jakarta 12190, Indonesia</span></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}><span style={lab}>Hubungi</span><span style={val}>+62 21 0000 0000<br />corsec@sanurhasta.co.id</span></div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}><span style={lab}>Investor</span><span style={val}>ir@sanurhasta.co.id</span></div>
        <div><span style={{ display: 'inline-flex', padding: '16px 28px', background: INK, color: '#fff', borderRadius: 999, fontSize: 15, fontWeight: 500 }}>Kirim Pesan →</span></div>
      </div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 64, fontSize: 13, color: '#5A5A5A', opacity: g }}>
        <img src="assets/logo-color.svg" alt="" style={{ width: 140, height: 29 }} />
        <span>© 2026 PT Sanurhasta Tbk. Seluruh hak cipta dilindungi.</span>
        <div style={{ display: 'flex', gap: 24 }}><span>Kebijakan Privasi</span><span>Whistleblowing</span></div>
      </div>
    </div>
  );
}

const CAPS = [
  { at: 4.6, until: 9.9, n: '01', t: 'Scroll-pinned hero: the image expands to full bleed' },
  { at: 11.0, until: 15.0, n: '02', t: 'Statement fills in word by word, figures count up' },
  { at: 16.4, until: 20.5, n: '03', t: 'Business pillars on a horizontal scroll track' },
  { at: 21.8, until: 25.9, n: '04', t: 'Portfolio landscape builds up layer by layer in 3D' },
  { at: 27.3, until: 31.5, n: '05', t: 'Property gallery: off-centre cards fall to monochrome' },
];
function Caption({ T }) {
  const c = CAPS.find(c => T >= c.at && T < c.until);
  if (!c) return null;
  const op = Math.min(tw(T, c.at, c.at + 0.4, 0, 1), 1 - tw(T, c.until - 0.4, c.until, 0, 1));
  return (
    <div style={{ position: 'absolute', left: 240, top: 972, display: 'flex', alignItems: 'center', gap: 16, padding: '12px 24px', background: INK, color: '#fff', borderRadius: 999, fontSize: 24, whiteSpace: 'nowrap', opacity: op, transform: `translateY(${(1 - op) * 12}px)`, zIndex: 10 }}>
      <span style={{ color: SAND, fontVariantNumeric: 'tabular-nums' }}>{c.n}</span><span>{c.t}</span>
    </div>
  );
}

function Piece({ captions = true, chrome = true }) {
  const { T } = useComposition();
  const ch = chrome ? CHROME : 0;
  const bh = ch + VH, top = (1080 - bh) / 2 - (chrome ? 43 : 40);
  const scroll = kf(T, [[0, 0], [10, 0], [11.1, VH], [15, VH], [16.1, VH * 2], [20.5, VH * 2], [21.6, VH * 3], [26, VH * 3], [27.1, VH * 4], [31.5, VH * 4], [32.6, VH * 5]]);
  const s = kf(T, [[0, 0.92], [2.9, 0.92], [4.4, 1], [7.8, 1], [10, 1.05], [11, 1], [11.6, 1], [13, 1.06], [14.4, 1.09], [15.2, 1], [21.6, 1], [26, 1.03], [27.1, 1], [31.5, 1.05], [32.5, 1], [33.3, 1], [34.7, 0.6]]);
  const fy = kf(T, [[0, 0], [7.8, 0], [10, 140], [11, 0], [11.6, 0], [13, 0], [14.4, 120], [15.2, 0]]);
  const rise = tw(T, 2.9, 4.4, 1000, 0, MOTION.enter) + tw(T, 33.3, 34.7, 0, -90, MOTION.glide);
  const bop = tw(T, 2.9, 3.3, 0, 1) * (1 - tw(T, 35.6, 36.4, 0, 1));
  const lo = tw(T, 0.3, 1.3, 0, 1) * (1 - tw(T, 2.7, 3.4, 0, 1, MOTION.glide));
  const ly = tw(T, 0.3, 1.3, 30, 0) + tw(T, 2.7, 3.4, 0, -50, MOTION.glide);
  const credit = tw(T, 34.1, 35, 0, 1) * (1 - tw(T, 35.6, 36.4, 0, 1));
  return (
    <div data-screen-label={`Showcase ${Math.floor(T)}s`} style={{ position: 'absolute', inset: 0, overflow: 'hidden', background: '#F1ECE2', fontFamily: FONT, color: INK, WebkitFontSmoothing: 'antialiased' }}>
      <img src="assets/s-mark.svg" alt="" style={{ position: 'absolute', right: -160, top: -120, height: 1320, opacity: 0.06, transform: `rotate(${-6 + 3 * Math.sin((2 * Math.PI * T) / TOTAL)}deg)` }} />
      <div style={{ position: 'absolute', left: 0, right: 0, top: 410, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 34, opacity: lo, transform: `translateY(${ly}px)` }}>
        <img src="assets/logo-color.svg" alt="" style={{ width: 400, height: 83 }} />
        <span style={{ width: 140 * tw(T, 0.8, 1.8, 0, 1, MOTION.glide), height: 1, background: GOLD }}></span>
        <span style={{ fontSize: 24, letterSpacing: '.22em', textTransform: 'uppercase', color: GOLDD, fontWeight: 500, whiteSpace: 'nowrap', opacity: tw(T, 1.2, 2.0, 0, 1) }}>Corporate website · 2026</span>
      </div>
      <div style={{ position: 'absolute', left: (1920 - VW) / 2, top, width: VW, height: bh, borderRadius: 18, overflow: 'hidden', background: '#fff', opacity: bop, boxShadow: '0 70px 140px -50px rgba(60,48,20,.45), 0 0 0 1px rgba(20,20,20,.06)', transformOrigin: '50% 50%', transform: `translateY(${rise - fy * (s - 1)}px) scale(${s})` }}>
        {chrome && (
          <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: CHROME, background: '#FBFAF7', borderBottom: '1px solid rgba(20,20,20,.08)', display: 'flex', alignItems: 'center', padding: '0 18px', gap: 8 }}>
            {['#E6D3A3', '#D9CDB6', '#CFC6B5'].map(c => <span key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }}></span>)}
            <span style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', padding: '6px 80px', background: '#F1ECE2', borderRadius: 8, fontSize: 13, color: '#5A5A5A', letterSpacing: '.02em' }}>sanurhasta.co.id</span>
          </div>
        )}
        <div style={{ position: 'absolute', left: 0, top: ch, width: VW, height: VH, overflow: 'hidden' }}>
          <div style={{ position: 'absolute', inset: 0, transform: `translateY(${-scroll}px)` }}>
            <Hero T={T} /><About T={T} /><Business T={T} /><Lanskap T={T} /><Gallery T={T - 5.5} /><Footer T={T - 5.5} />
          </div>
          <Nav T={T} />
        </div>
      </div>
      <div style={{ position: 'absolute', left: 0, right: 0, top: 800, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, opacity: credit, transform: `translateY(${(1 - credit) * 20}px)` }}>
        <span style={{ fontSize: 24, letterSpacing: '.22em', textTransform: 'uppercase', color: GOLDD, fontWeight: 500, whiteSpace: 'nowrap' }}>PT Sanurhasta Tbk</span>
        <span style={{ fontSize: 30, fontWeight: 300, color: '#3A3A3A' }}>Corporate website · UI &amp; interaction design</span>
      </div>
      {captions && <Caption T={T} />}
    </div>
  );
}

function SanurhastaShowcase() {
  const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS || { motionEditor: true, captions: true, chrome: true });
  return (
    <React.Fragment>
      <CompositionStage width={1920} height={1080} bg="#F1ECE2" scenes={window.OM_SCENES} playback={window.OM_PLAYBACK}>
        <Piece captions={t.captions} chrome={t.chrome} />
      </CompositionStage>
      <TweaksPanel>
        <TweakSection label="Showcase" />
        <TweakToggle label="Feature captions" value={t.captions} onChange={v => setTweak('captions', v)} />
        <TweakToggle label="Browser chrome" value={t.chrome} onChange={v => setTweak('chrome', v)} />
        <TweakToggle label="Motion editor" value={t.motionEditor} onChange={v => setTweak('motionEditor', v)} />
      </TweaksPanel>
    </React.Fragment>
  );
}
window.SanurhastaShowcase = SanurhastaShowcase;
