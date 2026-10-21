// Renders plain text, turning any http(s) URL into a clickable link.
const URL_SPLIT = /(https?:\/\/[^\s)]+)/g;

export default function LinkifiedText({ text }: { text: string }) {
  // With a capturing group, split() returns URLs at odd indexes.
  const parts = text.split(URL_SPLIT);
  return (
    <>
      {parts.map((part, i) =>
        i % 2 === 1 ? (
          <a
            key={i}
            href={part}
            target="_blank"
            rel="noopener"
            className="text-blue-600 underline hover:text-blue-800"
          >
            {part.replace(/^https?:\/\/(www\.)?/, '')}
          </a>
        ) : (
          part
        )
      )}
    </>
  );
}
