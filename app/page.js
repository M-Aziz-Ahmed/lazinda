'use client';
import { useState } from 'react';
import { getCookieClient } from '@/lib/cookieUtils';
import { Check } from 'lucide-react';
import Link  from 'next/link';
import { Button } from '@/components/ui/button';
const name = getCookieClient('name');

function AppCard({ id, name, description, icon, selected, onSelect, link }) {
  return (
    <Link
      role="button"
      href={link}
      onClick={() => onSelect(id)}
      className={`group cursor-pointer rounded-xl border p-6 transition-shadow hover:shadow-lg focus:shadow-lg outline-none focus:ring-2 focus:ring-primary/40 ${selected ? 'border-primary bg-primary/5' : 'bg-white'}`}>
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 items-center justify-center rounded-lg ${selected ? 'bg-primary text-white' : 'bg-gray-100 text-gray-700'}`}>
          {icon}
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-semibold">{name}</h3>
          <p className="mt-1 text-sm text-muted-foreground">{description}</p>
        </div>
        <div className="ml-4 flex items-center">
          {selected ? <Check className="text-primary" /> : null}
        </div>
      </div>
    </Link>
  );
}

export default function Home() {
  const role = getCookieClient('role');
  const [selected, setSelected] = useState('');

  const apps = [
    {
      id: 'srd',
      name: 'SRD',
      description: 'Sample Request Development — create and manage sample requests quickly.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
          <path fill="currentColor" d="M3 5h18v2H3zM3 11h12v2H3zM3 17h18v2H3z" />
        </svg>
      ),
      Link: '/srd',
    },
    {
      id: 'costing',
      name: 'Costing',
      description: 'Estimate and manage costs with clear breakdowns and reports.',
      icon: (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="w-6 h-6">
          <path fill="currentColor" d="M12 2l3 6h6l-4.5 3.5L20 20l-8-4-8 4 1.5-8.5L1 8h6z" />
        </svg>
      ),
      Link: '/costing',
    },
  ];

  return (
    <main className="mx-auto max-w-6xl p-6 my-12">
      <div className="mb-6 flex items-center justify-between">
        <div>
          <p className="text-sm text-muted-foreground">{role === 'admin' ? 'Administrator' : `Welcome ${name}`}</p>
          <h1 className="text-3xl font-extrabold text-gray-800">Choose an app</h1>
          <p className="mt-2 text-sm text-muted-foreground">Pick one to get started — quick switches are supported.</p>
        </div>
        <div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        {apps.map((app) => (
          <AppCard
            key={app.id}
            id={app.id}
            name={app.name}
            description={app.description}
            icon={app.icon}
            selected={selected === app.id}
            onSelect={setSelected}
            link={app.Link}
          />
        ))}
      </div>

      {/* <div className="mt-8 flex items-center justify-between">
        <div className="text-sm text-muted-foreground">Selected: <strong className="ml-2">{selected.toUpperCase()}</strong></div>
        <div className="flex items-center gap-3">
          <Button variant="outline" onClick={() => setSelected('')}>Reset</Button>
          <Button onClick={() => alert(`Launching ${selected.toUpperCase()}...`)}>Launch</Button>
        </div>
      </div> */}
    </main>
  );
}