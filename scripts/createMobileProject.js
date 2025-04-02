import createFlutterProject from "./mobile/createFlutterProject.js";
import createReactNativeProject from "./mobile/reactnative/createReactNativeProject.js";
import createIonicProject from "./mobile/ionic/createIonicProject.js";

export default async function ({ technology, projectName }) {
  console.log(`Creating a mobile project using ${technology}...`);
  console.log(`Project name: ${projectName}`);

  switch (technology) {
    case "flutter":
      await createFlutterProject({ projectName });
      break;
    case "reactnative":
      await createReactNativeProject({ projectName });
      break;
    case "ionic":
      await createIonicProject({ projectName });
      break;
    default:
      console.error("Unknown technology selected.");
  }
}
