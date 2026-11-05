import { AppointmentDialog } from './appointment-dialog';

type PageCtaProps = {
  eyebrow: string;
  title: string;
  label: string;
};

export function PageCta({ eyebrow, title, label }: PageCtaProps) {
  return (
    <section className="about-cta-section">
      <div className="container about-cta">
        <div>
          <p className="eyebrow">{eyebrow}</p>
          <h2>{title}</h2>
        </div>
        <AppointmentDialog icon="message" label={label} />
      </div>
    </section>
  );
}
