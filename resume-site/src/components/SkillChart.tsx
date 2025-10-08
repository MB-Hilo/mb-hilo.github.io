interface SkillDistribution {
  name: string;
  percentage: number;
  color: string;
}

const skillDistribution: SkillDistribution[] = [
  { name: 'Frontend', percentage: 45, color: '#3B82F6' },
  { name: 'Backend', percentage: 30, color: '#10B981' },
  { name: 'Cloud/DevOps', percentage: 15, color: '#F59E0B' },
  { name: 'AI/Tools/Process', percentage: 10, color: '#8B5CF6' }
];

export default function SkillChart() {
  // Calculate cumulative percentages for the pie chart
  let cumulativePercentage = 0;
  const segments = skillDistribution.map(skill => {
    const startAngle = cumulativePercentage * 3.6; // Convert percentage to degrees
    const endAngle = (cumulativePercentage + skill.percentage) * 3.6;
    cumulativePercentage += skill.percentage;
    
    return {
      ...skill,
      startAngle,
      endAngle,
      largeArcFlag: skill.percentage > 50 ? 1 : 0
    };
  });

  const createPath = (startAngle: number, endAngle: number, largeArcFlag: number) => {
    const centerX = 50;
    const centerY = 50;
    const radius = 40;
    
    const startAngleRad = (startAngle - 90) * Math.PI / 180;
    const endAngleRad = (endAngle - 90) * Math.PI / 180;
    
    const x1 = centerX + radius * Math.cos(startAngleRad);
    const y1 = centerY + radius * Math.sin(startAngleRad);
    const x2 = centerX + radius * Math.cos(endAngleRad);
    const y2 = centerY + radius * Math.sin(endAngleRad);
    
    return `M ${centerX} ${centerY} L ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2} Z`;
  };

  return (
    <div className="skill-chart mb-6 print:mb-4">
      <h3 className="text-lg font-semibold mb-4 text-gray-800 print:text-base">
        Skill Usage Distribution
      </h3>
      
      {/* Interactive Chart and Legend in Two Columns */}
      <div className="flex items-center gap-4 mb-4 print:hidden">
        {/* SVG Pie Chart */}
        <div className="flex-shrink-0">
          <svg viewBox="0 0 100 100" className="w-24 h-24">
            {segments.map((segment) => (
              <path
                key={segment.name}
                d={createPath(segment.startAngle, segment.endAngle, segment.largeArcFlag)}
                fill={segment.color}
                className="hover:opacity-80 transition-opacity cursor-pointer"
              >
                <title>{`${segment.name}: ${segment.percentage}%`}</title>
              </path>
            ))}
            {/* Center circle to make it look like a donut */}
            <circle cx="50" cy="50" r="15" fill="white" />
          </svg>
        </div>

        {/* Legend */}
        <div className="flex-1 space-y-1">
          {skillDistribution.map((skill) => (
            <div key={skill.name} className="flex items-center justify-between">
              <div className="flex items-center">
                <div 
                  className="w-2 h-2 rounded-full mr-2"
                  style={{ backgroundColor: skill.color }}
                />
                <span className="text-xs text-gray-700">{skill.name}</span>
              </div>
              <span className="text-xs font-medium text-gray-800">
                {skill.percentage}%
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Print-friendly bar chart */}
      <div className="hidden print:block mt-4">
        {skillDistribution.map((skill) => (
          <div key={skill.name} className="mb-2">
            <div className="flex justify-between text-xs mb-1">
              <span>{skill.name}</span>
              <span>{skill.percentage}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2">
              <div 
                className="h-2 rounded-full bg-gray-600"
                style={{ width: `${skill.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
