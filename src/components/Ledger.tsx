/**
 * The development ledger: an honest, ordered view of where Kaayra is.
 * Stages are a real sequence, so they are numbered. Update `status` as work actually happens.
 */
export type StageStatus = 'current' | 'planned';

export interface Stage {
  title: string;
  detail: string;
  status: StageStatus;
}

export const STAGES: Stage[] = [
  { title: 'Concept exploration', detail: 'Choosing which classical formats are worth developing, and what each would need.', status: 'current' },
  { title: 'Sourcing and formulation', detail: 'Confirming plants, plant parts, suppliers and the preparation method for each format.', status: 'planned' },
  { title: 'Safety and quality testing', detail: 'Laboratory testing and safety review. No results exist yet, so none are shown.', status: 'planned' },
  { title: 'Licensing and labelling', detail: 'Licences, approvals and lawful labelling for each product category in India.', status: 'planned' },
  { title: 'Launch', detail: 'Only once the stages before it are complete. There is no launch date.', status: 'planned' },
];

export default function Ledger() {
  return (
    <ol className="ledger" aria-label="Development stages">
      {STAGES.map((s, i) => (
        <li key={s.title} className="ledger-row" data-status={s.status}>
          <span className="ledger-index" aria-hidden="true">{i + 1}</span>
          <div>
            <h3>{s.title}</h3>
            <p>{s.detail}</p>
          </div>
          <span className="ledger-status">{s.status === 'current' ? 'Where we are now' : 'Planned'}</span>
        </li>
      ))}
    </ol>
  );
}
