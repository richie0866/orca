import { DisableFreecam, EnableFreecam } from "jobs/helpers/freecam";
import { onJobChange } from "jobs/helpers/job-store";

async function main() {
	await onJobChange("freecam", (job) => {
		if (job.active) {
			EnableFreecam();
		} else {
			DisableFreecam();
		}
	});
}

main().catch((err) => {
	warn(`[freecam-worker] ${err}`);
});
