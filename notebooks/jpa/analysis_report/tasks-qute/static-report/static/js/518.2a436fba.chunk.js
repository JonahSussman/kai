"use strict";
(self.webpackChunkkonveyor_static_report =
  self.webpackChunkkonveyor_static_report || []).push([
  [518],
  {
    51518: (e, n, i) => {
      i.r(n), i.d(n, { default: () => u });
      i(72791);
      var s = i(16871),
        a = i(27054),
        d = i(59402),
        c = i(99978),
        l = i(25344),
        t = i(61088),
        p = i(17300),
        r = i(45145),
        o = i(17128),
        h = i(36075),
        x = i(20874),
        j = i(80184);
      const u = () => {
        const e = (0, s.bS)("/dependencies"),
          n = (0, s.bS)("/dependencies/applications"),
          i = (0, s.bS)("/dependencies/applications/:applicationId"),
          u = e
            ? void 0
            : n
              ? o.s
              : null === i || void 0 === i
                ? void 0
                : i.params.applicationId,
          k = (0, s.s0)();
        return (0, j.jsxs)(j.Fragment, {
          children: [
            (0, j.jsx)(a.NP, {
              padding: { default: "noPadding" },
              children: (0, j.jsx)(d.o, {
                children: (0, j.jsxs)(c.c, {
                  children: [
                    (0, j.jsx)(l.E, { children: "Application:" }),
                    (0, j.jsx)(l.E, {
                      children: (0, j.jsx)(h.wD, {
                        contextKeyFromURL: u,
                        onChange: (e) => {
                          k("/dependencies/applications/" + e.key);
                        },
                      }),
                    }),
                  ],
                }),
              }),
            }),
            (0, j.jsx)(t.i, {}),
            (0, j.jsx)(a.NP, {
              variant: a.Dk.light,
              children: (0, j.jsxs)(p.D, {
                children: [
                  (0, j.jsx)(r.x, {
                    component: "h1",
                    children: "Dependencies",
                  }),
                  (0, j.jsx)(r.x, {
                    component: "small",
                    children:
                      "This report lists all found Java libraries embedded within the analyzed application.",
                  }),
                ],
              }),
            }),
            (0, j.jsx)(a.NP, {
              variant: a.Dk.default,
              children: (0, j.jsx)(x.im, { applicationId: u }),
            }),
          ],
        });
      };
    },
  },
]);
//# sourceMappingURL=518.2a436fba.chunk.js.map
