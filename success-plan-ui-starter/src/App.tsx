import React, { useState } from 'react'
import { Calendar, Clock, FileDown, Share2, Search, Filter, ChevronDown, CheckCircle2, TriangleAlert, Users, Building2, Sparkles, MoreVertical } from 'lucide-react'

function StatusChip({ status }: { status: 'on-track' | 'attention' | 'risk' }) {
  const map = {
    'on-track': { text: 'On track', cls: 'bg-emerald-100 text-emerald-700 border-emerald-200' },
    'attention': { text: 'Needs attention', cls: 'bg-amber-100 text-amber-700 border-amber-200' },
    'risk': { text: 'At risk', cls: 'bg-rose-100 text-rose-700 border-rose-200' },
  } as const
  const m = map[status]
  const Icon = status === 'on-track' ? CheckCircle2 : TriangleAlert
  return (
    <span className={`inline-flex items-center gap-1 rounded-full border px-2.5 py-1 text-xs ${m.cls}`}>
      <Icon className="h-3.5 w-3.5" />
      {m.text}
    </span>
  )
}

function Sparkline() {
  return (
    <svg viewBox="0 0 100 30" className="h-6 w-full text-neutral-700">
      <polyline fill="none" stroke="currentColor" strokeWidth="2"
        points="0,20 15,15 30,18 45,10 60,12 75,8 90,12 100,9" className="opacity-70" />
    </svg>
  )
}

