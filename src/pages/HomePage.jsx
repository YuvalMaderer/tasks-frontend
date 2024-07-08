// src/pages/HomePage.jsx
import { Card } from "@/components/ui/card";
import { Typography } from "@mui/material";
import React from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { Link } from "react-router-dom";

const AnimatedCard = ({ children, className }) => {
  const controls = useAnimation();
  const ref = React.useRef(null);
  const inView = useInView(ref, { once: true });

  React.useEffect(() => {
    if (inView) {
      controls.start({ opacity: 1, y: 0 });
    } else {
      controls.start({ opacity: 0, y: 50 });
    }
  }, [inView, controls]);

  return (
    <motion.div
      ref={ref}
      animate={controls}
      initial={{ opacity: 0, y: 50 }}
      transition={{ duration: 0.6 }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

const HoverCard = ({ children }) => {
  return (
    <div className="transform transition-transform duration-300 hover:translate-y-[-10px] hover:shadow-xl hover:bg-gray-200 rounded-lg">
      {children}
    </div>
  );
};

const HomePage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <Card className="max-w-4xl w-full bg-white shadow-lg p-8 rounded-lg">
        {/* Hero Section */}
        <AnimatedCard>
          <div className="text-center mb-12">
            <Typography
              variant="h2"
              className="text-2xl font-bold text-gray-800 mb-4"
            >
              Welcome to Your Tasks App
            </Typography>
            <Typography className="text-md text-gray-600 mb-8">
              Discover a new way to manage your tasks effectively. Our app is
              designed to help you stay organized, prioritize your work, and
              boost your productivity with ease. Whether you're managing
              personal to-dos or collaborating on team projects, we've got you
              covered.
            </Typography>
            <br />
            <img
              src="https://i.ibb.co/KrtfXdC/OIG4-b8-Uy-OO3p.jpg"
              alt="OIG4-b8-Uy-OO3p"
              className="rounded-lg shadow-md mx-auto h-96 transition-transform duration-300 hover:scale-105"
            />
          </div>
        </AnimatedCard>

        {/* Key Features */}
        <AnimatedCard>
          <div className="mb-12">
            <Typography
              variant="h3"
              className="text-xl font-semibold text-gray-800 mb-6"
            >
              Key Features
            </Typography>
            <br />
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              <HoverCard className="p-6">
                <Typography
                  variant="h4"
                  className="text-md font-semibold text-gray-800 mb-3"
                >
                  Task Management
                </Typography>
                <Typography className="text-gray-700">
                  Keep track of all your tasks in one place. Assign due dates,
                  set priorities, and add notes. Organize tasks into different
                  projects to manage your workload efficiently.
                </Typography>
              </HoverCard>
              <HoverCard className="p-6">
                <Typography
                  variant="h4"
                  className="text-md font-semibold text-gray-800 mb-3"
                >
                  Customizable Reminders
                </Typography>
                <Typography className="text-gray-700">
                  Set up reminders to stay on top of your deadlines. Customize
                  alert times and receive notifications directly to your device,
                  so you never miss an important task.
                </Typography>
              </HoverCard>
              <HoverCard className="p-6">
                <Typography
                  variant="h4"
                  className="text-md font-semibold text-gray-800 mb-3"
                >
                  Progress Tracking
                </Typography>
                <Typography className="text-gray-700">
                  Analyze your productivity with detailed progress tracking.
                  Review completed tasks, assess your performance, and gain
                  insights to enhance your productivity over time.
                </Typography>
              </HoverCard>
              <HoverCard className="p-6">
                <Typography
                  variant="h4"
                  className="text-md font-semibold text-gray-800 mb-3"
                >
                  Collaborative Features
                </Typography>
                <Typography className="text-gray-700">
                  Work seamlessly with others by sharing projects and tasks.
                  Assign tasks to team members, track their progress, and
                  collaborate effectively to achieve shared goals.
                </Typography>
              </HoverCard>
              <HoverCard className="p-6">
                <Typography
                  variant="h4"
                  className="text-md font-semibold text-gray-800 mb-3"
                >
                  User-Friendly Interface
                </Typography>
                <Typography className="text-gray-700">
                  Enjoy a clean and intuitive interface designed for ease of
                  use. Navigate through tasks and features effortlessly,
                  ensuring a smooth user experience.
                </Typography>
              </HoverCard>
              <HoverCard className="p-6">
                <Typography
                  variant="h4"
                  className="text-md font-semibold text-gray-800 mb-3"
                >
                  Integration Options
                </Typography>
                <Typography className="text-gray-700">
                  Connect with other apps and services to enhance your task
                  management experience. Integrate with calendars, email, and
                  other tools to keep everything synchronized.
                </Typography>
              </HoverCard>
            </div>
          </div>
        </AnimatedCard>

        {/* How It Works */}
        <AnimatedCard>
          <div className="bg-gray-50 p-6 rounded-lg shadow-md mb-12">
            <Typography
              variant="h3"
              className="text-xl font-semibold text-gray-800 mb-6"
            >
              How It Works
            </Typography>
            <div className="space-y-6">
              <div className="flex items-start space-x-4">
                <svg
                  className="h-8 w-8 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 12h14m-7 7v-14"
                  />
                </svg>
                <div>
                  <Typography
                    variant="h5"
                    className="text-md font-semibold text-gray-800 mb-2"
                  >
                    Step 1: Create Tasks
                  </Typography>
                  <Typography className="text-gray-600">
                    Start by adding your tasks. Include details such as due
                    dates, priorities, and notes. Group them into projects for
                    better organization and tracking.
                  </Typography>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <svg
                  className="h-8 w-8 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 15l7-7 7 7"
                  />
                </svg>
                <div>
                  <Typography
                    variant="h5"
                    className="text-md font-semibold text-gray-800 mb-2"
                  >
                    Step 2: Set Reminders
                  </Typography>
                  <Typography className="text-gray-600">
                    Set and customize reminders for your tasks. Choose alert
                    times that suit you and get notifications directly to your
                    device to keep you informed.
                  </Typography>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <svg
                  className="h-8 w-8 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 10h14m-7 7v-14"
                  />
                </svg>
                <div>
                  <Typography
                    variant="h5"
                    className="text-md font-semibold text-gray-800 mb-2"
                  >
                    Step 3: Track Progress
                  </Typography>
                  <Typography className="text-gray-600">
                    Monitor your progress with detailed analytics. Review
                    completed tasks and gain insights into your productivity to
                    make informed improvements.
                  </Typography>
                </div>
              </div>
              <div className="flex items-start space-x-4">
                <svg
                  className="h-8 w-8 text-blue-500"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 5v14m7-7H5"
                  />
                </svg>
                <div>
                  <Typography
                    variant="h5"
                    className="text-md font-semibold text-gray-800 mb-2"
                  >
                    Step 4: Collaborate
                  </Typography>
                  <Typography className="text-gray-600">
                    Collaborate with team members by sharing projects and
                    assigning tasks. Track their progress and work together
                    towards achieving common goals.
                  </Typography>
                </div>
              </div>
            </div>
          </div>
        </AnimatedCard>

        {/* Testimonials */}
        <AnimatedCard>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-12">
            <Typography
              variant="h3"
              className="text-xl font-semibold text-gray-800 mb-6"
            >
              What Our Users Say
            </Typography>
            <div className="space-y-6">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Typography className="text-md font-semibold text-gray-800 mb-2">
                  "This app has transformed the way I handle my tasks. The
                  intuitive interface and powerful features make it a must-have
                  for anyone looking to boost productivity."
                </Typography>
                <Typography className="text-gray-600">
                  - Alex Johnson
                </Typography>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Typography className="text-md font-semibold text-gray-800 mb-2">
                  "I can't imagine managing my tasks without this app. The
                  customizable reminders and progress tracking are game-changers
                  for my daily routine."
                </Typography>
                <Typography className="text-gray-600">- Jamie Lee</Typography>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Typography className="text-md font-semibold text-gray-800 mb-2">
                  "The task management features are fantastic. I love how I can
                  organize my tasks into projects and track my progress with
                  ease. Highly recommended!"
                </Typography>
                <Typography className="text-gray-600">
                  - Morgan Davis
                </Typography>
              </div>
              <div className="bg-white p-6 rounded-lg shadow-md">
                <Typography className="text-md font-semibold text-gray-800 mb-2">
                  "The integration with other tools is seamless. I can sync my
                  tasks with my calendar and email, making it incredibly
                  convenient to stay on top of everything."
                </Typography>
                <Typography className="text-gray-600">
                  - Taylor Martinez
                </Typography>
              </div>
            </div>
          </div>
        </AnimatedCard>

        {/* Call to Action */}
        <AnimatedCard>
          <div className="text-center">
            <Typography className="text-md text-gray-700 mb-4">
              Ready to revolutionize your task management? Get started today and
              experience the difference in your productivity. Click the button
              below to dive in and start organizing your tasks like never
              before!
            </Typography>
            <Link
              to="/tasks"
              className="w-full md:w-auto px-6 py-3 text-lg font-semibold transition-transform duration-300 hover:scale-105"
            >
              <span className="text-2xl font-bold">+</span>
              <span className="ml-2">Add New Task</span>
            </Link>
          </div>
        </AnimatedCard>
      </Card>
    </div>
  );
};

export default HomePage;
