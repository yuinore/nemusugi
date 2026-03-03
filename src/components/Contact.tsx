import type { JSX } from 'react';
import './Contact.scss';

export default function Contact(): JSX.Element {
  return (
    <>
      <div className="contact-item jost-light">
        <a
          href="https://www.google.com/search?q=lensnet"
          target="_blank"
          rel="noopener noreferrer"
        >
          lensnet
        </a>
      </div>
      <div className="contact-item jost-light">
        <a
          href="https://www.google.com/search?q=at-contact"
          target="_blank"
          rel="noopener noreferrer"
        >
          at-contact
        </a>
      </div>
      <div className="contact-item jost-light">
        <a
          href="https://www.google.com/search?q=eyecity"
          target="_blank"
          rel="noopener noreferrer"
        >
          eyecity
        </a>
      </div>
    </>
  );
}
