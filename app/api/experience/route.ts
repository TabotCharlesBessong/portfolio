import { NextResponse } from "next/server";
import Experience from "@/models/Experience";
import { connectToDatabase } from "@/lib/mongodb";

// GET: Fetch Experiences with Searching, Filtering, Sorting, and Pagination
export async function GET(req: Request) {
  try {
    const db = await connectToDatabase();
    const url = new URL(req.url);
    const search = url.searchParams.get("search") || "";
    const sort = url.searchParams.get("sort") || "companyName";
    const order = url.searchParams.get("order") === "desc" ? -1 : 1;
    const page = parseInt(url.searchParams.get("page") || "1", 10);
    const limit = parseInt(url.searchParams.get("limit") || "10", 10);

    const query = search
      ? { companyName: { $regex: search, $options: "i" } }
      : {};
    const total = await Experience.countDocuments(query);
    const experiences = await Experience.find(query)
      .sort({ [sort]: order })
      .skip((page - 1) * limit)
      .limit(limit);

    return NextResponse.json({ total, experiences });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to fetch experiences" },
      { status: 500 }
    );
  }
}

// POST: Add a new Experience
export async function POST(req: Request) {
  try {
    const body = await req.json();
    const db = await connectToDatabase();
    const experience = new Experience(body);
    await experience.save();
    return NextResponse.json(experience, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to add experience" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing Experience
export async function PUT(req: Request) {
  try {
    const body = await req.json();
    const db = await connectToDatabase();
    const { id, ...updates } = body;

    const experience = await Experience.findByIdAndUpdate(id, updates, {
      new: true,
    });
    if (!experience) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(experience);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update experience" },
      { status: 500 }
    );
  }
}

// DELETE: Remove an Experience
export async function DELETE(req: Request) {
  try {
    const url = new URL(req.url);
    const id = url.searchParams.get("id");

    if (!id) {
      return NextResponse.json(
        { error: "Experience ID is required" },
        { status: 400 }
      );
    }

    const db = await connectToDatabase();
    const experience = await Experience.findByIdAndDelete(id);

    if (!experience) {
      return NextResponse.json(
        { error: "Experience not found" },
        { status: 404 }
      );
    }

    return NextResponse.json({ message: "Experience deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete experience" },
      { status: 500 }
    );
  }
}
