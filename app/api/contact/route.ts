import { NextResponse } from "next/server";
import Contact from "@/models/Contact";
import { connectToDatabase } from "@/lib/mongodb";

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await connectToDatabase();
    const contact = new Contact(body);
    await contact.save();
    return NextResponse.json(contact, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to submit message" },
      { status: 500 }
    );
  }
}
