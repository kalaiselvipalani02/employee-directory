import { connectDB } from "./db.js";

const seedData = async () => {
  const db = await connectDB();

  // Check if employees already exist
  const count = await db.collection("employees").countDocuments();
  if (count > 0) {
    console.log("Seed data already exists. Skipping...");
    return;
  }

  // Seed Departments
  await db.collection("departments").insertMany([
    { name: "Engineering", floor: 2 },
    { name: "Marketing", floor: 1 },
    { name: "HR", floor: 3 },
  ]);

  // Seed Employees
  await db.collection("employees").insertMany([
    {
      name: "Anjali",
      position: "Developer",
      department: "Engineering",
      salary: 60000,
    },
    {
      name: "Ravi",
      position: "QA Engineer",
      department: "Engineering",
      salary: 50000,
    },
    {
      name: "Meena",
      position: "HR Executive",
      department: "HR",
      salary: 40000,
    },
    {
      name: "Suresh",
      position: "Marketing Lead",
      department: "Marketing",
      salary: 55000,
    },
    {
      name: "Priya",
      position: "Content Writer",
      department: "Marketing",
      salary: 42000,
    },
  ]);

  console.log("✅ Seeding completed!");
};

//seedData();
