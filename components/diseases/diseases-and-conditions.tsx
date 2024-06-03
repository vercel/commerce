const DiseasesAndConditions = ({ taxons = [] }) => {
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

export default DiseasesAndConditions;