export default function App() {
  const [externalView, setExternalView] = useState(false)
  const [health, setHealth] = useState<'on-track'|'attention'|'risk'>('on-track')

  return (
    <div className="min-h-screen bg-neutral-50 text-neutral-900">
      {/* Top bar */}
      <div className="sticky top-0 z-30 border-b bg-white/80 backdrop-blur">
        <div className="mx-auto flex max-w-[1200px] items-center justify-between gap-4 px-6 py-3">
          <div className="flex items-center gap-3 text-sm text-neutral-600">
            <span className="text-neutral-400">Customers</span>
            <span>/</span>
            <span>Acme Corp</span>
            <span>/</span>
            <span className="font-medium text-neutral-900">Success Plan</span>
          </div>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5">
              <span className="text-xs text-neutral-600">External view</span>
              <input type="checkbox" className="h-4 w-4" checked={externalView} onChange={(e)=>setExternalView(e.target.checked)} />
            </label>
            <button className="inline-flex items-center gap-2 rounded-full border border-neutral-200 bg-white px-3 py-1.5 text-sm"><Share2 className="h-4 w-4"/>Share</button>
            <div className="flex items-center gap-1">
              <button className="inline-flex items-center gap-2 rounded-full bg-neutral-900 px-4 py-2 text-sm text-white"><FileDown className="h-4 w-4"/>Export</button>
              <button className="h-9 w-9 rounded-full border border-neutral-200 bg-white"><ChevronDown className="mx-auto h-4 w-4"/></button>
            </div>
          </div>
        </div>
      </div>

      {/* Meta header */}
      <div className="mx-auto max-w-[1200px] px-6 pt-6">
        <div className="grid grid-cols-12 gap-6">
          <div className="col-span-12 xl:col-span-8">
            <div className="rounded-2xl border border-neutral-200 bg-white">
              <div className="flex items-center justify-between p-5 pb-2">
                <span className="text-2xl">Acme – FY25 Success Plan</span>
                <div className="flex items-center gap-3 text-sm text-neutral-600">
                  <Calendar className="h-4 w-4" />
                  Next review: Sep 30, 2025
                  <span className="mx-2 inline-block h-4 w-px bg-neutral-200" />
                  <Clock className="h-4 w-4" />
                  Last updated: Aug 15, 2025
                </div>
              </div>
              <div className="grid grid-cols-1 gap-4 p-5 pt-0 md:grid-cols-3">
                <div className="rounded-xl border border-neutral-200 p-4">
                  <div className="flex items-center gap-2 text-sm text-neutral-600"><Users className="h-4 w-4"/>Owner</div>
                  <div className="mt-1 font-medium">Jordan Lee</div>
                </div>
                <div className="rounded-xl border border-neutral-200 p-4">
                  <div className="flex items-center gap-2 text-sm text-neutral-600"><Building2 className="h-4 w-4"/>Segment</div>
                  <div className="mt-1 font-medium">Enterprise • Retail</div>
                </div>
                <div className="rounded-xl border border-neutral-200 p-4">
                  <div className="flex items-center gap-2 text-sm text-neutral-600"><Sparkles className="h-4 w-4"/>Health</div>
                  <div className="mt-2 grid grid-cols-3 gap-2 text-sm">
                    {(['on-track','attention','risk'] as const).map(s => (
                      <label key={s} className={`cursor-pointer rounded-md border px-2 py-1.5 text-center ${health===s? 'border-emerald-300 bg-emerald-50' : 'border-neutral-200 bg-white'}`}>
                        <input type="radio" className="hidden" name="health" value={s} checked={health===s} onChange={()=>setHealth(s)} />
                        {s==='on-track'?'On track': s==='attention'?'Needs attention':'At risk'}
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="col-span-12 xl:col-span-4">
            <div className="rounded-2xl border border-neutral-200 bg-white">
              <div className="p-5 pb-2 text-lg">Change summary</div>
              <div className="flex flex-wrap gap-2 p-5 pt-0 text-sm">
                <span className="rounded-full border border-emerald-200 bg-emerald-50 px-3 py-1 text-emerald-700">+3 objectives completed</span>
                <span className="rounded-full border border-amber-200 bg-amber-50 px-3 py-1 text-amber-700">1 risk added</span>
                <span className="rounded-full border border-blue-200 bg-blue-50 px-3 py-1 text-blue-700">2 KPIs updated</span>
                <div className="mt-2 w-full text-xs text-neutral-500">Since last export • Last exported Aug 10, 2025</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main */}
      <div className="mx-auto max-w-[1200px] px-6 py-6">
        <div className="grid grid-cols-12 gap-6">
          {/* Left pane */}
          <div className="col-span-12 space-y-6 xl:col-span-7">
            <div className="rounded-2xl border border-neutral-200 bg-white">
              <div className="flex items-center justify-between p-5 pb-3">
                <div className="text-lg">Objectives</div>
                <div className="flex items-center gap-2">
                  <div className="relative">
                    <Search className="pointer-events-none absolute left-2 top-2.5 h-4 w-4 text-neutral-400"/>
                    <input placeholder="Search" className="w-40 rounded-md border border-neutral-200 bg-white py-2 pl-8 pr-3 text-sm outline-none focus:ring-2 focus:ring-neutral-300"/>
                  </div>
                  <select className="w-36 rounded-md border border-neutral-200 bg-white px-2 py-2 text-sm">
                    <option>Any owner</option>
                    <option>Jordan Lee</option>
                    <option>Kai Sun</option>
                  </select>
                  <select className="w-36 rounded-md border border-neutral-200 bg-white px-2 py-2 text-sm">
                    <option>All</option>
                    <option>On track</option>
                    <option>Needs attention</option>
                    <option>At risk</option>
                  </select>
                  <button className="inline-flex items-center gap-2 rounded-md border border-neutral-200 bg-white px-3 py-2 text-sm"><Filter className="h-4 w-4"/>Filters</button>
                  <button className="rounded-full bg-neutral-900 px-4 py-2 text-sm text-white">Add objective</button>
                </div>
              </div>
              <div className="px-5 pb-5">
                <div className="w-full overflow-x-auto">
                  <table className="w-full text-left text-sm">
                    <thead className="text-neutral-500">
                      <tr className="border-b border-neutral-200">
                        <th className="w-[36px] p-2"><input type="checkbox" /></th>
                        <th className="p-2">Objective</th>
                        <th className="w-[120px] p-2">Owner</th>
                        <th className="w-[120px] p-2">Due</th>
                        <th className="w-[160px] p-2">Status</th>
                        <th className="w-[140px] p-2">Progress</th>
                        <th className="w-[40px] p-2"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {[1,2,3].map(i=> (
                        <tr key={i} className="border-b border-neutral-100 hover:bg-neutral-50">
                          <td className="p-2 align-top"><input type="checkbox" /></td>
                          <td className="p-2 align-top">
                            Launch self-serve onboarding flow
                            <div className="mt-1 text-xs text-neutral-500">KPIs: Activation <span className="font-medium text-neutral-700">+12%</span> • Time-to-value <span className="font-medium text-neutral-700">-20%</span></div>
                          </td>
                          <td className="p-2 align-top">
                            <div className="flex items-center gap-2">
                              <div className="flex h-6 w-6 items-center justify-center rounded-full bg-neutral-200 text-[10px]">JL</div>
                              <span>Jordan</span>
                            </div>
                          </td>
                          <td className="p-2 align-top">Oct 15</td>
                          <td className="p-2 align-top"><StatusChip status={i===3?'attention':'on-track'} /></td>
                          <td className="p-2 align-top">
                            <div className="flex items-center gap-2">
                              <div className="h-2 w-24 overflow-hidden rounded-full bg-neutral-200">
                                <div className="h-2 bg-neutral-900" style={{ width: i===1?'62%': i===2?'35%':'78%' }} />
                              </div>
                              <span className="text-xs text-neutral-600">{i===1?'62%': i===2?'35%':'78%'}</span>
                            </div>
                          </td>
                          <td className="p-2 align-top">
                            <button className="h-8 w-8 rounded-md hover:bg-neutral-100"><MoreVertical className="mx-auto h-4 w-4"/></button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-neutral-200 bg-white">
              <div className="p-5 pb-2 text-lg">Completed</div>
              <div className="space-y-3 p-5 pt-0 text-sm">
                <div className="flex items-center justify-between rounded-xl border border-neutral-200 p-3">
                  <div>
                    Migrate analytics to v2 pipelines
                    <div className="text-xs text-neutral-500">Completed Aug 12 • Owner: Kai Sun</div>
                  </div>
                  <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700">98% adoption</span>
                </div>
                <div className="flex items-center justify-between rounded-xl border border-neutral-200 p-3">
                  <div>
                    Roll out SSO to all workspaces
                    <div className="text-xs text-neutral-500">Completed Aug 02 • Owner: Jordan Lee</div>
                  </div>
                  <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700">Security</span>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
              <div className="rounded-2xl border border-neutral-200 bg-white">
                <div className="p-5 pb-2 text-lg">Mission summary</div>
                <div className="p-5 pt-0 text-sm text-neutral-700">
                  Drive activation and value realization for the Acme Retail division to support FY25 revenue targets and reduce onboarding time.
                </div>
              </div>
              <div className="rounded-2xl border border-neutral-200 bg-white">
                <div className="p-5 pb-2 text-lg">Value realized</div>
                <div className="grid grid-cols-2 gap-3 p-5 pt-0 text-sm">
                  <div className="rounded-xl border border-neutral-200 p-3">
                    <div className="text-neutral-500">Activation rate</div>
                    <div className="mt-1 text-xl font-semibold">+14%</div>
                    <Sparkline />
                  </div>
                  <div className="rounded-xl border border-neutral-200 p-3">
                    <div className="text-neutral-500">Time-to-value</div>
                    <div className="mt-1 text-xl font-semibold">-19%</div>
                    <Sparkline />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right pane */}
          <div className="col-span-12 xl:col-span-5">
            <div className="rounded-2xl border border-neutral-200 bg-white">
              <div className="p-5 pb-3 text-lg">Details</div>

              {/* Tabs */}
              <Tabs />
            </div>

            {/* Export panel (static preview) */}
            <div className="mt-6 rounded-2xl border border-neutral-200 bg-white">
              <div className="flex items-center justify-between p-5 pb-3 text-lg">
                <span>Report builder</span>
                <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700">Preview</span>
              </div>
              <div className="grid grid-cols-1 gap-4 p-5 pt-0 md:grid-cols-2">
                <div className="space-y-3">
                  <div className="rounded-xl border border-neutral-200 p-3">
                    <div className="text-sm">Preset</div>
                    <select className="mt-1 w-full rounded-md border border-neutral-200 bg-white px-2 py-2 text-sm">
                      <option>QBR</option>
                      <option>EBR</option>
                      <option>Implementation</option>
                    </select>
                  </div>
                  <div className="rounded-xl border border-neutral-200 p-3">
                    <div className="text-sm">Include sections</div>
                    <div className="mt-2 space-y-2 text-sm">
                      {['Cover page','Executive summary','Objectives','KPI snapshot','Timeline','Risks','Next steps','Appendix'].map(s => (
                        <label key={s} className="flex items-center gap-2">
                          <input type="checkbox" />
                          <span>{s}</span>
                        </label>
                      ))}
                    </div>
                  </div>
                  <div className="rounded-xl border border-neutral-200 p-3">
                    <label className="flex items-center justify-between">
                      <span className="text-sm">Redact internal notes</span>
                      <input type="checkbox" />
                    </label>
                  </div>
                  <button className="w-full rounded-md bg-neutral-900 px-4 py-2 text-sm text-white">Export PDF</button>
                </div>
                <div className="rounded-xl border border-neutral-200 p-4">
                  <div className="text-sm text-neutral-600">PDF preview</div>
                  <div className="mt-2 space-y-3 rounded-xl border border-neutral-200 bg-white p-4">
                    <div className="h-8 w-3/4 rounded bg-neutral-100"></div>
                    <div className="space-y-2">
                      {[1,2,3,4,5].map(i=> <div key={i} className="h-3 w-full rounded bg-neutral-100"></div>) }
                    </div>
                    <div className="my-2 h-px bg-neutral-200"></div>
                    <div className="grid grid-cols-2 gap-2">
                      {[1,2,3,4].map(i=> <div key={i} className="h-16 rounded bg-neutral-100"></div>) }
                    </div>
                    <div className="my-2 h-px bg-neutral-200"></div>
                    <div className="space-y-2">
                      {[1,2,3].map(i=> <div key={i} className="h-3 w-5/6 rounded bg-neutral-100"></div>) }
                    </div>
                    <div className="mt-4 text-right text-xs text-neutral-500">Page 1</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <footer className="mx-auto max-w-[1200px] px-6 py-10 text-xs text-neutral-500">
        Static preview • Vite + React + Tailwind
      </footer>
    </div>
  )
}

function Tabs() {
  const [tab, setTab] = useState<'overview'|'kpis'|'timeline'|'risks'|'history'>('overview')
  return (
    <div className="p-5 pt-0">
      <div className="grid w-full grid-cols-5 gap-1 rounded-xl bg-neutral-100 p-1 text-sm">
        {['overview','kpis','timeline','risks','history'].map(t => (
          <button key={t}
            onClick={()=>setTab(t as any)}
            className={`rounded-lg px-3 py-2 capitalize ${tab===t? 'bg-white shadow-sm' : 'text-neutral-600'}`}>
            {t}
          </button>
        ))}
      </div>

      {tab==='overview' && (
        <div className="mt-4 space-y-4">
          <div className="rounded-xl border border-neutral-200 p-4">
            <div className="text-sm text-neutral-600">Stakeholders</div>
            <div className="mt-2 space-y-3">
              {[
                { n: 'Evelyn Chen', r: 'VP Product', i: 'R' },
                { n: 'Mark Patel', r: 'Head of Data', i: 'A' },
                { n: 'Sofia Gomez', r: 'Program Manager', i: 'C' },
              ].map(s => (
                <div key={s.n} className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-7 w-7 items-center justify-center rounded-full bg-neutral-200 text-[10px]">
                      {s.n.split(' ').map(x=>x[0]).join('')}
                    </div>
                    <div>
                      <div className="text-sm font-medium">{s.n}</div>
                      <div className="text-xs text-neutral-500">{s.r}</div>
                    </div>
                  </div>
                  <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700">RACI: {s.i}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 p-4">
            <div className="text-sm text-neutral-600">Products in scope</div>
            <div className="mt-2 flex flex-wrap gap-2">
              {['Core Platform','Automation','Analytics','Integrations'].map(p => (
                <span key={p} className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs text-neutral-700">{p}</span>
              ))}
            </div>
          </div>

          <div className="rounded-xl border border-neutral-200 p-4">
            <div className="text-sm text-neutral-600">Next steps</div>
            <ol className="mt-2 list-decimal space-y-1 pl-5 text-sm">
              <li>Finalize onboarding KPI targets</li>
              <li>Confirm GTM launch timeline with Product</li>
              <li>Schedule QBR week of Oct 7</li>
            </ol>
          </div>
        </div>
      )}

      {tab==='kpis' && (
        <div className="mt-4 grid grid-cols-2 gap-4">
          {[
            { k: 'Activation', t: 65, a: 51 },
            { k: 'Time-to-value (days)', t: 14, a: 17 },
            { k: 'Weekly active', t: 1200, a: 980 },
            { k: 'CSAT', t: 4.6, a: 4.3 },
          ].map(({k,t,a}) => (
            <div key={k} className="rounded-xl border border-neutral-200 p-4">
              <div className="text-sm text-neutral-600">{k}</div>
              <div className="mt-1 flex items-end justify-between">
                <div className="text-2xl font-semibold">{String(a)}</div>
                <div className="text-sm text-neutral-500">Target {String(t)}</div>
              </div>
              <div className="mt-2 h-2 w-full overflow-hidden rounded-full bg-neutral-200">
                <div className="h-2 bg-neutral-900" style={{ width: `${Math.min(100, (a/t)*100)}%` }} />
              </div>
            </div>
          ))}
        </div>
      )}

      {tab==='timeline' && (
        <div className="mt-4 space-y-3">
          {['Jul 22','Aug 02','Aug 12','Aug 15'].map((d,i) => (
            <div key={d} className="flex items-start gap-3">
              <div className="mt-1 h-2 w-2 rounded-full bg-neutral-400" />
              <div className="flex-1 rounded-xl border border-neutral-200 p-3 text-sm">
                <div className="text-neutral-500">{d}</div>
                <div className="mt-1">Milestone {i+1} updated by Jordan Lee</div>
              </div>
            </div>
          ))}
        </div>
      )}

      {tab==='risks' && (
        <div className="mt-4 space-y-3">
          <div className="rounded-xl border border-neutral-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                Data integration dependency with vendor X
                <div className="text-xs text-neutral-500">Mitigation: weekly sync • Owner: Evelyn</div>
              </div>
              <StatusChip status="attention" />
            </div>
          </div>
          <div className="rounded-xl border border-neutral-200 p-4">
            <div className="flex items-center justify-between">
              <div>
                Adoption below target in EMEA
                <div className="text-xs text-neutral-500">Mitigation: enablement plan • Owner: Sofia</div>
              </div>
              <StatusChip status="risk" />
            </div>
          </div>
        </div>
      )}

      {tab==='history' && (
        <div className="mt-4 space-y-2 text-sm">
          <div>Aug 15 • Objective "SSO rollout" marked complete by Jordan</div>
          <div>Aug 12 • KPI "Activation" updated 49 → 51 by Kai</div>
          <div>Aug 02 • Risk "Integration dependency" added by Evelyn</div>
        </div>
      )}
    </div>
  )
}
