import dynamic from 'next/dynamic';

const DynamicContentManager = dynamic(() => import('components/layout/dynamic-content-manager'));
interface ReusableSectionProps {
  section: {
    existingSection: {
      section: {
        sectionType: [];
      };
    };
  };
}

const ReusableSection = ({ section }: ReusableSectionProps) => {
  const data = section.existingSection.section.sectionType;

  if (!data) {
    return;
  }

  return <DynamicContentManager content={data} />;
};

export default ReusableSection;
