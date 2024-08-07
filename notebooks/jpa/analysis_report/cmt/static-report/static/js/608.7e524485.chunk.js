"use strict";
(self.webpackChunkkonveyor_static_report =
  self.webpackChunkkonveyor_static_report || []).push([
  [608],
  {
    20874: (e, t, n) => {
      n.d(t, {
        Vr: () => l,
        hp: () => se,
        im: () => G,
        Mm: () => re,
        ez: () => Z,
        pb: () => he,
        GU: () => s,
        Fs: () => ge.F,
      });
      var r = n(72791),
        a = n(80184);
      const l = (e) => {
        let { when: t, then: n, children: r } = e;
        return t ? n : r || (0, a.jsx)(a.Fragment, {});
      };
      var o = n(46447),
        i = n(57037);
      const s = (e) => {
        let {
          onChange: t,
          options: n,
          value: l,
          placeholderText: s = "Select...",
          ...c
        } = e;
        const [d, h] = (0, r.useState)(!1);
        return (0, a.jsx)(o.P, {
          placeholderText: s,
          isOpen: d,
          onToggle: (e, t) => h(t),
          onSelect: (e, n) => {
            t(n), "checkbox" !== c.variant && h(!1);
          },
          selections: l,
          ...c,
          children: n.map((e, t) =>
            (0, a.jsx)(
              i.$,
              { value: e, ...("object" === typeof e && e.props) },
              "".concat(t, "-").concat(e.toString()),
            ),
          ),
        });
      };
      var c = n(3864),
        d = n(5120),
        h = n(95665),
        g = n(7233),
        u = n(55759),
        p = n(59402),
        x = n(99978),
        m = n(44209),
        v = n(25344),
        j = n(63525),
        y = n(78955),
        f = n(87932),
        T = n(94016),
        b = n(58134),
        C = n(88245),
        k = n(87020),
        S = n(39698),
        w = n(49384),
        P = n(6964),
        I = n(86257),
        L = n(70730),
        N = n(70494),
        F = n(7155),
        M = n(4792),
        B = n(17128),
        E = n(76925),
        O = n(76413);
      const A = (e, t, n) => {
          switch (n) {
            case 1:
              return e.name.localeCompare(t.name);
            case 3:
              return e.version === t.version ? 0 : 1;
            case 4:
              return e.indirect === t.indirect ? 0 : 1;
            default:
              return 0;
          }
        },
        D = (e) => {
          if ("string" === typeof e) {
            const t = () => e;
            return {
              value: e,
              toString: t,
              compareTo: (n) =>
                "string" === typeof n
                  ? t().toLowerCase().includes(n.toLocaleLowerCase())
                  : e === n.value,
            };
          }
          {
            const t = () => e.node;
            return {
              value: e.key,
              toString: t,
              compareTo: (n) =>
                "string" === typeof n
                  ? t().toLowerCase().includes(n.toLowerCase())
                  : e.key === n.value,
            };
          }
        },
        R = (e) => ({ key: e.value, node: e.toString() }),
        G = (e) => {
          var t, n;
          let { applicationId: l } = e;
          const o = (0, E.Le)(),
            [i, G] = (0, r.useState)(""),
            {
              filters: H,
              setFilter: z,
              removeFilter: Z,
              clearAllFilters: U,
            } = (0, O.Sm)(),
            _ = (0, M.Nr)(i, 250),
            V = (0, M.Nr)(H, 100),
            J = (0, r.useMemo)(() => {
              var e, t, n;
              return o.data && void 0 !== l
                ? l === B.s
                  ? null === (e = o.data) || void 0 === e
                    ? void 0
                    : e.flatMap((e) => e.dependencies || [])
                  : (null === (t = o.data) ||
                    void 0 === t ||
                    null === (n = t.find((e) => e.id === l)) ||
                    void 0 === n
                      ? void 0
                      : n.dependencies) || []
                : [];
            }, [o.data, l]),
            K = (0, r.useMemo)(
              () =>
                Array.from(
                  new Set(
                    null === J || void 0 === J
                      ? void 0
                      : J.flatMap((e) => e.labels),
                  ),
                ),
              [J],
            ),
            {
              page: $,
              sortBy: q,
              changePage: W,
              changeSortBy: Q,
            } = (0, O.HL)(),
            X = (0, r.useCallback)(
              (e) => {
                let t = !0;
                _ &&
                  _.trim().length > 0 &&
                  (t = -1 !== e.name.toLowerCase().indexOf(_.toLowerCase()));
                let n = !0;
                const r = V.get("labels") || [];
                r.length > 0 &&
                  (n = r.some((t) => {
                    var n;
                    return null === (n = e.labels) || void 0 === n
                      ? void 0
                      : n.includes(t.key);
                  }));
                const a = V.get("relationship") || [];
                return (
                  a.length > 0 &&
                    (n = a.some(
                      (t) =>
                        ("Direct" === t.key && !e.indirect) ||
                        ("Indirect" === t.key && e.indirect),
                    )),
                  t && n && !0
                );
              },
              [_, V],
            ),
            { pageItems: Y, filteredItems: ee } = (0, O.x6)({
              items: J,
              currentPage: $,
              currentSortBy: q,
              compareToByColumn: A,
              filterItem: X,
            });
          return (
            (0, r.useEffect)(() => {
              W({ page: 1, perPage: $.perPage });
            }, [l, W, $.perPage]),
            (0, a.jsx)(a.Fragment, {
              children:
                void 0 === l
                  ? (0, a.jsx)(c.b, {
                      children: (0, a.jsxs)(d.u, {
                        children: [
                          (0, a.jsx)(h.k, { icon: k.ZP }),
                          (0, a.jsx)(g.D, {
                            headingLevel: "h4",
                            size: "lg",
                            children: "Select an application",
                          }),
                          (0, a.jsx)(u.B, {
                            children:
                              "Select an application whose data you want to get access to.",
                          }),
                        ],
                      }),
                    })
                  : (0, a.jsxs)(a.Fragment, {
                      children: [
                        (0, a.jsx)(p.o, {
                          className: "pf-m-toggle-group-container",
                          collapseListedFiltersBreakpoint: "xl",
                          clearAllFilters: U,
                          children: (0, a.jsxs)(x.c, {
                            children: [
                              (0, a.jsxs)(m.R, {
                                toggleIcon: (0, a.jsx)(S.ZP, {}),
                                breakpoint: "xl",
                                children: [
                                  (0, a.jsx)(v.E, {
                                    variant: "search-filter",
                                    children: (0, a.jsx)(j.M, {
                                      value: i,
                                      onChange: (e, t) => G(t),
                                      onClear: () => G(""),
                                    }),
                                  }),
                                  (0, a.jsx)(y.k, {
                                    variant: "filter-group",
                                    children: (0, a.jsx)(f.p, {
                                      chips: H.get("labels"),
                                      deleteChip: (e, t) => Z("labels", t),
                                      deleteChipGroup: () => z("labels", []),
                                      categoryName: {
                                        key: "labels",
                                        name: "Labels",
                                      },
                                      children: (0, a.jsx)(s, {
                                        maxHeight: 300,
                                        variant: "checkbox",
                                        "aria-label": "labels",
                                        "aria-labelledby": "labels",
                                        placeholderText: "Labels",
                                        value:
                                          null === (t = H.get("labels")) ||
                                          void 0 === t
                                            ? void 0
                                            : t.map(D),
                                        options: K.map(D),
                                        onChange: (e) => {
                                          const t = e;
                                          let n;
                                          (n = (H.get("labels") || []).some(
                                            (e) => e.key === t.value,
                                          )
                                            ? (H.get("labels") || []).filter(
                                                (e) => e.key !== t.value,
                                              )
                                            : [
                                                ...(H.get("labels") || []),
                                                R(t),
                                              ]),
                                            z("labels", n);
                                        },
                                        hasInlineFilter: !0,
                                        onClear: () => z("labels", []),
                                      }),
                                    }),
                                  }),
                                  (0, a.jsx)(y.k, {
                                    variant: "filter-group",
                                    children: (0, a.jsx)(f.p, {
                                      chips: H.get("relationship"),
                                      deleteChip: (e, t) =>
                                        Z("relationship", t),
                                      deleteChipGroup: () =>
                                        z("relationship", []),
                                      categoryName: {
                                        key: "relationship",
                                        name: "Relation",
                                      },
                                      children: (0, a.jsx)(s, {
                                        maxHeight: 300,
                                        variant: "checkbox",
                                        "aria-label": "relationship",
                                        "aria-labelledby": "relationship",
                                        placeholderText: "Relation",
                                        value:
                                          null ===
                                            (n = H.get("relationship")) ||
                                          void 0 === n
                                            ? void 0
                                            : n.map(D),
                                        options: ["Direct", "Indirect"].map(D),
                                        onChange: (e) => {
                                          const t = e;
                                          let n;
                                          (n = (
                                            H.get("relationship") || []
                                          ).some((e) => e.key === t.value)
                                            ? (
                                                H.get("relationship") || []
                                              ).filter((e) => e.key !== t.value)
                                            : [
                                                ...(H.get("relationship") ||
                                                  []),
                                                R(t),
                                              ]),
                                            z("relationship", n);
                                        },
                                        hasInlineFilter: !0,
                                        onClear: () => z("relationship", []),
                                      }),
                                    }),
                                  }),
                                ],
                              }),
                              (0, a.jsx)(v.E, {
                                variant: v.A.pagination,
                                align: { default: "alignRight" },
                                children: (0, a.jsx)(he, {
                                  count: ee.length,
                                  params: $,
                                  onChange: W,
                                  isTop: !0,
                                }),
                              }),
                            ],
                          }),
                        }),
                        (0, a.jsxs)(w.i, {
                          children: [
                            (0, a.jsx)(P.h, {
                              children: (0, a.jsxs)(I.Tr, {
                                children: [
                                  (0, a.jsx)(L.Th, {
                                    width: 50,
                                    sort: {
                                      columnIndex: 1,
                                      sortBy: { ...q },
                                      onSort: Q,
                                    },
                                    modifier: "truncate",
                                    children: "Name",
                                  }),
                                  (0, a.jsx)(L.Th, {
                                    width: 30,
                                    children: "Labels",
                                  }),
                                  (0, a.jsx)(L.Th, {
                                    width: 10,
                                    modifier: "truncate",
                                    children: "Version",
                                  }),
                                  (0, a.jsx)(L.Th, {
                                    width: 10,
                                    sort: {
                                      columnIndex: 4,
                                      sortBy: { ...q },
                                      onSort: Q,
                                    },
                                    modifier: "truncate",
                                    children: "Relation",
                                  }),
                                ],
                              }),
                            }),
                            (0, a.jsx)(se, {
                              isNoData: 0 === ee.length,
                              numRenderedColumns: 10,
                              children:
                                null === Y || void 0 === Y
                                  ? void 0
                                  : Y.map((e, t) => {
                                      var n;
                                      return (0, a.jsx)(
                                        N.p,
                                        {
                                          children: (0, a.jsxs)(I.Tr, {
                                            children: [
                                              (0, a.jsx)(F.Td, {
                                                children: e.name,
                                              }),
                                              (0, a.jsx)(F.Td, {
                                                children: (0, a.jsx)(T.P, {
                                                  hasGutter: !0,
                                                  children:
                                                    null === (n = e.labels) ||
                                                    void 0 === n
                                                      ? void 0
                                                      : n.map((e, t) =>
                                                          (0, a.jsx)(
                                                            b.J,
                                                            {
                                                              children: (0,
                                                              a.jsx)(C._, {
                                                                isCompact: !0,
                                                                color: "blue",
                                                                children:
                                                                  e.replace(
                                                                    "konveyor.io/source=",
                                                                    "",
                                                                  ),
                                                              }),
                                                            },
                                                            t,
                                                          ),
                                                        ),
                                                }),
                                              }),
                                              (0, a.jsx)(F.Td, {
                                                children: e.version,
                                              }),
                                              (0, a.jsx)(F.Td, {
                                                children: e.indirect
                                                  ? "Indirect"
                                                  : "Direct",
                                              }),
                                            ],
                                          }),
                                        },
                                        t,
                                      );
                                    }),
                            }),
                          ],
                        }),
                        (0, a.jsx)(he, {
                          count: ee.length,
                          params: $,
                          onChange: W,
                        }),
                      ],
                    }),
            })
          );
        };
      var H = n(88740),
        z = n(71502);
      n(74216);
      const Z = (e) => {
        let { ...t } = e;
        return (0, a.jsx)(H.D, {
          className: "markdown-body",
          remarkPlugins: [z.Z],
          linkTarget: "_blank",
          ...t,
        });
      };
      var U = n(4522),
        _ = n(86883),
        V = n(40783),
        J = n(70061),
        K = n(38625),
        $ = n(15420),
        q = n(66872),
        W = n(17300),
        Q = n(45145),
        X = n(41262),
        Y = n(35931),
        ee = n(35697),
        te = n(68418);
      const ne = /^\s*([0-9]+)( {2})?(.*)$/,
        re = (e) => {
          var t;
          let {
              name: n,
              displayName: o,
              codeSnip: i,
              isLoading: s,
              incidents: c,
              issue: d,
              props: h,
            } = e,
            g = (e) => e,
            u = (e) => e;
          const p = i.split("\n"),
            x = [];
          let m = 1;
          p.forEach((e, t) => {
            const n = e.match(ne);
            if (n && !isNaN(Number(n[1]))) {
              const e = Number(n[1]);
              0 === t && (m = e);
              const r = n[3] || "";
              x.push(r);
            }
          }),
            (i = x.join("\n")),
            (g = (e) => e - (m - 1)),
            (u = (e) => e + (m - 1));
          const v = (0, r.useRef)(),
            j = (0, r.useRef)();
          (0, r.useEffect)(
            () => () => {
              var e, t;
              null === (e = j.current) ||
                void 0 === e ||
                e.editor.getModels().forEach((e) => e.dispose()),
                null === (t = v.current) || void 0 === t || t.dispose();
            },
            [v, j],
          );
          const [y, f] = (0, r.useState)([]);
          (0, r.useEffect)(
            () => () => {
              y.forEach((e) => e && e.dispose());
            },
            [y],
          );
          const T =
              null === n ||
              void 0 === n ||
              null === (t = n.split(".")) ||
              void 0 === t
                ? void 0
                : t.pop(),
            b = (e, t) => {
              e.layout(),
                e.focus(),
                t.editor.getModels()[0].updateOptions({ tabSize: 5 });
              let n = [];
              ((e, t) => {
                var n;
                const r =
                    null ===
                      (n = t.filter(
                        (e) => e.lineNumber && 0 !== e.lineNumber,
                      )) || void 0 === n
                      ? void 0
                      : n.map((t) => ({
                          startLineNumber: g(t.lineNumber),
                          endLineNumber: g(t.lineNumber),
                          startColumn: 0,
                          endColumn: 1e3,
                          message: d.description,
                          severity: e.MarkerSeverity.Warning,
                        })),
                  a = e.editor.getModels()[0];
                e.editor.setModelMarkers(a, "*", r);
              })(t, c);
              const r = ((e, t, n) =>
                t.map((t) =>
                  e.languages.registerHoverProvider("*", {
                    provideHover: (r, a) => {
                      if (a.lineNumber === t.lineNumber)
                        return {
                          range: new e.Range(t.lineNumber, 1, t.lineNumber, 1),
                          contents: [{ value: (0, te.O)(t.message, n) }],
                        };
                    },
                  }),
                ))(t, c, d.links);
              (n = n.concat(r)), f(n), (v.current = e), (j.current = t);
            };
          return (0, a.jsx)(U.dy, {
            isExpanded: !0,
            isInline: !0,
            children: (0, a.jsx)(_.s, {
              panelContent: (0, a.jsx)(V.S, {
                isResizable: !0,
                children: (0, a.jsx)(J.h, {
                  children: (0, a.jsxs)(K.Z, {
                    isLarge: !0,
                    children: [
                      (0, a.jsx)($.O, {
                        children: (0, a.jsxs)(q.l, {
                          children: [
                            (0, a.jsx)(W.D, {
                              children: (0, a.jsx)(Q.x, {
                                component: "h1",
                                children: d.name,
                              }),
                            }),
                            (0, a.jsx)(W.D, {
                              children: (0, a.jsx)(Q.x, {
                                component: "small",
                                children: d.ruleID,
                              }),
                            }),
                          ],
                        }),
                      }),
                      (0, a.jsx)(X.e, {
                        children:
                          d.description &&
                          (0, a.jsx)(Z, {
                            children: (0, te.O)(d.description, d.links),
                          }),
                      }),
                    ],
                  }),
                }),
              }),
              children: (0, a.jsx)(Y.s, {
                children: (0, a.jsx)(l, {
                  when: s,
                  then: (0, a.jsx)("span", { children: "Loading..." }),
                  children: (0, a.jsx)(ee.p, {
                    isDarkTheme: !0,
                    isLineNumbersVisible: !0,
                    isReadOnly: !0,
                    isMinimapVisible: !0,
                    isLanguageLabelVisible: !0,
                    isDownloadEnabled: !1,
                    title: o,
                    code: i || "",
                    language: Object.values(ee.S).find(
                      (e) =>
                        e ===
                        (null === T || void 0 === T ? void 0 : T.toLowerCase()),
                    ),
                    options: {
                      glyphMargin: !0,
                      "semanticHighlighting.enabled": !0,
                      renderValidationDecorations: "on",
                      lineNumbers: (e) => String(u(e)),
                    },
                    onEditorDidMount: (e, t) => {
                      b(e, t);
                    },
                    height: "".concat(window.innerHeight - 300, "px"),
                    ...h,
                  }),
                }),
              }),
            }),
          });
        };
      var ae = n(30073),
        le = n(98876),
        oe = n(65279),
        ie = n(60741);
      const se = (e) => {
        let {
          numRenderedColumns: t,
          isLoading: n = !1,
          isError: r = !1,
          isNoData: l = !1,
          errorEmptyState: o = null,
          noDataEmptyState: i = null,
          children: s,
        } = e;
        const p = (0, a.jsxs)(d.u, {
            variant: d.I.sm,
            children: [
              (0, a.jsx)(h.k, { icon: oe.ZP, color: ie.a.value }),
              (0, a.jsx)(g.D, {
                headingLevel: "h2",
                size: "lg",
                children: "Unable to connect",
              }),
              (0, a.jsx)(u.B, {
                children:
                  "There was an error retrieving data. Check your connection and try again.",
              }),
            ],
          }),
          x = (0, a.jsxs)(d.u, {
            variant: d.I.sm,
            children: [
              (0, a.jsx)(h.k, { icon: le.ZP }),
              (0, a.jsx)(g.D, {
                headingLevel: "h2",
                size: "lg",
                children: "No data available",
              }),
              (0, a.jsx)(u.B, {
                children: "No data available to be shown here.",
              }),
            ],
          });
        return (0, a.jsx)(a.Fragment, {
          children: n
            ? (0, a.jsx)(N.p, {
                children: (0, a.jsx)(I.Tr, {
                  children: (0, a.jsx)(F.Td, {
                    colSpan: t,
                    children: (0, a.jsx)(c.b, {
                      children: (0, a.jsx)(ae.$, { size: "xl" }),
                    }),
                  }),
                }),
              })
            : r
              ? (0, a.jsx)(N.p, {
                  "aria-label": "Table error",
                  children: (0, a.jsx)(I.Tr, {
                    children: (0, a.jsx)(F.Td, {
                      colSpan: t,
                      children: (0, a.jsx)(c.b, { children: o || p }),
                    }),
                  }),
                })
              : l
                ? (0, a.jsx)(N.p, {
                    "aria-label": "Table no data",
                    children: (0, a.jsx)(I.Tr, {
                      children: (0, a.jsx)(F.Td, {
                        colSpan: t,
                        children: (0, a.jsx)(c.b, { children: i || x }),
                      }),
                    }),
                  })
                : s,
        });
      };
      var ce = n(22582),
        de = n(97712);
      const he = (e) => {
        let {
          count: t,
          params: n,
          isTop: r,
          isCompact: l,
          perPageOptions: o,
          onChange: i,
        } = e;
        const s = () => n.perPage || 10;
        return (0, a.jsx)(ce.t, {
          itemCount: t,
          page: n.page || 1,
          perPage: s(),
          onPageInput: (e, t) => {
            i({ page: t, perPage: s() });
          },
          onSetPage: (e, t) => {
            i({ page: t, perPage: s() });
          },
          onPerPageSelect: (e, t) => {
            i({ page: 1, perPage: t });
          },
          isCompact: r || l,
          widgetId: "pagination-options-menu",
          variant: r ? ce.a.top : ce.a.bottom,
          perPageOptions:
            ((c = o || [10, 20, 50, 100]),
            c.map((e) => ({ title: String(e), value: e }))),
          toggleTemplate: (e) => (0, a.jsx)(de.v, { ...e }),
        });
        var c;
      };
      var ge = n(17225);
    },
    17225: (e, t, n) => {
      n.d(t, { F: () => ae });
      var r = n(72791),
        a = n(62374),
        l = n(3864),
        o = n(5120),
        i = n(95665),
        s = n(7233),
        c = n(55759),
        d = n(59402),
        h = n(99978),
        g = n(44209),
        u = n(25344),
        p = n(63525),
        x = n(78955),
        m = n(87932),
        v = n(94016),
        j = n(58134),
        y = n(88245),
        f = n(95785),
        T = n(22378),
        b = n(53894),
        C = n(32352),
        k = n(87020),
        S = n(39698),
        w = n(49384),
        P = n(6964),
        I = n(86257),
        L = n(70730),
        N = n(70494),
        F = n(7155),
        M = n(4792),
        B = n(88473),
        E = n(17128),
        O = n(76925),
        A = n(20874),
        D = n(76413),
        R = n(20738),
        G = n(86896),
        H = n(34022),
        z = n(21709),
        Z = n(38625),
        U = n(15420),
        _ = n(66872),
        V = n(17300),
        J = n(45145),
        K = n(41262),
        $ = n(37325),
        q = n(68418),
        W = n(80184);
      const Q = (e, t, n) => {
          switch (n) {
            case 0:
              return e.name.localeCompare(t.name);
            case 1:
              return e.totalIncidents - t.totalIncidents;
            default:
              return 0;
          }
        },
        X = (e) => {
          let { issue: t, onShowFile: n } = e;
          const [a, l] = (0, r.useState)(""),
            o = (0, M.Nr)(a, 250),
            i = (0, O.PO)(t),
            s = (0, r.useMemo)(() => {
              var e;
              return (
                (null === (e = i.data) || void 0 === e
                  ? void 0
                  : e.filter((e) => 0 !== e.totalIncidents)) || []
              );
            }, [i.data]),
            c = (0, r.useCallback)(
              (e) => {
                let t = !0;
                return (
                  o &&
                    o.trim().length > 0 &&
                    (t = -1 !== e.name.toLowerCase().indexOf(o.toLowerCase())),
                  t
                );
              },
              [o],
            ),
            {
              page: x,
              sortBy: m,
              changePage: v,
              changeSortBy: j,
            } = (0, D.HL)(),
            { pageItems: y, filteredItems: f } = (0, D.x6)({
              items: s,
              filterItem: c,
              currentPage: x,
              currentSortBy: m,
              compareToByColumn: Q,
            });
          return (0, W.jsx)(R.K, {
            hasGutter: !0,
            children: (0, W.jsx)(G.v, {
              children: (0, W.jsxs)(H.r, {
                hasGutter: !0,
                children: [
                  (0, W.jsxs)(z.P, {
                    md: 5,
                    children: [
                      (0, W.jsx)(d.o, {
                        className: "pf-m-toggle-group-container",
                        collapseListedFiltersBreakpoint: "xl",
                        children: (0, W.jsxs)(h.c, {
                          children: [
                            (0, W.jsx)(g.R, {
                              toggleIcon: (0, W.jsx)(S.ZP, {}),
                              breakpoint: "xl",
                              children: (0, W.jsx)(u.E, {
                                variant: "search-filter",
                                children: (0, W.jsx)(p.M, {
                                  value: a,
                                  onChange: (e, t) => l(t),
                                  onClear: () => l(""),
                                }),
                              }),
                            }),
                            (0, W.jsx)(u.E, {
                              variant: u.A.pagination,
                              align: { default: "alignRight" },
                              children: (0, W.jsx)(A.pb, {
                                count: f.length,
                                params: x,
                                onChange: v,
                                isTop: !0,
                              }),
                            }),
                          ],
                        }),
                      }),
                      (0, W.jsxs)(w.i, {
                        children: [
                          (0, W.jsx)(P.h, {
                            children: (0, W.jsxs)(I.Tr, {
                              children: [
                                (0, W.jsx)(L.Th, {
                                  width: 80,
                                  sort: {
                                    columnIndex: 1,
                                    sortBy: { ...m },
                                    onSort: j,
                                  },
                                  children: "File",
                                }),
                                (0, W.jsx)(L.Th, {
                                  width: 20,
                                  children: "Total incidents",
                                }),
                              ],
                            }),
                          }),
                          (0, W.jsx)(A.hp, {
                            isNoData: 0 === f.length,
                            numRenderedColumns: 10,
                            children:
                              null === y || void 0 === y
                                ? void 0
                                : y.map((e, r) =>
                                    (0, W.jsx)(
                                      N.p,
                                      {
                                        children: (0, W.jsxs)(I.Tr, {
                                          children: [
                                            (0, W.jsx)(F.Td, {
                                              children: (0, W.jsx)(Y, {
                                                file: e.name,
                                                defaultText: e.displayName,
                                                onClick: () => n(e, t),
                                              }),
                                            }),
                                            (0, W.jsx)(F.Td, {
                                              children: e.totalIncidents,
                                            }),
                                          ],
                                        }),
                                      },
                                      r,
                                    ),
                                  ),
                          }),
                        ],
                      }),
                      (0, W.jsx)(A.pb, {
                        count: f.length,
                        params: x,
                        onChange: v,
                      }),
                    ],
                  }),
                  (0, W.jsx)(z.P, {
                    md: 7,
                    children: (0, W.jsxs)(Z.Z, {
                      isCompact: !0,
                      isFullHeight: !0,
                      children: [
                        (0, W.jsx)(U.O, {
                          children: (0, W.jsx)(_.l, {
                            children: (0, W.jsx)(V.D, {
                              children: (0, W.jsx)(W.Fragment, {
                                children: (0, W.jsx)(J.x, {
                                  component: "h2",
                                  children: t.ruleID,
                                }),
                              }),
                            }),
                          }),
                        }),
                        (0, W.jsx)(K.e, {
                          children: (0, W.jsx)(A.ez, {
                            children: (0, q.O)(t.description || "", t.links),
                          }),
                        }),
                      ],
                    }),
                  }),
                ],
              }),
            }),
          });
        },
        Y = (e) => {
          let { file: t, defaultText: n, onClick: r } = e;
          return (0, W.jsx)(W.Fragment, {
            children: t
              ? (0, W.jsx)(T.zx, {
                  variant: "link",
                  isInline: !0,
                  onClick: r,
                  children: (0, W.jsx)($.k, { content: n || t }),
                })
              : n,
          });
        },
        ee = (e, t) => e.id === t.id,
        te = (e) => {
          if ("string" === typeof e) {
            const t = () => e;
            return {
              value: e,
              toString: t,
              compareTo: (n) =>
                "string" === typeof n
                  ? t().toLowerCase().includes(n.toLocaleLowerCase())
                  : e === n.value,
            };
          }
          {
            const t = () => e.node;
            return {
              value: e.key,
              toString: t,
              compareTo: (n) =>
                "string" === typeof n
                  ? t().toLowerCase().includes(n.toLowerCase())
                  : e.key === n.value,
            };
          }
        },
        ne = (e) => ({ key: e.value, node: e.toString() }),
        re = (e, t, n) => {
          switch (n) {
            case 1:
              return e.id.localeCompare(t.id);
            case 6:
              return e.totalIncidents - t.totalIncidents;
            case 7:
              return e.totalEffort - t.totalEffort;
            default:
              return 0;
          }
        },
        ae = (e) => {
          var t, n, R, G, H, z, Z, U;
          let { applicationId: _ } = e;
          const V = (0, O.Le)(),
            [J, K] = (0, r.useState)(0),
            [$, q] = (0, r.useState)({}),
            Q = (0, O.nH)($, J),
            Y = (0, r.useMemo)(() => Q.data || "", [Q.data]),
            [ae, le] = (0, r.useState)(""),
            {
              filters: oe,
              setFilter: ie,
              removeFilter: se,
              clearAllFilters: ce,
            } = (0, D.Sm)(),
            de = (0, M.Nr)(ae, 250),
            he = (0, M.Nr)(oe, 100),
            {
              data: ge,
              isOpen: ue,
              action: pe,
              open: xe,
              close: me,
            } = (0, D.dd)(),
            ve = (0, r.useMemo)(() => {
              var e, t, n;
              return V.data && void 0 !== _
                ? _ === E.s
                  ? null === (e = V.data) || void 0 === e
                    ? void 0
                    : e.flatMap((e) => e.issues)
                  : (null === (t = V.data) ||
                    void 0 === t ||
                    null === (n = t.find((e) => e.id === _)) ||
                    void 0 === n
                      ? void 0
                      : n.issues) || []
                : [];
            }, [V.data, _]),
            je = (0, r.useMemo)(() => {
              const e = new Set(),
                t = new Set();
              return (
                ve.forEach((n) => {
                  var r, a;
                  null === (r = n.sourceTechnologies) ||
                    void 0 === r ||
                    r.forEach((t) => e.add(t)),
                    null === (a = n.targetTechnologies) ||
                      void 0 === a ||
                      a.forEach((e) => t.add(e));
                }),
                { source: Array.from(e), target: Array.from(t) }
              );
            }, [ve]),
            ye = (0, r.useMemo)(() => {
              const e = (ve || []).map((e) => e.category);
              return Array.from(new Set(e)).sort((0, B.BM)((e) => e));
            }, [ve]),
            fe = (0, r.useMemo)(() => {
              const e = (ve || []).map((e) => e.effort.toString());
              return Array.from(new Set(e)).sort();
            }, [ve]),
            { isItemSelected: Te, toggleItemSelected: be } = (0, a.Uq)({
              items: ve,
              isEqual: ee,
            }),
            {
              page: Ce,
              sortBy: ke,
              changePage: Se,
              changeSortBy: we,
            } = (0, D.HL)(),
            Pe = (0, r.useCallback)(
              (e) => {
                let t = !0;
                de &&
                  de.trim().length > 0 &&
                  (t = -1 !== e.name.toLowerCase().indexOf(de.toLowerCase()));
                let n = !0;
                const r = he.get("category") || [];
                r.length > 0 && (n = r.some((t) => e.category === t.key));
                let a = !0;
                const l = he.get("effort") || [];
                l.length > 0 &&
                  (a = l.some((t) => e.effort.toString() === t.key));
                let o = !0;
                const i = he.get("sourceTechnology") || [];
                i.length > 0 &&
                  (o = i.some((t) => {
                    var n;
                    return null === (n = e.sourceTechnologies) || void 0 === n
                      ? void 0
                      : n.includes(t.key);
                  }));
                let s = !0;
                const c = he.get("targetTechnology") || [];
                return (
                  c.length > 0 &&
                    (s = c.some((t) => {
                      var n;
                      return null === (n = e.targetTechnologies) || void 0 === n
                        ? void 0
                        : n.includes(t.key);
                    })),
                  t && n && a && o && s
                );
              },
              [de, he],
            ),
            { pageItems: Ie, filteredItems: Le } = (0, D.x6)({
              items: ve,
              currentPage: Ce,
              currentSortBy: ke,
              compareToByColumn: re,
              filterItem: Pe,
            });
          return (
            (0, r.useEffect)(() => {
              Se({ page: 1, perPage: Ce.perPage });
            }, [de, he, Se, Ce.perPage]),
            (0, W.jsxs)(W.Fragment, {
              children: [
                (0, W.jsx)(W.Fragment, {
                  children:
                    void 0 === _
                      ? (0, W.jsx)(l.b, {
                          children: (0, W.jsxs)(o.u, {
                            children: [
                              (0, W.jsx)(i.k, { icon: k.ZP }),
                              (0, W.jsx)(s.D, {
                                headingLevel: "h4",
                                size: "lg",
                                children: "Select an application",
                              }),
                              (0, W.jsx)(c.B, {
                                children:
                                  "Select an application whose data you want to get access to.",
                              }),
                            ],
                          }),
                        })
                      : (0, W.jsxs)(W.Fragment, {
                          children: [
                            (0, W.jsx)(d.o, {
                              className: "pf-m-toggle-group-container",
                              collapseListedFiltersBreakpoint: "xl",
                              clearAllFilters: ce,
                              children: (0, W.jsxs)(h.c, {
                                children: [
                                  (0, W.jsxs)(g.R, {
                                    toggleIcon: (0, W.jsx)(S.ZP, {}),
                                    breakpoint: "xl",
                                    children: [
                                      (0, W.jsx)(u.E, {
                                        variant: "search-filter",
                                        children: (0, W.jsx)(p.M, {
                                          value: ae,
                                          onChange: (e, t) => le(t),
                                          onClear: () => le(""),
                                        }),
                                      }),
                                      (0, W.jsx)(x.k, {
                                        variant: "filter-group",
                                        children: (0, W.jsx)(m.p, {
                                          chips: oe.get("category"),
                                          deleteChip: (e, t) =>
                                            se("category", t),
                                          deleteChipGroup: () =>
                                            ie("category", []),
                                          categoryName: {
                                            key: "category",
                                            name: "Category",
                                          },
                                          children: (0, W.jsx)(A.GU, {
                                            maxHeight: 300,
                                            variant: "checkbox",
                                            "aria-label": "category",
                                            "aria-labelledby": "category",
                                            placeholderText: "Category",
                                            value:
                                              null ===
                                                (t = oe.get("category")) ||
                                              void 0 === t
                                                ? void 0
                                                : t.map(te),
                                            options: ye.map(te),
                                            onChange: (e) => {
                                              const t = e;
                                              let n;
                                              (n = (
                                                oe.get("category") || []
                                              ).some((e) => e.key === t.value)
                                                ? (
                                                    oe.get("category") || []
                                                  ).filter(
                                                    (e) => e.key !== t.value,
                                                  )
                                                : [
                                                    ...(oe.get("category") ||
                                                      []),
                                                    ne(t),
                                                  ]),
                                                ie("category", n);
                                            },
                                            hasInlineFilter: !0,
                                            onClear: () => ie("category", []),
                                          }),
                                        }),
                                      }),
                                      (0, W.jsx)(x.k, {
                                        variant: "filter-group",
                                        children: (0, W.jsx)(m.p, {
                                          chips: oe.get("effort"),
                                          deleteChip: (e, t) => se("effort", t),
                                          deleteChipGroup: () =>
                                            ie("effort", []),
                                          categoryName: {
                                            key: "effort",
                                            name: "Effort",
                                          },
                                          children: (0, W.jsx)(A.GU, {
                                            maxHeight: 300,
                                            variant: "checkbox",
                                            "aria-label": "effort",
                                            "aria-labelledby": "effort",
                                            placeholderText: "Effort",
                                            value:
                                              null === (n = oe.get("effort")) ||
                                              void 0 === n
                                                ? void 0
                                                : n.map(te),
                                            options: fe.map(te),
                                            onChange: (e) => {
                                              const t = e;
                                              let n;
                                              (n = (
                                                oe.get("effort") || []
                                              ).some((e) => e.key === t.value)
                                                ? (
                                                    oe.get("effort") || []
                                                  ).filter(
                                                    (e) => e.key !== t.value,
                                                  )
                                                : [
                                                    ...(oe.get("effort") || []),
                                                    ne(t),
                                                  ]),
                                                ie("effort", n);
                                            },
                                            hasInlineFilter: !0,
                                            onClear: () => ie("effort", []),
                                          }),
                                        }),
                                      }),
                                      (0, W.jsxs)(x.k, {
                                        variant: "filter-group",
                                        children: [
                                          je.source.length > 0 &&
                                            (0, W.jsx)(m.p, {
                                              chips: oe.get("sourceTechnology"),
                                              deleteChip: (e, t) =>
                                                se("sourceTechnology", t),
                                              deleteChipGroup: () =>
                                                ie("sourceTechnology", []),
                                              categoryName: {
                                                key: "sourceTechnology",
                                                name: "Source",
                                              },
                                              children: (0, W.jsx)(A.GU, {
                                                maxHeight: 300,
                                                variant: "checkbox",
                                                "aria-label":
                                                  "sourceTechnology",
                                                "aria-labelledby":
                                                  "sourceTechnology",
                                                placeholderText: "Source",
                                                value:
                                                  null ===
                                                    (R =
                                                      oe.get(
                                                        "sourceTechnology",
                                                      )) || void 0 === R
                                                    ? void 0
                                                    : R.map(te),
                                                options: je.source.map(te),
                                                onChange: (e) => {
                                                  const t = e;
                                                  let n;
                                                  (n = (
                                                    oe.get(
                                                      "sourceTechnology",
                                                    ) || []
                                                  ).some(
                                                    (e) => e.key === t.value,
                                                  )
                                                    ? (
                                                        oe.get(
                                                          "sourceTechnology",
                                                        ) || []
                                                      ).filter(
                                                        (e) =>
                                                          e.key !== t.value,
                                                      )
                                                    : [
                                                        ...(oe.get(
                                                          "sourceTechnology",
                                                        ) || []),
                                                        ne(t),
                                                      ]),
                                                    ie("sourceTechnology", n);
                                                },
                                                hasInlineFilter: !0,
                                                onClear: () =>
                                                  ie("sourceTechnology", []),
                                              }),
                                            }),
                                          je.target.length > 0 &&
                                            (0, W.jsx)(m.p, {
                                              chips: oe.get("targetTechnology"),
                                              deleteChip: (e, t) =>
                                                se("targetTechnology", t),
                                              deleteChipGroup: () =>
                                                ie("targetTechnology", []),
                                              categoryName: {
                                                key: "targetTechnology",
                                                name: "Target",
                                              },
                                              children: (0, W.jsx)(A.GU, {
                                                maxHeight: 300,
                                                variant: "checkbox",
                                                "aria-label":
                                                  "targetTechnology",
                                                "aria-labelledby":
                                                  "targetTechnology",
                                                placeholderText: "Target",
                                                value:
                                                  null ===
                                                    (G =
                                                      oe.get(
                                                        "targetTechnology",
                                                      )) || void 0 === G
                                                    ? void 0
                                                    : G.map(te),
                                                options: je.target.map(te),
                                                onChange: (e) => {
                                                  const t = e;
                                                  let n;
                                                  (n = (
                                                    oe.get(
                                                      "targetTechnology",
                                                    ) || []
                                                  ).some(
                                                    (e) => e.key === t.value,
                                                  )
                                                    ? (
                                                        oe.get(
                                                          "targetTechnology",
                                                        ) || []
                                                      ).filter(
                                                        (e) =>
                                                          e.key !== t.value,
                                                      )
                                                    : [
                                                        ...(oe.get(
                                                          "targetTechnology",
                                                        ) || []),
                                                        ne(t),
                                                      ]),
                                                    ie("targetTechnology", n);
                                                },
                                                hasInlineFilter: !0,
                                                onClear: () =>
                                                  ie("targetTechnology", []),
                                              }),
                                            }),
                                        ],
                                      }),
                                    ],
                                  }),
                                  (0, W.jsx)(u.E, {
                                    variant: u.A.pagination,
                                    align: { default: "alignRight" },
                                    children: (0, W.jsx)(A.pb, {
                                      count: Le.length,
                                      params: Ce,
                                      onChange: Se,
                                      isTop: !0,
                                    }),
                                  }),
                                ],
                              }),
                            }),
                            (0, W.jsxs)(w.i, {
                              isExpandable: !0,
                              children: [
                                (0, W.jsx)(P.h, {
                                  children: (0, W.jsxs)(I.Tr, {
                                    children: [
                                      (0, W.jsx)(L.Th, {}),
                                      (0, W.jsx)(L.Th, {
                                        width: 35,
                                        sort: {
                                          columnIndex: 1,
                                          sortBy: { ...ke },
                                          onSort: we,
                                        },
                                        children: "Issue",
                                      }),
                                      (0, W.jsx)(L.Th, {
                                        width: 10,
                                        children: "Category",
                                      }),
                                      (0, W.jsx)(L.Th, {
                                        width: 10,
                                        modifier: "wrap",
                                        children: "Source",
                                      }),
                                      (0, W.jsx)(L.Th, {
                                        width: 10,
                                        modifier: "wrap",
                                        children: "Target",
                                      }),
                                      (0, W.jsx)(L.Th, {
                                        width: 15,
                                        modifier: "truncate",
                                        children: "Effort",
                                      }),
                                      (0, W.jsx)(L.Th, {
                                        width: 10,
                                        sort: {
                                          columnIndex: 6,
                                          sortBy: { ...ke },
                                          onSort: we,
                                        },
                                        children: "Total incidents",
                                      }),
                                      (0, W.jsx)(L.Th, {
                                        width: 10,
                                        sort: {
                                          columnIndex: 7,
                                          sortBy: { ...ke },
                                          onSort: we,
                                        },
                                        children: "Total effort",
                                      }),
                                    ],
                                  }),
                                }),
                                (0, W.jsx)(A.hp, {
                                  isNoData: 0 === Le.length,
                                  numRenderedColumns: 10,
                                  children:
                                    null === Ie || void 0 === Ie
                                      ? void 0
                                      : Ie.map((e, t) => {
                                          var n, r;
                                          return (0, W.jsxs)(
                                            N.p,
                                            {
                                              isExpanded: Te(e),
                                              children: [
                                                (0, W.jsxs)(I.Tr, {
                                                  children: [
                                                    (0, W.jsx)(F.Td, {
                                                      expand: {
                                                        rowIndex: t,
                                                        isExpanded: Te(e),
                                                        onToggle: () => be(e),
                                                      },
                                                    }),
                                                    (0, W.jsx)(F.Td, {
                                                      children: e.name,
                                                    }),
                                                    (0, W.jsx)(F.Td, {
                                                      children: e.category,
                                                    }),
                                                    (0, W.jsx)(F.Td, {
                                                      children: (0, W.jsx)(
                                                        v.P,
                                                        {
                                                          hasGutter: !0,
                                                          children:
                                                            null ===
                                                              (n =
                                                                e.sourceTechnologies) ||
                                                            void 0 === n
                                                              ? void 0
                                                              : n.map((e) =>
                                                                  (0, W.jsx)(
                                                                    j.J,
                                                                    {
                                                                      children:
                                                                        (0,
                                                                        W.jsx)(
                                                                          y._,
                                                                          {
                                                                            isCompact:
                                                                              !0,
                                                                            color:
                                                                              "blue",
                                                                            children:
                                                                              e,
                                                                          },
                                                                        ),
                                                                    },
                                                                    e,
                                                                  ),
                                                                ),
                                                        },
                                                      ),
                                                    }),
                                                    (0, W.jsx)(F.Td, {
                                                      children: (0, W.jsx)(
                                                        v.P,
                                                        {
                                                          hasGutter: !0,
                                                          children:
                                                            null ===
                                                              (r =
                                                                e.targetTechnologies) ||
                                                            void 0 === r
                                                              ? void 0
                                                              : r.map((e) =>
                                                                  (0, W.jsx)(
                                                                    j.J,
                                                                    {
                                                                      children:
                                                                        (0,
                                                                        W.jsx)(
                                                                          y._,
                                                                          {
                                                                            isCompact:
                                                                              !0,
                                                                            color:
                                                                              "blue",
                                                                            children:
                                                                              e,
                                                                          },
                                                                        ),
                                                                    },
                                                                    e,
                                                                  ),
                                                                ),
                                                        },
                                                      ),
                                                    }),
                                                    (0, W.jsx)(F.Td, {
                                                      children:
                                                        e.effort.toString(),
                                                    }),
                                                    (0, W.jsx)(F.Td, {
                                                      children:
                                                        e.totalIncidents,
                                                    }),
                                                    (0, W.jsx)(F.Td, {
                                                      children: e.totalEffort,
                                                    }),
                                                  ],
                                                }),
                                                Te(e)
                                                  ? (0, W.jsx)(I.Tr, {
                                                      isExpanded: !0,
                                                      children: (0, W.jsx)(
                                                        F.Td,
                                                        {
                                                          colSpan: 9,
                                                          children: (0, W.jsx)(
                                                            "div",
                                                            {
                                                              className:
                                                                "pf-v5-u-m-sm",
                                                              children: (0,
                                                              W.jsx)(X, {
                                                                issue: e,
                                                                onShowFile: (
                                                                  e,
                                                                  t,
                                                                ) => {
                                                                  xe(
                                                                    "showFile",
                                                                    {
                                                                      file: e,
                                                                      issue: t,
                                                                    },
                                                                  ),
                                                                    q(e);
                                                                },
                                                              }),
                                                            },
                                                          ),
                                                        },
                                                      ),
                                                    })
                                                  : null,
                                              ],
                                            },
                                            t,
                                          );
                                        }),
                                }),
                              ],
                            }),
                            (0, W.jsx)(A.pb, {
                              count: Le.length,
                              params: Ce,
                              onChange: Se,
                            }),
                          ],
                        }),
                }),
                (0, W.jsx)(f.u, {
                  title: "File ".concat(
                    (null === ge ||
                    void 0 === ge ||
                    null === (H = ge.file) ||
                    void 0 === H
                      ? void 0
                      : H.name) || "",
                  ),
                  isOpen: ue && "showFile" === pe,
                  onClose: me,
                  variant: "default",
                  position: "top",
                  disableFocusTrap: !0,
                  actions: [
                    (0, W.jsx)(
                      T.zx,
                      { variant: "primary", onClick: me, children: "Close" },
                      "close",
                    ),
                  ],
                  children:
                    Object.keys(
                      (null === ge ||
                      void 0 === ge ||
                      null === (z = ge.file) ||
                      void 0 === z
                        ? void 0
                        : z.incidents) || {},
                    ).length > 1
                      ? (0, W.jsx)(b.m, {
                          activeKey: J,
                          onSelect: (e, t) => K(t),
                          children: Object.values(
                            (null === ge ||
                            void 0 === ge ||
                            null === (Z = ge.file) ||
                            void 0 === Z
                              ? void 0
                              : Z.incidents) || {},
                          ).flatMap((e, t) =>
                            (0, W.jsx)(
                              C.O,
                              {
                                eventKey: t,
                                title: "Line #"
                                  .concat(
                                    null === ge || void 0 === ge
                                      ? void 0
                                      : ge.file.ranges[2 * t],
                                    " - #",
                                  )
                                  .concat(
                                    null === ge || void 0 === ge
                                      ? void 0
                                      : ge.file.ranges[2 * t + 1],
                                  ),
                                children:
                                  J === t
                                    ? (0, W.jsx)(A.Mm, {
                                        name:
                                          (null === ge || void 0 === ge
                                            ? void 0
                                            : ge.file.name) || "",
                                        displayName:
                                          (null === ge || void 0 === ge
                                            ? void 0
                                            : ge.file.displayName) || "",
                                        codeSnip: Y,
                                        isLoading: Q.isLoading || Q.isFetching,
                                        issue:
                                          (null === ge || void 0 === ge
                                            ? void 0
                                            : ge.issue) || {},
                                        incidents: e,
                                      })
                                    : null,
                              },
                              t,
                            ),
                          ),
                        })
                      : (0, W.jsx)(A.Mm, {
                          name:
                            (null === ge || void 0 === ge
                              ? void 0
                              : ge.file.name) || "",
                          displayName:
                            (null === ge || void 0 === ge
                              ? void 0
                              : ge.file.displayName) || "",
                          codeSnip: Y,
                          isLoading: Q.isLoading || Q.isFetching,
                          issue:
                            (null === ge || void 0 === ge
                              ? void 0
                              : ge.issue) || {},
                          incidents:
                            (null === ge ||
                            void 0 === ge ||
                            null === (U = ge.file) ||
                            void 0 === U
                              ? void 0
                              : U.incidents[0]) || [],
                        }),
                }),
              ],
            })
          );
        };
    },
    76413: (e, t, n) => {
      n.d(t, {
        QM: () => f,
        dd: () => c,
        x6: () => h,
        HL: () => m,
        Sm: () => j,
      });
      var r = n(72791),
        a = n(24334);
      const l = (0, a.createAction)("useModal/action/openModalWithData")(),
        o = (0, a.createAction)("useModal/action/startClose")(),
        i = { action: void 0, data: void 0, isOpen: !1 },
        s = (e, t) => {
          switch (t.type) {
            case (0, a.getType)(l):
              return {
                ...e,
                action: t.payload.action,
                data: t.payload.data,
                isOpen: !0,
              };
            case (0, a.getType)(o):
              return { ...e, action: void 0, data: void 0, isOpen: !1 };
            default:
              return e;
          }
        },
        c = () => {
          const [e, t] = (0, r.useReducer)(s, { ...i }),
            n = (0, r.useCallback)((e, n) => {
              t(l({ action: e, data: n }));
            }, []),
            a = (0, r.useCallback)(() => {
              t(o());
            }, []);
          return {
            action: e.action,
            data: e.data,
            isOpen: e.isOpen,
            open: n,
            close: a,
            isAction: (t) => e.action === t,
          };
        };
      var d = n(28035);
      const h = (e) => {
          let {
            items: t,
            currentSortBy: n,
            currentPage: a,
            filterItem: l,
            compareToByColumn: o,
          } = e;
          return (0, r.useMemo)(() => {
            const e = [...(t || [])].filter(l);
            let r,
              i = !1;
            (r = [...e].sort((e, t) => {
              const r = o(e, t, null === n || void 0 === n ? void 0 : n.index);
              return 0 !== r && (i = !0), r;
            })),
              i &&
                (null === n || void 0 === n ? void 0 : n.direction) ===
                  d.B.desc &&
                (r = r.reverse());
            return {
              pageItems: r.slice((a.page - 1) * a.perPage, a.page * a.perPage),
              filteredItems: e,
            };
          }, [t, a, n, o, l]);
        },
        g = (0, a.createAction)("useTableControls/pagination/change")(),
        u = (0, a.createAction)("useTableControls/sortBy/change")(),
        p = {
          changed: !1,
          currentPage: { page: 1, perPage: 10 },
          sortBy: void 0,
        },
        x = (e, t) => {
          switch (t.type) {
            case (0, a.getType)(g):
              return {
                ...e,
                changed: !0,
                currentPage: {
                  page: t.payload.page,
                  perPage: t.payload.perPage,
                },
              };
            case (0, a.getType)(u):
              return {
                ...e,
                changed: !0,
                sortBy: {
                  index: t.payload.index,
                  direction: t.payload.direction,
                },
              };
            default:
              return e;
          }
        },
        m = (e) => {
          const [t, n] = (0, r.useReducer)(x, {
              ...p,
              currentPage: e && e.page ? { ...e.page } : { ...p.currentPage },
              sortBy: e && e.sortBy ? { ...e.sortBy } : p.sortBy,
            }),
            a = (0, r.useCallback)((e) => {
              var t;
              n(
                g({
                  page: e.page >= 1 ? e.page : 1,
                  perPage:
                    null !== (t = e.perPage) && void 0 !== t
                      ? t
                      : p.currentPage.perPage,
                }),
              );
            }, []),
            l = (0, r.useCallback)((e, t, r, a) => {
              n(u({ index: t, direction: r }));
            }, []);
          return {
            page: t.currentPage,
            sortBy: t.sortBy,
            changePage: a,
            changeSortBy: l,
          };
        },
        v = (e) => ("string" === typeof e ? e : e.key),
        j = function () {
          let e =
            arguments.length > 0 && void 0 !== arguments[0]
              ? arguments[0]
              : new Map();
          const [t, n] = (0, r.useState)(e),
            a =
              Array.from(t.values()).reduce((e, t) => [...e, ...t], []).length >
              0;
          return {
            filters: t,
            isPresent: a,
            addFilter: (e, t) => {
              n((n) => {
                const r = n.get(e) || [];
                return new Map(n).set(e, [...r, t]);
              });
            },
            setFilter: (e, t) => {
              n((n) => new Map(n).set(e, t));
            },
            removeFilter: (e, t) => {
              n((n) => {
                let r;
                r = Array.isArray(t) ? [...t] : [t];
                const a = (n.get(e) || []).filter((e) => {
                  const t = v(e);
                  return !r.some((e) => {
                    const n = v(e);
                    return t === n;
                  });
                });
                return new Map(n).set(e, a);
              });
            },
            clearAllFilters: () => {
              n((e) => {
                const t = new Map(e);
                return (
                  Array.from(t.keys()).forEach((e) => {
                    t.set(e, []);
                  }),
                  t
                );
              });
            },
          };
        },
        y = { isSelected: !1 },
        f = (e) => {
          let { rows: t, columns: n } = e;
          const [a, l] = (0, r.useState)(new Map()),
            o = (e, t) => {
              var n;
              const r =
                null === (n = a.get(e)) || void 0 === n ? void 0 : n.get(t);
              return !!r && r.isSelected;
            };
          return {
            isCellSelected: o,
            isSomeCellSelected: (e, t) =>
              t.some((t) => {
                var n;
                return null === (n = a.get(e)) || void 0 === n
                  ? void 0
                  : n.get(t);
              }),
            toggleCellSelected: function (e, t) {
              let n =
                arguments.length > 2 && void 0 !== arguments[2]
                  ? arguments[2]
                  : !o(e, t);
              const r = (a.get(e) || new Map()).get(t) || { ...y },
                i = new Map().set(t, { ...r, isSelected: n }),
                s = new Map(a).set(e, i);
              l(s);
            },
          };
        };
    },
    68418: (e, t, n) => {
      n.d(t, { O: () => r, f: () => a });
      const r = (e, t) =>
          [
            e,
            (t || [])
              .map((e, t) =>
                ""
                  .concat(t + 1, ". [")
                  .concat(e.title, "](")
                  .concat(e.url, ")"),
              )
              .join("\n"),
          ].join("\n"),
        a = (e) => (e ? e.charAt(0).toUpperCase() + e.slice(1) : e);
    },
  },
]);
//# sourceMappingURL=608.7e524485.chunk.js.map
