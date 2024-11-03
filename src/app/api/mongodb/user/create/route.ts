import { NextResponse } from "next/server";
import { MongoClient } from "mongodb";

export async function POST(request: Request) {
  const client = new MongoClient(process.env.NEXT_PUBLIC_MONGODB_URI || "");

  try {
    const userData = await request.json();

    console.log(userData);

    await client.connect();
    const db = client.db("db1");
    const users = db.collection("users");

    const result = await users.insertOne(userData);

    return NextResponse.json({
      success: true,
      insertedId: result.insertedId,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  } finally {
    await client.close();
  }
}
