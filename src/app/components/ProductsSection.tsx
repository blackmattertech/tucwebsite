import { Link } from 'react-router';
import './ProductsSection.css';

const VALUE_ADDED_ITEMS = [
  {
    title: 'Embroidery',
    image: '/capabilities/embroidery.png',
    description:
      'Premium embroidery for logos and branding on caps, polos, and apparel. Dense stitch options and quick turnaround for bulk orders.',
  },
  {
    title: 'DTF Printing',
    image: '/capabilities/DTF Printing.png',
    description:
      'Direct-to-film printing for full-color, detailed designs on any fabric. No minimums, vibrant results, and durable finishes.',
  },
  {
    title: 'Screen Printing',
    image: '/capabilities/Screen Printing.png',
    description:
      'Classic screen printing for bold graphics and high opacity on tees, hoodies, and more. Ideal for large runs and brand consistency.',
  },
  {
    title: 'Vinyl Printing',
    image: '/capabilities/vinayl printing.png',
    description:
      'Vinyl printing for custom graphics, numbers, and names on apparel. Durable and vibrant, ideal for sportswear and small batches.',
  },
];

export function ProductsSection() {
  return (
    <section className="value-added-section" id="value-added-services">
      <div className="section-heading-wrap">
        <h2 className="section-heading">Value Added Services</h2>
      </div>

      <div className="value-added-cards">
        {VALUE_ADDED_ITEMS.map((item, index) => (
          <Link key={index} to="/capabilities" className="value-added-card">
            <div className="value-added-card-top">
              <img
                src={item.image}
                alt={item.title}
                className="value-added-card-image"
              />
            </div>
            <div className="value-added-card-bottom">
              <h3 className="value-added-card-title">
                {item.title}
                <span className="check" aria-hidden>✓</span>
              </h3>
              <p className="value-added-card-description">{item.description}</p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}
