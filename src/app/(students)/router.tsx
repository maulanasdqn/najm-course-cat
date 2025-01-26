import StudentsLayout from "./layout";
import DashboardPage from "./dashboard/page";
import { ExamsRouter } from "./exams/router";
import { CourseRouter } from "./course/router";

export const StudentsRouter = [
    {
        element: <StudentsLayout />,
        children: [
            {
                path: "dashboard",
                element: <DashboardPage />,
            },
            {
                path: "exams",
                children: ExamsRouter,
            },
            {
                path: "course",
                children: CourseRouter,
            },
        ],
    },
];