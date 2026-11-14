'use client';

import React, { useState } from 'react';
import SectionLabel from '@/components/ui/SectionLabel';
import Link from 'next/link';
import {
  Folder,
  FolderOpen,
  FileText,
  FileCode,
  Terminal,
  CheckCircle2,
  Copy,
  ExternalLink,
  ChevronRight,
  Code2,
  Eye,
  Layers,
} from 'lucide-react';
import { signatureEvents } from '@/data/events';
import { teamData } from '@/data/team';
import { milestonesTimeline } from '@/data/achievements';
import { resourcesList } from '@/data/resources';

type FileKey =
  | 'readme'
  | 'events-brand-battle'
  | 'events-e-summit'
  | 'initiatives-seed-fund'
  | 'team-leadership'
  | 'achievements-milestones'
  | 'resources-playbook';

export default function EcosystemExplorer() {
  const [activeFile, setActiveFile] = useState<FileKey>('readme');
  const [activeTab, setActiveTab] = useState<'preview' | 'data' | 'schema'>('preview');
  const [copied, setCopied] = useState(false);

  const fileTree = [
    {
      folder: 'ecell-mitaoe',
      isOpen: true,
      children: [
        { key: 'readme', name: 'README.md', type: 'doc' },
        {
          folder: 'events',
          isOpen: true,
          children: [
            { key: 'events-brand-battle', name: 'brand-battle.ts', type: 'code' },
            { key: 'events-e-summit', name: 'e-summit-2026.ts', type: 'code' },
          ],
        },
        {
          folder: 'initiatives',
          isOpen: true,
          children: [
            { key: 'initiatives-seed-fund', name: 'ciie-seed-grant.md', type: 'doc' },
          ],
        },
        {
          folder: 'team',
          isOpen: true,
          children: [
            { key: 'team-leadership', name: 'roster-2026.json', type: 'code' },
          ],
        },
        {
          folder: 'achievements',
          isOpen: true,
          children: [
            { key: 'achievements-milestones', name: 'milestones.log', type: 'doc' },
          ],
        },
        {
          folder: 'resources',
          isOpen: true,
          children: [
            { key: 'resources-playbook', name: 'founder-playbook.json', type: 'code' },
          ],
        },
      ],
    },
  ];

  const handleCopy = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <section className="py-20 sm:py-28 bg-canvas-dark text-white border-b border-white/10 relative overflow-hidden">
      {/* Background Grid */}
      <div className="absolute inset-0 bg-grid-blueprint-dark opacity-30 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <SectionLabel number="003" label="ECOSYSTEM EXPLORER" dark className="mb-3" />
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-display text-white tracking-tight">
              Interactive E-Cell repository. <br />
              <span className="font-serif italic font-normal text-slate-300">
                Inspect our architecture and verified data in real time.
              </span>
            </h2>
          </div>
          <p className="text-slate-400 text-xs sm:text-sm max-w-md font-mono leading-relaxed">
            Click any file node to inspect live data records, event parameters, and venture metrics powering the chapter.
          </p>
        </div>

        {/* The IDE Container */}
        <div className="rounded-2xl border border-white/15 bg-canvas-pitch shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 min-h-[580px]">
          {/* Column 1: File Explorer Sidebar (3 cols) */}
          <div className="lg:col-span-3 border-b lg:border-b-0 lg:border-r border-white/10 bg-canvas-dark/95 p-4 font-mono text-xs">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4 text-slate-400 uppercase tracking-widest text-[10px]">
              <span>EXPLORER // V1.0</span>
              <span className="w-2 h-2 rounded-full bg-forest animate-pulse" />
            </div>

            <div className="space-y-1.5 select-none">
              <div className="flex items-center gap-1.5 text-slate-300 font-semibold mb-2">
                <FolderOpen className="w-3.5 h-3.5 text-accent-yellow" />
                <span>ecell-mitaoe/</span>
              </div>

              {/* Readme */}
              <button
                onClick={() => setActiveFile('readme')}
                className={`w-full text-left pl-6 py-1.5 rounded-lg flex items-center gap-2 transition-colors ${
                  activeFile === 'readme'
                    ? 'bg-white/15 text-white font-semibold'
                    : 'text-slate-400 hover:text-white hover:bg-white/5'
                }`}
              >
                <FileText className="w-3.5 h-3.5 text-accent-sky" />
                <span>README.md</span>
              </button>

              {/* Events Folder */}
              <div className="pl-3 space-y-1 pt-1">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
                  <Folder className="w-3.5 h-3.5 text-slate-400" />
                  <span>events/</span>
                </div>
                <div className="pl-4 space-y-1">
                  <button
                    onClick={() => setActiveFile('events-brand-battle')}
                    className={`w-full text-left py-1 px-2 rounded flex items-center gap-2 transition-colors ${
                      activeFile === 'events-brand-battle'
                        ? 'bg-white/15 text-white font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileCode className="w-3 h-3 text-accent-orange" />
                    <span>brand-battle.ts</span>
                  </button>
                  <button
                    onClick={() => setActiveFile('events-e-summit')}
                    className={`w-full text-left py-1 px-2 rounded flex items-center gap-2 transition-colors ${
                      activeFile === 'events-e-summit'
                        ? 'bg-white/15 text-white font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileCode className="w-3 h-3 text-accent-orange" />
                    <span>e-summit-2026.ts</span>
                  </button>
                </div>
              </div>

              {/* Initiatives Folder */}
              <div className="pl-3 space-y-1 pt-1">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
                  <Folder className="w-3.5 h-3.5 text-slate-400" />
                  <span>initiatives/</span>
                </div>
                <div className="pl-4 space-y-1">
                  <button
                    onClick={() => setActiveFile('initiatives-seed-fund')}
                    className={`w-full text-left py-1 px-2 rounded flex items-center gap-2 transition-colors ${
                      activeFile === 'initiatives-seed-fund'
                        ? 'bg-white/15 text-white font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-3 h-3 text-forest-light" />
                    <span>ciie-seed-grant.md</span>
                  </button>
                </div>
              </div>

              {/* Team Folder */}
              <div className="pl-3 space-y-1 pt-1">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
                  <Folder className="w-3.5 h-3.5 text-slate-400" />
                  <span>team/</span>
                </div>
                <div className="pl-4 space-y-1">
                  <button
                    onClick={() => setActiveFile('team-leadership')}
                    className={`w-full text-left py-1 px-2 rounded flex items-center gap-2 transition-colors ${
                      activeFile === 'team-leadership'
                        ? 'bg-white/15 text-white font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileCode className="w-3 h-3 text-accent-yellow" />
                    <span>roster-2026.json</span>
                  </button>
                </div>
              </div>

              {/* Achievements Folder */}
              <div className="pl-3 space-y-1 pt-1">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
                  <Folder className="w-3.5 h-3.5 text-slate-400" />
                  <span>achievements/</span>
                </div>
                <div className="pl-4 space-y-1">
                  <button
                    onClick={() => setActiveFile('achievements-milestones')}
                    className={`w-full text-left py-1 px-2 rounded flex items-center gap-2 transition-colors ${
                      activeFile === 'achievements-milestones'
                        ? 'bg-white/15 text-white font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileText className="w-3 h-3 text-accent-sky" />
                    <span>milestones.log</span>
                  </button>
                </div>
              </div>

              {/* Resources Folder */}
              <div className="pl-3 space-y-1 pt-1">
                <div className="flex items-center gap-1.5 text-slate-400 text-[11px] font-medium">
                  <Folder className="w-3.5 h-3.5 text-slate-400" />
                  <span>resources/</span>
                </div>
                <div className="pl-4 space-y-1">
                  <button
                    onClick={() => setActiveFile('resources-playbook')}
                    className={`w-full text-left py-1 px-2 rounded flex items-center gap-2 transition-colors ${
                      activeFile === 'resources-playbook'
                        ? 'bg-white/15 text-white font-semibold'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    <FileCode className="w-3 h-3 text-accent-blue" />
                    <span>founder-playbook.json</span>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Column 2: Code Editor & Preview Tab (6 cols) */}
          <div className="lg:col-span-6 border-b lg:border-b-0 lg:border-r border-white/10 flex flex-col bg-canvas-pitch">
            {/* Editor Top Bar with Tabs */}
            <div className="flex items-center justify-between border-b border-white/10 bg-canvas-dark/80 px-4 py-2.5 font-mono text-xs">
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setActiveTab('preview')}
                  className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors ${
                    activeTab === 'preview'
                      ? 'bg-white/15 text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Eye className="w-3.5 h-3.5" />
                  <span>Preview</span>
                </button>
                <button
                  onClick={() => setActiveTab('data')}
                  className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors ${
                    activeTab === 'data'
                      ? 'bg-white/15 text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Code2 className="w-3.5 h-3.5" />
                  <span>Raw Data</span>
                </button>
                <button
                  onClick={() => setActiveTab('schema')}
                  className={`px-3 py-1 rounded-md flex items-center gap-1.5 transition-colors ${
                    activeTab === 'schema'
                      ? 'bg-white/15 text-white font-semibold'
                      : 'text-slate-400 hover:text-white'
                  }`}
                >
                  <Layers className="w-3.5 h-3.5" />
                  <span>Schema</span>
                </button>
              </div>

              <div className="flex items-center gap-2 text-slate-500 text-[11px]">
                <span>UTF-8</span>
                <span>•</span>
                <span>TypeScript</span>
              </div>
            </div>

            {/* Editor Content Area */}
            <div className="p-6 flex-1 overflow-y-auto font-mono text-xs leading-relaxed">
              {activeTab === 'preview' && (
                <div className="space-y-4">
                  {activeFile === 'readme' && (
                    <div className="space-y-4 text-slate-200">
                      <div className="pb-3 border-b border-white/10">
                        <h3 className="text-xl font-bold font-display text-white mb-1">
                          # E-Cell MITAOE Ecosystem
                        </h3>
                        <p className="text-slate-400 text-xs">
                          Center for Innovation, Incubation & Entrepreneurship (CIIE)
                        </p>
                      </div>

                      <p>
                        E-Cell MITAOE is an autonomous collegiate ecosystem at MIT Academy of Engineering, Pune. We bridge academic engineering curricula with venture capital and patent execution.
                      </p>

                      <div className="p-4 rounded-xl bg-white/5 border border-white/10 space-y-2">
                        <div className="text-accent-yellow font-bold uppercase tracking-wider text-[11px]">
                          Key Highlights 2026:
                        </div>
                        <ul className="list-disc pl-5 space-y-1 text-slate-300">
                          <li>₹25 Lakhs pre-seed support fund approved by CIIE</li>
                          <li>28+ campus and regional hackathons/pitch conclaves held</li>
                          <li>180+ alumni founders in global venture portfolios</li>
                        </ul>
                      </div>

                      <div className="pt-2">
                        <Link
                          href="/about"
                          className="inline-flex items-center gap-1.5 text-accent-sky hover:underline"
                        >
                          <span>Open full chapter documentation</span>
                          <ExternalLink className="w-3 h-3" />
                        </Link>
                      </div>
                    </div>
                  )}

                  {activeFile === 'events-brand-battle' && (
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="px-2 py-0.5 rounded bg-forest text-white text-[10px] font-bold">
                          COMPETITION // UPCOMING
                        </span>
                        <span className="text-slate-400 text-[11px]">November 18, 2026</span>
                      </div>
                      <h3 className="text-lg font-bold text-white font-display">
                        Brand Battle 2026: Corporate Turnaround
                      </h3>
                      <p className="text-slate-300">
                        {signatureEvents[0]?.fullDescription}
                      </p>
                      <div className="p-3 rounded-lg bg-white/5 border border-white/10 space-y-1 text-slate-400">
                        <div>Prize Pool: ₹50,000 Cash + CIIE Incubation Credits</div>
                        <div>Venue: MITAOE Main Auditorium & Innovation Hub</div>
                        <div>Jury: Leading Advertising CMOs & Venture Partners</div>
                      </div>
                      <Link
                        href="/events/brand-battle"
                        className="inline-flex items-center gap-1.5 text-accent-yellow font-bold hover:underline"
                      >
                        <span>View complete competition schedule</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  )}

                  {activeFile === 'events-e-summit' && (
                    <div className="space-y-3">
                      <span className="px-2 py-0.5 rounded bg-accent-blue text-white text-[10px] font-bold">
                        FLAGSHIP // REGIONAL
                      </span>
                      <h3 className="text-lg font-bold text-white font-display">
                        E-Summit 2026: Ideas Into Impact
                      </h3>
                      <p className="text-slate-300">
                        Annual summit bringing together 2,400+ delegates from 35 engineering and design colleges across Maharashtra.
                      </p>
                      <Link
                        href="/events"
                        className="inline-flex items-center gap-1.5 text-accent-sky font-bold hover:underline"
                      >
                        <span>Browse event timeline</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  )}

                  {activeFile === 'initiatives-seed-fund' && (
                    <div className="space-y-3">
                      <span className="px-2 py-0.5 rounded bg-accent-orange text-white text-[10px] font-bold">
                        GRANT POLICY // ₹25 LAKHS
                      </span>
                      <h3 className="text-lg font-bold text-white font-display">
                        CIIE DeepTech Pre-Seed Grant
                      </h3>
                      <p className="text-slate-300">
                        Zero-equity grant for prototypes with patent potential. Includes student patent attorney costs and cloud compute credits.
                      </p>
                      <Link
                        href="/initiatives"
                        className="inline-flex items-center gap-1.5 text-accent-sky font-bold hover:underline"
                      >
                        <span>View cohort eligibility</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  )}

                  {activeFile === 'team-leadership' && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-white font-display">
                        Student Leadership Board
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {teamData.slice(2, 6).map((member) => (
                          <div key={member.id} className="p-3 rounded-lg bg-white/5 border border-white/10">
                            <div className="font-bold text-white">{member.name}</div>
                            <div className="text-[11px] text-accent-yellow">{member.role}</div>
                            <div className="text-[10px] text-slate-400 mt-1">{member.branchAndYear}</div>
                          </div>
                        ))}
                      </div>
                      <Link
                        href="/team"
                        className="inline-flex items-center gap-1.5 text-accent-sky font-bold hover:underline"
                      >
                        <span>Open full team directory</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  )}

                  {activeFile === 'achievements-milestones' && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-white font-display">
                        Audited Milestones Log
                      </h3>
                      <div className="space-y-2">
                        {milestonesTimeline.map((item, idx) => (
                          <div key={idx} className="p-2.5 rounded bg-white/5 border border-white/10 flex items-start gap-2.5">
                            <span className="px-1.5 py-0.5 rounded bg-primary text-white text-[10px] font-bold">
                              {item.year}
                            </span>
                            <div>
                              <div className="text-white font-bold">{item.title}</div>
                              <div className="text-slate-400 text-[11px]">{item.impactMetrics}</div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {activeFile === 'resources-playbook' && (
                    <div className="space-y-3">
                      <h3 className="text-lg font-bold text-white font-display">
                        {resourcesList[0]?.title}
                      </h3>
                      <p className="text-slate-300">{resourcesList[0]?.description}</p>
                      <div className="p-3 rounded bg-white/5 border border-white/10 text-slate-400">
                        Format: {resourcesList[0]?.format} • Size: {resourcesList[0]?.readTimeOrSize}
                      </div>
                      <Link
                        href="/resources"
                        className="inline-flex items-center gap-1.5 text-accent-yellow font-bold hover:underline"
                      >
                        <span>Open Startup Toolkit</span>
                        <ExternalLink className="w-3 h-3" />
                      </Link>
                    </div>
                  )}
                </div>
              )}

              {activeTab === 'data' && (
                <pre className="text-slate-300 text-[11px] whitespace-pre-wrap">
                  {JSON.stringify(
                    activeFile === 'events-brand-battle'
                      ? signatureEvents[0]
                      : activeFile === 'events-e-summit'
                      ? signatureEvents[1]
                      : activeFile === 'team-leadership'
                      ? teamData.slice(0, 4)
                      : activeFile === 'resources-playbook'
                      ? resourcesList[0]
                      : milestonesTimeline,
                    null,
                    2
                  )}
                </pre>
              )}

              {activeTab === 'schema' && (
                <div className="text-slate-300 text-[11px] space-y-2">
                  <div className="text-accent-yellow font-bold">{"// TypeScript Contract"}</div>
                  <pre className="whitespace-pre-wrap bg-white/5 p-3 rounded-lg border border-white/10 text-slate-400">
{`interface ECellModuleRecord {
  id: string;
  slug: string;
  title: string;
  institution: "MITAOE CIIE";
  isVerified: true;
  updatedAt: "2026-11-14";
  metadata: Record<string, unknown>;
}`}
                  </pre>
                </div>
              )}
            </div>
          </div>

          {/* Column 3: Terminal & Live Chapter Metrics (3 cols) */}
          <div className="lg:col-span-3 bg-canvas-dark/95 p-5 font-mono text-xs flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-2 pb-3 border-b border-white/10 mb-4 text-slate-400 text-[10px] uppercase tracking-wider">
                <Terminal className="w-3.5 h-3.5 text-accent-orange" />
                <span>TERMINAL INSPECTOR</span>
              </div>

              <div className="space-y-3 text-[11px]">
                <div>
                  <span className="text-slate-500">STATUS:</span>
                  <div className="text-forest-light font-bold flex items-center gap-1.5 mt-0.5">
                    <CheckCircle2 className="w-3.5 h-3.5" />
                    <span>ACTIVE & ACCREDITED</span>
                  </div>
                </div>

                <div>
                  <span className="text-slate-500">PARENT DEPT:</span>
                  <div className="text-slate-200 mt-0.5">Center for Innovation (CIIE)</div>
                </div>

                <div>
                  <span className="text-slate-500">AFFILIATION:</span>
                  <div className="text-slate-200 mt-0.5">MIT Academy of Engineering</div>
                </div>

                <div>
                  <span className="text-slate-500">ACTIVE ROSTER:</span>
                  <div className="text-accent-yellow font-bold mt-0.5">65 Student Members</div>
                </div>

                <div>
                  <span className="text-slate-500">PRE-SEED CAPITAL:</span>
                  <div className="text-accent-blue font-bold mt-0.5">₹25,00,000 Institutional</div>
                </div>

                <div>
                  <span className="text-slate-500">PATENTS ASSISTED:</span>
                  <div className="text-white font-bold mt-0.5">4 Student IP Filings</div>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-white/10 mt-6">
              <div className="text-[10px] text-slate-500 mb-2">QUICK JUMP</div>
              <div className="flex flex-col gap-1.5">
                <Link
                  href="/events"
                  className="px-2.5 py-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] flex items-center justify-between transition-colors"
                >
                  <span>Event Directory</span>
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                </Link>
                <Link
                  href="/team"
                  className="px-2.5 py-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] flex items-center justify-between transition-colors"
                >
                  <span>Team Directory</span>
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                </Link>
                <Link
                  href="/admin"
                  className="px-2.5 py-1.5 rounded bg-white/5 hover:bg-white/10 text-slate-300 text-[11px] flex items-center justify-between transition-colors"
                >
                  <span>Admin Portal</span>
                  <ChevronRight className="w-3 h-3 text-slate-500" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
