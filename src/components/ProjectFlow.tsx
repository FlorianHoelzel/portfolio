import { ArrowRight } from 'lucide-react';

export function ProjectFlow({ steps }: { steps: [string, string, string] }) {
  return (
    <ol className="implementation-flow" aria-label="How the project works">
      {steps.map((step, index) => (
        <li key={step}><span>{step}</span>{index < steps.length - 1 && <ArrowRight size={13} aria-hidden="true" />}</li>
      ))}
    </ol>
  );
}
