import DynamicContentManager from 'components/layout/dynamic-content-manager';

interface ReusableSectionProps {
  disabled: boolean;
  section: {
    existingSection: {
      section: {
        sectionType: [];
      };
    };
  };
}

const ReusableSection = ({ disabled, section }: ReusableSectionProps) => {
  if (disabled) {
    return;
  }

  const data = section.existingSection.section.sectionType;

  if (!data) {
    return;
  }

  return <DynamicContentManager content={data} />;
};

export default ReusableSection;
