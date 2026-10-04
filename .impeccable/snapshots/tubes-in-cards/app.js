(function () {
  const data = window.CHECKIN;
  const rack = document.getElementById("rack");

  // Test tube geometry, in the SVG's own 64×220 units. The liquid surface
  // sits at BOTTOM when empty and at BRIM when full.
  const BRIM = 22;
  const BOTTOM = 206.5;
  const levelY = (score) => BOTTOM - (Math.max(0, Math.min(100, score)) / 100) * (BOTTOM - BRIM);

  // One period of the surface wave is 60 units; the path runs wide enough to
  // slide a full period sideways and still cover the tube.
  const wave = (amp) => {
    let d = `M-120,0 q15,${-amp} 30,0`;
    for (let x = -90; x < 240; x += 30) d += " t30,0";
    return d + " L240,240 L-120,240 Z";
  };

  // A few bubbles drift up from the bottom of the tube to the surface.
  const bubbles = (score) => {
    const depth = BOTTOM - levelY(score);
    if (depth < 24) return "";
    return [
      [25, 1.6, 4.2, 0],
      [37, 1.1, 5.6, 1.7],
      [31, 2.0, 6.8, 3.1],
    ]
      .map(([cx, r, dur, delay]) =>
        `<circle class="bubble" cx="${cx}" cy="0" r="${r}" style="--depth: ${(depth - 6).toFixed(1)}px; animation-duration: ${dur}s; animation-delay: -${delay}s"/>`)
      .join("");
  };

  const tube = (area) => {
    const id = area.id;
    const c = (step) => `var(--${id}-${step})`;
    return `
      <svg class="tube-svg" viewBox="0 0 64 220" aria-hidden="true" focusable="false">
        <defs>
          <clipPath id="inside-${id}">
            <path d="M15.5,10 L15.5,190 A16.5,16.5 0 0 0 48.5,190 L48.5,10 Z"/>
          </clipPath>
          <linearGradient id="liquid-${id}" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stop-color="${c(5)}"/>
            <stop offset="1" stop-color="${c(7)}"/>
          </linearGradient>
        </defs>
        <g clip-path="url(#inside-${id})">
          <rect x="0" y="0" width="64" height="220" style="fill: color-mix(in oklch, ${c(4)} 14%, white)"/>
          <g class="liquid" style="transform: translateY(${levelY(area.score).toFixed(2)}px)">
            <path class="wave wave-back" d="${wave(2)}" style="fill: ${c(4)}" transform="translate(0,-1.5)"/>
            <path class="wave wave-front" d="${wave(2.4)}" fill="url(#liquid-${id})"/>
            ${bubbles(area.score)}
          </g>
        </g>
        <path class="tube-shine" d="M21,26 L21,184"/>
        <path class="tube-wall" d="M12,9 L12,190 A20,20 0 0 0 52,190 L52,9"/>
        <path class="tube-lip" d="M7,8 L57,8"/>
      </svg>`;
  };

  const lowest = Math.min(...data.areas.map((a) => a.score));
  const highest = Math.max(...data.areas.map((a) => a.score));
  const lowAreas = data.areas.filter((a) => a.score === lowest);
  const highAreas = data.areas.filter((a) => a.score === highest);
  const names = (list) => list.map((a) => a.name).join(" & ");

  document.getElementById("summary").innerHTML =
    `Most room to grow: <strong>${names(lowAreas)}</strong>, at ${lowest}%. ` +
    `Strongest: <strong>${names(highAreas)}</strong>, at ${highest}%.`;

  const date = new Date(data.checkedIn + "T12:00:00");
  document.getElementById("checked").innerHTML =
    `Checked in on <time datetime="${data.checkedIn}">${date.toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}</time>`;

  if (data.placeholder) document.getElementById("placeholder-note").hidden = false;

  const el = (tag, cls, text) => {
    const n = document.createElement(tag);
    if (cls) n.className = cls;
    if (text != null) n.textContent = text;
    return n;
  };

  data.areas.forEach((area) => {
    const li = el("li", "strip");
    li.dataset.area = area.id;
    li.style.setProperty("--deep", `var(--${area.id}-8)`);
    if (area.score === lowest) li.classList.add("is-lowest");

    const head = el("div", "strip-head");
    head.append(el("span", "hole"));
    const h2 = el("h2", "area", area.name);
    h2.id = `area-${area.id}`;
    head.append(h2);
    const score = el("p", "score");
    score.append(el("span", "num", String(area.score)), el("span", "pct", "%"));
    head.append(score);
    li.append(head);

    const gauge = el("div", "tube");
    gauge.setAttribute("role", "meter");
    gauge.setAttribute("aria-valuemin", "0");
    gauge.setAttribute("aria-valuemax", "100");
    gauge.setAttribute("aria-valuenow", String(area.score));
    gauge.setAttribute("aria-valuetext", `${area.score}% full`);
    gauge.setAttribute("aria-labelledby", h2.id);
    gauge.innerHTML = tube(area);
    li.append(gauge);

    const note = el("div", "note");
    note.append(el("p", null, area.note));
    li.append(note);

    if (area.score === lowest) {
      const sticker = el("span", "sticker");
      sticker.innerHTML = "Start<br>here";
      li.append(sticker);
    }

    li.setAttribute("aria-labelledby", h2.id);
    rack.append(li);
  });

  // Signature motion: the strips fan out from a stacked deck, then each test
  // tube fills to its level. Everything is already in its final state; the
  // animation only plays from a starting pose, so nothing is ever hidden.
  const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduce || !Element.prototype.animate) return;

  const strips = [...rack.children];
  const rackBox = rack.getBoundingClientRect();
  const centerX = rackBox.left + rackBox.width / 2;
  const stacked = window.matchMedia("(max-width: 719px)").matches;
  const ease = "cubic-bezier(0.16, 1, 0.3, 1)";

  strips.forEach((strip, n) => {
    const box = strip.getBoundingClientRect();
    const dx = stacked ? 0 : centerX - (box.left + box.width / 2);
    const dy = stacked ? -24 * (n + 1) : 28;
    const tilt = (n - (strips.length - 1) / 2) * 3;
    strip.animate(
      [
        { transform: `translate(${dx}px, ${dy}px) rotate(${tilt}deg)` },
        { transform: "none" },
      ],
      { duration: 900, delay: n * 60, easing: ease, fill: "backwards", composite: "add" }
    );

    const liquid = strip.querySelector(".liquid");
    liquid.animate(
      [{ transform: `translateY(${BOTTOM + 8}px)` }, { transform: liquid.style.transform }],
      { duration: 1600, delay: 700 + n * 140, easing: "cubic-bezier(0.25, 1, 0.5, 1)", fill: "backwards" }
    );
  });
})();
