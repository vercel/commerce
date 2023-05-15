'use client'

interface ReusableSectionProps {
  section: any
}

const ReusableSection = ({ section }: ReusableSectionProps) => {
  console.log(section)

  return (
    <div className="px-4 lg:px-8 2xl:px-16">
      <div>
        Reusable section
      </div>

    </div>
  )
}

export default ReusableSection