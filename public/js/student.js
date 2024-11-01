// Leaving this here for reference :(
// interface StudentPing {
//     display_absences: Boolean
//     display_academic_reports: Boolean
//     display_activity: Boolean
//     display_announcements: Boolean
//     display_attendance: Boolean
//     display_attendance_percentage: Boolean
//     display_attendance_type: String
//     display_avatars: Boolean
//     display_behaviour: Boolean
//     display_classes: Boolean
//     display_concern_submission: Boolean
//     display_custom_fields: Boolean
//     display_detentions: Boolean
//     display_event_badges: Boolean
//     display_homework: Boolean
//     display_mental_health: Boolean
//     display_mental_health_no_tracker: Boolean
//     display_parent_behaviour: Boolean
//     display_report_cards: Boolean
//     display_rewards: Boolean
//     display_timetable: Boolean
//     display_two_way_communications: Boolean
// }

async function GET(endpoint, options) {
	const response = await fetch(`/api/${endpoint}`, options);
	switch (response.status) {
		case 200:
			return await response.json();
		case 401:
			window.location.href = "/";
			break;
		default:
			return await response.json();
	}
}

$(document).ready(async function () {
	const ping = await GET("ping");
	console.log(ping);
});
