import createAPIPlatformProject from "./backend/apiplatform/createAPIPlatformProject.js";
import createExpressProject from "./backend/express/createExpressProject.js";
import createSpringBootProject from "./backend/springboot/createSpringBootProject.js";

export default async function ({ technology, projectName }) {
  console.log(`Creating a backend project using ${technology}...`);
  console.log(`Project name: ${projectName}`);

  switch (technology) {
    case "api-platform":
      await createAPIPlatformProject({ projectName });
      break;
    case "express":
      await createExpressProject({ projectName });
      break;
    case "spring-boot":
      await createSpringBootProject({ projectName });
      break;
    default:
      console.error("Unknown technology selected.");
  }
}
