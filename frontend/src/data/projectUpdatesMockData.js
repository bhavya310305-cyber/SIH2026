import projectsMockData from "./projectsMockData";

const updateDescriptions = {
  "Road Construction":
    "Road construction work is progressing under the approved village connectivity plan, with surface and drainage work being completed in phases.",
  "Community Hall":
    "The community hall structure, flooring, electrical work, and basic facilities have been completed for local public use.",
  "Bus Shelter":
    "The passenger waiting area and covered bus shelter have been completed at the identified public transport point.",
  "Water Tank":
    "The overhead water tank has been completed and connected to the local distribution network.",
  "Drinking Water":
    "Pipeline laying and household connection work for the drinking water facility has been completed as scheduled.",
  Playground:
    "Ground levelling, boundary work, and installation of basic sports facilities have been completed.",
  "Sports Ground":
    "Sports ground levelling and playground development work has been completed for community use.",
  Ambulance:
    "The ambulance has been delivered to the community health centre and is available for public health service.",
  School:
    "The school construction, classroom work, or repair activity is being completed according to the approved plan.",
  "Health Centre":
    "Health centre civil work or equipment procurement is being carried out for improved local medical services.",
  "Road Improvement":
    "Road improvement work is progressing with surface preparation and drainage work under execution.",
  Drainage:
    "Village road and drainage work is progressing under the approved rural infrastructure plan.",
  Anganwadi:
    "The Anganwadi centre building has been completed with basic utility connections for community use.",
  "Solar Street":
    "Solar street light installation is scheduled after site verification and work order processing.",
  "Community Centre":
    "The multi-purpose community centre is being developed for local meetings and public activities.",
};

const getDescription = (projectName) => {
  const matchingKey = Object.keys(updateDescriptions).find((key) =>
    projectName.includes(key),
  );

  return (
    updateDescriptions[matchingKey] ||
    "The project is being implemented under the approved MPLADS development plan."
  );
};

const projectUpdatesMockData = projectsMockData.map((project) => ({
  project_id: project.project_id,
  description: getDescription(project.project_name),
  update_date: "2026-08-31",
  photograph: "/images/image.png",
  photographs: ["/images/image.png"],
  status: project.current_status,
}));

export default projectUpdatesMockData;
export { projectUpdatesMockData };
