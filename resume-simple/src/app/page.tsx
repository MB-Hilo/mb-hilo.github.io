import data from '@/data/resume.json';
import type { ResumeData } from '@/types/resume';

const resume = data as ResumeData;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="section">
      <h2>{title}</h2>
      {children}
    </section>
  );
}

export default function Home() {
  const { contact } = resume;

  return (
    <main className="resume">
      <a className="download" href="/Mark_Bradley_Resume.docx">
        Download .docx
      </a>

      <header>
        <h1>{resume.name}</h1>
        <p className="headline">{resume.headline}</p>
        {/* Places, phones and email on the left; one link per row on the right. */}
        <div className="contact">
          <div>
            {contact.locations.flatMap((l) => [
              <span key={l.place}>{l.place}</span>,
              <span key={l.phone}>{l.phone}</span>,
            ])}
            <a className="email" href={`mailto:${contact.email}`}>
              {contact.email}
            </a>
          </div>
          <div className="links">
            {contact.links.map((l) => (
              <a key={l.url} href={l.url}>
                {l.text}
              </a>
            ))}
          </div>
        </div>
      </header>

      <Section title="Profile">
        <p>{resume.summary}</p>
      </Section>

      <Section title="Experience">
        {resume.experience.map((job) => (
          <article key={`${job.company}-${job.start}`} className="job">
            <div className="row">
              <p>
                <strong>{job.title}</strong>
                <span className="muted"> | {job.company}, {job.location}</span>
              </p>
              <span className="date">
                {job.start} – {job.end}
              </span>
            </div>
            <ul>
              {job.bullets.map((b) => (
                <li key={b}>{b}</li>
              ))}
            </ul>
          </article>
        ))}
      </Section>

      <Section title="Skills">
        <dl className="skills">
          {resume.skills.map((s) => (
            <div key={s.label}>
              <dt>{s.label}</dt>
              <dd>{s.items}</dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section title="Education">
        {resume.education.map((e) => (
          <div key={e.name} className="row">
            <p>
              <strong>{e.name}</strong>
              <span className="muted"> | {e.school}</span>
            </p>
            <span className="date">{e.year}</span>
          </div>
        ))}
      </Section>
    </main>
  );
}
