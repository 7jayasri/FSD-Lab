const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:27017";
const client = new MongoClient(url);

async function main() {
  try {
    await client.connect();
    console.log("Connected to MongoDB");

    const db = client.db("CollegeDB");
    console.log("Using database: CollegeDB");

    const collection = db.collection("students");
    console.log("Collection 'students' created");

    await collection.insertMany([
      { name: "Gowtham", branch: "CSE", marks: 85 },
      { name: "Kiran", branch: "ECE", marks: 78 },
      { name: "Sai", branch: "CSE", marks: 92 },
      { name: "Ravi", branch: "EEE", marks: 67 },
      { name: "Vijay", branch: "CSE", marks: 75 }
    ]);
    console.log("Records inserted");

    console.log("\nAll Records:");
    console.log(await collection.find().toArray());

    console.log("\nCSE Students:");
    console.log(await collection.find({ branch: "CSE" }).toArray());

    console.log("\nLimit to 2 Students:");
    console.log(await collection.find().limit(2).toArray());

    console.log("\nSorted by Marks (High to Low):");
    console.log(await collection.find().sort({ marks: -1 }).toArray());

    await collection.createIndex({ name: 1 });
    console.log("Index created on 'name' field");

    console.log("\nAverage Marks per Branch:");
    const result = await collection.aggregate([
      { $group: { _id: "$branch", avgMarks: { $avg: "$marks" } } }
    ]).toArray();
    console.log(result);

    await collection.drop();
    console.log("Collection 'students' dropped");

    await db.dropDatabase();
    console.log("Database 'CollegeDB' dropped");

  } catch (err) {
    console.error("Error:", err);
  } finally {
    await client.close();
    console.log("Connection closed");
  }
}

main();
