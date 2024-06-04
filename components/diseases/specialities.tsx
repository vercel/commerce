import Link from 'next/link';

const Specialities = ({ taxons = [] }) => {
  return (
    <ul>
      {taxons.map((taxon) => (
        <li key={taxon.id}>
          <Link href="/">{taxon.attributes.name}</Link>
        </li>
      ))}
    </ul>
  );
};

export default Specialities;
